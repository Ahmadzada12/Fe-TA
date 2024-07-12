<template>
  <section
    class="w-[1286px] flex flex-row items-start justify-start pt-0 px-6 pb-[76px] box-border max-w-full text-left text-31xl text-gray-1100 font-montserrat mq1050:pb-[49px] mq1050:box-border mq750:pb-8 mq750:box-border"
  >
    <div
      class="flex-1 flex flex-col items-start justify-start gap-[78px] max-w-full mq450:gap-[19px] mq750:gap-[39px]"
    >
      <div
        class="w-[1028px] flex flex-row items-start justify-start pt-0 px-[23px] pb-1.5 box-border max-w-full"
      >
        <h1
          class="m-0 flex-1 relative text-inherit font-bold font-inherit inline-block max-w-full mq450:text-11xl mq1050:text-21xl"
        >
          Mau berbuat baik apa hari ini?
        </h1>
      </div>
      <div
        class="w-[1225px] flex flex-col items-start justify-start gap-[52px] max-w-full text-xl text-black font-nunito mq750:gap-[26px]"
      >
        <div
          class="w-[460px] flex flex-row items-start justify-start py-0 px-[45px] box-border max-w-full mq450:pl-[22px] mq450:pr-[22px] mq450:box-border"
        >
          <div
            class="flex-1 flex flex-col items-start justify-start gap-[7px] max-w-full"
          >
            <div
              class="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border max-w-full"
            >
              <div
                class="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap"
              >
                <img
                  class="self-stretch w-[148px] relative max-h-full object-cover min-h-[118px] cursor-pointer"
                  loading="lazy"
                  alt=""
                  src="/clipped-image-20240515-230125-1@2x.png"
                  @click="onClippedImage20240515230125Click"
                />
                <img
                  class="self-stretch w-[148px] relative max-h-full object-cover min-h-[118px] cursor-pointer"
                  alt=""
                  src="/clipped-image-20240515-230125-1-1@2x.png"
                  @click="onClippedImage202405152301251Click"
                />
              </div>
            </div>
            <div
              class="w-[324px] flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap"
            >
              <b class="relative font-bold mq450:text-base">Program Donasi</b>
              <div
                class="flex flex-col items-start justify-start pt-px px-0 pb-0"
              >
                <b
                  class="relative font-bold inline-block min-w-[57px] mq450:text-base"
                  >Berita</b
                >
              </div>
            </div>
          </div>
        </div>
        
       
      </div>
      <div
        class="self-stretch h-0.5 flex flex-row items-start justify-end max-w-full"
      >
        <div
          class="self-stretch w-[1188px] relative bg-whitesmoke-500 max-w-full"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import OverlayShadow from "./overlay-shadow.vue";

  export default defineComponent({
    name: "FrameComponent",
    components: { OverlayShadow },
    methods: {
      onLinkContainerClick() {
        this.$router.push("/donasi1");
      },
      onLinkContainer2Click() {
        this.$router.push("/donasi1");
      },
      onClippedImage20240515230125Click() {
        this.$router.push("/donasi");
      },
      onClippedImage202405152301251Click() {
        this.$router.push("/berita");
      },
      onLinkClick() {
        this.$router.push("/donasi1");
      },
      onLink1Click() {
        this.$router.push("/donasi1");
      },
    },
  });
</script>
