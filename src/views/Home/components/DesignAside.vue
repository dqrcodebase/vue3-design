<template>
  <div class="design-wrap-aside">
    <type-select-list />
    <div class="aside-list" :class="{ 'is-hide': asideIsMini }">
      <div class="template-components">
        <div class="design-gallery-top">
          <filtrate-list class="filtrate-list" @query="queryListHandle" />
          <list-tab-panel
            v-if="!filtreInput"
            :tabsPanel="tabsPanel"
            :activePanel="activeListComponent"
            @changeTabPanel="changeTabPanel" />
        </div>
        <div class="design-gallery-list">
          <template v-if="!filtreInput">
            <keep-alive :exclude="excludeComponent">
              <component :is="activeListComponent" />
            </keep-alive>
          </template>
          <component v-else :is="filtrateListComponent" :input="filtreInput" />
        </div>
      </div>
      <div class="control-aside-size" @click="changeAsideSize">
        <el-icon :size="20" color="#657097"><CaretRight /></el-icon
      ></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useAsideStore } from '@/store/aside';
import { useUserStore } from '@/store/user';
import { getCookie } from '@/utils/cache';
import FiltrateTemplateList from './TemplateList/FiltrateTemplateList.vue';
import RecommendTemplateList from './TemplateList/RecommendTemplateList.vue';
import CollectTemplateList from './TemplateList/CollectTemplateList.vue';
import OneselfTemplateList from './TemplateList/OneselfTemplateList.vue';
import TypeSelectList from './TypeSelectList.vue';
import ListTabPanel from './ListTabPanel.vue';
import FiltrateList from './FiltrateList.vue';

export default {
  components: {
    RecommendTemplateList,
    CollectTemplateList,
    TypeSelectList,
    FiltrateList,
    ListTabPanel,
    OneselfTemplateList,
    FiltrateTemplateList,
  },
  setup() {
    const asideStore = useAsideStore();
    const userStore = useUserStore();
    const tabsPanel = ref([]);
    const asideActiveType = computed(() => asideStore.asideActiveType);
    const excludeComponent = computed(() => asideStore.excludeComponent);
    const filtreInput = ref('');
    const filtrateListComponent = ref('');
    const componentData = {
      template: {
        name: 'FiltrateTemplateList',
      },
    };

    watch(asideActiveType, (newVal) => {
      tabsPanel.value = newVal.listComponentData?.tabPanel;
    });

    function changeAsideSize() {
      asideStore.asideIsMini = !asideStore.asideIsMini;
    }
    function changeTabPanel(acitveTab) {
      if (getCookie('iyuanwu_token')) {
        asideStore.activeListComponent = acitveTab.id;
      } else {
        userStore.loginDialogState = true;
      }
    }
    function queryListHandle(input) {
      filtreInput.value = input.value;
      filtrateListComponent.value =
        componentData[asideActiveType.value.id].name;
    }

    return {
      asideIsMini: computed(() => asideStore.asideIsMini),
      asideActiveType: computed(() => asideStore.asideActiveType),
      activeListComponent: computed(() => asideStore.activeListComponent),
      tabsPanel,
      filtreInput,
      filtrateListComponent,
      changeAsideSize,
      changeTabPanel,
      queryListHandle,
      asideStore,
      excludeComponent,
    };
  },
};
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
