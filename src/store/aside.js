import { store } from '@/store';
import { defineStore } from 'pinia';

export const useAsideStore = defineStore({
  id: 'app-aside',
  state: () => ({
    // 列表展示区域是否为mini模式
    asideIsMini: true,
    // 当前选择的侧边栏类型数据
    asideActiveType: {},
    // 当前列表展示的索引
    asideActiveIndex: 0,
    // 不进行缓存的组件
    excludeComponent: ['CollectTemplateList'],
    // 当前激活的组件
    activeListComponent: 'RecommendTemplateList',
  }),
});

// Need to be used outside the setup
export function useAsideStoreWithOut() {
  return useAsideStore(store);
}
