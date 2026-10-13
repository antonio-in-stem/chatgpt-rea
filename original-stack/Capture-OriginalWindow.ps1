param([Parameter(Mandatory=$true)][int]$DemoProcessId,[Parameter(Mandatory=$true)][string]$OutputPath,[ValidateRange(0,8192)][int]$ClientWidth=0,[ValidateRange(0,8192)][int]$ClientHeight=0,[switch]$Show,[int]$WindowIndex=0)
$ErrorActionPreference='Stop'
if(($ClientWidth -eq 0) -ne ($ClientHeight -eq 0)){throw 'Specify both client dimensions'}
$process=Get-Process -Id $DemoProcessId
if($process.Path -ne (Join-Path $PSScriptRoot 'pristine\ChatGPT.exe')){throw 'Only the isolated original runtime may be captured'}
Add-Type -AssemblyName System.Drawing
Add-Type @"
using System;
using System.Text;
using System.Runtime.InteropServices;
public static class DemoWindowCapture {
 [DllImport("user32.dll")] public static extern bool GetClientRect(IntPtr h,out Rect r);
 [DllImport("user32.dll")] public static extern uint GetDpiForWindow(IntPtr h);
 [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr h,IntPtr after,int x,int y,int width,int height,uint flags);
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
if($ClientWidth){
 $outer=[DemoWindowCapture+Rect]::new();$client=[DemoWindowCapture+Rect]::new()
 [DemoWindowCapture]::GetWindowRect($handle,[ref]$outer)|Out-Null
 [DemoWindowCapture]::GetClientRect($handle,[ref]$client)|Out-Null
 $width=$ClientWidth+($outer.right-$outer.left)-($client.right-$client.left)
 $height=$ClientHeight+($outer.bottom-$outer.top)-($client.bottom-$client.top)
 if(-not [DemoWindowCapture]::SetWindowPos($handle,[IntPtr]::Zero,0,0,$width,$height,6)){throw 'Client resize failed'}
 Start-Sleep -Milliseconds 700
}
$client=[DemoWindowCapture+Rect]::new()
[DemoWindowCapture]::GetClientRect($handle,[ref]$client)|Out-Null
if($ClientWidth -and (($client.right-$client.left) -ne $ClientWidth -or ($client.bottom-$client.top) -ne $ClientHeight)){throw 'Client dimensions do not match requested size'}
$rect=[DemoWindowCapture+Rect]::new()
[DemoWindowCapture]::GetWindowRect($handle,[ref]$rect)|Out-Null
$bitmap=[Drawing.Bitmap]::new($rect.right-$rect.left,$rect.bottom-$rect.top)
$graphics=[Drawing.Graphics]::FromImage($bitmap)
$dc=$graphics.GetHdc()
try{$captured=[DemoWindowCapture]::PrintWindow($handle,$dc,2)}finally{$graphics.ReleaseHdc($dc)}
try{$bitmap.Save([IO.Path]::GetFullPath($OutputPath),[Drawing.Imaging.ImageFormat]::Png)}finally{$graphics.Dispose();$bitmap.Dispose()}
[pscustomobject]@{Pid=$DemoProcessId;Handle=$handle.ToInt64();Captured=$captured;ClientWidth=($client.right-$client.left);ClientHeight=($client.bottom-$client.top);Dpi=[DemoWindowCapture]::GetDpiForWindow($handle);OutputPath=$OutputPath}|ConvertTo-Json


