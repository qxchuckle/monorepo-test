<script setup lang="ts">
import { hello } from '@qx/utils';

const props = withDefaults(
  defineProps<{
    text?: string;
  }>(),
  {
    text: 'world',
  },
);

function clickHandler() {
  hello(props.text);
}
</script>

<template>
  <button class="qx-button" @click="clickHandler">
    <slot />
  </button>
</template>

<style>
.qx-button {
  color: red;
}
</style>
