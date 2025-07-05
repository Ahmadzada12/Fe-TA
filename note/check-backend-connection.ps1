# Backend Connection Checker and Starter
# File: check-backend-connection.ps1

Write-Host "=== BACKEND CONNECTION CHECKER ===" -ForegroundColor Cyan

$backendPath = "c:\Users\annan\Downloads\Be-TA\Be-TA\BE-TA-Zip"
$backendPort = 3001
$apiUrl = "http://localhost:$backendPort"

Write-Host "`n1. Checking if backend is running..." -ForegroundColor Yellow

# Check if port is in use
$portCheck = Get-NetTCPConnection -LocalPort $backendPort -ErrorAction SilentlyContinue

if ($portCheck) {
    Write-Host "✅ Port $backendPort is in use" -ForegroundColor Green
    
    # Test API endpoint
    try {
        $response = Invoke-RestMethod -Uri "$apiUrl/v1/news" -Method GET -TimeoutSec 5
        Write-Host "✅ Backend API is responding" -ForegroundColor Green
        Write-Host "✅ Backend is HEALTHY and READY" -ForegroundColor Green
        exit 0
    }
    catch {
        Write-Host "❌ Port is used but API not responding" -ForegroundColor Red
        Write-Host "🔧 Another app might be using port $backendPort" -ForegroundColor Yellow
        
        # Show what's using the port
        $process = Get-Process -Id (Get-NetTCPConnection -LocalPort $backendPort).OwningProcess -ErrorAction SilentlyContinue
        if ($process) {
            Write-Host "📋 Process using port $backendPort : $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor White
        }
    }
}
else {
    Write-Host "❌ Port $backendPort is NOT in use" -ForegroundColor Red
    Write-Host "🚀 Backend server is NOT running" -ForegroundColor Yellow
}

Write-Host "`n2. Checking backend directory..." -ForegroundColor Yellow

if (Test-Path $backendPath) {
    Write-Host "✅ Backend directory found: $backendPath" -ForegroundColor Green
    
    # Check if package.json exists
    $packageJsonPath = Join-Path $backendPath "package.json"
    if (Test-Path $packageJsonPath) {
        Write-Host "✅ package.json found" -ForegroundColor Green
        
        # Check if node_modules exists
        $nodeModulesPath = Join-Path $backendPath "node_modules"
        if (Test-Path $nodeModulesPath) {
            Write-Host "✅ node_modules found" -ForegroundColor Green
        }
        else {
            Write-Host "❌ node_modules NOT found" -ForegroundColor Red
            Write-Host "🔧 Need to run: npm install or pnpm install" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "❌ package.json NOT found in backend directory" -ForegroundColor Red
        exit 1
    }
}
else {
    Write-Host "❌ Backend directory NOT found: $backendPath" -ForegroundColor Red
    Write-Host "🔧 Please check the backend path" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n3. Backend startup options..." -ForegroundColor Yellow

$choice = Read-Host @"
Choose an option:
1. Start backend automatically (npm run start:dev)
2. Start backend with pnpm (pnpm run start:dev)
3. Install dependencies first (npm install)
4. Install dependencies with pnpm (pnpm install)
5. Just show manual commands
6. Exit

Enter your choice (1-6)
"@

switch ($choice) {
    "1" {
        Write-Host "`n🚀 Starting backend with npm..." -ForegroundColor Green
        Set-Location $backendPath
        npm run start:dev
    }
    "2" {
        Write-Host "`n🚀 Starting backend with pnpm..." -ForegroundColor Green
        Set-Location $backendPath
        pnpm run start:dev
    }
    "3" {
        Write-Host "`n📦 Installing dependencies with npm..." -ForegroundColor Green
        Set-Location $backendPath
        npm install
        Write-Host "`n✅ Dependencies installed. Now run: npm run start:dev" -ForegroundColor Green
    }
    "4" {
        Write-Host "`n📦 Installing dependencies with pnpm..." -ForegroundColor Green
        Set-Location $backendPath
        pnpm install
        Write-Host "`n✅ Dependencies installed. Now run: pnpm run start:dev" -ForegroundColor Green
    }
    "5" {
        Write-Host "`n📋 Manual Commands:" -ForegroundColor White
        Write-Host "cd `"$backendPath`"" -ForegroundColor Cyan
        Write-Host "npm install    # or pnpm install" -ForegroundColor Cyan
        Write-Host "npm run start:dev    # or pnpm run start:dev" -ForegroundColor Cyan
        Write-Host "`nThen test: http://localhost:$backendPort/v1/news" -ForegroundColor Yellow
    }
    "6" {
        Write-Host "👋 Exiting..." -ForegroundColor White
        exit 0
    }
    default {
        Write-Host "❌ Invalid choice" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n=== AFTER STARTING BACKEND ===" -ForegroundColor Cyan
Write-Host "✅ Test API: http://localhost:$backendPort/v1/news" -ForegroundColor Green
Write-Host "✅ Admin Panel: http://localhost:5173/admin/news" -ForegroundColor Green
Write-Host "✅ Check logs in backend terminal" -ForegroundColor Green
