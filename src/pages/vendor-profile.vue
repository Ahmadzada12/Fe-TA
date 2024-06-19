<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-center flex">
      <!-- <q-avatar size="100px">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="Avatar" />
      </q-avatar> -->
      <div class="q-pa-md">
        <div class="text-h4 text-primary">{{ vendorDetail.name }}</div>
        <div class="text-subtitle2 text-grey">{{ vendorDetail.email }}</div>
      </div>
    </div>
    <q-card class="q-mt-md shadow-2">
      <q-card-section class="row">
        <div class="col-6">
          <div class="text-h6 text-primary">Alamat</div>
          <div class="text-body1">
            {{ vendorDetail.master.alamat || "Alamat tidak tersedia" }}
          </div>
        </div>
        <div class="col-6">
          <div class="text-h6 text-primary">Telepon</div>
          <div class="text-body1">
            {{ vendorDetail.telp || "Telepon tidak tersedia" }}
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row">
        <div class="col-6">
          <div class="text-h6 text-primary">Website</div>
          <div class="text-body1">
            {{ vendorDetail.master.website || "Website tidak tersedia" }}
          </div>
        </div>
        <div class="col-6">
          <div class="text-h6 text-primary">Bidang Usaha</div>
          <div class="text-body1">
            {{
              vendorDetail.master.bidang_usaha || "Bidang usaha tidak tersedia"
            }}
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row">
        <div class="col-6">
          <div class="text-h6 text-primary">NPWP</div>
          <div class="text-body1">
            {{ vendorDetail.master.npwp || "NPWP tidak tersedia" }}
          </div>
        </div>
        <div class="col-6">
          <div class="text-h6 text-primary">Bank</div>
          <div class="text-body1">
            {{ vendorDetail.master.bank || "Bank tidak tersedia" }}
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row">
        <div class="col-6">
          <div class="text-h6 text-primary">SIUP</div>
          <div class="text-body1">
            {{ vendorDetail.master.siup || "SIUP tidak tersedia" }}
          </div>
        </div>
        <div class="col-6">
          <div class="text-h6 text-primary">Rekening</div>
          <div class="text-body1">
            {{ vendorDetail.master.rekening || "Rekening tidak tersedia" }}
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row">
        <div class="col-6">
          <div class="text-h6 text-primary">Tanggal Berdiri</div>
          <div class="text-body1">
            {{
              vendorDetail.master.tanggal_berdiri ||
              "Tahun berdiri tidak tersedia"
            }}
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-btn
      label="Edit Profile"
      color="primary"
      @click="toggleEditProfile"
      class="q-mt-md full-width"
      icon="edit"
    />
    <VendorProfile v-if="showEditProfile" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import dayjs from "dayjs";

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default defineComponent({
  name: "VendorProfilePage",
  components: {
    VendorProfile: defineAsyncComponent(
      () => import("src/components/vendor/VendorProfileForm.vue")
    ),
  },
  data() {
    return {
      vendorDetail: {
        name: "",
        email: "",
        telp: "",
        master: {
          alamat: "",
          website: "",
          bidang_usaha: "",
          tanggal_berdiri: "",
          npwp: "",
          siup: "",
          bank: "",
          rekening: "",
        },
      },
      showEditProfile: false,
      token: localStorage.getItem("token") || "",
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
    toggleEditProfile() {
      this.showEditProfile = !this.showEditProfile;
    },
    formatTanggal(date) {
      return dayjs(date).format("DD MMMM YYYY");
    },
  },
  mounted() {
    this.fetchVendorData();
  },
});
</script>

<style scoped>
.text-h4 {
  font-weight: bold;
}

.text-h6 {
  font-weight: bold;
}

.q-card-section {
  margin-bottom: 10px;
}

.q-avatar img {
  border-radius: 50%;
}
</style>
