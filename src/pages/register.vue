<template>
  <main class="flex h-screen bg-foreground-primary text-white overflow-hidden">
    <!-- Kolom Kiri: Form Register (Mengambil 58% lebar layar) -->
    <section
      class="w-7/12 flex flex-col h-full overflow-y-auto custom-scrollbar"
    >
      <div
        class="flex-1 flex flex-col justify-center items-center p-12 min-h-full"
      >
        <div class="w-full max-w-md space-y-6">
          <!-- Logo Section -->
          <div class="flex items-center justify-center mb-8 logo-container">
            <img src="/Logo_UNS.png" alt="UNS Logo" class="w-12 h-12" />
            <div class="ml-3">
              <h2 class="text-xl font-bold logo-title">UNS</h2>
              <p class="text-xs logo-subtitle">Donation Platform</p>
            </div>
          </div>
          <div class="mb-8 text-center">
            <h1 class="text-3xl font-bold font-poppins text-white mb-2">
              Selamat Datang 👋
            </h1>
            <p class="text-gray-300">
              Buat akun baru untuk bergabung dengan kami
            </p>
          </div>
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <!-- Username Field -->
            <div class="space-y-2">
              <label
                for="username"
                class="block text-sm font-medium text-gray-200"
              >
                Nama Pengguna
              </label>
              <div class="relative input-container">
                <input
                  v-model="formData.username"
                  id="username"
                  type="text"
                  autocomplete="username"
                  placeholder="Masukkan nama pengguna Anda"
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 form-element"
                  :class="{
                    'border-red-500 focus:ring-red-500 focus:border-red-500':
                      errors.username,
                    'border-green-500 focus:ring-green-500 focus:border-green-500':
                      !errors.username &&
                      formData.username &&
                      formData.username.length >= 3,
                  }"
                  @blur="validateUsername"
                  @input="validateUsernameRealtime"
                  required
                />
              </div>
              <p v-if="errors.username" class="text-red-400 text-sm mt-1">
                {{ errors.username }}
              </p>
            </div>

            <!-- Full Name Field -->
            <div class="space-y-2">
              <label
                for="fullname"
                class="block text-sm font-medium text-gray-200"
              >
                Nama Lengkap
              </label>
              <div class="relative input-container">
                <input
                  v-model="formData.fullname"
                  id="fullname"
                  type="text"
                  autocomplete="name"
                  placeholder="Masukkan nama lengkap Anda"
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 form-element"
                  :class="{
                    'border-red-500 focus:ring-red-500 focus:border-red-500':
                      errors.fullname,
                    'border-green-500 focus:ring-green-500 focus:border-green-500':
                      !errors.fullname &&
                      formData.fullname &&
                      formData.fullname.length >= 2,
                  }"
                  @blur="validateFullname"
                  @input="validateFullnameRealtime"
                  required
                />
              </div>
              <p v-if="errors.fullname" class="text-red-400 text-sm mt-1">
                {{ errors.fullname }}
              </p>
            </div>

            <!-- Email Field -->
            <div class="space-y-2">
              <label
                for="email"
                class="block text-sm font-medium text-gray-200"
              >
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
                  autocomplete="new-password"
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

            <!-- Phone Field -->
            <div class="space-y-2">
              <label
                for="phone"
                class="block text-sm font-medium text-gray-200"
              >
                Nomor Telepon
              </label>
              <div class="relative input-container">
                <input
                  v-model="formData.phone"
                  id="phone"
                  type="tel"
                  autocomplete="tel"
                  placeholder="Masukkan nomor telepon Anda"
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 form-element"
                  :class="{
                    'border-red-500 focus:ring-red-500 focus:border-red-500':
                      errors.phone,
                    'border-green-500 focus:ring-green-500 focus:border-green-500':
                      !errors.phone &&
                      formData.phone &&
                      formData.phone.length >= 10,
                  }"
                  @blur="validatePhone"
                  @input="validatePhoneRealtime"
                  required
                />
              </div>
              <p v-if="errors.phone" class="text-red-400 text-sm mt-1">
                {{ errors.phone }}
              </p>
            </div>

            <!-- Address Field -->
            <div class="space-y-2">
              <label
                for="alamat"
                class="block text-sm font-medium text-gray-200"
              >
                Alamat
              </label>
              <div class="relative input-container">
                <textarea
                  v-model="formData.alamat"
                  id="alamat"
                  rows="3"
                  placeholder="Masukkan alamat lengkap Anda"
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none"
                  :class="{
                    'border-red-500 focus:ring-red-500 focus:border-red-500':
                      errors.alamat,
                    'border-green-500 focus:ring-green-500 focus:border-green-500':
                      !errors.alamat &&
                      formData.alamat &&
                      formData.alamat.length >= 10,
                  }"
                  @blur="validateAlamat"
                  @input="validateAlamatRealtime"
                  required
                ></textarea>
              </div>
              <p v-if="errors.alamat" class="text-red-400 text-sm mt-1">
                {{ errors.alamat }}
              </p>
            </div>

            <!-- Error Message -->
            <div
              v-if="errorMessage"
              class="w-full p-3 my-2 text-sm text-center text-red-300 bg-red-500 bg-opacity-20 rounded-lg error-message"
            >
              {{ errorMessage }}
            </div>

            <!-- Success Message -->
            <div
              v-if="successMessage"
              class="w-full p-3 my-2 text-sm text-center text-green-300 bg-green-500 bg-opacity-20 rounded-lg success-message"
            >
              {{ successMessage }}
            </div>

            <!-- Submit Button -->
            <div class="w-full flex justify-center pt-4">
              <button
                type="submit"
                class="w-full cursor-pointer bg-primary text-white font-bold rounded-lg transition-transform transform hover:scale-105 flex justify-center items-center form-element"
                :disabled="isLoading"
                :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
              >
                <span v-if="!isLoading">Daftar</span>
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
                  <span>Sedang mendaftar...</span>
                </div>
              </button>
            </div>

            <div class="w-full flex items-center justify-center py-4">
              <hr class="border-t border-gray-600 flex-grow" />
              <span class="px-4 text-gray-400">ATAU</span>
              <hr class="border-t border-gray-600 flex-grow" />
            </div>

            <div
              class="w-full text-center cursor-pointer text-primary hover:underline"
              @click="onLoginClick"
            >
              Sudah punya akun? Masuk
            </div>
          </form>
        </div>
      </div>
    </section>
    <!-- Kolom Kanan: Gambar (Mengambil 42% lebar layar) -->
    <section
      class="w-5/12 flex items-center justify-center bg-gray-900 h-screen overflow-hidden"
    >
      <div
        class="w-[90%] h-[80%] rounded-2xl overflow-hidden image-container shadow-2xl"
      >
        <img
          class="w-full h-full object-cover"
          src="/register.png"
          alt="Registration page image"
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
  username: "",
  fullname: "",
  email: "",
  password: "",
  phone: "",
  alamat: "",
});

