# Test Script untuk Verifikasi Perbaikan News Detail

Write-Host "=== TESTING BACKEND NEWS DETAIL ENDPOINT ===" -ForegroundColor Cyan

# Test Backend News Detail Endpoint
Write-Host "`nTesting GET /v1/news/:id endpoint..." -ForegroundColor Yellow

# Ganti 'NEWS_ID' dengan ID berita yang valid
$NewsId = "NEWS_ID"  # Ganti dengan ID yang valid
$BackendUrl = "http://localhost:3000/v1/news/$NewsId"

Write-Host "URL: $BackendUrl" -ForegroundColor Gray

try {
    $response = Invoke-RestMethod -Uri $BackendUrl -Method GET -ContentType "application/json"
    
    Write-Host "`n✅ SUCCESS - Endpoint responds!" -ForegroundColor Green
    Write-Host "Status: 200 OK" -ForegroundColor Green
    
    # Cek struktur response
    if ($response.data) {
        Write-Host "`n📋 Response structure:" -ForegroundColor Blue
        
        # Cek data utama
        Write-Host "- News ID: $($response.data.id)" -ForegroundColor White
        Write-Host "- Title: $($response.data.title)" -ForegroundColor White
        
        # Cek relasi Category
        if ($response.data.category) {
            Write-Host "- Category: $($response.data.category.name) ✅" -ForegroundColor Green
        } else {
            Write-Host "- Category: NOT INCLUDED ❌" -ForegroundColor Red
        }
        
        # Cek relasi Crowdfounding
        if ($response.data.crowdfounding) {
            Write-Host "- Campaign: $($response.data.crowdfounding.title) ✅" -ForegroundColor Green
        } else {
            Write-Host "- Campaign: NOT INCLUDED ❌" -ForegroundColor Red
        }
        
        Write-Host "`n📊 Full Response:" -ForegroundColor Blue
        $response | ConvertTo-Json -Depth 10 | Write-Host
    }
    
} catch {
    Write-Host "`n❌ ERROR - Endpoint failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nPossible reasons:" -ForegroundColor Yellow
    Write-Host "1. Backend not running (run: cd BE-TA-Zip && pnpm run start:dev)" -ForegroundColor Gray
    Write-Host "2. Invalid NEWS_ID (check database for valid IDs)" -ForegroundColor Gray
    Write-Host "3. Database connection issues" -ForegroundColor Gray
}

Write-Host "`n=== FRONTEND TESTING ===" -ForegroundColor Cyan
Write-Host "Frontend running at: http://localhost:5173" -ForegroundColor Green
Write-Host "Test pages:" -ForegroundColor Yellow
Write-Host "1. News List: http://localhost:5173/berita" -ForegroundColor Gray
Write-Host "2. News Detail: http://localhost:5173/berita/[ID]" -ForegroundColor Gray

Write-Host "`n=== INSTRUCTIONS ===" -ForegroundColor Cyan
Write-Host "1. Replace 'NEWS_ID' in this script with a valid news ID" -ForegroundColor White
Write-Host "2. Make sure backend is running on port 3000" -ForegroundColor White
Write-Host "3. Run this script to test the endpoint" -ForegroundColor White
Write-Host "4. Open frontend and navigate to a news detail page" -ForegroundColor White
Write-Host "5. Check if category badge shows real data (not 'Berita Umum')" -ForegroundColor White
