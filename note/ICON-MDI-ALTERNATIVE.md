# Alternative Icon Solution - Material Design Icons

Jika FontAwesome masih bermasalah, gunakan Material Design Icons yang sudah tersedia:

## Replace FontAwesome dengan MDI

### NewsManagement.vue - Table Actions

```html
<!-- View/Show Action -->
<button
  @click="viewNews(news)"
  class="text-gray-600 hover:text-gray-900 transition-colors mr-2"
  title="Lihat Detail"
>
  <i class="mdi mdi-eye text-lg"></i>
</button>

<!-- Edit Action -->
<button
  @click="editNews(news)"
  class="text-blue-600 hover:text-blue-900 transition-colors mr-2"
  title="Edit Berita"
>
  <i class="mdi mdi-pencil text-lg"></i>
</button>

<!-- Delete Action -->
<button
  @click="confirmDelete(news)"
  class="text-red-600 hover:text-red-900 transition-colors"
  title="Hapus Berita"
>
  <i class="mdi mdi-delete text-lg"></i>
</button>
```

## MDI Icon Mapping

- `fas fa-eye` → `mdi mdi-eye`
- `fas fa-pen` → `mdi mdi-pencil`
- `fas fa-trash` → `mdi mdi-delete`
- `fas fa-plus` → `mdi mdi-plus`
- `fas fa-bug` → `mdi mdi-bug`
- `fas fa-filter` → `mdi mdi-filter`
- `fas fa-times` → `mdi mdi-close`
- `fas fa-calendar` → `mdi mdi-calendar`
- `fas fa-edit` → `mdi mdi-pencil`

## Apply MDI Icons Script

Run this PowerShell script to replace all FontAwesome with MDI:

```powershell
# Replace icons in NewsManagement.vue
$file = "src/pages/admin/NewsManagement.vue"
(Get-Content $file) -replace 'fas fa-eye', 'mdi mdi-eye text-lg' | Set-Content $file
(Get-Content $file) -replace 'fas fa-pen', 'mdi mdi-pencil text-lg' | Set-Content $file
(Get-Content $file) -replace 'fas fa-trash', 'mdi mdi-delete text-lg' | Set-Content $file
(Get-Content $file) -replace 'fas fa-plus', 'mdi mdi-plus' | Set-Content $file
(Get-Content $file) -replace 'fas fa-bug', 'mdi mdi-bug' | Set-Content $file
(Get-Content $file) -replace 'fas fa-filter', 'mdi mdi-filter' | Set-Content $file
(Get-Content $file) -replace 'fas fa-times', 'mdi mdi-close' | Set-Content $file
(Get-Content $file) -replace 'fas fa-calendar', 'mdi mdi-calendar' | Set-Content $file
(Get-Content $file) -replace 'fas fa-edit', 'mdi mdi-pencil' | Set-Content $file
(Get-Content $file) -replace 'fas fa-refresh', 'mdi mdi-refresh' | Set-Content $file
(Get-Content $file) -replace 'fas fa-newspaper', 'mdi mdi-newspaper' | Set-Content $file
(Get-Content $file) -replace 'fas fa-exclamation-circle', 'mdi mdi-alert-circle' | Set-Content $file
```

MDI Icons sudah tersedia dan ter-load dari CDN yang ada di index.html.
