import base64
import hashlib
import json
from pathlib import Path
import ssl
import tempfile
import unittest
from urllib.parse import urlparse
from cryptography import x509
from cryptography.hazmat.primitives import serialization
from websockets.asyncio.client import connect
from websockets.exceptions import ConnectionClosedError
from demo_page_sync import PageSyncStore
from demo_page_tls import TLS_HOSTNAME, pages_tls_listener


class PagesTlsTests(unittest.IsolatedAsyncioTestCase):
    async def test_original_room_sync_and_scoped_certificate(self):
        with tempfile.TemporaryDirectory(prefix="rea-tls-test-") as directory:
            folder = Path(directory)
            (folder / "demo-pages.json").write_text(json.dumps({"items": [{"metadata": {"page_id": "rea-page-1"}}]}), encoding="utf-8")
            pages = PageSyncStore(folder)
            async with pages_tls_listener(pages) as metadata:
                pages.publish_endpoint(**metadata)
                published = json.loads((folder / "demo-pages-runtime.json").read_text())
                self.assertEqual(published["token"], pages.token)
                self.assertEqual(published["tlsHostname"], TLS_HOSTNAME)
                url = urlparse(metadata["endpoint"])
                self.assertEqual((url.scheme, url.hostname, url.path), ("wss", TLS_HOSTNAME, "/ws"))
                cert_path = next(folder.glob("demo-pages-tls-*/certificate.pem"))
                cert = x509.load_pem_x509_certificate(cert_path.read_bytes())
                self.assertEqual(cert.extensions.get_extension_for_class(x509.SubjectAlternativeName).value.get_values_for_type(x509.DNSName), [TLS_HOSTNAME])
                spki = cert.public_key().public_bytes(serialization.Encoding.DER, serialization.PublicFormat.SubjectPublicKeyInfo)
                self.assertEqual(metadata["spkiSha256"], base64.b64encode(hashlib.sha256(spki).digest()).decode())
                context = ssl.create_default_context(cafile=str(cert_path))
                endpoint = f"wss://127.0.0.1:{url.port}/ws?token={pages.token}"
                # Connect to loopback without DNS; validate the exact certificate hostname normally.
                async with connect(endpoint, ssl=context, server_hostname=TLS_HOSTNAME, proxy=None,
                                   subprotocols=["pages-realtime-room.rea-page-1"]) as socket:
                    self.assertEqual(socket.subprotocol, "pages-realtime-room.rea-page-1")
                    self.assertEqual(json.loads(await socket.recv())["type"], "server_capabilities")
                    await socket.send(json.dumps({"type": "sync_step_1"}))
                    self.assertEqual(json.loads(await socket.recv())["session_id"], "demo-rea-page-1")
                    await socket.send(json.dumps({"type": "ping", "iteration": 1}))
                    self.assertEqual(json.loads(await socket.recv()), {"type": "pong", "iteration": 1})
                for path, token, protocols in [("/ws", "wrong", ["pages-realtime-room.rea-page-1"]),
                                                ("/ws", pages.token, []),
                                                ("/wrong", pages.token, ["pages-realtime-room.rea-page-1"]),
                                                ("/ws", pages.token, ["pages-realtime-room.rea-page-2"])]:
                    async with connect(f"wss://127.0.0.1:{url.port}{path}?token={token}", ssl=context,
                                       server_hostname=TLS_HOSTNAME, proxy=None, subprotocols=protocols or None) as socket:
                        with self.assertRaises(ConnectionClosedError) as rejected:
                            await socket.recv()
                        self.assertEqual(rejected.exception.rcvd.code, 1008)
            self.assertEqual(list(folder.glob("demo-pages-tls-*")), [])

if __name__ == "__main__":
    unittest.main()
