import Vue from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import { Button, Select, Option } from 'element-ui';

Vue.use(Button);
Vue.use(Select);
Vue.use(Option);

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");
