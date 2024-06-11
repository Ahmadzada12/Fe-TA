<template>
  <div
    class="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start gap-[18px] leading-[normal] tracking-[normal]"
  >
    <div
      class="self-stretch bg-gray-400 flex flex-row items-start justify-end pt-[17px] px-[104px] pb-[18px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border"
    >
      <img
        class="h-[50px] w-[1350px] relative hidden max-w-full"
        alt=""
        src="/vector.svg"
      />
      <div class="h-[15px] w-[181.9px] relative">
        <img
          class="absolute top-[0px] left-[0px] w-full h-full object-cover z-[1]"
          alt=""
          src="/--------------1@2x.png"
        />
        <img
          class="absolute top-[0px] left-[0px] w-full h-full object-cover z-[2]"
          loading="lazy"
          alt=""
          src="/--------------@2x.png"
        />
      </div>
    </div>
    <content />
    <section
      class="self-stretch flex flex-col items-end justify-start pt-0 px-0 pb-[64.8px] box-border gap-[61px] max-w-full text-left text-[34.7px] text-gray-500 font-roboto mq750:gap-[30px] mq750:pb-[27px] mq750:box-border mq450:gap-[15px] mq1225:pb-[42px] mq1225:box-border"
    >
      <GroupComponent3 />
      <div
        class="mr-[-12px] w-[1288px] flex flex-col items-start justify-start py-0 pr-0 pl-5 box-border max-w-full"
      >
        <div
          class="w-[478.6px] flex flex-row items-start justify-start pt-0 pb-[14.8px] px-0 box-border relative max-w-full"
        >
          <div
            class="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px]"
          />
          <div
            class="flex-1 flex flex-row items-start justify-start relative gap-[204.6px] shrink-0 [debug_commit:bf4bc93] max-w-full"
          >
            <div
              class="h-full w-full absolute !m-[0] top-[0px] left-[0px] z-[1]"
            />
            <div
              class="w-[184px] relative leading-[47px] inline-block shrink-0 z-[2] mq750:text-[28px] mq750:leading-[37px] mq450:text-[21px] mq450:leading-[28px]"
            >
              Supporters
            </div>
            <div class="h-[46.3px] w-[90.1px] relative hidden z-[2]" />
          </div>
        </div>
        <SupportersGrid />
        <div
          class="self-stretch h-[21.1px] flex flex-row items-start justify-end pt-0 px-0 pb-[17.1px] box-border max-w-full"
        >
          <div
            class="self-stretch w-[1165px] relative bg-whitesmoke-200 max-w-full z-[4]"
          />
        </div>
        <Frame3 /><Frame2 /><Frame1 />
        <div
          class="self-stretch h-[17.7px] flex flex-row items-start justify-end pt-0 px-0 pb-[13.7px] box-border max-w-full"
        >
          <div
            class="self-stretch w-[1165px] relative bg-whitesmoke-200 max-w-full"
          />
        </div>
        <div
          class="w-[1184.6px] flex flex-row items-end justify-between py-0 pr-5 pl-0 box-border max-w-full gap-[20px] mq1050:flex-wrap"
        >
          <Frame4
            donationTable="/frame-3.svg"
            donationTable1="$93,384.42"
            supporters="14 supporters"
            propDebugCommit="unset"
            propDebugCommit1="unset"
            :showDonationTable="false"
          /><Frame4
            donationTable="/frame-5.svg"
            donationTable1="$10,384.42"
            supporters="50 supporters"
            propDebugCommit="unset"
            propDebugCommit1="unset"
            :showDonationTable="true"
          />
        </div>
      </div>
    </section>
    <div class="w-[478.6px] h-[177.6px] relative hidden max-w-full z-[3]" />
    <div class="w-[375.7px] h-[177.6px] relative hidden max-w-full z-[4]" />
    <div class="w-[478.6px] h-[163.4px] relative hidden max-w-full z-[5]" />
    <div class="w-[77.2px] h-[96.5px] relative hidden z-[6]" />
    <div class="w-[375.7px] h-[163.4px] relative hidden max-w-full z-[7]" />
    <div class="w-[478.6px] h-[163.4px] relative hidden max-w-full z-[8]" />
    <div class="w-[375.7px] h-[163.4px] relative hidden max-w-full z-[9]" />
    <div class="w-[478.6px] h-[163.4px] relative hidden max-w-full z-[10]" />
    <div class="w-[77.2px] h-[96.5px] relative hidden z-[11]" />
    <div class="w-[77.2px] h-[77.2px] relative hidden z-[12]" />
    <div class="w-[375.7px] h-[163.4px] relative hidden max-w-full z-[13]" />
    <div class="w-[77.2px] h-[96.5px] relative hidden z-[14]" />
    <div class="w-[77.2px] h-[96.5px] relative hidden z-[15]" />
    <div class="w-[77.2px] h-[96.5px] relative hidden z-[16]" />
    <div class="w-[77.2px] h-[96.5px] relative hidden z-[17]" />
    <div class="w-[77.2px] h-[96.5px] relative hidden z-[18]" />
    <div class="w-[77.2px] h-[96.5px] relative hidden z-[19]" />
    <div class="w-[77.2px] h-[77.2px] relative hidden z-[20]" />
    <div class="w-[77.2px] h-[77.2px] relative hidden z-[21]" />
    <div class="w-[77.2px] h-[77.2px] relative hidden z-[22]" />
    <div class="w-[77.2px] h-[77.2px] relative hidden z-[23]" />
    <div class="w-[77.2px] h-[77.2px] relative hidden z-[24]" />
    <div class="w-[77.2px] h-[77.2px] relative hidden z-[25]" />
    <div
      class="w-[124.8px] h-[24.4px] absolute !m-[0] right-[254.8px] bottom-[728.8px] hidden"
    />
    <GroupComponent2 />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import Content from "../components/content.vue";
  import GroupComponent3 from "../components/group-component3.vue";
  import SupportersGrid from "../components/supporters-grid.vue";
  import Frame3 from "../components/frame3.vue";
  import Frame2 from "../components/frame2.vue";
  import Frame1 from "../components/frame1.vue";
  import Frame4 from "../components/frame4.vue";
  import GroupComponent2 from "../components/group-component2.vue";

  export default defineComponent({
    name: "Donasi1",
    components: {
      Content,
      GroupComponent3,
      SupportersGrid,
      Frame3,
      Frame2,
      Frame1,
      Frame4,
      GroupComponent2,
    },
  });
</script>
