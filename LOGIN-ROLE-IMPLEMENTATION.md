# LOGIN DENGAN ROLE-BASED AUTHENTICATION

## ✅ Implementasi Selesai

Login system telah diupdate untuk mendukung role-based authentication dengan fitur-fitur berikut:

### 🔐 Fitur Role-Based Authentication

1. **Penyimpanan Role di localStorage**
   - Role user disimpan sebagai `userRole` di localStorage
   - Diambil dari response backend (`user.role`)
   - Default ke 'user' jika tidak ada role

2. **Role-Based Redirection**
   - **Admin**: Redirect ke `/admin/dashboard`
   - **User**: Redirect ke `/` (homepage)
   - Automatic redirect berdasarkan role setelah login berhasil

3. **Router Guards**
   - Route protection untuk admin routes (`/admin/*`)
   - Cek authentication dan role sebelum akses
   - Redirect ke home jika user bukan admin

4. **Logout Handling**
   - Clear semua data termasuk `userRole` saat logout
   - Redirect ke login page

### 🎮 Demo Credentials

Di halaman login, tersedia demo credentials untuk testing:

#### Admin Access
- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Role**: `admin`
- **Redirect**: `/admin/dashboard`

#### User Access  
- **Email**: `user@example.com`
- **Password**: `user123`
- **Role**: `user`
- **Redirect**: `/` (homepage)

### 🚀 Cara Testing

1. **Akses Login Page**: `http://localhost:5173/login`

2. **Test Admin Login**:
   - Klik tombol "Isi" di samping Admin credentials
   - Atau manual input: admin@example.com / admin123
   - Login akan redirect ke admin dashboard

3. **Test User Login**:
   - Klik tombol "Isi" di samping User credentials  
   - Atau manual input: user@example.com / user123
   - Login akan redirect ke homepage

4. **Test Access Control**:
   - Login sebagai user, coba akses `/admin/dashboard`
   - Akan di-redirect ke homepage (access denied)

### 🔧 Technical Implementation

#### Login Flow
```typescript
// 1. Login berhasil
const responseData = response.data.data;

// 2. Store token dan user data
localStorage.setItem("token", responseData.token);
localStorage.setItem("user", JSON.stringify(responseData.user));

// 3. Store role untuk access control
const userRole = responseData.user?.role || 'user';
localStorage.setItem("userRole", userRole);

// 4. Role-based redirection
const redirectPath = userRole.toLowerCase() === 'admin' ? '/admin/dashboard' : '/';
router.push(redirectPath);
```

#### Router Guard
```typescript
router.beforeEach((to, _from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  
  // Check admin routes
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (!isLoggedIn) {
      next({ name: "login" });
      return;
    }
    
    const normalizedRole = (userRole || '').toLowerCase();
    if (normalizedRole !== 'admin') {
      next({ name: "home" }); // Access denied
      return;
    }
  }
  
  next();
});
```

### 📋 Backend Requirements

Backend harus mengembalikan response format:
```json
{
  "message": "Sign-in berhasil",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "email": "admin@example.com",
      "role": "admin",  // PENTING: Role harus ada
      "name": "Admin User"
    }
  }
}
```

### 🎯 Security Features

1. **Route Protection**: Admin routes tidak bisa diakses user biasa
2. **Token Validation**: Semua protected routes butuh valid token  
3. **Role Verification**: Consistent role checking di router guard
4. **Automatic Logout**: Clear semua data saat logout

### ✨ UI Improvements

1. **Demo Credentials Box**: Info dan quick-fill buttons
2. **Role Indicators**: Visual feedback untuk admin/user
3. **Loading States**: Feedback saat login process
4. **Error Handling**: Clear error messages

---

## 🎊 TESTING READY!

Login system sekarang fully support role-based authentication:

✅ **Admin login** → Redirect ke admin dashboard  
✅ **User login** → Redirect ke homepage  
✅ **Access control** → Admin routes protected  
✅ **Demo credentials** → Easy testing  
✅ **Security** → Proper authentication flow  

**Ready for testing dengan backend!** 🚀
