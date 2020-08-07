import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/styl/element-variables.scss'
import directive from '@/directives'
import filter from '@/filters'
import '@/router/permission.js'
import '@/utils/vhight'
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small'
});
Vue.use(directive);
Vue.use(filter);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

