param([switch]$WaitForExit,[switch]$InspectRuntime)
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
# Child-only product configuration; never changes this shell or the user's environment.
$start.Environment['CODEX_ELECTRON_USER_DATA_PATH']=Join-Path $state 'profile'
$start.Environment['CODEX_HOME']=Join-Path $state 'codex-home'
$start.Environment['APPDATA']=Join-Path $state 'appdata'
$start.Environment['LOCALAPPDATA']=Join-Path $state 'localappdata'
foreach($key in @('OPENAI_API_KEY','CODEX_ACCESS_TOKEN','NODE_OPTIONS','ELECTRON_RUN_AS_NODE')){$start.Environment.Remove($key) | Out-Null}
$start.ArgumentList.Add('--user-data-dir='+(Join-Path $state 'profile'))
if($InspectRuntime){
 $start.ArgumentList.Add('--remote-debugging-address=127.0.0.1')
 $start.ArgumentList.Add('--remote-debugging-port=0')
}
$process=[Diagnostics.Process]::Start($start)
[pscustomobject]@{pid=$process.Id;executable=$start.FileName;profile=(Join-Path $state 'profile');startedUtc=[DateTime]::UtcNow.ToString('o')} | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $state 'last-launch.json') -Encoding utf8
if($WaitForExit){$process.WaitForExit();[pscustomobject]@{pid=$process.Id;exitCode=$process.ExitCode}}else{[pscustomobject]@{pid=$process.Id;executable=$start.FileName}}
