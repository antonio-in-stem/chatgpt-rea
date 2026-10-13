param(
 [string]$InstalledApp='C:\Program Files\WindowsApps\OpenAI.Codex_26.1007.2314.0_x64__2p2nqsd0c76g0\app'
)
$ErrorActionPreference='Stop'
$destination=Join-Path $PSScriptRoot 'pristine'
New-Item -ItemType Directory -Path $destination -Force | Out-Null
$records=foreach($relative in @('ChatGPT.exe','Codex.exe','owl-shell-runtime.json','resources\app.asar','resources\owl-app.ini','resources\owl-electron-app.json')) {
 $source=Join-Path $InstalledApp $relative
 $target=Join-Path $destination $relative
 $hash=(Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash.ToLowerInvariant()
 if(Test-Path -LiteralPath $target){
  if((Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant() -ne $hash){throw "Existing snapshot differs: $relative"}
 }else{
  New-Item -ItemType Directory -Path (Split-Path -Parent $target) -Force | Out-Null
  Copy-Item -LiteralPath $source -Destination $target
 }
 if((Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant() -ne $hash){throw "Snapshot verification failed: $relative"}
 [pscustomobject]@{path=$relative;bytes=(Get-Item -LiteralPath $target).Length;sha256=$hash}
}
$manifest=[pscustomobject]@{source=$InstalledApp;capturedUtc=[DateTime]::UtcNow.ToString('o');runtime='Owl Chromium / Electron compatibility';scope='Exact launchers, runtime metadata and ASAR. Not a standalone executable distribution.';files=@($records)}
$manifest | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'snapshot.json') -Encoding utf8
$manifest | ConvertTo-Json -Depth 5
