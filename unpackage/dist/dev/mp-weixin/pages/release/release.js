(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/release/release"],{

/***/ 69:
/*!***********************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/main.js?{"page":"pages%2Frelease%2Frelease"} ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);


var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _release = _interopRequireDefault(__webpack_require__(/*! ./pages/release/release.vue */ 70));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;createPage(_release.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 70:
/*!****************************************************************!*\
  !*** D:/My-Document/projects/WanBig/pages/release/release.vue ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _release_vue_vue_type_template_id_0766b1d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./release.vue?vue&type=template&id=0766b1d4&scoped=true& */ 71);
/* harmony import */ var _release_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./release.vue?vue&type=script&lang=js& */ 73);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _release_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _release_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _release_vue_vue_type_style_index_0_id_0766b1d4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./release.vue?vue&type=style&index=0&id=0766b1d4&lang=scss&scoped=true& */ 77);
/* harmony import */ var _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _release_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _release_vue_vue_type_template_id_0766b1d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _release_vue_vue_type_template_id_0766b1d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0766b1d4",
  null,
  false,
  _release_vue_vue_type_template_id_0766b1d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/release/release.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 71:
/*!***********************************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/pages/release/release.vue?vue&type=template&id=0766b1d4&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_template_id_0766b1d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./release.vue?vue&type=template&id=0766b1d4&scoped=true& */ 72);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_template_id_0766b1d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_template_id_0766b1d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_template_id_0766b1d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_template_id_0766b1d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 72:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/My-Document/projects/WanBig/pages/release/release.vue?vue&type=template&id=0766b1d4&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 73:
/*!*****************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/pages/release/release.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./release.vue?vue&type=script&lang=js& */ 74);
/* harmony import */ var _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 74:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/My-Document/projects/WanBig/pages/release/release.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 9));
































































































































































var _index = __webpack_require__(/*! ../../async/index */ 75);





