import router, { asyncRoutes, staticRoutes } from '@/router'
import { filterAsyncRoutes } from '@/router/utils.js'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration
let hasRoles = false
const whiteList = ['/login'] // no redirect whitelist
router.beforeEach((to, from, next) => {
  let {
    token,
    roles
  } = store.getters
  // start progress bar
  NProgress.start()
  // set page title
/*
  document.title = getPageTitle(to.meta.title)
*/

  // determine whether the user has logged in
  if (token) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      if (hasRoles) { 
        next()
      } else {
        try {
          // get user info
          // generate accessible routes map based on roles
          let accessRoutes  = filterAsyncRoutes(asyncRoutes, roles)
          console.log(accessRoutes, '112222')
          accessRoutes = staticRoutes.concat(accessRoutes)
          // dynamically add accessible routes
          hasRoles = true
          router.addRoutes(accessRoutes)
          store.commit('user/SET_ROUTES',asyncRoutes.slice(0, asyncRoutes.length - 1))
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // console.log(error, 'rrrrrrr')
          // // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
