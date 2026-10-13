"""Ephemeral loopback TLS for the original Pages transport; no OS trust changes."""
import base64
from contextlib import asynccontextmanager
from datetime import datetime, timedelta, timezone
import hashlib
from pathlib import Path
import re
import ssl
import tempfile
from websockets.asyncio.server import serve

TLS_HOSTNAME = "pages-realtime.gateway.rea-demo.api.openai.com"


def select_page_subprotocol(connection, offered):
    valid = [value for value in offered if re.fullmatch(r"pages-realtime-room\.rea-page-[1-9][0-9]*", value)]
    return valid[0] if len(valid) == 1 else None


def create_certificate(directory):
    # Import only for the explicit TLS opt-in. Default demo transport has no new dependency.
    from cryptography import x509
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.asymmetric import ec
    from cryptography.x509.oid import NameOID, ExtendedKeyUsageOID
    directory = Path(directory)
    key = ec.generate_private_key(ec.SECP256R1())
    name = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, TLS_HOSTNAME)])
    now = datetime.now(timezone.utc)
    certificate = (x509.CertificateBuilder().subject_name(name).issuer_name(name)
        .public_key(key.public_key()).serial_number(x509.random_serial_number())
        .not_valid_before(now - timedelta(minutes=1)).not_valid_after(now + timedelta(days=1))
        .add_extension(x509.SubjectAlternativeName([x509.DNSName(TLS_HOSTNAME)]), critical=False)
        .add_extension(x509.BasicConstraints(ca=False, path_length=None), critical=True)
        .add_extension(x509.ExtendedKeyUsage([ExtendedKeyUsageOID.SERVER_AUTH]), critical=False)
        .sign(key, hashes.SHA256()))
    cert_path, key_path = directory / "certificate.pem", directory / "private-key.pem"
    with cert_path.open("xb") as stream:
        stream.write(certificate.public_bytes(serialization.Encoding.PEM))
    with key_path.open("xb") as stream:
        stream.write(key.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption()))
    public_key = key.public_key().public_bytes(serialization.Encoding.DER, serialization.PublicFormat.SubjectPublicKeyInfo)
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.minimum_version = ssl.TLSVersion.TLSv1_2
    context.load_cert_chain(cert_path, key_path)
    return context, base64.b64encode(hashlib.sha256(public_key).digest()).decode(), cert_path


@asynccontextmanager
async def pages_tls_listener(pages, max_size=1024 * 1024):
    # The caller owns an isolated, gitignored demo state directory. Keys never leave it.
    with tempfile.TemporaryDirectory(prefix="demo-pages-tls-", dir=pages.directory) as directory:
        context, spki, _ = create_certificate(directory)
        async def connection(socket):
            await pages.connection(socket, tls_pages=True)
        async with serve(connection, "127.0.0.1", 0, ssl=context, max_size=max_size,
                         select_subprotocol=select_page_subprotocol) as server:
            port = server.sockets[0].getsockname()[1]
            yield {"endpoint": f"wss://{TLS_HOSTNAME}:{port}/ws", "tlsHostname": TLS_HOSTNAME, "spkiSha256": spki}
