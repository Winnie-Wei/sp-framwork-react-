import LeftRightRouter from './LeftRightRouter'
import FullScreenRouter from './FullScreenRouter'
import HomePage from '../pages/home/index'
import UsersPage from '../pages/setting/users/index'
import UsersSettingPage from '../pages/setting/users/setting'
import RolesPage from '../pages/setting/roles/index'
import RolesSettingPage from '../pages/setting/roles/setting'
import DepartmentPage from '../pages/setting/departments/index'
import DepartmentPageModify from '../pages/setting/departments/modify'
import TodosPage from '../pages/personal/todos/index'
import AuditPage from '../pages/personal/todos/audit'
import WorkSheet from '../pages/personal/worksheet/index'
import InitiatingWorkOrder from '../pages/personal/worksheet/InitiatingWorkOrder'
import InfoCenter from '../pages/personal/infocenter/index'
import InfoCenterSetting from '../pages/personal/infocenter/setting'

const routes = [
  {
    path: '/app/home',
    component: HomePage,
    name: '首页'
  },
  {
    path: '/app/users',
    component: LeftRightRouter,
    name: '用户管理',
    routes: [
      {
        path: '/app/users/setting',
        component: UsersPage,
        name: '用户设置',
        exact: true,
        leftNav: true
      },
      {
        path: '/app/users/setting/editUser/:id',
        component: UsersSettingPage
      },
      {
        path: '/app/users/roles',
        component: RolesPage,
        exact: true,
        name: '角色管理',
        leftNav: true
      },
      {
        path: '/app/users/roles/setting',
        component: RolesSettingPage
      },
      {
        path: '/app/users/departments',
        component: DepartmentPage,
        exact: true,
        leftNav: true,
        name: '部门管理'
      },
      {
        path: '/app/users/departments/modify/:id',
        component: DepartmentPageModify
      },
      {
        redirect: true,
        path: '/app/users',
        to: '/app/users/setting'
      }
    ]
  },
  {
    name: '个人中心',
    path: '/app/personal',
    component: FullScreenRouter,
    routes: [
      {
        path: '/app/personal/index',
        component: TodosPage,
        name: '我的代办'
      },
      {
        path: '/app/personal/audit/index',
        component: AuditPage,
        name: '工单审核'
      },
      {
        path: '/app/personal/worksheet/index',
        component: WorkSheet,
        name: '我的工单'
      },
      {
        path: '/app/personal/worksheet/initiating',
        component: InitiatingWorkOrder,
        name: '业务申请'
      },
      {
        path: '/app/personal/infocenter/index',
        component: InfoCenter,
        name: '个人信息',
        exact: true
      },
      {
        path: '/app/personal/infocenter/index/setting',
        component: InfoCenterSetting,
        name: '编辑'
      }
    ]
  },
  {
    redirect: true,
    path: '/app',
    to: '/app/home'
  }
]

export default routes
