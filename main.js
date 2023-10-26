import uniAsync from "@/js_sdk/i-uni-async/uni-async.js";
import checkRegisterStatus from "@/js_sdk/utils/check-register-status.js";
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

// 将wxapp的this.setData语法封装成一个函数，因为uniapp不支持setData语法
Vue.prototype.setData = async function (data) {
  let _this = this;
  for (let key in data) {
    _this[key] = data[key];
  }
};
// 异步化uni方法，支持async/await调用
Vue.prototype.$uniAsync = uniAsync;

// 检查用户是否注册
Vue.prototype.$checkRegisterStatus = checkRegisterStatus;

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
