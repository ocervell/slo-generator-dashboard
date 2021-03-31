<template>
  <div>
    <svg
      v-if="!localActive"
      v-on:click="localActive = !localActive"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
      class="h-6 w-6"
      stroke="white"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
    <svg
      v-if="localActive"
      v-on:click="localActive = !localActive"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
      class="h-6 w-6"
      stroke="white"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20 12H4"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // proxy for 'active'
    localActive: {
      get() { return this.modelValue },
      set(v) { this.$emit('update:modelValue', v)}
    }
  },
});
</script>

