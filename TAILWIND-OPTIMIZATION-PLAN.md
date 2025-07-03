# Rencana Optimisasi Tailwind Config

## 🔍 Temuan Audit

### 1. **Responsive Breakpoints - CRITICAL**

**Masalah:**

- Menggunakan custom `screens` dengan format `mq` yang tidak standar
- Tidak memiliki `sm`, `md`, `xl`, `2xl` standar Tailwind
- Developer menggunakan `sm:`, `md:`, `lg:`, `xl:` di Vue files tapi tidak terdefinisi dengan benar

**Dampak:**

- Utility classes seperti `sm:inline`, `md:text-5xl`, `xl:max-w-lg` mungkin tidak berfungsi
- Inkonsistensi responsive behavior
- Developer confusion

### 2. **Font Size Custom yang Berlebihan**

**Masalah:**

- Custom fontSize seperti `xs-sm`, `lg-xl` yang terlalu granular
- Overlap dengan standar Tailwind
- Tidak mengikuti design system yang jelas

### 3. **Border Radius yang Tidak Konsisten**

**Masalah:**

- Border radius custom dengan naming yang aneh: `3xs`, `10xs-6`, `base-2`, `31xl`
- Tidak mengikuti konvensi Tailwind yang jelas

### 4. **Color Usage Analysis**

**Positif:**

- ✅ Gray scale sudah diperbaiki (gray-900 = #111827)
- ✅ Redundant colors sudah dihapus
- ✅ Lightseagreen color palette sudah baik

**Masih Perlu Perhatian:**

- Beberapa file masih menggunakan `whitesmoke-100` yang bisa diganti dengan `gray-50`
- Custom `neutral` colors yang overlap dengan `gray`

### 5. **Penggunaan Legacy dan Deprecated**

**Masalah:**

- File `info-donatur.vue` masih menggunakan `whitesmoke-100`, `lightgray-100`
- Custom `mq` breakpoints yang tidak standar

## 🚀 Rencana Optimisasi

### Phase 1: Critical Fixes (High Priority)

1. **Perbaiki Responsive Breakpoints**
2. **Standardisasi Border Radius**
3. **Audit Font Sizes**

### Phase 2: Clean Up (Medium Priority)

1. **Migrasi dari Legacy Colors**
2. **Optimisasi Color Palette**
3. **Documentation Update**

### Phase 3: Enhancement (Low Priority)

1. **Add Design Tokens**
2. **Create Component Classes**
3. **Performance Optimization**

## 📋 Implementation Checklist

### ✅ Completed

- [x] Fix gray scale colors
- [x] Remove redundant lightgray, dimgray, darkgray
- [x] Basic color palette organization

### 🔄 Next Steps

- [ ] Fix responsive breakpoints
- [ ] Standardize border radius
- [ ] Update legacy color usage in Vue files
- [ ] Add design system documentation
- [ ] Performance audit

## 🎯 Expected Benefits

1. **Improved Developer Experience**

   - Predictable responsive behavior
   - Standard Tailwind utilities work as expected
   - Better IntelliSense support

2. **Better Maintainability**

   - Consistent design system
   - Reduced custom configuration
   - Easier onboarding for new developers

3. **Performance**
   - Smaller CSS bundle (fewer custom utilities)
   - Better purging efficiency
   - Faster build times

## ⚠️ Risk Assessment

**Low Risk:**

- Border radius changes (mostly internal)
- Font size cleanup (gradual migration)

**Medium Risk:**

- Responsive breakpoint changes (need to test all pages)
- Color migrations (visual changes possible)

**Mitigation:**

- Test each change thoroughly
- Update one section at a time
- Keep fallbacks for critical paths
