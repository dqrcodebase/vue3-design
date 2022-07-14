<template>
  <aside-list-skeleton v-if="getListloading && list.length === 0" />
  <div class="list-component-wrap">
    <list-component
      class="list-component"
      :list="list"
      :loading="getListloading"
      :noMore="noMore"
      @load="getMoreData">
      <div class="space-between list-head">
        <span class="left">收藏({{ totalCount }})</span>
        <span class="right">管理</span>
      </div></list-component
    >
  </div>
</template>

<script>
import ListComponent from '@/components/list.vue';
import AsideListSkeleton from '@/components/AsideListSkeleton.vue';
import { ref, onMounted, getCurrentInstance } from 'vue';

export default {
  name: 'CollectTemplateList',
  components: {
    ListComponent,
    AsideListSkeleton,
  },
  setup() {
    const getListloading = ref(true);
    const noMore = ref(false);
    const list = ref([]);
    const totalCount = ref(0);
    const getMoreDataParems = ref({
      modeType: '0',
      pageIndex: 1,
      pageSize: 50,
      templateType: 2,
    });
    const { getData } = getCurrentInstance().appContext.config.globalProperties;
    function getTemplateList() {
      getListloading.value = true;
      getData('GetTemplateList', getMoreDataParems.value, { extra: true }).then(
        (res) => {
          getListloading.value = false;
          noMore.value = res.data.length < getMoreDataParems.value.pageSize;
          totalCount.value = res.totalCount;
          list.value.push(...res.data);
        },
      );
    }
    onMounted(() => {
      getTemplateList();
    });
    function getMoreData() {
      getMoreDataParems.value.pageIndex += 1;
      getTemplateList();
    }

    return {
      getListloading,
      noMore,
      list,
      totalCount,
      getMoreData,
    };
  },
};
</script>

<style scoped></style>
