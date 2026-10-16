param(
 [ValidatePattern('^demo-[a-zA-Z0-9][a-zA-Z0-9_-]{0,57}$')][string]$StateName='demo-desktop',
 [ValidateSet('ready','notConfigured','updateRequired')][string]$WindowsScenario='ready',
 [ValidateRange(0,10)][double]$ChunkDelay=0.6,
 [switch]$InspectRuntime,
 [switch]$DemoHost,
 [switch]$DemoPagesTls,
 [switch]$DryRun,
 [string]$FrontendPackageRoot
)
$ErrorActionPreference='Stop'
if($DemoPagesTls -and -not $DemoHost){throw 'TLS Pages requires demo host'}
$state=Join-Path (Join-Path $PSScriptRoot 'state') $StateName
$runtime=(Resolve-Path -LiteralPath (Join-Path $PSScriptRoot 'pristine')).Path
$python=(Get-Command python -CommandType Application -ErrorAction Stop | Select-Object -First 1).Source
$stores=@{project=Join-Path $state 'demo-projects.json';config=Join-Path $state 'demo-config.json';thread=Join-Path $state 'demo-threads.json'}
# Preflight uses the same integrity/profile checks as the actual launcher.
$preflight=& (Join-Path $PSScriptRoot 'Start-Original.ps1') -StateName $StateName -DemoTransportUrl 'ws://127.0.0.1:1' -DemoHost:$DemoHost -FrontendPackageRoot $FrontendPackageRoot -DryRun | ConvertFrom-Json
$runtime=Split-Path -Parent $preflight.executable
if($DryRun){
 [pscustomobject]@{python=$python;executable=$preflight.executable;profile=$preflight.profile;stores=$stores;simulatedWindowsReadiness=$WindowsScenario;executesTools=$false;startsProcesses=$false} | ConvertTo-Json -Depth 4
 return
}
$key=[Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($runtime.ToLowerInvariant())))
$mutex=[Threading.Mutex]::new($false,('Local\ReaDemo-'+$key))
$owned=$false
$adapter=$null
$app=$null
$runtimeLogs=@()
$runtimeCopies=@()
try{
 try{$owned=$mutex.WaitOne(0)}catch [Threading.AbandonedMutexException]{$owned=$true}
 if(-not $owned){throw 'Another demo launcher owns this runtime; close it before launching again.'}
 $prefix=$runtime+'\'
 $existing=Get-Process | Where-Object {$_.Path -and $_.Path.StartsWith($prefix,[StringComparison]::OrdinalIgnoreCase)}
 if($existing){throw 'The copied runtime is already open. Close that demo window before launching another adapter.'}
 $start=[Diagnostics.ProcessStartInfo]::new()
 $start.FileName=$python
 $start.WorkingDirectory=$PSScriptRoot
 $start.UseShellExecute=$false
 $start.CreateNoWindow=$true
 $start.WindowStyle=[Diagnostics.ProcessWindowStyle]::Hidden
 $start.RedirectStandardOutput=$true
 $start.RedirectStandardError=$true
 foreach($argument in @('-u',(Join-Path $PSScriptRoot 'demo_transport.py'),'--output',(Join-Path $state 'demo-methods.jsonl'),'--project-state',$stores.project,'--config-state',$stores.config,'--thread-state',$stores.thread,'--demo-sandbox-state',$WindowsScenario,'--demo-chunk-delay',$ChunkDelay.ToString([Globalization.CultureInfo]::InvariantCulture))){$start.ArgumentList.Add($argument)}
 if($DemoHost){$start.ArgumentList.Add('--demo-profile-identity')}
 if($DemoPagesTls){$start.ArgumentList.Add('--demo-pages-tls')}
 $adapter=[Diagnostics.Process]::Start($start)
 $errors=$adapter.StandardError.ReadToEndAsync()
 $line=$adapter.StandardOutput.ReadLineAsync()
 if(-not $line.Wait(20000)){throw 'Demo adapter startup timed out.'}
 $announcement=$line.Result | ConvertFrom-Json
 if(-not $announcement -or $announcement.mode -ne 'demo-contract-adapter' -or $announcement.endpoint -notmatch '^ws://127\.0\.0\.1:[0-9]+$'){throw 'Invalid demo adapter startup response.'}
 $remainingOutput=$adapter.StandardOutput.ReadToEndAsync()
 foreach($name in @('runtime-stdout.log','runtime-stderr.log')){
  $runtimeLogs+= [IO.FileStream]::new((Join-Path $state $name),[IO.FileMode]::Create,[IO.FileAccess]::Write,[IO.FileShare]::Read,4096,$true)
 }
 $app=& (Join-Path $PSScriptRoot 'Start-Original.ps1') -StateName $StateName -DemoTransportUrl $announcement.endpoint -InspectRuntime:$InspectRuntime -DemoHost:$DemoHost -DemoPagesTls:$DemoPagesTls -FrontendPackageRoot $FrontendPackageRoot -Visible -PassThru
 # Drain both pipes concurrently; never accumulate unbounded runtime logs in memory.
 $runtimeCopies+= $app.StandardOutput.BaseStream.CopyToAsync($runtimeLogs[0])
 $runtimeCopies+= $app.StandardError.BaseStream.CopyToAsync($runtimeLogs[1])
 Write-Host ('Demo runtime process started; UI readiness is not yet verified. Windows readiness is simulated: '+$WindowsScenario+'. No tools are executed.')
 [pscustomobject]@{runtimePid=$app.Id;adapterPid=$adapter.Id;endpoint=$announcement.endpoint;profile=$preflight.profile;stores=$stores} | ConvertTo-Json -Depth 3 | Set-Content -LiteralPath (Join-Path $state 'demo-session.json') -Encoding utf8
 while(-not $app.WaitForExit(500)){
  foreach($copy in $runtimeCopies){if($copy.IsFaulted){$copy.GetAwaiter().GetResult()}}
  if($adapter.HasExited){throw 'Demo adapter exited while the frontend was open. See adapter-error.log in this profile.'}
 }
 if($app.ExitCode -ne 0){throw ('Demo runtime exited with code '+$app.ExitCode+'. See runtime-stderr.log in this profile.')}

}finally{
 if($adapter){
  if(-not $adapter.HasExited){$adapter.Kill();$adapter.WaitForExit()}
  if($errors){$errors.GetAwaiter().GetResult() | Set-Content -LiteralPath (Join-Path $state 'adapter-error.log') -Encoding utf8}
  $adapter.Dispose()
 }
 if($app){
  if(-not $app.HasExited){$app.Kill($true);$app.WaitForExit()}
  foreach($copy in $runtimeCopies){
   try{if(-not $copy.Wait(5000)){Write-Warning "Runtime log pipe did not close within 5 seconds"}}catch{Write-Warning ("Runtime log capture failed: "+$_.Exception.GetType().Name)}
  }
  $app.Dispose()
 }
 foreach($log in $runtimeLogs){$log.Dispose()}
 if($owned){$mutex.ReleaseMutex()}
 $mutex.Dispose()
}
