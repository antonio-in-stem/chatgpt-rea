$ErrorActionPreference='Stop'
$fixture=Join-Path ([IO.Path]::GetTempPath()) ('rea-relocation-'+[Guid]::NewGuid().ToString('N'))
$bundle=Join-Path $fixture 'before move'
$destination=Join-Path $fixture 'after move'
$passed=0
function Assert($condition,$message){if(-not $condition){throw $message};$script:passed++}
function Reject($action,$message){try{& $action | Out-Null}catch{if($_.Exception.Message -notlike $message){throw};$script:passed++;return};throw "Expected rejection: $message"}
try {
 New-Item -ItemType Directory -Path (Join-Path $bundle 'runtime/resources'),(Join-Path $bundle 'tools') -Force | Out-Null
 foreach($name in @('Start-Demo.ps1','Start-Original.ps1','Verify-Runtime.ps1')){Copy-Item -LiteralPath (Join-Path $PSScriptRoot $name) -Destination (Join-Path $bundle ('tools/'+$name))}
 [IO.File]::WriteAllText((Join-Path $bundle 'runtime/ChatGPT.exe'),'inert test fixture; never executed')
 [IO.File]::WriteAllText((Join-Path $bundle 'runtime/resources/app.asar'),'original-renderer-placeholder-for-contract-test-only')
 $files=@('ChatGPT.exe','resources/app.asar') | ForEach-Object {$p=Join-Path $bundle ('runtime/'+$_);@{path=$_;bytes=(Get-Item -LiteralPath $p).Length;sha256=(Get-FileHash -LiteralPath $p -Algorithm SHA256).Hash.ToLowerInvariant()}}
 @{files=@($files);fileCount=2;bytes=($files | Measure-Object bytes -Sum).Sum} | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $bundle 'inventory.json')
 @{mode='instrumented-demo-host';rendererFilesModified=$false;outputSha256=$files[1].sha256} | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $bundle 'patch.json')
 $location=@{runtimeRoot='runtime';inventoryPath='inventory.json';patchManifestPath='patch.json'}
 $location | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $bundle 'runtime-location.json')
 $launch=Join-Path $bundle 'tools/Start-Demo.ps1';$manifest=Join-Path $bundle 'runtime-location.json'
 $first=& $launch -StateName demo-relocation -DemoHost -RuntimeLocationPath $manifest -DryRun | ConvertFrom-Json
 Assert ($first.executable -eq (Join-Path $bundle 'runtime/ChatGPT.exe') -and -not $first.startsProcesses) 'Initial preflight failed'
 # Both resolved paths stay in this fresh temporary fixture. Move only our bundle.
 foreach($p in @($bundle,$destination)){if(-not [IO.Path]::GetFullPath($p).StartsWith([IO.Path]::GetFullPath($fixture)+'\',[StringComparison]::OrdinalIgnoreCase)){throw 'Move escaped temporary fixture'}}
 Move-Item -LiteralPath $bundle -Destination $destination
 $bundle=$destination;$manifest=Join-Path $bundle 'runtime-location.json';$launch=Join-Path $bundle 'tools/Start-Demo.ps1'
 $second=& $launch -StateName demo-relocation -DemoHost -RuntimeLocationPath $manifest -DryRun | ConvertFrom-Json
 Assert ($second.executable -eq (Join-Path $bundle 'runtime/ChatGPT.exe') -and -not $second.startsProcesses) 'Relocated preflight failed'
 $location.runtimeRoot=Join-Path $bundle 'runtime';$location.inventoryPath=Join-Path $bundle 'inventory.json';$location.patchManifestPath=Join-Path $bundle 'patch.json'
 $location | ConvertTo-Json | Set-Content -LiteralPath $manifest
 $absolute=& $launch -StateName demo-relocation -DemoHost -RuntimeLocationPath $manifest -DryRun | ConvertFrom-Json
 Assert ($absolute.executable -eq $second.executable) 'Absolute manifest compatibility failed'
 Reject {& $launch -StateName demo-relocation -RuntimeLocationPath $manifest -DryRun} 'RuntimeLocationPath requires DemoHost'
 [IO.File]::AppendAllText((Join-Path $bundle 'runtime/ChatGPT.exe'),'changed')
 Reject {& $launch -StateName demo-relocation -DemoHost -RuntimeLocationPath $manifest -DryRun} 'Runtime size mismatch:*'
 $location.runtimeRoot='';$location | ConvertTo-Json | Set-Content -LiteralPath $manifest
 Reject {& $launch -StateName demo-relocation -DemoHost -RuntimeLocationPath $manifest -DryRun} 'Invalid runtime location field: runtimeRoot'
 [pscustomobject]@{passed=$passed;scope='Relocated inert fixtures; preflight only; no executable launched';pristineRequired=$false} | ConvertTo-Json
}finally{
 # Delete only files enumerated inside the unique test root, then empty directories.
 if(Test-Path -LiteralPath $fixture){
  $entries=@(Get-ChildItem -LiteralPath $fixture -Recurse -Force)
  if(@($entries | Where-Object {$_.Attributes -band [IO.FileAttributes]::ReparsePoint}).Count){throw 'Unexpected link in test fixture; retaining files'}
  foreach($entry in $entries | Where-Object {-not $_.PSIsContainer}){Remove-Item -LiteralPath $entry.FullName}
  foreach($entry in $entries | Where-Object {$_.PSIsContainer} | Sort-Object {$_.FullName.Length} -Descending){[IO.Directory]::Delete($entry.FullName)}
  [IO.Directory]::Delete($fixture)
 }
}
