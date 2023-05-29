<template>
  <!-- 列表切换组件 -->

  <div class="tab-panel">
    <span
      v-for="item in tabsPanel"
      :key="item.id"
      :class="{ active: activePanel === item.id }"
      class="cursor-pointer"
      @click="changeTabPanel(item)"
      >{{ item.title }}</span
    >
  </div>
</template>

<script setup>
defineProps({
  tabsPanel: {
    type: Array,
    default() {
      return [];
    },
  },
  activePanel: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['changeTabPanel']);
function changeTabPanel(item) {
  console.log('🚀 ~ file: ListTabPanel.vue:29 ~ changeTabPanel ~ item:', item);
  emit('changeTabPanel', item);
}
</script>

<style scoped lang="less">
@import '@styles/listTabPanel.less';
</style>
