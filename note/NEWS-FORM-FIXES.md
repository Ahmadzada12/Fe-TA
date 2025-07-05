# 🔧 NEWS FORM FIXES - Categories, Campaigns & Status

## 🔍 **ISSUES FIXED**

### 1. **Pilihan Kategori dan Campaign Tidak Muncul**

**Root Cause**: `getCategories()` dan `getDonations()` menggunakan response handling yang salah untuk pagination format.

**Solution Applied**:

```typescript
// useAdmin.ts - Fixed getCategories()
let categoryData = [];
if (response?.data?.data && Array.isArray(response.data.data)) {
  categoryData = response.data.data;
} else if (response?.data && Array.isArray(response.data)) {
  categoryData = response.data;
} else if (response && Array.isArray(response)) {
  categoryData = response;
}
categories.value = categoryData;

// Same fix applied to getDonations()
```

### 2. **Status Backend vs Frontend Mismatch**

**Backend Enum**: `published` | `unpublished`  
**Frontend Before**: `published` | `draft`

**Solution Applied**:

- ✅ Updated form values to use `published` | `unpublished`
- ✅ Added `getStatusDisplay()` function to show user-friendly labels
- ✅ "unpublished" displays as "Draft" in UI
- ✅ Updated filter options and default values

## ✅ **CHANGES IMPLEMENTED**

### **Frontend Form Updates**

**newsForm default value**:

```typescript
const newsForm = reactive({
  // ...existing fields...
  statusBerita: "published", // Changed from "draft"
  categoryId: "", // Added
  crowdfoundingId: "", // Added
  image: null as File | null, // Added
});
```

**Status Options**:

```vue
<select v-model="newsForm.statusBerita">
  <option value="unpublished">Draft</option>     <!-- Backend value | Display -->
  <option value="published">Published</option>
</select>
```

**Status Display**:

```typescript
const getStatusDisplay = (status: string) => {
  switch (status) {
    case "published":
      return "Published";
    case "unpublished":
      return "Draft"; // User-friendly display
    default:
      return status;
  }
};
```

### **Form Fields Added**

1. ✅ **Category Selection** - populated from `categories.value`
2. ✅ **Campaign Selection** - populated from `donations.value`
3. ✅ **Image Upload** - with FormData handling
4. ✅ **Enhanced Status** - backend compatible values

### **Data Loading**

```typescript
onMounted(async () => {
  await loadNews(); // Load news list
  await getCategories(); // Load categories for dropdown
  await getDonations(); // Load campaigns for dropdown
});
```

### **FormData Handling for File Upload**

```typescript
const saveNews = async () => {
  const formData = new FormData();
  formData.append("title", newsForm.title);
  formData.append("content", newsForm.content);
  formData.append("statusBerita", newsForm.statusBerita); // published/unpublished
  formData.append("categoryId", newsForm.categoryId);
  formData.append("crowdfoundingId", newsForm.crowdfoundingId);

  if (newsForm.image) {
    formData.append("image", newsForm.image);
  }

  // Send FormData to backend
};
```

## 🧪 **TESTING CHECKLIST**

### **Categories & Campaigns Dropdown**

- [ ] Categories dropdown populated with data
- [ ] Campaigns dropdown populated with data
- [ ] Console logs show categories/donations count > 0

### **Status Handling**

- [ ] Default form status is "published"
- [ ] Status options show "Draft" and "Published"
- [ ] Backend receives "unpublished" for Draft
- [ ] News list displays "Draft" for unpublished items

### **Image Upload**

- [ ] File selection works
- [ ] FormData includes image file
- [ ] Backend receives multipart/form-data

### **Form Validation**

- [ ] All required fields validated
- [ ] Form submission works for create/update
- [ ] Form reset clears all fields

## 📋 **VERIFICATION STEPS**

1. **Open Admin News page**
2. **Click "Tambah Berita"**
3. **Check dropdowns**:
   - Categories dropdown has options
   - Campaigns dropdown has options
4. **Check status dropdown**:
   - Shows "Draft" and "Published"
   - Default is "Published"
5. **Test form submission**:
   - Fill all fields including image
   - Submit and verify creation
6. **Check news list**:
   - Status displays correctly ("Draft"/"Published")

## 🔄 **Backend Compatibility**

**Status Enum Match**:

```prisma
enum statusberita {
  published     // ✅ Matches frontend
  unpublished   // ✅ Matches frontend (displayed as "Draft")
}
```

**Required Fields Match**:

```typescript
// CreateNewsDto
title: string        // ✅
content: string      // ✅
statusBerita: enum   // ✅
categoryId: string   // ✅ Added
crowdfoundingId: string // ✅ Added
image: file          // ✅ Added
```

---

**Status**: ✅ **NEWS FORM FIXES COMPLETE**  
**Expected**: Categories, campaigns dropdown populated; Status backend-compatible  
**Next**: Test form submission and verify all fields work correctly
