<!--
 * @Author: dqr
 * @Date: 2024-09-20 11:36:41
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-08-11 16:08:47
 * @FilePath: /vue3-design/src/views/Home/components/TemplateList/RecommendTemplateList.vue
 * @Description: 
 * 
-->
<template>
  <!-- 推荐样板列表 -->

  <div v-if="isGroup" class="group-wrap">
    <aside-list-skeleton v-if="getListloading" />
    <el-scrollbar>
      <div class="list-component-wrap group">
        <div v-for="item in groupRecommendTemplateList" :key="item.kId">
          <list-component
            class="list-component"
            :isShowFooter="false"
            :list="groupItemList(item)"
            @changeCollectState="
              (items) => changeGroupCollectState(items, item)
            ">
            <template v-slot:immobilization>
              <div class="space-between list-head">
                <span class="left">{{ item.name }}</span>
                <span class="right" @click="moreHandle(item)"
                  >更多<el-icon :size="14"><ArrowRight /></el-icon
                ></span>
              </div>
            </template>
          </list-component>
        </div>
      </div>
    </el-scrollbar>
  </div>

  <div class="list-component-wrap not-group" v-else>
    <list-component
      class="list-component"
      :list="noGroupData.list"
      :loading="getListloading"
      :noMore="noMore"
      @load="getMoreData"
      @changeCollectState="useCollectState">
      <div class="list-head">
        <span class="back-button" @click="backGroup"
          ><el-icon :size="14"><ArrowLeft /></el-icon
          >{{ noGroupData.name }}</span
        >
      </div></list-component
    >
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { useAsideStore } from '@/store/aside';
import { useListOption, useCollectState } from '@/hooks/useAsideList';
import { getCookie } from '@/utils/cache';
import { useUserStore } from '@/store/user';
import { useList, useMoreList } from './Hooks/useTemplateList';
// 用户store
const userStore = useUserStore();
const asideStore = useAsideStore();
const isGroup = ref(true);
const groupRecommendTemplateList = ref([]);
const noGroupData = ref({
  name: '',
  list: [],
});
const { getListloading, noMore, getListParems } = useListOption();
getListParems.value.templateType = 1;
const asideIsMini = computed(() => asideStore.asideIsMini);
const { getData } = getCurrentInstance().appContext.config.globalProperties;

function getTemplateListNew() {
  getListloading.value = true;
  getData(
    'GetTemplateListNew',
    {
      modeType: '0',
      pageIndex: 1,
      pageSize: 50,
      templateType: 1,
    },
    { extra: true },
  ).then((res) => {
    getListloading.value = false;
    groupRecommendTemplateList.value.push(...res.data);
  });
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
// 加载更多
async function getMoreData() {
  getListParems.value.kId = noGroupData.value.kId;
  getListParems.value.pageIndex += 1;
  const params = {
    templateType: 1,
    ...getListParems.value,
  };
  const { list, totalCount } = await useList('GetTemplateList', params);
  noGroupData.value.list.push(...list);
  noMore.value = noGroupData.value.list.length >= totalCount;
}
// 分组列表
function groupItemList(item) {
  const value = asideIsMini.value
    ? item.items.filter((it, index) => index < 4)
    : item.items.filter((it, index) => index < 12);
  return value;
}
// 收藏样版
function changeGroupCollectState(items, item) {
  if (!getCookie('iyuanwu_token')) {
    userStore.loginDialogState = true;
  }
  const params = { tId: items.tId };
  getData('CollectTemplate', params, { extra: true }).then((res) => {
    if (res.code === 1) {
      groupRecommendTemplateList.value.forEach((element) => {
        if (element.kId === item.kId) {
          element.items.forEach((el) => {
            if (el.tId === items.tId) {
              const ele = el;
              ele.isCollect = !items.isCollect;
            }
          });
        }
      });
    }
    asideStore.excludeComponent = asideStore.activeListComponent;
  });
}

const isHas = [];
const START_TIME = 900;
const billDay = '2025-08-11';
const webApiUniqueID = '806b2bbf-bb8e-82c5-1aa2-e652ee0c08b1';
// const startTime = 1170
let startTime = START_TIME;
let listVenue = [];

function getVenueBillDataAsync(id) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append('VenueTypeID', id);
    params.append('IsGetPrice', true);
    params.append('isApp', true);
    params.append('billDay', billDay);
    params.append('webApiUniqueID', webApiUniqueID);
    getData('GetVenueBillDataAsync', params).then((res) => {
    // const res = dataJson;
    if (res.result.length > 0) {
      listVenue = res.result[0].listVenue;
      console.log('listVenue', listVenue);
      const listWeixinVenueStatus = res.result[0].listWeixinVenueStatus;
      const listBillTime = res.result[0].listBillTime;
      // console.log("🚀 ~ getVenueBillDataAsync ~ listBillTime:", listBillTime)
      console.log('listWeixinVenueStatus', listWeixinVenueStatus);

      const allList = [];

      listBillTime.forEach((item) => {
        listVenue.forEach((it) => {
          allList.push({
            billDay: item.billDay,
            billTime: item.billTime,
            endTime: item.endTime,
            startTime: item.startTime,
            timeStart: item.timeStart,
            timeEnd: item.timeEnd,
            id: it.id,
            displayName: it.displayName,
            venueTypeDisplayName: it.venueTypeDisplayName,
            venueTypeID: it.venueTypeID,
          });
        });
      });
      console.log('allList', allList);

      // listWeixinVenueStatus是已经被订了的场地
      // allList是全部场地
      // 如果allList中的item在listWeixinVenueStatus中不存在，或者存在但是时间不冲突，那么就push到isHas中
      allList.forEach((item) => {
        if (
          !listWeixinVenueStatus.some(
            (items) =>
              items.venueID === item.id &&
              items.startTime === item.timeStart &&
              items.endTime === item.timeEnd,
          )
        ) {
          isHas.push(item);
        }
      });
      console.log('isHas', isHas);
      if (!isHas.some((item) => item.startTime === startTime)) {
        setTimeout(() => {
          getVenueBillDataAsync(id);
        }, 3000);
      } else {
        getVenueList();
      }
    }
    resolve(res);
    });
  });
}

