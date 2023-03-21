<template>
  <div class="design-wrap-aside">
    <!-- 列表选择侧边栏区域 -->
    <type-select-list />

    <!-- 列表展示框 -->
    <div class="aside-list" :class="{ 'is-hide': asideIsMini }">
      <div class="template-components">
        <div class="design-gallery-top">
          <!-- 筛选 -->
          <filtrate-list class="filtrate-list" @query="queryListHandle" />

          <!-- 列表切换 -->
          <list-tab-panel
            v-if="!filtreInput"
            :tabsPanel="tabsPanel"
            :activePanel="activeListComponent"
            @changeTabPanel="changeTabPanel" />
        </div>

        <!-- 列表展示区域 -->
        <div class="design-gallery-list">
          <template v-if="!filtreInput">
            <!-- 由于组件是通过变量引用而不是基于字符串组件名注册的，
              在 <script setup> 中要使用动态组件的时候，应该使用动态的 :is 来绑定 -->
            <keep-alive :exclude="excludeComponent">
              <component :is="componentList[activeListComponent]" />
            </keep-alive>
          </template>
          <component v-else :is="componentList[filtrateListComponent]" :input="filtreInput" />
        </div>
      </div>

      <!-- 列表展示区域尺寸控制 -->
      <div class="control-aside-size" @click="changeAsideSize">
        <el-icon :size="20" color="#657097"><CaretRight /></el-icon
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useAsideStore } from '@/store/aside';
import { useUserStore } from '@/store/user';
import { getCookie } from '@/utils/cache';
import TypeSelectList from './TypeSelectList.vue';
import ListTabPanel from './ListTabPanel.vue';
import FiltrateList from './FiltrateList.vue';
import { storeToRefs } from 'pinia';
// 动态组件
import FiltrateResultList from './FiltrateResultList.vue';
import RecommendTemplateList from './TemplateList/RecommendTemplateList.vue';
import CollectTemplateList from './TemplateList/CollectTemplateList.vue';
import OneselfTemplateList from './TemplateList/OneselfTemplateList.vue';

// 侧边栏store
const asideStore = useAsideStore();
const { asideActiveType, excludeComponent, asideIsMini, activeListComponent } =
  storeToRefs(asideStore);
// 用户store
const userStore = useUserStore();
const {storeToken} = storeToRefs(userStore);

const tabsPanel = ref([]);
// 输入框筛选条件
const filtreInput = ref('');
// 搜索结果组件
const filtrateListComponent = ref('');
const componentData = {
  template: {
    name: 'FiltrateResultList',
  },
};

// 动态组件列表
const componentList = {
  FiltrateResultList: FiltrateResultList,
  RecommendTemplateList: RecommendTemplateList,
  CollectTemplateList: CollectTemplateList,
  OneselfTemplateList: OneselfTemplateList,
};

watch(asideActiveType, (newVal) => {
  tabsPanel.value = newVal.listComponentData?.tabPanel;
});
watch(storeToken, (newVal) => {
  const activeListComponent = asideStore.activeListComponent
  asideStore.activeListComponent = ''
  asideStore.activeListComponent = activeListComponent
})

// 改变列表展示区域大小
function changeAsideSize() {
  asideStore.asideIsMini = !asideStore.asideIsMini;
}

// 切换列表
function changeTabPanel(acitveTab) {
  if (getCookie('iyuanwu_token')) {
    asideStore.activeListComponent = acitveTab.id;
  } else {
    userStore.loginDialogState = true;
  }
}

// 筛选
function queryListHandle(input) {
  filtreInput.value = input.value;
  filtrateListComponent.value = componentData[asideActiveType.id].name;
}
</script>

<style scoped lang="less">
.design-wrap-aside {
  display: flex;
  height: 100%;
}
.aside-list {
  border: 1px solid #eeeeee;
  padding: 24px 0 0 28px;
  width: 838px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  &.is-hide {
    width: 310px;
  }
  .control-aside-size {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: -30px;
    width: 42px;
    height: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: #000000;
    z-index: -1;
    border-radius: 10px;
    padding: 0px 7px;
  }
}
.template-components {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  .filtrate-list {
    margin-right: 28px;
  }
}
.design-gallery-list {
  margin-top: 12px;
  height: 100%;
  overflow: hidden;
}
:deep(.list-head) {
  margin-top: 12px;
  padding-bottom: 20px;

  .right {
    font-size: 14px;
    color: #667198;
    cursor: pointer;
  }
}
:deep(.list-component-wrap) {
  overflow: hidden;
  flex: 1;
  padding-right: 28px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
