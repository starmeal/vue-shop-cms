import { login, plogin } from '@/api/login';
const state = {
  token: '',
  name: '',
  routes: [],
  roles: [],
  avatar: '',
  userId: '',
  code: '',
};
const actions = {
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_NAME", "");
      commit("SET_CODE", "");
      commit("SET_ROLES", []);
      resolve();
    });
  },
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ nickName: username.trim(), password: password })
        .then((response) => {
          const {
            body: { token, shopMerchantsName, shopMerchantsCode, permissions,userId },
          } = response;
          commit('SET_TOKEN', token);
          commit('SET_NAME', shopMerchantsName);
          commit('SET_CODE', shopMerchantsCode);
          commit('SET_ROLES', permissions);
          commit('userId', userId);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  phonelogin({ commit }, userInfo) {
    const { mobile, smCode } = userInfo;
    return new Promise((resolve, reject) => {
      plogin({ mobile: mobile.trim(), smCode: smCode })
        .then(response => {
          const { body, code } = response;
          if (code == '000000') {
            commit("SET_TOKEN", body.token);
            commit("SET_NAME", body.shopMerchantsName);
            commit('SET_CODE', body.shopMerchantsCode);
            commit('SET_ROLES', body.permissions);
            resolve();
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_CODE: (state, code) => {
    state.code = code;
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
