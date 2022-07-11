import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import VueLazyload from 'vue-lazyload';
import 'element-plus/dist/index.css';
import '@/assets/style/common.less';
import '@/assets/style/init.less';

import getData from '@/api/index';
import { setupRouter } from '@/router';
import { setupStore } from '@/store/index';
import App from './App.vue';

const errorImg = require('./assets/images/common/loading-err.png');
const workdefaultImg = require('./assets/images/common/workdefault.png');

function bootstrap() {
  const app = createApp(App);

  // Configure store
  // 配置 store
  setupStore(app);

  // Configure routing
  // 配置路由
  setupRouter(app);
  // 注册elemnet中的所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  app.config.globalProperties.getData = getData;
  app
    .use(ElementPlus)
    .use(VueLazyload, {
      error: errorImg,
      loading: workdefaultImg,
    })
    .mount('#app');
}

bootstrap();
