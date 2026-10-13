$ErrorActionPreference='Stop'
$verify=Join-Path $PSScriptRoot 'Verify-Runtime.ps1'
$fixture=Join-Path ([IO.Path]::GetTempPath()) ('rea-integrity-'+[Guid]::NewGuid().ToString('N'))
$runtime=Join-Path $fixture 'runtime'
$manifest=Join-Path $fixture 'inventory.json'
New-Item -ItemType Directory -Path $runtime -Force | Out-Null
$file=Join-Path $runtime 'asset.css'
$extra=Join-Path $runtime 'extra.css'
$passed=0
function Write-Inventory($records,$count=1,$bytes=4){
 @{files=@($records);fileCount=$count;bytes=$bytes} | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $manifest -Encoding utf8
}
function Expect-Rejection([string]$message){
 try { & $verify -RuntimeRoot $runtime -InventoryPath $manifest | Out-Null } catch {
  if($_.Exception.Message -notlike $message){throw "Wrong failure: $($_.Exception.Message)"}
  $script:passed++;return
 }
 throw "Expected rejection: $message"
}
try {
 [IO.File]::WriteAllText($file,'aaaa')
 $record=@{path='asset.css';bytes=4;sha256=(Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant()}
 Write-Inventory $record
 $ok=& $verify -RuntimeRoot $runtime -InventoryPath $manifest
 if($ok.verifiedFiles -ne 1 -or $ok.bytes -ne 4){throw 'Valid fixture failed'}
 $passed++
 [IO.File]::WriteAllText($file,'bbbb')
 Expect-Rejection 'Runtime hash mismatch:*'
 [IO.File]::WriteAllText($file,'aaaaa')
 Expect-Rejection 'Runtime size mismatch:*'
 Remove-Item -LiteralPath $file
 Expect-Rejection 'Missing runtime file:*'
 [IO.File]::WriteAllText($file,'aaaa')
 [IO.File]::WriteAllText($extra,'x')
 Expect-Rejection 'Unexpected runtime file:*'
 Remove-Item -LiteralPath $extra
 Write-Inventory @($record,$record) 2 8
 Expect-Rejection 'Duplicate inventory path:*'
 Write-Inventory @{path='..\outside.css';bytes=4;sha256=$record.sha256}
 Expect-Rejection 'Inventory path escaped runtime'
 Write-Inventory $record 2
 Expect-Rejection 'Inventory file count mismatch'
 Write-Inventory $record 1 99
 Expect-Rejection 'Inventory byte count mismatch'
 Write-Inventory @{path='asset.css';bytes=4;sha256='bad'}
 Expect-Rejection 'Invalid inventory record:*'
 [pscustomobject]@{passed=$passed;scope='Temporary fixtures; no production files changed'} | ConvertTo-Json
} finally {
 # Delete only named test files and empty directories, never recursively.
 foreach($path in @($file,$extra,$manifest)){if(Test-Path -LiteralPath $path){Remove-Item -LiteralPath $path}}
 [IO.Directory]::Delete($runtime)
 [IO.Directory]::Delete($fixture)
}
