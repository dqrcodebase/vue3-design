import { ref } from 'vue';
import getData from '@api/index';
import { useAsideStore } from '@/store/aside';

const asideStore = useAsideStore();
export function useListOption() {
  const getListloading = ref(true);
  const noMore = ref(false);
  const getListParems = ref({
    pageIndex: 1,
    pageSize: 50,
  });
  return {
    getListParems,
    getListloading,
    noMore,
  };
}

export async function useCollectState(item) {
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

// 将组件缓存
export function useKeepAlive() {
  const index = asideStore.excludeComponent.indexOf(
    asideStore.activeListComponent,
  );
  if (index !== -1) {
    asideStore.excludeComponent.splice(index, 1);
  }
}
