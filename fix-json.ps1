$jsonPath = "data/jobpositions.json"
$content = Get-Content -Path $jsonPath -Raw
$data = $content | ConvertFrom-Json
$data.value | ConvertTo-Json -Depth 10 | Set-Content -Path $jsonPath
Write-Output "JSON file has been fixed. Original format had a wrapper object, now it's a direct array." 