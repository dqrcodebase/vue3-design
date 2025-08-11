<script setup>
import { onMounted, getCurrentInstance } from 'vue';
import { setCookie } from '@/utils/cache';
import moment from 'moment';
const { getData } = getCurrentInstance().appContext.config.globalProperties;
const START_TIME = 1170;
// billDay是当前日期的后一天
const billDay = moment().add(1, 'day').format('YYYY-MM-DD');
const webApiUniqueID = '806b2bbf-bb8e-82c5-1aa2-e652ee0c08b1';
const interval = 1000 * 60 * 3
let isOk = false;

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
    getData('GetVenueBillDataAsync', params).then((res) => {
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
        if (!isHas.some((item) => item.startTime === START_TIME) && !isOk) {
          setTimeout(() => {
            getVenueBillDataAsync(id);
          }, interval);
        } else {
          getVenueList(isHas);
        }
      }
      resolve(res);
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
  if (list.length === 0) {
    return;
  }
  console.log('-------------',list);
  

  if (list[0].billTime === 60 && list.length >= 2) {
    WeiXinVenueBillAsync(list);
  } else if (list[0].billTime === 30 && list.length >= 3) {
    WeiXinVenueBillAsync(list);
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
        GetWeiXinVenueBillOrderByRecordNoAsync(res.result)
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function GetWeiXinVenueBillOrderByRecordNoAsync(result) {
  const params = new URLSearchParams();
    params.append('value', result.billRecordNo);
    params.append('webApiUniqueID', webApiUniqueID);
    getData('GetWeiXinVenueBillOrderByRecordNoAsync', params).then((res) => {
      VenueBillPayByEmpAsync(res.result)
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
      isOk = true;
    })
  });
}

function start() {
  //  A区
  getVenueBillDataAsync('2e3fd9d7-9287-4c83-8d8c-b508c6813815');
  // B1区
  getVenueBillDataAsync('0611b4da-605a-4fd0-9c8f-bbfa44934015');
  // // B2区
  getVenueBillDataAsync('27ac1281-76eb-4981-a917-cc154da3da98');
  // // C区
  getVenueBillDataAsync('8347e522-aee0-42a3-9ec1-be12a70b24fb');
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
    'N6m4ss_D8Ts2DlvErO_djv10TQy2yqXkF0Adtr0NZ6xwuwMxlfEnMHLh0-DsKE3zWYCd-g3Tsu_7x1txwYJk3LbuccilErsbm7NHYD6ZCdKvjGtRC0IZ6fI26SWiRpLnrOakMECulTMIKg3i364yIokRkf9pjCuTjz6caQDS6tjN-ZTMQ-cspBZw6F2IA2L_OvzrLs-Ak_JXS5rClREkifLbwxkIYumSLcaH_GzPL16mCXo-PeZkTjAqyNTJytpzLP0UKA82ejPHqzHMoMhuHcoNlnpSSxFY9bQZ5N9XerU5QIKqTkuP6jHID0oswzMSwIEY2TTHNnPt8imk2KUDKoEMUFL4A6NtDsoLatODIZoXAmPZ4YjTprjYZ7bYPm6n39ljYypVvG4Q69fWSCFlyQqmBRk4n0J1eAfL4lc_c36yO7u9c1C2ro_2EgJS2y-QS6K2Eu05lX4nRtzGyK7fTEXzp0I_-JthzvznXc2XB1DhIovVSj8RPYItbq7CqSdnjdUhNP40yOFrgOcRPnFDafQnd0AYUonjJ_6QUomlSXS1t7ys0rgTt30K_3RQTBfeddMNN-nx1BZdYai6dLu76mz1We1aJBUq0qKMCwTWDn_51-Jm',
  );
  setCookie(
    '__RequestVerificationToken_L1hNVFlaWA2',
    '6BbK3wkvrt0OGqIt8zjlJsa5VR2gn45s1mhvPObdZjzRrRkBm0hdGrOODQkBkEF6MTslB1IJmDF85Lhn9r-Q7TChEXc1',
  );
  setCookie(
    'XSRF-TOKEN',
    '-_kztCTJ2Yh12syTTjAvijb0sSWy7bBGZNstByOGKJSOIOjUvOlwrd6tivxJM7_3LadKtMhL8fLhlOIvnATaEo__kEG8j5sjVU5gGenapTmSeVI1tipgkhvfC49vmUl34KtbxA2',
  );

  // const params = new URLSearchParams();
  // params.append('webApiUniqueID', '806b2bbf-bb8e-82c5-1aa2-e652ee0c08b1');
  // getData('GetShopBillVenueTypeAsync', params);

  // const params = new URLSearchParams();
  // params.append('webApiUniqueID', '806b2bbf-bb8e-82c5-1aa2-e652ee0c08b1');
  // params.append('id', '08abed5d-6e76-4c7a-a1a2-aeaf38a38a0d');
  // getData('GetEntityByIdAsync', params);

  //  start();
  // 每天11点50分启动
  // setInterval(() => {
  //   const date = new Date();
  //   const hour = date.getHours();
  //   const minute = date.getMinutes();
  //   console.log("🚀 ~ minute:", minute)
  //   if (hour === 11 && minute === 50) {
  //     start();
  //   }
  // }, 60000);

 
});
</script>

<template>
  <div> </div>
</template>

<style scoped lang="scss"></style>
