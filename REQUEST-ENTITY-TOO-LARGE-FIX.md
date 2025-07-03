# Request Entity Too Large Error Fix (413)

## 🚨 **Error yang Terjadi**

```json
{
  "statusCode": 413,
  "message": "request entity too large"
}
```

## 🔍 **Root Cause Analysis**

### **Mengapa Terjadi Error 413?**

1. **Base64 Expansion**: File gambar di-convert ke base64 = **~33% lebih besar**

   - Original: 1MB image → Base64: ~1.33MB string
   - Original: 3MB image → Base64: ~4MB string

2. **Default Server Limits**: NestJS/Express default body size limit biasanya **1MB**

3. **Image Size**: User upload gambar besar (> 2-3MB)

### **Contoh Calculation:**

```
Original Image: 2MB
Base64 Encoded: 2MB × 1.33 = 2.66MB
Server Limit: 1MB (default)
Result: 413 Request Entity Too Large ❌
```

## 🛠️ **Solutions Applied**

### **1. Backend: Increase Body Size Limit**

#### **File**: `src/main.ts`

```typescript
// BEFORE (❌ Default 1MB limit)
async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  // No body size configuration
}

// AFTER (✅ Increased to 10MB)
async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  // Configure body size limits for file uploads
  app.use(express.json({ limit: "10mb" })); // JSON body limit
  app.use(express.urlencoded({ extended: true, limit: "10mb" })); // URL-encoded body limit
}
```

### **2. Frontend: File Size Validation**

#### **File**: `CategoryManagement.vue`

```typescript
const handleImageUpload = (event: Event) => {
  const file = target.files[0];

  // Validate file size (max 2MB for base64 conversion)
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    alert("Ukuran file terlalu besar! Maksimal 2MB.");
    target.value = ""; // Reset input
    return;
  }

  // Convert to base64...
};
```

### **3. UI: User Guidelines**

```vue
<input type="file" accept="image/*" @change="handleImageUpload" />
<p class="text-xs text-gray-500 mt-1">
  Maksimal 2MB. Format: JPG, PNG, GIF
</p>
```

## 📊 **File Size Recommendations**

| Original Size | Base64 Size | Status       | Recommendation |
| ------------- | ----------- | ------------ | -------------- |
| 500KB         | ~665KB      | ✅ OK        | Recommended    |
| 1MB           | ~1.33MB     | ✅ OK        | Good           |
| 2MB           | ~2.66MB     | ⚠️ Large     | Maximum        |
| 3MB+          | ~4MB+       | ❌ Too Large | Compress first |

## 🔧 **Alternative Solutions**

### **Option 1: Current Solution (Base64 + Size Limits)**

- ✅ **Pros**: Simple, immediate fix
- ❌ **Cons**: Large payload, memory intensive

### **Option 2: Proper File Upload (Recommended for Production)**

```typescript
// Backend: Add multer configuration
@Post()
@UseInterceptors(FileInterceptor('image', {
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files allowed!'), false);
    }
    cb(null, true);
  }
}))
async create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateCategoryDto) {
  // Handle file upload properly
}
```

### **Option 3: External Storage (AWS S3, Cloudinary)**

- Upload directly to cloud storage
- Store only URL in database
- Best for production apps

## ✅ **Testing Steps**

1. **Restart Backend Server** (important for main.ts changes)
2. **Open Category Management**
3. **Test Small Image** (< 1MB) - Should work
4. **Test Large Image** (> 2MB) - Should show alert
5. **Test Medium Image** (1-2MB) - Should work now

## 📝 **Expected Results After Fix**

- ✅ Images up to 2MB can be uploaded successfully
- ✅ Larger images show user-friendly error message
- ✅ No more 413 request entity too large errors
- ✅ Backend accepts larger payloads (up to 10MB)

## 🚨 **Important Notes**

1. **Restart Backend** setelah perubahan di `main.ts`
2. **Production Consideration**: Base64 tidak ideal untuk gambar besar
3. **Memory Usage**: Base64 menggunakan lebih banyak memory
4. **Performance**: Consider proper file upload untuk production

## 🔄 **Quick Fix untuk Testing**

Jika masih error, coba:

1. Compress gambar terlebih dahulu (online tools)
2. Gunakan gambar kecil (< 500KB) untuk testing
3. Restart backend server
4. Clear browser cache
