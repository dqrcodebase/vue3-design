import request from '@/utils/request';
import { getCookie } from '@/utils/cache';
import { tuapi, tuOd, worksapi } from './config/index';

export default function (
  method,
  data,
  { requestType = 'post', extra = false } = {
    requestType: 'post',
    extra: false,
  },
) {
  const accessToken = getCookie('iyuanwu_token');
  const config = {
    data,
    method: requestType,
    headers: {},
  };
  if (accessToken) {
    config.headers.token = accessToken;
  }
  if (tuapi[method]) {
    config.url = `${process.env.VUE_APP_TUAPI}${tuapi[method]}`;
  }
  if (tuOd[method]) {
    config.url = `${process.env.VUE_APP_TUOD}${tuOd[method]}`;
  }
  if (worksapi[method]) {
    config.url = `${process.env.VUE_APP_WORKSAPI}${worksapi[method]}`;
  }
  if (extra) {
    config.data = {
      sign: 'EBE384120060E00B6B611167D4FB9923',
      sysName: 'IYWTU',
      ts: 1657076265000,
      version: '1.0.0',
      data: {
        ...data,
      },
    };
  }

  return request(config);
}
