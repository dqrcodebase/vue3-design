<template>
  <div class="template-components">
    <div class="flex">
      <el-input v-model="input" placeholder="Please input" />
      <span>筛选</span>
    </div>
    <div>
      <span>推荐样版</span>
      <span>收藏样版</span>
      <span>我的样版</span>
    </div>
    <el-scrollbar v-if="isGroup">
      <div class="list-wrap group">
        <div v-for="item in groupRecommendTemplateList" :key="item.kId">
          <div>
            <span>{{ item.name }}</span>
            <span @click="moreHandle(item)">更多</span>
          </div>
          <list-component
            :isShowFooter="false"
            :list="groupItemList(item, index)" />
        </div>
      </div>
    </el-scrollbar>
    <div class="list-wrap not-group" v-else>
      <span @click="backGroup">{{ noGroupData.name }}</span>
      <list-component
        :list="noGroupData.list"
        :loading="getListloading"
        :noMore="noMore"
        @load="getMoreData" />
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
import ListComponent from '@/components/list.vue';
import { useAsideStore } from '@/store/aside';

export default {
  components: { ListComponent },
  setup() {
    const store = useAsideStore();
    const activeName = ref('recommend');
    const isGroup = ref(true);
    const noMore = ref(false);
    const getListloading = ref(false);
    const groupRecommendTemplateList = reactive([]);
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
        console.log(res);
        getListloading.value = false;
        groupRecommendTemplateList.push(...res.data);
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
      console.log(noGroupData, item);
    }
    function backGroup() {
      isGroup.value = true;
      getMoreDataParems.pageIndex = 1;
      noGroupData.list = [];
      noMore.value = false;
      console.log(noGroupData);
    }
    function getMoreData() {
      getTemplateList();
    }
    function groupItemList(item) {
      const value = asideIsMini.value
        ? item.items.slice(0, 4)
        : item.items.slice(0, 12);
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
    };
  },
};
</script>

<style scoped lang="less">
.list-wrap {
  overflow: hidden;
  flex: 1;
  padding-right: 28px;
  display: flex;
  flex-direction: column;
  .el-scrollbar {
    height: calc(100% - 22px);
  }
}
.template-components {
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-scrollbar {
    color: red;
    .el-scrollbar__bar {
      right: 8px;
    }
  }
}
</style>
