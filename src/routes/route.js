import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import CreateView from "../views/CreateView.vue";
const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/createaccount", component: CreateView },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