// Error tracking
const errors = reactive({
  username: "",
  fullname: "",
  email: "",
  password: "",
  phone: "",
  alamat: "",
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

// Phone validation function
const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
};

// Validation functions
const validateUsername = () => {
  if (!formData.username) {
    errors.username = "Nama pengguna wajib diisi";
    return false;
  }
  if (formData.username.length < 3) {
    errors.username = "Nama pengguna minimal 3 karakter";
    return false;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
    errors.username =
      "Nama pengguna hanya boleh mengandung huruf, angka, dan underscore";
    return false;
  }
  errors.username = "";
  return true;
};

const validateFullname = () => {
  if (!formData.fullname) {
    errors.fullname = "Nama lengkap wajib diisi";
    return false;
  }
  if (formData.fullname.length < 2) {
    errors.fullname = "Nama lengkap minimal 2 karakter";
    return false;
  }
  errors.fullname = "";
  return true;
};

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

const validatePhone = () => {
  if (!formData.phone) {
    errors.phone = "Nomor telepon wajib diisi";
    return false;
  }
  if (!isValidPhone(formData.phone)) {
    errors.phone = "Masukkan nomor telepon Indonesia yang valid";
    return false;
  }
  errors.phone = "";
  return true;
};

const validateAlamat = () => {
  if (!formData.alamat) {
    errors.alamat = "Alamat wajib diisi";
    return false;
  }
  if (formData.alamat.length < 10) {
    errors.alamat = "Alamat minimal 10 karakter";
    return false;
  }
  errors.alamat = "";
  return true;
};

// Real-time validation functions
const validateUsernameRealtime = () => {
  if (formData.username) {
    if (formData.username.length < 3) {
      errors.username = "Nama pengguna minimal 3 karakter";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = "Hanya boleh mengandung huruf, angka, dan underscore";
    } else {
      errors.username = "";
    }
  } else {
    errors.username = "";
  }
};

const validateFullnameRealtime = () => {
  if (formData.fullname && formData.fullname.length < 2) {
    errors.fullname = "Nama lengkap minimal 2 karakter";
  } else {
    errors.fullname = "";
  }
};

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

const validatePhoneRealtime = () => {
  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.phone = "Masukkan nomor telepon Indonesia yang valid";
  } else {
    errors.phone = "";
  }
};

