/*
 * @Author: dqr
 * @Date: 2024-09-20 11:32:09
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-08-06 16:47:50
 * @FilePath: /vue3-design/src/api/index.ts
 * @Description: 
 * 
 */
import request from '@/utils/request.js';
import { getCookie } from '@/utils/cache.js';
import { tuapi, tuOd, worksapi, accountapi, gatewayapi ,hydapi,xmgrwhgapi} from './config/index.js';
import { options } from 'less';

type config = {
  method: string;
  url: string;
  params?: any;
  data?: any;
  headers?: any;
}

export default function (
  method,
  data,
  { requestType = 'post', extra = false } = options,
) {

  const accessToken = getCookie('iyuanwu_token');
  const config: config = {
    method: requestType,
    url:'',
    headers: {
    },
  };
  if(requestType === 'get') {
    config.params = data;
  }else {
    config.data = data;
  }
  // if (accessToken) {
  //   config.headers.token = accessToken;
  // }
  if (tuapi[method]) {
    config.url = `${process.env.VUE_APP_TUAPI}${tuapi[method]}`;
  }
  if (tuOd[method]) {
    config.url = `${process.env.VUE_APP_TUOD}${tuOd[method]}`;
  }
  if (worksapi[method]) {
    config.url = `${process.env.VUE_APP_WORKSAPI}${worksapi[method]}`;
  }
  if (accountapi[method]) {
    config.url = `${process.env.VUE_APP_ACCOUNTAPI}${accountapi[method]}`;
  }
  if (gatewayapi[method]) {
    config.url = `${process.env.VUE_APP_GATEWAYAPI}${gatewayapi[method]}`;
  }
  if (hydapi[method]) {
    config.url = `${process.env.VUE_APP_HYDA}${hydapi[method]}`;
  }
  if (xmgrwhgapi[method]) {
    config.url = `${process.env.VUE_APP_XMGRWHG}${xmgrwhgapi[method]}`;
  }
  if (extra) {
    config.data = {
      sign: 'EBE384120060E00B6B611167D4FB9923',
      sysName: 'IYWTU',
      ts: 1657076265000,
      version: '1.0.0',
      data: data
    };
  }

  return request(config);
}
