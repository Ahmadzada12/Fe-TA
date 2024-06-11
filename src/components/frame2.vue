<template>
  <div
    class="self-stretch flex flex-row items-start justify-start pt-0 pb-[16.1px] pr-3 pl-0 box-border gap-[25.7px] max-w-full text-left text-4xl-2 text-gray-500 font-roboto mq1225:flex-wrap"
  >
    <div class="flex flex-col items-start justify-start pt-[1.7px] px-0 pb-0">
      <div
        class="flex flex-row items-start justify-start pt-[19.3px] px-0 pb-0 relative shrink-0 [debug_commit:bf4bc93]"
      >
        <div
          class="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] z-[6]"
        />
        <div class="flex flex-row items-start justify-start relative">
          <div
            class="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px]"
          >
            <div
              class="absolute h-full w-full top-[0px] right-[0px] bottom-[0px] left-[0px] z-[7]"
            />
            <div
              class="absolute h-full w-full top-[0px] right-[0px] bottom-[0px] left-[0px] z-[8]"
            />
          </div>
          <img
            class="h-[77.2px] w-[77.2px] relative overflow-hidden shrink-0 [debug_commit:bf4bc93] z-[9]"
            loading="lazy"
            alt=""
            src="/frame-2.svg"
          />
        </div>
      </div>
    </div>
    <div
      class="w-[1165.1px] flex flex-col items-start justify-start gap-[18.8px] shrink-0 [debug_commit:bf4bc93] max-w-full"
    >
      <div class="self-stretch h-1 relative bg-whitesmoke-200 z-[4]" />
      <div
        class="w-[1081.7px] flex flex-row items-start justify-between py-0 pr-5 pl-0 box-border max-w-full gap-[20px] mq1050:flex-wrap"
      >
        <div
          class="w-[375.7px] flex flex-row items-start justify-start gap-[25.7px] min-w-[375.7px] max-w-full mq750:min-w-full mq450:flex-wrap mq1050:flex-1"
        >
          <ItemInfoContainer
            prop="$132,477.57"
            supporters="217 supporters"
            propAlignSelf="unset"
            propFlex="1"
            propMinWidth="177px"
            propWidth="144.1px"
            propPadding="0px 0px 1.2px"
            propWidth1="223.9px"
            propWidth2="136.4px"
            :rectangle="false"
          />
          <div class="h-[123.5px] w-[77.2px] relative">
            <div class="absolute top-[0px] left-[0px] w-full h-full z-[7]" />
            <div
              class="absolute top-[19.3px] left-[0px] w-[77.2px] h-[77.2px] z-[8]"
            />
          </div>
        </div>
        <div
          class="w-[478.6px] flex flex-row items-start justify-start gap-[25.7px] min-w-[478.6px] max-w-full mq750:min-w-full mq450:flex-wrap mq1050:flex-1"
        >
          <div
            class="flex flex-col items-start justify-start pt-[15px] px-0 pb-0"
          >
            <img
              class="w-[77.2px] h-[77.2px] relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/frame-5.svg"
            />
          </div>
          <div
            class="flex-1 flex flex-col items-start justify-start gap-[15.3px] min-w-[244px] max-w-full"
          >
            <div class="self-stretch h-[31px] relative">
              <div
                class="absolute top-[0.1px] left-[0px] w-full h-full hidden"
              />
              <div
                class="absolute top-[1.4px] left-[0px] w-[104.2px] h-[27px] z-[1]"
              />
              <div
                class="absolute top-[0px] left-[0.1px] leading-[31px] inline-block w-[136px] z-[2] mq450:text-lgi mq450:leading-[25px]"
              >
                lorem ipsum
              </div>
            </div>
            <div
              class="relative text-8xl leading-[31px] text-lightseagreen-200 whitespace-nowrap mq450:text-3xl mq450:leading-[25px]"
            >
              $32,384.42
            </div>
            <div
              class="w-[239.1px] flex flex-row items-start justify-start text-xl-6"
            >
              <div
                class="relative leading-[31px] inline-block min-w-[87.5px] shrink-0 [debug_commit:bf4bc93] z-[1] mq450:text-base mq450:leading-[25px]"
              >
                raised by
              </div>
              <div
                class="flex-1 flex flex-col items-start justify-start py-0 px-0 text-lgi-3"
              >
                <div
                  class="ml-[-0.4px] self-stretch relative leading-[31px] shrink-0 [debug_commit:bf4bc93] z-[2]"
                >
                  775 supporters
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="self-stretch h-1 relative bg-whitesmoke-200" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import ItemInfoContainer from "./item-info-container.vue";

  export default defineComponent({
    name: "Frame2",
    components: { ItemInfoContainer },
  });
</script>
