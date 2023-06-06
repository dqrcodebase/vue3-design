import getData from '@api/index';
import {
  useListOption,
} from '@/hooks/useAsideList';

export async function useMoreList() {
  const { noMore } = useListOption();
  console.log('🚀 ~ file: useTemplateList.js:8 ~ useMoreList ~ noMore:', noMore);
  noMore.value = true;
}

export async function useList(method, params) {

  let list = [];
  let totalCount = 0;

  await getData(method, params, { extra: true }).then((res) => {
    try {
      totalCount = res.totalCount;
      list = res.data;
    } catch (error) {
      console.log(error);
    }
  });
  
  return { list, totalCount };
}
