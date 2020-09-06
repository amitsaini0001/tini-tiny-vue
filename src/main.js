import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { VLazyImagePlugin } from "v-lazy-image";
import VueLazyload from 'vue-lazyload';
import VModal from 'vue-js-modal';



Vue.use(Buefy);
Vue.use(VModal);

Vue.use(VLazyImagePlugin);
Vue.use(VueLazyload);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
