param(
 [ValidateSet('debug','release')][string]$Configuration='debug',
 [string]$Destination,
 [string]$TargetDirectory=$env:CARGO_TARGET_DIR
)
$ErrorActionPreference='Stop'
$root=Split-Path -Parent $PSScriptRoot
if(-not $TargetDirectory){$TargetDirectory=Join-Path $root 'target'}
if(-not $Destination){$Destination=Join-Path $root 'dist\windows'}
$Destination=[IO.Path]::GetFullPath($Destination)
$binDir=Join-Path $TargetDirectory $Configuration
$names=@('native-workspace.exe','native-web-host.exe')
foreach($name in $names){if(-not (Test-Path -LiteralPath (Join-Path $binDir $name) -PathType Leaf)){throw "Build first: missing $name"}}
New-Item -ItemType Directory -Path $Destination -Force|Out-Null
foreach($name in $names){Copy-Item -LiteralPath (Join-Path $binDir $name) -Destination (Join-Path $Destination $name) -Force}
[IO.File]::WriteAllText((Join-Path $Destination 'SOURCE.txt'),$root,[Text.UTF8Encoding]::new($false))
$readme=@"
Native Workspace — Windows local demo

Run native-workspace.exe. Keep native-web-host.exe beside it for Browser.
No ChatGPT account or API key is required. Responses, connections and media use local fixtures.
The main interface is Rust/GPUI. WebView2 is used only by the separate HTML content window.
Windows with Microsoft Edge WebView2 Runtime is required for Browser.

Data: %LOCALAPPDATA%\NativeWorkspaceDemo and %LOCALAPPDATA%\NativeFrontendDemo.
Build configuration: $Configuration (symbols disabled for development builds).
This demonstrates frontend interactions; it does not establish exhaustive parity with ChatGPT.
"@
[IO.File]::WriteAllText((Join-Path $Destination 'README.txt'),$readme,[Text.UTF8Encoding]::new($false))
$files=foreach($name in $names){$file=Get-Item -LiteralPath (Join-Path $Destination $name);[pscustomobject]@{name=$name;bytes=$file.Length;sha256=(Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()}}
$manifest=[pscustomobject]@{created_utc=[DateTime]::UtcNow.ToString('o');configuration=$Configuration;files=@($files)}
[IO.File]::WriteAllText((Join-Path $Destination 'manifest.json'),($manifest|ConvertTo-Json -Depth 4),[Text.UTF8Encoding]::new($false))
$manifest|ConvertTo-Json -Depth 4
"Packaged: $Destination"