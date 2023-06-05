<template>
  <aside-list-skeleton v-if="getListloading && oneselfList.length === 0" />
  <div class="list-component-wrap">
    <list-component
      class="list-component"
      :list="oneselfList"
      :loading="getListloading"
      :noMore="noMore"
      :isShowCollect="false"
      @load="getMoreData">
      <div class="flex-c-b list-head">
        <span class="left">定制({{ collectTotalCount }})</span>
        <span class="right">管理</span>
      </div></list-component
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useListOption } from '@/hooks/useAsideList';
import { useList } from './Hooks/useTemplateList';

const oneselfList = ref([]);
const collectTotalCount = ref(0);
const { getListloading, noMore, getListParems } = useListOption();
getListParems.value.templateType = 3;
async function getList() {
  const params = {
    templateType: 2,
    ...getListParems.value,
  };
  const { list, totalCount } = await useList('GetTemplateList', params);
  collectTotalCount.value = totalCount;
  oneselfList.value.push(...list);
  getListloading.value = false;
  noMore.value = oneselfList.value.length >= totalCount;
}

function getMoreData() {
  getListParems.value.pageIndex += 1;
  getList();
}
onMounted(() => {
  getList();
});

</script>

<style scoped></style>
