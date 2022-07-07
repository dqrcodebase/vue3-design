import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/style/common.less';
import '@/assets/style/init.less';

import getData from '@/api/index';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
app.config.globalProperties.getData = getData;

app.use(store).use(router).use(ElementPlus).mount('#app');
