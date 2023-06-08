import { ref } from 'vue';

export default function () {
  const { getListParems, getListloading, noMore, noGroupData, isGroup,defaultList,totalListCount } =
    useListOption();

  function useListOption() {
    const getListloading = ref(true);
    const noMore = ref(false);
    const getListParems = ref({
      pageIndex: 1,
      pageSize: 20,
    });
    const noGroupData = ref({
      name: '',
      list: [],
    });
    // 当前列表是否分组
    const isGroup = ref(true);
    const defaultList = ref([]);
    const totalListCount = ref(0);

    return {
      getListParems,
      getListloading,
      noMore,
      noGroupData,
      isGroup,
      defaultList,
      totalListCount
    };
  }

  // 加载更多列表数据
  function useMoreListData() {
    getListParems.value.pageIndex += 1;
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

  // 处理列表在侧边栏是展开还是收起状态的展示数量
  function groupItemList(item,asideIsMini) {
    console.log("🚀 ~ file: useCommonList.js:53 ~ groupItemList ~ asideIsMini:", asideIsMini)
    const value = asideIsMini
      ? item.items.filter((it, index) => index < 4)
      : item.items.filter((it, index) => index < 12);
    return value;
  }

  return {
    getListParems,
    getListloading,
    noMore,
    noGroupData,
    isGroup,
    defaultList,
    totalListCount,
    useMoreListData,
    moreHandle,
    backGroup,
    groupItemList,
  };
}