var _delay = __webpack_require__(/*! ../utils/delay */ 76);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var UniGoodsDesc = function UniGoodsDesc() {__webpack_require__.e(/*! require.ensure | pages/release/components/uni-goods-desc */ "pages/release/components/uni-goods-desc").then((function () {return resolve(__webpack_require__(/*! ./components/uni-goods-desc.vue */ 157));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var UniBookRelease = function UniBookRelease() {Promise.all(/*! require.ensure | pages/release/components/uni-book-release */[__webpack_require__.e("common/vendor"), __webpack_require__.e("pages/release/components/uni-book-release")]).then((function () {return resolve(__webpack_require__(/*! ./components/uni-book-release.vue */ 164));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var VanIcon = function VanIcon() {__webpack_require__.e(/*! require.ensure | wxcomponents/vant/icon/index */ "common/vendor").then((function () {return resolve(__webpack_require__(/*! ../../wxcomponents/vant/icon */ 171));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var VanPopup = function VanPopup() {__webpack_require__.e(/*! require.ensure | wxcomponents/vant/popup/index */ "common/vendor").then((function () {return resolve(__webpack_require__(/*! ../../wxcomponents/vant/popup/index */ 174));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var VanPicker = function VanPicker() {__webpack_require__.e(/*! require.ensure | wxcomponents/vant/picker/index */ "common/vendor").then((function () {return resolve(__webpack_require__(/*! ../../wxcomponents/vant/picker */ 179));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var Toast = function Toast() {__webpack_require__.e(/*! require.ensure | wxcomponents/vant/toast/index */ "common/vendor").then((function () {return resolve(__webpack_require__(/*! ../../wxcomponents/vant/toast */ 181));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var db = wx.cloud.database();var _ = db.command;var towxml = function towxml() {__webpack_require__.e(/*! require.ensure | static/towxml/towxml */ "common/vendor").then((function () {return resolve(__webpack_require__(/*! ../../static/towxml/towxml */ 182));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =




{
  components: {
    UniGoodsDesc: UniGoodsDesc,
    UniBookRelease: UniBookRelease,
    VanPopup: VanPopup,
    VanIcon: VanIcon,
    VanPicker: VanPicker,
    Toast: Toast,
    towxml: towxml },

  data: function data() {
    return {
      content: '',
      navList: [{
        id: 1,
        img: "../../static/category-nav/books.svg",
        txt: "书籍资料" },

      {
        id: 2,
        img: "../../static/category-nav/iphone.svg ",
        txt: "电子设备" },

      {
        id: 3,
        img: "../../static/category-nav/fitness.svg",
        txt: "健身器材" },

      {
        id: 4,
        img: "../../static/category-nav/brush.svg",
        txt: "美妆日化" },

      {
        id: 5,
        img: "../../static/category-nav/clothes.svg",
        txt: "服装服饰" },

      {
        id: 6,
        img: "../../static/category-nav/other.svg",
        txt: "其他宝贝" }],


      qualityList: [{
        id: 1,
        title: "全新" },

      {
        id: 2,
        title: "几乎全新" },

      {
        id: 3,
        title: "轻微痕迹" },

      {
        id: 4,
        title: "明显痕迹" }],


      // 控制真页面切换 0：fack页面， 1：商品发布页面，2：图书发布页面
      showPage: 2,
      // 显示控制
      showGoodsCategory: false,
      showGoodQuality: false,
      showCategoryArrow: true,
      showQualityArrow: true,

      // 索引判断
      rightIndex: 0,
      clickCateIndex: 0,

      // 复选框控制
      areaRadio: true,
      needRadio: true,
      transportRadio: true,

      // 文本检测通过反馈
      ischeckText: false,

      // 商品图片信息
      fileList: [],
      category: '其他宝贝',
      quality: '全新',
      need: '出',
      title: '',
      price: '',
      area: '西区',
      floorNum: '',
      contact: '',
      views: 0,
      releaseTime: '',
      transport: '自提',
      userInfo: {},

      audited: false,
      buy: false,
      buyTime: '1' };

  },
  onLoad: function onLoad(options) {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var curTime, str, openid;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:

              // 控制页面切换
              curTime = new Date();
              // db.collection('swiper').doc('8de6ebcc65002a6f017fcdd65698e102').get().then((res) => {
              // 	let allowTime = res.data.time;
              // 	console.log("服务器时间", allowTime);
              // 	if (curTime < allowTime) {
              // 		this.showPage = 0;
              // 	} else {
              // 		this.showPage = 1;
              // 	}
              // })

              str = "# \u9879\u76EE\u4ECB\u7ECD\n\n\u672C\u9879\u76EE\u7684\u524D\u8EAB\u662F\u300A\u6E7E\u5927\u6742\u8D27\u94FA\u300B(\u4E8E2021\u5E7411\u6708\u4EFD\u5F00\u53D1\u5B8C\u6210\u4E0A\u7EBF)\uFF0C\u4E0A\u7EBF\u4E4B\u540E\u7ECF\u8FC7\u5C0F\u89C4\u6A21\u7684\u6821\u56ED\u63A8\u5E7F\uFF0C\u6CE8\u518C\u767B\u5F55\u7528\u6237\u540E\u53F0\u663E\u793A\u8FBE2500\u4EBA\u3002\u7531\u4E8E\u521D\u6B21\u5F00\u53D1\uFF0C\u80FD\u529B\u6709\u9650\uFF0C\u4EE3\u7801\u6709\u8BF8\u591A\u7684bug\u4E14\u672C\u4EBA\u65F6\u95F4\u7CBE\u529B\u6709\u9650\uFF0C\u5F88\u5927\u7A0B\u5EA6\u662F\u6211\u60F3\u91CD\u65B0\u91CD\u6784\u8FD9\u4E2A\u9879\u76EE\uFF0C\u7136\u540E\u300A\u6E7E\u5927\u6742\u8D27\u94FA\u300B\u5C0F\u7A0B\u5E8F\u505C\u6B62\u4E86\u7EF4\u62A4\u3002\n\n\u540E\u9762\u6211\u8F6C\u5165\u5B66\u4E60vue\u548Cuniapp\uFF0C\u8BB0\u4E0D\u6E05\u5177\u4F53\u4EC0\u4E48\u65F6\u95F4\u70B9\u624D\u91CD\u65B0\u91CD\u6784\u300A\u6E7E\u5927\u6742\u8D27\u94FA\u300B\u4E86\u3002\u597D\u5728\u6700\u540E\u4E5F\u5B8C\u6210\u4E86\u3002\u53EF\u662F\u6211\u53C8\u89C9\u5F97\u662F\u4ECE\u4E00\u5EA7\u4EE3\u7801\u5C4E\u5C71\u5230\u53E6\u5916\u4E00\u5EA7\u4EE3\u7801\u5C4E\u5C71\u7F62\u4E86\u3002\n\n\u5F53\u521D\u6211\u7684\u60F3\u6CD5\u662F\uFF0C\u5728\u539F\u6765\u300A\u6E7E\u5927\u6742\u8D27\u94FA\u300B\u7684\u57FA\u7840\u4E0A\uFF0C\u628A\u4E66\u7C4D\u90E8\u5206\u7684\u903B\u8F91\u62BD\u79BB\u51FA\u6765\u505A\u4E00\u4E2A\u4E8C\u624B\u4E66\u5E02\u573A\u3002\u540E\u6765\u4E5F\u4E0D\u6E05\u695A\uFF0C\u4E3A\u4EC0\u4E48\u8FD9\u90E8\u5206\u6CA1\u505A\u3002\u6240\u4EE5\u8FD9\u4E00\u7248\u7684\u4E66\u7C4D\u90E8\u5206\u8FD8\u662F\u6DF7\u5728\u4E00\u8D77\u7684\u3002\n\n\n## 2023-09-12\n### \u91CD\u542F\u9879\u76EE\n\n\n## 2022-08-09\n### \u4E3B\u8981\u529F\u80FD\n\n\u4E3B\u8981\u529F\u80FD\u5728\u4E4B\u524D\u7684\u57FA\u7840\u4E0A\uFF0C\u6DFB\u52A0\u4E86\uFF1A\n\n1. \u5168\u65B0\u7684\u8BBE\u8BA1\u53CA\u91CD\u6784\u3002\n2. \u589E\u52A0\u6210\u529F\u7684\u901A\u77E5\u3002\n3. \u589E\u52A0\u7B97\u6CD5\u673A\u5236\u3002\n";






















              _this2.content = _this2.towxml(
              str, 'markdown', {
                base: "../../static" });


              // 获取openid
              openid = uni.getStorageSync('openid');
              // 获取最新的用户数据
              _context.next = 6;return db.collection('user').where({
                _openid: openid }).
              get().then(function (res) {
                console.log('获取最新的用户数据', res);
                _this2.userInfo = res.data[0];
                uni.setStorageSync('userInfo', _this2.userInfo);
              });case 6:case "end":return _context.stop();}}}, _callee);}))();
  },
  onShow: function onShow() {
    console.log("发布页面显示");
    this.userInfo = uni.getStorageSync('userInfo');
  },
  onShareAppMessage: function onShareAppMessage() {},
  methods: {
    getGoodTitle: function getGoodTitle(title) {
      // title就是子组件传过来的值
      console.log('des组件传title值过来了--', title);
      this.title = title;
    },

    deleteImg: function deleteImg(event) {
      // 获取点击图片的下标：
      var index = event.detail.index;
      // 获取fileList数据
      var fileList = this.fileList;
      // 删除对应index的元素
      fileList.splice(index, 1);
      // 重新放回fileList中
      this.fileList = fileList;
      console.log("删除--图片--成功", this.fileList);
    },

    afterRead: function afterRead(event) {var _this$fileList;var

      file =
      event.detail.file;
      console.log("图片列表", file);
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      var pics = file.map(function (item) {
        return {
          url: item.thumb };

      });
      console.log("afterRead--添加的图片：", pics);
      (_this$fileList = this.fileList).push.apply(_this$fileList, _toConsumableArray(pics));
      console.log("afterRead--添加后的图片列表：", this.fileList);


    },

    areaRadioChange: function areaRadioChange(e) {
      this.area = e.detail.value;
    },

    transportRadioChange: function transportRadioChange(e) {
      this.transport = e.detail.value;
      console.log("改变--运送方式：", e.detail.value);
    },

    handleContact: function handleContact(event) {
      var contact = event.detail.value;

      var wxReg = new RegExp("^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$"); //微信号正则校验   
      var qqReg = new RegExp("^[1-9][0-9]{4,9}$"); //QQ号正则校验   

      var flagWX = wxReg.test(contact);
      var flagQQ = qqReg.test(contact);

      if (flagWX) {
        var WX = '微信：' + contact;
        this.contact = WX;
        console.log(WX);
      } else if (flagQQ) {
        var QQ = 'QQ：' + contact;
        this.contact = QQ;
        console.log(QQ);

      }

    },

    handlePrice: function handlePrice(event) {
      var price = parseInt(event.detail.value);
      this.price = price;
      console.log("价格：" + price);
    },

    handleFloorNum: function handleFloorNum(event) {
      this.floorNum = event.detail.value;
    },

    handleCategory: function handleCategory(id) {
      var category = this.navList[id - 1].txt;
      console.log('点击了商品分类--', this.navList[id - 1].txt);
      this.category = category;
      this.clickCateIndex = id;

      this.showGoodsCategory = false;
      this.showCategoryArrow = false;
    },

    showPopup: function showPopup() {
      this.showGoodsCategory = true;
    },

    showGoodQualityPopup: function showGoodQualityPopup() {
      this.showGoodQuality = true;
    },

    onCloseGoodsCategory: function onCloseGoodsCategory() {
      this.showGoodsCategory = false;
    },

    onCloseGoodQuality: function onCloseGoodQuality() {
      this.showGoodQuality = false;
    },

    rightTap: function rightTap(index) {
      this.rightIndex = index;
      var quality = this.qualityList[index].title;
      console.log("商品成色：" + quality);
      this.quality = quality;
      this.showGoodQuality = false;
      this.showQualityArrow = false;
    },

    needRadioChange: function needRadioChange(e) {
      this.need = e.detail.value;
    },

    subscribNews: function subscribNews() {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var tempId, _this;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                tempId = 'W6CsnO_5tp5kxNFMjFsh9z7PwuXWe_OUyXHxsNQeTag';
                _this = _this3;
                wx.requestSubscribeMessage({
                  tmplIds: ['W6CsnO_5tp5kxNFMjFsh9z7PwuXWe_OUyXHxsNQeTag',
                  '9Fs4ueUrKEpp1brJDggbOcQ-m3TAOLVEc6SwBxGY3l4'],

                  success: function success(res) {
                    console.log(res);
                    if (res[tempId] == "accept") {
                      wx.showToast({
                        title: '订阅成功！',
                        duration: 1000,
                        success: function success() {
                          console.log('订阅消息--成功');
                          // 点击订阅成功后再去提交审核
                          _this.submitAudit();
                        } });

                    } else {
                      wx.showModal({
                        content: '未授权发送通知，您将收不到通知！',
                        confirmText: '重新授权',
                        cancelText: '取消授权',
                        success: function success(res) {
                          if (res.confirm) {
                            // 重新授权
                            _this.subscribNews();
                          } else {
                            console.log('用户取消授权');
                          }
                        } });


                    }
                  } });case 3:case "end":return _context2.stop();}}}, _callee2);}))();

    },

    submitAudit: function submitAudit() {var _this4 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (

                  _this4.checkText(_this4.title, _this4.openid));case 2:
                console.log("文本检测--ischeckText is --" + _this4.ischeckText);if (!
                _this4.ischeckText) {_context3.next = 7;break;}_context3.next = 6;return (
                  (0, _delay.delay)(1000));case 6:
                // 文本合法，上传图片
                _this4.upLoadImage();case 7:case "end":return _context3.stop();}}}, _callee3);}))();

    },

    handleSubmitBtn: function handleSubmitBtn() {var _this5 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var userInfo, _this;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:

                userInfo = uni.getStorageSync('userInfo');
                console.log('----teest---', userInfo);
                _this = _this5;
                if (userInfo.nickName == null) {
                  console.log("您还未登录，请登录之后，再提交审核。");
                  wx.showModal({
                    title: '提示',
                    content: '您还未登录，请登录之后，再提交审核',
                    success: function success(res) {
                      if (res.confirm) {
                        console.log('用户点击确定');
                        uni.switchTab({
                          url: '/pages/my/my' });

                      } else if (res.cancel) {
                        console.log('用户点击取消');
                      }
                    } });

                } else {
                  _this5.openid = uni.getStorageSync('openid');
                  wx.showModal({
                    title: '提示',
                    content: '确定要提交审核吗？',
                    success: function success(res) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (!
                                res.confirm) {_context4.next = 6;break;}
                                console.log('用户点击确定');
                                // 让卖家订阅消息
                                _context4.next = 4;return _this.subscribNews();case 4:_context4.next = 7;break;case 6:

                                if (res.cancel) {
                                  console.log('用户点击取消');
                                }case 7:case "end":return _context4.stop();}}}, _callee4);}))();
                    } });

                }case 4:case "end":return _context5.stop();}}}, _callee5);}))();

    },

    checkText: function checkText(text, openid) {var _this6 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
                // 推荐文本内容检测
                // wx.hideLoading();
                wx.showLoading({
                  title: '文本合法性检测中',
                  mask: true });


                _this6.ischeckText = true;
                /* await wx.cloud.callFunction({
                                             name: 'msgcheck',
                                             data: {
                                               content: text,
                                               openid: openid
                                             }
                                           }).then(ckres => {
                                             console.log("文本检测--返回的结果--", ckres);
                                             if (ckres.result.errCode == 0 && (ckres.result).result.label == 100) {
                                               wx.hideLoading();
                                               wx.showToast({
                                                 title: '文本检测通过',
                                                 icon: 'success',
                                                 duration: 1500
                                               })
                                               console.log("文本检测--通过");
                                               this.ischeckText = true;
                                             } else if (ckres.result.errCode === 44004) {
                                               wx.hideLoading();
                                               wx.showToast({
                                                 title: '文本为空',
                                                 icon: 'error',
                                                 duration: 2000
                                               })
                                               this.ischeckText = false;
                                               console.log("文本检测--不通过--文本为空");
                                             } else {
                                               wx.hideLoading();
                                               wx.showModal({
                                                 title: '提示',
                                                 content: '文本检测不通过，可能含敏感信息',
                                                 showCancel: false
                                               })
                                               console.log('文本检测--不通过--含敏感信息');
                                             }
                                           }) */case 2:case "end":return _context6.stop();}}}, _callee6);}))();
    },

    upLoadGoodInfo: function upLoadGoodInfo() {var _this7 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7() {var userInfo, goodInfo, isNotEmpty, _this;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:

                userInfo = _this7.userInfo;
                // 提交时间
                _this7.releaseTime = new Date();
                goodInfo = {
                  title: _this7.title,
                  pics: _this7.fileList,
                  price: _this7.price,
                  contact: _this7.contact,
                  address: _this7.address,
                  category: _this7.category,
                  quality: _this7.quality,
                  need: _this7.need,
                  views: _this7.views,
                  transport: _this7.transport,
                  releaseTime: _this7.releaseTime,
                  userInfo: userInfo,
                  audited: _this7.audited,
                  buy: false,
                  buyTime: _this7.buyTime,
                  pass: false };

                _this7.goodInfo = goodInfo;
                console.log("上传商品信息之前--合成后的商品数据：", goodInfo);
                // 校验数据是否为空
                isNotEmpty = _this7.checkGoodInfo(_this7.goodInfo);
                console.log('校验商品信息--已填写--', isNotEmpty);if (!
                isNotEmpty) {_context7.next = 11;break;}

                // userInfo.goodsNum++;
                _this = _this7;_context7.next = 11;return (
                  db.collection('goods').
                  add({
                    data: {
                      title: _this7.title,
                      pics: _this7.fileList,
                      price: _this7.price,
                      contact: _this7.contact,
                      address: _this7.address,
                      category: _this7.category,
                      quality: _this7.quality,
                      transport: _this7.transport,
                      need: _this7.need,
                      views: _this7.views,
                      releaseTime: _this7.releaseTime,
                      userInfo: userInfo,
                      audited: _this7.audited,
                      buy: false,
                      buyTime: _this7.buyTime,
                      pass: false } }).



                  then(function (res) {
                    console.log('上传商品信息--存入数据库--成功', res);
                    // 更新所在售的商品数量
                    db.collection("user").doc(userInfo._id).update({
                      data: {
                        goodsNum: _.inc(1) },

                      success: function success(res) {
                        console.log('更新--商品数--成功', res);
                      } });

                    wx.showToast({
                      title: '已提交，审核中',
                      icon: 'success',
                      duration: 2000,
                      mark: true }).
                    then(function (res) {

                      setTimeout(function () {
                        // 清空表单
                        Object.assign(_this7.$data, _this7.$options.data());
                        uni.switchTab({
                          url: '/pages/index-store/index-store' });

                      }, 1500);
                    });


                  }));case 11:case "end":return _context7.stop();}}}, _callee7);}))();



    },

    upLoadImage: function upLoadImage() {var _this8 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8() {var fileList, _loop, i;return _regenerator.default.wrap(function _callee8$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:
                fileList = _this8.fileList;_loop = /*#__PURE__*/_regenerator.default.mark(function _loop(
                i) {return _regenerator.default.wrap(function _loop$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:
                          console.log(fileList[i].url);_context8.next = 3;return (
                            (0, _index.request)(fileList[i].url).then(function (result) {
                              fileList[i].url = result.fileID;
                              if (result.statusCode === 204) {
                                console.log('上传图片--' + (i + 1) + '--成功');
                              }

                              if (i === fileList.length - 1 && result.statusCode === 204) {
                                console.log('上传图片--全部图片--上传完毕');
                                _this8.upLoadGoodInfo();
                              }
                            }));case 3:case "end":return _context8.stop();}}}, _loop);});i = 0;case 3:if (!(i < fileList.length)) {_context9.next = 8;break;}return _context9.delegateYield(_loop(i), "t0", 5);case 5:i++;_context9.next = 3;break;case 8:case "end":return _context9.stop();}}}, _callee8);}))();


    },

    checkGoodInfo: function checkGoodInfo(userInfo) {
      var values = Object.values(userInfo);
      try {
        values.forEach(function (item) {
          if (item === '') {
            console.log('检测商品信息完整性--不完整');
            throw new error();
          }
        });
      } catch (error) {
        wx.showToast({
          title: '还有没填的信息',
          icon: 'error',
          duration: 2500 });

        return false;
      }
      console.log('检测商品信息完整性--完整');
      return true;
    } },


  computed: {
    // 商品的地址由 地区+楼号 组成
    address: function address() {
      console.log("地址：" + (this.area + ' ' + this.floorNum));
      return this.area + ' ' + this.floorNum;
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 77:
/*!**************************************************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/pages/release/release.vue?vue&type=style&index=0&id=0766b1d4&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_style_index_0_id_0766b1d4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./release.vue?vue&type=style&index=0&id=0766b1d4&lang=scss&scoped=true& */ 78);
/* harmony import */ var _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_style_index_0_id_0766b1d4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_style_index_0_id_0766b1d4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_style_index_0_id_0766b1d4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_style_index_0_id_0766b1d4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_uni_app_HBuilderX_3_3_13_20220314_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_release_vue_vue_type_style_index_0_id_0766b1d4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 78:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/My-Document/projects/WanBig/pages/release/release.vue?vue&type=style&index=0&id=0766b1d4&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[69,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/release/release.js.map