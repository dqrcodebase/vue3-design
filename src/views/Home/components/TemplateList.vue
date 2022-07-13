<template>
  <div class="template-components">
    <div class="design-gallery-top">
      <filtrate-list class="filtrate-list" />
      <div class="tab-panel">
        <span class="cursor-pointer active">推荐样版</span>
        <span class="cursor-pointer">收藏样版</span>
        <span class="cursor-pointer">我的样版</span>
      </div>
    </div>

    <div class="design-gallery-list">
      <div v-if="isGroup" class="group-wrap">
        <aside-list-skeleton v-if="getListloading" />
        <el-scrollbar>
          <div class="list-wrap group">
            <div v-for="item in groupRecommendTemplateList" :key="item.kId">
              <list-component
                class="list-component"
                :isShowFooter="false"
                :list="groupItemList(item, index)">
                t
                <div class="space-between list-head">
                  <span>{{ item.name }}</span>
                  <span class="more-button" @click="moreHandle(item)"
                    >更多<el-icon :size="14"><ArrowRight /></el-icon
                  ></span>
                </div>
              </list-component>
            </div>
          </div>
        </el-scrollbar>
      </div>

      <div class="list-wrap not-group" v-else>
        <list-component
          class="list-component"
          :list="noGroupData.list"
          :loading="getListloading"
          :noMore="noMore"
          @load="getMoreData">
          <div class="list-head">
            <span class="back-button" @click="backGroup"
              ><el-icon :size="14"><ArrowLeft /></el-icon
              >{{ noGroupData.name }}</span
            >
          </div></list-component
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  getCurrentInstance,
  reactive,
  computed,
  watch,
} from 'vue';
import { useAsideStore } from '@/store/aside';
import ListComponent from '@/components/list.vue';
import AsideListSkeleton from '@/components/AsideListSkeleton.vue';
import FiltrateList from './FiltrateList.vue';

export default {
  components: { ListComponent, FiltrateList, AsideListSkeleton },
  beforeRouteEnter(to) {
    console.log('to', to);
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  setup() {
    const store = useAsideStore();
    const activeName = ref('recommend');
    const isGroup = ref(true);
    const noMore = ref(false);
    const getListloading = ref(true);
    const groupRecommendTemplateList = ref([]);
    // const groupItemList = reactive([]);
    const noGroupData = reactive({
      name: '',
      list: [],
    });
    const getMoreDataParems = reactive({
      kId: 0,
      modeType: '0',
      pageIndex: 1,
      pageSize: 50,
      templateType: 1,
    });
    const asideIsMini = computed(() => store.asideIsMini);
    const { getData } = getCurrentInstance().appContext.config.globalProperties;

    function getTemplateListNew() {
      getListloading.value = true;
      getData('GetTemplateListNew', {
        modeType: '0',
        pageIndex: 1,
        pageSize: 50,
        templateType: 1,
      }).then((res) => {
        getListloading.value = false;
        groupRecommendTemplateList.value.push(...res.data);
      });
    }
    function getTemplateList() {
      getListloading.value = true;
      getMoreDataParems.kId = noGroupData.kId;
      getMoreDataParems.pageIndex += 1;
      getData('GetTemplateList', getMoreDataParems).then((res) => {
        getListloading.value = false;
        noMore.value = res.data.length === 0;
        noGroupData.list.push(...res.data);
      });
    }
    function moreHandle(item) {
      isGroup.value = false;
      noGroupData.name = item.name;
      noGroupData.list = [...item.items];
      noGroupData.kId = item.kId;
    }
    function backGroup() {
      isGroup.value = true;
      getMoreDataParems.pageIndex = 1;
      noGroupData.list = [];
      noMore.value = false;
    }
    function getMoreData() {
      getTemplateList();
    }
    function groupItemList(item) {
      const value = asideIsMini.value
        ? item.items.filter((it, index) => index < 4)
        : item.items.filter((it, index) => index < 12);
      return value;
    }
    watch(asideIsMini, (newAsideIsMini, oldAsideIsMini) => {
      console.log(newAsideIsMini, oldAsideIsMini);
    });
    onMounted(() => {
      getTemplateListNew();
    });
    return {
      activeName,
      groupRecommendTemplateList,
      asideIsMini,
      isGroup,
      noGroupData,
      noMore,
      groupItemList,
      moreHandle,
      backGroup,
      getMoreData,
      getListloading,
    };
  },
};
</script>

<style scoped lang="less">
.design-gallery-list {
  margin-top: 12px;
  height: calc(100% - 106px - 28px);
  overflow: hidden;
  .group-wrap {
    height: 100%;
  }
}
.design-gallery-top {
}
.list-head {
  margin-top: 12px;
}
.list-wrap {
  overflow: hidden;
  flex: 1;
  padding-right: 28px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .back-button {
    cursor: pointer;
    i {
      color: #666e88;
      vertical-align: -1px;
    }
  }
  .more-button {
    font-size: 14px;
    color: #667198;
    cursor: pointer;
  }
  .el-scrollbar {
    height: calc(100% - 22px);
  }
  .list-component {
    // padding-top: 20px;
  }
}
.template-components {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  .el-scrollbar {
    color: #222;
  }
  .filtrate-list {
    margin-right: 28px;
  }
}
/deep/.el-scrollbar__bar {
  right: 8px;
}

.tab-panel {
  border-radius: 4px;
  border: 1px solid #f6f6f9;
  background: #f6f6f9;
  color: #666e88;
  display: flex;
  margin: 24px 28px 0 0;
  cursor: pointer;
  .cursor-pointer {
    flex: 1;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    &.active {
      color: var(--main-color);
      background-color: #ffffff;
      font-weight: 700;
    }
  }
}
</style>
