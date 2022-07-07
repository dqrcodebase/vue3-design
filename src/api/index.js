import request from '@/utils/request';
import { tuapi, tuOd, worksapi } from './config/index';

export default function (method, data, requestType = 'post') {
  const config = {
    data,
    method: requestType,
  };
  if (tuapi[method]) {
    config.url = `${process.env.VUE_APP_TUAPI}${tuapi[method]}`;
  }
  if (tuOd[method]) {
    config.url = `${process.env.VUE_APP_TUOD}${tuOd[method]}`;
  }
  if (worksapi[method]) {
    config.url = `${process.env.VUE_APP_WORKSAPI}${worksapi[method]}`;
    config.data = {
      sign: '6DCB46263F2B2F59ED6FB2A084C4D633',
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
