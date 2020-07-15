import permission from './permission'

const install = function(Vue) {
  Vue.directive('permission', permission)
}

if (window.Vue) { // src 引入的时候 需要用这个处理
  window['permission'] = permission
  Vue.use(install); // eslint-disable-line
}
export default {
  install 
}