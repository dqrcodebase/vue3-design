import { ref } from 'vue';
import getData from '@/api/index';
import { useAsideStore } from '@/store/aside';

const asideStore = useAsideStore();
export function getListOption() {
  const getListloading = ref(true);
  const noMore = ref(false);
  const getListParems = ref({
    templateType: 1,
    kId: 15,
    pageIndex: 1,
    pageSize: 50,
  });
  return {
    getListParems,
    getListloading,
    noMore,
  };
}
export async function getTemplateList(method) {
  const { getListloading, noMore, getListParems } = getListOption();
  let totalCount = 0;
  let list = [];
  getListloading.value = true;
  await getData(method, getListParems.value, { extra: true }).then((res) => {
    try {
      const { pageSize } = getListParems.value;
      getListloading.value = false;
      totalCount = res.totalCount;
      list = res.data;
      noMore.value = pageSize > list.length;
    } catch (error) {
      console.log(error);
    }
  });
  return { list, totalCount };
}
export async function changeCollectState(item) {
  const it = item;
  const params = { tId: item.tId };
  await getData('CollectTemplate', params, { extra: true }).then((res) => {
    if (res.code === 1) {
      it.isCollect = !it.isCollect;
    }
    console.log(asideStore.excludeComponent);
    asideStore.excludeComponent.push(asideStore.activeListComponent);
  });
  return it;
}

export function useKeepAlive() {
  const index = asideStore.excludeComponent.indexOf(
    asideStore.activeListComponent,
  );
  if (index !== -1) {
    asideStore.excludeComponent.splice(index, 1);
  }
}
