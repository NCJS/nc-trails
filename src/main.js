import Vue from "vue";
import App from "./App.vue";
import Home from "./Home.vue";
import About from "./About.vue";
import { ClientTable } from "vue-tables-2";
import "leaflet/dist/leaflet.css";
import VueRouter from "vue-router";
import { hostname } from "os";

Vue.use(ClientTable);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  {
    path:'/',
    name: 'Home',
    component: Home
  },
  {
    path:'/Home',
    name: 'Home',
    component:Home
  },
  {
    path:'/About',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
