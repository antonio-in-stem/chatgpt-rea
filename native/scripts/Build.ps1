param(
    [string]$TargetDirectory = $env:CARGO_TARGET_DIR,
    [switch]$Test
)
$ErrorActionPreference = 'Stop'
$nativeRoot = Split-Path -Parent $PSScriptRoot
if ($TargetDirectory) { $env:CARGO_TARGET_DIR = [System.IO.Path]::GetFullPath($TargetDirectory) }
$env:CARGO_BUILD_JOBS = '2'
if ($Test) {
    & cargo test --workspace --all-features --locked --manifest-path (Join-Path $nativeRoot 'Cargo.toml')
} else {
    & cargo build --workspace --locked --manifest-path (Join-Path $nativeRoot 'Cargo.toml')
}
if ($LASTEXITCODE -ne 0) { throw "Cargo failed: $LASTEXITCODE" }
