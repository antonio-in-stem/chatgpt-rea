param([Parameter(Mandatory)][string]$StateName,[Parameter(Mandatory)][string]$ExpectedName,[Parameter(Mandatory)][string]$OutputName)
$ErrorActionPreference='Stop'
if($StateName -notmatch '^demo-[a-zA-Z0-9_-]+$' -or $OutputName -notmatch '^[a-zA-Z0-9_-]+\.md$'){throw 'Explicit demo state and simple Markdown output name required'}
$state=(Resolve-Path -LiteralPath (Join-Path $PSScriptRoot ('state/'+$StateName))).Path
if(Test-Path -LiteralPath (Join-Path $state 'codex-home/auth.json')){throw 'Credential-free demo required'}
$session=Get-Content -LiteralPath (Join-Path $state 'demo-session.json') -Raw | ConvertFrom-Json
$location=Get-Content -LiteralPath (Join-Path $PSScriptRoot 'state/instrumented-profile-host/runtime-location.json') -Raw | ConvertFrom-Json
$process=Get-Process -Id $session.runtimePid
if($process.Path -ne (Join-Path $location.runtimeRoot 'ChatGPT.exe') -or $process.MainWindowTitle -notin @('Guardar como','Save As')){throw 'Expected native demo save dialog'}
$target=Join-Path $state $OutputName
if(Test-Path -LiteralPath $target){throw 'Refusing to overwrite existing export'}
Add-Type -AssemblyName UIAutomationClient
Add-Type -AssemblyName UIAutomationTypes
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class DemoMarkdownSave {
 [DllImport("user32.dll",CharSet=CharSet.Unicode)] public static extern IntPtr SendMessage(IntPtr h,uint m,IntPtr w,string l);
 [DllImport("user32.dll",EntryPoint="PostMessageW")] public static extern bool PostMessage(IntPtr h,uint m,IntPtr w,IntPtr l);
}
"@
$dialog=[System.Windows.Automation.AutomationElement]::FromHandle($process.MainWindowHandle)
$elements=$dialog.FindAll([System.Windows.Automation.TreeScope]::Descendants,[System.Windows.Automation.Condition]::TrueCondition)
$field=@($elements | Where-Object {$_.Current.Name -eq $ExpectedName -and $_.Current.AutomationId -eq '1001'})
$save=@($elements | Where-Object {$_.Current.Name -in @('Guardar','Save') -and $_.Current.AutomationId -eq '1'})
if($field.Count -ne 1 -or $save.Count -ne 1){throw 'Ambiguous native save controls'}
[void][DemoMarkdownSave]::SendMessage([IntPtr]$field[0].Current.NativeWindowHandle,12,[IntPtr]::Zero,$target)
if(![DemoMarkdownSave]::PostMessage([IntPtr]$save[0].Current.NativeWindowHandle,245,[IntPtr]::Zero,[IntPtr]::Zero)){throw 'Save click failed'}
$deadline=[DateTime]::UtcNow.AddSeconds(10)
while(!(Test-Path -LiteralPath $target)){if([DateTime]::UtcNow -gt $deadline){throw 'Save requested but output was not observed'};Start-Sleep -Milliseconds 100}
Write-Output ('Saved: '+$target)
