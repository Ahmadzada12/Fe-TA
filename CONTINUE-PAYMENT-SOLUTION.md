# IMPLEMENTASI BUTTON "LANJUTKAN PEMBAYARAN"

## 🎯 Solusi untuk Donatur yang Belum Selesai Bayar

Berdasarkan analisis kasus Anda, ini adalah solusi terbaik:

### 📍 **Lokasi: Halaman Riwayat Donasi**

**Kenapa di sini?**

- ✅ User secara natural akan cek riwayat setelah gagal bayar
- ✅ Konteks yang jelas: user bisa lihat donasi pending
- ✅ Tidak mengganggu flow normal aplikasi
- ✅ Mudah ditemukan dan dipahami

### 🎨 **Design Implementation:**

#### 1. **Tambah Kolom Action di Table Riwayat**

```vue
<!-- Tambah kolom header -->
<th>Action</th>

<!-- Tambah cell action -->
<td class="py-3 px-4 whitespace-nowrap">
  <!-- Button untuk status PENDING dengan invoiceUrl -->
  <button
    v-if="donation.status === 'PENDING' && donation.invoiceUrl"
    @click="continuePayment(donation.invoiceUrl)"
    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
  >
    💳 Bayar Sekarang
  </button>
  
  <!-- Status indicator untuk lainnya -->
  <span v-else class="text-xs text-gray-500">
    {{ getActionText(donation.status) }}
  </span>
</td>
```

#### 2. **Tambah Function di Script**

```typescript
// Interface update
interface Donation {
  id: string;
  // ...existing fields
  invoiceUrl?: string; // Tambahkan field ini
  xenditInvoiceId?: string;
}

// Function untuk handle payment
const continuePayment = (invoiceUrl: string) => {
  if (invoiceUrl) {
    window.open(invoiceUrl, "_blank");
  }
};

const getActionText = (status: string) => {
  if (status === "SUCCESS") return "✅ Selesai";
  if (status === "FAILED") return "❌ Gagal";
  if (status === "PENDING") return "⏳ Menunggu";
  return "-";
};
```

### 🔧 **Backend Adjustment Needed:**

#### 1. **Update Donate Response untuk Include invoiceUrl**

```typescript
// di donate.service.ts - method untuk get donations
async getDonationsByUser(userId: string) {
  return this.prisma.donation.findMany({
    where: { userId },
    include: { crowdfounding: true },
    // Pastikan include invoiceUrl untuk pending donations
    select: {
      id: true,
      amount: true,
      message: true,
      status: true,
      createdAt: true,
      xenditInvoiceId: true,
      // Tambahkan field ini jika belum ada
      invoiceUrl: true,
      crowdfounding: {
        select: { title: true }
      }
    }
  });
}
```

#### 2. **Optional: Endpoint untuk Re-generate Invoice URL**

```typescript
// Untuk kasus invoice URL expired
@Get(':id/payment-url')
async getPaymentUrl(@Param('id') donationId: string) {
  // Logic untuk get/regenerate Xendit invoice URL
  // Jika invoice masih valid, return existing URL
  // Jika expired, create new invoice dengan external_id yang sama
}
```

### 🎯 **UX Flow yang Optimal:**

#### Scenario 1: **User Kembali ke Riwayat**

1. User lihat donasi dengan status "PENDING"
2. Button "💳 Bayar Sekarang" terlihat jelas
3. Klik button → Redirect ke Xendit payment page
4. User selesai bayar → Status otomatis update ke "SUCCESS"

#### Scenario 2: **Invoice URL Expired**

1. User klik button tapi URL tidak valid
2. Show notification: "Link pembayaran sudah kadaluarsa"
3. Button berubah jadi "🔄 Buat Link Baru"
4. Generate new invoice dengan amount yang sama

### 💡 **Enhancements (Optional):**

#### 1. **Auto-refresh Status**

```typescript
// Cek status setiap 30 detik untuk pending donations
const autoRefreshPendingDonations = () => {
  setInterval(async () => {
    const pendingDonations = donations.value.filter(
      (d) => d.status === "PENDING"
    );
    if (pendingDonations.length > 0) {
      await fetchDonations(); // Refresh data
    }
  }, 30000);
};
```

#### 2. **Visual Indicators**

```vue
<!-- Highlight row untuk pending donations -->
<tr
  :class="{
    'bg-yellow-50 border-l-4 border-yellow-400': donation.status === 'PENDING',
    'hover:bg-gray-50': donation.status !== 'PENDING',
  }"
></tr>
```

#### 3. **Notification Toast**

```typescript
const continuePayment = (invoiceUrl: string) => {
  // Show notification
  showNotification("Redirecting to payment page...", "info");

  // Redirect after short delay
  setTimeout(() => {
    window.open(invoiceUrl, "_blank");
  }, 1000);
};
```

### 🚀 **Implementation Priority:**

#### **Phase 1 (Essential):**

1. ✅ Tambah kolom Action di table
2. ✅ Button "Bayar Sekarang" untuk PENDING status
3. ✅ Function continuePayment()
4. ✅ Update interface Donation

#### **Phase 2 (Enhancement):**

1. 🔄 Auto-refresh status
2. 🎨 Visual indicators
3. 📱 Mobile-responsive design
4. ⏰ Expired URL handling

### 📱 **Mobile Consideration:**

- Button size cukup besar untuk touch
- Text pendek: "Bayar" instead of "Bayar Sekarang"
- Icon yang jelas: 💳 atau payment icon

## 🎯 **Kesimpulan:**

**Lokasi terbaik: Halaman Riwayat Donasi**

- Konteks natural dan expected
- Tidak mengganggu flow normal
- User-friendly dan intuitive
- Easy to implement

Apakah Anda ingin saya implementasikan solusi ini secara langsung?
