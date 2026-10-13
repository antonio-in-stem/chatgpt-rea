param([Parameter(Mandatory=$true)][int]$DemoProcessId,[Parameter(Mandatory=$true)][string]$OutputPath,[switch]$Show,[int]$WindowIndex=0)
$ErrorActionPreference='Stop'
$process=Get-Process -Id $DemoProcessId
if($process.Path -ne (Join-Path $PSScriptRoot 'pristine\ChatGPT.exe')){throw 'Only the isolated original runtime may be captured'}
Add-Type -AssemblyName System.Drawing
Add-Type @"
using System;
using System.Text;
using System.Runtime.InteropServices;
public static class DemoWindowCapture {
 public delegate bool Callback(IntPtr h,IntPtr l);
 [StructLayout(LayoutKind.Sequential)] public struct Rect { public int left,top,right,bottom; }
 [DllImport("user32.dll")] public static extern bool EnumWindows(Callback cb,IntPtr l);
 [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h,out uint p);
 [DllImport("user32.dll",CharSet=CharSet.Unicode)] public static extern int GetWindowText(IntPtr h,StringBuilder b,int n);
 [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h,int n);
 [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr h,IntPtr dc,uint flags);
 [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h,out Rect r);
}
"@
$matches=[Collections.Generic.List[IntPtr]]::new()
[DemoWindowCapture]::EnumWindows({param($handle,$unused)
 $owner=[uint32]0
 [DemoWindowCapture]::GetWindowThreadProcessId($handle,[ref]$owner)|Out-Null
 if($owner -eq $DemoProcessId){
  $title=[Text.StringBuilder]::new(512)
  [DemoWindowCapture]::GetWindowText($handle,$title,512)|Out-Null
  $r=[DemoWindowCapture+Rect]::new(); [DemoWindowCapture]::GetWindowRect($handle,[ref]$r)|Out-Null; if(($r.right-$r.left) -gt 400 -and ($r.bottom-$r.top) -gt 300){$matches.Add($handle)}
 }
 return $true
},[IntPtr]::Zero)|Out-Null
if($matches.Count -eq 0){throw "No isolated app window found"}
$handle=@($matches | Sort-Object { $bounds=[DemoWindowCapture+Rect]::new(); [DemoWindowCapture]::GetWindowRect($_,[ref]$bounds)|Out-Null; ($bounds.right-$bounds.left)*($bounds.bottom-$bounds.top) } -Descending)[$WindowIndex]
if($Show){[DemoWindowCapture]::ShowWindow($handle,4)|Out-Null;Start-Sleep -Milliseconds 700}
$rect=[DemoWindowCapture+Rect]::new()
[DemoWindowCapture]::GetWindowRect($handle,[ref]$rect)|Out-Null
$bitmap=[Drawing.Bitmap]::new($rect.right-$rect.left,$rect.bottom-$rect.top)
$graphics=[Drawing.Graphics]::FromImage($bitmap)
$dc=$graphics.GetHdc()
try{$captured=[DemoWindowCapture]::PrintWindow($handle,$dc,2)}finally{$graphics.ReleaseHdc($dc)}
try{$bitmap.Save([IO.Path]::GetFullPath($OutputPath),[Drawing.Imaging.ImageFormat]::Png)}finally{$graphics.Dispose();$bitmap.Dispose()}
[pscustomobject]@{Pid=$DemoProcessId;Handle=$handle.ToInt64();Captured=$captured;OutputPath=$OutputPath}|ConvertTo-Json


