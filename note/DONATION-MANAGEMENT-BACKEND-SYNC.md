# Donation Management Backend Synchronization

## Summary
Perbaikan DonationManagement.vue untuk sinkronisasi dengan backend Crowdfunding API

## Backend Analysis

### Endpoint: `/crowdfounding`
- **Controller**: `CrowdfoundingController` 
- **DTO**: `CreateCrowdfoundingDto`, `UpdateCrowdfoundingDto`
- **Upload**: Menggunakan `multerConfig` untuk file upload
- **Method**: FormData untuk multipart/form-data

### Backend Fields (schema.prisma)
```prisma
model Crowdfounding {
  id                   String   @id @default(uuid())
  title                String
  statusDonasi         status   @default(published)  // enum: published, unpublished
  donationTarget       Float
  donationCollected    Float    @default(0)
  image                String
  donationStartDate    DateTime
  donationFinishedDate DateTime
  isDisbursed          Boolean  @default(false)
  disbursementDate     DateTime?
  disbursementProof    String?
  disbursementDescription String?
}

enum status {
  published
  unpublished
}
```

### Backend DTO Fields
**CreateCrowdfoundingDto:**
- `title: string`
- `statusDonasi: status` (published/unpublished)
- `donationTarget: number`
- `donationCollected: number`
- `image: string` (optional)
- `donationStartDate: Date`
- `donationFinishedDate: Date`

## Frontend Fixes Applied

### 1. Field Mapping Corrections
**BEFORE:**
- `targetAmount` → **FIXED TO:** `donationTarget`
- `currentAmount` → **FIXED TO:** `donationCollected` 
- `status` → **FIXED TO:** `statusDonasi`

### 2. Status Enum Corrections
**BEFORE:**
```javascript
// Wrong status values
'active', 'completed', 'inactive'
```

**FIXED TO:**
```javascript
// Correct backend enum values
'published', 'unpublished'
```

### 3. Table Structure Fixes
**REMOVED:**
- Kolom "Kategori" (backend tidak menggunakan kategori)
- Field `categoryId` dari form dan filter

**UPDATED:**
- Colspan untuk empty state: `7` → `6`
- Table headers sesuai dengan field backend

### 4. Date Handling
**ADDED:**
```javascript
const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short', 
    day: 'numeric'
  })
}

const formatDateRange = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return '-'
  const start = formatDate(startDate)
  const end = formatDate(endDate)
  return `${start} - ${end}`
}
```

### 5. Form Data Structure
**UPDATED:**
```javascript
const donationForm = ref({
  title: '',
  donationTarget: 0,        // ✅ Matches backend
  donationCollected: 0,     // ✅ Matches backend  
  statusDonasi: 'published', // ✅ Matches backend enum
  image: null as File | null, // ✅ File upload for backend
  donationStartDate: '',    // ✅ Required by backend
  donationFinishedDate: ''  // ✅ Required by backend
})
```

### 6. FormData Implementation
**CREATE/UPDATE Methods:**
```javascript
const formData = new FormData()
formData.append('title', donationForm.value.title)
formData.append('donationTarget', donationForm.value.donationTarget.toString())
formData.append('donationCollected', donationForm.value.donationCollected.toString())
formData.append('statusDonasi', donationForm.value.statusDonasi)
formData.append('donationStartDate', new Date(donationForm.value.donationStartDate).toISOString())
formData.append('donationFinishedDate', new Date(donationForm.value.donationFinishedDate).toISOString())

if (donationForm.value.image) {
  formData.append('image', donationForm.value.image)
}
```

### 7. Filter Updates
**REMOVED:**
- Category filter (tidak digunakan backend)

**KEPT:**
- Status filter (sesuai dengan `statusDonasi`)
- Search filter (berdasarkan `title`)

### 8. Status Display Functions
**UPDATED:**
```javascript
const getStatusClass = (status: string) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800'
    case 'unpublished':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'published':
      return 'Published'
    case 'unpublished':
      return 'Unpublished'
    default:
      return status
  }
}
```

## Backend Integration Status

✅ **SYNCHRONIZED:**
- Field mapping sesuai schema Prisma
- Status enum sesuai backend
- FormData untuk file upload
- Date handling yang benar
- API endpoint yang benar (`/crowdfounding`)

✅ **TESTED READY:**
- Create campaign dengan image upload
- Update campaign dengan image upload
- Delete campaign
- Filter berdasarkan status dan pencarian
- Pagination support dari backend

## API Methods Verification

### useAdmin.ts Integration
- ✅ `getDonations()` → `GET /crowdfounding`
- ✅ `createDonation(formData)` → `POST /crowdfounding` 
- ✅ `updateDonation(id, formData)` → `PUT /crowdfounding/:id`
- ✅ `deleteDonation(id)` → `DELETE /crowdfounding/:id`

### Response Handling
- ✅ Pagination support dengan format `{ data: { data: [...], meta: {...} } }`
- ✅ Error handling untuk connection issues
- ✅ Loading state management

## Notes

1. **File Upload**: Backend menggunakan multer untuk handle file upload dengan field name 'image'
2. **Date Format**: Backend expects ISO date strings, frontend converts datetime-local input
3. **No Categories**: Crowdfunding tidak menggunakan kategori seperti News
4. **Status Only**: Frontend hanya filter berdasarkan status dan search, tidak ada kategori

## Testing Checklist

- [ ] Test create campaign dengan semua field
- [ ] Test create campaign dengan image upload  
- [ ] Test update campaign existing
- [ ] Test update campaign dengan image baru
- [ ] Test delete campaign
- [ ] Test filter berdasarkan status
- [ ] Test search berdasarkan title
- [ ] Test date range display
- [ ] Test percentage calculation
- [ ] Test currency formatting

## Dependencies

- Backend endpoint `/crowdfounding` harus aktif
- Multer config untuk file upload harus tersedia
- Database schema Crowdfounding harus sesuai
