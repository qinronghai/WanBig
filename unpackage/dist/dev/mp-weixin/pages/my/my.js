(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{79:function(e,n,t){"use strict";(function(e){t(5);o(t(4));var n=o(t(80));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},80:function(e,n,t){"use strict";t.r(n);var o=t(81),r=t(83);for(var c in r)"default"!==c&&function(e){t.d(n,e,(function(){return r[e]}))}(c);t(85);var a,u=t(14),i=Object(u["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,"0be17cc6",null,!1,o["components"],a);i.options.__file="pages/my/my.vue",n["default"]=i.exports},81:function(e,n,t){"use strict";t.r(n);var o=t(82);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},82:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return a})),t.d(n,"recyclableRender",(function(){return c})),t.d(n,"components",(function(){return o}));var r=function(){var e=this,n=e.$createElement;e._self._c},c=!1,a=[];r._withStripped=!0},83:function(e,n,t){"use strict";t.r(n);var o=t(84),r=t.n(o);for(var c in o)"default"!==c&&function(e){t.d(n,e,(function(){return o[e]}))}(c);n["default"]=r.a},84:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(t(9));function r(e){return e&&e.__esModule?e:{default:e}}function c(e,n,t,o,r,c,a){try{var u=e[c](a),i=u.value}catch(s){return void t(s)}u.done?n(i):Promise.resolve(i).then(o,r)}function a(e){return function(){var n=this,t=arguments;return new Promise((function(o,r){var a=e.apply(n,t);function u(e){c(a,o,r,u,i,"next",e)}function i(e){c(a,o,r,u,i,"throw",e)}u(void 0)}))}}var u=function(){t.e("pages/my/components/uni-top-card").then(function(){return resolve(t(183))}.bind(null,t)).catch(t.oe)},i=function(){t.e("pages/my/components/uni-exhibit-contact-author").then(function(){return resolve(t(190))}.bind(null,t)).catch(t.oe)},s=function(){t.e("pages/my/components/uni-exhibit-tip").then(function(){return resolve(t(197))}.bind(null,t)).catch(t.oe)},d=function(){t.e("common/vendor").then(function(){return resolve(t(171))}.bind(null,t)).catch(t.oe)},l=wx.cloud.database(),f=l.command,p={components:{VanIcon:d,uniTopCard:u,UniExhibitContactAuthor:i,UniExhibitTip:s},data:function(){return{openid:"",goodsInfo:[],dealedGoodsInfo:[],noDealGoodsInfo:[],noAudit:[],numberkey:0,index:1,navIconList:[{url:"../../static/my/my-goods.svg",title:"我的商品",active:!1},{url:"../../static/my/tip.svg",title:"使用提示",active:!0},{url:"../../static/my/contact-author.svg",title:"联系作者",active:!1},{url:"../../static/my/share.svg",title:"分享软件",active:!1}],btns1:[{text:"成交",color:"#ffffff",background:"#28a745",disabled:!1,size:"14px",type:"added"},{text:"删除",color:"#ffffff",background:"#e42112",disabled:!1,size:"14px",type:"delete"}],btns2:[{text:"删除",color:"#ffffff",background:"#e42112",disabled:!1,size:"14px",type:"delete"}]}},onLoad:function(){var n=a(o.default.mark((function n(t){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("打印出上个页面传递的参数。",t.showLogin),n.next=3,e.getStorageSync("openid");case 3:return this.openid=n.sent,console.log("我的--获取openid--成功",this.openid),this.userInfo=e.getStorageSync("userInfo"),n.next=8,this.getMyGoods(this.openid);case 8:case"end":return n.stop()}}),n,this)})));function t(e){return n.apply(this,arguments)}return t}(),onShareAppMessage:function(){},methods:{onPullDownRefresh:function(){var n=this;return a(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n.userInfo=e.getStorageSync("userInfo"),t.next=3,n.getMyGoods(n.openid);case 3:e.stopPullDownRefresh();case 4:case"end":return t.stop()}}),t)})))()},deleteGoodPicture:function(e){var n=this;return a(o.default.mark((function t(){var r;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n,r=[],e.pics.forEach((function(e){r.push(e.url)})),t.next=5,wx.cloud.deleteFile({fileList:r}).then((function(e){console.log("删除该商品在存储中的照片成功",e.fileList)})).catch((function(e){console.log("删除该商品在存储中的照片失败",e)}));case 5:case"end":return t.stop()}}),t)})))()},deleteData:function(e){var n=this;return a(o.default.mark((function t(){var r;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=n,t.next=3,l.collection("goods").doc(e._id).remove({success:function(e){console.log("删除数据库中的对应商品记录成功",e),r.getMyGoods(r.openid)}});case 3:case"end":return t.stop()}}),t)})))()},addPropertyDeal:function(e){var n=this;return a(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n,t.next=3,l.collection("goods").doc(e._id).update({data:{deal:!0}}).then((function(e){console.log("增加--deal--属性",e)}));case 3:case"end":return t.stop()}}),t)})))()},getMyGoods:function(e){var n=this;return a(o.default.mark((function t(){var r;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=n,wx.showLoading({title:"数据加载中",mark:!0}),t.next=4,l.collection("goods").where({_openid:e}).get().then((function(e){e.data.length>=0?(console.log("获取--我的商品信息--成功",e),r.goodsInfo=e.data,e.data.length>0?r.sortDataForDeal(e.data):0===e.data.length&&(n.dealedGoodsInfo=[],n.noDealGoodsInfo=[],n.noAudit=[])):console.log("获取--我的商品信息--失败")})).catch((function(e){console.log("获取-我的商品信息--出错",e)}));case 4:wx.hideLoading();case 5:case"end":return t.stop()}}),t)})))()},sortDataForDeal:function(e){var n=this;return a(o.default.mark((function t(){var r,c,a;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r=[],c=[],a=[],e.forEach((function(e){!0===e.deal?r.push(e):!0===e.audited?c.push(e):!1===e.audited&&a.push(e)})),n.dealedGoodsInfo=r,n.noDealGoodsInfo=c,n.noAudit=a;case 7:case"end":return t.stop()}}),t)})))()},updateGoodDealNum:function(e){var n=this;return a(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!0!==e){t.next=3;break}return t.next=3,l.collection("user").doc(n.userInfo._id).update({data:{dealNum:f.inc(1),goodsNum:f.inc(-1)},success:function(e){console.log("更新--成交数--成功",e)}});case 3:case"end":return t.stop()}}),t)})))()},chenRender:function(){this.numberkey+=1},toggleNav:function(e){console.log("点击了--"+this.navIconList[e].title),this.navIconList.forEach((function(e){e.active=!1})),this.navIconList[e].active=!0,this.index=e},toGoodDetailPage:function(n){var t=this.goodsInfo;e.setStorageSync("goodsInfoFlag",t),e.navigateTo({url:"/pages/goods-detail/goods-detail?goodId="+n+"&flag=1"})},delete2:function(e,n){var t=this;wx.showModal({title:"提示",content:"是否确定下架该商品？",success:function(r){return a(o.default.mark((function c(){return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(!r.confirm){o.next=11;break}return console.log("用户点击确定--确定下架该商品"),o.next=4,t.deleteGoodPicture(e);case 4:return o.next=6,t.deleteData(e);case 6:if(!0!==n){o.next=9;break}return o.next=9,l.collection("user").doc(t.userInfo._id).update({data:{goodsNum:f.inc(-1)},success:function(e){console.log("更新--商品数量--成功",e),setTimeout((function(){wx.showToast({title:"成功下架该商品",icon:"success",duration:2e3,mask:!0})}),1500)}});case 9:o.next=12;break;case 11:r.cancel&&console.log("用户点击取消--取消下架该商品");case 12:case"end":return o.stop()}}),c)})))()}})},deal:function(e,n){var t=this;wx.showModal({title:"提示",content:"该商品是否已成交？",success:function(r){return a(o.default.mark((function c(){return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(!r.confirm){o.next=10;break}return console.log("用户确定该商品已成交"),o.next=4,t.updateGoodDealNum(n);case 4:return o.next=6,t.addPropertyDeal(e);case 6:return o.next=8,t.getMyGoods(t.openid);case 8:o.next=11;break;case 10:r.cancel&&console.log("用户点击取消");case 11:case"end":return o.stop()}}),c)})))()}})}}};n.default=p}).call(this,t(1)["default"])},85:function(e,n,t){"use strict";t.r(n);var o=t(86),r=t.n(o);for(var c in o)"default"!==c&&function(e){t.d(n,e,(function(){return o[e]}))}(c);n["default"]=r.a},86:function(e,n,t){}},[[79,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map