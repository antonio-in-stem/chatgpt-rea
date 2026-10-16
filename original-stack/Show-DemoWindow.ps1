param([Parameter(Mandatory)][ValidatePattern('^demo-[a-zA-Z0-9_-]+$')][string]$StateName)
$ErrorActionPreference='Stop'
$state=Join-Path (Join-Path $PSScriptRoot 'state') $StateName
if(Test-Path -LiteralPath (Join-Path $state 'codex-home/auth.json')){throw 'Credential-free demo required'}
$session=Get-Content -LiteralPath (Join-Path $state 'demo-session.json') -Raw | ConvertFrom-Json
$demo=Get-Process -Id $session.runtimePid -ErrorAction Stop
$expected=$session.runtimeExecutable
if(-not $expected){
 $locationFile=Join-Path $PSScriptRoot 'state/instrumented-profile-host/runtime-location.json'
 $location=Get-Content -LiteralPath $locationFile -Raw | ConvertFrom-Json
 $expected=Join-Path ([IO.Path]::GetFullPath($location.runtimeRoot,(Split-Path -Parent $locationFile))) 'ChatGPT.exe'
}
if(-not $demo.Path -or -not [string]::Equals($demo.Path,[IO.Path]::GetFullPath($expected),[StringComparison]::OrdinalIgnoreCase)){throw 'Demo process path differs from verified launch'}
$details=Get-CimInstance Win32_Process -Filter "ProcessId = $($demo.Id)"
$profile=[IO.Path]::GetFullPath((Join-Path $state 'profile'))
$escapedProfile=[regex]::Escape($profile)
$profileArgument='(?:^|\s)(?:"--user-data-dir='+$escapedProfile+'"|--user-data-dir="'+$escapedProfile+'"|--user-data-dir='+$escapedProfile+')(?=\s|$)'
if($details.CommandLine -notmatch $profileArgument){throw 'Demo process profile differs from requested state'}
if($demo.MainWindowHandle -eq 0){throw 'Demo window is not ready'}
Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public static class ReaDemoWindow { [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr h); [DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr h,int command); }'
$wasMinimized=[ReaDemoWindow]::IsIconic($demo.MainWindowHandle)
if($wasMinimized){
 if(-not [ReaDemoWindow]::ShowWindowAsync($demo.MainWindowHandle,9)){throw 'Demo restore request failed'}
 $deadline=[DateTime]::UtcNow.AddSeconds(3)
 while([ReaDemoWindow]::IsIconic($demo.MainWindowHandle) -and [DateTime]::UtcNow -lt $deadline){Start-Sleep -Milliseconds 50}
 if([ReaDemoWindow]::IsIconic($demo.MainWindowHandle)){throw 'Demo window stayed minimized'}
}
[pscustomobject]@{runtimePid=$demo.Id;wasMinimized=$wasMinimized;minimized=$false;profileMatched=$true} | ConvertTo-Json -Compress
