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

<script lang="ts" setup>
import { computed } from 'vue';
import { useUserStore } from '@/store/user.js';
import { getCookie } from '@/utils/cache.js';
import MainHeader from '@/components/MainHeader';
import LoginDialog from '@/components/LoginDialog';
import DesignAside from './components/DesignAside';

const userStore = useUserStore();
const accessToken = getCookie('iyuanwu_token');
const refreshToken = getCookie('iyuanwu_refreshToken');
const expiration = getCookie('iyuanwu_expiration');

if (accessToken) {
  userStore.setStoreToken({ accessToken, refreshToken, expiration });
  userStore.getUserInfo();
}
const loginDialogState = computed(() => userStore.loginDialogState);
</script>
<style lang="less" scoped>
@import '@styles/index.less';
</style>
