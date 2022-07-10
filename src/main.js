import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import VueLazyload from 'vue-lazyload';
import 'element-plus/dist/index.css';
import '@/assets/style/common.less';
import '@/assets/style/init.less';

import getData from '@/api/index';
import { setupRouter } from '@/router';
import { setupStore } from '@/store/index';
import App from './App.vue';

// const app = createApp(App);

// app.use(store).use(router).use(ElementPlus).mount('#app');
function bootstrap() {
  const app = createApp(App);

  // Configure store
  // 配置 store
  setupStore(app);

  // Configure routing
  // 配置路由
  setupRouter(app);
  app.config.globalProperties.getData = getData;
  app
    .use(ElementPlus)
    .use(VueLazyload, {
      error: require('./assets/images/common/loading-err.png'),
      loading: require('./assets/images/common/workdefault.png'),
    })
    .mount('#app');
}

bootstrap();
