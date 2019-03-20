import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import { MdButton, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import BootstrapLifecycle from './BootstrapLifecycle';

Vue.use(MdButton)
Vue.use(MdTabs)

Vue.config.productionTip = false;

const lifecycleMiddleware = new BootstrapLifecycle();

lifecycleMiddleware.setData({});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
