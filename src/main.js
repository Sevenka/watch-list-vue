import Vue from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

locale.use(lang);
import { Button, Select, Option, Table, TableColumn, Dialog, Notification, Loading } from 'element-ui';

Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.prototype.$notify = Notification;
Vue.use(Loading.directive);

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");
