<template>
  <div class="list-container">
    <EstimatedVirtualList
      :data-source="data"
      :loading="loading"
      :estimated-height="40"
      :height="500"
      :width="600"
      @add-data="addData">
      <template #item="{ item, index }">
        <div>{{ index + 1 }} - {{ item.content }}</div>
      </template>
    </EstimatedVirtualList>
  </div>
</template>

<script setup lang="ts">
import { EstimatedVirtualList } from '@qx/ui';
import Mock from 'mockjs';
const data = ref<
  {
    content: string;
  }[]
>([]);
const loading = ref(false);
const addData = () => {
  loading.value = true;
  setTimeout(() => {
    data.value = data.value.concat(
      new Array(2000).fill(0).map((_, index) => ({
        content: Mock.mock('@csentence(40, 100)'),
      })),
    );
    loading.value = false;
  }, 1000);
};
onMounted(() => {
  addData();
});
</script>

<style scoped lang="scss">
.list-container {
  width: 100%;
  max-width: 600px;
  height: calc(100vh - 100px);
  border: 1px solid #333;
}
</style>
