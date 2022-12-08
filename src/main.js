import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueRouter from "vue-router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import HomePage from "./components/Home.vue";
import Login from "./components/LoginPage.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.use(FontAwesomeIcon);
import { store } from "./store/store";
Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.use(IconsPlugin);
Vue.config.productionTip = false;
const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
      beforeEnter: RouteGaurd,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: HomePage,
      beforeEnter: gaurd,
    },
  ],
});

function RouteGaurd(to, from, next) {
  if (localStorage.getItem("token")) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
}

function gaurd(to, from, next) {
  if (localStorage.getItem("token")) {
    next();
  } else {
    next({ name: "Login" });
  }
}
new Vue({
  store: store,
  render: (h) => h(App),
  router: router,
}).$mount("#app");
