import calculate from './calculate'

const install = function(Vue) {
    Vue.filter('calculate', calculate)
  }
  
  if (window.Vue) { // src 引入的时候 需要用这个处理
    window['calculate'] = calculate
    Vue.use(install); // eslint-disable-line
  }
  export default {
    install 
  }