# SECURITY VULNERABILITIES FIX SCRIPT
# Script untuk memperbaiki 20 vulnerabilities di frontend

Write-Host "🔒 Starting Security Vulnerabilities Fix..." -ForegroundColor Green

# Update package utama yang vulnerable
Write-Host "📦 Updating main vulnerable packages..." -ForegroundColor Yellow

# Update axios dari 1.7.2 ke 1.8.2 (SSRF + Credential Leakage fix)
pnpm update axios@^1.8.2

# Update vite dari 5.2.6 ke 5.4.19 (Multiple XSS + FS bypass fixes)
pnpm update vite@^5.4.19

# Update rollup (dependency dari vite) ke versi aman
pnpm update rollup@^4.22.4

# Update cross-spawn ke versi aman
pnpm update cross-spawn@^7.0.5

# Update micromatch ke versi aman
pnpm update micromatch@^4.0.8

# Update nanoid ke versi aman
pnpm update nanoid@^3.3.8

# Update esbuild ke versi aman
pnpm update esbuild@^0.25.0

# Update babel packages ke versi aman
pnpm update @babel/runtime@^7.26.10
pnpm update @babel/helpers@^7.26.10
pnpm update @babel/core@^7.26.10

# Update brace-expansion ke versi aman
pnpm update brace-expansion@^2.0.2

Write-Host "🔧 Running pnpm audit fix..." -ForegroundColor Blue
pnpm audit --fix

Write-Host "📋 Re-checking vulnerabilities..." -ForegroundColor Cyan
pnpm audit

Write-Host "✅ Security fix completed!" -ForegroundColor Green
Write-Host "📊 If vulnerabilities remain, they might be in dev dependencies only." -ForegroundColor Yellow
