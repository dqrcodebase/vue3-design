import Axios from 'axios';
import { ElNotification } from 'element-plus';
import { isNumber } from 'element-plus/es/utils';

let notification = null;
const server = Axios.create({
  timeout: 60000,
});

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
    const { data } = response;
    if (isNumber(data.data) && data.code === 1) {
      notification?.close();
      notification = ElNotification({
        title: '提示',
        message: data.msg || '未知错误',
        type: data.code === 1 ? 'success' : 'error',
      });
    }
    return data;
  },
  (error) => {
    // 对响应错误做点什么
    console.log('error', error);
    return Promise.reject(error);
  },
);
export default server;
