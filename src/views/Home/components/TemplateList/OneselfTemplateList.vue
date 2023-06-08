<template>
  <aside-list-skeleton v-if="getListloading && defaultList.length === 0" />
  <div class="list-component-wrap">
    <list-component
      class="list-component"
      :list="defaultList"
      :loading="getListloading"
      :noMore="noMore"
      :isShowCollect="false"
      @load="getMoreData">
      <div class="flex-c-b list-head">
        <span class="left">定制({{ totalListCount }})</span>
        <span class="right">管理</span>
      </div></list-component
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useListOption, useMoreListData } from '@/hooks/useAsideList';
import { useList } from './Hooks/useTemplateList';
import useCommonList from '@/hooks/useCommonList';

const { getListloading, noMore, getListParems, defaultList, totalListCount } =
  useCommonList();

async function getList() {
  const params = {
    templateType: 3,
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
}
onMounted(() => {
  getList();
});
</script>

<style scoped></style>
