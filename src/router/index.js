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
    meta: {
      title: '首页',
      fullTitle: '首页',
      icon: 'zuosuojin',
      roles: ["/shop/cms/permission/role/list", "/shop/cms/user/list", "/shop/cms/user/get"]
    },
    children: [
      {
        path: '',
        hidden: true,
        component: () => import('@/views/home'),
        meta: {
          title: '首页',
          fullTitle: '首页',
          icon: 'zuosuojin',
          roles: ["/shop/cms/permission/role/list", "/shop/cms/user/list", "/shop/cms/user/get"]
        }
      }
    ]
  },
  {
    path: '/store',
    component: () => import('@/views/layout/layout'),
    meta: {
      title: '店铺',
      fullTitle: '店铺首页',
      icon: 'zuosuojin',
      roles: ["/shop/cms/permission/role/list", "/shop/cms/user/list", "/shop/cms/user/get"]
    },
    children: [
      {
        title: '店铺详情',
        path: '',
        meta: {
          parentPath: '/store',
          basePath: '/store',
        },
        component: () => import('@/views/store'),
      },
      {
        title: '店铺详情1',
        path: '/home1',
        meta: {
          parentPath: '/store',
          basePath: '/store',
        },
        component: () => import('@/views/home'),
      },
      {
        title: '店铺详情2',
        path: '/home2',
        meta: {
          parentPath: '/store',
          basePath: '/store',
        },
        component: () => import('@/views/home'),
        children: [
          {
            title: '店铺详情3',
            path: '',
            meta: {
              parentPath: '/home2',
              basePath: '/store',
            },
            component: () => import('@/views/store'),
          },
          {
            title: '店铺详情4',
            path: '/home4',
            meta: {
              parentPath: '/home2',
              basePath: '/store',
            },
            component: () => import('@/views/home'),
          },
          {
            title: '店铺详情5',
            path: '/home5',
            meta: {
              parentPath: '/home2',
              basePath: '/store',
            },
            component: () => import('@/views/AnnouncementManagement'),
          }
          
        ]
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
