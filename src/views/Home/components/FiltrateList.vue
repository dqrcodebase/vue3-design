<template>
  <div class="flex filtrate">
    <el-input
      v-model="input"
      @blur.stop="query"
      @keyup.enter="query"
      :placeholder="placeholder" />
    <div class="filtrate-button">
      <el-icon :size="24"><Menu /> </el-icon>
      <span class="filtrate-text">筛选</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  props: {
    placeholder: {
      type: String,
      default: '样版名称',
    },
  },
  emits: ['query'],
  setup(props, context) {
    const input = ref('');
    function query() {
      context.emit('query', input);
    }
    return {
      input,
      query,
    };
  },
};
</script>

<style scoped lang="less">
.filtrate {
  :deep(.el-input) {
    flex: 1;
    line-height: 40px;
    height: 40px;
    box-sizing: border-box;
    .el-input__inner {
      height: 40px;
    }
  }
  .filtrate-button {
    font-size: 0;
    color: #696c77;
    width: 24px;
    margin-left: 8px;
    cursor: pointer;
    .filtrate-text {
      font-size: 12px;
      line-height: 16px;
    }
  }
}
</style>
