import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("@/views/HelpMap"),
    meta: { title: "福州市官方避难所地图" },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register"),
    meta: { title: "注册" },
  },
  // 登录
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/auth/Login"),
    meta: { title: "登录" },
  },
  // 登录
  {
    name: "backlogin",
    path: "/backlogin",
    component: () => import("@/views/auth/backlogin"),
    meta: { title: "管理员登录" },
  },
  // 发布
  {
    name: "post-create",
    path: "/post/create",
    component: () => import("@/views/post/Create"),
    meta: { title: "信息发布", requireAuth: true },
  },
  // 编辑
  {
    name: 'topic-edit',
    path: '/topic/edit/:id',
    component: () => import('@/views/post/Edit'),
    meta: {
      title: '编辑',
      requireAuth: true
    }
  },
  // 详情
  {
    name: "post-detail",
    path: "/post/:id",
    component: () => import("@/views/post/Detail"),
    meta: { title: "详情" },
  },
  {
    name: 'tag',
    path: '/tag/:name',
    component: () => import('@/views/tag/Tag'),
    meta: { title: '主题列表' }
  },
  // 检索
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/Search'),
    meta: { title: '检索' }
  },
  // 用户主页
  {
    name: 'user',
    path: '/member/:username/home',
    component: () => import('@/views/user/Profile'),
    meta: { title: '用户主页' }
  },
  // 用户设置
  {
    name: 'user-setting',
    path: '/member/:username/setting',
    component: () => import('@/views/user/Setting'),
    meta: { title: '设置', requireAuth: true }
  },
  // 测试
  {
    name: 'test',
    path: '/test',
    component: () => import('@/views/post/CreateWithPos'),
    meta: { title: '测试' }
  },
  // 路径规划测试测试
  {
    name: 'plan',
    path: '/plan',
    component: () => import('@/components/map/planmap'),
    meta: { title: '路径规划' }
  },
  //管理员后台
  {
    path: '/admin',
    component: () => import('@/views/admin/layout'),
    meta: { title: "首页", requireAuth: true },
    children: [
      {
        path: '',
        component: () => import('@/views/admin/index/index'),
        name: 'adminIndex',
        meta: { title: "首页", requireAuth: true }
      },
      //用户管理
      {
        path: 'account',
        component: () => import('@/views/admin/account/account'),
        name: 'accountLayout',
        meta: { title: "用户管理", requireAuth: true },
      },
      //文章管理
      {
        path: 'blog',
        component: () => import('@/views/admin/blog/blog'),
        name: 'blogLayout',
        meta: { title: "文章管理", requireAuth: true },
      },
      //通知管理
      {
        path: 'notice',
        component: () => import('@/views/admin/notice/notice'),
        name: 'noticeLayout',
        meta: { title: "通知管理", requireAuth: true },
      },
      //发布通知
      {
        path: 'createnotice',
        component: () => import('@/views/admin/notice/createnotice'),
        name: 'createnoticeLayout',
        meta: { title: "发布通知", requireAuth: true },
      },
      //新增避难所位置
      {
        path: 'addposition',
        component: () => import('@/views/admin/position/addpos'),
        name: 'addposLayout',
        meta: { title: "新增避难所位置", requireAuth: true },
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    meta: { title: "404-NotFound" },
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

export default router;
