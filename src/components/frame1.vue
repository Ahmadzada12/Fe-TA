<template>
  <div
    class="w-[1184.6px] flex flex-row items-start justify-between pt-0 pb-[19.1px] pr-5 pl-0 box-border max-w-full gap-[20px] mq1050:flex-wrap"
  >
    <div
      class="w-[478.6px] flex flex-row items-start justify-start gap-[25.7px] min-w-[478.6px] max-w-full mq750:min-w-full mq450:flex-wrap mq1050:flex-1"
    >
      <div
        class="flex flex-col items-start justify-start pt-[18.3px] px-0 pb-0"
      >
        <img
          class="w-[77.2px] h-[77.2px] relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/frame-3.svg"
        />
      </div>
      <ItemInfoContainer
        prop="$129,312.76"
        supporters="2539 supporters"
        propAlignSelf="unset"
        propFlex="1"
        propMinWidth="177px"
        propWidth="157px"
        propPadding="0px 0px 1.1px"
        propWidth1="235.5px"
        propWidth2="148px"
        :rectangle="true"
      />
      <div class="h-[123.5px] w-[77.2px] relative">
        <div class="absolute top-[0px] left-[0px] w-full h-full hidden z-[9]" />
        <div
          class="absolute top-[19.3px] left-[0px] w-[77.2px] h-[77.2px] hidden z-[10]"
        />
      </div>
    </div>
    <SupportersPagination
      donationTable="$85,384.42"
      supporters="20 supporters"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import ItemInfoContainer from "./item-info-container.vue";
  import SupportersPagination from "./supporters-pagination.vue";

  export default defineComponent({
    name: "Frame1",
    components: { ItemInfoContainer, SupportersPagination },
  });
</script>
