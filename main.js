import App from "./App";
Vue.prototype.towxml = require("./static/towxml/index.js");
// #ifndef VUE3
import Vue from "vue";
Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
});
// Vue.forceUpdate();
// Vue.forceUpdate();
app.$mount();
// #endif
// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
