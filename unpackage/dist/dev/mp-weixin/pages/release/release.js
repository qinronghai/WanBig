(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/release/release"],{69:function(e,t,n){"use strict";(function(e){n(5);o(n(4));var t=o(n(70));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])},70:function(e,t,n){"use strict";n.r(t);var o=n(71),r=n(73);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n(77);var a,s=n(14),c=Object(s["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,"0766b1d4",null,!1,o["components"],a);c.options.__file="pages/release/release.vue",t["default"]=c.exports},71:function(e,t,n){"use strict";n.r(t);var o=n(72);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},72:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return a})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return o}));var r=function(){var e=this,t=e.$createElement;e._self._c},i=!1,a=[];r._withStripped=!0},73:function(e,t,n){"use strict";n.r(t);var o=n(74),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},74:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(9)),r=n(75),i=n(76);function a(e){return e&&e.__esModule?e:{default:e}}function s(e){return d(e)||l(e)||u(e)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(e,t){if(e){if("string"===typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}function l(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function d(e){if(Array.isArray(e))return f(e)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function h(e,t,n,o,r,i,a){try{var s=e[i](a),c=s.value}catch(error){return void n(error)}s.done?t(c):Promise.resolve(c).then(o,r)}function g(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var i=e.apply(t,n);function a(e){h(i,o,r,a,s,"next",e)}function s(e){h(i,o,r,a,s,"throw",e)}a(void 0)}))}}var p=function(){n.e("pages/release/components/uni-goods-desc").then(function(){return resolve(n(157))}.bind(null,n)).catch(n.oe)},v=function(){Promise.all([n.e("common/vendor"),n.e("pages/release/components/uni-book-release")]).then(function(){return resolve(n(164))}.bind(null,n)).catch(n.oe)},m=function(){n.e("common/vendor").then(function(){return resolve(n(171))}.bind(null,n)).catch(n.oe)},w=function(){n.e("common/vendor").then(function(){return resolve(n(174))}.bind(null,n)).catch(n.oe)},y=function(){n.e("common/vendor").then(function(){return resolve(n(179))}.bind(null,n)).catch(n.oe)},b=function(){n.e("common/vendor").then(function(){return resolve(n(181))}.bind(null,n)).catch(n.oe)},x=wx.cloud.database(),k=x.command,T=function(){n.e("common/vendor").then(function(){return resolve(n(182))}.bind(null,n)).catch(n.oe)},I={components:{UniGoodsDesc:p,UniBookRelease:v,VanPopup:w,VanIcon:m,VanPicker:y,Toast:b,towxml:T},data:function(){return{content:"",navList:[{id:1,img:"../../static/category-nav/books.svg",txt:"书籍资料"},{id:2,img:"../../static/category-nav/iphone.svg ",txt:"电子设备"},{id:3,img:"../../static/category-nav/fitness.svg",txt:"健身器材"},{id:4,img:"../../static/category-nav/brush.svg",txt:"美妆日化"},{id:5,img:"../../static/category-nav/clothes.svg",txt:"服装服饰"},{id:6,img:"../../static/category-nav/other.svg",txt:"其他宝贝"}],qualityList:[{id:1,title:"全新"},{id:2,title:"几乎全新"},{id:3,title:"轻微痕迹"},{id:4,title:"明显痕迹"}],showPage:2,showGoodsCategory:!1,showGoodQuality:!1,showCategoryArrow:!0,showQualityArrow:!0,rightIndex:0,clickCateIndex:0,areaRadio:!0,needRadio:!0,transportRadio:!0,ischeckText:!1,fileList:[],category:"其他宝贝",quality:"全新",need:"出",title:"",price:"",area:"西区",floorNum:"",contact:"",views:0,releaseTime:"",transport:"自提",userInfo:{},audited:!1,buy:!1,buyTime:"1"}},onLoad:function(t){var n=this;return g(o.default.mark((function t(){var r,i;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return new Date,r="# 项目介绍\n\n本项目的前身是《湾大杂货铺》(于2021年11月份开发完成上线)，上线之后经过小规模的校园推广，注册登录用户后台显示达2500人。由于初次开发，能力有限，代码有诸多的bug且本人时间精力有限，很大程度是我想重新重构这个项目，然后《湾大杂货铺》小程序停止了维护。\n\n后面我转入学习vue和uniapp，记不清具体什么时间点才重新重构《湾大杂货铺》了。好在最后也完成了。可是我又觉得是从一座代码屎山到另外一座代码屎山罢了。\n\n当初我的想法是，在原来《湾大杂货铺》的基础上，把书籍部分的逻辑抽离出来做一个二手书市场。后来也不清楚，为什么这部分没做。所以这一版的书籍部分还是混在一起的。\n\n\n## 2023-09-12\n### 重启项目\n\n\n## 2022-08-09\n### 主要功能\n\n主要功能在之前的基础上，添加了：\n\n1. 全新的设计及重构。\n2. 增加成功的通知。\n3. 增加算法机制。\n",n.content=n.towxml(r,"markdown",{base:"../../static"}),i=e.getStorageSync("openid"),t.next=6,x.collection("user").where({_openid:i}).get().then((function(t){console.log("获取最新的用户数据",t),n.userInfo=t.data[0],e.setStorageSync("userInfo",n.userInfo)}));case 6:case"end":return t.stop()}}),t)})))()},onShow:function(){console.log("发布页面显示"),this.userInfo=e.getStorageSync("userInfo")},onShareAppMessage:function(){},methods:{getGoodTitle:function(e){console.log("des组件传title值过来了--",e),this.title=e},deleteImg:function(e){var t=e.detail.index,n=this.fileList;n.splice(t,1),this.fileList=n,console.log("删除--图片--成功",this.fileList)},afterRead:function(e){var t,n=e.detail.file;console.log("图片列表",n);var o=n.map((function(e){return{url:e.thumb}}));console.log("afterRead--添加的图片：",o),(t=this.fileList).push.apply(t,s(o)),console.log("afterRead--添加后的图片列表：",this.fileList)},areaRadioChange:function(e){this.area=e.detail.value},transportRadioChange:function(e){this.transport=e.detail.value,console.log("改变--运送方式：",e.detail.value)},handleContact:function(e){var t=e.detail.value,n=new RegExp("^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$"),o=new RegExp("^[1-9][0-9]{4,9}$"),r=n.test(t),i=o.test(t);if(r){var a="微信："+t;this.contact=a,console.log(a)}else if(i){var s="QQ："+t;this.contact=s,console.log(s)}},handlePrice:function(e){var t=parseInt(e.detail.value);this.price=t,console.log("价格："+t)},handleFloorNum:function(e){this.floorNum=e.detail.value},handleCategory:function(e){var t=this.navList[e-1].txt;console.log("点击了商品分类--",this.navList[e-1].txt),this.category=t,this.clickCateIndex=e,this.showGoodsCategory=!1,this.showCategoryArrow=!1},showPopup:function(){this.showGoodsCategory=!0},showGoodQualityPopup:function(){this.showGoodQuality=!0},onCloseGoodsCategory:function(){this.showGoodsCategory=!1},onCloseGoodQuality:function(){this.showGoodQuality=!1},rightTap:function(e){this.rightIndex=e;var t=this.qualityList[e].title;console.log("商品成色："+t),this.quality=t,this.showGoodQuality=!1,this.showQualityArrow=!1},needRadioChange:function(e){this.need=e.detail.value},subscribNews:function(){var e=this;return g(o.default.mark((function t(){var n,r;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n="W6CsnO_5tp5kxNFMjFsh9z7PwuXWe_OUyXHxsNQeTag",r=e,wx.requestSubscribeMessage({tmplIds:["W6CsnO_5tp5kxNFMjFsh9z7PwuXWe_OUyXHxsNQeTag","9Fs4ueUrKEpp1brJDggbOcQ-m3TAOLVEc6SwBxGY3l4"],success:function(e){console.log(e),"accept"==e[n]?wx.showToast({title:"订阅成功！",duration:1e3,success:function(){console.log("订阅消息--成功"),r.submitAudit()}}):wx.showModal({content:"未授权发送通知，您将收不到通知！",confirmText:"重新授权",cancelText:"取消授权",success:function(e){e.confirm?r.subscribNews():console.log("用户取消授权")}})}});case 3:case"end":return t.stop()}}),t)})))()},submitAudit:function(){var e=this;return g(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.checkText(e.title,e.openid);case 2:if(console.log("文本检测--ischeckText is --"+e.ischeckText),!e.ischeckText){t.next=7;break}return t.next=6,(0,i.delay)(1e3);case 6:e.upLoadImage();case 7:case"end":return t.stop()}}),t)})))()},handleSubmitBtn:function(){var t=this;return g(o.default.mark((function n(){var r,i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r=e.getStorageSync("userInfo"),console.log("----teest---",r),i=t,null==r.nickName?(console.log("您还未登录，请登录之后，再提交审核。"),wx.showModal({title:"提示",content:"您还未登录，请登录之后，再提交审核",success:function(t){t.confirm?(console.log("用户点击确定"),e.switchTab({url:"/pages/my/my"})):t.cancel&&console.log("用户点击取消")}})):(t.openid=e.getStorageSync("openid"),wx.showModal({title:"提示",content:"确定要提交审核吗？",success:function(e){return g(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.confirm){t.next=6;break}return console.log("用户点击确定"),t.next=4,i.subscribNews();case 4:t.next=7;break;case 6:e.cancel&&console.log("用户点击取消");case 7:case"end":return t.stop()}}),t)})))()}}));case 4:case"end":return n.stop()}}),n)})))()},checkText:function(e,t){var n=this;return g(o.default.mark((function e(){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:wx.showLoading({title:"文本合法性检测中",mask:!0}),n.ischeckText=!0;case 2:case"end":return e.stop()}}),e)})))()},upLoadGoodInfo:function(){var t=this;return g(o.default.mark((function n(){var r,i,a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=t.userInfo,t.releaseTime=new Date,i={title:t.title,pics:t.fileList,price:t.price,contact:t.contact,address:t.address,category:t.category,quality:t.quality,need:t.need,views:t.views,transport:t.transport,releaseTime:t.releaseTime,userInfo:r,audited:t.audited,buy:!1,buyTime:t.buyTime,pass:!1},t.goodInfo=i,console.log("上传商品信息之前--合成后的商品数据：",i),a=t.checkGoodInfo(t.goodInfo),console.log("校验商品信息--已填写--",a),!a){n.next=11;break}return t,n.next=11,x.collection("goods").add({data:{title:t.title,pics:t.fileList,price:t.price,contact:t.contact,address:t.address,category:t.category,quality:t.quality,transport:t.transport,need:t.need,views:t.views,releaseTime:t.releaseTime,userInfo:r,audited:t.audited,buy:!1,buyTime:t.buyTime,pass:!1}}).then((function(n){console.log("上传商品信息--存入数据库--成功",n),x.collection("user").doc(r._id).update({data:{goodsNum:k.inc(1)},success:function(e){console.log("更新--商品数--成功",e)}}),wx.showToast({title:"已提交，审核中",icon:"success",duration:2e3,mark:!0}).then((function(n){setTimeout((function(){Object.assign(t.$data,t.$options.data()),e.switchTab({url:"/pages/index-store/index-store"})}),1500)}))}));case 11:case"end":return n.stop()}}),n)})))()},upLoadImage:function(){var e=this;return g(o.default.mark((function t(){var n,i,a;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.fileList,i=o.default.mark((function t(i){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(n[i].url),t.next=3,(0,r.request)(n[i].url).then((function(t){n[i].url=t.fileID,204===t.statusCode&&console.log("上传图片--"+(i+1)+"--成功"),i===n.length-1&&204===t.statusCode&&(console.log("上传图片--全部图片--上传完毕"),e.upLoadGoodInfo())}));case 3:case"end":return t.stop()}}),t)})),a=0;case 3:if(!(a<n.length)){t.next=8;break}return t.delegateYield(i(a),"t0",5);case 5:a++,t.next=3;break;case 8:case"end":return t.stop()}}),t)})))()},checkGoodInfo:function(e){var t=Object.values(e);try{t.forEach((function(e){if(""===e)throw console.log("检测商品信息完整性--不完整"),new error}))}catch(error){return wx.showToast({title:"还有没填的信息",icon:"error",duration:2500}),!1}return console.log("检测商品信息完整性--完整"),!0}},computed:{address:function(){return console.log("地址："+this.area+" "+this.floorNum),this.area+" "+this.floorNum}}};t.default=I}).call(this,n(1)["default"])},77:function(e,t,n){"use strict";n.r(t);var o=n(78),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},78:function(e,t,n){}},[[69,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/release/release.js.map