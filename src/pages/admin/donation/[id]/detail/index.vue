<template>
  <div class="space-y-5">
    <div class="space-y-5">
      <n-h2> Donasi 1 </n-h2>
      <div class="space-y-4">
        <div class="flex flex-row items-center justify-end">
          <div class="mr-5">Rp.6.000.000/Rp.10.000.000</div>
          <n-button>Tarik Donation</n-button>
        </div>
        <n-progress
          type="line"
          :percentage="60"
          :indicator-placement="'inside'"
          processing
        />
      </div>
      <div class="w-1/2">
        <img
          class="w-full block"
          src="https://news.itsfoss.com/content/images/size/w1000/2024/06/GitButler_2.png"
        />
      </div>
      <div v-pre>
        Lorem ipsum dolor sit amet consectetur. Sem maecenas vel elit urna sed
        odio non. A arcu pharetra nullam vitae accumsan imperdiet. Euismod sed
        nunc imperdiet pretium enim. Id nisi at enim turpis. Eu neque tellus
        fermentum massa nisl vivamus blandit feugiat. Nec et faucibus
        sollicitudin eget nunc ornare felis. Cursus facilisis sit in magna
        blandit aliquet. Risus vitae commodo nulla neque odio. Amet elit
        ullamcorper ut ornare integer. Mi quis morbi elit pretium consectetur
        commodo phasellus proin. Tristique facilisi sed felis leo viverra mollis
        luctus consectetur mattis. Ut adipiscing quis non amet tellus. Rutrum
        leo in consequat donec lectus fermentum velit. Eget neque molestie at
        tellus. Euismod ut et in dolor etiam imperdiet diam. Sit tincidunt nulla
        ut sit nibh enim condimentum. Neque nam sed fermentum vitae. Sed et urna
        sodales ut lacus. Lobortis a ac venenatis platea risus mollis. In vitae
        eu non venenatis. Eros blandit amet hendrerit lorem volutpat eget turpis
        varius. Volutpat egestas proin rhoncus tempor maecenas ultrices nunc at
        sed. Est integer sed id justo. Suspendisse eget feugiat diam ac sit
        viverra aliquam cras vel. Mi diam aenean lorem arcu. Tellus.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      value: 50,
    };
  },
  data() {
    return {
      value: 50,
    };
  },
});
</script>
