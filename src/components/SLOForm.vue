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
  <div class="flex-1 items-center justify-center">
    <form @submit.prevent="" class="bg-white shadow-md rounded px-4 pt-2 pb-2 mb-4">
      <slot name="header"></slot>

      <!-- Loop through value object -->
      <div class="mb-4" v-for="(subvalue, index) in local" :key="index">
        
        <!-- Hidden value, ignore -->
        <div v-if="index.startsWith('_')"></div>

        <!-- Single field -->
        <div v-else-if="!isObject(subvalue)">
          <SLOFormField v-model="local[index]" :index="index"/>
        </div>
        
        <!-- Nested object -->
        <div v-else>
          <h3
            class="mt-10 text-gray-700 font-bold"
            :class="`text-${depth - 2}xl`"
          >
            {{ capitalize(index) }}
          </h3>
          <slo-form v-model="local[index]" :defaultButtons="false" />
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex gap-2 justify-end mt-4">
        <button
          v-if="defaultButtons"
          @click="this.$emit('saved')"
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-110 motion-reduce:transform-none"
        >
          Save & Test
        </button>
        <button
          v-if="defaultButtons"
          @click="this.$emit('reset')"
          class="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-110 motion-reduce:transform-none"
        >
          Reset
        </button>
      </div>
      <slot name="footer"></slot>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SLOFormField from "./SLOFormField.vue";

export default defineComponent({
  name: 'slo-form',
  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: "",
    },
    defaultButtons: {
      type: Boolean,
      default: true,
    },
    depth: {
      type: Number,
      default: 3,
    },
    testLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // proxy for 'modelValue'
    local: {
      get() { return this.modelValue },
      set(v) { console.log("Hello ..."); this.$emit('update:modelValue', v)}
    }
  },
  methods: {
    isObject(value: any) {
      return typeof value == "object";
    },
    capitalize: function (value: String) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  components: {
    SLOFormField
  }
});
</script>
