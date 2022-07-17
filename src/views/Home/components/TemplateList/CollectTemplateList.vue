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
      <div class="space-between list-head">
        <span class="left">收藏({{ collectTotalCount }})</span>
        <span class="right">管理</span>
      </div></list-component
    >
  </div>
</template>

<script>
import ListComponent from '@/components/list.vue';
import AsideListSkeleton from '@/components/AsideListSkeleton.vue';
import { ref, onMounted } from 'vue';
import {
  getListOption,
  getTemplateList,
  changeCollectState as changeState,
  useKeepAlive,
} from '@/hooks/getList';

export default {
  name: 'CollectTemplateList',
  components: {
    ListComponent,
    AsideListSkeleton,
  },
  setup() {
    const collectList = ref([]);
    const collectTotalCount = ref(0);
    const { getListloading, noMore, getListParems } = getListOption();
    getListParems.value.templateType = 2;
    async function getList() {
      const { list, totalCount } = await getTemplateList('GetTemplateList');
      collectTotalCount.value = totalCount;
      collectList.value.push(...list);
    }
    function getMoreData() {
      getListParems.value.pageIndex += 1;
      getList();
    }
    async function changeCollectState(items) {
      const item = await changeState(items);
      collectTotalCount.value = item.isCollect
        ? collectTotalCount.value + 1
        : collectTotalCount.value - 1;
    }
    onMounted(() => {
      useKeepAlive();
      getList();
    });
    return {
      getListloading,
      noMore,
      collectList,
      collectTotalCount,
      getMoreData,
      changeCollectState,
    };
  },
};
</script>

<style scoped></style>
