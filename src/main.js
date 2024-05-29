import { createApp } from 'vue'
// import { ModalPlugin } from 'bootstrap-vue'
// import Antd from 'ant-design-vue';  // 引入ant-design-vue组件库  
// import 'ant-design-vue/dist/reset.css';
// import Vue from 'vue'
// import Vuetify from 'vuetify'
// import '../node_modules/vuetify/dist/vuetify.min.css'

// Vue.use(Vuetify)
import 'vue-final-modal/style.css'
import TextClamp from 'vue3-text-clamp';
import { createVfm } from 'vue-final-modal'
const vfm = createVfm()
import App from './App.vue'
import router from './router'
createApp(App).use(vfm).use(TextClamp).use(router).mount('#app')
// createApp(App).use(router).use(ModalPlugin).mount('#app')


