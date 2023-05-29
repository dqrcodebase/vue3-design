<template>
  <div class="type-select-list-wrap">
    <ul class="type-select-list">
      <li
        v-for="(item, index) in typeSelectList"
        :key="item.id"
        class="type-select-item"
        :class="{ active: index === asideStore.asideActiveIndex }"
        @click="selectTypeHandle(item, index)"
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

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { useAsideStore } from '@/store/aside';
import { storeToRefs } from 'pinia';
import AsideDropdown from './AsideDropdown.vue';

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
      dynamicComponent: 'RecommendTemplateList',
    },
  },
  {
    id: 'pattern',
    selectType: '图案',
    listComponentData: {
      placeholder: '图案名称',
      tabPanel: [{ id: 'RecommendPatternList', title: '推荐图案' }, { id: '', title: '收藏图案' },  { id: '', title: '我的图案' }],
      dynamicComponent: 'RecommendPatternList',
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
const { userInfo } = storeToRefs(userStore);

asideStore.asideActiveType = typeSelectList[asideStore.asideActiveIndex];
function loginHandle() {
  userStore.loginDialogState = true;
}

interface itmeProp {
  listComponentData: {
    dynamicComponent: string;
  };
}

function selectTypeHandle(item:itmeProp, index) {
  asideStore.asideActiveType = typeSelectList[asideStore.asideActiveIndex];
  asideStore.asideActiveIndex = index;
  asideStore.activeListComponent = item.listComponentData.dynamicComponent;
  asideStore.asideActiveType = item;
}
</script>

<style scoped lang="less">
@import '@styles/typeSelectList.less';
</style>
