<template>
  <div v-if="isGroup" class="group-wrap">
    <aside-list-skeleton v-if="getListloading" />
    <el-scrollbar>
      <div class="list-component-wrap group">
        <div v-for="item in groupRecommendTemplateList" :key="item.kId">
          <list-component
            class="list-component"
            :isShowFooter="false"
            :list="groupItemList(item, index)"
            @changeCollectState="changeCollectState">
            <template v-slot:immobilization>
              <div class="space-between list-head">
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
      @changeCollectState="changeCollectState">
      <div class="list-head">
        <span class="back-button" @click="backGroup"
          ><el-icon :size="14"><ArrowLeft /></el-icon
          >{{ noGroupData.name }}</span
        >
      </div></list-component
    >
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { useAsideStore } from '@/store/aside';
import ListComponent from '@/components/list.vue';
import AsideListSkeleton from '@/components/AsideListSkeleton.vue';

export default {
  name: 'RecommendTemplateList',
  components: {
    ListComponent,
    AsideListSkeleton,
  },
  setup() {
    const asideStore = useAsideStore();
    const activeName = ref('recommend');
    const isGroup = ref(true);
    const groupRecommendTemplateList = ref([]);
    const noGroupData = ref({
      name: '',
      list: [],
    });
    const getListloading = ref(true);
    const noMore = ref(false);
    const getMoreDataParems = ref({
      kId: 0,
      modeType: '0',
      pageIndex: 1,
      pageSize: 50,
      templateType: 1,
    });
    const asideIsMini = computed(() => asideStore.asideIsMini);
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
      getMoreDataParems.value.kId = noGroupData.value.kId;
      getMoreDataParems.value.pageIndex += 1;
      getData('GetTemplateList', getMoreDataParems.value).then((res) => {
        getListloading.value = false;
        noMore.value = res.data.length < getMoreDataParems.value.pageSize;
        noGroupData.value.list.push(...res.data);
      });
    }
    function moreHandle(item) {
      isGroup.value = false;
      noGroupData.value.name = item.name;
      noGroupData.value.list = [...item.items];
      noGroupData.value.kId = item.kId;
    }
    function backGroup() {
      isGroup.value = true;
      getMoreDataParems.value.pageIndex = 1;
      noGroupData.value.list = [];
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
    function changeCollectState() {
      asideStore.excludeComponent = asideStore.activeListComponent;
    }

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
      changeCollectState,
      getListloading,
    };
  },
};
</script>

<style scoped lang="less">
.group-wrap {
  height: 100%;
}
.list-head {
  margin-top: 12px;
  padding-bottom: 20px;
}
.list-component-wrap {
  .back-button {
    cursor: pointer;
    i {
      color: #666e88;
      vertical-align: -1px;
    }
  }
  .el-scrollbar {
    height: calc(100% - 22px);
  }
}
.group-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  .el-scrollbar {
    color: #222;
  }
}
/deep/.el-scrollbar__bar {
  right: 8px;
}
</style>
