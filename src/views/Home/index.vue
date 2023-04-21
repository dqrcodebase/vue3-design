<template>
  <div class="design">
    <el-container>
      <el-header class="header"> <main-header /> </el-header>
      <el-container class="main">
        <el-aside class="aside"><design-aside /></el-aside>
        <el-main class="design-content">
          <main></main>
        </el-main>
      </el-container>
    </el-container>
    <login-dialog v-if="loginDialogState" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useUserStore } from '@/store/user';
import { getCookie } from '@/utils/cache';
import MainHeader from '@/components/MainHeader.vue';
import LoginDialog from '@/components/LoginDialog.vue';
import DesignAside from './components/DesignAside.vue';

export default {
  name: 'Home',
  components: { DesignAside, MainHeader, LoginDialog },
  setup() {
    const userStore = useUserStore();
    const accessToken = getCookie('iyuanwu_token');
    const refreshToken = getCookie('iyuanwu_refreshToken');
    const expiration = getCookie('iyuanwu_expiration');

    if (accessToken) {
      userStore.setStoreToken({ accessToken, refreshToken, expiration });
      userStore.getUserInfo();
    }
    return {
      loginDialogState: computed(() => userStore.loginDialogState),
    };
  },
};
</script>
<style lang="less" scoped>
.design {
  height: 100%;
  .is-vertical {
    height: 100%;
  }
}
.main {
  height: calc(100% - 60px);
}
.el-aside {
  width: auto;
  overflow: initial;
}
.header,
.aside,
.design-content {
  border: 1px solid #eeeeee;
  border-radius: 4px;
}
</style>
