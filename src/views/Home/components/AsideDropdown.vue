<template>
  <el-popover
    popper-class="aside-dropdown"
    :width="98"
    placement="right"
    trigger="hover">
    <template #reference>
      <slot></slot>
    </template>
    <ul class="entrance-list">
      <li class="entrance-item">新品库</li>
      <li class="entrance-item" @click="logout">退出登录</li>
    </ul>
  </el-popover>
</template>

<script setup>
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
function logout() {
  userStore.logout().then((res) => {
  });
}
</script>

<style lang="less">
@import '@styles/asideDropdown.less';
</style>
