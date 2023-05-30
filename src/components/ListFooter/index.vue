<template>
  <div class="list-footer">
    <p v-show="!noMore"
      >加载中...<el-icon><Loading /></el-icon>
    </p>
    <p v-show="noMore">没有更多了 </p>
  </div>
</template>

<script setup>
defineProps({
  noMore: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="less" scoped>
.list-footer {
  text-align: center;
  font-size: 14px;
  p {
    text-align: center;
    color: #666e88;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: -17px;
  }
}
</style>
