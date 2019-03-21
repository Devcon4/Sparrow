import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import BootstrapLifecycle from './BootstrapLifecycle';

Vue.config.productionTip = false;

const lifecycleMiddleware = new BootstrapLifecycle();

lifecycleMiddleware.setData({});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
