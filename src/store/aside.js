import { store } from '@/store';
import { defineStore } from 'pinia';

export const useAsideStore = defineStore({
  id: 'app-aside',
  state: () => ({
    asideIsMini: true,
    asideActiveType: {},
    asideActiveIndex: 0,
    excludeComponent: '',
    activeListComponent: 'RecommendTemplateList',
  }),
});

// Need to be used outside the setup
export function useAsideStoreWithOut() {
  return useAsideStore(store);
}
