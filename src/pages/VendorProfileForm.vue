<template>
  <form @submit.prevent="updateVendorData" class="bg-white rounded-md shadow-md flex flex-col md:flex-row p-6 m-6">
    <div class="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
      <!-- Input Nama Perusahaan -->
      <div class="mb-4">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-600">Nama Perusahaan:</label>
        <input type="text" id="name" name="name" v-model="vendorDetail.name"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- Input Email Perusahaan -->
      <div class="mb-4">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-600">Email Perusahaan:</label>
        <input type="text" id="email" name="email" v-model="vendorDetail.email"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- Input Alamat Perusahaan -->
      <div class="mb-4">
        <label for="alamat" class="block mb-2 text-sm font-medium text-gray-600">Alamat Perusahaan:</label>
        <textarea id="alamat" name="alamat" v-model="vendorDetail.master.alamat" rows="6"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
      </div>

      <!-- Input Nomor Telepon Perusahaan -->
      <div class="mb-4">
        <label for="telp" class="block mb-2 text-sm font-medium text-gray-600">Nomor Telepon Perusahaan:</label>
        <input type="text" id="telp" name="telp" v-model="vendorDetail.telp"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- Input Website Perusahaan -->
      <div class="mb-4">
        <label for="website" class="block mb-2 text-sm font-medium text-gray-600">Website Perusahaan:</label>
        <input type="text" id="website" name="website" v-model="vendorDetail.master.website"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
    </div>

    <!-- Bagian kanan dengan input dropdown -->
    <div class="flex-1 pl-0 md:pl-4">

      <!-- Input Bidang Usaha -->
      <div class="mb-4">
        <label for="bidang_usaha" class="block mb-2 text-sm font-medium text-gray-600">Bidang Usaha:</label>
        <input type="text" id="bidang_usaha" name="bidang_usaha" v-model="vendorDetail.master.bidang_usaha"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- Input Tahun Berdiri -->
      <div class="mb-4">
        <label for="tanggal_berdiri" class="block mb-2 text-sm font-medium text-gray-600">Tahun Berdiri:</label>
        <input type="date" id="tanggal_berdiri" name="tanggal_berdiri" v-model="vendorDetail.master.tanggal_berdiri"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- Input Bank -->
      <div class="mb-4">
        <label for="npwp" class="block mb-2 text-sm font-medium text-gray-600">Bank:</label>
        <input type="text" id="npwp" name="npwp" v-model="vendorDetail.master.bank"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- Input Rekening -->
      <div class="mb-4">
        <label for="npwp" class="block mb-2 text-sm font-medium text-gray-600">No Rekening:</label>
        <input type="text" id="npwp" name="npwp" v-model="vendorDetail.master.rekening"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- Input NPWP -->
      <div class="mb-4">
        <label for="npwp" class="block mb-2 text-sm font-medium text-gray-600">NPWP:</label>
        <input type="text" id="npwp" name="npwp" v-model="vendorDetail.master.npwp"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- Input SIUP -->
      <div class="mb-4">
        <label for="siup" class="block mb-2 text-sm font-medium text-gray-600">SIUP:</label>
        <input type="file" id="siup" name="siup" accept=".pdf,.doc,.docx" @change="handleFileUpload"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <div class="flex justify-end mt-4">
          <button type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2"; // Pastikan Anda telah mengimpor SweetAlert
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "VendorDetail",
  data() {
    return {
      vendorDetail: {
        name: "",
        telp: "",
        email: "",
        master: {
          alamat: "",
          website: "",
          bank: "",
          rekening: "",
          bidang_usaha: "",
          tanggal_berdiri: "",
          npwp: "",
          siup: "",
        },
      },
      token: localStorage.getItem("token"), // Mengambil token dari local storage
    };
  },

  methods: {
    async fetchVendorData() {
      try {
        const response = await axios.get(`${apiBaseUrl}vendor/profile`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.status === 200) {
          this.vendorDetail = response.data.user;
        } else {
          console.error("Failed to fetch vendor data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      this.vendorDetail.master.siup = file;
    },

    async updateVendorData() {
      try {
        const formData = new FormData();
        formData.append("name", this.vendorDetail.name);
        formData.append("telp", this.vendorDetail.telp);
        formData.append("email", this.vendorDetail.email);
        formData.append("vendor_alamat", this.vendorDetail.master.alamat);
        formData.append("vendor_website", this.vendorDetail.master.website);
        formData.append("vendor_bank", this.vendorDetail.master.bank);
        formData.append("vendor_rekening", this.vendorDetail.master.rekening);


        formData.append(
          "vendor_bidang_usaha",
          this.vendorDetail.master.bidang_usaha
        );
        formData.append(
          "vendor_tanggal_berdiri",
          this.vendorDetail.master.tanggal_berdiri
        );
        formData.append("vendor_npwp", this.vendorDetail.master.npwp);
        formData.append("siup", this.vendorDetail.master.siup);

        const response = await axios.post(
          `${apiBaseUrl}vendor/profile`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          console.log("Vendor data updated successfully");

          // Tampilkan Swal success setelah berhasil memperbarui profil vendor
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Vendor profile has been updated successfully!",
            confirmButtonText: "OK",
          }).then(() => {
            location.reload();
          });
        } else {
          console.error("Failed to update vendor data:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating vendor data:", error);
      }
    },
  },

  mounted() {
    // Memanggil fetchVendorData saat komponen dimount
    this.fetchVendorData();
  },
};
</script>

<style scoped></style>
