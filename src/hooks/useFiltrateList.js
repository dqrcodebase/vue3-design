import getData from '@/api/index';
import {
  useListOption,
} from '@/hooks/useAsideList';

export async function useFiltrateList(method) {
  const { getListloading, noMore, getListParems } = useListOption();
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
