(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/components/uni-exhibit-tip"],{217:function(n,t,e){"use strict";e.r(t);var r=e(218),o=e(220);for(var c in o)"default"!==c&&function(n){e.d(t,n,(function(){return o[n]}))}(c);e(222);var i,u=e(14),a=Object(u["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,"d178feaa",null,!1,r["components"],i);a.options.__file="pages/my/components/uni-exhibit-tip.vue",t["default"]=a.exports},218:function(n,t,e){"use strict";e.r(t);var r=e(219);e.d(t,"render",(function(){return r["render"]})),e.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),e.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),e.d(t,"components",(function(){return r["components"]}))},219:function(n,t,e){"use strict";var r;e.r(t),e.d(t,"render",(function(){return o})),e.d(t,"staticRenderFns",(function(){return i})),e.d(t,"recyclableRender",(function(){return c})),e.d(t,"components",(function(){return r}));var o=function(){var n=this,t=n.$createElement;n._self._c},c=!1,i=[];o._withStripped=!0},220:function(n,t,e){"use strict";e.r(t);var r=e(221),o=e.n(r);for(var c in r)"default"!==c&&function(n){e.d(t,n,(function(){return r[n]}))}(c);t["default"]=o.a},221:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){e.e("common/vendor").then(function(){return resolve(e(202))}.bind(null,e)).catch(e.oe)},o=wx.cloud.database(),c={components:{towxml:r},data:function(){return{content:"",content2:"",showPage:!1}},mounted:function(){var n=this,t=new Date;o.collection("swiper").doc("f6e08a6463021e9e13f9f87d147833e6").get().then((function(e){var r=e.data.time;n.showPage=!(t<r)}));var e='# 温馨提示\n\n> 《湾大闲置品小铺》目前是个人开发的小项目，前身是《湾大杂货铺》。\n>  \n为了长期更好的维护，请了解以下公约：\n\n## 发布商品\n\n### 要求\n\n1. 图片不多于3张，如果是实拍，请尽量保持背景整洁，单独拍摄。\n2. 同一样闲置品不可重复发布。\n3. 闲置品的介绍，不可涉及政治、色情、赌博、毒品等敏感字眼。\n4. 闲置品的图片，不可含有色情内容。\n\n以上希望大家自觉遵守，本小程序内设内容安全审核机制，如违反则是审核不通过的。\n\n### 备注\n\n提交审核后，请同意如下的发送通知请求：\n\n<img src="/tip.jpg" style="width:150px;height:150px;" />\n\n同意之后方可在微信中接收到我们给你发送的审核结果和预定成功的通知。\n\n\n',r="# 项目介绍\n\n> 本项目的前身是《湾大杂货铺》，《湾大杂货铺》重新命名为《湾大闲置品小铺》。\n\n## 主要功能\n\n主要功能在之前的基础上，添加了：\n\n1. 全新的设计及重构。\n2. 增加成功的通知。\n3. 增加算法机制。\n\n\n## 最后\n\n相当于自己重新把这个项目写了一遍，写了很久，还有很多预想的没有实现。写累了，大家能用就用，我哪天感觉不累了再改改。\n";this.content=this.towxml(e,"markdown",{base:"../../../static"}),this.content2=this.towxml(r,"markdown",{base:"../../../static"})},methods:{}};t.default=c},222:function(n,t,e){"use strict";e.r(t);var r=e(223),o=e.n(r);for(var c in r)"default"!==c&&function(n){e.d(t,n,(function(){return r[n]}))}(c);t["default"]=o.a},223:function(n,t,e){}}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/components/uni-exhibit-tip.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/my/components/uni-exhibit-tip-create-component',
    {
        'pages/my/components/uni-exhibit-tip-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(217))
        })
    },
    [['pages/my/components/uni-exhibit-tip-create-component']]
]);
