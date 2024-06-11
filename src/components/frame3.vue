<template>
  <div
    class="w-[1184.6px] flex flex-row items-start justify-between pt-0 pb-[17.5px] pr-5 pl-0 box-border max-w-full gap-[20px] text-left text-4xl-2 text-gray-500 font-roboto mq1050:flex-wrap"
  >
    <div
      class="w-[478.6px] flex flex-col items-start justify-start pt-[2.1px] px-0 pb-0 box-border min-w-[478.6px] max-w-full mq750:min-w-full mq1050:flex-1"
    >
      <div
        class="self-stretch flex flex-row items-start justify-start gap-[25.7px] mq450:flex-wrap"
      >
        <div class="flex flex-row items-start justify-start relative">
          <div
            class="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px]"
          >
            <div
              class="absolute h-full w-full top-[0px] right-[0px] bottom-[0px] left-[0px] z-[5]"
            />
            <div
              class="absolute h-full w-full top-[0px] right-[0px] bottom-[0px] left-[0px] z-[6]"
            />
          </div>
          <img
            class="h-[77.2px] w-[77.2px] relative overflow-hidden shrink-0 [debug_commit:bf4bc93] z-[7]"
            loading="lazy"
            alt=""
            src="/frame-1.svg"
          />
        </div>
        <div
          class="flex-1 flex flex-col items-start justify-start pt-[1.3px] px-0 pb-0 box-border min-w-[177px]"
        >
          <ItemInfoContainer
            prop="£121,647.89"
            supporters="792 supporters"
            :rectangle="false"
          />
        </div>
        <div
          class="w-[77.2px] flex flex-col items-start justify-start pt-[1.3px] px-0 pb-0 box-border"
        >
          <div class="self-stretch h-[123.5px] relative">
            <div
              class="absolute top-[0px] left-[0px] w-full h-full hidden z-[6]"
            />
            <div
              class="absolute top-[19.3px] left-[0px] w-[77.2px] h-[77.2px] hidden z-[7]"
            />
          </div>
        </div>
      </div>
    </div>
    <Frame4
      donationTable="/frame-5.svg"
      donationTable1="$21,384.42"
      supporters="14 supporters"
      :showDonationTable="true"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import ItemInfoContainer from "./item-info-container.vue";
  import Frame4 from "./frame4.vue";

  export default defineComponent({
    name: "Frame3",
    components: { ItemInfoContainer, Frame4 },
  });
</script>
