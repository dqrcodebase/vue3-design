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
  }),
  actions: {
    setToken({ accessToken, refreshToken, validitySecond }) {
      const expiresTime = validitySecond / 60 / 60 / 24; // validitySecond单位是秒转换为单位是天
      setCookie('iyuanwu_token', accessToken, { expires: expiresTime });
      setCookie('iyuanwu_refreshToken', refreshToken, { expires: 15 });
      setCookie('iyuanwu_expiration', validitySecond, { expires: expiresTime });
    },
    async getUserInfo() {
      const userData = await getData('GetUserInfo');
      if (userData.code !== 1) {
        ElMessage.error(userData.msg);
        return;
      }
      const userInfo = userData.rs;
      this.setUserInfo(userInfo);
    },
    async getUserInfoAction() {
      const user = await this.getUserInfo();
      return user;
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      setLocalStorage('userInfo', JSON.stringify(userInfo));
    },
    removeAuthCache() {
      removeCookie('iyuanwu_token');
      removeCookie('iyuanwu_refreshToken');
      removeCookie('iyuanwu_expiration');
      removeLocalStorage('userInfo');
    },
    async login(params) {
      try {
        const res = await getData('loginByPhone', params);
        if (!res.rs) {
          return res;
        }
        const loginData = res;
        const {
          access_token: accessToken,
          refresh_token: refreshToken,
          validitySecond,
        } = loginData?.rs;
        this.setToken({ accessToken, refreshToken, validitySecond });
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
      const res = await getData('DiscardToken', '', { requestType: 'get' });
      return res;
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
