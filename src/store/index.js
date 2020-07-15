import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import getters from './getters.js'
import VuexPersistence from 'vuex-persist'
import createLogger from 'vuex/dist/logger.js'
const vuexLocal = new VuexPersistence({
  key: 'hs-vuex',
  storage: window.localStorage
})
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    user
  },
  getters,
  strict: debug,
  plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin]
})
