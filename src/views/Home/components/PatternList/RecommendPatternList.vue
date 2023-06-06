<template>
  <!-- 推荐图案列表 -->

  <div v-if="isGroup" class="group-wrap flex-v">
    <aside-list-skeleton v-if="getListloading" />
    <el-scrollbar>
      <div class="list-component-wrap group">
        <div v-for="(item, prop) in groupRecommendList" :key="item.kId">
          <list-component
            class="list-component"
            :isShowFooter="false"
            :list="groupItemList(item)"
            @changeCollectState="
              (items) => changeGroupCollectState(items, item)
            ">
            <template v-slot:immobilization>
              <div class="flex-c-b list-head">
                <span class="left">{{ item.name }}</span>
                <span class="right" @click="moreHandle(item, prop)"
                  >更多<el-icon :size="14"> <ArrowRight /> </el-icon
                ></span>
              </div>
            </template>
          </list-component>
        </div>
      </div>
    </el-scrollbar>
  </div>

  <div class="list-component-wrap not-group" v-else>
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
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { useAsideStore } from '@/store/aside';
import ListComponent from '@/components/List';
import AsideListSkeleton from '@/components/AsideListSkeleton';
import { useListOption, useCollectState } from '@/hooks/useAsideList';
import { getCookie } from '@/utils/cache';
import { useUserStore } from '@/store/user';
import { useList, useMoreList } from './Hooks/usePatternList';

// 用户store
const userStore = useUserStore();
const asideStore = useAsideStore();
// 当前列表是否分组
const isGroup = ref(true);
const groupRecommendList = ref({
  mentality: {
    name: '智能推荐',
    kId: -1,
    items: [],
  },
  category: {
    name: '品类授权',
    kId: 0,
    items: [],
  },
  material: {
    name: '素材授权',
    kId: 1,
    items: [],
  },
});
const noGroupData = ref({
  name: '',
  type: '',
  kId: '',
  list: [],
});
const { getListloading, noMore, getListParems } = useListOption();
getListParems.value.templateType = 1;
const asideIsMini = computed(() => asideStore.asideIsMini);
const { getData } = getCurrentInstance().appContext.config.globalProperties;

function getInitList() {
  getListloading.value = true;
  Promise.race([getMentalityList(), getCategoryList(), getMaterialList()]).then(
    () => {
      getListloading.value = false;
    },
  );
}

// 获取智能推荐列表
async function getMentalityList() {
  const res = await getData('GetDesignRecommendList', {
    ...getListParems.value,
    classificationId: groupRecommendList.value.mentality.kId,
  });
  groupRecommendList.value.mentality.items.push(...res.data.list);

  return res;
}

// 获取品类授权列表
async function getCategoryList() {
  const res = await getData('GetRecommendPatternList', {
    ...getListParems.value,
    creationArea: groupRecommendList.value.category.kId,
  });
  groupRecommendList.value.category.items.push(...res.data);

  return res;
}

// 获取素材授权列表
async function getMaterialList() {
  const res = await getData('GetRecommendPatternList', {
    ...getListParems.value,
    creationArea: groupRecommendList.value.material.kId,
  });
  groupRecommendList.value.material.items.push(...res.data);

  return res;
}

// 展示更多列表
function moreHandle(item, prop) {
  isGroup.value = false;
  noGroupData.value.name = item.name;
  noGroupData.value.list = [...item.items];
  noGroupData.value.kId = item.kId;
  noGroupData.value.type = prop;
  getListParems.value.kId = noGroupData.value.kId;
  getListParems.value.pageIndex = 0;
}
// 返回分组列表
function backGroup() {
  isGroup.value = true;
  getListParems.value.pageIndex = 0;
  noGroupData.value.list = [];
  noMore.value = false;
}
// 加载更多
async function getMoreData() {
  getListParems.value.kId = noGroupData.value.kId;
  getListParems.value.pageIndex += 1;
  let res = {};

  if (noGroupData.value.type === 'category') {
    res = await getCategoryList();
    noGroupData.value.list.push(...res.data);
    noMore.value = getListParems.value.pageSize > res.data.length;
  } else if (noGroupData.value.type === 'material') {
    res = await getMaterialList();
    noGroupData.value.list.push(...res.data);
    noMore.value = getListParems.value.pageSize > res.data.length;
  } else if (noGroupData.value.type === 'mentality') {
    res = await getMentalityList();
    noGroupData.value.list.push(...res.data.list);
    noMore.value = noGroupData.value.list.length >= res.data.totalCount;
  }
}
// 分组列表
function groupItemList(item) {
  const value = asideIsMini.value
    ? item.items.filter((it, index) => index < 4)
    : item.items.filter((it, index) => index < 12);
  return value;
}
// 收藏图案
function changeGroupCollectState(items, item) {
  if (!getCookie('iyuanwu_token')) {
    userStore.loginDialogState = true;
  }
  const params = { tId: items.tId };
  getData('CollectTemplate', params, { extra: true }).then((res) => {
    if (res.code === 1) {
      groupRecommendList.value.forEach((element) => {
        if (element.kId === item.kId) {
          element.items.forEach((el) => {
            if (el.tId === items.tId) {
              const ele = el;
              ele.isCollect = !items.isCollect;
            }
          });
        }
      });
    }
    asideStore.excludeComponent = asideStore.activeListComponent;
  });
}

onMounted(() => {
  getInitList();
});
</script>

<style scoped lang="less">
@import '@styles/recommendPatternList.less';
</style>
