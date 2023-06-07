<template>
  <!-- 推荐样板列表 -->

  <div v-if="isGroup" class="group-wrap flex-v">
    <aside-list-skeleton v-if="getListloading" />
    <el-scrollbar>
      <div class="list-component-wrap group">
        <div v-for="item in groupRecommendTemplateList" :key="item.kId">
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
                <span class="right" @click="moreHandle(item)"
                  >更多<el-icon :size="14"><ArrowRight /></el-icon
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
          ><el-icon :size="14"><ArrowLeft /></el-icon
          >{{ noGroupData.name }}</span
        >
      </div></list-component
    >
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { useAsideStore } from '@/store/aside';
import {
  useListOption,
  useCollectState,
} from '@/hooks/useAsideList';
import useCommonList from '@/hooks/useCommonList';
import { getCookie } from '@/utils/cache';
import { useUserStore } from '@/store/user';
import { useList, useMoreList } from './Hooks/useTemplateList';

// 用户store
const userStore = useUserStore();
const asideStore = useAsideStore();
const isGroup = ref(true);
const groupRecommendTemplateList = ref([]);
const noGroupData = ref({
  name: '',
  list: [],
});
const { getListloading, noMore, getListParems,useMoreListData } = useCommonList();

getListParems.value.templateType = 1;
const asideIsMini = computed(() => asideStore.asideIsMini);
const { getData } = getCurrentInstance().appContext.config.globalProperties;

function getTemplateListNew() {
  getListloading.value = true;
  const params = {
    templateType: 1,
    ...getListParems.value,
  };
  getData('GetTemplateListNew', params, { extra: true }).then((res) => {
    getListloading.value = false;
    groupRecommendTemplateList.value.push(...res.data);
  });
}

async function getTemplateList() {
  const params = {
    templateType: 1,
    ...getListParems.value,
  };
  const { list, totalCount } = await useList('GetTemplateList', params);
  noGroupData.value.list.push(...list);
  noMore.value = noGroupData.value.list.length >= totalCount;
}

// 展示更多列表
function moreHandle(item) {
  isGroup.value = false;
  noGroupData.value.name = item.name;
  noGroupData.value.list = [...item.items];
  noGroupData.value.kId = item.kId;
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
  console.log("🚀 ~ file: RecommendTemplateList.vue:115 ~ getMoreData ~ getMoreData:")
  useMoreListData();
  getTemplateList()
}
// 分组列表
function groupItemList(item) {
  const value = asideIsMini.value
    ? item.items.filter((it, index) => index < 4)
    : item.items.filter((it, index) => index < 12);
  return value;
}
// 收藏样版
function changeGroupCollectState(items, item) {
  if (!getCookie('iyuanwu_token')) {
    userStore.loginDialogState = true;
  }
  const params = { tId: items.tId };
  getData('CollectTemplate', params, { extra: true }).then((res) => {
    if (res.code === 1) {
      groupRecommendTemplateList.value.forEach((element) => {
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
  getTemplateListNew();
});
</script>

<style scoped lang="less">
@import '@styles/recommendTemplateList.less';
</style>
