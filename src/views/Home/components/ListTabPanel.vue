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
  console.log("🚀 ~ file: ListTabPanel.vue:29 ~ changeTabPanel ~ item:", item)
  emit('changeTabPanel', item);
}
</script>

<style scoped lang="less">
.tab-panel {
  border-radius: 4px;
  border: 1px solid #f6f6f9;
  background: #f6f6f9;
  color: #666e88;
  display: flex;
  margin: 24px 28px 0 0;
  cursor: pointer;

  .cursor-pointer {
    flex: 1;
    text-align: center;
    line-height: 40px;
    font-size: 14px;

    &.active {
      color: var(--main-color);
      background-color: #ffffff;
      font-weight: 700;
    }
  }
}
</style>
