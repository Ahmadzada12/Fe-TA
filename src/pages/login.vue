<template>
  <main class="flex min-h-screen bg-foreground-primary text-white">
    <!-- Kolom Kiri: Form Login (Mengambil 58% lebar layar) -->
    <section class="w-7/12 flex flex-col justify-center items-center p-12">
      <div class="w-full max-w-md">
        <!-- Logo Section -->
        <div class="flex items-center justify-center mb-8 logo-container">
          <img src="/Logo_UNS.png" alt="UNS Logo" class="w-12 h-12" />
          <div class="ml-3">
            <h2 class="text-xl font-bold text-white">UNS</h2>
            <p class="text-xs text-gray-400">Donation Platform</p>
          </div>
        </div>
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-bold font-poppins text-white mb-2">
            Selamat Datang Kembali
          </h1>
          <p class="text-gray-300">Silakan masuk ke akun Anda</p>
        </div>
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Email Field -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-200">
              Alamat Email
            </label>
            <div class="relative input-container">
              <input
                v-model="formData.email"
                id="email"
                type="email"
                autocomplete="email"
                placeholder="Masukkan alamat email Anda"
                class="w-full pr-12 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 form-element"
                :class="{
                  'border-red-500 focus:ring-red-500 focus:border-red-500':
                    errors.email,
                  'border-green-500 focus:ring-green-500 focus:border-green-500':
                    !errors.email &&
                    formData.email &&
                    isValidEmail(formData.email),
                }"
                @blur="validateEmail"
                @input="validateEmailRealtime"
                required
              />
              <!-- Email validation icon -->
              <div
                class="absolute inset-y-0 right-0 flex items-center justify-center w-12"
              >
                <svg
                  v-if="
                    !errors.email &&
                    formData.email &&
                    isValidEmail(formData.email)
                  "
                  class="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else-if="errors.email"
                  class="h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p v-if="errors.email" class="text-red-400 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label
              for="password"
              class="block text-sm font-medium text-gray-200"
            >
              Kata Sandi
            </label>
            <div class="relative input-container">
              <input
                v-model="formData.password"
                id="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Masukkan kata sandi Anda"
                class="w-full pr-12 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 form-element"
                :class="{
                  'border-red-500 focus:ring-red-500 focus:border-red-500':
                    errors.password,
                  'border-green-500 focus:ring-green-500 focus:border-green-500':
                    !errors.password &&
                    formData.password &&
                    formData.password.length >= 6,
                }"
                @blur="validatePassword"
                @input="validatePasswordRealtime"
                required
              />
              <!-- Password visibility toggle -->
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-gray-400 hover:text-white transition-colors password-toggle rounded-r-lg bg-transparent hover:bg-gray-700/30"
              >
                <svg
                  v-if="showPassword"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="text-red-400 text-sm mt-1">
              {{ errors.password }}
            </p>
            <!-- Password strength indicator -->
            <div v-if="formData.password && !errors.password" class="mt-2">
              <div class="flex items-center space-x-2">
                <div class="flex-1 bg-gray-700 rounded-full h-1">
                  <div
                    class="password-strength-bar rounded-full transition-all duration-300"
                    :class="getPasswordStrengthClass()"
                    :style="{ width: getPasswordStrengthWidth() }"
                  ></div>
                </div>
                <span
                  class="password-strength-text"
                  :class="getPasswordStrengthTextClass()"
                >
                  {{ getPasswordStrengthText() }}
                </span>
              </div>
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center cursor-pointer">
              <input
                v-model="formData.rememberMe"
                type="checkbox"
                class="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
              />
              <span class="ml-2 text-sm text-gray-300">Ingat saya</span>
            </label>
            <a
              href="#"
              class="text-sm text-primary hover:text-primary-light transition-colors"
            >
              Lupa kata sandi?
            </a>
          </div>
          <!-- Pesan Error -->
          <div
            v-if="errorMessage"
            class="w-full p-3 my-2 text-sm text-center text-red-300 bg-red-500 bg-opacity-20 rounded-lg error-message"
          >
            {{ errorMessage }}
          </div>
          <!-- Pesan Sukses -->
          <div
            v-if="successMessage"
            class="w-full p-3 my-2 text-sm text-center text-green-300 bg-green-500 bg-opacity-20 rounded-lg success-message"
          >
            {{ successMessage }}
          </div>

          <div class="w-full flex justify-center pt-4">
            <button
              type="submit"
              class="w-full cursor-pointer bg-primary text-white font-bold rounded-lg transition-transform transform hover:scale-105 flex justify-center items-center form-element"
              :disabled="isLoading"
              :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
            >
              <span v-if="!isLoading">Masuk</span>
              <div v-else class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Sedang masuk...</span>
              </div>
            </button>
          </div>
          
          <!-- Demo Credentials Info -->
          <!-- <div class="bg-gray-800/30 border border-gray-600 rounded-lg p-4 mt-4">
            <h3 class="text-sm font-medium text-gray-200 mb-3">🔍 Demo Credentials untuk Testing</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <span class="font-medium text-blue-300">Admin:</span>
                  <span class="text-xs text-gray-300 ml-2">admin@example.com / admin123</span>
                </div>
                <button 
                  @click="fillAdminCredentials"
                  type="button"
                  class="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  Isi
                </button>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <span class="font-medium text-green-300">User:</span>
                  <span class="text-xs text-gray-300 ml-2">user@example.com / user123</span>
                </div>
                <button 
                  @click="fillUserCredentials"
                  type="button"
                  class="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                >
                  Isi
                </button>
              </div>
              <p class="text-xs text-gray-400 mt-2">
                💡 Admin akan diarahkan ke dashboard admin, User ke homepage
              </p>
            </div>
          </div> -->
          
          <div class="w-full flex items-center justify-center py-4">
            <hr class="border-t border-gray-600 flex-grow" />
            <span class="px-4 text-gray-400">ATAU</span>
            <hr class="border-t border-gray-600 flex-grow" />
          </div>
          <div
            class="w-full text-center cursor-pointer text-primary hover:underline"
            @click="onRegisterClick"
          >
            Daftar
          </div>
        </form>
      </div>
    </section>
    <!-- Kolom Kanan: Gambar (Mengambil 42% lebar layar) -->
    <section class="flex items-center justify-center p-8 bg-gray-900">
      <div
        class="w-full h-auto max-h-[90vh] rounded-lg overflow-hidden image-container"
      >
        <img
          class="w-full h-full object-cover"
          src="/auth.png"
          alt="Authentication page image"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// Form data object
