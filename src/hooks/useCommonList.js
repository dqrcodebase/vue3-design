import { ref } from 'vue';

export default function() {
  const { getListParems, getListloading, noMore } = useListOption();
  console.log("🚀 ~ file: useList.js:5 ~ useListData ~ getListParems:", getListParems)

  function useListOption() {
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

  function useMoreListData() {
    getListParems.value.pageIndex += 1;
  }

  return {
    getListParems,
    getListloading,
    noMore,
    useMoreListData,
  };
}
