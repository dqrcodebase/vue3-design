import { store } from '@/store';
import { defineStore } from 'pinia';
import getData from '@/api/index';
import { setCookie, setLocalStorage } from '@/utils/cache';

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    userInfo: {},
    loginDialogState: false,
  }),
  actions: {
    setAuthInfo({ accessToken, refreshToken, validitySecond }) {
      const expiresTime = validitySecond / 60 / 60 / 24; // validitySecond单位是秒转换为单位是天
      setCookie('iyuanwu_token', accessToken, { expires: expiresTime });
      setCookie('iyuanwu_refreshToken', refreshToken, { expires: 15 });
      setCookie('iyuanwu_expiration', validitySecond, { expires: expiresTime });
    },
    async getUserInfo() {
      const userData = await getData('GetUserInfo');
      const userInfo = userData.rs;
      this.setUserInfo(userInfo);
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      setLocalStorage('userInfo', JSON.stringify(userInfo));
    },
    login(params) {
      return new Promise((resolve) => {
        getData('loginByPhone', params).then((res) => {
          if (!res.rs) {
            resolve(res);
            return;
          }
          const loginData = res;
          const {
            access_token: accessToken,
            refresh_token: refreshToken,
            validitySecond,
          } = loginData?.rs;
          this.setAuthInfo({ accessToken, refreshToken, validitySecond });
          this.setUserInfo();
          resolve(res);
        });
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
