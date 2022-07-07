import Axios from 'axios';

const server = Axios.create({
  timeout: 6000,
});

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
