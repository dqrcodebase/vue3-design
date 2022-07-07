<template>
  <div class="design">
    <el-container>
      <el-header class="header"> <main-header /> </el-header>
      <el-container class="main">
        <el-aside class="aside"><design-aside /></el-aside>
        <el-main class="design-content">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
import DesignAside from './components/DesignAside.vue';

export default {
  name: 'Home',
  data() {
    return {
      msg: 'Welcome to Your Vue.js Ap',
    };
  },
  components: { DesignAside, MainHeader },
  setup() {},
};
</script>
<style lang="less" scoped>
.design {
  height: 100%;
  .is-vertical {
    height: 100%;
  }
}
.main {
  height: calc(100% - 60px);
}
.el-aside {
  width: auto;
  overflow: initial;
}
.header,
.aside,
.design-content {
  border: 1px solid #eeeeee;
  border-radius: 4px;
}
</style>
