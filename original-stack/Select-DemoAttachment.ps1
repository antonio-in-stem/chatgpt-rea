param([Parameter(Mandatory)][ValidatePattern('^demo-[a-zA-Z0-9_-]+$')][string]$StateName,[Parameter(Mandatory)][ValidateSet('png','txt','both','cancel')][string]$Action)
$ErrorActionPreference='Stop'
$state=(Resolve-Path -LiteralPath (Join-Path $PSScriptRoot ('state/'+$StateName))).Path
if(Test-Path -LiteralPath (Join-Path $state 'codex-home/auth.json')){throw 'Credential-free demo required'}
$session=Get-Content -LiteralPath (Join-Path $state 'demo-session.json') -Raw | ConvertFrom-Json
$location=Get-Content -LiteralPath (Join-Path $PSScriptRoot 'state/instrumented-profile-host/runtime-location.json') -Raw | ConvertFrom-Json
$process=Get-Process -Id $session.runtimePid
if($process.Path -ne (Join-Path $location.runtimeRoot 'ChatGPT.exe') -or $process.MainWindowTitle -ne 'Select files'){throw 'Expected native demo file picker'}
Add-Type -AssemblyName UIAutomationClient
Add-Type -AssemblyName UIAutomationTypes
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class DemoAttachmentPicker {
 [DllImport("user32.dll",CharSet=CharSet.Unicode)] public static extern IntPtr SendMessage(IntPtr h,uint m,IntPtr w,string l);
 [DllImport("user32.dll",EntryPoint="PostMessageW")] public static extern bool PostMessage(IntPtr h,uint m,IntPtr w,IntPtr l);
}
"@
$dialog=[System.Windows.Automation.AutomationElement]::FromHandle($process.MainWindowHandle)
$elements=$dialog.FindAll([System.Windows.Automation.TreeScope]::Descendants,[System.Windows.Automation.Condition]::TrueCondition)
$buttonId=if($Action -eq 'cancel'){'2'}else{'1'}
$names=if($Action -eq 'cancel'){@('Cancelar','Cancel')}else{@('Abrir','Open')}
$button=@($elements | Where-Object {$_.Current.AutomationId -eq $buttonId -and $_.Current.ClassName -eq 'Button' -and $_.Current.Name -in $names})
if($button.Count -ne 1){throw 'Ambiguous picker button'}
if($Action -ne 'cancel'){
 $fixtures=@(
  @{Kind='png';Name='rea-library-colors.png';Hash='bad602fa778ffb7015abcfaefa50ab8be057254e9fc63bdbaaf243803de481f8'},
  @{Kind='txt';Name='rea-library-original.txt';Hash='bc6f56fced276607d0ca1ff946bc51bec10f37233774e263ef7095ba46005946'}
 )
 $targets=@(foreach($fixture in $fixtures){
  if($Action -ne 'both' -and $Action -ne $fixture.Kind){continue}
  $target=(Resolve-Path -LiteralPath (Join-Path $state $fixture.Name)).Path
  if(-not $target.StartsWith($state+[IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)){throw 'Fixture outside demo'}
  $check=$target
  while($check -ne $PSScriptRoot){if((Get-Item -LiteralPath $check).Attributes -band [IO.FileAttributes]::ReparsePoint){throw 'Reparse fixture path'};$check=[IO.Path]::GetDirectoryName($check);if(-not $check){throw 'Invalid fixture ancestor'}}
  if((Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash -ne $fixture.Hash){throw 'Unexpected fixture bytes'}
  $target
 })
 $selection=($targets | ForEach-Object {'"'+$_+'"'}) -join ' '
 $field=@($elements | Where-Object {$_.Current.AutomationId -eq '1148' -and $_.Current.ClassName -eq 'Edit'})
 if($field.Count -ne 1){throw 'Ambiguous picker filename field'}
 [void][DemoAttachmentPicker]::SendMessage([IntPtr]$field[0].Current.NativeWindowHandle,12,[IntPtr]::Zero,$selection)
}
if(![DemoAttachmentPicker]::PostMessage([IntPtr]$button[0].Current.NativeWindowHandle,245,[IntPtr]::Zero,[IntPtr]::Zero)){throw 'Picker action failed'}
Write-Output ('Native picker requested: '+$Action+'; verify renderer result separately')
