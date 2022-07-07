<template>
  <div class="design-wrap-aside">
    <div class="type-select-list">
      <ul>
        <li class="acitve">样版</li>
        <li>画廊</li>
        <li>知识产权</li>
        <li>上传</li>
      </ul>
      <div>
        <img src="" alt="" />
        登录
      </div>
    </div>
    <div class="aside-list" :class="{ 'is-hide': asideIsMini }">
      <component :is="listComponent" />
      <div class="control-aside-size" @click="changeAsideSize">{{
        asideIsMini
      }}</div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import TemplateList from './TemplateList.vue';

export default {
  components: { TemplateList },
  setup() {
    const listComponent = ref('TemplateList');
    const store = useStore();
    function changeAsideSize() {
      const asideIsMini = !store.state.asideIsMini;
      store.commit('changeAsideIsMini', asideIsMini);
    }
    return {
      listComponent,
      asideIsMini: computed(() => store.state.asideIsMini),
      changeAsideSize,
      store,
    };
  },
};
</script>

<style scoped lang="less">
.acitve {
  color: var(--main-color);
}
.type-select-list {
  height: 100%;
}
.design-wrap-aside {
  display: flex;
  height: 100%;
}
.aside-list {
  border: 1px solid #eeeeee;
  padding: 24px 0 0 28px;
  width: 838px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  &.is-hide {
    width: 310px;
  }
  .control-aside-size {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: -20px;
  }
}
</style>
