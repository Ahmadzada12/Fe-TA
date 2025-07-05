# 🔌 BACKEND CONNECTION TROUBLESHOOTING

## ❌ **MASALAH YANG DIALAMI:**
```
ERR_CONNECTION_REFUSED
Failed to load resource: net::ERR_CONNECTION_REFUSED
:3001/v1/Dashboard/get:1
:3001/v1/news?:1  
:3001/v1/category:1
```

## 🔍 **ROOT CAUSE ANALYSIS:**

### **Error ERR_CONNECTION_REFUSED** berarti:
1. ✅ **Backend server TIDAK BERJALAN** di port 3001
2. ✅ **Port 3001 sedang digunakan** aplikasi lain
3. ✅ **Backend crash** atau error saat startup
4. ✅ **Firewall blocking** port 3001

## 🚀 **SOLUSI STEP-BY-STEP:**

### **1. CEK STATUS BACKEND SERVER**
```powershell
# Cek apakah port 3001 digunakan
netstat -ano | findstr :3001

# Atau cek dengan PowerShell
Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue
```

### **2. START BACKEND SERVER**
```powershell
# Navigate ke folder backend
cd "c:\Users\annan\Downloads\Be-TA\Be-TA\BE-TA-Zip"

# Install dependencies (jika belum)
npm install
# atau
pnpm install

# Start development server
npm run start:dev
# atau
pnpm run start:dev
```

### **3. VERIFIKASI BACKEND RUNNING**
```powershell
# Test API endpoint
curl http://localhost:3001/v1/news
# atau buka di browser
# http://localhost:3001/v1/news
```

### **4. CHECK LOGS BACKEND**
Jika backend tidak start, check error logs:
```bash
# Di terminal backend, lihat error message seperti:
# - Database connection error
# - Port already in use
# - Missing environment variables
# - Package dependencies error
```

## 🔧 **QUICK FIXES:**

### **Fix 1: Kill Process di Port 3001**
```powershell
# Cari process yang menggunakan port 3001
netstat -ano | findstr :3001

# Kill process berdasarkan PID
taskkill /PID <PID_NUMBER> /F
```

### **Fix 2: Ganti Port Backend (Jika Perlu)**
Jika port 3001 tidak bisa digunakan, ubah di:

**Backend (`package.json` atau `.env`):**
```json
{
  "scripts": {
    "start:dev": "nest start --watch --port 3002"
  }
}
```

**Frontend (`main.ts`):**
```typescript
axios.defaults.baseURL = "http://localhost:3002"; // Ganti port
```

### **Fix 3: Environment Variables**
Pastikan file `.env` di backend tersedia:
```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
PORT=3001
```

## 📋 **TESTING CHECKLIST:**

### **✅ Backend Health Check:**
1. [ ] Backend server running di port 3001
2. [ ] Database connection working
3. [ ] API endpoints accessible
4. [ ] No error di backend logs

### **✅ Frontend Connection Check:**
1. [ ] axios.defaults.baseURL pointing to correct URL
2. [ ] No CORS errors
3. [ ] Authentication headers working
4. [ ] API calls getting responses

## 🛠️ **DEBUGGING COMMANDS:**

### **Check Backend Status:**
```powershell
# Test basic connection
Test-NetConnection -ComputerName localhost -Port 3001

# Test API endpoint
Invoke-RestMethod -Uri "http://localhost:3001/v1/news" -Method GET
```

### **Backend Logs Monitoring:**
```bash
# Jalankan backend dengan verbose logging
npm run start:dev -- --verbose

# Atau dengan debug mode
DEBUG=* npm run start:dev
```

## 🚨 **EMERGENCY SOLUTIONS:**

### **Jika Backend Tidak Bisa Dijalankan:**
1. **Mock API Response** - Sementara gunakan mock data di frontend
2. **Change API Base URL** - Gunakan backend development lain
3. **Local JSON Server** - Setup json-server sebagai mock backend

### **Frontend Mock Implementation:**
```typescript
// Di useAdmin.ts, tambahkan fallback
const apiCall = async (method: string, endpoint: string, data?: any) => {
  try {
    // Normal API call
    const response = await axios(config);
    return response.data;
  } catch (err: any) {
    if (err.code === 'ERR_CONNECTION_REFUSED') {
      console.warn("🚨 Using mock data - Backend not available");
      return getMockData(endpoint); // Fallback ke mock data
    }
    throw err;
  }
};
```

## 📞 **GET HELP:**

Jika masalah masih berlanjut:
1. **Screenshot error** di browser console
2. **Backend terminal logs** ketika mencoba start
3. **Network tab** di browser DevTools
4. **Port usage** dengan `netstat -ano | findstr :3001`

---
**Status:** TROUBLESHOOTING GUIDE READY ✅
**Next Step:** JALANKAN BACKEND SERVER TERLEBIH DAHULU
