import uniAsync from "@/js_sdk/i-uni-async/uni-async.js";
import checkRegisterStatus from "@/js_sdk/utils/check-register-status.js";
import App from "./App";

// #ifndef VUE3
import Vue from "vue";

Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
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
// 重新编辑传递的值
Vue.prototype.$reEditItem = {};

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
