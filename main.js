import App from "./App";

Vue.prototype.towxml = require("./static/towxml/index.js");
// #ifndef VUE3
import Vue from "vue";
import store from "./store/index.js";

Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
  store, // 把store对象提供给“store”选项，这可以把store的实例注入所有的子组件中
});
// Vue.forceUpdate();
// Vue.forceUpdate();
app.$mount();
// #endif
// #ifdef VUE3
import { createSSRApp } from "vue";
import { curlywedge } from "./static/towxml/parse/parse2/entities/maps/entities";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
