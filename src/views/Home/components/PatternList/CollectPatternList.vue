<template>
  <aside-list-skeleton v-if="getListloading && collectList.length === 0" />
  <div v-if="isGroup" class="group-wrap"> 444444</div>
  <div v-else class="list-component-wrap">
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
      </div>
      <template v-slot:list>
        <div class="group-list-detail flex justify-start flex-wrap">
          <div class="group-list">
            <div v-for="item in 10" class="group-item flex justify-between flex-direction-column">
              <div class="group-box">
                <img
                  src="https://chdesign.oss-cn-shanghai.aliyuncs.com/Thumbnail/Iyw/Tu/Creation/20220228/95025/ge2tonrthe2demrqg4ydonrvge2tqnbonjygoxzsha2xqmrygu.jpg?x-oss-process=image/resize,w_900"
                  alt="" />
              </div>
              <div class="group-title">默认收藏夹</div>
            </div>
          </div>
        </div>
      </template>
    </list-component>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useListOption, useCollectState } from '@/hooks/useAsideList';
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

<style scoped lang="less">
@import '@styles/collectPatternList.less';
</style>
