
const routes = [
  {
    path: '/',
    component: 'Layout',
    redirect: '/dashboard',
    name: 'Home',
    alwaysShow: true,
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: 'views/dashboard/index',
      meta: { title: '首页' }
    }]
  },

  {
    path: '/ads',
    component: 'Layout',
    redirect: '/ads/banner',
    name: 'Ads',
    meta: { title: '订单管理' },
    children: [
      {
        path: '/ads/banner',
        name: 'Banner',
        component: 'views/banner/index',
      }
      // {
      //   path: '/ads/link',
      //   name: 'Link',
      //   component: 'views/link/index',
      //   meta: { title: '友情链接' }
      // }
    ]
  },

  {
    path: '/user',
    component: 'Layout',
    redirect: '/user/info',
    name: 'User',
    meta: { title: '用户管理' },
    children: [
      {
        path: '/user/info',
        name: 'Info',
        component: 'views/user/index',
      }
    ]
  },

  {
    path: '/physiotherapist',
    component: 'Layout',
    redirect: '/physiotherapist/info',
    name: 'Physiotherapist',
    meta: { title: '理疗师管理' },
    children: [
      {
        path: '/physiotherapist/info',
        name: 'Info',
        component: 'views/physiotherapist/index',
      }
    ]
  },

  {
    path: '/shop',
    component: 'Layout',
    redirect: '/shop/info',
    name: 'Physiotherapist',
    meta: { title: '店铺管理' },
    children: [
      {
        path: '/shop/info',
        name: 'Info',
        component: 'views/shop/index',
      }
    ]
  },

  {
    path: '/extend',
    component: 'Layout',
    redirect: '/extend/info',
    name: 'Physiotherapist',
    meta: { title: '推广管理' },
    children: [
      {
        path: '/extend/info',
        name: 'Info',
        component: 'views/extend/index',
      }
    ]
  },

  {
    path: '/item',
    component: 'Layout',
    redirect: '/item/info',
    name: 'Physiotherapist',
    meta: { title: '服务项目' },
    children: [
      {
        path: '/item/info',
        name: 'Info',
        component: 'views/item/index',
      }
    ]
  },

  {
    path: '/favorable',
    component: 'Layout',
    redirect: '/favorable/info',
    name: 'Physiotherapist',
    meta: { title: '优惠券' },
    children: [
      {
        path: '/favorable/info',
        name: 'Info',
        component: 'views/favorable/index',
      }
    ]
  },

  {
    path: '/car',
    component: 'Layout',
    redirect: '/car/info',
    name: 'Physiotherapist',
    meta: { title: '车费管理' },
    children: [
      {
        path: '/car/info',
        name: 'Info',
        component: 'views/car/index',
      }
    ]
  },

  {
    path: '/image',
    component: 'Layout',
    redirect: '/image/info',
    name: 'Physiotherapist',
    meta: { title: '轮播图' },
    children: [
      {
        path: '/image/info',
        name: 'Info',
        component: 'views/image/index',
      }
    ]
  },

  {
    path: '/withdraw',
    component: 'Layout',
    redirect: '/withdraw/info',
    name: 'Physiotherapist',
    meta: { title: '提现记录' },
    children: [
      {
        path: '/withdraw/info',
        name: 'Info',
        component: 'views/withdraw/index',
        meta: { title: '理疗师提现记录' }
      }
    ]
  },

  // {
  //   path: '/article',
  //   component: 'Layout',
  //   redirect: '/article/list',
  //   name: 'Article',
  //   meta: { title: '文章管理', icon: 'el-icon-document' },
  //   children: [
  //     {
  //       path: '/article/list',
  //       name: 'ArticleList',
  //       component: 'views/article/index',
  //       meta: { title: '文章管理' }
  //     },
  //     {
  //       path: '/article/category',
  //       name: 'ArticleCategory',
  //       component: 'views/article/category',
  //       meta: { title: '文章分类' }
  //     }
  //   ]
  // },

  // {
  //   path: '/data',
  //   component: 'Layout',
  //   redirect: '/data/article',
  //   name: 'Data',
  //   meta: { title: '数据统计', icon: 'el-icon-s-data' },
  //   children: [
  //     {
  //       path: '/data/article',
  //       name: 'Article',
  //       component: 'views/data/index',
  //       meta: { title: '文章统计' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: 'Layout',
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: '多级菜单',
  //     icon: 'el-icon-s-operation'
  //   },
  //   children: [
  //     {
  //       path: '/nested/menu1',
  //       alwaysShow: true,
  //       redirect: '/nested/menu1/menu1-1',
  //       component: 'views/nested/menu1/index', // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: '二级菜单' },
  //       children: [
  //         {
  //           path: '/nested/menu1/menu1-1',
  //           component: 'views/nested/menu1/menu1-1/index',
  //           name: 'Menu1-1',
  //           meta: { title: '三级菜单' }
  //         },
  //         {
  //           path: '/nested/menu1/menu1-2',
  //           alwaysShow: true,
  //           redirect: 'noRedirect',
  //           component: 'views/nested/menu1/menu1-2/index',
  //           name: 'Menu1-2',
  //           meta: { title: '三级菜单' },
  //           children: [
  //             {
  //               path: '/nested/menu1/menu1-2/menu1-2-1',
  //               component: 'views/nested/menu1/menu1-2/menu1-2-1/index',
  //               name: 'Menu1-2-1',
  //               meta: { title: '四级菜单' }
  //             },
  //             {
  //               path: '/nested/menu1/menu1-2/menu1-2-2',
  //               component: 'views/nested/menu1/menu1-2/menu1-2-2/index',
  //               name: 'Menu1-2-2',
  //               meta: { title: '四级菜单' }
  //             }
  //           ]
  //         },
  //         {
  //           path: '/nested/menu1/menu1-3',
  //           component: 'views/nested/menu1/menu1-3/index',
  //           name: 'Menu1-3',
  //           meta: { title: '三级菜单' }
  //         }
  //       ]
  //     },
  //     {
  //       path: '/nested/menu2',
  //       component: 'views/nested/menu2/index',
  //       name: 'Menu2',
  //       meta: { title: '二级菜单' }
  //     }
  //   ]
  // },

  // {
  //   path: '/site',
  //   component: 'Layout',
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: '/site/index',
  //       name: 'Site',
  //       component: 'views/site/index',
  //       meta: { title: '站点设置', icon: 'el-icon-setting' }
  //     }
  //   ]
  // },

  // {
  //   path: '/setting',
  //   component: 'Layout',
  //   redirect: '/setting/user',
  //   name: 'Setting',
  //   meta: { title: '系统管理', icon: 'el-icon-s-tools' },
  //   children: [
  //     {
  //       path: '/setting/user',
  //       name: 'User',
  //       component: 'views/user/index',
  //       meta: { title: '用户管理' }
  //     },
  //     {
  //       path: '/setting/role',
  //       name: 'Role',
  //       component: 'views/role/index',
  //       meta: { title: '角色管理' }
  //     },
  //     {
  //       path: '/setting/menu',
  //       name: 'Menu',
  //       component: 'views/menu/index',
  //       meta: { title: '菜单管理' }
  //     },
  //     {
  //       path: '/setting/log',
  //       name: 'Log',
  //       component: 'views/log/index',
  //       meta: { title: '日志管理' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: 'Layout',
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'https://panjiachen.gitee.io/vue-element-admin-site/zh/',
  //       meta: { title: '文档', icon: 'el-icon-link' }
  //     }
  //   ]
  // }
]

module.exports = [
  // get routes
  {
    url: '/vue-admin-template/permission/getroutes',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: { list: routes }
      }
    }
  }
]
