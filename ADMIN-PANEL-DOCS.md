# Admin Panel Documentation

## Overview
Admin panel untuk UNS Donation Platform yang telah dibangun menggunakan Vue 3, TypeScript, dan Tailwind CSS.

## Fitur Admin Panel

### 1. Dashboard (`/admin/dashboard`)
- **Statistik**: Menampilkan total pengguna, total donasi, dana terkumpul, dan berita aktif
- **Quick Actions**: Akses cepat ke halaman manajemen
- **Recent Activity**: Aktivitas terbaru pada platform

### 2. News Management (`/admin/news`)
- **CRUD Operations**: Create, Read, Update, Delete berita
- **Modal Forms**: Form tambah/edit berita dalam modal
- **Table View**: Tampilan tabel dengan informasi lengkap berita
- **Search & Filter**: Pencarian dan filter berdasarkan status

### 3. Category Management (`/admin/categories`)
- **CRUD Operations**: Manajemen kategori donasi
- **Status Management**: Aktif/Tidak Aktif kategori
- **Simple Interface**: Interface sederhana dan mudah digunakan

### 4. Donation Management (`/admin/donations`)
- **CRUD Operations**: Manajemen campaign donasi
- **Advanced Filtering**: Filter berdasarkan status, kategori, dan pencarian
- **Progress Tracking**: Menampilkan persentase pencapaian target
- **Currency Formatting**: Format mata uang Indonesia

### 5. User Management (`/admin/users`)
- **CRUD Operations**: Manajemen pengguna
- **Role Management**: Admin/User roles
- **User Statistics**: Total donasi per pengguna
- **Safety Features**: Perlindungan hapus admin

## Technical Implementation

### File Structure
```
src/
├── pages/admin/
│   ├── Dashboard.vue
│   ├── NewsManagement.vue
│   ├── CategoryManagement.vue
│   ├── DonationManagement.vue
│   └── UserManagement.vue
├── layouts/
│   └── AdminLayout.vue
└── composables/
    └── useAdmin.ts
```

### Key Components

#### AdminLayout.vue
- **Sidebar Navigation**: Menu samping dengan routing otomatis
- **Header**: Informasi user dan breadcrumb
- **Responsive Design**: Adaptif untuk berbagai ukuran layar

#### useAdmin.ts Composable
- **Centralized API Calls**: Semua API call admin terpusat
- **Reactive State**: State management reaktif untuk Vue 3
- **Error Handling**: Penanganan error yang konsisten
- **Loading States**: State loading yang terpusat

### Routes Configuration
```typescript
// Admin routes with authentication guards
/admin -> redirect to /admin/dashboard
/admin/dashboard -> Dashboard.vue
/admin/news -> NewsManagement.vue
/admin/categories -> CategoryManagement.vue
/admin/donations -> DonationManagement.vue
/admin/users -> UserManagement.vue
```

### Security Features
- **Role-based Access**: Hanya admin yang bisa akses
- **Authentication Guards**: Router guard untuk proteksi
- **Confirm Dialogs**: Konfirmasi untuk operasi berbahaya
- **Admin Protection**: Admin tidak bisa dihapus

## API Endpoints Expected
Admin panel mengharapkan endpoint backend berikut:

### Dashboard
- `GET /v1/admin/dashboard` - Dashboard statistics

### News
- `GET /v1/admin/news` - Get all news
- `POST /v1/admin/news` - Create news
- `PUT /v1/admin/news/:id` - Update news
- `DELETE /v1/admin/news/:id` - Delete news

### Categories
- `GET /v1/admin/categories` - Get all categories
- `POST /v1/admin/categories` - Create category
- `PUT /v1/admin/categories/:id` - Update category
- `DELETE /v1/admin/categories/:id` - Delete category

### Donations (Crowdfunding)
- `GET /v1/admin/crowdfunding` - Get all donations
- `POST /v1/admin/crowdfunding` - Create donation
- `PUT /v1/admin/crowdfunding/:id` - Update donation
- `DELETE /v1/admin/crowdfunding/:id` - Delete donation

### Users
- `GET /v1/admin/users` - Get all users
- `POST /v1/admin/users` - Create user
- `PUT /v1/admin/users/:id` - Update user
- `DELETE /v1/admin/users/:id` - Delete user

## Features

### Responsive Design
- **Mobile First**: Designed untuk mobile dan desktop
- **Tailwind CSS**: Menggunakan utility-first CSS framework
- **Modern UI**: Interface yang clean dan modern

### User Experience
- **Loading States**: Indikator loading untuk semua operasi
- **Error Handling**: Pesan error yang informatif
- **Confirmations**: Konfirmasi untuk operasi berbahaya
- **Form Validation**: Validasi form yang proper

### Data Management
- **Real-time Updates**: Data ter-update setelah operasi CRUD
- **Optimistic Updates**: UI responsif dengan update optimistic
- **State Management**: Centralized state dengan composables

## Deployment Notes

### Environment Variables
```env
VITE_APP_API_BASE_URL=http://localhost:3001/v1
```

### Build Commands
```bash
# Development
pnpm dev / npm run dev

# Production Build
pnpm build / npm run build

# Preview Production
pnpm preview / npm run preview
```

## Future Improvements

### Potential Enhancements
1. **Pagination**: Untuk data yang banyak
2. **Export Features**: Export data ke Excel/CSV
3. **Advanced Filtering**: Filter date range, dll
4. **Dashboard Charts**: Grafik untuk statistik
5. **Bulk Operations**: Operasi bulk untuk efisiensi
6. **Image Upload**: Upload gambar langsung
7. **Rich Text Editor**: Editor WYSIWYG untuk konten
8. **Activity Logs**: Log aktivitas admin
9. **Permission System**: System permission yang lebih granular
10. **Dark Mode**: Theme gelap

### Code Quality
- **Unit Tests**: Tambah unit tests
- **E2E Tests**: Tambah end-to-end tests
- **TypeScript Strict**: Mode TypeScript yang lebih ketat
- **ESLint Rules**: Aturan linting yang lebih ketat

## Support
Admin panel ini dibangun untuk mendukung operasional platform donasi UNS dengan interface yang sederhana namun fungsional.
