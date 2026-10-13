param(
 [switch]$WaitForExit,
 # Caller owns the returned process and must drain/dispose both redirected streams.
 [switch]$PassThru,
 [switch]$Visible,
 [switch]$InspectRuntime,
 [switch]$DryRun,
 [switch]$DemoHost,
 [switch]$DemoPagesTls,
 [ValidatePattern('^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$')][string]$StateName,
 [string]$DemoTransportUrl
)
$ErrorActionPreference='Stop'
if($PassThru -and $WaitForExit){throw 'PassThru and WaitForExit are mutually exclusive'}
$runtime=Join-Path $PSScriptRoot 'pristine'
$inventoryPath=Join-Path $PSScriptRoot 'runtime-inventory.json'
if($DemoHost){
 if(-not $DemoTransportUrl -or $StateName -notlike 'demo-*'){throw 'Instrumented host requires a named demo and loopback adapter'}
 $location=Get-Content -LiteralPath (Join-Path $PSScriptRoot 'state/instrumented-profile-host/runtime-location.json') -Raw | ConvertFrom-Json
 $runtime=$location.runtimeRoot
 $inventoryPath=$location.inventoryPath
 $patch=Get-Content -LiteralPath $location.patchManifestPath -Raw | ConvertFrom-Json
 if($patch.mode -ne 'instrumented-demo-host' -or $patch.rendererFilesModified){throw 'Unexpected host patch manifest'}
 $asar=Join-Path $runtime 'resources/app.asar'
 if((Get-FileHash -LiteralPath $asar -Algorithm SHA256).Hash.ToLowerInvariant() -ne $patch.outputSha256){throw 'Demo host package differs from manifest'}
}

if(-not(Test-Path -LiteralPath $inventoryPath)){throw 'Run Complete-Runtime.ps1 first'}
$verifiedRuntime=& (Join-Path $PSScriptRoot 'Verify-Runtime.ps1') -RuntimeRoot $runtime -InventoryPath $inventoryPath
$state=Join-Path $PSScriptRoot 'state'
if($StateName){$state=Join-Path $state $StateName}
if($DemoTransportUrl){
 $endpoint=$null
 if(-not [Uri]::TryCreate($DemoTransportUrl,[UriKind]::Absolute,[ref]$endpoint) -or
    $endpoint.Scheme -ne 'ws' -or $endpoint.Host -ne '127.0.0.1' -or
    $endpoint.Port -lt 1 -or $endpoint.UserInfo -or $endpoint.Query -or $endpoint.Fragment -or
    $endpoint.AbsolutePath -ne '/'){
  throw 'DemoTransportUrl must be ws://127.0.0.1:<port> with no credentials, path or query'
 }
 if(-not $StateName){throw 'Demo transport requires an explicitly named fresh state directory'}
 if(Test-Path -LiteralPath (Join-Path $state 'codex-home/auth.json')){throw 'Demo state contains account credentials; choose a fresh StateName'}
}
foreach($directory in @('profile','codex-home','appdata','localappdata')){New-Item -ItemType Directory -Path (Join-Path $state $directory) -Force | Out-Null}
$start=[Diagnostics.ProcessStartInfo]::new()
$start.FileName=Join-Path $runtime 'ChatGPT.exe'
$start.WorkingDirectory=$runtime
$start.UseShellExecute=$false
$start.RedirectStandardOutput=[bool]$PassThru
$start.RedirectStandardError=[bool]$PassThru
$start.WindowStyle=if($Visible){[Diagnostics.ProcessWindowStyle]::Normal}else{[Diagnostics.ProcessWindowStyle]::Hidden}
# Remove parent agent/runtime routing and credentials from the child only.
# Separate profile directories alone do not prove native account-store isolation.
foreach($key in @($start.Environment.Keys)){
 if($key -match '^(CODEX_|CHATGPT_|OWL_|ELECTRON_|OPENAI_|NODE_)'){
  $start.Environment.Remove($key) | Out-Null
 }
}
# Child-only product configuration; never changes this shell or the user's environment.
$start.Environment['CODEX_ELECTRON_USER_DATA_PATH']=Join-Path $state 'profile'
$start.Environment['CODEX_HOME']=Join-Path $state 'codex-home'
$start.Environment.Remove('REA_DEMO_SETTINGS_PATH') | Out-Null
if($DemoHost){$start.Environment['REA_DEMO_SETTINGS_PATH']=Join-Path $state 'demo-sidebar-settings.json'}
if($DemoTransportUrl){$start.Environment['CODEX_APP_SERVER_WS_URL']=$DemoTransportUrl}
$start.Environment['APPDATA']=Join-Path $state 'appdata'
$start.Environment['LOCALAPPDATA']=Join-Path $state 'localappdata'
$start.ArgumentList.Add('--user-data-dir='+(Join-Path $state 'profile'))
if($DemoPagesTls){
 if(-not $DemoHost -or -not $DemoTransportUrl){throw 'TLS Pages is demo-only'}
 $pageRuntime=Get-Content -LiteralPath (Join-Path $state 'demo-pages-runtime.json') -Raw | ConvertFrom-Json
 $demoHostname='pages-realtime.gateway.rea-demo.api.openai.com'
 if($pageRuntime.tlsHostname -ne $demoHostname -or $pageRuntime.spkiSha256 -notmatch '^[A-Za-z0-9+/]{43}=$' -or $pageRuntime.endpoint -notmatch '^wss://pages-realtime\.gateway\.rea-demo\.api\.openai\.com:[1-9][0-9]*/ws$'){throw 'Invalid isolated TLS runtime'}
 $start.ArgumentList.Add('--host-resolver-rules=MAP '+$demoHostname+' 127.0.0.1')
 $start.ArgumentList.Add('--ignore-certificate-errors-spki-list='+$pageRuntime.spkiSha256)
 $start.Environment['REA_DEMO_PAGES_TLS']='1'
}else{$start.Environment.Remove('REA_DEMO_PAGES_TLS') | Out-Null}
if($InspectRuntime){
 $start.ArgumentList.Add('--remote-debugging-address=127.0.0.1')
 $start.ArgumentList.Add('--remote-debugging-port=0')
}
if($DryRun){
 [pscustomobject]@{
  verifiedFiles=$verifiedRuntime.verifiedFiles
  inventorySha256=$verifiedRuntime.inventorySha256
  executable=$start.FileName
  arguments=@($start.ArgumentList)
  productEnvironmentKeys=@($start.Environment.Keys | Where-Object {$_ -match '^(CODEX_|CHATGPT_|OWL_|ELECTRON_|OPENAI_|NODE_)'} | Sort-Object)
  profile=$start.Environment['CODEX_ELECTRON_USER_DATA_PATH']
  codexHome=$start.Environment['CODEX_HOME']
  demoTransport=$DemoTransportUrl
  accountIsolationVerified=$false
 } | ConvertTo-Json -Depth 3
 return
}
$process=[Diagnostics.Process]::Start($start)
[pscustomobject]@{pid=$process.Id;executable=$start.FileName;profile=(Join-Path $state 'profile');startedUtc=[DateTime]::UtcNow.ToString('o')} | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $state 'last-launch.json') -Encoding utf8
if($PassThru){$process}elseif($WaitForExit){$process.WaitForExit();[pscustomobject]@{pid=$process.Id;exitCode=$process.ExitCode}}else{[pscustomobject]@{pid=$process.Id;executable=$start.FileName}}
