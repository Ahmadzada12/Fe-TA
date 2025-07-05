# 🔍 INTERNAL SERVER ERROR TROUBLESHOOTING - News Creation

## 🚨 **ISSUE REPORTED**

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

**When**: Clicking "Simpan" on news creation form

## 🔍 **ROOT CAUSE ANALYSIS**

### **Potential Causes**

1. **FormData Content-Type Issue** ❌ **FIXED**

   - **Problem**: Frontend sent `Content-Type: application/json` with FormData
   - **Solution**: Modified `apiCall()` to detect FormData and omit Content-Type header

2. **Missing Required Data** ⚠️ **SUSPECTED**

   - **categoryId**: Must exist in database
   - **crowdfoundingId**: Must exist in database
   - Backend validates these IDs before creation

3. **Data Validation Issues** ⚠️ **POSSIBLE**
   - Empty or invalid field values
   - Incorrect status enum values

## ✅ **FIXES APPLIED**

### **1. Fixed FormData Handling**

```typescript
// useAdmin.ts
const getAuthHeaders = (isFormData = false) => {
  const headers: any = {
    Authorization: `Bearer ${token}`,
  };

  // Only set Content-Type for non-FormData requests
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

const apiCall = async (method: string, endpoint: string, data?: any) => {
  // Detect if data is FormData
  const isFormData = data instanceof FormData;

  const config = {
    method,
    url: `${API_BASE_URL}${endpoint}`,
    headers: getAuthHeaders(isFormData), // 🔧 Pass FormData flag
    ...(data && { data }),
  };
};
```

### **2. Enhanced Validation & Debugging**

```typescript
// NewsManagement.vue - saveNews()
// Validate required fields
if (!newsForm.title.trim()) {
  alert("Judul harus diisi");
  return;
}
if (!newsForm.categoryId) {
  alert("Kategori harus dipilih");
  return;
}
if (!newsForm.crowdfoundingId) {
  alert("Campaign harus dipilih");
  return;
}

// Debug FormData contents
console.log("FormData contents:");
for (let [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}
```

### **3. Better Error Handling**

```typescript
// Enhanced error logging in apiCall
console.error("API Call Error:", {
  endpoint,
  error: err.response?.data || err.message,
  status: err.response?.status,
});

// User-friendly error alerts
alert(`Error saving news: ${err.response?.data?.message || err.message}`);
```

## 🧪 **DEBUGGING STEPS**

### **Step 1: Check Data Availability**

```bash
# Run PowerShell script
.\test-categories-campaigns.ps1
```

**Expected Output**:

- Categories count > 0
- Campaigns count > 0
- If either is 0, news creation will fail

### **Step 2: Frontend Console Debugging**

1. Open Admin News page
2. Open DevTools Console
3. Click "Tambah Berita"
4. Check console logs:
   ```
   === LOADING INITIAL DATA ===
   Categories loaded: [array]
   Categories count: X
   Donations loaded: [array]
   Donations count: Y
   ```

### **Step 3: Form Submission Debug**

1. Fill all form fields
2. Click "Simpan"
3. Check console logs:
   ```
   === SAVING NEWS ===
   Form data: {...}
   Categories available: [...]
   Donations available: [...]
   FormData contents:
   title: "..."
   categoryId: "uuid-string"
   crowdfoundingId: "uuid-string"
   ```

### **Step 4: Network Request Analysis**

1. Check Network tab
2. Find POST request to `/news`
3. Verify:
   - Content-Type: `multipart/form-data`
   - Form data includes all required fields
   - categoryId and crowdfoundingId are valid UUIDs

## 🎯 **LIKELY CAUSES & SOLUTIONS**

### **Cause 1: Empty Categories/Campaigns**

**Symptoms**: Dropdowns are empty, console shows count = 0
**Solution**:

- Add categories via admin panel or database seeder
- Add crowdfunding campaigns via admin panel

### **Cause 2: Invalid UUIDs**

**Symptoms**: Valid data in dropdown but invalid IDs sent
**Solution**: Check dropdown value binding and ensure proper ID selection

### **Cause 3: Backend Validation Error**

**Symptoms**: FormData correct but still 500 error
**Solution**: Check backend logs for specific validation errors

## 📋 **VERIFICATION CHECKLIST**

- [ ] Categories dropdown populated (count > 0)
- [ ] Campaigns dropdown populated (count > 0)
- [ ] Form validation passes (no alerts)
- [ ] FormData includes all required fields
- [ ] Content-Type is `multipart/form-data` (not `application/json`)
- [ ] Network request shows proper form data structure
- [ ] Backend logs show specific error (if still failing)

## 🔄 **NEXT STEPS**

1. **Test with debugging enabled**
2. **Check console logs for data availability**
3. **Verify form data structure**
4. **If still failing, check backend logs for specific error**

---

**Status**: ✅ **FormData handling fixed, validation enhanced**  
**Next**: Test form submission and verify all required data is available
