<!--
 * @Author: dqr
 * @Date: 2025-08-11 16:12:01
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-08-18 17:24:40
 * @FilePath: /vue3-design/src/views/VenueList.vue
 * @Description: 
 * 
-->
<script setup>
import { onMounted, getCurrentInstance } from 'vue';
import { setCookie } from '@/utils/cache';
import moment from 'moment';
const { getData } = getCurrentInstance().appContext.config.globalProperties;
const START_TIME = 1170;
// const START_TIME = 1200;
// billDay是当前日期的后一天
const billDay = moment().add(1, 'day').format('YYYY-MM-DD');
// const billDay = moment().format('YYYY-MM-DD');
const webApiUniqueIDList = ['806b2bbf-bb8e-82c5-1aa2-e652ee0c08b1'];
let webApiUniqueIDIndex = 0;
const webApiUniqueID = webApiUniqueIDList[webApiUniqueIDIndex];
const interval = 1000 * 60 * 1;
let isOk = false;
let isOkVenueId = '';

const idList = [
  '2e3fd9d7-9287-4c83-8d8c-b508c6813815',
  '0611b4da-605a-4fd0-9c8f-bbfa44934015',
  '27ac1281-76eb-4981-a917-cc154da3da98',
  '8347e522-aee0-42a3-9ec1-be12a70b24fb',
];
let idIndex = 0;

function getVenueBillDataAsync(id) {
  let listVenue = [];
  const isHas = [];

  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append('VenueTypeID', id);
    params.append('IsGetPrice', true);
    params.append('isApp', true);
    params.append('billDay', billDay);
    params.append('webApiUniqueID', webApiUniqueID);
    getData('GetVenueBillDataAsync', params)
      .then((res) => {
        // const res = dataJson;
        if (res.result.length > 0) {
          listVenue = res.result[0].listVenue;
          // console.log('listVenue', listVenue);
          const listWeixinVenueStatus = res.result[0].listWeixinVenueStatus;
          const listBillTime = res.result[0].listBillTime;
          // console.log("🚀 ~ getVenueBillDataAsync ~ listBillTime:", listBillTime)
          // console.log('listWeixinVenueStatus', listWeixinVenueStatus);

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
          // console.log('allList', allList);

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
          console.log('🚀 ~ getVenueBillDataAsync ~ isHas:', isHas);

          if (!isHas.some((item) => item.startTime === START_TIME) && !isOk) {
            setTimeout(() => {
              // 打印当前时间
              console.log('当前时间:', moment().format('YYYY-MM-DD HH:mm:ss'));
              idIndex++;
              if (idIndex >= idList.length) {
                idIndex = 0;
              }
              getVenueBillDataAsync(idList[idIndex]);
            }, interval);
          } else {
            isOkVenueId = id;
            getVenueList(isHas);
          }
        } else {
          setTimeout(() => {
            console.log('当前时间:', moment().format('YYYY-MM-DD HH:mm:ss'));
           againGetVenueBillDataAsync();
          }, interval);
        }
        resolve(res);
      })
      .catch((err) => {
        getVenueBillDataAsync(id);
      });
  });
}

function getVenueList(isHas) {
  let list = [];
  let startTime = START_TIME;

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

  if (list[0].billTime === 60 && list.length >= 2) {
    WeiXinVenueBillAsync(list);
  } else if (list[0].billTime === 30 && list.length >= 3) {
    WeiXinVenueBillAsync(list);
  } else {
    againGetVenueBillDataAsync();
  }
}

function WeiXinVenueBillAsync(list) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append('billDay', billDay);
    params.append('webApiUniqueID', webApiUniqueID);

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
    console.log('🚀 ~ WeiXinVenueBillAsync ~ params:', params);

    getData('WeiXinVenueBillAsync', params)
      .then((res) => {
        GetWeiXinVenueBillOrderByRecordNoAsync(res.result);
      })
      .catch((err) => {
       againGetVenueBillDataAsync();
        // reject(err);
      });
  });
}
function GetWeiXinVenueBillOrderByRecordNoAsync(result) {
  const params = new URLSearchParams();
  params.append('value', result.billRecordNo);
  params.append('webApiUniqueID', webApiUniqueID);
  getData('GetWeiXinVenueBillOrderByRecordNoAsync', params).then((res) => {
    VenueBillPayByEmpAsync(res.result);
  }).catch((err) => {
    againGetVenueBillDataAsync();
  })
}

function VenueBillPayByEmpAsync(result) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append('weixinBillRecordNo', result.billRecordNo);
    params.append('empID', result.listPayInfo[0].empID);
    params.append('walletID', result.listPayInfo[0].walletID);
    params.append('webApiUniqueID', webApiUniqueID);
    getData('VenueBillPayByEmpAsync', params).then((res) => {
      webApiUniqueIDIndex++;
      if (webApiUniqueIDIndex >= webApiUniqueIDList.length) {
        isOk = true;
      } else {
        getVenueBillDataAsync(isOkVenueId).catch((err) => {
          againGetVenueBillDataAsync();
        })
      }
    });
  });
}

