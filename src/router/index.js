import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("../Layout.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        meta: {
          title: "玩转小demo",
        },
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "chart",
        name: "Chart",
        meta: {
          title: "拖拽图表",
        },
        component: () => import("@/views/chart/Index.vue"),
      },
    ],
  },
  // {
  //   path: '/',
  //   name: 'Layout',
  //   component: () => import('../Layout.vue'),
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
