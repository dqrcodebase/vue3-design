import Axios from 'axios';
import { getCookie } from '@/utils/cache';

const server = Axios.create({
  timeout: 6000,
});
const accessToken = getCookie('iyuanwu_token');
if (accessToken) {
  server.defaults.headers.token = accessToken;
}

server.interceptors.request.use(
  (config) => {
    // do something before request is sent
    console.log(server.defaults.headers);

    return config;
  },
  (error) => {
    // do something with request error
    console.log('request', error); // for debug
    return Promise.reject(error);
  },
);

server.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    console.log('response', response);
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    console.log('error', error);
    return Promise.reject(error);
  },
);
export default server;