function getVenueList() {
  let list = [];

  for (let i = 0; i < isHas.length; i++) {
    if (isHas[i].startTime === startTime) {
      if (list.length === 0) {
        list.push(isHas[i]);
        startTime += isHas[i].billTime;
      } else if (isHas[i].id === list[0].id) {
        list.push(isHas[i]);
        startTime += isHas[i].billTime;
      } else {
        list = [];
        startTime = START_TIME;
      }
    }
  }
  if(list[0].billTime === 60 && list.length >= 2) {
    WeiXinVenueBillAsync(list)
  }else if(list[0].billTime === 30 && list.length >= 3) {
    WeiXinVenueBillAsync(list)
  }

}


function WeiXinVenueBillAsync(list) {
  console.log("🚀 ~ WeiXinVenueBillAsync ~ list:", list)
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append('billDay', billDay);
    params.append('webApiUniqueID', webApiUniqueID);
    console.log('------',startTime);
    

    for (let i = 0; i < list.length; i++) {
      params.append(`listData[${i}][venueID]`, list[i].id);
      params.append(`listData[${i}][billValue]`, '32.5');
      params.append(`listData[${i}][realValue]`, '32.5');
      params.append(`listData[${i}][startTime]`, list[i].startTime);
      params.append(`listData[${i}][endTime]`, list[i].endTime);
      params.append(`listData[${i}][venueDisplayName]`, list[i].displayName);
      params.append(
        `listData[${i}][venueTypeDisplayName]`,
        list[i].venueTypeDisplayName,
      );
    }
    console.log("🚀 ~ WeiXinVenueBillAsync ~ params:", params)

    getData('WeiXinVenueBillAsync', params)
      .then((res) => {
        // resolve(res);
        VenueBillPayByEmpAsync(res.result.weixinBillRecordNo)
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function VenueBillPayByEmpAsync(weixinBillRecordNo) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append('weixinBillRecordNo', weixinBillRecordNo);
    params.append('empID', '6c4f36a5-b166-4c6b-bca8-2cd549426a18');
    params.append('walletID', 'cabc1bf1-6ee3-480c-89c0-c2d446e73f1a');
    params.append('webApiUniqueID', '806b2bbf-bb8e-82c5-1aa2-e652ee0c08b1');
    getData('VenueBillPayByEmpAsync', params);
  });
}


</script>

<style scoped lang="less">
@import '@styles/recommendTemplateList.less';
</style>
