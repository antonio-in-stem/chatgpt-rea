param(
 [string]$RuntimeRoot=(Join-Path $PSScriptRoot 'pristine'),
 [string]$InventoryPath=(Join-Path $PSScriptRoot 'runtime-inventory.json')
)
$ErrorActionPreference='Stop'
$root=[IO.Path]::GetFullPath($RuntimeRoot).TrimEnd('\')
$inventory=Get-Content -LiteralPath $InventoryPath -Raw | ConvertFrom-Json
$expected=[Collections.Generic.Dictionary[string,object]]::new([StringComparer]::OrdinalIgnoreCase)
foreach($record in $inventory.files){
 $relative=[string]$record.path
 if([string]::IsNullOrWhiteSpace($relative) -or [IO.Path]::IsPathRooted($relative) -or $relative.Contains(':')){throw 'Invalid inventory path'}
 $full=[IO.Path]::GetFullPath((Join-Path $root $relative))
 if(-not $full.StartsWith($root+'\',[StringComparison]::OrdinalIgnoreCase)){throw 'Inventory path escaped runtime'}
 $normalized=[IO.Path]::GetRelativePath($root,$full)
 if($expected.ContainsKey($normalized)){throw "Duplicate inventory path: $relative"}
 if($record.sha256 -notmatch '^[0-9a-f]{64}$' -or $null -eq $record.bytes -or $record.bytes -lt 0){throw "Invalid inventory record: $relative"}
 $expected.Add($normalized,$record)
}
if($expected.Count -eq 0 -or $expected.Count -ne $inventory.fileCount){throw 'Inventory file count mismatch'}
# Refuse junctions/symlinks rather than follow content outside the copied runtime.
$rootItem=Get-Item -LiteralPath $root
if($rootItem.Attributes -band [IO.FileAttributes]::ReparsePoint){throw 'Runtime root is a reparse point'}
$entries=@(Get-ChildItem -LiteralPath $root -Recurse -Force)
if(@($entries | Where-Object {$_.Attributes -band [IO.FileAttributes]::ReparsePoint}).Count){throw 'Runtime contains reparse points'}
$files=@($entries | Where-Object {-not $_.PSIsContainer})
$seen=[Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$bytes=0L
foreach($file in $files){
 $relative=[IO.Path]::GetRelativePath($root,$file.FullName)
 if(-not $expected.ContainsKey($relative)){throw "Unexpected runtime file: $relative"}
 $record=$expected[$relative]
 if($file.Length -ne $record.bytes){throw "Runtime size mismatch: $relative"}
 $hash=(Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
 if($hash -ne $record.sha256){throw "Runtime hash mismatch: $relative"}
 [void]$seen.Add($relative)
 $bytes+=$file.Length
}
foreach($relative in $expected.Keys){if(-not $seen.Contains($relative)){throw "Missing runtime file: $relative"}}
if($bytes -ne $inventory.bytes){throw 'Inventory byte count mismatch'}
[pscustomobject]@{verifiedFiles=$seen.Count;bytes=$bytes;runtime=$root;inventorySha256=(Get-FileHash -LiteralPath $InventoryPath -Algorithm SHA256).Hash.ToLowerInvariant();verifiedUtc=[DateTime]::UtcNow.ToString('o')}
