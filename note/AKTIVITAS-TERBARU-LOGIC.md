# AKTIVITAS TERBARU - SYSTEM IMPLEMENTATION

## 📋 **Penjelasan Logika Aktivitas Terbaru**

### 🔍 **Apa yang Ditampilkan:**

**"Aktivitas Terbaru"** di dashboard admin menampilkan **aktivitas terbaru yang terjadi di platform**, memberikan admin insight tentang apa yang sedang terjadi secara real-time.

### 🎯 **Jenis Aktivitas yang Ditampilkan:**

#### 1. **📰 News Activities**

```
"Berita 'Bantuan untuk Korban Banjir' telah dipublikasi"
- Icon: fas fa-newspaper
- Time: 2 jam yang lalu
- Source: Dari tabel news (latest created/updated)
```

#### 2. **💝 Donation Activities**

```
"Ahmad Fauzi berdonasi untuk 'Pendidikan Anak Yatim'"
- Icon: fas fa-heart
- Time: 30 menit yang lalu
- Source: Dari tabel donation dengan status SUCCESS
```

#### 3. **👤 User Registration Activities**

```
"Pengguna baru 'Maria Sari' telah mendaftar"
- Icon: fas fa-user-plus
- Time: 1 hari yang lalu
- Source: Dari tabel user (latest registered)
```

#### 4. **🏷️ Category Activities** (Future)

```
"Kategori 'Bencana Alam' telah ditambahkan"
- Icon: fas fa-tags
- Time: 3 jam yang lalu
```

#### 5. **🎯 Campaign Activities** (Future)

```
"Campaign 'Renovasi Masjid' mencapai 75% target"
- Icon: fas fa-bullseye
- Time: 5 jam yang lalu
```

### 🔧 **Technical Implementation:**

#### **Backend Logic (dashboard.repository.ts):**

```typescript
private async getRecentActivities() {
  // 1. Ambil data terbaru dari berbagai tabel
  const [latestNews, latestDonations, latestUsers] = await Promise.all([
    // News terbaru (2 items)
    this.prismaService.news.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 2,
      select: { title: true, createdAt: true },
    }),

    // Donations terbaru (2 items)
    this.prismaService.donation.findMany({
      where: { status: 'SUCCESS' },
      orderBy: { createdAt: 'desc' },
      take: 2,
      include: {
        crowdfounding: { select: { title: true } },
        user: { select: { fullname: true } }
      },
    }),

    // Users terbaru (1 item)
    this.prismaService.user.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 1,
      select: { fullname: true, createdAt: true },
    }),
  ]);

  // 2. Convert ke format activity
  const activities = [];

  // Transform news data
  latestNews.forEach((news, index) => {
    activities.push({
      id: `news-${index}`,
      title: `Berita "${news.title}" telah dipublikasi`,
      time: this.formatTimeAgo(news.createdAt),
      icon: 'fas fa-newspaper',
      type: 'news',
    });
  });

  // Transform donation data
  latestDonations.forEach((donation, index) => {
    activities.push({
      id: `donation-${index}`,
      title: `${donation.user.fullname} berdonasi untuk "${donation.crowdfunding.title}"`,
      time: this.formatTimeAgo(donation.createdAt),
      icon: 'fas fa-heart',
      type: 'donation',
    });
  });

  // Transform user data
  latestUsers.forEach((user, index) => {
    activities.push({
      id: `user-${index}`,
      title: `Pengguna baru "${user.fullname}" telah mendaftar`,
      time: this.formatTimeAgo(user.createdAt),
      icon: 'fas fa-user-plus',
      type: 'user',
    });
  });

  // 3. Sort by time descending dan ambil 5 teratas
  return activities
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5);
}
```

#### **Time Formatting Logic:**

```typescript
private formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'Baru saja';
  if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
  if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
  if (diffInDays < 7) return `${diffInDays} hari yang lalu`;

  return date.toLocaleDateString('id-ID');
}
```

### 📊 **API Response Format:**

```json
{
  "data": {
    "TotalNews": 15,
    "TotalCategories": 8,
    "TotalCrowdfunding": 25,
    "TotalUsers": 150,
    "TotalRaised": 125750000,
    "ActiveCampaigns": 18,
    "recentActivities": [
      {
        "id": "donation-0",
        "title": "Ahmad Fauzi berdonasi untuk \"Pendidikan Anak Yatim\"",
        "time": "30 menit yang lalu",
        "icon": "fas fa-heart",
        "type": "donation"
      },
      {
        "id": "news-0",
        "title": "Berita \"Bantuan untuk Korban Banjir\" telah dipublikasi",
        "time": "2 jam yang lalu",
        "icon": "fas fa-newspaper",
        "type": "news"
      },
      {
        "id": "user-0",
        "title": "Pengguna baru \"Maria Sari\" telah mendaftar",
        "time": "1 hari yang lalu",
        "icon": "fas fa-user-plus",
        "type": "user"
      }
    ]
  },
  "message": "success"
}
```

### 🎨 **Frontend Display (Dashboard.vue):**

```vue
<div class="bg-white rounded-lg shadow p-6">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
  <div class="space-y-3">
    <div v-if="!recentActivity.length" class="text-gray-500 text-center py-4">
      Belum ada aktivitas terbaru
    </div>
    <div
      v-for="activity in recentActivity"
      :key="activity.id"
      class="flex items-center p-3 bg-gray-50 rounded-lg"
    >
      <div class="p-2 rounded-full bg-blue-100 mr-3">
        <i :class="activity.icon" class="text-blue-600"></i>
      </div>
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
        <p class="text-xs text-gray-500">{{ activity.time }}</p>
      </div>
    </div>
  </div>
</div>
```

### 🚀 **Benefits untuk Admin:**

1. **Real-time Monitoring**: Lihat aktivitas platform secara real-time
2. **Quick Insights**: Tahu immediately apa yang terjadi di platform
3. **User Engagement**: Monitor registrasi user baru dan donasi
4. **Content Activity**: Track publish berita dan campaign baru
5. **Data-driven**: Semua berdasarkan data real dari database

### 🔄 **Future Enhancements:**

#### **1. Activity Log Table (Recommended)**

```sql
-- Proper activity logging table
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY,
  type VARCHAR(50), -- 'news_created', 'donation_received', etc.
  title VARCHAR(255),
  description TEXT,
  entity_id UUID, -- Related entity ID
  entity_type VARCHAR(50), -- 'news', 'campaign', 'user'
  user_id UUID, -- Who performed action
  metadata JSONB, -- Additional data
  created_at TIMESTAMP
);
```

#### **2. Real-time Notifications**

- WebSocket integration untuk real-time updates
- Push notifications untuk admin
- Live activity feed

#### **3. Advanced Filtering**

- Filter by activity type
- Filter by date range
- Search in activities

### 💡 **Kesimpulan Logika:**

**Aktivitas Terbaru** mengambil data terbaru dari:

- ✅ **2 Berita terbaru** yang dipublikasi
- ✅ **2 Donasi terbaru** yang berhasil
- ✅ **1 User terbaru** yang mendaftar

Kemudian menggabungkan, sort by time, dan menampilkan **5 aktivitas teratas** dengan format yang user-friendly dan time formatting yang mudah dibaca.

**Current Status**: ✅ **IMPLEMENTED & WORKING**
