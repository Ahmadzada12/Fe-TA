# Campaign/Donations Dropdown Fix

## Masalah

Dropdown "Campaign Terkait" di form tambah berita tidak terisi, meskipun API request berhasil.

## Root Cause Analysis

Masalah yang sama seperti categories dropdown sebelumnya. Backend crowdfunding/donations menggunakan pagination response dengan struktur:

```typescript
{
  data: {
    data: [campaigns],  // Array campaigns
    meta: {
      page: 1,
      limit: 10,
      total: 3,
      // ... pagination info
    }
  },
  message: 'success'
}
```

## Backend Endpoint

- **URL**: `GET /v1/crowdfounding`
- **Controller**: `CrowdfoundingController`
- **Response**: Menggunakan `ResponseEntity` dengan pagination

## Frontend Problem

Di `useAdmin.ts`, `getDonations()` menggunakan response handling lama:

- ❌ Mencari `response.data` (array) - tidak ada
- ❌ Mencari `response` (array) - tidak ada
- ✅ Yang benar: `response.data.data` (array)

## Solusi

### Perbaikan di `useAdmin.ts`

Updated `getDonations()` method dengan response handling yang benar:

```typescript
// Handle different response formats for donations (with pagination)
if (response.data && response.data.data && Array.isArray(response.data.data)) {
  // Paginated response format: { data: { data: [...], meta: {...} }, message: '...' }
  donations.value = response.data.data;
} else if (response.data && Array.isArray(response.data)) {
  // Direct data response format: { data: [...], message: '...' }
  donations.value = response.data;
} else if (Array.isArray(response)) {
  // Raw array response
  donations.value = response;
} else {
  console.warn("Unexpected donations response format:", response);
  donations.value = [];
}
```

### Debug Logs Added

- `🎯 Donations API Response`
- `🎯 Final donations.value`
- `🎯 Final donations count`

## Testing

1. Refresh halaman News Management
2. Klik "Tambah Berita"
3. Periksa dropdown "Campaign Terkait" - seharusnya terisi
4. Klik tombol "Debug" untuk melihat console logs

## Expected Result

- Dropdown "Campaign Terkait" terisi dengan data campaigns dari backend
- Console log menampilkan donations count > 0
- Form tambah berita berfungsi normal dengan pilihan campaign

## Files Modified

- ✅ `src/composables/useAdmin.ts` - Updated getDonations response handling
- ✅ `src/pages/admin/NewsManagement.vue` - Added donations debug logs

## Notes

- Backend menggunakan pagination untuk `/crowdfounding` endpoint
- Pattern yang sama bisa diterapkan untuk endpoint lain yang menggunakan pagination
- Pastikan semua GET endpoints menggunakan response handling yang konsisten
