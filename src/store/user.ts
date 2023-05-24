import { store } from '@/store';
import { defineStore } from 'pinia';
import getData from '@/api/index';
import {
  setCookie,
  setLocalStorage,
  removeCookie,
  removeLocalStorage,
} from '@/utils/cache';
import { ElMessage } from 'element-plus';

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    userInfo: {},
    loginDialogState: false,
    storeToken: {
      accessToken: '',
      refreshToken: '',
      expiration: 0,
    },
  }),
  actions: {
    setCacheToken({ accessToken = '', refreshToken = '', expiration = 86400 }) {
      const expiresTime: number = expiration / 60 / 60 / 24; // validitySecond单位是秒转换为单位是天
      setCookie('iyuanwu_token', accessToken, { expires: expiresTime });
      setCookie('iyuanwu_refreshToken', refreshToken, { expires: 15 });
      setCookie('iyuanwu_expiration', expiration, { expires: expiresTime });
    },
    setStoreToken({ accessToken = '', refreshToken = '', expiration = 86400 }) {
      this.storeToken = { accessToken, refreshToken, expiration };
    },
    async getUserInfo() {
      const userData = await getData('GetUserInfo');
      if (userData.code !== 1) {
        ElMessage.error(userData.message);
        return;
      }
      const userInfo = userData.rs;
      this.setUserInfo(userInfo);
    },
    async getUserInfoAction() {
      const user = await this.getUserInfo();
      return user;
    },
    setUserInfo(userInfo: object) {
      this.userInfo = userInfo;
      setLocalStorage('userInfo', JSON.stringify(userInfo));
    },
    removeAuthCache() {
      removeCookie('iyuanwu_token');
      removeCookie('iyuanwu_refreshToken');
      removeCookie('iyuanwu_expiration');
      removeLocalStorage('userInfo');
      this.setUserInfo({});
      this.setStoreToken({ accessToken: '', refreshToken: '', expiration: 86400 });
    },
    async login(params: object) {
      try {
        const res = await getData('loginByPhone', params);
        if (!res.data) {
          return res;
        }
        const loginData = res;
        const { accessToken, refreshToken, expiration } = loginData?.data.token;
        this.setCacheToken({ accessToken, refreshToken, expiration });
        this.setStoreToken({ accessToken, refreshToken, expiration });
        this.getUserInfoAction();
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async logout() {
      const res = await this.doLogout();
      this.removeAuthCache();
      return res;
    },
    async doLogout() {
      const res = await getData('loginOut', '', { requestType: 'get' });
      return res;
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
