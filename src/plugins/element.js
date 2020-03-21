import Vue from "vue";
import { Button, Select, Option, Table, TableColumn, Dialog, Notification, Loading, Row, Col, Container, Main } from "element-ui";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";

locale.use(lang);

Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Row);
Vue.use(Col);
Vue.use(Container);
Vue.use(Main);
Vue.prototype.$notify = Notification;
Vue.use(Loading.directive);
