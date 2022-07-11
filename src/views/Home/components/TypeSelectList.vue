<template>
  <div class="type-select-list-wrap">
    <ul class="type-select-list">
      <li class="type-select-item acitve">样版</li>
      <li class="type-select-item">图案</li>
      <li class="type-select-item">IP</li>
      <li class="type-select-item">上传</li>
    </ul>
    <div class="login-button">
      <div @click="loginHandle" v-if="!userInfo.smallHeadImg">
        <img
          class="login-img"
          src="@/assets/images/home/loginHead.png"
          alt="" />
        <div>登录</div>
      </div>
      <div v-else>
        <aside-dropdown>
          <img class="login-img" :src="userInfo.smallHeadImg" alt="头像" />
        </aside-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/store/user';
import { computed } from 'vue';
import AsideDropdown from './AsideDropdown.vue';

export default {
  components: { AsideDropdown },
  setup() {
    const userStore = useUserStore();

    function loginHandle() {
      userStore.loginDialogState = true;
    }
    return {
      userInfo: computed(() => userStore.userInfo),
      loginHandle,
    };
  },
};
</script>

<style scoped lang="less">
.type-select-list-wrap {
  height: 100%;
  position: relative;
  padding: 0 18px;
  overflow: hidden;
  .type-select-list {
    .type-select-item {
      padding: 18px 0;
      font-size: 14px;
      text-align: center;
      color: #666e88;
      &.acitve {
        color: var(--main-color);
      }
    }
  }
  .login-button {
    position: absolute;
    bottom: 20px;
    font-size: 12px;
    color: #666e88;
    text-align: center;
    left: 50%;
    transform: translate(-50%, 0);
    white-space: nowrap;
    cursor: pointer;
    .login-img {
      width: 32px;
      height: 32px;
      border: 1px solid #eee;
      border-radius: 50%;
    }
  }
}
</style>
