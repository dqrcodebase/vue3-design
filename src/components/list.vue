<template>
  <el-scrollbar>
    <div
      v-infinite-scroll="load"
      :infinite-scroll-disabled="noMore"
      :infinite-scroll-immediate="false"
      :infinite-scroll-distance="200">
      <ul class="list">
        <li class="item" v-for="item in list" :key="item.tId">
          <img class="cover" :src="item.cover" :alt="item.name" />
        </li>
      </ul>
      <div class="list-footer" v-if="isShowFooter">
        {{ !loading }}
        <p v-show="!noMore">加载中... </p>
        <p v-show="noMore">没有更多了 </p>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: true,
    },
    isShowFooter: {
      type: Boolean,
      default: true,
    },
    noMore: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['load'],
  setup() {
    function load() {
      console.log('load');
      this.$emit('load');
    }
    return {
      load,
    };
  },
};
</script>

<style scoped lang="less">
.list {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 120px);
  grid-gap: 0 12px;
}
.list-footer {
  text-align: center;
}
.item {
  width: 120px;
  height: 120px;
  vertical-align: middle;
  border-radius: 3px;
  margin-bottom: 12px;
  img {
    border-radius: 3px;
  }
}
.el-scrollbar {
  overflow: initial;
}
.el-scrollbar__bar {
  right: 8px;
}
</style>
