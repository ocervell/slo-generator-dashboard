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
  <div>
    <h3 class="text-gray-700 text-3xl font-medium">Service Level Objectives</h3>

    <!-- SLO info cards -->
    <div class="mt-4">
      <div class="flex flex-wrap -mx-6">
        <Card title="Services" iconColor="bg-indigo-600">
          <svg
            class="h-8 w-8 text-white"
            viewBox="0 0 28 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
              fill="currentColor"
            />
            <path
              d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
              fill="currentColor"
            />
            <path
              d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
              fill="currentColor"
            />
            <path
              d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
              fill="currentColor"
            />
            <path
              d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
              fill="currentColor"
            />
            <path
              d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
              fill="currentColor"
            />
          </svg>
        </Card>

        <Card title="SLOs" iconColor="bg-orange-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 26"
            stroke="currentColor"
            class="h-8 w-8 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </Card>
        <Card title="Alerts" iconColor="bg-pink-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 26"
            class="h-8 w-8 text-white"
          >
            <path
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
        </Card>
      </div>
    </div>

    <!-- "Last 24 Hours" section -->
    <div class="text-lg text-gray-600">
      <!-- Roller header -->
      <div
        class="px-5 py-3 my-2 flex items-center shadow-md rounded-lg bg-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 22 22"
          class="h-8 w-8"
          stroke="white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span class="px-5 uppercase font-semibold text-gray-300">
          Last 24 hours
        </span>

        <ToggleIcon v-model="toggleLast24Hours"/>
      </div>

      <!-- SLO Data Table-->
      <SLODailyTable :class="toggleLast24Hours ? '' : 'hidden'"/>
    </div>


    <!-- "Last Week" section -->
    <div class="text-lg text-gray-600">
      <!-- Roller header -->
      <div
        class="px-5 py-3 my-2 flex items-center shadow-md rounded-lg bg-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 22 22"
          class="h-8 w-8"
          stroke="white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span class="px-5 uppercase font-semibold text-gray-300">
          Last week
        </span>

        <ToggleIcon v-model="toggleLastWeek"/>
      </div>

      <!-- SLO Data Table-->
      <SLODailyTable :class="toggleLastWeek ? '' : 'hidden'"/>

    </div>

    <!-- "Last Month" section -->
    <div class="text-lg text-gray-600">
      <!-- Roller header -->
      <div
        class="px-5 py-3 my-2 flex items-center shadow-md rounded-lg bg-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 22 22"
          class="h-8 w-8"
          stroke="white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span class="px-5 uppercase font-semibold text-gray-300">
          Last month
        </span>

        <ToggleIcon v-model="toggleLastMonth"/>
      </div>

      <!-- SLO Data Table-->
      <SLODailyTable :class="toggleLastMonth ? '' : 'hidden'"/>

    </div>

    <!-- New SLO button -->
    <div>
      <button
        class="px-2 py-2 bg-blue-600 rounded-md text-white font-medium tracking-wide hover:bg-blue-500 inline-flex items-center"
      >
        <svg
          class="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>New SLO</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SLODailyTable from "../components/SLODailyTable.vue";
import Card from "../components/Card.vue";
import ToggleIcon from "../components/icons/ToggleIcon.vue";

export default defineComponent({
  data() {
    return {
      toggleLast24Hours: false,
      toggleLastWeek: false,
      toggleLastMonth: false
    };
  },
  components: {
    Card,
    SLODailyTable,
    ToggleIcon
  },
});
</script>
