import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/access',
    name: 'access',
    component: () => import('../views/AccessLayout.vue'),
    redirect: '/access/accountManger', // 預設路由
    children: [
      {
        path: 'accountManger',
        component: () => import('../views/accessView/AccountMangerView.vue')
      },
      {
        path: 'pageManger',
        component: () => import('../views/accessView/PageMangerView.vue')
      }
    ]
  },
  {
    path: '/devices',
    name: 'devices',
    component: () => import('../views/AccessLayout.vue'),
    redirect: '/devices/devicesManger', // 預設路由
    children: [
      {
        path: 'devicesManger',
        component: () => import('../views/devicesView/DeviceMangerView.vue')
      }, {
        path: 'locationManger',
        component: () => import('../views/devicesView/LocationMangerView.vue')
      }

      // {
      //   path: 'pageManger',
      //   component: () => import('../views/devicesView/PageMangerView.vue')
      // }
    ]
  },
  { path: '/:pathMatch(.*)*', name: '404', component: () => import('../views/404Page.vue') }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 220
      }
    }
    return savedPosition || new Promise((resolve) => {
      resolve({ top: 0, behavior: 'smooth' })
    })
  }
})

export default router
