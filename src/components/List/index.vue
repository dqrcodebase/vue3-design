<template>
  <slot class="pd-b"></slot>
  <el-scrollbar class="list-scrollbar">
    <slot class="pd-b" name="immobilization"></slot>
    <div
      v-infinite-scroll="load"
      :infinite-scroll-disabled="noMore"
      :infinite-scroll-immediate="false"
      :infinite-scroll-distance="200">
      <template v-if="list.length > 0">
      <ul class="list" >
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
      <ListFooter v-if="isShowFooter" :noMore="noMore" />
    </template>
    <div v-else class="show-empty">
      <no-data />
    </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import ListFooter from '@components/ListFooter';
import NoData from '@components/NoData';

defineProps({
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
  // 是否展示收藏按钮
  isShowCollect: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['load', 'changeCollectState']);

function load() {
  console.log('load', this);
  emit('load');
}
function changeCollectState(item) {
  emit('changeCollectState', item);
}
</script>

<style scoped lang="less">
.list {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 120px);
  grid-gap: 0 12px;
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
.show-empty {
  margin-top: 120px;
}
</style>
