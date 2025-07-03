# API Endpoint Correction

## Masalah Yang Ditemukan

API endpoint di `useAdmin.ts` tidak sesuai dengan struktur backend controller yang sebenarnya.

## Analisis Backend Controllers

Dari pemeriksaan backend di `c:\Users\annan\Downloads\Be-TA\Be-TA\BE-TA-Zip\src\app\`, berikut adalah endpoint yang benar:

### 1. News Controller

```typescript
@Controller({
  path: 'news',
  version: '1',
})
```

**Endpoint**: `/v1/news` ✅ **BENAR**

### 2. Category Controller

```typescript
@Controller({
  path: 'category',
  version: '1',
})
```

**Endpoint**: `/v1/category` ✅ **BENAR**

### 3. Users Controller

```typescript
@Controller({
  path: 'user',
  version: '1',
})
```

**Endpoint**: `/v1/user` (bukan `/v1/users`) 🔧 **DIPERBAIKI**

### 4. Crowdfunding Controller

```typescript
@Controller({
  path: 'crowdfounding',
  version: '1',
})
```

**Endpoint**: `/v1/crowdfounding` ✅ **BENAR**

### 5. Dashboard Controller

```typescript
@Controller({
  path: 'Dashboard',
  version: '1',
})
```

**Endpoint**: `/v1/Dashboard/get` ✅ **BENAR**

## Perbaikan Yang Dilakukan

### Perbaikan di `useAdmin.ts`

1. **Users endpoint**: Mengubah dari `/users` ke `/user`
   - `getUsers()`: `/users` → `/user`
   - `updateUser()`: `/users/${id}` → `/user/${id}`
   - `deleteUser()`: `/users/${id}` → `/user/${id}`

## Pengujian

Untuk menguji koneksi API yang sudah diperbaiki:

1. **Frontend**: Jalankan di port 5173 ✅
2. **Backend**: Pastikan berjalan di port 3001
3. **Test endpoint**:
   ```bash
   curl -X GET http://localhost:3001/v1/news
   curl -X GET http://localhost:3001/v1/category
   curl -X GET http://localhost:3001/v1/user
   curl -X GET http://localhost:3001/v1/crowdfounding
   curl -X GET http://localhost:3001/v1/Dashboard/get
   ```

## Status

- ✅ News endpoint: Sudah benar
- ✅ Category endpoint: Sudah benar
- 🔧 Users endpoint: **DIPERBAIKI** dari `/users` ke `/user`
- ✅ Crowdfunding endpoint: Sudah benar
- ✅ Dashboard endpoint: Sudah benar

## Next Steps

1. Test koneksi frontend-backend
2. Verifikasi response format dari setiap endpoint
3. Test CRUD operations untuk setiap modul
