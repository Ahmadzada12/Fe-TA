# Quick Test - News API Response Format
# PowerShell script untuk test manual API endpoint

$API_BASE = "http://localhost:3001/v1"
$TOKEN = "YOUR_ADMIN_TOKEN_HERE"  # Replace dengan token admin yang valid

Write-Host "Testing News API Response Format..." -ForegroundColor Green

try {
    $headers = @{
        "Authorization" = "Bearer $TOKEN"
        "Content-Type" = "application/json"
    }
    
    $response = Invoke-RestMethod -Uri "$API_BASE/news" -Headers $headers -Method GET
    
    Write-Host "`n=== API RESPONSE STRUCTURE ===" -ForegroundColor Yellow
    Write-Host "Full Response:"
    $response | ConvertTo-Json -Depth 3
    
    Write-Host "`n=== DATA ANALYSIS ===" -ForegroundColor Yellow
    Write-Host "Has 'data' property: $($null -ne $response.data)"
    Write-Host "Has 'message' property: $($null -ne $response.message)"
    Write-Host "Message: $($response.message)"
    Write-Host "Data type: $($response.data.GetType().Name)"
    Write-Host "Data count: $($response.data.Count)"
    
    if ($response.data -and $response.data.Count -gt 0) {
        Write-Host "`n=== FIRST NEWS ITEM ===" -ForegroundColor Yellow
        $response.data[0] | ConvertTo-Json -Depth 2
    }
    
    Write-Host "`n✅ Test completed successfully!" -ForegroundColor Green
    
} catch {
    Write-Host "`n❌ Error testing API:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Write-Host "`nMake sure:"
    Write-Host "1. Backend server is running on localhost:3001"
    Write-Host "2. You have a valid admin token"
    Write-Host "3. Replace YOUR_ADMIN_TOKEN_HERE with actual token"
}

Write-Host "`n=== FRONTEND DEBUG STEPS ===" -ForegroundColor Cyan
Write-Host "1. Open browser -> Admin News page"
Write-Host "2. Open DevTools -> Console"
Write-Host "3. Click 'Debug' button on the page"
Write-Host "4. Check console logs for response structure"
Write-Host "5. Verify news.value contains data array"
