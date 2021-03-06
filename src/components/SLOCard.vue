<!--
Copyright 2021 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0
           
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
<template>
  <div class="pt-5 pb-5 pr-10 whitespace-pre" v-bind="$attrs">

    <!-- Error budget burn rate -->
    <div class="col-auto">
    <Gauge
      title="BURN RATE"
      :value="burn_rate"
      :target="burn_rate_threshold"
      :change="fmtFloat(burn_rate_threshold - burn_rate, 2)"
      :showTarget="true"
      :showChange="false"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-4 w-4 mr-1"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
        />
      </svg>
    </Gauge>
    </div>

    <!-- SLI -->
    <div class="col-auto">
      <Gauge
        title="SLI"
        :value="fmtFloat(sli * 100, 2)"
        :target="slo * 100"
        :change="fmtFloat(gap * 100, 2)"
        :showChange="false"
        :showTarget="true"
        unit="%"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-4 w-4 mr-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </Gauge>

      <!-- Good / Bad events -->
      <div class="flex text-xs">
        <span class="flex flex-items-center text-green-400">
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          {{ fmtAmount(good_events) }}
        </span>
        <span class="px-2 flex flex-items-center text-red-500">
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
            />
          </svg>
          {{ fmtAmount(bad_events) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Gauge from "./Gauge.vue";
import { defineComponent } from "vue";
import { fmtMixin } from "../hooks/shared";
export default defineComponent({
  props: {
    sli: Number,
    slo: Number,
    gap: Number,
    good_events: Number,
    bad_events: Number,
    burn_rate: Number,
    burn_rate_threshold: Number,
  },
  components: {
    Gauge,
  },
  mixins: [
    fmtMixin
  ]
});
</script>

<style>
</style>
