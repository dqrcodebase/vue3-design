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
.aside-dropdown {
  &.el-popover {
    width: 98px;
    min-width: 98px;
    padding: 5px 0;
  }
  .entrance-list {
    width: 100%;
    .entrance-item {
      width: 100%;
      color: #666e88;
      font-size: 12px;
      line-height: 36px;
      padding: 0 15px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        color: var(--main-color);
        background-color: var(--main-bg-color);
      }
    }
  }
}
</style>
