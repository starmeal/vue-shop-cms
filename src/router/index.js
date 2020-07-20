import Vue from 'vue';
import VueRouter from 'vue-router';
export const staticRoutes = [
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
    alwaysHidden: true,
    meta: {
      title: '首页',
      fullTitle: '首页',
      icon: 'zuosuojin',
    },
    children: [
      {
        path: '',
        component: () => import('@/views/home'),
        meta: {
          parentPath: '/',
          basePath: '/',
          title: '首页',
          fullTitle: '首页',
          icon: 'zuosuojin',
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
    },
    children: [
      {
        path: '',
        meta: {
          title: '店铺详情',
          parentPath: '/store',
          basePath: '/store',
        },
        component: () => import('@/views/store'),
      },
      {
        path: '/authentication',
        meta: {
          title: '资质认证',
          parentPath: '/store',
          basePath: '/store',
        },
        component: () => import('@/views/authentication/index')
      },
      {
        path: '/notice',
        component: () => import('@/views/routeview'),
        meta: {
          title: '公告',
          icon: 'zuosuojin',
          parentPath: '/store',
          basePath: '/store',
        },
        children: [
          {
            path: '',
            meta: {
              title: '编辑公告',
              parentPath: '/notice',
              basePath: '/store',
            },
            component: () => import('@/views/notice/index'),
          },
          {
            path: '/noticelist',
            meta: {
              title: '公告列表',
              parentPath: '/notice',
              basePath: '/store',
            },
            component: () => import('@/views/notice/noticelist'),
          },
        ]
      },
      {
        path: '/home2',
        meta: {
          title: '店铺详情2',
          parentPath: '/store',
          basePath: '/store',
        },
        component: () => import('@/views/home'),
        children: [
          {
            path: '',
            meta: {
              title: '店铺详情3',
              parentPath: '/home2',
              basePath: '/store',
            },
            component: () => import('@/views/store'),
          },
          {
            path: '/home4',
            meta: {
              title: '店铺详情4',
              parentPath: '/home2',
              basePath: '/store',
            },
            component: () => import('@/views/home'),
          },
          {
            path: '/home5',
            meta: {
              title: '店铺详情5',
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
