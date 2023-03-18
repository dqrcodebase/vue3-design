<template>
  <!-- 骨架屏组件 -->

  <el-skeleton class="aside-list-skeleton" :loading="loading" animated>
    <template #template>
      <el-skeleton-item v-for="item in 48" :key="item" />
    </template>
  </el-skeleton>
</template>

<script setup>
defineProps({
  skeletonItemNumm: {
    type: Number,
    default: 48,
  },
})
</script>

<style scoped lang="less">
.aside-list-skeleton {
  width: 100%;
  padding-right: 28px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .el-skeleton__item {
    width: 120px;
    height: 120px;
    margin-bottom: 10px;
  }
}
</style>