const formData = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

// Error tracking
const errors = reactive({
  email: "",
  password: "",
});

// UI state
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);
const isLoading = ref<boolean>(false);
const showPassword = ref<boolean>(false);
const router = useRouter();

const apiBaseUrl =
  import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3001/v1/";

// Email validation function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation functions
const validateEmail = () => {
  if (!formData.email) {
    errors.email = "Email wajib diisi";
    return false;
  }
  if (!isValidEmail(formData.email)) {
    errors.email = "Masukkan alamat email yang valid";
    return false;
  }
  errors.email = "";
  return true;
};

const validatePassword = () => {
  if (!formData.password) {
    errors.password = "Kata sandi wajib diisi";
    return false;
  }
  if (formData.password.length < 6) {
    errors.password = "Kata sandi minimal 6 karakter";
    return false;
  }
  errors.password = "";
  return true;
};

// Real-time validation
const validateEmailRealtime = () => {
  if (formData.email && !isValidEmail(formData.email)) {
    errors.email = "Masukkan alamat email yang valid";
  } else {
    errors.email = "";
  }
};

const validatePasswordRealtime = () => {
  if (formData.password && formData.password.length < 6) {
    errors.password = "Kata sandi minimal 6 karakter";
  } else {
    errors.password = "";
  }
};

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Password strength functions
const getPasswordStrength = () => {
  const password = formData.password;
  let strength = 0;

  if (password.length >= 6) strength += 1;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  return strength;
};

const getPasswordStrengthWidth = () => {
  const strength = getPasswordStrength();
  return `${(strength / 6) * 100}%`;
};

const getPasswordStrengthClass = () => {
  const strength = getPasswordStrength();
  if (strength <= 2) return "bg-red-500";
  if (strength <= 4) return "bg-yellow-500";
  return "bg-green-500";
};

const getPasswordStrengthText = () => {
  const strength = getPasswordStrength();
  if (strength <= 2) return "Lemah";
  if (strength <= 4) return "Sedang";
  return "Kuat";
};

const getPasswordStrengthTextClass = () => {
  const strength = getPasswordStrength();
  if (strength <= 2) return "text-red-400";
  if (strength <= 4) return "text-yellow-400";
  return "text-green-400";
};

