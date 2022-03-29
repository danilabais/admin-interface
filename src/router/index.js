import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/add-news",
    name: "AddNews",
    component: () => import("@/views/AddNews.vue"),
  },
  {
    path: "/news/:id",
    name: "newsPage",
    component: () => import("@/views/newsPage.vue"),
  },
  {
    path: "/news/:id/edit",
    name: "Edit",
    component: () => import("@/views/Edit.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
