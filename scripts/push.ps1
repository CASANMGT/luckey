# Consistent push to GitHub — same remote/branch every time.
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$repoUrl = "https://github.com/CASANMGT/luckey"
Write-Host ""
Write-Host "Luckey GitHub (open to confirm repo exists & after push):" -ForegroundColor Cyan
Write-Host "  $repoUrl" -ForegroundColor White
Write-Host ""
Write-Host "Create empty repo first (if needed): https://github.com/new  (owner: CASANMGT, name: luckey)" -ForegroundColor DarkGray
Write-Host ""

git push -u origin main
if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "Done. View on the web: $repoUrl" -ForegroundColor Green
}
