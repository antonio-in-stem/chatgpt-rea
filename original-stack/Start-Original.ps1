param([switch]$WaitForExit,[switch]$InspectRuntime,[switch]$DryRun)
$ErrorActionPreference='Stop'
$runtime=Join-Path $PSScriptRoot 'pristine'
$inventoryPath=Join-Path $PSScriptRoot 'runtime-inventory.json'
if(-not(Test-Path -LiteralPath $inventoryPath)){throw 'Run Complete-Runtime.ps1 first'}
$inventory=Get-Content -LiteralPath $inventoryPath -Raw | ConvertFrom-Json
foreach($relative in @('ChatGPT.exe','resources\app.asar')){
 $record=$inventory.files | Where-Object path -eq $relative
 $actual=(Get-FileHash -LiteralPath (Join-Path $runtime $relative) -Algorithm SHA256).Hash.ToLowerInvariant()
 if($record.sha256 -ne $actual){throw "Pristine input changed: $relative"}
}
$state=Join-Path $PSScriptRoot 'state'
foreach($directory in @('profile','codex-home','appdata','localappdata')){New-Item -ItemType Directory -Path (Join-Path $state $directory) -Force | Out-Null}
$start=[Diagnostics.ProcessStartInfo]::new()
$start.FileName=Join-Path $runtime 'ChatGPT.exe'
$start.WorkingDirectory=$runtime
$start.UseShellExecute=$false
$start.WindowStyle=[Diagnostics.ProcessWindowStyle]::Hidden
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
$start.Environment['APPDATA']=Join-Path $state 'appdata'
$start.Environment['LOCALAPPDATA']=Join-Path $state 'localappdata'
$start.ArgumentList.Add('--user-data-dir='+(Join-Path $state 'profile'))
if($InspectRuntime){
 $start.ArgumentList.Add('--remote-debugging-address=127.0.0.1')
 $start.ArgumentList.Add('--remote-debugging-port=0')
}
if($DryRun){
 [pscustomobject]@{
  executable=$start.FileName
  arguments=@($start.ArgumentList)
  productEnvironmentKeys=@($start.Environment.Keys | Where-Object {$_ -match '^(CODEX_|CHATGPT_|OWL_|ELECTRON_|OPENAI_|NODE_)'} | Sort-Object)
  profile=$start.Environment['CODEX_ELECTRON_USER_DATA_PATH']
  codexHome=$start.Environment['CODEX_HOME']
  accountIsolationVerified=$false
 } | ConvertTo-Json -Depth 3
 return
}
$process=[Diagnostics.Process]::Start($start)
[pscustomobject]@{pid=$process.Id;executable=$start.FileName;profile=(Join-Path $state 'profile');startedUtc=[DateTime]::UtcNow.ToString('o')} | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $state 'last-launch.json') -Encoding utf8
if($WaitForExit){$process.WaitForExit();[pscustomobject]@{pid=$process.Id;exitCode=$process.ExitCode}}else{[pscustomobject]@{pid=$process.Id;executable=$start.FileName}}
