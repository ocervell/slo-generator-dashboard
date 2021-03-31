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
  <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
    <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
      <div class="p-3 rounded-full bg-opacity-75" :class="iconColor">
        <slot></slot>
      </div>

      <div class="mx-5">
        <h4 class="text-2xl font-semibold text-gray-700">{{ value }}</h4>
        <div class="text-gray-500">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "Default",
    },
    value: {
      type: Number,
      default: 1000,
    },
    iconColor: {
      type: String,
      default: "bg-indigo-600",
    },
  },
});
</script>
