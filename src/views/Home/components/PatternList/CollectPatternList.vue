<template>
  <aside-list-skeleton v-if="getListloading && collectGroupList.length === 0" />
  <div v-show="isGroup" class="list-component-wrap">
    <list-component
      class="list-component"
      :list="collectGroupList"
      :loading="getListloading"
      :noMore="noMore"
      @changeCollectState="changeCollectState"
      @load="getMoreData">
      <div class="flex-c-b list-head">
        <span class="left">收藏({{ collectGroupTotalCount }})</span>
        <span class="right">管理</span>
      </div>
      <template v-slot:list>
        <div class="group-list-detail">
          <div class="group-list">
            <div v-for="items in collectGroupList" class="group-item">
              <div
                class="group-box flex-c-b-w cursor-pointer"
                @click="enterDetailList(items)">
                <img v-for="item in items.imgList" :src="item" alt="" />
              </div>
              <div class="group-title font-14">{{ items.name }}</div>
            </div>
          </div>
        </div>
      </template>
    </list-component>
  </div>
  <div v-show="!isGroup" class="list-component-wrap">
    {{ getListloading }}
    <list-component
      class="list-component"
      :list="noGroupData.list"
      :loading="getListloading"
      :noMore="noMore"
      @load="getMoreData"
      @changeCollectState="useCollectState">
      <div class="list-head">
        <span class="back-button" @click="backGroup"
          ><el-icon :size="14"> <ArrowLeft /> </el-icon
          >{{ noGroupData.name }}</span
        >
      </div>
    </list-component>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useListOption, useCollectState,useMoreListData } from '@/hooks/useAsideList';
import { useList } from './Hooks/usePatternList';

// 收藏列表
const collectGroupList = ref([]);
const collectGroupTotalCount = ref(0);
const { getListloading, noMore, getListParems } = useListOption();
const isGroup = ref(true);
const noGroupData = ref({
  name: '',
  list: [],
});

// 获取分组收藏列表
async function getList() {
  const params = {
    ...getListParems.value,
    mode: '1',
    salesMode: -1,
    sort: 'zxzp',
  };
  const { list, totalCount } = await useList('GetCollectionGroupList', params);
  collectGroupTotalCount.value = totalCount;
  collectGroupList.value.push(...list);
  getListloading.value = false;
  noMore.value = collectGroupList.value.length >= totalCount;
}

// 获取收藏列表详情
async function getNoGroupList(groupId) {
  const params = {
    ...getListParems.value,
    groupId,
    mode: '1',
    salesMode: -1,
    sort: 'zxzp',
  };
  const { list, totalCount } = await useList('GetMyCollectCreations', params);
  noGroupData.value.list.push(...list);
  getListloading.value = false;
  noMore.value = noGroupData.value.list.length >= totalCount;
}

// 加载更多
function getMoreGroupData() {
  useMoreListData()
}

// 进入分组详情
function enterDetailList(item) {
  getListParems.value.pageIndex = 1;
  isGroup.value = false
  noGroupData.value.name = item.name;
  noMore.value = false
  getNoGroupList(item.groupId);
}

// 返回分组列表
function backGroup() {
  isGroup.value = true;
  getListParems.value.pageIndex = 1;
  noGroupData.value = {};
  noMore.value = collectGroupTotalCount.value <= collectGroupList.value.length;
}

// 修改收藏状态
async function changeCollectState(items) {
  const item = await useCollectState(items);
  collectGroupTotalCount.value = item.isCollect
    ? collectGroupTotalCount.value + 1
    : collectGroupTotalCount.value - 1;
}

onMounted(() => {
  getGroupList();
});
</script>

<style scoped lang="less">
@import '@styles/collectPatternList.less';
</style>
