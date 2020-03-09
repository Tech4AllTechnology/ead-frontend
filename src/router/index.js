import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
// import componentsRouter from './modules/components'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/users/users'),
        name: 'user',
        meta: { title: 'user', icon: 'user', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/users/users'),
        name: 'user',
        meta: { title: 'user', icon: 'user', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/software',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/softwares/software'),
        name: 'softwares',
        meta: { title: 'softwares', icon: 'component', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/space',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/space/space'),
        name: 'space',
        meta: { title: 'space', icon: 'component', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/program',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/program/program'),
        name: 'programs',
        meta: { title: 'programs', icon: 'component', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/course/course'),
        name: 'courses',
        meta: { title: 'courses', icon: 'component', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/class',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/class/class'),
        name: 'clazz',
        meta: { title: 'clazz', icon: 'component', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/scheduling',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/scheduling/scheduling'),
        name: 'scheduling',
        meta: { title: 'schedulings', icon: 'component', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/scheduling-pendencies',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/scheduling/scheduling-pendencies'),
        name: 'scheduling_pendencies',
        meta: { title: 'checkPendencies', icon: 'component', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/lack',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/users/lack'),
        name: 'lack',
        meta: { title: 'lack', icon: 'component', affix: true, noCache: true }
      }
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
  // chartsRouter,
  // tableRouter,
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'relatorio',
    meta: {
      title: 'relatorios',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/exportExcel'),
        name: 'spaceUsage',
        meta: { title: 'spaceUsage' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/selectExcel'),
        name: 'studentEvasion',
        meta: { title: 'studentEvasion' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/mergeHeader'),
        name: 'FrequenciaDosEspacos',
        meta: { title: 'frequenciaDosEspacos' }
      }
    ]
  },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'exportZip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'pdf', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
