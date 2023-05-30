import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import VueLazyload from 'vue-lazyload';
import 'element-plus/dist/index.css';
import '@styles/common.less';
import '@styles/init.less';
import '@styles/theme.less'

import { setupRouter } from '@/router/index.js';
import { setupStore } from '@/store/index.js';
import App from './App.vue';

// 引入全局组件
import AsideListSkeleton from '@/components/AsideListSkeleton/index.vue';
import ListComponent from '@/components/List/index.vue';

// 引入全局方法
import getData from '@api/index';


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
  // 注册全局组件
  app.component('AsideListSkeleton', AsideListSkeleton);
  app.component('ListComponent', ListComponent);

  // 注册全局方法
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
