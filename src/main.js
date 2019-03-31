import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueLazyload from "vue-lazyload";
import "./../node_modules/bulma/css/bulma.css";

Vue.config.productionTip = false;

Vue.use(VueLazyload);

new Vue({
  render: h => h(App)
}).$mount("#app");
