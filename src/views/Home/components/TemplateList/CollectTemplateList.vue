<template>
  <aside-list-skeleton v-if="getListloading && collectList.length === 0" />
  <div class="list-component-wrap">
    <list-component
      class="list-component"
      :list="collectList"
      :loading="getListloading"
      :noMore="noMore"
      @changeCollectState="changeCollectState"
      @load="getMoreData">
      <div class="flex-c-b list-head">
        <span class="left">收藏({{ collectTotalCount }})</span>
        <span class="right">管理</span>
      </div></list-component
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  useListOption,
  useCollectState,
} from '@/hooks/useAsideList';
import { useList } from './Hooks/useTemplateList';

const collectList = ref([]);
const collectTotalCount = ref(0);
const { getListloading, noMore, getListParems } = useListOption();
getListParems.value.templateType = 2;
async function getList() {
  const params = {
    templateType: 2,
    ...getListParems.value,
  };
  const { list, totalCount } = await useList('GetTemplateList', params);
  collectTotalCount.value = totalCount;
  collectList.value.push(...list);
  getListloading.value = false;
  noMore.value = collectList.value.length >= totalCount;
}
function getMoreData() {
  getListParems.value.pageIndex += 1;
  getList();
}
async function changeCollectState(items) {
  const item = await useCollectState(items);
  collectTotalCount.value = item.isCollect
    ? collectTotalCount.value + 1
    : collectTotalCount.value - 1;
}
onMounted(() => {
  getList();
});
</script>

<style scoped></style>
