$jsonPath = "data/jobpositions.json"
$content = Get-Content -Path $jsonPath -Raw
$data = $content | ConvertFrom-Json

# Extract the array from the value property
$positions = $data.value

# Create new JSON file with just the array
$positions | ConvertTo-Json -Depth 10 | Set-Content -Path $jsonPath

Write-Output "JSON file has been fixed. The wrapper object has been removed, now it's a direct array of job positions." 