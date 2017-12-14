import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
// const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

import Layout from '../views/layout/Layout'

import Login from '@/components/Account/Login.vue'
import refresh from '@/components/refresh.vue'
import Home from '@/components/Home.vue'
import menuList from '@/components/Administrative/system/menu/list.vue'
import menuAdd from '@/components/Administrative/system/menu/add.vue'
import menuEdit from '@/components/Administrative/system/menu/edit.vue'
import systemConfig from '@/components/Administrative/system/config/add.vue'
import ruleList from '@/components/Administrative/system/rule/list.vue'
import ruleAdd from '@/components/Administrative/system/rule/add.vue'
import ruleEdit from '@/components/Administrative/system/rule/edit.vue'
import positionList from '@/components/Administrative/structures/position/list.vue'
import positionAdd from '@/components/Administrative/structures/position/add.vue'
import positionEdit from '@/components/Administrative/structures/position/edit.vue'
import structuresList from '@/components/Administrative/structures/structures/list.vue'
import structuresAdd from '@/components/Administrative/structures/structures/add.vue'
import structuresEdit from '@/components/Administrative/structures/structures/edit.vue'
import groupsList from '@/components/Administrative/structures/groups/list.vue'
import groupsAdd from '@/components/Administrative/structures/groups/add.vue'
import groupsEdit from '@/components/Administrative/structures/groups/edit.vue'
import usersList from '@/components/Administrative/personnel/users/list.vue'
import usersAdd from '@/components/Administrative/personnel/users/add.vue'
import usersEdit from '@/components/Administrative/personnel/users/edit.vue'

import tasksList from '@/views/tasks/list.vue'
import tasksAdd from '@/views/tasks/add.vue'
import tasksEdit from '@/views/tasks/edit.vue'

/**
 * meta参数解析
 * hideLeft: 是否隐藏左侧菜单，单页菜单为true
 * module: 菜单所属模块
 * menu: 所属菜单，用于判断三级菜单是否显示高亮，如菜单列表、添加菜单、编辑菜单都是'menu'，用户列表、添加用户、编辑用户都是'user'，如此类推
 */

