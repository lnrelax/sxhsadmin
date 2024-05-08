import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '统计分析', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: 'order',
    children: [
      {
        path: '/order',
        component: () => import('@/views/order'),
        name: 'Order',
        meta: { title: '订单列表', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/userInfo',
    component: Layout,
    redirect: 'userInfo',
    children: [
      {
        path: '/userInfo',
        component: () => import('@/views/userInfo'),
        name: 'UserInfo',
        meta: { title: '用户管理', icon: 'dashboard', affix: true }
      }
    ]
  },
  
  {
    path: '/physiotherapist',
    component: Layout,
    redirect: 'physiotherapist',
    children: [
      {
        path: '/physiotherapist',
        component: () => import('@/views/physiotherapist'),
        name: 'Physiotherapist',
        meta: { title: '理疗师管理', icon: 'dashboard', affix: true }
      }
    ]
  },
  
  {
    path: '/shop',
    component: Layout,
    redirect: 'shop',
    children: [
      {
        path: '/shop',
        component: () => import('@/views/shop'),
        name: 'Shop',
        meta: { title: '店铺管理', icon: 'dashboard', affix: true }
      }
    ]
  },
  
  {
    path: '/extend',
    component: Layout,
    redirect: 'extend',
    children: [
      {
        path: '/extend',
        component: () => import('@/views/extend'),
        name: 'Extend',
        meta: { title: '推广管理', icon: 'dashboard', affix: true }
      }
    ]
  },
  
  {
    path: '/item',
    component: Layout,
    redirect: 'item',
    children: [
      {
        path: '/item',
        component: () => import('@/views/item'),
        name: 'Item',
        meta: { title: '服务项目', icon: 'dashboard', affix: true }
      }
    ]
  },
  
  {
    path: '/favorable',
    component: Layout,
    redirect: 'favorable',
    children: [
      {
        path: '/favorable',
        component: () => import('@/views/favorable'),
        name: 'Favorable',
        meta: { title: '优惠券', icon: 'dashboard', affix: true }
      }
    ]
  },
  
  {
    path: '/car',
    component: Layout,
    redirect: 'car',
    children: [
      {
        path: '/car',
        component: () => import('@/views/car'),
        name: 'Car',
        meta: { title: '车费设置', icon: 'dashboard', affix: true }
      }
    ]
  },
  
  {
    path: '/image',
    component: Layout,
    redirect: 'image',
    children: [
      {
        path: '/image',
        component: () => import('@/views/image'),
        name: 'Image',
        meta: { title: '轮播图', icon: 'dashboard', affix: true }
      }
    ]
  },
  
  {
    path: '/withdraw',
    component: Layout,
    redirect: 'withdraw',
    children: [
      {
        path: '/withdraw',
        component: () => import('@/views/withdraw'),
        name: 'Withdraw',
        meta: { title: '提现记录', icon: 'dashboard', affix: true }
      }
    ]
  },
  
  {
    path: '/feedback',
    component: Layout,
    redirect: 'feedback',
    children: [
      {
        path: '/feedback',
        component: () => import('@/views/feedback'),
        name: 'Feedback',
        meta: { title: '反馈意见', icon: 'dashboard', affix: true }
      }
    ]
  },
  
  {
    path: '/settings',
    component: Layout,
    redirect: 'settings',
    children: [
      {
        path: '/settings',
        component: () => import('@/views/settings'),
        name: 'Settings',
        meta: { title: '系统设置', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/profit',
    component: Layout,
    redirect: 'profit',
    children: [
      {
        path: '/profit',
        component: () => import('@/views/profit'),
        name: 'Profit',
        meta: { title: '利润统计', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/extendTg',
    component: Layout,
    redirect: 'extendTg',
    children: [
      {
        path: '/extendTg',
        component: () => import('@/views/extendTg'),
        name: 'ExtendTg',
        meta: { title: '推广管理', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/withdrawTg',
    component: Layout,
    redirect: 'withdrawTg',
    children: [
      {
        path: '/withdrawTg',
        component: () => import('@/views/withdrawTg'),
        name: 'WithdrawTg',
        meta: { title: '提现记录', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/userInfoTg',
    component: Layout,
    redirect: 'profit',
    children: [
      {
        path: '/userInfoTg',
        component: () => import('@/views/userInfoTg'),
        name: 'UserInfoTg',
        meta: { title: '个人中心', icon: 'dashboard', affix: true }
      }
    ]
  },



  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole'),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index/:jobId(\\d+)',
        component: () => import('@/views/monitor/job/log'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' }
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
      }
    ]
  }
]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
let routerReplace = Router.prototype.replace;
// push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