// Handle form submission
const handleSubmit = async () => {
  // Clear any existing messages
  errorMessage.value = null;
  successMessage.value = null;

  // Validate all fields
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (!isEmailValid || !isPasswordValid) {
    return;
  }
  isLoading.value = true;
  try {
    console.log("Connecting to:", `${apiBaseUrl}auth/sign-in`);
    console.log("Payload:", { email: formData.email, password: "***" });

    const response = await axios.post(`${apiBaseUrl}auth/sign-in`, {
      email: formData.email,
      password: formData.password,
    });
    console.log("Response received:", response.data);

    // Handle response format from NestJS backend
    // Backend returns: { message: "Sign-in berhasil", data: { token: "...", user: {...} } }
    if (response.data && response.data.data && response.data.data.token) {
      const responseData = response.data.data;

      // Store the token
      localStorage.setItem("token", responseData.token);

      // Store user data and role
      if (responseData.user) {
        localStorage.setItem("user", JSON.stringify(responseData.user));
        localStorage.setItem("id", responseData.user.id);
        
        // Store user role for role-based access control
        const userRole = responseData.user.role || 'user'; // Default to 'user' if no role specified
        localStorage.setItem("userRole", userRole);
        
        console.log("User role stored:", userRole);
      }

      // Store remember me preference
      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("rememberedEmail");
      }

      console.log("Login successful:", responseData);

      // Show success message
      successMessage.value = "Login berhasil! Mengalihkan...";

      // Role-based redirection
      const userRole = responseData.user?.role || 'user';
      const redirectPath = userRole.toLowerCase() === 'admin' ? '/admin/dashboard' : '/';
      
      console.log("Redirecting to:", redirectPath);

      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push(redirectPath);
      }, 1500);
    } else {
      errorMessage.value = "Login gagal: Token tidak ditemukan dalam respons.";
    }
  } catch (error: any) {
    console.error("Error during login:", error);

    // Handle ResponseEntity error format
    if (error.response?.data) {
      const errorData = error.response.data;
      if (errorData.message) {
        errorMessage.value = errorData.message;
      } else if (errorData.error) {
        errorMessage.value = errorData.error;
      } else {
        errorMessage.value = "Login gagal: Email atau kata sandi tidak valid.";
      }
    } else if (axios.isAxiosError(error) && !error.response) {
      errorMessage.value =
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
    } else {
      errorMessage.value = "Terjadi kesalahan yang tidak terduga.";
    }
  } finally {
    isLoading.value = false;
  }
};

// Load remembered email on component mount
const loadRememberedData = () => {
  const rememberMe = localStorage.getItem("rememberMe");
  const rememberedEmail = localStorage.getItem("rememberedEmail");

  if (rememberMe === "true" && rememberedEmail) {
    formData.email = rememberedEmail;
    formData.rememberMe = true;
  }
};

// Initialize remembered data
loadRememberedData();

// Demo credentials fill functions
const fillAdminCredentials = () => {
  formData.email = 'admin@example.com';
  formData.password = 'admin123';
  // Clear any existing errors
  errors.email = '';
  errors.password = '';
};

const fillUserCredentials = () => {
  formData.email = 'user@example.com';
  formData.password = 'user123';
  // Clear any existing errors
  errors.email = '';
  errors.password = '';
};

const onRegisterClick = () => {
  router.push("/register");
};
</script>

<style scoped>
.bg-foreground-primary {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
}

.bg-primary {
  background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%);
}

.text-primary {
  color: #2dd4bf;
}

.text-primary-light {
  color: #5eead4;
}

.focus\:ring-primary:focus {
  --tw-ring-color: #2dd4bf;
  --tw-ring-opacity: 0.5;
}

.focus\:border-primary:focus {
  border-color: #2dd4bf;
}

.focus\:ring-green-500:focus {
  --tw-ring-color: #10b981;
  --tw-ring-opacity: 0.5;
}

.focus\:border-green-500:focus {
  border-color: #10b981;
}

.focus\:ring-red-500:focus {
  --tw-ring-color: #ef4444;
  --tw-ring-opacity: 0.5;
}

.focus\:border-red-500:focus {
  border-color: #ef4444;
}

/* Input field styles */
input[type="email"],
input[type="password"] {
  background-color: rgba(45, 55, 72, 0.8) !important;
  color: white !important;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border: 1px solid rgba(107, 114, 128, 0.5);
  font-weight: 400;
  letter-spacing: 0.025em;
  width: 100% !important;
  box-sizing: border-box;
  height: 48px !important;
  padding: 0.75rem 1rem;
  font-size: 1rem;
}

input[type="email"]:focus,
input[type="password"]:focus {
  background-color: rgba(45, 55, 72, 0.9) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(45, 212, 191, 0.15);
  border-color: #2dd4bf;
}