const constantRouterMap = [
  { path: '/', component: Login, name: 'Login' },
  {
    path: '/home',
    component: Home,
    children: [{ path: '/refresh', component: refresh, name: 'refresh' }]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'menu/list',
        component: menuList,
        name: 'menuList',
        meta: { hideLeft: false, module: 'Administrative', menu: 'menu' }
      },
      {
        path: 'menu/add',
        component: menuAdd,
        name: 'menuAdd',
        meta: { hideLeft: false, module: 'Administrative', menu: 'menu' }
      },
      {
        path: 'menu/edit/:id',
        component: menuEdit,
        name: 'menuEdit',
        meta: { hideLeft: false, module: 'Administrative', menu: 'menu' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'tasks/list',
        component: tasksList,
        name: 'tasksList',
        meta: { hideLeft: false, module: 'Administrative', tasks: 'tasks' }
      },
      {
        path: 'tasks/add',
        component: tasksAdd,
        name: 'tasksAdd',
        meta: { hideLeft: false, module: 'Administrative', tasks: 'tasks' }
      },
      {
        path: 'tasks/edit/:id',
        component: tasksEdit,
        name: 'tasksEdit',
        meta: { hideLeft: false, module: 'Administrative', tasks: 'tasks' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'config/add',
        component: systemConfig,
        name: 'systemConfig',
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'systemConfig'
        }
      }
    ]
  },

  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'rule/list',
        component: ruleList,
        name: 'ruleList',
        meta: { hideLeft: false, module: 'Administrative', menu: 'rule' }
      },
      {
        path: 'rule/add',
        component: ruleAdd,
        name: 'ruleAdd',
        meta: { hideLeft: false, module: 'Administrative', menu: 'rule' }
      },
      {
        path: 'rule/edit/:id',
        component: ruleEdit,
        name: 'ruleEdit',
        meta: { hideLeft: false, module: 'Administrative', menu: 'rule' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'position/list',
        component: positionList,
        name: 'positionList',
        meta: { hideLeft: false, module: 'Administrative', menu: 'position' }
      },
      {
        path: 'position/add',
        component: positionAdd,
        name: 'positionAdd',
        meta: { hideLeft: false, module: 'Administrative', menu: 'position' }
      },
      {
        path: 'position/edit/:id',
        component: positionEdit,
        name: 'positionEdit',
        meta: { hideLeft: false, module: 'Administrative', menu: 'position' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'structures/list',
        component: structuresList,
        name: 'structuresList',
        meta: { hideLeft: false, module: 'Administrative', menu: 'structures' }
      },
      {
        path: 'structures/add',
        component: structuresAdd,
        name: 'structuresAdd',
        meta: { hideLeft: false, module: 'Administrative', menu: 'structures' }
      },
      {
        path: 'structures/edit/:id',
        component: structuresEdit,
        name: 'structuresEdit',
        meta: { hideLeft: false, module: 'Administrative', menu: 'structures' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'groups/list',
        component: groupsList,
        name: 'groupsList',
        meta: { hideLeft: false, module: 'Administrative', menu: 'groups' }
      },
      {
        path: 'groups/add',
        component: groupsAdd,
        name: 'groupsAdd',
        meta: { hideLeft: false, module: 'Administrative', menu: 'groups' }
      },
      {
        path: 'groups/edit/:id',
        component: groupsEdit,
        name: 'groupsEdit',
        meta: { hideLeft: false, module: 'Administrative', menu: 'groups' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'users/list',
        component: usersList,
        name: 'usersList',
        meta: { hideLeft: false, module: 'Administrative', menu: 'users' }
      },
      {
        path: 'users/add',
        component: usersAdd,
        name: 'usersAdd',
        meta: { hideLeft: false, module: 'Administrative', menu: 'users' }
      },
      {
        path: 'users/edit/:id',
        component: usersEdit,
        name: 'usersEdit',
        meta: { hideLeft: false, module: 'Administrative', menu: 'users' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   name: '权限测试',
  //   icon: 'lock',
  //   meta: { role: ['admin'] },
  //   noDropdown: true,
  //   children: [{ path: 'index', component: require('@/views/permission/index.vue'), name: '权限测试页', meta: { role: ['admin'] }}]
  // },
  // {
  //   path: '/icon',
  //   component: Layout,
  //   icon: 'icon',
  //   noDropdown: true,
  //   children: [{ path: 'index', component: require('@/views/svg-icons.vue/index'), name: 'icons' }]
  // },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/index',
    name: '组件',
    icon: 'component',
    children: [
      { path: 'index', component: require('@/views/components/index.vue'), name: '介绍 ' },
      {
        path: 'tinymce',
        component: require('@/views/components/tinymce.vue'),
        name: '富文本编辑器'
      },
      {
        path: 'markdown',
        component: require('@/views/components/markdown.vue'),
        name: 'Markdown'
      },
      {
        path: 'jsoneditor',
        component: require('@/views/components/jsonEditor.vue'),
        name: 'JSON编辑器'
      },
      {
        path: 'dndlist',
        component: require('@/views/components/dndList.vue'),
        name: '列表拖拽'
      },
      {
        path: 'splitpane',
        component: require('@/views/components/splitpane.vue'),
        name: 'SplitPane'
      },
      {
        path: 'avatarupload',
        component: require('@/views/components/avatarUpload.vue'),
        name: '头像上传'
      },
      {
        path: 'dropzone',
        component: require('@/views/components/dropzone.vue'),
        name: 'Dropzone'
      },
      {
        path: 'sticky',
        component: require('@/views/components/sticky.vue'),
        name: 'Sticky'
      },
      {
        path: 'countto',
        component: require('@/views/components/countTo.vue'),
        name: 'CountTo'
      },
      { path: 'mixin', component: require('@/views/components/mixin.vue'), name: '小组件' },
      {
        path: 'backtotop',
        component: require('@/views/components/backToTop.vue'),
        name: '返回顶部'
      }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/index',
    name: '图表',
    icon: 'chart',
    children: [
      { path: 'index', component: require('@/views/charts/index.vue'), name: '介绍' },
      {
        path: 'keyboard',
        component: require('@/views/charts/keyboard.vue'),
        name: '键盘图表'
      },
      {
        path: 'keyboard2',
        component: require('@/views/charts/keyboard2.vue'),
        name: '键盘图表2'
      },
      { path: 'line', component: require('@/views/charts/line.vue'), name: '折线图' },
      {
        path: 'mixchart',
        component: require('@/views/charts/mixChart.vue'),
        name: '混合图表'
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '综合实例',
    icon: 'example',
    children: [
      {
        path: '/example/table',
        component: require('@/views/example/table/index.vue'),
        redirect: '/example/table/table',
        name: 'Table',
        icon: 'table',
        children: [
          {
            path: 'dynamictable',
            component: require('@/views/example/table/dynamictable/index.vue'),
            name: '动态table'
          },
          {
            path: 'dragtable',
            component: require('@/views/example/table/dragTable.vue'),
            name: '拖拽table'
          },
          {
            path: 'inline_edit_table',
            component: require('@/views/example/table/inlineEditTable.vue'),
            name: 'table内编辑'
          },
          {
            path: 'table',
            component: require('@/views/example/table/table.vue'),
            name: '综合table'
          }
        ]
      },
      {
        path: 'form/edit',
        icon: 'form',
        component: require('@/views/example/form.vue'),
        name: '编辑Form',
        meta: { isEdit: true }
      },
      {
        path: 'form/create',
        icon: 'form',
        component: require('@/views/example/form.vue'),
        name: '创建Form'
      },
      {
        path: 'tab/index',
        icon: 'tab',
        component: require('@/views/example/tab/index.vue'),
        name: 'Tab'
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    icon: '404',
    children: [
      { path: '401', component: require('@/views/errorPage/401.vue'), name: '401' },
      { path: '404', component: require('@/views/errorPage/404.vue'), name: '404' }
    ]
  },
  {
    path: '/errlog',
    component: Layout,
    redirect: 'noredirect',
    name: 'errlog',
    icon: 'bug',
    noDropdown: true,
    children: [
      { path: 'log', component: require('@/views/errlog/index.vue'), name: '错误日志' }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/download',
    name: 'excel',
    icon: 'excel',
    children: [
      {
        path: 'download',
        component: require('@/views/excel/index.vue'),
        name: 'export excel'
      },
      {
        path: 'download2',
        component: require('@/views/excel/selectExcel.vue'),
        name: 'export selected'
      },
      {
        path: 'upload',
        component: require('@/views/excel/uploadExcel.vue'),
        name: 'upload excel'
      }
    ]
  },
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    name: 'zip',
    icon: 'zip',
    children: [
      { path: 'download', component: require('@/views/zip/index.vue'), name: 'export zip' }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    name: 'theme',
    icon: 'theme',
    noDropdown: true,
    children: [
      { path: 'index', component: require('@/views/theme/index.vue'), name: '换肤' }
    ]
  },
  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    icon: 'clipboard',
    noDropdown: true,
    children: [
      {
        path: 'index',
        component: require('@/views/clipboard/index.vue'),
        name: 'clipboard'
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
