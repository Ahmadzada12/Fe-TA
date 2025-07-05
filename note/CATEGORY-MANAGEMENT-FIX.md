# Category Management Frontend-Backend Configuration Fix

## 🔍 **Masalah yang Ditemukan**

### ❌ **Misalignment antara Frontend & Backend:**

1. **Field Mapping Tidak Sesuai:**

   - Backend DTO: `title` (string), `content` (string), `image?` (optional)
   - Frontend Form: `name`, `description`, `status`
   - Database: `name`, `description`, `image`, `createdAt`, `updatedAt`

2. **Missing Image Upload:**

   - Backend: Support upload `image` field
   - Frontend: Tidak ada input file untuk image

3. **Non-existent Status Field:**
   - Frontend: Ada field `status` dengan options 'active'/'inactive'
   - Backend/Database: Tidak ada field `status` di Category model

## 🛠️ **Perbaikan yang Dilakukan**

### **1. Form Data Structure**

```typescript
// BEFORE (❌ Salah)
const categoryForm = ref({
  name: "", // Backend expects 'title'
  description: "", // Backend expects 'content'
  status: "active", // Field ini tidak ada di backend
});

// AFTER (✅ Benar)
const categoryForm = ref({
  title: "", // Sesuai backend DTO
  content: "", // Sesuai backend DTO
  image: null, // Support image upload
});
```

### **2. Template Form Fields**

```vue
<!-- BEFORE -->
<input v-model="categoryForm.name" ... />
<textarea v-model="categoryForm.description" ... />
<select v-model="categoryForm.status" ... />

<!-- AFTER -->
<input v-model="categoryForm.title" ... />
<textarea v-model="categoryForm.content" ... />
<input @change="handleImageUpload" type="file" accept="image/*" ... />
```

### **3. Data Mapping untuk Edit**

```typescript
const editCategory = (category: any) => {
  categoryForm.value = {
    title: category.name, // Map DB 'name' → Form 'title'
    content: category.description || "", // Map DB 'description' → Form 'content'
    image: null, // Reset image untuk edit
  };
};
```

### **4. API Call Data Format**

```typescript
const addCategory = async () => {
  const categoryData = {
    title: categoryForm.value.title, // Backend expects 'title'
    content: categoryForm.value.content, // Backend expects 'content'
    ...(categoryForm.value.image && { image: categoryForm.value.image }),
  };
  await createCategory(categoryData);
};
```

### **5. Status Display Fix**

```vue
<!-- Karena database tidak ada field status, tampilkan sebagai 'Aktif' untuk semua -->
<span
  class="bg-green-100 text-green-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
>
  Aktif
</span>
```

## 📋 **Backend API Endpoints**

| Method | Endpoint           | Purpose                     | Auth                 | Body Format                    |
| ------ | ------------------ | --------------------------- | -------------------- | ------------------------------ |
| GET    | `/v1/category`     | List categories (paginated) | Bearer Token         | -                              |
| POST   | `/v1/category`     | Create category             | Bearer Token + Admin | `{ title, content, image? }`   |
| GET    | `/v1/category/:id` | Get category detail         | Bearer Token         | -                              |
| PUT    | `/v1/category/:id` | Update category             | Bearer Token + Admin | `{ title?, content?, image? }` |
| DELETE | `/v1/category/:id` | Delete category             | Bearer Token + Admin | -                              |

## 🗃️ **Database Schema**

```prisma
model Category {
  id          String    @id @default(uuid())
  name        String    // Maps to form 'title'
  description String    // Maps to form 'content'
  image       String?   // Optional image URL/path
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  News        News[]
}
```

## ✅ **Status Setelah Perbaikan**

- ✅ Form fields sesuai dengan backend DTO
- ✅ Image upload support ditambahkan
- ✅ Data mapping yang benar antara DB ↔ Form
- ✅ API calls menggunakan format data yang tepat
- ✅ Error handling yang lebih baik
- ✅ Status display yang konsisten

## 🧪 **Testing Checklist**

1. **Load Categories** - Periksa data muncul di tabel
2. **Add Category** - Test form tambah dengan title, content, dan image
3. **Edit Category** - Test edit existing category
4. **Delete Category** - Test hapus category dengan konfirmasi
5. **Image Upload** - Test upload image (jika backend mendukung file upload)

## 📝 **Catatan**

- Backend menggunakan pagination response format `{ data: { data: [...], meta: {...} }, message: '...' }`
- Response handling sudah diperbaiki di `useAdmin.ts`
- Field `status` dihapus karena tidak ada di database schema
- Image upload memerlukan backend yang mendukung multipart/form-data
