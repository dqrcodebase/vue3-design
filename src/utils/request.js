import Axios from 'axios';
import { ElNotification } from 'element-plus'

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
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    console.log('error', error);
    return Promise.reject(error);
  },
);
export default server;
