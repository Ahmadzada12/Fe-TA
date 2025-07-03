# Quick Test - Categories & Crowdfunding API
# PowerShell script untuk test data yang dibutuhkan form news

$API_BASE = "http://localhost:3001/v1"
$TOKEN = "YOUR_ADMIN_TOKEN_HERE"  # Replace dengan token admin yang valid

Write-Host "Testing Categories & Crowdfunding APIs..." -ForegroundColor Green

try {
    $headers = @{
        "Authorization" = "Bearer $TOKEN"
        "Content-Type" = "application/json"
    }
    
    Write-Host "`n=== TESTING CATEGORIES API ===" -ForegroundColor Yellow
    $categoriesResponse = Invoke-RestMethod -Uri "$API_BASE/category" -Headers $headers -Method GET
    
    Write-Host "Categories Response:"
    $categoriesResponse | ConvertTo-Json -Depth 2
    
    if ($categoriesResponse.data -and $categoriesResponse.data.data) {
        Write-Host "Categories count: $($categoriesResponse.data.data.Count)" -ForegroundColor Green
        Write-Host "First category: $($categoriesResponse.data.data[0].name)" -ForegroundColor Green
    } else {
        Write-Host "❌ No categories found!" -ForegroundColor Red
    }
    
    Write-Host "`n=== TESTING CROWDFUNDING API ===" -ForegroundColor Yellow
    $crowdfundingResponse = Invoke-RestMethod -Uri "$API_BASE/crowdfounding" -Headers $headers -Method GET
    
    Write-Host "Crowdfunding Response:"
    $crowdfundingResponse | ConvertTo-Json -Depth 2
    
    if ($crowdfundingResponse.data -and $crowdfundingResponse.data.data) {
        Write-Host "Crowdfunding count: $($crowdfundingResponse.data.data.Count)" -ForegroundColor Green
        Write-Host "First campaign: $($crowdfundingResponse.data.data[0].title)" -ForegroundColor Green
    } else {
        Write-Host "❌ No crowdfunding campaigns found!" -ForegroundColor Red
    }
    
    Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
    Write-Host "Categories available: $(if ($categoriesResponse.data.data.Count -gt 0) { '✅ YES' } else { '❌ NO' })"
    Write-Host "Campaigns available: $(if ($crowdfundingResponse.data.data.Count -gt 0) { '✅ YES' } else { '❌ NO' })"
    
    if ($categoriesResponse.data.data.Count -eq 0 -or $crowdfundingResponse.data.data.Count -eq 0) {
        Write-Host "`n⚠️  POTENTIAL ISSUE:" -ForegroundColor Red
        Write-Host "News creation requires both categories and campaigns to exist."
        Write-Host "If either is empty, news creation will fail with 'Category not found' or 'Crowdfunding not found'."
    }
    
} catch {
    Write-Host "`n❌ Error testing APIs:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Write-Host "`nMake sure:"
    Write-Host "1. Backend server is running on localhost:3001"
    Write-Host "2. You have a valid admin token"
    Write-Host "3. Replace YOUR_ADMIN_TOKEN_HERE with actual token"
}

Write-Host "`n=== FRONTEND DEBUG STEPS ===" -ForegroundColor Cyan
Write-Host "1. Open browser -> Admin News page"
Write-Host "2. Open DevTools -> Console"
Write-Host "3. Click 'Tambah Berita'"
Write-Host "4. Check if dropdowns have options"
Write-Host "5. Fill form and click 'Simpan'"
Write-Host "6. Check console for detailed logs"
