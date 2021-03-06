import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import BootstrapLifecycle from './BootstrapLifecycle';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
// import 'vue-material/dist/theme/default-dark.css';

Vue.config.productionTip = false;

const lifecycleMiddleware = new BootstrapLifecycle();

lifecycleMiddleware.setData({});

Vue.use(VueMaterial);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
