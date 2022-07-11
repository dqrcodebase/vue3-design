<template>
  <div class="design-wrap-aside">
    <type-select-list />
    <div class="aside-list" :class="{ 'is-hide': asideIsMini }">
      <component :is="listComponent" />
      <div class="control-aside-size" @click="changeAsideSize">
        <el-icon :size="20" color="#657097"><CaretRight /></el-icon
      ></div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useAsideStore } from '@/store/aside';
import TemplateList from './TemplateList.vue';
import TypeSelectList from './TypeSelectList.vue';

export default {
  components: { TemplateList, TypeSelectList },
  setup() {
    const listComponent = ref('TemplateList');
    const asideStore = useAsideStore();
    function changeAsideSize() {
      asideStore.asideIsMini = !asideStore.asideIsMini;
    }
    return {
      listComponent,
      asideIsMini: computed(() => asideStore.asideIsMini),
      changeAsideSize,
      asideStore,
    };
  },
};
</script>

<style scoped lang="less">
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
  z-index: 2;
  &.is-hide {
    width: 310px;
  }
  .control-aside-size {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: -30px;
    width: 42px;
    height: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: #000000;
    z-index: -1;
    border-radius: 10px;
    padding: 0px 7px;
  }
}
</style>
