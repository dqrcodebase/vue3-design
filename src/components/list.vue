<template>
  <slot class="pd-b"></slot>
  <el-scrollbar class="list-scrollbar">
    <slot class="pd-b" name="immobilization"></slot>
    <div
      v-infinite-scroll="load"
      :infinite-scroll-disabled="noMore"
      :infinite-scroll-immediate="false"
      :infinite-scroll-distance="200">
      <ul class="list">
        <li class="item" v-for="item in list" :key="item.tId">
          <div
            v-if="isShowCollect"
            class="collect"
            @click="changeCollectState(item)">
            <el-icon v-show="!item.isCollect"><Star /></el-icon>
            <el-icon v-show="item.isCollect"><StarFilled /></el-icon>
          </div>
          <img class="cover" v-lazy="item.cover" :alt="item.name" />
        </li>
      </ul>
      <div class="list-footer" v-if="isShowFooter">
        <p v-show="!noMore"
          >加载中...<el-icon><Loading /></el-icon>
        </p>
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
    isShowCollect: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['load', 'changeCollectState'],
  setup(props, context) {
    function load() {
      console.log('load', this);
      context.emit('load');
    }
    function changeCollectState(item) {
      context.emit('changeCollectState', item);
    }
    return {
      load,
      changeCollectState,
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
  font-size: 14px;
  p {
    text-align: center;
    color: #666e88;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: -17px;
  }
}
.item {
  width: 120px;
  height: 120px;
  vertical-align: middle;
  border-radius: 3px;
  margin-bottom: 12px;
  border: 1px solid #eee;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  img {
    border-radius: 3px;
  }
  .collect {
    position: absolute;
    cursor: pointer;
  }
}
.el-scrollbar {
  overflow: initial;
  height: calc(100% - 54px);
}
.el-scrollbar {
  &.list-scrollbar {
    :deep(.el-scrollbar__bar) {
      right: -20px;
    }
  }
}
.pd-b {
  padding-bottom: 20px;
}
</style>
