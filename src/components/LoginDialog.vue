<template>
  <!-- 登录弹窗 -->

  <el-dialog v-model="visible" :show-close="false" center>
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <div :id="titleId" :class="titleClass">账号登录</div>
        <el-icon @click="close" class="el-icon--left"
          ><CircleCloseFilled
        /></el-icon>
      </div>
    </template>
    <el-form
      :inline="true"
      :model="formInline"
      v-loading="loading"
      class="demo-form-inline">
      <el-form-item label="账号">
        <el-input v-model="formInline.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="formInline.password"
          placeholder="请输入密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="loading" @click="onSubmit"
          >立即登录</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import { ElMessage } from 'element-plus';

const userStore = useUserStore();
const visible = ref(true);
const formInline = reactive({
  clientType: 1,
  deviceType: 1,
  platformType: 1,
  password: '',
  username: '',
});
const loading = ref(false);

onMounted(() => {});

function close() {
  userStore.loginDialogState = false;
}

async function onSubmit() {
  loading.value = true;
  const res = await userStore.login(formInline);
  loading.value = false;
  if (res.code === 1) {
    close();
  } else {
    ElMessage({
      showClose: true,
      message: res.message,
      type: 'error',
    });
  }
}
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.el-icon--left {
  cursor: pointer;
}
.el-button:focus,
.el-button:hover {
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary);
}
</style>
