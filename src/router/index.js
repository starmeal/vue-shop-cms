import Vue from 'vue';
import VueRouter from 'vue-router';
export const staticRoutes =  [
  {
    path: '/login',
    component: () => import('@/baseView/login/index'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/baseView/404/index'),
    hidden: true,
  }
];
export const asyncRoutes = [
  {
    path: '/',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '',
        hidden: true,
        component: () => import('@/views/home'),
        meta: {
          title: '首页',
          roles: ["/shop/cms/permission/role/list", "/shop/cms/user/list", "/shop/cms/user/get"]
        }
      },
      {
        path: '/about',
        hidden: true,
        component: () => import('@/views/AnnouncementManagement'),
        meta: {
          title: '首页1',
        }
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
]
Vue.use(VueRouter);
const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: staticRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
