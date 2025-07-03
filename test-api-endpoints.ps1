# Test API Endpoints
# Script untuk menguji koneksi API dengan endpoint yang sudah diperbaiki

Write-Host "🔍 Testing API Endpoints..." -ForegroundColor Cyan
Write-Host "Backend should be running on http://localhost:3001" -ForegroundColor Yellow
Write-Host ""

$baseUrl = "http://localhost:3001/v1"
$endpoints = @(
    @{ name = "News"; url = "$baseUrl/news" }
    @{ name = "Categories"; url = "$baseUrl/category" }
    @{ name = "Users"; url = "$baseUrl/user" }
    @{ name = "Crowdfunding"; url = "$baseUrl/crowdfounding" }
    @{ name = "Dashboard"; url = "$baseUrl/Dashboard/get" }
    @{ name = "Health Check"; url = "http://localhost:3001/health" }
)

foreach ($endpoint in $endpoints) {
    Write-Host "Testing $($endpoint.name)..." -ForegroundColor White
    try {
        $response = Invoke-WebRequest -Uri $endpoint.url -Method GET -TimeoutSec 5 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✅ $($endpoint.name): OK (Status: $($response.StatusCode))" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️ $($endpoint.name): Unexpected status $($response.StatusCode)" -ForegroundColor Yellow
        }
    }
    catch {
        if ($_.Exception.Message -match "401|Unauthorized") {
            Write-Host "  🔐 $($endpoint.name): Authentication required (Expected)" -ForegroundColor Blue
        }
        elseif ($_.Exception.Message -match "404|Not Found") {
            Write-Host "  ❌ $($endpoint.name): Endpoint not found (404)" -ForegroundColor Red
        }
        elseif ($_.Exception.Message -match "refused|timeout") {
            Write-Host "  🔌 $($endpoint.name): Server not running or unreachable" -ForegroundColor Magenta
        }
        else {
            Write-Host "  ❓ $($endpoint.name): $($_.Exception.Message)" -ForegroundColor DarkYellow
        }
    }
}

Write-Host ""
Write-Host "🎯 Frontend endpoints to test in browser:" -ForegroundColor Cyan
Write-Host "  - News Management: http://localhost:5173/admin/news" -ForegroundColor White
Write-Host "  - Admin Dashboard: http://localhost:5173/admin/dashboard" -ForegroundColor White

Write-Host ""
Write-Host "📝 Note: Some endpoints may require authentication (401 is expected)" -ForegroundColor Gray
