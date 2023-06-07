import getData from '@api/index';
import { useAsideStore } from '@/store/aside';

const asideStore = useAsideStore();

export async function useCollectState(item) {

  const it = item;
  const params = { tId: item.tId };
  await getData('CollectTemplate', params, { extra: true }).then((res) => {
    if (res.code === 1) {
      it.isCollect = !it.isCollect;
    }
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

