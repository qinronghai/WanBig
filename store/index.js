import Vue from "vue";
import Vuex from "vuex";

// 把Vuex作为插件 引入到Vue全局实例中
Vue.use(Vuex);

const store = new Vuex.Store({
  // 全局状态
  state: {
    username: "zhangsan",
    age: 18,
  },
  // 修改状态
  mutations: {},
  // 异步修改状态
  actions: {},
});

export default store;
