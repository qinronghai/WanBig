(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/index-store/index-store"],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/*!*******************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/main.js?{"page":"pages%2Findex-store%2Findex-store"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);


var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _indexStore = _interopRequireDefault(__webpack_require__(/*! ./pages/index-store/index-store.vue */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;createPage(_indexStore.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),
/* 16 */
/*!************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/pages/index-store/index-store.vue ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_store_vue_vue_type_template_id_fe52f258_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-store.vue?vue&type=template&id=fe52f258&scoped=true& */ 17);
/* harmony import */ var _index_store_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-store.vue?vue&type=script&lang=js& */ 19);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_store_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_store_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_store_vue_vue_type_style_index_0_id_fe52f258_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index-store.vue?vue&type=style&index=0&id=fe52f258&lang=scss&scoped=true& */ 21);
/* harmony import */ var _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_store_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_store_vue_vue_type_template_id_fe52f258_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_store_vue_vue_type_template_id_fe52f258_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "fe52f258",
  null,
  false,
  _index_store_vue_vue_type_template_id_fe52f258_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/index-store/index-store.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 17 */
/*!*******************************************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/pages/index-store/index-store.vue?vue&type=template&id=fe52f258&scoped=true& ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_template_id_fe52f258_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index-store.vue?vue&type=template&id=fe52f258&scoped=true& */ 18);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_template_id_fe52f258_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_template_id_fe52f258_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_template_id_fe52f258_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_template_id_fe52f258_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 18 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/My-Document/projects/WanBig/pages/index-store/index-store.vue?vue&type=template&id=fe52f258&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 19 */
/*!*************************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/pages/index-store/index-store.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index-store.vue?vue&type=script&lang=js& */ 20);
/* harmony import */ var _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 20 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/My-Document/projects/WanBig/pages/index-store/index-store.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var uniGoodsCard = function uniGoodsCard() {__webpack_require__.e(/*! require.ensure | pages/index-store/components/uni-goods-card */ "pages/index-store/components/uni-goods-card").then((function () {return resolve(__webpack_require__(/*! ./components/uni-goods-card.vue */ 75));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniBanner = function uniBanner() {__webpack_require__.e(/*! require.ensure | pages/index-store/components/uni-banner */ "pages/index-store/components/uni-banner").then((function () {return resolve(__webpack_require__(/*! ./components/uni-banner.vue */ 82));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var UniGoodsCard = function UniGoodsCard() {__webpack_require__.e(/*! require.ensure | pages/index-store/components/uni-goods-card */ "pages/index-store/components/uni-goods-card").then((function () {return resolve(__webpack_require__(/*! ./components/uni-goods-card.vue */ 75));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var UniProductCatgNav = function UniProductCatgNav() {__webpack_require__.e(/*! require.ensure | pages/index-store/components/uni-product-catg-nav */ "pages/index-store/components/uni-product-catg-nav").then((function () {return resolve(__webpack_require__(/*! ./components/uni-product-catg-nav.vue */ 89));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};

























































































var db = wx.cloud.database();var _default =
{
  components: { uniBanner: uniBanner, UniProductCatgNav: UniProductCatgNav, UniGoodsCard: UniGoodsCard, uniGoodsCard: uniGoodsCard },
  data: function data() {
    return {
      searchKey: '商品',
      pics: [],
      goodsInfo: [],
      jsData: {
        columnsHeight: [0, 0],
        isLoading: false },

      columns: [[], []],
      indexObj: {},
      tempPics: [],
      Mode: "Loop",
      isShow: false,
      columnLeft: [],
      columnRight: [],
      catgList: [
      {
        id: 1,
        img: "../../static/category-nav/all.svg",
        title: "全部商品",
        isActive: true },


      {
        id: 2,
        img: "../../static/category-nav/iphone.svg",
        title: "电子设备",
        isActive: false },

      {
        id: 3,
        img: "../../static/category-nav/fitness.svg",
        title: "健身器材",
        isActive: false },

      {
        id: 4,
        img: "../../static/category-nav/brush.svg",
        title: "美妆日化",
        isActive: false },

      {
        id: 5,
        img: "../../static/category-nav/clothes.svg",
        title: "服装服饰",
        isActive: false },

      {
        id: 6,
        img: "../../static/category-nav/other.svg",
        title: "其他宝贝",
        isActive: false }],


      sum: 0,
      itemList: [
      {
        id: 1,
        title: "第一张图片",
        img: "../../static/banner/curtain.svg" },

      {
        id: 2,
        title: "第二张图片",
        img: "../../static/banner/curtain.svg" },

      {
        id: 3,
        title: "第三张图片",
        img: "../../static/banner/curtain.svg" }] };



  },
  onShow: function onShow() {
    console.log("index Page Show");
  },
  methods: {
    toSearchPage: function toSearchPage() {
      console.log(this.searchKey);
      // 跳转搜索结果页
      uni.navigateTo({
        url: '/pages/search-res/search-res?searchKey=' + this.searchKey });

    },
    loadGoodsInfo: function loadGoodsInfo() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                // 向数据库发送请求
                console.log('请求数据库--');_context.next = 3;return (
                  db.collection('goods').where({
                    audited: false }).
                  get().then(function (res) {
                    // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
                    console.log(res.data);
                    _this.goodsInfo = res.data;
                    var goodsInfo = res.data;
                    goodsInfo.forEach(function (item) {
                      item.pics = item.pics[0].url;
                    });
                    console.log('test----', goodsInfo);
                    // 拆分两边

                    var columnLeft = goodsInfo.filter(function (item, index) {
                      return index % 2 === 0;
                    });
                    var columnRight = goodsInfo.filter(function (item, index) {
                      return index % 2 !== 0;
                    });
                    if (goodsInfo.length % 2 !== 0) {
                      columnRight.push({
                        pics: "cloud://wb-dev-test-5g8b8c8u14429de5.7762-wb-dev-test-5g8b8c8u14429de5-1306682869/good-pictures/1658999835919-430",
                        transport: "不送",
                        title: "曾梦想仗剑走天涯，没想到码农过一生",
                        price: 100,
                        quality: "底部彩蛋" });

                    }
                    _this.columnLeft = columnLeft;
                    _this.columnRight = columnRight;

                    console.log(columnLeft, columnRight);
                    _this.goodsInfo = goodsInfo;

                  }));case 3:case "end":return _context.stop();}}}, _callee);}))();
    },
    toggleCategory: function toggleCategory(id) {
      console.log('切换到了--' + this.catgList[id].title + '--分类');

      this.catgList.forEach(function (item) {
        item.isActive = false;
      });

      this.catgList[id].isActive = true;
    } },

  mounted: function mounted() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                _this2.loadGoodsInfo());case 2:case "end":return _context2.stop();}}}, _callee2);}))();
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 21 */
/*!**********************************************************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/pages/index-store/index-store.vue?vue&type=style&index=0&id=fe52f258&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_style_index_0_id_fe52f258_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index-store.vue?vue&type=style&index=0&id=fe52f258&lang=scss&scoped=true& */ 22);
/* harmony import */ var _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_style_index_0_id_fe52f258_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_style_index_0_id_fe52f258_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_style_index_0_id_fe52f258_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_style_index_0_id_fe52f258_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_store_vue_vue_type_style_index_0_id_fe52f258_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 22 */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/My-Document/projects/WanBig/pages/index-store/index-store.vue?vue&type=style&index=0&id=fe52f258&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })
],[[15,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index-store/index-store.js.map