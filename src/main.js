import { createApp } from 'vue'
// import { ModalPlugin } from 'bootstrap-vue'
// import Antd from 'ant-design-vue';  // 引入ant-design-vue组件库  
// import 'ant-design-vue/dist/reset.css';

import App from './App.vue'
import router from './router'
createApp(App).use(router).mount('#app')
// createApp(App).use(router).use(ModalPlugin).mount('#app')