input[type="email"]::placeholder,
input[type="password"]::placeholder {
  color: #9ca3af !important;
  opacity: 0.8;
}

/* Text visibility improvements */
label {
  color: #e5e7eb !important;
  font-weight: 500;
}

.text-gray-300 {
  color: #d1d5db !important;
}

.text-gray-200 {
  color: #e5e7eb !important;
}

.text-gray-400 {
  color: #9ca3af !important;
}

/* Button styles */
button[type="submit"] {
  background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%);
  box-shadow: 0 4px 15px rgba(45, 212, 191, 0.3);
  transition: all 0.3s ease;
  height: 48px !important;
  padding: 0 1rem;
  border: none;
  font-size: 1rem;
  font-weight: 700;
}

button[type="submit"]:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(45, 212, 191, 0.4);
}

button[type="submit"]:active:not(:disabled) {
  transform: translateY(0);
}

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Error message animation */
.error-message {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

/* Success/Error input states */
.border-green-500 {
  border-color: #10b981 !important;
  box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.3);
}

.border-red-500 {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.3);
}

/* Enhanced input container */
.input-container {
  width: 100%;
  position: relative;
}

.input-container input,
button[type="submit"] {
  width: 100%;
  box-sizing: border-box;
}

/* Error and success text visibility */
.text-red-400 {
  color: #f87171 !important;
  font-weight: 500;
}

.text-green-300 {
  color: #86efac !important;
  font-weight: 500;
}

.text-green-400 {
  color: #4ade80 !important;
  font-weight: 500;
}

.text-yellow-400 {
  color: #facc15 !important;
  font-weight: 500;
}

/* Password strength indicator */
.password-strength-bar {
  height: 4px;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.password-strength-text {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Remember me checkbox */
input[type="checkbox"] {
  background-color: #374151 !important;
  border-color: #6b7280 !important;
  width: 1rem;
  height: 1rem;
  accent-color: #2dd4bf;
}

input[type="checkbox"]:checked {
  background-color: #2dd4bf !important;
  border-color: #2dd4bf !important;
}

/* Link styling */
a {
  color: #2dd4bf !important;
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: #5eead4 !important;
  text-decoration: underline;
}

/* Password visibility toggle */
.password-toggle {
  transition: all 0.2s ease;
  border-radius: 0 0.5rem 0.5rem 0;
  margin: 1px;
  height: calc(100% - 2px);
}

.password-toggle:hover {
  color: #2dd4bf !important;
  background-color: rgba(45, 212, 191, 0.1) !important;
}

.password-toggle:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(45, 212, 191, 0.3);
}

/* Form animation */
form {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logo animation */
.logo-container {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Form layout improvements */
.form-container {
  max-width: 420px;
  width: 100%;
}

.input-field {
  height: 48px;
}

/* Ensure all form elements have consistent width */
.form-element {
  width: 100%;
  box-sizing: border-box;
}

/* Input containers */
.input-container {
  width: 100%;
  position: relative;
}

.input-container input,
button[type="submit"] {
  width: 100%;
  box-sizing: border-box;
  height: 48px;
}

/* Ensure consistent form element sizing */
.form-element {
  width: 100% !important;
  box-sizing: border-box !important;
  height: 48px !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-container {
    max-width: 100%;
    padding: 0 1rem;
  }

  .w-7\/12 {
    width: 100%;
  }

  section:last-child {
    display: none;
  }
}

/* Focus states */
input:focus-visible {
  outline: 2px solid #2dd4bf;
  outline-offset: 2px;
}

/* Better button styling */
button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

/* Error message styling */
.error-message {
  border-left: 4px solid #ef4444;
  background: linear-gradient(
    90deg,
    rgba(239, 68, 68, 0.1) 0%,
    rgba(239, 68, 68, 0.05) 100%
  );
  animation: shake 0.5s ease-in-out;
}

/* Success message styling */
.success-message {
  border-left: 4px solid #10b981;
  background: linear-gradient(
    90deg,
    rgba(16, 185, 129, 0.1) 0%,
    rgba(16, 185, 129, 0.05) 100%
  );
  animation: fadeInUp 0.5s ease-in-out;
}

/* Right side image container */
.image-container {
  position: relative;
  overflow: hidden;
}

.image-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(45, 212, 191, 0.1) 0%,
    rgba(20, 184, 166, 0.1) 100%
  );
  z-index: 1;
}

.image-container img {
  transition: transform 0.3s ease;
}

.image-container:hover img {
  transform: scale(1.05);
}
</style>
