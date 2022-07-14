<template>
  <div class="type-select-list-wrap">
    <ul class="type-select-list">
      <li
        v-for="(item, index) in typeSelectList"
        :key="item.id"
        class="type-select-item"
        :class="{ active: index === asideActiveIndex }"
        >{{ item.selectType }}</li
      >
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
import { useAsideStore } from '@/store/aside';
import { computed } from 'vue';
import AsideDropdown from './AsideDropdown.vue';

export default {
  components: { AsideDropdown },
  setup() {
    const typeSelectList = [
      {
        id: 'template',
        selectType: '样版',
        listComponentData: {
          placeholder: '样版名称',
          tabPanel: [
            { id: 'RecommendTemplateList', title: '推荐样版' },
            { id: 'CollectTemplateList', title: '收藏样版' },
            { id: 'OneselfTemplateList', title: '我的样版' },
          ],
        },
      },
      {
        id: 'pattern',
        selectType: '图案',
        listComponentData: {
          placeholder: '图案名称',
          tabPanel: ['推荐图案', '收藏图案', '我的图案'],
        },
      },
      {
        id: 'ip',
        selectType: 'IP',
        listComponentData: {
          placeholder: 'IP名称',
          tabPanel: ['推荐IP', '收藏IP'],
        },
      },
      {
        id: 'upload',
        selectType: '上传',
        listComponentData: {
          placeholder: '图案名称',
          tabPanel: ['参考资料', '图案作品'],
        },
      },
    ];
    const userStore = useUserStore();
    const asideStore = useAsideStore();
    asideStore.asideActiveType = typeSelectList[asideStore.asideActiveIndex];
    function loginHandle() {
      userStore.loginDialogState = true;
    }
    return {
      userInfo: computed(() => userStore.userInfo),
      asideActiveIndex: computed(() => asideStore.asideActiveIndex),
      typeSelectList,
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
      cursor: pointer;
      &.active {
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
