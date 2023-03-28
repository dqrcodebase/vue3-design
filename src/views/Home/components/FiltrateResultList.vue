<template>
  <aside-list-skeleton v-if="getListloading && filtrateList.length === 0" />
  <div class="list-component-wrap">
    <list-component
      class="list-component"
      :list="filtrateList"
      :loading="getListloading"
      :noMore="noMore"
      :isShowCollect="false"
      @load="getMoreData">
      <div class="space-between list-head">
        <span class="left">搜索结果({{ collectTotalCount }})</span>
      </div></list-component
    >
  </div>
</template>

<script>
import ListComponent from '@/components/list.vue';
import AsideListSkeleton from '@/components/AsideListSkeleton.vue';
import { ref, watch } from 'vue';
import { useListOption } from '@/hooks/useAsideList';
import { useFiltrateList } from '@/hooks/useFiltrateList';

export default {
  name: 'OneselfTemplateList',
  components: {
    ListComponent,
    AsideListSkeleton,
  },
  props: {
    input: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const filtrateList = ref([]);
    const collectTotalCount = ref(0);
    const { getListloading, noMore, getListParems } = useListOption();

    async function getList() {
      const { list, totalCount } = await useFiltrateList('GetTemplateList');
      collectTotalCount.value = totalCount;
      filtrateList.value.push(...list);
    }

    function getMoreData() {
      getListParems.value.pageIndex += 1;
      getList();
    }
    async function queryListHandle() {
      getListParems.value.templateType = 1;
      getListParems.value.keyword1 = props.input;
    }

    watch(
      () => props.input,
      (newVal, oldVal) => {
        if (newVal === oldVal) {
          return;
        }
        getListParems.value.pageIndex = 1;
        filtrateList.value = [];
        queryListHandle();
      },
      { immediate: true },
    );
    return {
      getListloading,
      noMore,
      filtrateList,
      collectTotalCount,
      getMoreData,
      queryListHandle,
    };
  },
};
</script>

<style scoped></style>
