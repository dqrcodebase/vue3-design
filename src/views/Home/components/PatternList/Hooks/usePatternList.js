import getData from '@api/index';
import {
  useListOption,
} from '@/hooks/useAsideList';

export async function useMoreList() {
  const { noMore } = useListOption();
  noMore.value = true;
}

export async function useList(method, params) {

  let list = [];
  let totalCount = 0;

  await getData(method, params, { extra: false }).then((res) => {
    try {
      totalCount = res.totalCount;
      list = res.rs;
    } catch (error) {
      console.log(error);
    }
  });
  
  return { list, totalCount };
}
