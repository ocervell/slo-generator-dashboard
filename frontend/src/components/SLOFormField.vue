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
    <label class="block text-gray-700 text-sm font-bold mb-2" for="value">
      {{ index }}</label
    >

    <!-- Text area -->
    <div v-if="index.startsWith('filter') || index.startsWith('query')">
      <textarea
        class="bshadow appearance-none border rounded w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        v-model="local"
      />
    </div>

    <!-- Text input -->
    <div v-else-if="isNaN(Number(local))">
      <input
        type="text"
        class="shadow appearance-none border rounded w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        v-model="local"
      />
    </div>

    <!-- Number input -->
    <div v-else>
      <input
        type="number"
        step="0.0001"
        min="0"
        max="1"
        class="shadow appearance-none border rounded w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        v-model.number="local"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["index", "modelValue"],
  computed: {
    // proxy for 'modelValue'
    local: {
      get() { return this.modelValue },
      set(v) { this.$emit('update:modelValue', v) }
    }
  },
  methods: {},
});
</script>
