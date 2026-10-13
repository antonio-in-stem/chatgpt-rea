$ErrorActionPreference='Stop'
$identity=Get-Content -LiteralPath (Join-Path $PSScriptRoot 'snapshot.json') -Raw | ConvertFrom-Json
$sourceRoot=[IO.Path]::GetFullPath($identity.source)
$targetRoot=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'pristine'))
if(-not $sourceRoot.StartsWith('C:\Program Files\WindowsApps\',[StringComparison]::OrdinalIgnoreCase)){throw 'Source must be the inventoried installed package'}
$files=@(Get-ChildItem -LiteralPath $sourceRoot -Recurse -File)
$records=[Collections.Generic.List[object]]::new()
$copied=0
foreach($file in $files){
 $relative=[IO.Path]::GetRelativePath($sourceRoot,$file.FullName)
 $target=[IO.Path]::GetFullPath((Join-Path $targetRoot $relative))
 if(-not $target.StartsWith($targetRoot+'\',[StringComparison]::OrdinalIgnoreCase)){throw 'Target escaped snapshot directory'}
 $sourceHash=(Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
 if(-not(Test-Path -LiteralPath $target)){
  New-Item -ItemType Directory -Path (Split-Path -Parent $target) -Force | Out-Null
  Copy-Item -LiteralPath $file.FullName -Destination $target
  $copied++
 }
 $targetHash=(Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant()
 if($targetHash -ne $sourceHash){throw "Source/snapshot mismatch: $relative"}
 $records.Add([pscustomobject]@{path=$relative;bytes=$file.Length;sha256=$sourceHash})
}
$report=[pscustomobject]@{source=$sourceRoot;capturedUtc=[DateTime]::UtcNow.ToString('o');scope='Full installed app directory, including runtime, packaged code and unpacked native dependencies';fileCount=$records.Count;bytes=($records | Measure-Object bytes -Sum).Sum;files=@($records.ToArray())}
$report | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'runtime-inventory.json') -Encoding utf8
[pscustomobject]@{verifiedFiles=$records.Count;copiedFiles=$copied;bytes=$report.bytes;runtime=$targetRoot} | ConvertTo-Json
