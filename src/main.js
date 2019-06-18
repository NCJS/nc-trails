import Vue from "vue";
import App from "./App.vue";
import { ClientTable } from "vue-tables-2";

Vue.use(ClientTable);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