function againGetVenueBillDataAsync() {
  idIndex++;
  getVenueBillDataAsync(idList[idIndex]);
}

function start() {
  //  A区
  // getVenueBillDataAsync(idList[idIndex]);
  // // A区
  getVenueBillDataAsync('2e3fd9d7-9287-4c83-8d8c-b508c6813815');
  // // B1区
  // getVenueBillDataAsync('0611b4da-605a-4fd0-9c8f-bbfa44934015');
  // // // B2区
  // getVenueBillDataAsync('27ac1281-76eb-4981-a917-cc154da3da98');
  // // // C区
  // getVenueBillDataAsync('8347e522-aee0-42a3-9ec1-be12a70b24fb');
}

onMounted(async () => {
  setCookie('HT.LoginType.1', '20');
  setCookie('authorized-token', 'eyJhbGciOiJIUzUxMiJ9.common');
  setCookie('HT.App.Type.1', '10');
  setCookie('Weixin.ServiceType.1', '20');
  setCookie('HT.Weixin.AppID.1', 'wxa6382ec61ee0837f');
  setCookie('HT.Weixin.OpenID.1', 'o4XV71FkDeLfWacWmQvk0WnE-hYs');
  setCookie('HT.EmpID.1', '6c4f36a5-b166-4c6b-bca8-2cd549426a18');
  setCookie('HT.IsTrainer.1', 'False');
  setCookie('HT.PartID.1', '29ceadd7-c18d-47c6-ad54-859b5f6ee93e');
  setCookie('HT.PartDisplayName.1', '%e9%bb%98%e8%ae%a4%e5%88%86%e9%83%a8');
  setCookie('HT.ShopID.1', 'd47c81fe-0624-4717-b051-53751641468f');
  setCookie('HT.ShopDisplayName.1', '%e5%be%ae%e4%bf%a1%e5%88%86%e5%ba%97');
  setCookie('ASP.NET_SessionId', 'ijbqacr3uqsqjzf322bp2g3r');
  setCookie(
    '.AspNet.ApplicationCookie',
    'VAd2RNdGBB3iSsOEeY9e-Zo3BzFjNCtd4fNCN7z5T_MhVArS7qzpJIFKjE4Pvi2BGcvpqPnZnaJAf2dZHAPyVrGFNHfNHnplvgQgkd6Bq0bw24WibiByi0X-IRPzMjywLSctut8p_tloxS-PriWePJzxk618oly4AjJWPVFeXVoIKXsUgS7pgoBgjsOTZkIY2NbNVueKkp7YcJg9CnQLP2uruIT0hWdukD-ajdhWZrV0Lz7fMrFlKWQaz0noizOkc0oLAAIs-3b-OOLXy06BzV_HODTKPrpvSBf5pcRCcULB6BQsIE6gqupL1LsSZlYhFTuqKQUGEWv2EjVDFizuLsxDwmp9d6sEwbpjzhScAQuz70GeumRD-UlWIQyALl2z7g1vFgNZ3ktVW67c4zRS9Go3eV-1rQZ-AFsMnWQGHx780CbdryvVQD1L1XvFO6SAxpqyK3NDgk5wKNp6KrcdC1-JOv87VAzh3HiK6fvih0rqeZalZjhXVQ0cJ4qmUeOTCvARkZXN2c-NNTgqSU6c43LqwFq3Wy4ByzjX-Vilut46MUwm2b3M8PYwl1KBBKheKx2Ri4Otbnlt3bo1SC1dwwrciS3wjhQoNYHzoOiBO-AXwGBH',
  );
  setCookie(
    '__RequestVerificationToken_L1hNVFlaWA2',
    'xnWT58b9OmmqXonta547kaxxkTAgdgEymwd1Iww0LtcM2tkgmB8xYE0CcfM4gDb8XYHIaHHOmm0_IPhh9tP-G6OOGJ01',
  );
  setCookie(
    'XSRF-TOKEN',
    'kmdD6g8nyNK3WCPAx3f6TZBIkuTRm1YL5kINMNaM7hobSAEwMw0FuFwnH6aXyEWuyRQDK2sa66nhpgW8a3hIbU1i_H0F8dErLlbYfZ-ooMN1SROVKviJm4XA-Cyj_mJHPkC-Ng2',
  );

  const ws = new WebSocket('ws://localhost:3000');

  ws.onopen = () => console.log('已连接服务器');
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'task') {
      console.log('收到后端触发消息: ' + data.message);
      start();
    }
  };
});
</script>

<template>
  <button @click="start" style="font-size: 30px; margin: 100px 0 0 100px">
    开始
  </button>
</template>

<style scoped lang="scss"></style>
