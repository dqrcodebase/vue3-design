<template>
  <aside-list-skeleton v-if="getListloading && defaultList.length === 0" />
  <div class="list-component-wrap">
    <list-component
      class="list-component"
      :list="defaultList"
      :loading="getListloading"
      :noMore="noMore"
      @changeCollectState="changeCollectState"
      @load="getMoreData">
      <div class="flex-c-b list-head">
        <span class="left">收藏({{ totalListCount }})</span>
        <span class="right">管理</span>
      </div></list-component
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCollectState } from '@/hooks/useAsideList';
import useCommonList from '@/hooks/useCommonList';
import { useList } from './Hooks/useTemplateList';

const {
  getListloading,
  noMore,
  getListParems,
  useMoreListData,
  defaultList,
  totalListCount
} = useCommonList();

async function getList() {
  const params = {
    templateType: 2,
    ...getListParems.value,
  };
  const { list, totalCount } = await useList('GetTemplateList', params);
  totalListCount.value = totalCount;
  defaultList.value.push(...list);
  getListloading.value = false;
  noMore.value = defaultList.value.length >= totalCount;
}

function getMoreData() {
  useMoreListData();
  getList();
}

async function changeCollectState(items) {
  const item = await useCollectState(items);
  totalListCount.value = item.isCollect
    ? totalListCount.value + 1
    : totalListCount.value - 1;
}
onMounted(() => {
  getList();
});
</script>

<style scoped></style>