const validateAlamatRealtime = () => {
  if (formData.alamat && formData.alamat.length < 10) {
    errors.alamat = "Alamat minimal 10 karakter";
  } else {
    errors.alamat = "";
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
  const isUsernameValid = validateUsername();
  const isFullnameValid = validateFullname();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isPhoneValid = validatePhone();
  const isAlamatValid = validateAlamat();

  if (
    !isUsernameValid ||
    !isFullnameValid ||
    !isEmailValid ||
    !isPasswordValid ||
    !isPhoneValid ||
    !isAlamatValid
  ) {
    return;
  }

  isLoading.value = true;

  try {
    console.log("Connecting to:", `${apiBaseUrl}auth/sign-up`);
    console.log("Payload:", {
      username: formData.username,
      fullname: formData.fullname,
      email: formData.email,
      password: "***",
      phone: formData.phone,
      alamat: formData.alamat,
      role: "User",
    });

    const response = await axios.post(`${apiBaseUrl}auth/sign-up`, {
      username: formData.username,
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      alamat: formData.alamat,
      role: "User",
    });

    console.log("Response received:", response.data);

    // Handle response from backend
    if (response.status === 201 || (response.data && response.data.message)) {
      successMessage.value =
        "Registrasi berhasil! Mengalihkan ke halaman login...";

      // Redirect to login page after showing success message
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      errorMessage.value = "Registrasi gagal: Respons tidak valid dari server.";
    }
  } catch (error: any) {
    console.error("Error during registration:", error);

    // Handle error response
    if (error.response?.data) {
      const errorData = error.response.data;
      if (errorData.message) {
        errorMessage.value = errorData.message;
      } else if (errorData.error) {
        errorMessage.value = errorData.error;
      } else {
        errorMessage.value = "Registrasi gagal: Terjadi kesalahan pada server.";
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

const onLoginClick = () => {
  router.push("/login");
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
input[type="text"],
input[type="email"],
input[type="password"],
input[type="tel"],
textarea {
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

textarea {
  height: auto !important;
  min-height: 80px;
  resize: none;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="tel"]:focus,
textarea:focus {
  background-color: rgba(45, 55, 72, 0.9) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(45, 212, 191, 0.15);
  border-color: #2dd4bf;
}

input::placeholder,
textarea::placeholder {
  color: #9ca3af !important;
  opacity: 0.8;
}

/* Text visibility improvements */
label {
  color: #f3f4f6 !important;
  font-weight: 600;
  font-size: 0.875rem;
}

.text-gray-300 {
  color: #e5e7eb !important;
  font-weight: 400;
}

.text-gray-200 {
  color: #f3f4f6 !important;
  font-weight: 500;
}

.text-gray-400 {
  color: #d1d5db !important;
  font-weight: 500 !important;
  opacity: 0.9;
}

/* Specific styling for logo text */
.text-gray-400.text-xs {
  color: #d1d5db !important;
  font-weight: 500 !important;
  opacity: 1 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Ensure all text elements are visible */
h1,
h2,
p,
span,
div {
  color: inherit;
}

/* Specific text color overrides */
.text-white {
  color: #ffffff !important;
}

/* Logo section styling */
.logo-container h2 {
  color: #ffffff !important;
  font-weight: 700 !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.logo-container p {
  color: #d1d5db !important;
  font-weight: 500 !important;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* More specific logo styling */
.logo-title {
  color: #ffffff !important;
  font-weight: 800 !important;
  font-size: 1.25rem !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
  letter-spacing: 0.05em !important;
}

.logo-subtitle {
  color: #f3f4f6 !important;
  font-weight: 600 !important;
  font-size: 0.75rem !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
  opacity: 1 !important;
  letter-spacing: 0.025em !important;
}

/* Header text visibility */
h1.font-poppins {
  color: #ffffff !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-weight: 700 !important;
}

/* Description text */
p.text-gray-300 {
  color: #e5e7eb !important;
  opacity: 0.9;
  font-weight: 400 !important;
}

/* Divider text styling */
.text-gray-400:not(.text-xs) {
  color: #d1d5db !important;
  font-weight: 500 !important;
  opacity: 0.8;
}

/* HR border styling */
.border-gray-600 {
  border-color: #6b7280 !important;
  opacity: 0.5;
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

button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
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
  border-left: 4px solid #ef4444;
  background: linear-gradient(
    90deg,
    rgba(239, 68, 68, 0.1) 0%,
    rgba(239, 68, 68, 0.05) 100%
  );
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
  font-size: 0.875rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.text-green-300 {
  color: #86efac !important;
  font-weight: 500;
  font-size: 0.875rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.text-green-400 {
  color: #4ade80 !important;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.text-yellow-400 {
  color: #facc15 !important;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.text-red-300 {
  color: #fca5a5 !important;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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

/* Link styling and primary text */
a,
.text-primary {
  color: #2dd4bf !important;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
}

a:hover,
.text-primary:hover {
  color: #5eead4 !important;
  text-decoration: underline;
}

/* Login link specific styling */
.cursor-pointer.text-primary {
  color: #2dd4bf !important;
  font-weight: 500;
  font-size: 0.875rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.cursor-pointer.text-primary:hover {
  color: #5eead4 !important;
  transform: translateY(-1px);
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
  padding: 0.25rem;
}

/* Ensure logo image is visible */
.logo-container img {
  filter: brightness(1.1) contrast(1.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Ensure all form elements have consistent width */
.form-element {
  width: 100% !important;
  box-sizing: border-box !important;
  height: 48px !important;
}

/* Focus states */
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid #2dd4bf;
  outline-offset: 2px;
}

/* Right side image container */
.image-container {
  position: relative;
  overflow: hidden;
  border: 3px solid rgba(45, 212, 191, 0.2);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 10px 10px -5px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(45, 212, 191, 0.1);
  transition: all 0.3s ease;
}

.image-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(45, 212, 191, 0.08) 0%,
    rgba(20, 184, 166, 0.05) 50%,
    rgba(6, 182, 212, 0.08) 100%
  );
  z-index: 1;
  transition: opacity 0.3s ease;
}

.image-container:hover::before {
  opacity: 0.7;
}

.image-container img {
  transition: transform 0.4s ease;
  filter: brightness(1.02) contrast(1.05) saturate(1.1);
}

.image-container:hover img {
  transform: scale(1.03);
}

.image-container:hover {
  border-color: rgba(45, 212, 191, 0.4);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(45, 212, 191, 0.1),
    0 0 20px rgba(45, 212, 191, 0.15);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .w-7\/12 {
    width: 100%;
  }

  section:last-child {
    display: none;
  }

  .p-12 {
    padding: 2rem;
  }
}

/* Scrollbar for section */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(45, 212, 191, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(45, 212, 191, 0.5);
  border-radius: 3px;
  transition: background-color 0.2s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(45, 212, 191, 0.7);
}

/* Remove form scrolling properties since section handles it now */
form {
  max-height: none;
  overflow-y: visible;
}
</style>
