<template>
  <div class="show-empty-data">
    <img class="empty-data-img"
         :src="noDataImg"
         alt="">
    <div class="empty-box">
      <div class="empty-data-text">{{noDataText}}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  noDataText: {
    type: String,
    default: '暂无内容哦',
  },
  noDataImg: {
    type: String,
    default: require('./noData.svg'),
  },
});
</script>

<style scoped lang="less">
.show-empty-data {
  text-align: center;
  font-size: 0;
  .empty-box {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }
  .empty-data-text {
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666e88;
  }
}
.empty-data-img {
  width: 80px;
  height: 86px;
  display: inline-block;
}
</style>
