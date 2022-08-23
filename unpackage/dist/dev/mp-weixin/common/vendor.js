(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';

var messages = {};

var locale;

{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}

function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}

function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom };

  }
}

function populateParameters(result) {var _result$brand =





  result.brand,brand = _result$brand === void 0 ? '' : _result$brand,_result$model = result.model,model = _result$model === void 0 ? '' : _result$model,_result$system = result.system,system = _result$system === void 0 ? '' : _result$system,_result$language = result.language,language = _result$language === void 0 ? '' : _result$language,theme = result.theme,version = result.version,platform = result.platform,fontSizeSetting = result.fontSizeSetting,SDKVersion = result.SDKVersion,pixelRatio = result.pixelRatio,deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "",
    appName: "WanBig",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.5.3",
    uniRuntimeVersion: "3.5.3",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined };


  Object.assign(result, parameters);
}

function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc' };

    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}

function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
  return getLocale$1 ?
  getLocale$1() :
  defaultLanguage;
}

function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }

  return _hostName;
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


var getAppBaseInfo = {
  returnValue: function returnValue(result) {var _result =
    result,version = _result.version,language = _result.language,SDKVersion = _result.SDKVersion,theme = _result.theme;

    var _hostName = getHostName(result);

    var hostLanguage = language.replace('_', '-');

    result = sortObject(Object.assign(result, {
      appId: "",
      appName: "WanBig",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme }));

  } };


var getDeviceInfo = {
  returnValue: function returnValue(result) {var _result2 =
    result,brand = _result2.brand,model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);

    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model }));

  } };


var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);

    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0 }));

  } };


var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {var
    locationReducedAccuracy = result.locationReducedAccuracy;

    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


/**
                    * 框架内 try-catch
                    */
/**
                        * 开发者 try-catch
                        */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}

function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}

var cid;
var cidErrMsg;
var enabled;

function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}

function invokePushCallback(
args)
{
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message) };

    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message) });

    });
  }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }var _getApiCallbacks =




  getApiCallbacks(args),success = _getApiCallbacks.success,fail = _getApiCallbacks.fail,complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'unipush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid };

        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '') };

        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}

var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"WanBig","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: '' };

        properties.virtualHostClass = {
          type: null,
          value: '' };

      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 4 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"WanBig","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"WanBig","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"WanBig","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"WanBig","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent']).call(this.$scope, event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 5 */
/*!*************************************************!*\
  !*** D:/My-Document/projects/WanBig/pages.json ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 10);

/***/ }),
/* 10 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 11);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 11 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 12 */,
/* 13 */,
/* 14 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 15 */
/*!*************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var md = __webpack_require__(/*! ./parse/markdown/index */ 16),
parse = __webpack_require__(/*! ./parse/index */ 48);

module.exports = function (str, type, option) {
  option = option || {};
  var result;
  switch (type) {
    case 'markdown':
      result = parse(md(str), option);
      break;
    case 'html':
      result = parse(str, option);
      break;
    default:
      throw new Error('Invalid type, only markdown and html are supported');
      break;}
  ;
  return result;
};

/***/ }),
/* 16 */
/*!****************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/markdown/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hljs;
hljs = __webpack_require__(/*! ../highlight/index */ 17);

var config = __webpack_require__(/*! ../../config */ 18),
mdOption = function () {
  var result = {
    html: true,
    xhtmlOut: true,
    typographer: true,
    breaks: true };


  if (config.highlight.length && hljs) {
    result.highlight = function (code, lang, callback) {
      var lineLen = code.split(/\r|\n/ig).length,
      result = hljs.highlightAuto(code).value;

      // 代码块多换行的问题
      result = result.replace(/(\r|\n){2,}/g, function (str) {
        return new Array(str.length).join("<p>&nbsp;</p>");
      });
      result = result.replace(/\r|\n/g, function (str) {
        return "<br/>";
      });

      // 代码空格处理
      result = result.replace(/>[^<]+</g, function (str) {
        return str.replace(/\s/g, "&nbsp;");
      }).replace(/\t/g, new Array(4).join("&nbsp;"));

      if (config.showLineNumber) {
        var lineStr = function () {
          var str = "<ul class=\"h2w__lineNum\">";
          for (var i = 0; i < lineLen - 1; i++) {
            str += "<li class=\"h2w__lineNumLine\">".concat(i + 1, "</li>");
          };

          str += "</ul>";
          return str;
        }();
        return lineStr + result;
      };
      return result;
    };
  };
  return result;
}(),
md = __webpack_require__(/*! ./markdown */ 39)(mdOption);

// 应用Markdown解析扩展，包括自定义组件（['sub','sup','ins','mark','emoji','todo','latex','yuml','echarts']）
// [...config.markdown,...config.components].forEach(item => {
//     if(!/^audio-player|table|todogroup|img$/.test(item)){
//         md.use(require(`./plugins/${item}`));
//     };
// });
md.use(__webpack_require__(/*! ./plugins/sub */ 40));md.use(__webpack_require__(/*! ./plugins/sup */ 41));md.use(__webpack_require__(/*! ./plugins/ins */ 42));md.use(__webpack_require__(/*! ./plugins/mark */ 43));md.use(__webpack_require__(/*! ./plugins/emoji */ 44));md.use(__webpack_require__(/*! ./plugins/todo */ 45));md.use(__webpack_require__(/*! ./plugins/latex */ 46));md.use(__webpack_require__(/*! ./plugins/yuml */ 47));

// 定义emoji渲染规则
md.renderer.rules.emoji = function (token, index) {
  var item = token[index];
  return "<g-emoji class=\"h2w__emoji h2w__emoji--".concat(item.markup, "\">").concat(item.content, "</g-emoji>");
};

// 导出模块
module.exports = function (str) {
  return md.render(str);
};

/***/ }),
/* 17 */
/*!*****************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(/*! ../../config */ 18),
hljs = __webpack_require__(/*! ./highlight */ 19);
// config.highlight.forEach(item => {
//     hljs.registerLanguage(item, require(`./languages/${item}`).default);
// });
hljs.registerLanguage('c-like', __webpack_require__(/*! ./languages/c-like */ 20).default);hljs.registerLanguage('c', __webpack_require__(/*! ./languages/c */ 21).default);hljs.registerLanguage('bash', __webpack_require__(/*! ./languages/bash */ 22).default);hljs.registerLanguage('css', __webpack_require__(/*! ./languages/css */ 23).default);hljs.registerLanguage('dart', __webpack_require__(/*! ./languages/dart */ 24).default);hljs.registerLanguage('go', __webpack_require__(/*! ./languages/go */ 25).default);hljs.registerLanguage('java', __webpack_require__(/*! ./languages/java */ 26).default);hljs.registerLanguage('javascript', __webpack_require__(/*! ./languages/javascript */ 27).default);hljs.registerLanguage('json', __webpack_require__(/*! ./languages/json */ 28).default);hljs.registerLanguage('less', __webpack_require__(/*! ./languages/less */ 29).default);hljs.registerLanguage('scss', __webpack_require__(/*! ./languages/scss */ 30).default);hljs.registerLanguage('shell', __webpack_require__(/*! ./languages/shell */ 31).default);hljs.registerLanguage('xml', __webpack_require__(/*! ./languages/xml */ 32).default);hljs.registerLanguage('htmlbars', __webpack_require__(/*! ./languages/htmlbars */ 33).default);hljs.registerLanguage('nginx', __webpack_require__(/*! ./languages/nginx */ 34).default);hljs.registerLanguage('php', __webpack_require__(/*! ./languages/php */ 35).default);hljs.registerLanguage('python', __webpack_require__(/*! ./languages/python */ 36).default);hljs.registerLanguage('python-repl', __webpack_require__(/*! ./languages/python-repl */ 37).default);hljs.registerLanguage('typescript', __webpack_require__(/*! ./languages/typescript */ 38).default);

module.exports = hljs;

/***/ }),
/* 18 */
/*!**************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/config.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  // LaTex公式、yuml解析服务架设参见 https://github.com/sbfkcel/markdown-server

  // 数学公式解析API
  // latex:{
  //     api:'http://towxml.vvadd.com/?tex'
  // },

  // yuml图解析APPI
  // yuml:{
  //     api:'http://towxml.vvadd.com/?yuml'
  // },

  // markdown解析配置，保留需要的选项即可
  markdown: [
  "sub", // 下标支持
  "sup", // 上标支持
  "ins", // 文本删除线支持
  "mark", // 文本高亮支持
  "emoji", // emoji表情支持
  "todo" // todo支持
  ],

  // 代码高亮配置，保留需要的选项即可（尽量越少越好，不要随意调整顺序。部分高亮有顺序依赖）
  highlight: [
  "c-like",
  "c",
  "bash",
  "css",
  "dart",
  "go",
  "java",
  "javascript",
  "json",
  "less",
  "scss",
  "shell",
  "xml",
  "htmlbars",
  "nginx",
  "php",
  "python",
  "python-repl",
  "typescript"

  // 'csharp',
  // 'http',
  // 'swift',
  // 'yaml',
  // 'markdown',
  // 'powershell',
  // 'ruby',
  // 'makefile',
  // 'lua',
  // 'stylus',
  // 'basic',
  // '1c',
  // 'abnf',
  // 'accesslog',
  // 'actionscript',
  // 'ada',
  // 'angelscript',
  // 'apache',
  // 'applescript',
  // 'arcade',
  // 'cpp',
  // 'arduino',
  // 'armasm',
  // 'asciidoc',
  // 'aspectj',
  // 'autohotkey',
  // 'autoit',
  // 'avrasm',
  // 'awk',
  // 'axapta',
  // 'bnf',
  // 'brainfuck',
  // 'cal',
  // 'capnproto',
  // 'ceylon',
  // 'clean',
  // 'clojure-repl',
  // 'clojure',
  // 'cmake',
  // 'coffeescript',
  // 'coq',
  // 'cos',
  // 'crmsh',
  // 'crystal',
  // 'csp',
  // 'd',
  // 'delphi',
  // 'diff',
  // 'django',
  // 'dns',
  // 'dockerfile',
  // 'dos',
  // 'dsconfig',
  // 'dts',
  // 'dust',
  // 'ebnf',
  // 'elixir',
  // 'elm',
  // 'erb',
  // 'erlang-repl',
  // 'erlang',
  // 'excel',
  // 'fix',
  // 'flix',
  // 'fortran',
  // 'fsharp',
  // 'gams',
  // 'gauss',
  // 'gcode',
  // 'gherkin',
  // 'glsl',
  // 'gml',
  // 'golo',
  // 'gradle',
  // 'groovy',
  // 'haml',
  // 'handlebars',
  // 'haskell',
  // 'haxe',
  // 'hsp',
  // 'hy',
  // 'inform7',
  // 'ini',
  // 'irpf90',
  // 'isbl',
  // 'jboss-cli',
  // 'julia-repl',
  // 'julia',
  // 'kotlin',
  // 'lasso',
  // 'latex',
  // 'ldif',
  // 'leaf',
  // 'lisp',
  // 'livecodeserver',
  // 'livescript',
  // 'llvm',
  // 'lsl',
  // 'mathematica',
  // 'matlab',
  // 'maxima',
  // 'mel',
  // 'mercury',
  // 'mipsasm',
  // 'mizar',
  // 'mojolicious',
  // 'monkey',
  // 'moonscript',
  // 'n1ql',
  // 'nim',
  // 'nix',
  // 'nsis',
  // 'objectivec',
  // 'ocaml',
  // 'openscad',
  // 'oxygene',
  // 'parser3',
  // 'perl',
  // 'pf',
  // 'pgsql',
  // 'php-template',
  // 'plaintext',
  // 'pony',
  // 'processing',
  // 'profile',
  // 'prolog',
  // 'properties',
  // 'protobuf',
  // 'puppet',
  // 'purebasic',
  // 'q',
  // 'qml',
  // 'r',
  // 'reasonml',
  // 'rib',
  // 'roboconf',
  // 'routeros',
  // 'rsl',
  // 'ruleslanguage',
  // 'rust',
  // 'sas',
  // 'scala',
  // 'scheme',
  // 'scilab',
  // 'smali',
  // 'smalltalk',
  // 'sml',
  // 'sqf',
  // 'sql',
  // 'stan',
  // 'stata',
  // 'step21',
  // 'subunit',
  // 'taggerscript',
  // 'tap',
  // 'tcl',
  // 'thrift',
  // 'tp',
  // 'twig',
  // 'vala',
  // 'vbnet',
  // 'vbscript-html',
  // 'vbscript',
  // 'verilog',
  // 'vhdl',
  // 'vim',
  // 'x86asm',
  // 'xl',
  // 'xquery',
  // 'zephir'
  ],

  // wxml原生标签，该系列标签将不会被转换
  wxml: [
  "view",
  "video",
  "text",
  "image",
  "navigator",
  "swiper",
  "swiper-item",
  "block",
  "form",
  "input",
  "textarea",
  "button",
  "checkbox-group",
  "checkbox",
  "radio-group",
  "radio",
  "rich-text"

  // 可以解析的标签（html或markdown中会很少使用）
  // 'canvas',
  // 'map',
  // 'slider',
  // 'scroll-view',
  // 'movable-area',
  // 'movable-view',
  // 'progress',
  // 'label',
  // 'switch',
  // 'picker',
  // 'picker-view',
  // 'switch',
  // 'contact-button'
  ],

  // 自定义组件
  components: [
  "audio-player", // 音频组件，建议保留，由于小程序原生audio存在诸多问题，towxml解决了原生音频播放器的相关问题
  // 'echarts',                  // echarts图表支持
  "latex", // 数学公式支持
  "table", // 表格支持
  "todogroup", // todo支持
  "yuml", // yuml图表支持
  "img" // 图片解析组件
  ],

  // 保留原本的元素属性（建议不要变动）
  attrs: ["class", "data", "id", "style"],

  // 事件绑定方式（catch或bind），catch 会阻止事件向上冒泡。更多请参考：https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html
  bindType: "catch",

  // 需要激活的事件
  events: [
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap", // 用于元素的点击事件
  "change" // 用于todoList的change事件
  ],

  // 图片倍数
  dpr: 1,

  // 代码块显示行号
  showLineNumber: true };

/***/ }),
/* 19 */
/*!*********************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/highlight.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function deepFreeze(e) {Object.freeze(e);var n = "function" == typeof e;return Object.getOwnPropertyNames(e).forEach(function (t) {!e.hasOwnProperty(t) || null === e[t] || "object" != typeof e[t] && "function" != typeof e[t] || n && ("caller" === t || "callee" === t || "arguments" === t) || Object.isFrozen(e[t]) || deepFreeze(e[t]);}), e;}function escapeHTML(e) {return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");}function inherit(e) {var n,t = {},r = Array.prototype.slice.call(arguments, 1);for (n in e) {t[n] = e[n];}return r.forEach(function (e) {for (n in e) {t[n] = e[n];}}), t;}function tag(e) {return e.nodeName.toLowerCase();}function nodeStream(e) {var n = [];return function e(t, r) {for (var a = t.firstChild; a; a = a.nextSibling) {3 === a.nodeType ? r += a.nodeValue.length : 1 === a.nodeType && (n.push({ event: "start", offset: r, node: a }), r = e(a, r), tag(a).match(/br|hr|img|input/) || n.push({ event: "stop", offset: r, node: a }));}return r;}(e, 0), n;}function mergeStreams(e, n, t) {var r = 0,a = "",i = [];function s() {return e.length && n.length ? e[0].offset !== n[0].offset ? e[0].offset < n[0].offset ? e : n : "start" === n[0].event ? e : n : e.length ? e : n;}function o(e) {a += "<" + tag(e) + [].map.call(e.attributes, function (e) {return " " + e.nodeName + '="' + escapeHTML(e.value).replace(/"/g, "&quot;") + '"';}).join("") + ">";}function l(e) {a += "</" + tag(e) + ">";}function c(e) {("start" === e.event ? o : l)(e.node);}for (; e.length || n.length;) {var u = s();if (a += escapeHTML(t.substring(r, u[0].offset)), r = u[0].offset, u === e) {i.reverse().forEach(l);do {c(u.splice(0, 1)[0]), u = s();} while (u === e && u.length && u[0].offset === r);i.reverse().forEach(o);} else "start" === u[0].event ? i.push(u[0].node) : i.pop(), c(u.splice(0, 1)[0]);}return a + escapeHTML(t.substr(r));}var utils = Object.freeze({ __proto__: null, escapeHTML: escapeHTML, inherit: inherit, nodeStream: nodeStream, mergeStreams: mergeStreams });var SPAN_CLOSE = "</span>",emitsWrappingTags = function emitsWrappingTags(e) {return !!e.kind;};var HTMLRenderer = /*#__PURE__*/function () {function HTMLRenderer(e, n) {_classCallCheck(this, HTMLRenderer);this.buffer = "", this.classPrefix = n.classPrefix, e.walk(this);}_createClass(HTMLRenderer, [{ key: "addText", value: function addText(e) {this.buffer += escapeHTML(e);} }, { key: "openNode", value: function openNode(e) {if (!emitsWrappingTags(e)) return;var n = e.kind;e.sublanguage || (n = "".concat(this.classPrefix).concat(n)), this.span(n);} }, { key: "closeNode", value: function closeNode(e) {emitsWrappingTags(e) && (this.buffer += SPAN_CLOSE);} }, { key: "span", value: function span(e) {this.buffer += "<span class=\"".concat(e, "\">");} }, { key: "value", value: function value() {return this.buffer;} }]);return HTMLRenderer;}();var TokenTree = /*#__PURE__*/function () {function TokenTree() {_classCallCheck(this, TokenTree);this.rootNode = { children: [] }, this.stack = [this.rootNode];}_createClass(TokenTree, [{ key: "add", value: function add(e) {this.top.children.push(e);} }, { key: "openNode", value: function openNode(e) {var n = { kind: e, children: [] };this.add(n), this.stack.push(n);} }, { key: "closeNode", value: function closeNode() {if (this.stack.length > 1) return this.stack.pop();} }, { key: "closeAllNodes", value: function closeAllNodes() {for (; this.closeNode();) {;}} }, { key: "toJSON", value: function toJSON() {return JSON.stringify(this.rootNode, null, 4);} }, { key: "walk", value: function walk(e) {return this.constructor._walk(e, this.rootNode);} }, { key: "top", get: function get() {return this.stack[this.stack.length - 1];} }, { key: "root", get: function get() {return this.rootNode;} }], [{ key: "_walk", value: function _walk(e, n) {var _this = this;return "string" == typeof n ? e.addText(n) : n.children && (e.openNode(n), n.children.forEach(function (n) {return _this._walk(e, n);}), e.closeNode(n)), e;} }, { key: "_collapse", value: function _collapse(e) {e.children && (e.children.every(function (e) {return "string" == typeof e;}) ? (e.text = e.children.join(""), delete e.children) : e.children.forEach(function (e) {"string" != typeof e && TokenTree._collapse(e);}));} }]);return TokenTree;}();var TokenTreeEmitter = /*#__PURE__*/function (_TokenTree) {_inherits(TokenTreeEmitter, _TokenTree);var _super = _createSuper(TokenTreeEmitter);function TokenTreeEmitter(e) {var _this2;_classCallCheck(this, TokenTreeEmitter);_this2 = _super.call(this), _this2.options = e;return _this2;}_createClass(TokenTreeEmitter, [{ key: "addKeyword", value: function addKeyword(e, n) {"" !== e && (this.openNode(n), this.addText(e), this.closeNode());} }, { key: "addText", value: function addText(e) {"" !== e && this.add(e);} }, { key: "addSublanguage", value: function addSublanguage(e, n) {var t = e.root;t.kind = n, t.sublanguage = !0, this.add(t);} }, { key: "toHTML", value: function toHTML() {return new HTMLRenderer(this, this.options).value();} }, { key: "finalize", value: function finalize() {} }]);return TokenTreeEmitter;}(TokenTree);function escape(e) {return new RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "m");}function source(e) {return e && e.source || e;}function countMatchGroups(e) {return new RegExp(e.toString() + "|").exec("").length - 1;}function startsWith(e, n) {var t = e && e.exec(n);return t && 0 === t.index;}function join(e, n) {for (var t = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./, r = 0, a = "", i = 0; i < e.length; i++) {var s = r += 1,o = source(e[i]);for (i > 0 && (a += n), a += "("; o.length > 0;) {var l = t.exec(o);if (null == l) {a += o;break;}a += o.substring(0, l.index), o = o.substring(l.index + l[0].length), "\\" == l[0][0] && l[1] ? a += "\\" + String(Number(l[1]) + s) : (a += l[0], "(" == l[0] && r++);}a += ")";}return a;}var IDENT_RE = "[a-zA-Z]\\w*",UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*",NUMBER_RE = "\\b\\d+(\\.\\d+)?",C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",BINARY_NUMBER_RE = "\\b(0b[01]+)",RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",BACKSLASH_ESCAPE = { begin: "\\\\[\\s\\S]", relevance: 0 },APOS_STRING_MODE = { className: "string", begin: "'", end: "'", illegal: "\\n", contains: [BACKSLASH_ESCAPE] },QUOTE_STRING_MODE = { className: "string", begin: '"', end: '"', illegal: "\\n", contains: [BACKSLASH_ESCAPE] },PHRASAL_WORDS_MODE = { begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/ },COMMENT = function COMMENT(e, n, t) {var r = inherit({ className: "comment", begin: e, end: n, contains: [] }, t || {});return r.contains.push(PHRASAL_WORDS_MODE), r.contains.push({ className: "doctag", begin: "(?:TODO|FIXME|NOTE|BUG|XXX):", relevance: 0 }), r;},C_LINE_COMMENT_MODE = COMMENT("//", "$"),C_BLOCK_COMMENT_MODE = COMMENT("/\\*", "\\*/"),HASH_COMMENT_MODE = COMMENT("#", "$"),NUMBER_MODE = { className: "number", begin: NUMBER_RE, relevance: 0 },C_NUMBER_MODE = { className: "number", begin: C_NUMBER_RE, relevance: 0 },BINARY_NUMBER_MODE = { className: "number", begin: "\\b(0b[01]+)", relevance: 0 },CSS_NUMBER_MODE = { className: "number", begin: NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?", relevance: 0 },REGEXP_MODE = { begin: /(?=\/[^\/\n]*\/)/, contains: [{ className: "regexp", begin: /\//, end: /\/[gimuy]*/, illegal: /\n/, contains: [BACKSLASH_ESCAPE, { begin: /\[/, end: /\]/, relevance: 0, contains: [BACKSLASH_ESCAPE] }] }] },TITLE_MODE = { className: "title", begin: IDENT_RE, relevance: 0 },UNDERSCORE_TITLE_MODE = { className: "title", begin: "[a-zA-Z_]\\w*", relevance: 0 },METHOD_GUARD = { begin: "\\.\\s*[a-zA-Z_]\\w*", relevance: 0 };var MODES = Object.freeze({ __proto__: null, IDENT_RE: IDENT_RE, UNDERSCORE_IDENT_RE: "[a-zA-Z_]\\w*", NUMBER_RE: NUMBER_RE, C_NUMBER_RE: C_NUMBER_RE, BINARY_NUMBER_RE: "\\b(0b[01]+)", RE_STARTERS_RE: RE_STARTERS_RE, BACKSLASH_ESCAPE: BACKSLASH_ESCAPE, APOS_STRING_MODE: APOS_STRING_MODE, QUOTE_STRING_MODE: QUOTE_STRING_MODE, PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE, COMMENT: COMMENT, C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE, C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE, HASH_COMMENT_MODE: HASH_COMMENT_MODE, NUMBER_MODE: NUMBER_MODE, C_NUMBER_MODE: C_NUMBER_MODE, BINARY_NUMBER_MODE: BINARY_NUMBER_MODE, CSS_NUMBER_MODE: CSS_NUMBER_MODE, REGEXP_MODE: REGEXP_MODE, TITLE_MODE: TITLE_MODE, UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE, METHOD_GUARD: METHOD_GUARD }),COMMON_KEYWORDS = "of and for in not or if then".split(" ");function compileLanguage(e) {function n(n, t) {return new RegExp(source(n), "m" + (e.case_insensitive ? "i" : "") + (t ? "g" : ""));}var t = /*#__PURE__*/function () {function t() {_classCallCheck(this, t);this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;}_createClass(t, [{ key: "addRule", value: function addRule(e, n) {n.position = this.position++, this.matchIndexes[this.matchAt] = n, this.regexes.push([n, e]), this.matchAt += countMatchGroups(e) + 1;} }, { key: "compile", value: function compile() {0 === this.regexes.length && (this.exec = function () {return null;});var e = this.regexes.map(function (e) {return e[1];});this.matcherRe = n(join(e, "|"), !0), this.lastIndex = 0;} }, { key: "exec", value: function exec(e) {this.matcherRe.lastIndex = this.lastIndex;var n = this.matcherRe.exec(e);if (!n) return null;var t = n.findIndex(function (e, n) {return n > 0 && void 0 != e;}),r = this.matchIndexes[t];return Object.assign(n, r);} }]);return t;}();var r = /*#__PURE__*/function () {function r() {_classCallCheck(this, r);this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;}_createClass(r, [{ key: "getMatcher", value: function getMatcher(e) {if (this.multiRegexes[e]) return this.multiRegexes[e];var n = new t();return this.rules.slice(e).forEach(function (_ref) {var _ref2 = _slicedToArray(_ref, 2),e = _ref2[0],t = _ref2[1];return n.addRule(e, t);}), n.compile(), this.multiRegexes[e] = n, n;} }, { key: "considerAll", value: function considerAll() {this.regexIndex = 0;} }, { key: "addRule", value: function addRule(e, n) {this.rules.push([e, n]), "begin" === n.type && this.count++;} }, { key: "exec", value: function exec(e) {var n = this.getMatcher(this.regexIndex);n.lastIndex = this.lastIndex;var t = n.exec(e);return t && (this.regexIndex += t.position + 1, this.regexIndex === this.count && (this.regexIndex = 0)), t;} }]);return r;}();function a(e) {var n = e.input[e.index - 1],t = e.input[e.index + e[0].length];if ("." === n || "." === t) return { ignoreMatch: !0 };}if (e.contains && e.contains.includes("self")) throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");!function t(i, s) {var _ref3;i.compiled || (i.compiled = !0, i.__onBegin = null, i.keywords = i.keywords || i.beginKeywords, i.keywords && (i.keywords = compileKeywords(i.keywords, e.case_insensitive)), i.lexemesRe = n(i.lexemes || /\w+/, !0), s && (i.beginKeywords && (i.begin = "\\b(" + i.beginKeywords.split(" ").join("|") + ")(?=\\b|\\s)", i.__onBegin = a), i.begin || (i.begin = /\B|\b/), i.beginRe = n(i.begin), i.endSameAsBegin && (i.end = i.begin), i.end || i.endsWithParent || (i.end = /\B|\b/), i.end && (i.endRe = n(i.end)), i.terminator_end = source(i.end) || "", i.endsWithParent && s.terminator_end && (i.terminator_end += (i.end ? "|" : "") + s.terminator_end)), i.illegal && (i.illegalRe = n(i.illegal)), null == i.relevance && (i.relevance = 1), i.contains || (i.contains = []), i.contains = (_ref3 = []).concat.apply(_ref3, _toConsumableArray(i.contains.map(function (e) {return expand_or_clone_mode("self" === e ? i : e);}))), i.contains.forEach(function (e) {t(e, i);}), i.starts && t(i.starts, s), i.matcher = function (e) {var n = new r();return e.contains.forEach(function (e) {return n.addRule(e.begin, { rule: e, type: "begin" });}), e.terminator_end && n.addRule(e.terminator_end, { type: "end" }), e.illegal && n.addRule(e.illegal, { type: "illegal" }), n;}(i));}(e);}function dependencyOnParent(e) {return !!e && (e.endsWithParent || dependencyOnParent(e.starts));}function expand_or_clone_mode(e) {return e.variants && !e.cached_variants && (e.cached_variants = e.variants.map(function (n) {return inherit(e, { variants: null }, n);})), e.cached_variants ? e.cached_variants : dependencyOnParent(e) ? inherit(e, { starts: e.starts ? inherit(e.starts) : null }) : Object.isFrozen(e) ? inherit(e) : e;}function compileKeywords(e, n) {var t = {};return "string" == typeof e ? r("keyword", e) : Object.keys(e).forEach(function (n) {r(n, e[n]);}), t;function r(e, r) {n && (r = r.toLowerCase()), r.split(" ").forEach(function (n) {var r = n.split("|");t[r[0]] = [e, scoreForKeyword(r[0], r[1])];});}}function scoreForKeyword(e, n) {return n ? Number(n) : commonKeyword(e) ? 0 : 1;}function commonKeyword(e) {return COMMON_KEYWORDS.includes(e.toLowerCase());}var version = "10.0.0-beta.0";var escape$1 = escapeHTML,inherit$1 = inherit,nodeStream$1 = utils.nodeStream,mergeStreams$1 = utils.mergeStreams,HLJS = function HLJS(e) {var n = [],t = {},r = {},a = [],i = !0,s = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,o = "Could not find the language '{}', did you forget to load/include a language module?",l = { noHighlightRe: /^(no-?highlight)$/i, languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i, classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0, __emitter: TokenTreeEmitter };function c(e) {return l.noHighlightRe.test(e);}function u(e, n, t, r) {var a = { code: n, language: e };R("before:highlight", a);var i = a.result ? a.result : d(a.language, a.code, t, r);return i.code = a.code, R("after:highlight", i), i;}function d(e, n, r, a) {var s = n;function c(e, n) {var t = R.case_insensitive ? n[0].toLowerCase() : n[0];return e.keywords.hasOwnProperty(t) && e.keywords[t];}function u() {null != b.subLanguage ? function () {if ("" !== S) {var e = "string" == typeof b.subLanguage;if (!e || t[b.subLanguage]) {var n = e ? d(b.subLanguage, S, !0, v[b.subLanguage]) : g(S, b.subLanguage.length ? b.subLanguage : void 0);b.relevance > 0 && (T += n.relevance), e && (v[b.subLanguage] = n.top), N.addSublanguage(n.emitter, n.language);} else N.addText(S);}}() : function () {var e, n, t, r;if (b.keywords) {for (n = 0, b.lexemesRe.lastIndex = 0, t = b.lexemesRe.exec(S), r = ""; t;) {r += S.substring(n, t.index);var a = null;(e = c(b, t)) ? (N.addText(r), r = "", T += e[1], a = e[0], N.addKeyword(t[0], a)) : r += t[0], n = b.lexemesRe.lastIndex, t = b.lexemesRe.exec(S);}r += S.substr(n), N.addText(r);} else N.addText(S);}(), S = "";}function h(e) {e.className && N.openNode(e.className), b = Object.create(e, { parent: { value: b } });}function f(e) {var n = e[0],t = e.rule;if (t.__onBegin) {if ((t.__onBegin(e) || {}).ignoreMatch) return function (e) {return 0 === b.matcher.regexIndex ? (S += e[0], 1) : (w = !0, 0);}(n);}return t && t.endSameAsBegin && (t.endRe = escape(n)), t.skip ? S += n : (t.excludeBegin && (S += n), u(), t.returnBegin || t.excludeBegin || (S = n)), h(t), t.returnBegin ? 0 : n.length;}function E(e) {var n = e[0],t = s.substr(e.index),r = function e(n, t) {if (startsWith(n.endRe, t)) {for (; n.endsParent && n.parent;) {n = n.parent;}return n;}if (n.endsWithParent) return e(n.parent, t);}(b, t);if (r) {var a = b;a.skip ? S += n : (a.returnEnd || a.excludeEnd || (S += n), u(), a.excludeEnd && (S = n));do {b.className && N.closeNode(), b.skip || b.subLanguage || (T += b.relevance), b = b.parent;} while (b !== r.parent);return r.starts && (r.endSameAsBegin && (r.starts.endRe = r.endRe), h(r.starts)), a.returnEnd ? 0 : n.length;}}var _ = {};function m(n, t) {var a,o = t && t[0];if (S += n, null == o) return u(), 0;if ("begin" == _.type && "end" == t.type && _.index == t.index && "" === o) {if (S += s.slice(t.index, t.index + 1), !i) throw (a = new Error("0 width match regex")).languageName = e, a.badRule = _.rule, a;return 1;}if (_ = t, "begin" === t.type) return f(t);if ("illegal" === t.type && !r) throw (a = new Error('Illegal lexeme "' + o + '" for mode "' + (b.className || "<unnamed>") + '"')).mode = b, a;if ("end" === t.type) {var l = E(t);if (void 0 != l) return l;}return S += o, o.length;}var R = p(e);if (!R) throw console.error(o.replace("{}", e)), new Error('Unknown language: "' + e + '"');compileLanguage(R);var M,b = a || R,v = {},N = new l.__emitter(l);!function () {for (var e = [], n = b; n !== R; n = n.parent) {n.className && e.unshift(n.className);}e.forEach(function (e) {return N.openNode(e);});}();var O,x,S = "",T = 0,D = 0;try {var w = !1;for (b.matcher.considerAll(); w ? w = !1 : (b.matcher.lastIndex = D, b.matcher.considerAll()), O = b.matcher.exec(s);) {x = m(s.substring(D, O.index), O), D = O.index + x;}return m(s.substr(D)), N.closeAllNodes(), N.finalize(), M = N.toHTML(), { relevance: T, value: M, language: e, illegal: !1, emitter: N, top: b };} catch (n) {if (n.message && n.message.includes("Illegal")) return { illegal: !0, illegalBy: { msg: n.message, context: s.slice(D - 100, D + 100), mode: n.mode }, sofar: M, relevance: 0, value: escape$1(s), emitter: N };if (i) return { relevance: 0, value: escape$1(s), emitter: N, language: e, top: b, errorRaised: n };throw n;}}function g(e, n) {n = n || l.languages || Object.keys(t);var r = { relevance: 0, emitter: new l.__emitter(l), value: escape$1(e) },a = r;return n.filter(p).filter(m).forEach(function (n) {var t = d(n, e, !1);t.language = n, t.relevance > a.relevance && (a = t), t.relevance > r.relevance && (a = r, r = t);}), a.language && (r.second_best = a), r;}function h(e) {return l.tabReplace || l.useBR ? e.replace(s, function (e, n) {return l.useBR && "\n" === e ? "<br>" : l.tabReplace ? n.replace(/\t/g, l.tabReplace) : "";}) : e;}function f(e) {var n,t,a,i,s,d = function (e) {var n,t = e.className + " ";if (t += e.parentNode ? e.parentNode.className : "", n = l.languageDetectRe.exec(t)) {var r = p(n[1]);return r || (console.warn(o.replace("{}", n[1])), console.warn("Falling back to no-highlight mode for this block.", e)), r ? n[1] : "no-highlight";}return t.split(/\s+/).find(function (e) {return c(e) || p(e);});}(e);c(d) || (R("before:highlightBlock", { block: e, language: d }), l.useBR ? (n = document.createElement("div")).innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n") : n = e, s = n.textContent, a = d ? u(d, s, !0) : g(s), (t = nodeStream$1(n)).length && ((i = document.createElement("div")).innerHTML = a.value, a.value = mergeStreams$1(t, nodeStream$1(i), s)), a.value = h(a.value), R("after:highlightBlock", { block: e, result: a }), e.innerHTML = a.value, e.className = function (e, n, t) {var a = n ? r[n] : t,i = [e.trim()];return e.match(/\bhljs\b/) || i.push("hljs"), e.includes(a) || i.push(a), i.join(" ").trim();}(e.className, d, a.language), e.result = { language: a.language, re: a.relevance }, a.second_best && (e.second_best = { language: a.second_best.language, re: a.second_best.relevance }));}function E() {if (!E.called) {E.called = !0;var e = document.querySelectorAll("pre code");n.forEach.call(e, f);}}var _ = { disableAutodetect: !0 };function p(e) {return e = (e || "").toLowerCase(), t[e] || t[r[e]];}function m(e) {var n = p(e);return n && !n.disableAutodetect;}function R(e, n) {var t = e;a.forEach(function (e) {e[t] && e[t](n);});}Object.assign(e, { highlight: u, highlightAuto: g, fixMarkup: h, highlightBlock: f, configure: function configure(e) {l = inherit$1(l, e);}, initHighlighting: E, initHighlightingOnLoad: function initHighlightingOnLoad() {window.addEventListener("DOMContentLoaded", E, !1);}, registerLanguage: function registerLanguage(n, a) {var s;try {s = a(e);} catch (e) {if (console.error("Language definition for '{}' could not be registered.".replace("{}", n)), !i) throw e;console.error(e), s = _;}s.name || (s.name = n), t[n] = s, s.rawDefinition = a.bind(null, e), s.aliases && s.aliases.forEach(function (e) {r[e] = n;});}, listLanguages: function listLanguages() {return Object.keys(t);}, getLanguage: p, requireLanguage: function requireLanguage(e) {var n = p(e);if (n) return n;throw new Error("The '{}' language is required, but not loaded.".replace("{}", e));}, autoDetection: m, inherit: inherit$1, addPlugin: function addPlugin(e, n) {a.push(e);} }), e.debugMode = function () {i = !1;}, e.safeMode = function () {i = !0;}, e.versionString = version;for (var _e2 in MODES) {"object" == typeof MODES[_e2] && deepFreeze(MODES[_e2]);}return Object.assign(e, MODES), e;};var highlight = HLJS({});module.exports = highlight;

/***/ }),
/* 20 */
/*!****************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/c-like.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: C-like foundation grammar for C/C++ grammars
                                                                                                       Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
                                                                                                       Contributors: Evgeny Stepanischev <imbolk@gmail.com>, Zaven Muradyan <megalivoithos@gmail.com>, Roel Deckers <admin@codingcat.nl>, Sam Wu <samsam2310@gmail.com>, Jordi Petit <jordi.petit@gmail.com>, Pieter Vantorre <pietervantorre@gmail.com>, Google Inc. (David Benjamin) <davidben@google.com>
                                                                                                       Category: common, system
                                                                                                       */

/* In the future the intention is to split out the C/C++ grammars distinctly
                                                                                                          since they are separate languages.  They will likely share a common foundation
                                                                                                          though, and this file sets the groundwork for that - so that we get the breaking
                                                                                                          change in v10 and don't have to change the requirements again later.
                                                                                                          
                                                                                                          See: https://github.com/highlightjs/highlight.js/issues/2146
                                                                                                          */

function _default(hljs) {
  function optional(s) {
    return '(?:' + s + ')?';
  }
  var DECLTYPE_AUTO_RE = 'decltype\\(auto\\)';
  var NAMESPACE_RE = '[a-zA-Z_]\\w*::';
  var TEMPLATE_ARGUMENT_RE = '<.*?>';
  var FUNCTION_TYPE_RE = '(' +
  DECLTYPE_AUTO_RE + '|' +
  optional(NAMESPACE_RE) + '[a-zA-Z_]\\w*' + optional(TEMPLATE_ARGUMENT_RE) +
  ')';
  var CPP_PRIMITIVE_TYPES = {
    className: 'keyword',
    begin: '\\b[a-z\\d_]*_t\\b' };


  // https://en.cppreference.com/w/cpp/language/escape
  // \\ \x \xFF \u2837 \u00323747 \374
  var CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';
  var STRINGS = {
    className: 'string',
    variants: [
    {
      begin: '(u8?|U|L)?"', end: '"',
      illegal: '\\n',
      contains: [hljs.BACKSLASH_ESCAPE] },

    {
      begin: '(u8?|U|L)?\'(' + CHARACTER_ESCAPES + "|.)", end: '\'',
      illegal: '.' },

    { begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\((?:.|\n)*?\)\1"/ }] };



  var NUMBERS = {
    className: 'number',
    variants: [
    { begin: '\\b(0b[01\']+)' },
    { begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)(u|U|l|L|ul|UL|f|F|b|B)' },
    { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }],

    relevance: 0 };


  var PREPROCESSOR = {
    className: 'meta',
    begin: /#\s*[a-z]+\b/, end: /$/,
    keywords: {
      'meta-keyword':
      'if else elif endif define undef warning error line ' +
      'pragma _Pragma ifdef ifndef include' },

    contains: [
    {
      begin: /\\\n/, relevance: 0 },

    hljs.inherit(STRINGS, { className: 'meta-string' }),
    {
      className: 'meta-string',
      begin: /<.*?>/, end: /$/,
      illegal: '\\n' },

    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE] };



  var TITLE_MODE = {
    className: 'title',
    begin: optional(NAMESPACE_RE) + hljs.IDENT_RE,
    relevance: 0 };


  var FUNCTION_TITLE = optional(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';

  var CPP_KEYWORDS = {
    keyword: 'int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof ' +
    'dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace ' +
    'unsigned long volatile static protected bool template mutable if public friend ' +
    'do goto auto void enum else break extern using asm case typeid wchar_t ' +
    'short reinterpret_cast|10 default double register explicit signed typename try this ' +
    'switch continue inline delete alignas alignof constexpr consteval constinit decltype ' +
    'concept co_await co_return co_yield requires ' +
    'noexcept static_assert thread_local restrict final override ' +
    'atomic_bool atomic_char atomic_schar ' +
    'atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong ' +
    'atomic_ullong new throw return ' +
    'and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq',
    built_in: 'std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream ' +
    'auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set ' +
    'unordered_map unordered_multiset unordered_multimap array shared_ptr abort terminate abs acos ' +
    'asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp ' +
    'fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper ' +
    'isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow ' +
    'printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp ' +
    'strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan ' +
    'vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary',
    literal: 'true false nullptr NULL' };


  var EXPRESSION_CONTAINS = [
  CPP_PRIMITIVE_TYPES,
  hljs.C_LINE_COMMENT_MODE,
  hljs.C_BLOCK_COMMENT_MODE,
  NUMBERS,
  STRINGS];


  var EXPRESSION_CONTEXT = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [
    { begin: /=/, end: /;/ },
    { begin: /\(/, end: /\)/ },
    { beginKeywords: 'new throw return else', end: /;/ }],

    keywords: CPP_KEYWORDS,
    contains: EXPRESSION_CONTAINS.concat([
    {
      begin: /\(/, end: /\)/,
      keywords: CPP_KEYWORDS,
      contains: EXPRESSION_CONTAINS.concat(['self']),
      relevance: 0 }]),


    relevance: 0 };


  var FUNCTION_DECLARATION = {
    className: 'function',
    begin: '(' + FUNCTION_TYPE_RE + '[\\*&\\s]+)+' + FUNCTION_TITLE,
    returnBegin: true, end: /[{;=]/,
    excludeEnd: true,
    keywords: CPP_KEYWORDS,
    illegal: /[^\w\s\*&:<>]/,
    contains: [

    { // to prevent it from being confused as the function title
      begin: DECLTYPE_AUTO_RE,
      keywords: CPP_KEYWORDS,
      relevance: 0 },

    {
      begin: FUNCTION_TITLE, returnBegin: true,
      contains: [TITLE_MODE],
      relevance: 0 },

    {
      className: 'params',
      begin: /\(/, end: /\)/,
      keywords: CPP_KEYWORDS,
      relevance: 0,
      contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      STRINGS,
      NUMBERS,
      CPP_PRIMITIVE_TYPES,
      // Count matching parentheses.
      {
        begin: /\(/, end: /\)/,
        keywords: CPP_KEYWORDS,
        relevance: 0,
        contains: [
        'self',
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        STRINGS,
        NUMBERS,
        CPP_PRIMITIVE_TYPES] }] },




    CPP_PRIMITIVE_TYPES,
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    PREPROCESSOR] };



  return {
    aliases: ['c', 'cc', 'h', 'c++', 'h++', 'hpp', 'hh', 'hxx', 'cxx'],
    keywords: CPP_KEYWORDS,
    // the base c-like language will NEVER be auto-detected, rather the
    // derivitives: c, c++, arduino turn auto-detect back on for themselves
    disableAutodetect: true,
    illegal: '</',
    contains: [].concat(
    EXPRESSION_CONTEXT,
    FUNCTION_DECLARATION,
    EXPRESSION_CONTAINS,
    [
    PREPROCESSOR,
    {
      begin: '\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<', end: '>',
      keywords: CPP_KEYWORDS,
      contains: ['self', CPP_PRIMITIVE_TYPES] },

    {
      begin: hljs.IDENT_RE + '::',
      keywords: CPP_KEYWORDS },

    {
      className: 'class',
      beginKeywords: 'class struct', end: /[{;:]/,
      contains: [
      { begin: /</, end: />/, contains: ['self'] }, // skip generic stuff
      hljs.TITLE_MODE] }]),



    exports: {
      preprocessor: PREPROCESSOR,
      strings: STRINGS,
      keywords: CPP_KEYWORDS } };


}

/***/ }),
/* 21 */
/*!***********************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/c.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: C
                                                                                                       Category: common, system
                                                                                                       Website: https://en.wikipedia.org/wiki/C_(programming_language)
                                                                                                       Requires: c-like.js
                                                                                                       */

function _default(hljs) {

  var lang = hljs.getLanguage('c-like').rawDefinition();
  // Until C is actually different than C++ there is no reason to auto-detect C
  // as it's own language since it would just fail auto-detect testing or
  // simply match with C++.
  //
  // See further comments in c-like.js.

  // lang.disableAutodetect = false;
  lang.name = 'C';
  lang.aliases = ['c', 'h'];
  return lang;

}

/***/ }),
/* 22 */
/*!**************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/bash.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: Bash
                                                                                                       Author: vah <vahtenberg@gmail.com>
                                                                                                       Contributrors: Benjamin Pannell <contact@sierrasoftworks.com>
                                                                                                       Website: https://www.gnu.org/software/bash/
                                                                                                       Category: common
                                                                                                       */

function _default(hljs) {
  var VAR = {};
  var BRACED_VAR = {
    begin: /\$\{/, end: /\}/,
    contains: [
    { begin: /:-/, contains: [VAR] } // default values
    ] };

  Object.assign(VAR, {
    className: 'variable',
    variants: [
    { begin: /\$[\w\d#@][\w\d_]*/ },
    BRACED_VAR] });



  var SUBST = {
    className: 'subst',
    begin: /\$\(/, end: /\)/,
    contains: [hljs.BACKSLASH_ESCAPE] };

  var QUOTE_STRING = {
    className: 'string',
    begin: /"/, end: /"/,
    contains: [
    hljs.BACKSLASH_ESCAPE,
    VAR,
    SUBST] };


  SUBST.contains.push(QUOTE_STRING);
  var ESCAPED_QUOTE = {
    className: '',
    begin: /\\"/ };


  var APOS_STRING = {
    className: 'string',
    begin: /'/, end: /'/ };

  var ARITHMETIC = {
    begin: /\$\(\(/,
    end: /\)\)/,
    contains: [
    { begin: /\d+#[0-9a-f]+/, className: "number" },
    hljs.NUMBER_MODE,
    VAR] };


  var SHEBANG = {
    className: 'meta',
    begin: /^#![^\n]+sh\s*$/,
    relevance: 10 };

  var FUNCTION = {
    className: 'function',
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: true,
    contains: [hljs.inherit(hljs.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
    relevance: 0 };


  return {
    name: 'Bash',
    aliases: ['sh', 'zsh'],
    lexemes: /\b-?[a-z\._]+\b/,
    keywords: {
      keyword:
      'if then else elif fi for while in do done case esac function',
      literal:
      'true false',
      built_in:
      // Shell built-ins
      // http://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
      'break cd continue eval exec exit export getopts hash pwd readonly return shift test times ' +
      'trap umask unset ' +
      // Bash built-ins
      'alias bind builtin caller command declare echo enable help let local logout mapfile printf ' +
      'read readarray source type typeset ulimit unalias ' +
      // Shell modifiers
      'set shopt ' +
      // Zsh built-ins
      'autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles ' +
      'compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate ' +
      'fc fg float functions getcap getln history integer jobs kill limit log noglob popd print ' +
      'pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit ' +
      'unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof ' +
      'zpty zregexparse zsocket zstyle ztcp',
      _:
      '-ne -eq -lt -gt -f -d -e -s -l -a' // relevance booster
    },
    contains: [
    SHEBANG,
    FUNCTION,
    ARITHMETIC,
    hljs.HASH_COMMENT_MODE,
    QUOTE_STRING,
    ESCAPED_QUOTE,
    APOS_STRING,
    VAR] };


}

/***/ }),
/* 23 */
/*!*************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/css.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: CSS
                                                                                                       Category: common, css
                                                                                                       Website: https://developer.mozilla.org/en-US/docs/Web/CSS
                                                                                                       */

function _default(hljs) {
  var FUNCTION_LIKE = {
    begin: /[\w-]+\(/, returnBegin: true,
    contains: [
    {
      className: 'built_in',
      begin: /[\w-]+/ },

    {
      begin: /\(/, end: /\)/,
      contains: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.CSS_NUMBER_MODE] }] };




  var ATTRIBUTE = {
    className: 'attribute',
    begin: /\S/, end: ':', excludeEnd: true,
    starts: {
      endsWithParent: true, excludeEnd: true,
      contains: [
      FUNCTION_LIKE,
      hljs.CSS_NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'number', begin: '#[0-9A-Fa-f]+' },

      {
        className: 'meta', begin: '!important' }] } };




  var AT_IDENTIFIER = '@[a-z-]+'; // @font-face
  var AT_MODIFIERS = "and or not only";
  var MEDIA_TYPES = "all print screen speech";
  var AT_PROPERTY_RE = /@\-?\w[\w]*(\-\w+)*/; // @-webkit-keyframes
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var RULE = {
    begin: /(?:[A-Z\_\.\-]+|--[a-zA-Z0-9_-]+)\s*:/, returnBegin: true, end: ';', endsWithParent: true,
    contains: [
    ATTRIBUTE] };



  return {
    name: 'CSS',
    case_insensitive: true,
    illegal: /[=\/|'\$]/,
    contains: [
    hljs.C_BLOCK_COMMENT_MODE,
    {
      className: 'selector-id', begin: /#[A-Za-z0-9_-]+/ },

    {
      className: 'selector-class', begin: /\.[A-Za-z0-9_-]+/ },

    {
      className: 'selector-attr',
      begin: /\[/, end: /\]/,
      illegal: '$',
      contains: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE] },


    {
      className: 'selector-pseudo',
      begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/ },

    // matching these here allows us to treat them more like regular CSS
    // rules so everything between the {} gets regular rule highlighting,
    // which is what we want for page and font-face
    {
      begin: '@(page|font-face)',
      lexemes: AT_IDENTIFIER,
      keywords: '@page @font-face' },

    {
      begin: '@', end: '[{;]', // at_rule eating first "{" is a good thing
      // because it doesn’t let it to be parsed as
      // a rule set but instead drops parser into
      // the default mode which is how it should be.
      illegal: /:/, // break on Less variables @var: ...
      returnBegin: true,
      contains: [
      {
        className: 'keyword',
        begin: AT_PROPERTY_RE },

      {
        begin: /\s/, endsWithParent: true, excludeEnd: true,
        relevance: 0,
        keywords: AT_MODIFIERS,
        contains: [
        {
          begin: /[a-z-]+:/,
          className: "attribute" },

        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.CSS_NUMBER_MODE] }] },




    {
      className: 'selector-tag', begin: IDENT_RE,
      relevance: 0 },

    {
      begin: '{', end: '}',
      illegal: /\S/,
      contains: [
      hljs.C_BLOCK_COMMENT_MODE,
      RULE] }] };




}

/***/ }),
/* 24 */
/*!**************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/dart.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: Dart
                                                                                                       Requires: markdown.js
                                                                                                       Author: Maxim Dikun <dikmax@gmail.com>
                                                                                                       Description: Dart a modern, object-oriented language developed by Google. For more information see https://www.dartlang.org/
                                                                                                       Website: https://dart.dev
                                                                                                       Category: scripting
                                                                                                       */

function _default(hljs) {
  var SUBST = {
    className: 'subst',
    variants: [{
      begin: '\\$[A-Za-z0-9_]+' }] };



  var BRACED_SUBST = {
    className: 'subst',
    variants: [{
      begin: '\\${',
      end: '}' }],

    keywords: 'true false null this is new super' };


  var STRING = {
    className: 'string',
    variants: [{
      begin: 'r\'\'\'',
      end: '\'\'\'' },

    {
      begin: 'r"""',
      end: '"""' },

    {
      begin: 'r\'',
      end: '\'',
      illegal: '\\n' },

    {
      begin: 'r"',
      end: '"',
      illegal: '\\n' },

    {
      begin: '\'\'\'',
      end: '\'\'\'',
      contains: [hljs.BACKSLASH_ESCAPE, SUBST, BRACED_SUBST] },

    {
      begin: '"""',
      end: '"""',
      contains: [hljs.BACKSLASH_ESCAPE, SUBST, BRACED_SUBST] },

    {
      begin: '\'',
      end: '\'',
      illegal: '\\n',
      contains: [hljs.BACKSLASH_ESCAPE, SUBST, BRACED_SUBST] },

    {
      begin: '"',
      end: '"',
      illegal: '\\n',
      contains: [hljs.BACKSLASH_ESCAPE, SUBST, BRACED_SUBST] }] };



  BRACED_SUBST.contains = [
  hljs.C_NUMBER_MODE, STRING];


  var KEYWORDS = {
    keyword: 'abstract as assert async await break case catch class const continue covariant default deferred do ' +
    'dynamic else enum export extends extension external factory false final finally for Function get hide if ' +
    'implements import in inferface is library mixin new null on operator part rethrow return set show static ' +
    'super switch sync this throw true try typedef var void while with yield',
    built_in:
    // dart:core
    'Comparable DateTime Duration Function Iterable Iterator List Map Match Null Object Pattern RegExp Set ' +
    'Stopwatch String StringBuffer StringSink Symbol Type Uri bool double dynamic int num print ' +
    // dart:html
    'Element ElementList document querySelector querySelectorAll window' };


  return {
    name: 'Dart',
    keywords: KEYWORDS,
    contains: [
    STRING,
    hljs.COMMENT(
    '/\\*\\*',
    '\\*/', {
      subLanguage: 'markdown',
      relevance: 0 }),


    hljs.COMMENT(
    '///+\\s*',
    '$', {
      contains: [{
        subLanguage: 'markdown',
        begin: '.',
        end: '$',
        relevance: 0 }] }),



    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    {
      className: 'class',
      beginKeywords: 'class interface',
      end: '{',
      excludeEnd: true,
      contains: [{
        beginKeywords: 'extends implements' },

      hljs.UNDERSCORE_TITLE_MODE] },


    hljs.C_NUMBER_MODE,
    {
      className: 'meta',
      begin: '@[A-Za-z]+' },

    {
      begin: '=>' // No markup, just a relevance booster
    }] };


}

/***/ }),
/* 25 */
/*!************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/go.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: Go
                                                                                                       Author: Stephan Kountso aka StepLg <steplg@gmail.com>
                                                                                                       Contributors: Evgeny Stepanischev <imbolk@gmail.com>
                                                                                                       Description: Google go language (golang). For info about language
                                                                                                       Website: http://golang.org/
                                                                                                       Category: common, system
                                                                                                       */

function _default(hljs) {
  var GO_KEYWORDS = {
    keyword:
    'break default func interface select case map struct chan else goto package switch ' +
    'const fallthrough if range type continue for import return var go defer ' +
    'bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 ' +
    'uint16 uint32 uint64 int uint uintptr rune',
    literal:
    'true false iota nil',
    built_in:
    'append cap close complex copy imag len make new panic print println real recover delete' };

  return {
    name: 'Go',
    aliases: ['golang'],
    keywords: GO_KEYWORDS,
    illegal: '</',
    contains: [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    {
      className: 'string',
      variants: [
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      { begin: '`', end: '`' }] },


    {
      className: 'number',
      variants: [
      { begin: hljs.C_NUMBER_RE + '[i]', relevance: 1 },
      hljs.C_NUMBER_MODE] },


    {
      begin: /:=/ // relevance booster
    },
    {
      className: 'function',
      beginKeywords: 'func', end: '\\s*(\\{|$)', excludeEnd: true,
      contains: [
      hljs.TITLE_MODE,
      {
        className: 'params',
        begin: /\(/, end: /\)/,
        keywords: GO_KEYWORDS,
        illegal: /["']/ }] }] };





}

/***/ }),
/* 26 */
/*!**************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/java.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: Java
                                                                                                       Author: Vsevolod Solovyov <vsevolod.solovyov@gmail.com>
                                                                                                       Category: common, enterprise
                                                                                                       Website: https://www.java.com/
                                                                                                       */

function _default(hljs) {
  var JAVA_IDENT_RE = "[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*";
  var GENERIC_IDENT_RE = JAVA_IDENT_RE + '(<' + JAVA_IDENT_RE + '(\\s*,\\s*' + JAVA_IDENT_RE + ')*>)?';
  var KEYWORDS =
  'false synchronized int abstract float private char boolean var static null if const ' +
  'for true while long strictfp finally protected import native final void ' +
  'enum else break transient catch instanceof byte super volatile case assert short ' +
  'package default double public try this switch continue throws protected public private ' +
  'module requires exports do';

  var ANNOTATION = {
    className: 'meta',
    begin: '@' + JAVA_IDENT_RE,
    contains: [
    {
      begin: /\(/,
      end: /\)/,
      contains: ["self"] // allow nested () inside our annotation
    }] };


  // https://docs.oracle.com/javase/7/docs/technotes/guides/language/underscores-literals.html
  var JAVA_NUMBER_RE = '\\b' +
  '(' +
  '0[bB]([01]+[01_]+[01]+|[01]+)' + // 0b...
  '|' +
  '0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)' + // 0x...
  '|' +
  '(' +
  '([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?' +
  '|' +
  '\\.([\\d]+[\\d_]+[\\d]+|[\\d]+)' +
  ')' +
  '([eE][-+]?\\d+)?' + // octal, decimal, float
  ')' +
  '[lLfF]?';
  var JAVA_NUMBER_MODE = {
    className: 'number',
    begin: JAVA_NUMBER_RE,
    relevance: 0 };


  return {
    name: 'Java',
    aliases: ['jsp'],
    keywords: KEYWORDS,
    illegal: /<\/|#/,
    contains: [
    hljs.COMMENT(
    '/\\*\\*',
    '\\*/',
    {
      relevance: 0,
      contains: [
      {
        // eat up @'s in emails to prevent them to be recognized as doctags
        begin: /\w+@/, relevance: 0 },

      {
        className: 'doctag',
        begin: '@[A-Za-z]+' }] }),




    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    {
      className: 'class',
      beginKeywords: 'class interface', end: /[{;=]/, excludeEnd: true,
      keywords: 'class interface',
      illegal: /[:"\[\]]/,
      contains: [
      { beginKeywords: 'extends implements' },
      hljs.UNDERSCORE_TITLE_MODE] },


    {
      // Expression keywords prevent 'keyword Name(...)' from being
      // recognized as a function definition
      beginKeywords: 'new throw return else',
      relevance: 0 },

    {
      className: 'function',
      begin: '(' + GENERIC_IDENT_RE + '\\s+)+' + hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true, end: /[{;=]/,
      excludeEnd: true,
      keywords: KEYWORDS,
      contains: [
      {
        begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true,
        relevance: 0,
        contains: [hljs.UNDERSCORE_TITLE_MODE] },

      {
        className: 'params',
        begin: /\(/, end: /\)/,
        keywords: KEYWORDS,
        relevance: 0,
        contains: [
        ANNOTATION,
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.C_NUMBER_MODE,
        hljs.C_BLOCK_COMMENT_MODE] },


      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE] },


    JAVA_NUMBER_MODE,
    ANNOTATION] };


}

/***/ }),
/* 27 */
/*!********************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/javascript.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: JavaScript
                                                                                                       Description: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
                                                                                                       Category: common, scripting
                                                                                                       Website: https://developer.mozilla.org/en-US/docs/Web/JavaScript
                                                                                                       */

function _default(hljs) {
  var FRAGMENT = {
    begin: '<>',
    end: '</>' };

  var XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/ };

  var IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
  var KEYWORDS = {
    keyword:
    'in of if for while finally var new function do return void else break catch ' +
    'instanceof with throw case default try this switch continue typeof delete ' +
    'let yield const export super debugger as async await static ' +
    // ECMAScript 6 modules import
    'import from as',

    literal:
    'true false null undefined NaN Infinity',
    built_in:
    'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' +
    'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' +
    'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' +
    'TypeError URIError Number Math Date String RegExp Array Float32Array ' +
    'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' +
    'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' +
    'module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect ' +
    'Promise' };

  var NUMBER = {
    className: 'number',
    variants: [
    { begin: '\\b(0[bB][01]+)n?' },
    { begin: '\\b(0[oO][0-7]+)n?' },
    { begin: hljs.C_NUMBER_RE + 'n?' }],

    relevance: 0 };

  var SUBST = {
    className: 'subst',
    begin: '\\$\\{', end: '\\}',
    keywords: KEYWORDS,
    contains: [] // defined later
  };
  var HTML_TEMPLATE = {
    begin: 'html`', end: '',
    starts: {
      end: '`', returnEnd: false,
      contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST],

      subLanguage: 'xml' } };


  var CSS_TEMPLATE = {
    begin: 'css`', end: '',
    starts: {
      end: '`', returnEnd: false,
      contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST],

      subLanguage: 'css' } };


  var TEMPLATE_STRING = {
    className: 'string',
    begin: '`', end: '`',
    contains: [
    hljs.BACKSLASH_ESCAPE,
    SUBST] };


  SUBST.contains = [
  hljs.APOS_STRING_MODE,
  hljs.QUOTE_STRING_MODE,
  HTML_TEMPLATE,
  CSS_TEMPLATE,
  TEMPLATE_STRING,
  NUMBER,
  hljs.REGEXP_MODE];

  var PARAMS_CONTAINS = SUBST.contains.concat([
  hljs.C_BLOCK_COMMENT_MODE,
  hljs.C_LINE_COMMENT_MODE]);

  var PARAMS = {
    className: 'params',
    begin: /\(/, end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    contains: PARAMS_CONTAINS };


  return {
    name: 'JavaScript',
    aliases: ['js', 'jsx', 'mjs', 'cjs'],
    keywords: KEYWORDS,
    contains: [
    {
      className: 'meta',
      relevance: 10,
      begin: /^\s*['"]use (strict|asm)['"]/ },

    {
      className: 'meta',
      begin: /^#!/, end: /$/ },

    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    TEMPLATE_STRING,
    hljs.C_LINE_COMMENT_MODE,
    hljs.COMMENT(
    '/\\*\\*',
    '\\*/',
    {
      relevance: 0,
      contains: [
      {
        className: 'doctag',
        begin: '@[A-Za-z]+',
        contains: [
        {
          className: 'type',
          begin: '\\{',
          end: '\\}',
          relevance: 0 },

        {
          className: 'variable',
          begin: IDENT_RE + '(?=\\s*(-)|$)',
          endsParent: true,
          relevance: 0 },

        // eat spaces (not newlines) so we can find
        // types or variables
        {
          begin: /(?=[^\n])\s/,
          relevance: 0 }] }] }),






    hljs.C_BLOCK_COMMENT_MODE,
    NUMBER,
    { // object attr container
      begin: /[{,\n]\s*/, relevance: 0,
      contains: [
      {
        begin: IDENT_RE + '\\s*:', returnBegin: true,
        relevance: 0,
        contains: [{ className: 'attr', begin: IDENT_RE, relevance: 0 }] }] },



    { // "value" container
      begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
      keywords: 'return throw case',
      contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.REGEXP_MODE,
      {
        className: 'function',
        begin: '(\\(.*?\\)|' + IDENT_RE + ')\\s*=>', returnBegin: true,
        end: '\\s*=>',
        contains: [
        {
          className: 'params',
          variants: [
          {
            begin: IDENT_RE },

          {
            begin: /\(\s*\)/ },

          {
            begin: /\(/, end: /\)/,
            excludeBegin: true, excludeEnd: true,
            keywords: KEYWORDS,
            contains: PARAMS_CONTAINS }] }] },





      { // could be a comma delimited list of params to a function call
        begin: /,/, relevance: 0 },

      {
        className: '',
        begin: /\s/,
        end: /\s*/,
        skip: true },

      { // JSX
        variants: [
        { begin: FRAGMENT.begin, end: FRAGMENT.end },
        { begin: XML_TAG.begin, end: XML_TAG.end }],

        subLanguage: 'xml',
        contains: [
        {
          begin: XML_TAG.begin, end: XML_TAG.end, skip: true,
          contains: ['self'] }] }],




      relevance: 0 },

    {
      className: 'function',
      beginKeywords: 'function', end: /\{/, excludeEnd: true,
      contains: [
      hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE }),
      PARAMS],

      illegal: /\[|%/ },

    {
      begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
    },

    hljs.METHOD_GUARD,
    { // ES6 class
      className: 'class',
      beginKeywords: 'class', end: /[{;=]/, excludeEnd: true,
      illegal: /[:"\[\]]/,
      contains: [
      { beginKeywords: 'extends' },
      hljs.UNDERSCORE_TITLE_MODE] },


    {
      beginKeywords: 'constructor', end: /\{/, excludeEnd: true },

    {
      begin: '(get|set)\\s*(?=' + IDENT_RE + '\\()',
      end: /{/,
      keywords: "get set",
      contains: [
      hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE }),
      { begin: /\(\)/ }, // eat to avoid empty params
      PARAMS] }],




    illegal: /#(?!!)/ };

}

/***/ }),
/* 28 */
/*!**************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/json.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: JSON
                                                                                                       Description: JSON (JavaScript Object Notation) is a lightweight data-interchange format.
                                                                                                       Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
                                                                                                       Website: http://www.json.org
                                                                                                       Category: common, protocols
                                                                                                       */

function _default(hljs) {
  var LITERALS = { literal: 'true false null' };
  var ALLOWED_COMMENTS = [
  hljs.C_LINE_COMMENT_MODE,
  hljs.C_BLOCK_COMMENT_MODE];

  var TYPES = [
  hljs.QUOTE_STRING_MODE,
  hljs.C_NUMBER_MODE];

  var VALUE_CONTAINER = {
    end: ',', endsWithParent: true, excludeEnd: true,
    contains: TYPES,
    keywords: LITERALS };

  var OBJECT = {
    begin: '{', end: '}',
    contains: [
    {
      className: 'attr',
      begin: /"/, end: /"/,
      contains: [hljs.BACKSLASH_ESCAPE],
      illegal: '\\n' },

    hljs.inherit(VALUE_CONTAINER, { begin: /:/ })].
    concat(ALLOWED_COMMENTS),
    illegal: '\\S' };

  var ARRAY = {
    begin: '\\[', end: '\\]',
    contains: [hljs.inherit(VALUE_CONTAINER)], // inherit is a workaround for a bug that makes shared modes with endsWithParent compile only the ending of one of the parents
    illegal: '\\S' };

  TYPES.push(OBJECT, ARRAY);
  ALLOWED_COMMENTS.forEach(function (rule) {
    TYPES.push(rule);
  });
  return {
    name: 'JSON',
    contains: TYPES,
    keywords: LITERALS,
    illegal: '\\S' };

}

/***/ }),
/* 29 */
/*!**************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/less.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: Less
                                                                                                       Description: It's CSS, with just a little more.
                                                                                                       Author:   Max Mikhailov <seven.phases.max@gmail.com>
                                                                                                       Website: http://lesscss.org
                                                                                                       Category: common, css
                                                                                                       */

function _default(hljs) {
  var IDENT_RE = '[\\w-]+'; // yes, Less identifiers may begin with a digit
  var INTERP_IDENT_RE = '(' + IDENT_RE + '|@{' + IDENT_RE + '})';

  /* Generic Modes */

  var RULES = [],VALUE = []; // forward def. for recursive modes

  var STRING_MODE = function STRING_MODE(c) {return {
      // Less strings are not multiline (also include '~' for more consistent coloring of "escaped" strings)
      className: 'string', begin: '~?' + c + '.*?' + c };
  };

  var IDENT_MODE = function IDENT_MODE(name, begin, relevance) {return {
      className: name, begin: begin, relevance: relevance };
  };

  var PARENS_MODE = {
    // used only to properly balance nested parens inside mixin call, def. arg list
    begin: '\\(', end: '\\)', contains: VALUE, relevance: 0 };


  // generic Less highlighter (used almost everywhere except selectors):
  VALUE.push(
  hljs.C_LINE_COMMENT_MODE,
  hljs.C_BLOCK_COMMENT_MODE,
  STRING_MODE("'"),
  STRING_MODE('"'),
  hljs.CSS_NUMBER_MODE, // fixme: it does not include dot for numbers like .5em :(
  {
    begin: '(url|data-uri)\\(',
    starts: { className: 'string', end: '[\\)\\n]', excludeEnd: true } },

  IDENT_MODE('number', '#[0-9A-Fa-f]+\\b'),
  PARENS_MODE,
  IDENT_MODE('variable', '@@?' + IDENT_RE, 10),
  IDENT_MODE('variable', '@{' + IDENT_RE + '}'),
  IDENT_MODE('built_in', '~?`[^`]*?`'), // inline javascript (or whatever host language) *multiline* string
  { // @media features (it’s here to not duplicate things in AT_RULE_MODE with extra PARENS_MODE overriding):
    className: 'attribute', begin: IDENT_RE + '\\s*:', end: ':', returnBegin: true, excludeEnd: true },

  {
    className: 'meta',
    begin: '!important' });



  var VALUE_WITH_RULESETS = VALUE.concat({
    begin: '{', end: '}', contains: RULES });


  var MIXIN_GUARD_MODE = {
    beginKeywords: 'when', endsWithParent: true,
    contains: [{ beginKeywords: 'and not' }].concat(VALUE) // using this form to override VALUE’s 'function' match
  };

  /* Rule-Level Modes */

  var RULE_MODE = {
    begin: INTERP_IDENT_RE + '\\s*:', returnBegin: true, end: '[;}]',
    relevance: 0,
    contains: [
    {
      className: 'attribute',
      begin: INTERP_IDENT_RE, end: ':', excludeEnd: true,
      starts: {
        endsWithParent: true, illegal: '[<=$]',
        relevance: 0,
        contains: VALUE } }] };





  var AT_RULE_MODE = {
    className: 'keyword',
    begin: '@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b',
    starts: { end: '[;{}]', returnEnd: true, contains: VALUE, relevance: 0 } };


  // variable definitions and calls
  var VAR_RULE_MODE = {
    className: 'variable',
    variants: [
    // using more strict pattern for higher relevance to increase chances of Less detection.
    // this is *the only* Less specific statement used in most of the sources, so...
    // (we’ll still often loose to the css-parser unless there's '//' comment,
    // simply because 1 variable just can't beat 99 properties :)
    { begin: '@' + IDENT_RE + '\\s*:', relevance: 15 },
    { begin: '@' + IDENT_RE }],

    starts: { end: '[;}]', returnEnd: true, contains: VALUE_WITH_RULESETS } };


  var SELECTOR_MODE = {
    // first parse unambiguous selectors (i.e. those not starting with tag)
    // then fall into the scary lookahead-discriminator variant.
    // this mode also handles mixin definitions and calls
    variants: [{
      begin: '[\\.#:&\\[>]', end: '[;{}]' // mixin calls end with ';'
    }, {
      begin: INTERP_IDENT_RE, end: '{' }],

    returnBegin: true,
    returnEnd: true,
    illegal: '[<=\'$"]',
    relevance: 0,
    contains: [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    MIXIN_GUARD_MODE,
    IDENT_MODE('keyword', 'all\\b'),
    IDENT_MODE('variable', '@{' + IDENT_RE + '}'), // otherwise it’s identified as tag
    IDENT_MODE('selector-tag', INTERP_IDENT_RE + '%?', 0), // '%' for more consistent coloring of @keyframes "tags"
    IDENT_MODE('selector-id', '#' + INTERP_IDENT_RE),
    IDENT_MODE('selector-class', '\\.' + INTERP_IDENT_RE, 0),
    IDENT_MODE('selector-tag', '&', 0),
    { className: 'selector-attr', begin: '\\[', end: '\\]' },
    { className: 'selector-pseudo', begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/ },
    { begin: '\\(', end: '\\)', contains: VALUE_WITH_RULESETS }, // argument list of parametric mixins
    { begin: '!important' } // eat !important after mixin call or it will be colored as tag
    ] };


  RULES.push(
  hljs.C_LINE_COMMENT_MODE,
  hljs.C_BLOCK_COMMENT_MODE,
  AT_RULE_MODE,
  VAR_RULE_MODE,
  RULE_MODE,
  SELECTOR_MODE);


  return {
    name: 'Less',
    case_insensitive: true,
    illegal: '[=>\'/<($"]',
    contains: RULES };

}

/***/ }),
/* 30 */
/*!**************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/scss.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: SCSS
                                                                                                       Description: Scss is an extension of the syntax of CSS.
                                                                                                       Author: Kurt Emch <kurt@kurtemch.com>
                                                                                                       Website: https://sass-lang.com
                                                                                                       Category: common, css
                                                                                                       */
function _default(hljs) {
  var AT_IDENTIFIER = '@[a-z-]+'; // @font-face
  var AT_MODIFIERS = "and or not only";
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var VARIABLE = {
    className: 'variable',
    begin: '(\\$' + IDENT_RE + ')\\b' };

  var HEXCOLOR = {
    className: 'number', begin: '#[0-9A-Fa-f]+' };

  var DEF_INTERNALS = {
    className: 'attribute',
    begin: '[A-Z\\_\\.\\-]+', end: ':',
    excludeEnd: true,
    illegal: '[^\\s]',
    starts: {
      endsWithParent: true, excludeEnd: true,
      contains: [
      HEXCOLOR,
      hljs.CSS_NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'meta', begin: '!important' }] } };




  return {
    name: 'SCSS',
    case_insensitive: true,
    illegal: '[=/|\']',
    contains: [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    {
      className: 'selector-id', begin: '\\#[A-Za-z0-9_-]+',
      relevance: 0 },

    {
      className: 'selector-class', begin: '\\.[A-Za-z0-9_-]+',
      relevance: 0 },

    {
      className: 'selector-attr', begin: '\\[', end: '\\]',
      illegal: '$' },

    {
      className: 'selector-tag', // begin: IDENT_RE, end: '[,|\\s]'
      begin: '\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b',
      relevance: 0 },

    {
      className: 'selector-pseudo',
      begin: ':(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)' },

    {
      className: 'selector-pseudo',
      begin: '::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)' },

    VARIABLE,
    {
      className: 'attribute',
      begin: '\\b(src|z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b',
      illegal: '[^\\s]' },

    {
      begin: '\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b' },

    {
      begin: ':', end: ';',
      contains: [
      VARIABLE,
      HEXCOLOR,
      hljs.CSS_NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      {
        className: 'meta', begin: '!important' }] },



    // matching these here allows us to treat them more like regular CSS
    // rules so everything between the {} gets regular rule highlighting,
    // which is what we want for page and font-face
    {
      begin: '@(page|font-face)',
      lexemes: AT_IDENTIFIER,
      keywords: '@page @font-face' },

    {
      begin: '@', end: '[{;]',
      returnBegin: true,
      keywords: AT_MODIFIERS,
      contains: [
      {
        begin: AT_IDENTIFIER,
        className: "keyword" },

      VARIABLE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      HEXCOLOR,
      hljs.CSS_NUMBER_MODE
      // {
      //   begin: '\\s[A-Za-z0-9_.-]+',
      //   relevance: 0
      // }
      ] }] };



}

/***/ }),
/* 31 */
/*!***************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/shell.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: Shell Session
                                                                                                       Requires: bash.js
                                                                                                       Author: TSUYUSATO Kitsune <make.just.on@gmail.com>
                                                                                                       Category: common
                                                                                                       */

function _default(hljs) {
  return {
    name: 'Shell Session',
    aliases: ['console'],
    contains: [
    {
      className: 'meta',
      begin: '^\\s{0,3}[/\\w\\d\\[\\]()@-]*[>%$#]',
      starts: {
        end: '$', subLanguage: 'bash' } }] };




}

/***/ }),
/* 32 */
/*!*************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/xml.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: HTML, XML
                                                                                                       Website: https://www.w3.org/XML/
                                                                                                       Category: common
                                                                                                       */

function _default(hljs) {
  var XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';
  var XML_ENTITIES = {
    className: 'symbol',
    begin: '&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;' };

  var XML_META_KEYWORDS = {
    begin: '\\s',
    contains: [
    {
      className: 'meta-keyword',
      begin: '#?[a-z_][a-z1-9_-]+',
      illegal: '\\n' }] };



  var XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, { begin: '\\(', end: '\\)' });
  var APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, { className: 'meta-string' });
  var QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, { className: 'meta-string' });
  var TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
    {
      className: 'attr',
      begin: XML_IDENT_RE,
      relevance: 0 },

    {
      begin: /=\s*/,
      relevance: 0,
      contains: [
      {
        className: 'string',
        endsParent: true,
        variants: [
        { begin: /"/, end: /"/, contains: [XML_ENTITIES] },
        { begin: /'/, end: /'/, contains: [XML_ENTITIES] },
        { begin: /[^\s"'=<>`]+/ }] }] }] };






  return {
    name: 'HTML, XML',
    aliases: ['html', 'xhtml', 'rss', 'atom', 'xjb', 'xsd', 'xsl', 'plist', 'wsf', 'svg'],
    case_insensitive: true,
    contains: [
    {
      className: 'meta',
      begin: '<![a-z]', end: '>',
      relevance: 10,
      contains: [
      XML_META_KEYWORDS,
      QUOTE_META_STRING_MODE,
      APOS_META_STRING_MODE,
      XML_META_PAR_KEYWORDS,
      {
        begin: '\\[', end: '\\]',
        contains: [
        {
          className: 'meta',
          begin: '<![a-z]', end: '>',
          contains: [
          XML_META_KEYWORDS,
          XML_META_PAR_KEYWORDS,
          QUOTE_META_STRING_MODE,
          APOS_META_STRING_MODE] }] }] },






    hljs.COMMENT(
    '<!--',
    '-->',
    {
      relevance: 10 }),


    {
      begin: '<\\!\\[CDATA\\[', end: '\\]\\]>',
      relevance: 10 },

    XML_ENTITIES,
    {
      className: 'meta',
      begin: /<\?xml/, end: /\?>/, relevance: 10 },

    {
      className: 'tag',
      /*
                        The lookahead pattern (?=...) ensures that 'begin' only matches
                        '<style' as a single word, followed by a whitespace or an
                        ending braket. The '$' is needed for the lexeme to be recognized
                        by hljs.subMode() that tests lexemes outside the stream.
                        */
      begin: '<style(?=\\s|>)', end: '>',
      keywords: { name: 'style' },
      contains: [TAG_INTERNALS],
      starts: {
        end: '</style>', returnEnd: true,
        subLanguage: ['css', 'xml'] } },


    {
      className: 'tag',
      // See the comment in the <style tag about the lookahead pattern
      begin: '<script(?=\\s|>)', end: '>',
      keywords: { name: 'script' },
      contains: [TAG_INTERNALS],
      starts: {
        end: '\<\/script\>', returnEnd: true,
        subLanguage: ['javascript', 'handlebars', 'xml'] } },


    {
      className: 'tag',
      begin: '</?', end: '/?>',
      contains: [
      {
        className: 'name', begin: /[^\/><\s]+/, relevance: 0 },

      TAG_INTERNALS] }] };




}

/***/ }),
/* 33 */
/*!******************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/htmlbars.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: HTMLBars
                                                                                                       Requires: xml.js
                                                                                                       Author: Michael Johnston <lastobelus@gmail.com>
                                                                                                       Description: Matcher for HTMLBars
                                                                                                       Website: https://github.com/tildeio/htmlbars
                                                                                                       Category: template
                                                                                                       */

function _default(hljs) {
  var BUILT_INS = 'action collection component concat debugger each each-in else get hash if input link-to loc log mut outlet partial query-params render textarea unbound unless with yield view';

  var ATTR_ASSIGNMENT = {
    illegal: /\}\}/,
    begin: /[a-zA-Z0-9_]+=/,
    returnBegin: true,
    relevance: 0,
    contains: [
    {
      className: 'attr', begin: /[a-zA-Z0-9_]+/ }] };




  var SUB_EXPR = {
    illegal: /\}\}/,
    begin: /\)/, end: /\)/,
    contains: [
    {
      begin: /[a-zA-Z\.\-]+/,
      keywords: { built_in: BUILT_INS },
      starts: {
        endsWithParent: true, relevance: 0,
        contains: [
        hljs.QUOTE_STRING_MODE] } }] };






  var TAG_INNARDS = {
    endsWithParent: true, relevance: 0,
    keywords: { keyword: 'as', built_in: BUILT_INS },
    contains: [
    hljs.QUOTE_STRING_MODE,
    ATTR_ASSIGNMENT,
    hljs.NUMBER_MODE] };



  return {
    name: 'HTMLBars',
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
    hljs.COMMENT('{{!(--)?', '(--)?}}'),
    {
      className: 'template-tag',
      begin: /\{\{[#\/]/, end: /\}\}/,
      contains: [
      {
        className: 'name',
        begin: /[a-zA-Z\.\-]+/,
        keywords: { 'builtin-name': BUILT_INS },
        starts: TAG_INNARDS }] },



    {
      className: 'template-variable',
      begin: /\{\{[a-zA-Z][a-zA-Z\-]+/, end: /\}\}/,
      keywords: { keyword: 'as', built_in: BUILT_INS },
      contains: [
      hljs.QUOTE_STRING_MODE] }] };




}

/***/ }),
/* 34 */
/*!***************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/nginx.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: Nginx config
                                                                                                       Author: Peter Leonov <gojpeg@yandex.ru>
                                                                                                       Contributors: Ivan Sagalaev <maniac@softwaremaniacs.org>
                                                                                                       Category: common, config
                                                                                                       Website: https://www.nginx.com
                                                                                                       */

function _default(hljs) {
  var VAR = {
    className: 'variable',
    variants: [
    { begin: /\$\d+/ },
    { begin: /\$\{/, end: /}/ },
    { begin: '[\\$\\@]' + hljs.UNDERSCORE_IDENT_RE }] };


  var DEFAULT = {
    endsWithParent: true,
    lexemes: '[a-z/_]+',
    keywords: {
      literal:
      'on off yes no true false none blocked debug info notice warn error crit ' +
      'select break last permanent redirect kqueue rtsig epoll poll /dev/poll' },

    relevance: 0,
    illegal: '=>',
    contains: [
    hljs.HASH_COMMENT_MODE,
    {
      className: 'string',
      contains: [hljs.BACKSLASH_ESCAPE, VAR],
      variants: [
      { begin: /"/, end: /"/ },
      { begin: /'/, end: /'/ }] },


    // this swallows entire URLs to avoid detecting numbers within
    {
      begin: '([a-z]+):/', end: '\\s', endsWithParent: true, excludeEnd: true,
      contains: [VAR] },

    {
      className: 'regexp',
      contains: [hljs.BACKSLASH_ESCAPE, VAR],
      variants: [
      { begin: "\\s\\^", end: "\\s|{|;", returnEnd: true },
      // regexp locations (~, ~*)
      { begin: "~\\*?\\s+", end: "\\s|{|;", returnEnd: true },
      // *.example.com
      { begin: "\\*(\\.[a-z\\-]+)+" },
      // sub.example.*
      { begin: "([a-z\\-]+\\.)+\\*" }] },


    // IP
    {
      className: 'number',
      begin: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b' },

    // units
    {
      className: 'number',
      begin: '\\b\\d+[kKmMgGdshdwy]*\\b',
      relevance: 0 },

    VAR] };



  return {
    name: 'Nginx config',
    aliases: ['nginxconf'],
    contains: [
    hljs.HASH_COMMENT_MODE,
    {
      begin: hljs.UNDERSCORE_IDENT_RE + '\\s+{', returnBegin: true,
      end: '{',
      contains: [
      {
        className: 'section',
        begin: hljs.UNDERSCORE_IDENT_RE }],


      relevance: 0 },

    {
      begin: hljs.UNDERSCORE_IDENT_RE + '\\s', end: ';|{', returnBegin: true,
      contains: [
      {
        className: 'attribute',
        begin: hljs.UNDERSCORE_IDENT_RE,
        starts: DEFAULT }],


      relevance: 0 }],


    illegal: '[^\\s\\}]' };

}

/***/ }),
/* 35 */
/*!*************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/php.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: PHP
                                                                                                       Author: Victor Karamzin <Victor.Karamzin@enterra-inc.com>
                                                                                                       Contributors: Evgeny Stepanischev <imbolk@gmail.com>, Ivan Sagalaev <maniac@softwaremaniacs.org>
                                                                                                       Website: https://www.php.net
                                                                                                       Category: common
                                                                                                       */

function _default(hljs) {
  var VARIABLE = {
    begin: '\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*' };

  var PREPROCESSOR = {
    className: 'meta',
    variants: [
    { begin: /<\?php/, relevance: 10 }, // boost for obvious PHP
    { begin: /<\?[=]?/ },
    { begin: /\?>/ } // end php tag
    ] };

  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, PREPROCESSOR],
    variants: [
    {
      begin: 'b"', end: '"' },

    {
      begin: 'b\'', end: '\'' },

    hljs.inherit(hljs.APOS_STRING_MODE, { illegal: null }),
    hljs.inherit(hljs.QUOTE_STRING_MODE, { illegal: null })] };


  var NUMBER = { variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE] };
  var KEYWORDS = {
    keyword:
    // Magic constants:
    // <https://www.php.net/manual/en/language.constants.predefined.php>
    '__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ ' +
    // Function that look like language construct or language construct that look like function:
    // List of keywords that may not require parenthesis
    'die echo exit include include_once print require require_once ' +
    // These are not language construct (function) but operate on the currently-executing function and can access the current symbol table
    // 'compact extract func_get_arg func_get_args func_num_args get_called_class get_parent_class ' +
    // Other keywords:
    // <https://www.php.net/manual/en/reserved.php>
    // <https://www.php.net/manual/en/language.types.type-juggling.php>
    'array abstract and as binary bool boolean break callable case catch class clone const continue declare default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile eval extends final finally float for foreach from global goto if implements instanceof insteadof int integer interface isset iterable list new object or private protected public real return string switch throw trait try unset use var void while xor yield',
    literal: 'false null true',
    built_in:
    // Standard PHP library:
    // <https://www.php.net/manual/en/book.spl.php>
    'Error|0 ' + // error is too common a name esp since PHP is case in-sensitive
    'AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException ' +
    // Reserved interfaces:
    // <https://www.php.net/manual/en/reserved.interfaces.php>
    'ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Throwable Traversable WeakReference ' +
    // Reserved classes:
    // <https://www.php.net/manual/en/reserved.classes.php>
    'Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass' };

  return {
    aliases: ['php', 'php3', 'php4', 'php5', 'php6', 'php7'],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [
    hljs.HASH_COMMENT_MODE,
    hljs.COMMENT('//', '$', { contains: [PREPROCESSOR] }),
    hljs.COMMENT(
    '/\\*',
    '\\*/',
    {
      contains: [
      {
        className: 'doctag',
        begin: '@[A-Za-z]+' }] }),




    hljs.COMMENT(
    '__halt_compiler.+?;',
    false,
    {
      endsWithParent: true,
      keywords: '__halt_compiler',
      lexemes: hljs.UNDERSCORE_IDENT_RE }),


    {
      className: 'string',
      begin: /<<<['"]?\w+['"]?$/, end: /^\w+;?$/,
      contains: [
      hljs.BACKSLASH_ESCAPE,
      {
        className: 'subst',
        variants: [
        { begin: /\$\w+/ },
        { begin: /\{\$/, end: /\}/ }] }] },




    PREPROCESSOR,
    {
      className: 'keyword', begin: /\$this\b/ },

    VARIABLE,
    {
      // swallow composed identifiers to avoid parsing them as keywords
      begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/ },

    {
      className: 'function',
      beginKeywords: 'fn function', end: /[;{]/, excludeEnd: true,
      illegal: '[$%\\[]',
      contains: [
      hljs.UNDERSCORE_TITLE_MODE,
      {
        className: 'params',
        begin: '\\(', end: '\\)',
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
        'self',
        VARIABLE,
        hljs.C_BLOCK_COMMENT_MODE,
        STRING,
        NUMBER] }] },




    {
      className: 'class',
      beginKeywords: 'class interface', end: '{', excludeEnd: true,
      illegal: /[:\(\$"]/,
      contains: [
      { beginKeywords: 'extends implements' },
      hljs.UNDERSCORE_TITLE_MODE] },


    {
      beginKeywords: 'namespace', end: ';',
      illegal: /[\.']/,
      contains: [hljs.UNDERSCORE_TITLE_MODE] },

    {
      beginKeywords: 'use', end: ';',
      contains: [hljs.UNDERSCORE_TITLE_MODE] },

    {
      begin: '=>' // No markup, just a relevance booster
    },
    STRING,
    NUMBER] };


}

/***/ }),
/* 36 */
/*!****************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/python.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: Python
                                                                                                       Description: Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.
                                                                                                       Website: https://www.python.org
                                                                                                       Category: common
                                                                                                       */

function _default(hljs) {
  var KEYWORDS = {
    keyword:
    'and elif is global as in if from raise for except finally print import pass return ' +
    'exec else break not with class assert yield try while continue del or def lambda ' +
    'async await nonlocal|10',
    built_in:
    'Ellipsis NotImplemented',
    literal: 'False None True' };

  var PROMPT = {
    className: 'meta', begin: /^(>>>|\.\.\.) / };

  var SUBST = {
    className: 'subst',
    begin: /\{/, end: /\}/,
    keywords: KEYWORDS,
    illegal: /#/ };

  var LITERAL_BRACKET = {
    begin: /\{\{/,
    relevance: 0 };

  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
    {
      begin: /(u|b)?r?'''/, end: /'''/,
      contains: [hljs.BACKSLASH_ESCAPE, PROMPT],
      relevance: 10 },

    {
      begin: /(u|b)?r?"""/, end: /"""/,
      contains: [hljs.BACKSLASH_ESCAPE, PROMPT],
      relevance: 10 },

    {
      begin: /(fr|rf|f)'''/, end: /'''/,
      contains: [hljs.BACKSLASH_ESCAPE, PROMPT, LITERAL_BRACKET, SUBST] },

    {
      begin: /(fr|rf|f)"""/, end: /"""/,
      contains: [hljs.BACKSLASH_ESCAPE, PROMPT, LITERAL_BRACKET, SUBST] },

    {
      begin: /(u|r|ur)'/, end: /'/,
      relevance: 10 },

    {
      begin: /(u|r|ur)"/, end: /"/,
      relevance: 10 },

    {
      begin: /(b|br)'/, end: /'/ },

    {
      begin: /(b|br)"/, end: /"/ },

    {
      begin: /(fr|rf|f)'/, end: /'/,
      contains: [hljs.BACKSLASH_ESCAPE, LITERAL_BRACKET, SUBST] },

    {
      begin: /(fr|rf|f)"/, end: /"/,
      contains: [hljs.BACKSLASH_ESCAPE, LITERAL_BRACKET, SUBST] },

    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE] };


  var NUMBER = {
    className: 'number', relevance: 0,
    variants: [
    { begin: hljs.BINARY_NUMBER_RE + '[lLjJ]?' },
    { begin: '\\b(0o[0-7]+)[lLjJ]?' },
    { begin: hljs.C_NUMBER_RE + '[lLjJ]?' }] };


  var PARAMS = {
    className: 'params',
    begin: /\(/, end: /\)/,
    contains: ['self', PROMPT, NUMBER, STRING, hljs.HASH_COMMENT_MODE] };

  SUBST.contains = [STRING, NUMBER, PROMPT];
  return {
    name: 'Python',
    aliases: ['py', 'gyp', 'ipython'],
    keywords: KEYWORDS,
    illegal: /(<\/|->|\?)|=>/,
    contains: [
    PROMPT,
    NUMBER,
    // eat "if" prior to string so that it won't accidentally be
    // labeled as an f-string as in:
    { beginKeywords: "if", relevance: 0 },
    STRING,
    hljs.HASH_COMMENT_MODE,
    {
      variants: [
      { className: 'function', beginKeywords: 'def' },
      { className: 'class', beginKeywords: 'class' }],

      end: /:/,
      illegal: /[${=;\n,]/,
      contains: [
      hljs.UNDERSCORE_TITLE_MODE,
      PARAMS,
      {
        begin: /->/, endsWithParent: true,
        keywords: 'None' }] },



    {
      className: 'meta',
      begin: /^[\t ]*@/, end: /$/ },

    {
      begin: /\b(print|exec)\(/ // don’t highlight keywords-turned-functions in Python 3
    }] };


}

/***/ }),
/* 37 */
/*!*********************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/python-repl.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: Python REPL
                                                                                                       Requires: python.js
                                                                                                       Author: Josh Goebel <hello@joshgoebel.com>
                                                                                                       Category: common
                                                                                                       */

function _default(hljs) {
  return {
    aliases: ['pycon'],
    contains: [
    {
      className: 'meta',
      starts: {
        // a space separates the REPL prefix from the actual code
        // this is purely for cleaner HTML output
        end: / |$/,
        starts: {
          end: '$', subLanguage: 'python' } },


      variants: [
      { begin: /^>>>(?=[ ]|$)/ },
      { begin: /^\.\.\.(?=[ ]|$)/ }] }] };




}

/***/ }),
/* 38 */
/*!********************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/highlight/languages/typescript.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default; /*
                                                                                                       Language: TypeScript
                                                                                                       Author: Panu Horsmalahti <panu.horsmalahti@iki.fi>
                                                                                                       Contributors: Ike Ku <dempfi@yahoo.com>
                                                                                                       Description: TypeScript is a strict superset of JavaScript
                                                                                                       Website: https://www.typescriptlang.org
                                                                                                       Category: common, scripting
                                                                                                       */

function _default(hljs) {
  var JS_IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
  var KEYWORDS = {
    keyword:
    'in if for while finally var new function do return void else break catch ' +
    'instanceof with throw case default try this switch continue typeof delete ' +
    'let yield const class public private protected get set super ' +
    'static implements enum export import declare type namespace abstract ' +
    'as from extends async await',
    literal:
    'true false null undefined NaN Infinity',
    built_in:
    'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' +
    'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' +
    'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' +
    'TypeError URIError Number Math Date String RegExp Array Float32Array ' +
    'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' +
    'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' +
    'module console window document any number boolean string void Promise' };


  var DECORATOR = {
    className: 'meta',
    begin: '@' + JS_IDENT_RE };


  var ARGS =
  {
    begin: '\\(',
    end: /\)/,
    keywords: KEYWORDS,
    contains: [
    'self',
    hljs.QUOTE_STRING_MODE,
    hljs.APOS_STRING_MODE,
    hljs.NUMBER_MODE] };



  var PARAMS = {
    className: 'params',
    begin: /\(/, end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS,
    contains: [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    DECORATOR,
    ARGS] };


  var NUMBER = {
    className: 'number',
    variants: [
    { begin: '\\b(0[bB][01]+)n?' },
    { begin: '\\b(0[oO][0-7]+)n?' },
    { begin: hljs.C_NUMBER_RE + 'n?' }],

    relevance: 0 };

  var SUBST = {
    className: 'subst',
    begin: '\\$\\{', end: '\\}',
    keywords: KEYWORDS,
    contains: [] // defined later
  };
  var HTML_TEMPLATE = {
    begin: 'html`', end: '',
    starts: {
      end: '`', returnEnd: false,
      contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST],

      subLanguage: 'xml' } };


  var CSS_TEMPLATE = {
    begin: 'css`', end: '',
    starts: {
      end: '`', returnEnd: false,
      contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST],

      subLanguage: 'css' } };


  var TEMPLATE_STRING = {
    className: 'string',
    begin: '`', end: '`',
    contains: [
    hljs.BACKSLASH_ESCAPE,
    SUBST] };


  SUBST.contains = [
  hljs.APOS_STRING_MODE,
  hljs.QUOTE_STRING_MODE,
  HTML_TEMPLATE,
  CSS_TEMPLATE,
  TEMPLATE_STRING,
  NUMBER,
  hljs.REGEXP_MODE];




  return {
    name: 'TypeScript',
    aliases: ['ts'],
    keywords: KEYWORDS,
    contains: [
    {
      className: 'meta',
      begin: /^\s*['"]use strict['"]/ },

    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    TEMPLATE_STRING,
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    NUMBER,
    { // "value" container
      begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
      keywords: 'return throw case',
      contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.REGEXP_MODE,
      {
        className: 'function',
        begin: '(\\(.*?\\)|' + hljs.IDENT_RE + ')\\s*=>', returnBegin: true,
        end: '\\s*=>',
        contains: [
        {
          className: 'params',
          variants: [
          {
            begin: hljs.IDENT_RE },

          {
            begin: /\(\s*\)/ },

          {
            begin: /\(/, end: /\)/,
            excludeBegin: true, excludeEnd: true,
            keywords: KEYWORDS,
            contains: [
            'self',
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE] }] }] }],







      relevance: 0 },

    {
      className: 'function',
      beginKeywords: 'function', end: /[\{;]/, excludeEnd: true,
      keywords: KEYWORDS,
      contains: [
      'self',
      hljs.inherit(hljs.TITLE_MODE, { begin: JS_IDENT_RE }),
      PARAMS],

      illegal: /%/,
      relevance: 0 // () => {} is more typical in TypeScript
    },
    {
      beginKeywords: 'constructor', end: /[\{;]/, excludeEnd: true,
      contains: [
      'self',
      PARAMS] },


    { // prevent references like module.id from being higlighted as module definitions
      begin: /module\./,
      keywords: { built_in: 'module' },
      relevance: 0 },

    {
      beginKeywords: 'module', end: /\{/, excludeEnd: true },

    {
      beginKeywords: 'interface', end: /\{/, excludeEnd: true,
      keywords: 'interface extends' },

    {
      begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
    },
    {
      begin: '\\.' + hljs.IDENT_RE, relevance: 0 // hack: prevents detection of keywords after dots
    },
    DECORATOR,
    ARGS] };


}

/***/ }),
/* 39 */
/*!*******************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/markdown/markdown.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;!function (e) {if (true) module.exports = e();else { var r; }}(function () {var e;return function e(r, t, n) {function s(i, a) {if (!t[i]) {if (!r[i]) {var c = "function" == typeof require && require;if (!a && c) return require(i, !0);if (o) return o(i, !0);var l = new Error("Cannot find module '" + i + "'");throw l.code = "MODULE_NOT_FOUND", l;}var u = t[i] = { exports: {} };r[i][0].call(u.exports, function (e) {var t = r[i][1][e];return s(t ? t : e);}, u, u.exports, e, r, t, n);}return t[i].exports;}for (var o = "function" == typeof require && require, i = 0; i < n.length; i++) {s(n[i]);}return s;}({ 1: [function (e, r, t) {"use strict";r.exports = e("entities/maps/entities.json");}, { "entities/maps/entities.json": 52 }], 2: [function (e, r, t) {"use strict";r.exports = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "meta", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "pre", "section", "source", "title", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"];}, {}], 3: [function (e, r, t) {"use strict";var n = "<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>",s = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",o = new RegExp("^(?:" + n + "|" + s + "|<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->|<[?].*?[?]>|<![A-Z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)"),i = new RegExp("^(?:" + n + "|" + s + ")");r.exports.HTML_TAG_RE = o, r.exports.HTML_OPEN_CLOSE_TAG_RE = i;}, {}], 4: [function (e, r, t) {"use strict";function n(e) {return Object.prototype.toString.call(e);}function s(e) {return "[object String]" === n(e);}function o(e, r) {return y.call(e, r);}function i(e) {return Array.prototype.slice.call(arguments, 1).forEach(function (r) {if (r) {if ("object" != typeof r) throw new TypeError(r + "must be object");Object.keys(r).forEach(function (t) {e[t] = r[t];});}}), e;}function a(e, r, t) {return [].concat(e.slice(0, r), t, e.slice(r + 1));}function c(e) {return !(e >= 55296 && e <= 57343) && !(e >= 64976 && e <= 65007) && 65535 != (65535 & e) && 65534 != (65535 & e) && !(e >= 0 && e <= 8) && 11 !== e && !(e >= 14 && e <= 31) && !(e >= 127 && e <= 159) && !(e > 1114111);}function l(e) {if (e > 65535) {e -= 65536;var r = 55296 + (e >> 10),t = 56320 + (1023 & e);return String.fromCharCode(r, t);}return String.fromCharCode(e);}function u(e, r) {var t = 0;return o(w, r) ? w[r] : 35 === r.charCodeAt(0) && A.test(r) && (t = "x" === r[1].toLowerCase() ? parseInt(r.slice(2), 16) : parseInt(r.slice(1), 10), c(t)) ? l(t) : e;}function p(e) {return e.indexOf("\\") < 0 ? e : e.replace(x, "$1");}function h(e) {return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(C, function (e, r, t) {return r ? r : u(e, t);});}function f(e) {return q[e];}function d(e) {return D.test(e) ? e.replace(/[&<>"]/g, f) : e;}function m(e) {return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");}function _(e) {switch (e) {case 9:case 32:return !0;}return !1;}function g(e) {if (e >= 8192 && e <= 8202) return !0;switch (e) {case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return !0;}return !1;}function b(e) {return E.test(e);}function k(e) {switch (e) {case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return !0;default:return !1;}}function v(e) {return e.trim().replace(/\s+/g, " ").toUpperCase();}var y = Object.prototype.hasOwnProperty,x = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g,C = new RegExp(x.source + "|" + /&([a-z#][a-z0-9]{1,31});/gi.source, "gi"),A = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,w = e("./entities"),D = /[&<>"]/,q = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" },E = e("uc.micro/categories/P/regex");t.lib = {}, t.lib.mdurl = e("mdurl"), t.lib.ucmicro = e("uc.micro"), t.assign = i, t.isString = s, t.has = o, t.unescapeMd = p, t.unescapeAll = h, t.isValidEntityCode = c, t.fromCodePoint = l, t.escapeHtml = d, t.arrayReplaceAt = a, t.isSpace = _, t.isWhiteSpace = g, t.isMdAsciiPunct = k, t.isPunctChar = b, t.escapeRE = m, t.normalizeReference = v;}, { "./entities": 1, mdurl: 58, "uc.micro": 65, "uc.micro/categories/P/regex": 63 }], 5: [function (e, r, t) {"use strict";t.parseLinkLabel = e("./parse_link_label"), t.parseLinkDestination = e("./parse_link_destination"), t.parseLinkTitle = e("./parse_link_title");}, { "./parse_link_destination": 6, "./parse_link_label": 7, "./parse_link_title": 8 }], 6: [function (e, r, t) {"use strict";var n = e("../common/utils").isSpace,s = e("../common/utils").unescapeAll;r.exports = function (e, r, t) {var o,i,a = r,c = { ok: !1, pos: 0, lines: 0, str: "" };if (60 === e.charCodeAt(r)) {for (r++; r < t;) {if (10 === (o = e.charCodeAt(r)) || n(o)) return c;if (62 === o) return c.pos = r + 1, c.str = s(e.slice(a + 1, r)), c.ok = !0, c;92 === o && r + 1 < t ? r += 2 : r++;}return c;}for (i = 0; r < t && 32 !== (o = e.charCodeAt(r)) && !(o < 32 || 127 === o);) {if (92 === o && r + 1 < t) r += 2;else {if (40 === o && ++i > 1) break;if (41 === o && --i < 0) break;r++;}}return a === r ? c : (c.str = s(e.slice(a, r)), c.lines = 0, c.pos = r, c.ok = !0, c);};}, { "../common/utils": 4 }], 7: [function (e, r, t) {"use strict";r.exports = function (e, r, t) {var n,s,o,i,a = -1,c = e.posMax,l = e.pos;for (e.pos = r + 1, n = 1; e.pos < c;) {if (93 === (o = e.src.charCodeAt(e.pos)) && 0 === --n) {s = !0;break;}if (i = e.pos, e.md.inline.skipToken(e), 91 === o) if (i === e.pos - 1) n++;else if (t) return e.pos = l, -1;}return s && (a = e.pos), e.pos = l, a;};}, {}], 8: [function (e, r, t) {"use strict";var n = e("../common/utils").unescapeAll;r.exports = function (e, r, t) {var s,o,i = 0,a = r,c = { ok: !1, pos: 0, lines: 0, str: "" };if (r >= t) return c;if (34 !== (o = e.charCodeAt(r)) && 39 !== o && 40 !== o) return c;for (r++, 40 === o && (o = 41); r < t;) {if ((s = e.charCodeAt(r)) === o) return c.pos = r + 1, c.lines = i, c.str = n(e.slice(a + 1, r)), c.ok = !0, c;10 === s ? i++ : 92 === s && r + 1 < t && (r++, 10 === e.charCodeAt(r) && i++), r++;}return c;};}, { "../common/utils": 4 }], 9: [function (e, r, t) {"use strict";function n(e) {var r = e.trim().toLowerCase();return !g.test(r) || !!b.test(r);}function s(e) {var r = d.parse(e, !0);if (r.hostname && (!r.protocol || k.indexOf(r.protocol) >= 0)) try {r.hostname = m.toASCII(r.hostname);} catch (e) {}return d.encode(d.format(r));}function o(e) {var r = d.parse(e, !0);if (r.hostname && (!r.protocol || k.indexOf(r.protocol) >= 0)) try {r.hostname = m.toUnicode(r.hostname);} catch (e) {}return d.decode(d.format(r));}function i(e, r) {if (!(this instanceof i)) return new i(e, r);r || a.isString(e) || (r = e || {}, e = "default"), this.inline = new h(), this.block = new p(), this.core = new u(), this.renderer = new l(), this.linkify = new f(), this.validateLink = n, this.normalizeLink = s, this.normalizeLinkText = o, this.utils = a, this.helpers = a.assign({}, c), this.options = {}, this.configure(e), r && this.set(r);}var a = e("./common/utils"),c = e("./helpers"),l = e("./renderer"),u = e("./parser_core"),p = e("./parser_block"),h = e("./parser_inline"),f = e("linkify-it"),d = e("mdurl"),m = e("punycode"),_ = { default: e("./presets/default"), zero: e("./presets/zero"), commonmark: e("./presets/commonmark") },g = /^(vbscript|javascript|file|data):/,b = /^data:image\/(gif|png|jpeg|webp);/,k = ["http:", "https:", "mailto:"];i.prototype.set = function (e) {return a.assign(this.options, e), this;}, i.prototype.configure = function (e) {var r,t = this;if (a.isString(e) && (r = e, !(e = _[r]))) throw new Error('Wrong `markdown-it` preset "' + r + '", check name');if (!e) throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options && t.set(e.options), e.components && Object.keys(e.components).forEach(function (r) {e.components[r].rules && t[r].ruler.enableOnly(e.components[r].rules), e.components[r].rules2 && t[r].ruler2.enableOnly(e.components[r].rules2);}), this;}, i.prototype.enable = function (e, r) {var t = [];Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function (r) {t = t.concat(this[r].ruler.enable(e, !0));}, this), t = t.concat(this.inline.ruler2.enable(e, !0));var n = e.filter(function (e) {return t.indexOf(e) < 0;});if (n.length && !r) throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + n);return this;}, i.prototype.disable = function (e, r) {var t = [];Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function (r) {t = t.concat(this[r].ruler.disable(e, !0));}, this), t = t.concat(this.inline.ruler2.disable(e, !0));var n = e.filter(function (e) {return t.indexOf(e) < 0;});if (n.length && !r) throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + n);return this;}, i.prototype.use = function (e) {var r = [this].concat(Array.prototype.slice.call(arguments, 1));if (e && e.apply) {return e.apply(e, r), this;}}, i.prototype.parse = function (e, r) {if ("string" != typeof e) throw new Error("Input data should be a String");var t = new this.core.State(e, this, r);return this.core.process(t), t.tokens;}, i.prototype.render = function (e, r) {return r = r || {}, this.renderer.render(this.parse(e, r), this.options, r);}, i.prototype.parseInline = function (e, r) {var t = new this.core.State(e, this, r);return t.inlineMode = !0, this.core.process(t), t.tokens;}, i.prototype.renderInline = function (e, r) {return r = r || {}, this.renderer.render(this.parseInline(e, r), this.options, r);}, r.exports = i;}, { "./common/utils": 4, "./helpers": 5, "./parser_block": 10, "./parser_core": 11, "./parser_inline": 12, "./presets/commonmark": 13, "./presets/default": 14, "./presets/zero": 15, "./renderer": 16, "linkify-it": 53, mdurl: 58, punycode: 60 }], 10: [function (e, r, t) {"use strict";function n() {this.ruler = new s();for (var e = 0; e < o.length; e++) {this.ruler.push(o[e][0], o[e][1], { alt: (o[e][2] || []).slice() });}}var s = e("./ruler"),o = [["table", e("./rules_block/table"), ["paragraph", "reference"]], ["code", e("./rules_block/code")], ["fence", e("./rules_block/fence"), ["paragraph", "reference", "blockquote", "list"]], ["blockquote", e("./rules_block/blockquote"), ["paragraph", "reference", "list"]], ["hr", e("./rules_block/hr"), ["paragraph", "reference", "blockquote", "list"]], ["list", e("./rules_block/list"), ["paragraph", "reference", "blockquote"]], ["reference", e("./rules_block/reference")], ["heading", e("./rules_block/heading"), ["paragraph", "reference", "blockquote"]], ["lheading", e("./rules_block/lheading")], ["html_block", e("./rules_block/html_block"), ["paragraph", "reference", "blockquote"]], ["paragraph", e("./rules_block/paragraph")]];n.prototype.tokenize = function (e, r, t) {for (var n, s = this.ruler.getRules(""), o = s.length, i = r, a = !1, c = e.md.options.maxNesting; i < t && (e.line = i = e.skipEmptyLines(i), !(i >= t)) && !(e.sCount[i] < e.blkIndent);) {if (e.level >= c) {e.line = t;break;}for (n = 0; n < o && !s[n](e, i, t, !1); n++) {;}e.tight = !a, e.isEmpty(e.line - 1) && (a = !0), (i = e.line) < t && e.isEmpty(i) && (a = !0, i++, e.line = i);}}, n.prototype.parse = function (e, r, t, n) {var s;e && (s = new this.State(e, r, t, n), this.tokenize(s, s.line, s.lineMax));}, n.prototype.State = e("./rules_block/state_block"), r.exports = n;}, { "./ruler": 17, "./rules_block/blockquote": 18, "./rules_block/code": 19, "./rules_block/fence": 20, "./rules_block/heading": 21, "./rules_block/hr": 22, "./rules_block/html_block": 23, "./rules_block/lheading": 24, "./rules_block/list": 25, "./rules_block/paragraph": 26, "./rules_block/reference": 27, "./rules_block/state_block": 28, "./rules_block/table": 29 }], 11: [function (e, r, t) {"use strict";function n() {this.ruler = new s();for (var e = 0; e < o.length; e++) {this.ruler.push(o[e][0], o[e][1]);}}var s = e("./ruler"),o = [["normalize", e("./rules_core/normalize")], ["block", e("./rules_core/block")], ["inline", e("./rules_core/inline")], ["linkify", e("./rules_core/linkify")], ["replacements", e("./rules_core/replacements")], ["smartquotes", e("./rules_core/smartquotes")]];n.prototype.process = function (e) {var r, t, n;for (n = this.ruler.getRules(""), r = 0, t = n.length; r < t; r++) {n[r](e);}}, n.prototype.State = e("./rules_core/state_core"), r.exports = n;}, { "./ruler": 17, "./rules_core/block": 30, "./rules_core/inline": 31, "./rules_core/linkify": 32, "./rules_core/normalize": 33, "./rules_core/replacements": 34, "./rules_core/smartquotes": 35, "./rules_core/state_core": 36 }], 12: [function (e, r, t) {"use strict";function n() {var e;for (this.ruler = new s(), e = 0; e < o.length; e++) {this.ruler.push(o[e][0], o[e][1]);}for (this.ruler2 = new s(), e = 0; e < i.length; e++) {this.ruler2.push(i[e][0], i[e][1]);}}var s = e("./ruler"),o = [["text", e("./rules_inline/text")], ["newline", e("./rules_inline/newline")], ["escape", e("./rules_inline/escape")], ["backticks", e("./rules_inline/backticks")], ["strikethrough", e("./rules_inline/strikethrough").tokenize], ["emphasis", e("./rules_inline/emphasis").tokenize], ["link", e("./rules_inline/link")], ["image", e("./rules_inline/image")], ["autolink", e("./rules_inline/autolink")], ["html_inline", e("./rules_inline/html_inline")], ["entity", e("./rules_inline/entity")]],i = [["balance_pairs", e("./rules_inline/balance_pairs")], ["strikethrough", e("./rules_inline/strikethrough").postProcess], ["emphasis", e("./rules_inline/emphasis").postProcess], ["text_collapse", e("./rules_inline/text_collapse")]];n.prototype.skipToken = function (e) {var r,t,n = e.pos,s = this.ruler.getRules(""),o = s.length,i = e.md.options.maxNesting,a = e.cache;if (void 0 !== a[n]) return void (e.pos = a[n]);if (e.level < i) for (t = 0; t < o && (e.level++, r = s[t](e, !0), e.level--, !r); t++) {;} else e.pos = e.posMax;r || e.pos++, a[n] = e.pos;}, n.prototype.tokenize = function (e) {for (var r, t, n = this.ruler.getRules(""), s = n.length, o = e.posMax, i = e.md.options.maxNesting; e.pos < o;) {if (e.level < i) for (t = 0; t < s && !(r = n[t](e, !1)); t++) {;}if (r) {if (e.pos >= o) break;} else e.pending += e.src[e.pos++];}e.pending && e.pushPending();}, n.prototype.parse = function (e, r, t, n) {var s,o,i,a = new this.State(e, r, t, n);for (this.tokenize(a), o = this.ruler2.getRules(""), i = o.length, s = 0; s < i; s++) {o[s](a);}}, n.prototype.State = e("./rules_inline/state_inline"), r.exports = n;}, { "./ruler": 17, "./rules_inline/autolink": 37, "./rules_inline/backticks": 38, "./rules_inline/balance_pairs": 39, "./rules_inline/emphasis": 40, "./rules_inline/entity": 41, "./rules_inline/escape": 42, "./rules_inline/html_inline": 43, "./rules_inline/image": 44, "./rules_inline/link": 45, "./rules_inline/newline": 46, "./rules_inline/state_inline": 47, "./rules_inline/strikethrough": 48, "./rules_inline/text": 49, "./rules_inline/text_collapse": 50 }], 13: [function (e, r, t) {"use strict";r.exports = { options: { html: !0, xhtmlOut: !0, breaks: !1, langPrefix: "language-", linkify: !1, typographer: !1, quotes: "\u201C\u201D\u2018\u2019", highlight: null, maxNesting: 20 }, components: { core: { rules: ["normalize", "block", "inline"] }, block: { rules: ["blockquote", "code", "fence", "heading", "hr", "html_block", "lheading", "list", "reference", "paragraph"] }, inline: { rules: ["autolink", "backticks", "emphasis", "entity", "escape", "html_inline", "image", "link", "newline", "text"], rules2: ["balance_pairs", "emphasis", "text_collapse"] } } };}, {}], 14: [function (e, r, t) {"use strict";r.exports = { options: { html: !1, xhtmlOut: !1, breaks: !1, langPrefix: "language-", linkify: !1, typographer: !1, quotes: "\u201C\u201D\u2018\u2019", highlight: null, maxNesting: 100 }, components: { core: {}, block: {}, inline: {} } };}, {}], 15: [function (e, r, t) {"use strict";r.exports = { options: { html: !1, xhtmlOut: !1, breaks: !1, langPrefix: "language-", linkify: !1, typographer: !1, quotes: "\u201C\u201D\u2018\u2019", highlight: null, maxNesting: 20 }, components: { core: { rules: ["normalize", "block", "inline"] }, block: { rules: ["paragraph"] }, inline: { rules: ["text"], rules2: ["balance_pairs", "text_collapse"] } } };}, {}], 16: [function (e, r, t) {"use strict";function n() {this.rules = s({}, a);}var s = e("./common/utils").assign,o = e("./common/utils").unescapeAll,i = e("./common/utils").escapeHtml,a = {};a.code_inline = function (e, r, t, n, s) {var o = e[r];return "<code" + s.renderAttrs(o) + ">" + i(e[r].content) + "</code>";}, a.code_block = function (e, r, t, n, s) {var o = e[r];return "<pre" + s.renderAttrs(o) + "><code>" + i(e[r].content) + "</code></pre>\n";}, a.fence = function (e, r, t, n, s) {var a,c,l,u,p = e[r],h = p.info ? o(p.info).trim() : "",f = "";return h && (f = h.split(/\s+/g)[0]), a = t.highlight ? t.highlight(p.content, f) || i(p.content) : i(p.content), 0 === a.indexOf("<pre") ? a + "\n" : h ? (c = p.attrIndex("class"), l = p.attrs ? p.attrs.slice() : [], c < 0 ? l.push(["class", t.langPrefix + f]) : l[c][1] += " " + t.langPrefix + f, u = { attrs: l }, "<pre><code" + s.renderAttrs(u) + ">" + a + "</code></pre>\n") : "<pre><code" + s.renderAttrs(p) + ">" + a + "</code></pre>\n";}, a.image = function (e, r, t, n, s) {var o = e[r];return o.attrs[o.attrIndex("alt")][1] = s.renderInlineAsText(o.children, t, n), s.renderToken(e, r, t);}, a.hardbreak = function (e, r, t) {return t.xhtmlOut ? "<br />\n" : "<br>\n";}, a.softbreak = function (e, r, t) {return t.breaks ? t.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";}, a.text = function (e, r) {return i(e[r].content);}, a.html_block = function (e, r) {return e[r].content;}, a.html_inline = function (e, r) {return e[r].content;}, n.prototype.renderAttrs = function (e) {var r, t, n;if (!e.attrs) return "";for (n = "", r = 0, t = e.attrs.length; r < t; r++) {n += " " + i(e.attrs[r][0]) + '="' + i(e.attrs[r][1]) + '"';}return n;}, n.prototype.renderToken = function (e, r, t) {var n,s = "",o = !1,i = e[r];return i.hidden ? "" : (i.block && i.nesting !== -1 && r && e[r - 1].hidden && (s += "\n"), s += (i.nesting === -1 ? "</" : "<") + i.tag, s += this.renderAttrs(i), 0 === i.nesting && t.xhtmlOut && (s += " /"), i.block && (o = !0, 1 === i.nesting && r + 1 < e.length && (n = e[r + 1], "inline" === n.type || n.hidden ? o = !1 : n.nesting === -1 && n.tag === i.tag && (o = !1))), s += o ? ">\n" : ">");}, n.prototype.renderInline = function (e, r, t) {for (var n, s = "", o = this.rules, i = 0, a = e.length; i < a; i++) {n = e[i].type, s += void 0 !== o[n] ? o[n](e, i, r, t, this) : this.renderToken(e, i, r);}return s;}, n.prototype.renderInlineAsText = function (e, r, t) {for (var n = "", s = 0, o = e.length; s < o; s++) {"text" === e[s].type ? n += e[s].content : "image" === e[s].type && (n += this.renderInlineAsText(e[s].children, r, t));}return n;}, n.prototype.render = function (e, r, t) {var n,s,o,i = "",a = this.rules;for (n = 0, s = e.length; n < s; n++) {o = e[n].type, i += "inline" === o ? this.renderInline(e[n].children, r, t) : void 0 !== a[o] ? a[e[n].type](e, n, r, t, this) : this.renderToken(e, n, r, t);}return i;}, r.exports = n;}, { "./common/utils": 4 }], 17: [function (e, r, t) {"use strict";function n() {this.__rules__ = [], this.__cache__ = null;}n.prototype.__find__ = function (e) {for (var r = 0; r < this.__rules__.length; r++) {if (this.__rules__[r].name === e) return r;}return -1;}, n.prototype.__compile__ = function () {var e = this,r = [""];e.__rules__.forEach(function (e) {e.enabled && e.alt.forEach(function (e) {r.indexOf(e) < 0 && r.push(e);});}), e.__cache__ = {}, r.forEach(function (r) {e.__cache__[r] = [], e.__rules__.forEach(function (t) {t.enabled && (r && t.alt.indexOf(r) < 0 || e.__cache__[r].push(t.fn));});});}, n.prototype.at = function (e, r, t) {var n = this.__find__(e),s = t || {};if (n === -1) throw new Error("Parser rule not found: " + e);this.__rules__[n].fn = r, this.__rules__[n].alt = s.alt || [], this.__cache__ = null;}, n.prototype.before = function (e, r, t, n) {var s = this.__find__(e),o = n || {};if (s === -1) throw new Error("Parser rule not found: " + e);this.__rules__.splice(s, 0, { name: r, enabled: !0, fn: t, alt: o.alt || [] }), this.__cache__ = null;}, n.prototype.after = function (e, r, t, n) {var s = this.__find__(e),o = n || {};if (s === -1) throw new Error("Parser rule not found: " + e);this.__rules__.splice(s + 1, 0, { name: r, enabled: !0, fn: t, alt: o.alt || [] }), this.__cache__ = null;}, n.prototype.push = function (e, r, t) {var n = t || {};this.__rules__.push({ name: e, enabled: !0, fn: r, alt: n.alt || [] }), this.__cache__ = null;}, n.prototype.enable = function (e, r) {Array.isArray(e) || (e = [e]);var t = [];return e.forEach(function (e) {var n = this.__find__(e);if (n < 0) {if (r) return;throw new Error("Rules manager: invalid rule name " + e);}this.__rules__[n].enabled = !0, t.push(e);}, this), this.__cache__ = null, t;}, n.prototype.enableOnly = function (e, r) {Array.isArray(e) || (e = [e]), this.__rules__.forEach(function (e) {e.enabled = !1;}), this.enable(e, r);}, n.prototype.disable = function (e, r) {Array.isArray(e) || (e = [e]);var t = [];return e.forEach(function (e) {var n = this.__find__(e);if (n < 0) {if (r) return;throw new Error("Rules manager: invalid rule name " + e);}this.__rules__[n].enabled = !1, t.push(e);}, this), this.__cache__ = null, t;}, n.prototype.getRules = function (e) {return null === this.__cache__ && this.__compile__(), this.__cache__[e] || [];}, r.exports = n;}, {}], 18: [function (e, r, t) {"use strict";var n = e("../common/utils").isSpace;r.exports = function (e, r, t, s) {var o,i,a,c,l,u,p,h,f,d,m,_,g,b,k,v,y,x,C,A,w = e.lineMax,D = e.bMarks[r] + e.tShift[r],q = e.eMarks[r];if (e.sCount[r] - e.blkIndent >= 4) return !1;if (62 !== e.src.charCodeAt(D++)) return !1;if (s) return !0;for (c = d = e.sCount[r] + D - (e.bMarks[r] + e.tShift[r]), 32 === e.src.charCodeAt(D) ? (D++, c++, d++, o = !1, y = !0) : 9 === e.src.charCodeAt(D) ? (y = !0, (e.bsCount[r] + d) % 4 == 3 ? (D++, c++, d++, o = !1) : o = !0) : y = !1, m = [e.bMarks[r]], e.bMarks[r] = D; D < q && (i = e.src.charCodeAt(D), n(i));) {9 === i ? d += 4 - (d + e.bsCount[r] + (o ? 1 : 0)) % 4 : d++, D++;}for (_ = [e.bsCount[r]], e.bsCount[r] = e.sCount[r] + 1 + (y ? 1 : 0), p = D >= q, k = [e.sCount[r]], e.sCount[r] = d - c, v = [e.tShift[r]], e.tShift[r] = D - e.bMarks[r], C = e.md.block.ruler.getRules("blockquote"), b = e.parentType, e.parentType = "blockquote", f = r + 1; f < t && (l = e.sCount[f] < e.blkIndent, D = e.bMarks[f] + e.tShift[f], q = e.eMarks[f], !(D >= q)); f++) {if (62 !== e.src.charCodeAt(D++) || l) {if (p) break;for (x = !1, a = 0, u = C.length; a < u; a++) {if (C[a](e, f, t, !0)) {x = !0;break;}}if (x) {e.lineMax = f, 0 !== e.blkIndent && (m.push(e.bMarks[f]), _.push(e.bsCount[f]), v.push(e.tShift[f]), k.push(e.sCount[f]), e.sCount[f] -= e.blkIndent);break;}if (l) break;m.push(e.bMarks[f]), _.push(e.bsCount[f]), v.push(e.tShift[f]), k.push(e.sCount[f]), e.sCount[f] = -1;} else {for (c = d = e.sCount[f] + D - (e.bMarks[f] + e.tShift[f]), 32 === e.src.charCodeAt(D) ? (D++, c++, d++, o = !1, y = !0) : 9 === e.src.charCodeAt(D) ? (y = !0, (e.bsCount[f] + d) % 4 == 3 ? (D++, c++, d++, o = !1) : o = !0) : y = !1, m.push(e.bMarks[f]), e.bMarks[f] = D; D < q && (i = e.src.charCodeAt(D), n(i));) {9 === i ? d += 4 - (d + e.bsCount[f] + (o ? 1 : 0)) % 4 : d++, D++;}p = D >= q, _.push(e.bsCount[f]), e.bsCount[f] = e.sCount[f] + 1 + (y ? 1 : 0), k.push(e.sCount[f]), e.sCount[f] = d - c, v.push(e.tShift[f]), e.tShift[f] = D - e.bMarks[f];}}for (g = e.blkIndent, e.blkIndent = 0, A = e.push("blockquote_open", "blockquote", 1), A.markup = ">", A.map = h = [r, 0], e.md.block.tokenize(e, r, f), A = e.push("blockquote_close", "blockquote", -1), A.markup = ">", e.lineMax = w, e.parentType = b, h[1] = e.line, a = 0; a < v.length; a++) {e.bMarks[a + r] = m[a], e.tShift[a + r] = v[a], e.sCount[a + r] = k[a], e.bsCount[a + r] = _[a];}return e.blkIndent = g, !0;};}, { "../common/utils": 4 }], 19: [function (e, r, t) {"use strict";r.exports = function (e, r, t) {var n, s, o;if (e.sCount[r] - e.blkIndent < 4) return !1;for (s = n = r + 1; n < t;) {if (e.isEmpty(n)) n++;else {if (!(e.sCount[n] - e.blkIndent >= 4)) break;n++, s = n;}}return e.line = s, o = e.push("code_block", "code", 0), o.content = e.getLines(r, s, 4 + e.blkIndent, !0), o.map = [r, e.line], !0;};}, {}], 20: [function (e, r, t) {"use strict";r.exports = function (e, r, t, n) {var s,o,i,a,c,l,u,p = !1,h = e.bMarks[r] + e.tShift[r],f = e.eMarks[r];if (e.sCount[r] - e.blkIndent >= 4) return !1;if (h + 3 > f) return !1;if (126 !== (s = e.src.charCodeAt(h)) && 96 !== s) return !1;if (c = h, h = e.skipChars(h, s), (o = h - c) < 3) return !1;if (u = e.src.slice(c, h), i = e.src.slice(h, f), i.indexOf(String.fromCharCode(s)) >= 0) return !1;if (n) return !0;for (a = r; !(++a >= t) && (h = c = e.bMarks[a] + e.tShift[a], f = e.eMarks[a], !(h < f && e.sCount[a] < e.blkIndent));) {if (e.src.charCodeAt(h) === s && !(e.sCount[a] - e.blkIndent >= 4 || (h = e.skipChars(h, s)) - c < o || (h = e.skipSpaces(h)) < f)) {p = !0;break;}}return o = e.sCount[r], e.line = a + (p ? 1 : 0), l = e.push("fence", "code", 0), l.info = i, l.content = e.getLines(r + 1, a, o, !0), l.markup = u, l.map = [r, e.line], !0;};}, {}], 21: [function (e, r, t) {"use strict";var n = e("../common/utils").isSpace;r.exports = function (e, r, t, s) {var o,i,a,c,l = e.bMarks[r] + e.tShift[r],u = e.eMarks[r];if (e.sCount[r] - e.blkIndent >= 4) return !1;if (35 !== (o = e.src.charCodeAt(l)) || l >= u) return !1;for (i = 1, o = e.src.charCodeAt(++l); 35 === o && l < u && i <= 6;) {i++, o = e.src.charCodeAt(++l);}return !(i > 6 || l < u && !n(o)) && (!!s || (u = e.skipSpacesBack(u, l), a = e.skipCharsBack(u, 35, l), a > l && n(e.src.charCodeAt(a - 1)) && (u = a), e.line = r + 1, c = e.push("heading_open", "h" + String(i), 1), c.markup = "########".slice(0, i), c.map = [r, e.line], c = e.push("inline", "", 0), c.content = e.src.slice(l, u).trim(), c.map = [r, e.line], c.children = [], c = e.push("heading_close", "h" + String(i), -1), c.markup = "########".slice(0, i), !0));};}, { "../common/utils": 4 }], 22: [function (e, r, t) {"use strict";var n = e("../common/utils").isSpace;r.exports = function (e, r, t, s) {var o,i,a,c,l = e.bMarks[r] + e.tShift[r],u = e.eMarks[r];if (e.sCount[r] - e.blkIndent >= 4) return !1;if (42 !== (o = e.src.charCodeAt(l++)) && 45 !== o && 95 !== o) return !1;for (i = 1; l < u;) {if ((a = e.src.charCodeAt(l++)) !== o && !n(a)) return !1;a === o && i++;}return !(i < 3) && (!!s || (e.line = r + 1, c = e.push("hr", "hr", 0), c.map = [r, e.line], c.markup = Array(i + 1).join(String.fromCharCode(o)), !0));};}, { "../common/utils": 4 }], 23: [function (e, r, t) {"use strict";var n = e("../common/html_blocks"),s = e("../common/html_re").HTML_OPEN_CLOSE_TAG_RE,o = [[/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, !0], [/^<!--/, /-->/, !0], [/^<\?/, /\?>/, !0], [/^<![A-Z]/, />/, !0], [/^<!\[CDATA\[/, /\]\]>/, !0], [new RegExp("^</?(" + n.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0], [new RegExp(s.source + "\\s*$"), /^$/, !1]];r.exports = function (e, r, t, n) {var s,i,a,c,l = e.bMarks[r] + e.tShift[r],u = e.eMarks[r];if (e.sCount[r] - e.blkIndent >= 4) return !1;if (!e.md.options.html) return !1;if (60 !== e.src.charCodeAt(l)) return !1;for (c = e.src.slice(l, u), s = 0; s < o.length && !o[s][0].test(c); s++) {;}if (s === o.length) return !1;if (n) return o[s][2];if (i = r + 1, !o[s][1].test(c)) for (; i < t && !(e.sCount[i] < e.blkIndent); i++) {if (l = e.bMarks[i] + e.tShift[i], u = e.eMarks[i], c = e.src.slice(l, u), o[s][1].test(c)) {0 !== c.length && i++;break;}}return e.line = i, a = e.push("html_block", "", 0), a.map = [r, i], a.content = e.getLines(r, i, e.blkIndent, !0), !0;};}, { "../common/html_blocks": 2, "../common/html_re": 3 }], 24: [function (e, r, t) {"use strict";r.exports = function (e, r, t) {var n,s,o,i,a,c,l,u,p,h,f = r + 1,d = e.md.block.ruler.getRules("paragraph");if (e.sCount[r] - e.blkIndent >= 4) return !1;for (h = e.parentType, e.parentType = "paragraph"; f < t && !e.isEmpty(f); f++) {if (!(e.sCount[f] - e.blkIndent > 3)) {if (e.sCount[f] >= e.blkIndent && (c = e.bMarks[f] + e.tShift[f], l = e.eMarks[f], c < l && (45 === (p = e.src.charCodeAt(c)) || 61 === p) && (c = e.skipChars(c, p), (c = e.skipSpaces(c)) >= l))) {u = 61 === p ? 1 : 2;break;}if (!(e.sCount[f] < 0)) {for (s = !1, o = 0, i = d.length; o < i; o++) {if (d[o](e, f, t, !0)) {s = !0;break;}}if (s) break;}}}return !!u && (n = e.getLines(r, f, e.blkIndent, !1).trim(), e.line = f + 1, a = e.push("heading_open", "h" + String(u), 1), a.markup = String.fromCharCode(p), a.map = [r, e.line], a = e.push("inline", "", 0), a.content = n, a.map = [r, e.line - 1], a.children = [], a = e.push("heading_close", "h" + String(u), -1), a.markup = String.fromCharCode(p), e.parentType = h, !0);};}, {}], 25: [function (e, r, t) {"use strict";function n(e, r) {var t, n, s, o;return n = e.bMarks[r] + e.tShift[r], s = e.eMarks[r], t = e.src.charCodeAt(n++), 42 !== t && 45 !== t && 43 !== t ? -1 : n < s && (o = e.src.charCodeAt(n), !i(o)) ? -1 : n;}function s(e, r) {var t,n = e.bMarks[r] + e.tShift[r],s = n,o = e.eMarks[r];if (s + 1 >= o) return -1;if ((t = e.src.charCodeAt(s++)) < 48 || t > 57) return -1;for (;;) {if (s >= o) return -1;t = e.src.charCodeAt(s++);{if (!(t >= 48 && t <= 57)) {if (41 === t || 46 === t) break;return -1;}if (s - n >= 10) return -1;}}return s < o && (t = e.src.charCodeAt(s), !i(t)) ? -1 : s;}function o(e, r) {var t,n,s = e.level + 2;for (t = r + 2, n = e.tokens.length - 2; t < n; t++) {e.tokens[t].level === s && "paragraph_open" === e.tokens[t].type && (e.tokens[t + 2].hidden = !0, e.tokens[t].hidden = !0, t += 2);}}var i = e("../common/utils").isSpace;r.exports = function (e, r, t, a) {var c,l,u,p,h,f,d,m,_,g,b,k,v,y,x,C,A,w,D,q,E,S,F,L,z,T,I,R,M = !1,B = !0;if (e.sCount[r] - e.blkIndent >= 4) return !1;if (a && "paragraph" === e.parentType && e.tShift[r] >= e.blkIndent && (M = !0), (F = s(e, r)) >= 0) {if (d = !0, z = e.bMarks[r] + e.tShift[r], v = Number(e.src.substr(z, F - z - 1)), M && 1 !== v) return !1;} else {if (!((F = n(e, r)) >= 0)) return !1;d = !1;}if (M && e.skipSpaces(F) >= e.eMarks[r]) return !1;if (k = e.src.charCodeAt(F - 1), a) return !0;for (b = e.tokens.length, d ? (R = e.push("ordered_list_open", "ol", 1), 1 !== v && (R.attrs = [["start", v]])) : R = e.push("bullet_list_open", "ul", 1), R.map = g = [r, 0], R.markup = String.fromCharCode(k), x = r, L = !1, I = e.md.block.ruler.getRules("list"), D = e.parentType, e.parentType = "list"; x < t;) {for (S = F, y = e.eMarks[x], f = C = e.sCount[x] + F - (e.bMarks[r] + e.tShift[r]); S < y && (c = e.src.charCodeAt(S), i(c));) {9 === c ? C += 4 - (C + e.bsCount[x]) % 4 : C++, S++;}if (l = S, h = l >= y ? 1 : C - f, h > 4 && (h = 1), p = f + h, R = e.push("list_item_open", "li", 1), R.markup = String.fromCharCode(k), R.map = m = [r, 0], A = e.blkIndent, E = e.tight, q = e.tShift[r], w = e.sCount[r], e.blkIndent = p, e.tight = !0, e.tShift[r] = l - e.bMarks[r], e.sCount[r] = C, l >= y && e.isEmpty(r + 1) ? e.line = Math.min(e.line + 2, t) : e.md.block.tokenize(e, r, t, !0), e.tight && !L || (B = !1), L = e.line - r > 1 && e.isEmpty(e.line - 1), e.blkIndent = A, e.tShift[r] = q, e.sCount[r] = w, e.tight = E, R = e.push("list_item_close", "li", -1), R.markup = String.fromCharCode(k), x = r = e.line, m[1] = x, l = e.bMarks[r], x >= t) break;if (e.sCount[x] < e.blkIndent) break;for (T = !1, u = 0, _ = I.length; u < _; u++) {if (I[u](e, x, t, !0)) {T = !0;break;}}if (T) break;if (d) {if ((F = s(e, x)) < 0) break;} else if ((F = n(e, x)) < 0) break;if (k !== e.src.charCodeAt(F - 1)) break;}return R = d ? e.push("ordered_list_close", "ol", -1) : e.push("bullet_list_close", "ul", -1), R.markup = String.fromCharCode(k), g[1] = x, e.line = x, e.parentType = D, B && o(e, b), !0;};}, { "../common/utils": 4 }], 26: [function (e, r, t) {"use strict";r.exports = function (e, r) {var t,n,s,o,i,a,c = r + 1,l = e.md.block.ruler.getRules("paragraph"),u = e.lineMax;for (a = e.parentType, e.parentType = "paragraph"; c < u && !e.isEmpty(c); c++) {if (!(e.sCount[c] - e.blkIndent > 3 || e.sCount[c] < 0)) {for (n = !1, s = 0, o = l.length; s < o; s++) {if (l[s](e, c, u, !0)) {n = !0;break;}}if (n) break;}}return t = e.getLines(r, c, e.blkIndent, !1).trim(), e.line = c, i = e.push("paragraph_open", "p", 1), i.map = [r, e.line], i = e.push("inline", "", 0), i.content = t, i.map = [r, e.line], i.children = [], i = e.push("paragraph_close", "p", -1), e.parentType = a, !0;};}, {}], 27: [function (e, r, t) {"use strict";var n = e("../common/utils").normalizeReference,s = e("../common/utils").isSpace;r.exports = function (e, r, t, o) {var i,a,c,l,u,p,h,f,d,m,_,g,b,k,v,y,x = 0,C = e.bMarks[r] + e.tShift[r],A = e.eMarks[r],w = r + 1;if (e.sCount[r] - e.blkIndent >= 4) return !1;if (91 !== e.src.charCodeAt(C)) return !1;for (; ++C < A;) {if (93 === e.src.charCodeAt(C) && 92 !== e.src.charCodeAt(C - 1)) {if (C + 1 === A) return !1;if (58 !== e.src.charCodeAt(C + 1)) return !1;break;}}for (l = e.lineMax, v = e.md.block.ruler.getRules("reference"), m = e.parentType, e.parentType = "reference"; w < l && !e.isEmpty(w); w++) {if (!(e.sCount[w] - e.blkIndent > 3 || e.sCount[w] < 0)) {for (k = !1, p = 0, h = v.length; p < h; p++) {if (v[p](e, w, l, !0)) {k = !0;break;}}if (k) break;}}for (b = e.getLines(r, w, e.blkIndent, !1).trim(), A = b.length, C = 1; C < A; C++) {if (91 === (i = b.charCodeAt(C))) return !1;if (93 === i) {d = C;break;}10 === i ? x++ : 92 === i && ++C < A && 10 === b.charCodeAt(C) && x++;}if (d < 0 || 58 !== b.charCodeAt(d + 1)) return !1;for (C = d + 2; C < A; C++) {if (10 === (i = b.charCodeAt(C))) x++;else if (!s(i)) break;}if (_ = e.md.helpers.parseLinkDestination(b, C, A), !_.ok) return !1;if (u = e.md.normalizeLink(_.str), !e.md.validateLink(u)) return !1;for (C = _.pos, x += _.lines, a = C, c = x, g = C; C < A; C++) {if (10 === (i = b.charCodeAt(C))) x++;else if (!s(i)) break;}for (_ = e.md.helpers.parseLinkTitle(b, C, A), C < A && g !== C && _.ok ? (y = _.str, C = _.pos, x += _.lines) : (y = "", C = a, x = c); C < A && (i = b.charCodeAt(C), s(i));) {C++;}if (C < A && 10 !== b.charCodeAt(C) && y) for (y = "", C = a, x = c; C < A && (i = b.charCodeAt(C), s(i));) {C++;}return !(C < A && 10 !== b.charCodeAt(C)) && !!(f = n(b.slice(1, d))) && (!!o || (void 0 === e.env.references && (e.env.references = {}), void 0 === e.env.references[f] && (e.env.references[f] = { title: y, href: u }), e.parentType = m, e.line = r + x + 1, !0));};}, { "../common/utils": 4 }], 28: [function (e, r, t) {"use strict";function n(e, r, t, n) {var s, i, a, c, l, u, p, h;for (this.src = e, this.md = r, this.env = t, this.tokens = n, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.parentType = "root", this.level = 0, this.result = "", i = this.src, h = !1, a = c = u = p = 0, l = i.length; c < l; c++) {if (s = i.charCodeAt(c), !h) {if (o(s)) {u++, 9 === s ? p += 4 - p % 4 : p++;continue;}h = !0;}10 !== s && c !== l - 1 || (10 !== s && c++, this.bMarks.push(a), this.eMarks.push(c), this.tShift.push(u), this.sCount.push(p), this.bsCount.push(0), h = !1, u = 0, p = 0, a = c + 1);}this.bMarks.push(i.length), this.eMarks.push(i.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;}var s = e("../token"),o = e("../common/utils").isSpace;n.prototype.push = function (e, r, t) {var n = new s(e, r, t);return n.block = !0, t < 0 && this.level--, n.level = this.level, t > 0 && this.level++, this.tokens.push(n), n;}, n.prototype.isEmpty = function (e) {return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];}, n.prototype.skipEmptyLines = function (e) {for (var r = this.lineMax; e < r && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++) {;}return e;}, n.prototype.skipSpaces = function (e) {for (var r, t = this.src.length; e < t && (r = this.src.charCodeAt(e), o(r)); e++) {;}return e;}, n.prototype.skipSpacesBack = function (e, r) {if (e <= r) return e;for (; e > r;) {if (!o(this.src.charCodeAt(--e))) return e + 1;}return e;}, n.prototype.skipChars = function (e, r) {for (var t = this.src.length; e < t && this.src.charCodeAt(e) === r; e++) {;}return e;}, n.prototype.skipCharsBack = function (e, r, t) {if (e <= t) return e;for (; e > t;) {if (r !== this.src.charCodeAt(--e)) return e + 1;}return e;}, n.prototype.getLines = function (e, r, t, n) {var s,i,a,c,l,u,p,h = e;if (e >= r) return "";for (u = new Array(r - e), s = 0; h < r; h++, s++) {for (i = 0, p = c = this.bMarks[h],
          l = h + 1 < r || n ? this.eMarks[h] + 1 : this.eMarks[h]; c < l && i < t;) {if (a = this.src.charCodeAt(c), o(a)) 9 === a ? i += 4 - (i + this.bsCount[h]) % 4 : i++;else {if (!(c - p < this.tShift[h])) break;i++;}c++;}u[s] = i > t ? new Array(i - t + 1).join(" ") + this.src.slice(c, l) : this.src.slice(c, l);}return u.join("");}, n.prototype.Token = s, r.exports = n;}, { "../common/utils": 4, "../token": 51 }], 29: [function (e, r, t) {"use strict";function n(e, r) {var t = e.bMarks[r] + e.blkIndent,n = e.eMarks[r];return e.src.substr(t, n - t);}function s(e) {var r,t = [],n = 0,s = e.length,o = 0,i = 0,a = !1,c = 0;for (r = e.charCodeAt(n); n < s;) {96 === r ? a ? (a = !1, c = n) : o % 2 == 0 && (a = !0, c = n) : 124 !== r || o % 2 != 0 || a || (t.push(e.substring(i, n)), i = n + 1), 92 === r ? o++ : o = 0, n++, n === s && a && (a = !1, n = c + 1), r = e.charCodeAt(n);}return t.push(e.substring(i)), t;}var o = e("../common/utils").isSpace;r.exports = function (e, r, t, i) {var a, c, l, u, p, h, f, d, m, _, g, b;if (r + 2 > t) return !1;if (p = r + 1, e.sCount[p] < e.blkIndent) return !1;if (e.sCount[p] - e.blkIndent >= 4) return !1;if ((l = e.bMarks[p] + e.tShift[p]) >= e.eMarks[p]) return !1;if (124 !== (a = e.src.charCodeAt(l++)) && 45 !== a && 58 !== a) return !1;for (; l < e.eMarks[p];) {if (124 !== (a = e.src.charCodeAt(l)) && 45 !== a && 58 !== a && !o(a)) return !1;l++;}for (c = n(e, r + 1), h = c.split("|"), m = [], u = 0; u < h.length; u++) {if (!(_ = h[u].trim())) {if (0 === u || u === h.length - 1) continue;return !1;}if (!/^:?-+:?$/.test(_)) return !1;58 === _.charCodeAt(_.length - 1) ? m.push(58 === _.charCodeAt(0) ? "center" : "right") : 58 === _.charCodeAt(0) ? m.push("left") : m.push("");}if (c = n(e, r).trim(), c.indexOf("|") === -1) return !1;if (e.sCount[r] - e.blkIndent >= 4) return !1;if (h = s(c.replace(/^\||\|$/g, "")), (f = h.length) > m.length) return !1;if (i) return !0;for (d = e.push("table_open", "table", 1), d.map = g = [r, 0], d = e.push("thead_open", "thead", 1), d.map = [r, r + 1], d = e.push("tr_open", "tr", 1), d.map = [r, r + 1], u = 0; u < h.length; u++) {d = e.push("th_open", "th", 1), d.map = [r, r + 1], m[u] && (d.attrs = [["style", "text-align:" + m[u]]]), d = e.push("inline", "", 0), d.content = h[u].trim(), d.map = [r, r + 1], d.children = [], d = e.push("th_close", "th", -1);}for (d = e.push("tr_close", "tr", -1), d = e.push("thead_close", "thead", -1), d = e.push("tbody_open", "tbody", 1), d.map = b = [r + 2, 0], p = r + 2; p < t && !(e.sCount[p] < e.blkIndent) && (c = n(e, p).trim(), c.indexOf("|") !== -1) && !(e.sCount[p] - e.blkIndent >= 4); p++) {for (h = s(c.replace(/^\||\|$/g, "")), d = e.push("tr_open", "tr", 1), u = 0; u < f; u++) {d = e.push("td_open", "td", 1), m[u] && (d.attrs = [["style", "text-align:" + m[u]]]), d = e.push("inline", "", 0), d.content = h[u] ? h[u].trim() : "", d.children = [], d = e.push("td_close", "td", -1);}d = e.push("tr_close", "tr", -1);}return d = e.push("tbody_close", "tbody", -1), d = e.push("table_close", "table", -1), g[1] = b[1] = p, e.line = p, !0;};}, { "../common/utils": 4 }], 30: [function (e, r, t) {"use strict";r.exports = function (e) {var r;e.inlineMode ? (r = new e.Token("inline", "", 0), r.content = e.src, r.map = [0, 1], r.children = [], e.tokens.push(r)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);};}, {}], 31: [function (e, r, t) {"use strict";r.exports = function (e) {var r,t,n,s = e.tokens;for (t = 0, n = s.length; t < n; t++) {r = s[t], "inline" === r.type && e.md.inline.parse(r.content, e.md, e.env, r.children);}};}, {}], 32: [function (e, r, t) {"use strict";function n(e) {return /^<a[>\s]/i.test(e);}function s(e) {return /^<\/a\s*>/i.test(e);}var o = e("../common/utils").arrayReplaceAt;r.exports = function (e) {var r,t,i,a,c,l,u,p,h,f,d,m,_,g,b,k,v,y = e.tokens;if (e.md.options.linkify) for (t = 0, i = y.length; t < i; t++) {if ("inline" === y[t].type && e.md.linkify.pretest(y[t].content)) for (a = y[t].children, _ = 0, r = a.length - 1; r >= 0; r--) {if (l = a[r], "link_close" !== l.type) {if ("html_inline" === l.type && (n(l.content) && _ > 0 && _--, s(l.content) && _++), !(_ > 0) && "text" === l.type && e.md.linkify.test(l.content)) {for (h = l.content, v = e.md.linkify.match(h), u = [], m = l.level, d = 0, p = 0; p < v.length; p++) {g = v[p].url, b = e.md.normalizeLink(g), e.md.validateLink(b) && (k = v[p].text, k = v[p].schema ? "mailto:" !== v[p].schema || /^mailto:/i.test(k) ? e.md.normalizeLinkText(k) : e.md.normalizeLinkText("mailto:" + k).replace(/^mailto:/, "") : e.md.normalizeLinkText("http://" + k).replace(/^http:\/\//, ""), f = v[p].index, f > d && (c = new e.Token("text", "", 0), c.content = h.slice(d, f), c.level = m, u.push(c)), c = new e.Token("link_open", "a", 1), c.attrs = [["href", b]], c.level = m++, c.markup = "linkify", c.info = "auto", u.push(c), c = new e.Token("text", "", 0), c.content = k, c.level = m, u.push(c), c = new e.Token("link_close", "a", -1), c.level = --m, c.markup = "linkify", c.info = "auto", u.push(c), d = v[p].lastIndex);}d < h.length && (c = new e.Token("text", "", 0), c.content = h.slice(d), c.level = m, u.push(c)), y[t].children = a = o(a, r, u);}} else for (r--; a[r].level !== l.level && "link_open" !== a[r].type;) {r--;}}}};}, { "../common/utils": 4 }], 33: [function (e, r, t) {"use strict";r.exports = function (e) {var r;r = e.src.replace(/\r[\n\u0085]?|[\u2424\u2028\u0085]/g, "\n"), r = r.replace(/\u0000/g, "\uFFFD"), e.src = r;};}, {}], 34: [function (e, r, t) {"use strict";function n(e, r) {return c[r.toLowerCase()];}function s(e) {var r,t,s = 0;for (r = e.length - 1; r >= 0; r--) {t = e[r], "text" !== t.type || s || (t.content = t.content.replace(/\((c|tm|r|p)\)/gi, n)), "link_open" === t.type && "auto" === t.info && s--, "link_close" === t.type && "auto" === t.info && s++;}}function o(e) {var r,t,n = 0;for (r = e.length - 1; r >= 0; r--) {t = e[r], "text" !== t.type || n || i.test(t.content) && (t.content = t.content.replace(/\+-/g, "\xb1").replace(/\.{2,}/g, "\u2026").replace(/([?!])\u2026/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/gm, "$1\u2014$2").replace(/(^|\s)--(\s|$)/gm, "$1\u2013$2").replace(/(^|[^-\s])--([^-\s]|$)/gm, "$1\u2013$2")), "link_open" === t.type && "auto" === t.info && n--, "link_close" === t.type && "auto" === t.info && n++;}}var i = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,a = /\((c|tm|r|p)\)/i,c = { c: "\xa9", r: "\xae", p: "\xa7", tm: "\u2122" };r.exports = function (e) {var r;if (e.md.options.typographer) for (r = e.tokens.length - 1; r >= 0; r--) {"inline" === e.tokens[r].type && (a.test(e.tokens[r].content) && s(e.tokens[r].children), i.test(e.tokens[r].content) && o(e.tokens[r].children));}};}, {}], 35: [function (e, r, t) {"use strict";function n(e, r, t) {return e.substr(0, r) + t + e.substr(r + 1);}function s(e, r) {var t, s, c, u, p, h, f, d, m, _, g, b, k, v, y, x, C, A, w, D, q;for (w = [], t = 0; t < e.length; t++) {for (s = e[t], f = e[t].level, C = w.length - 1; C >= 0 && !(w[C].level <= f); C--) {;}if (w.length = C + 1, "text" === s.type) {c = s.content, p = 0, h = c.length;e: for (; p < h && (l.lastIndex = p, u = l.exec(c));) {if (y = x = !0, p = u.index + 1, A = "'" === u[0], m = 32, u.index - 1 >= 0) m = c.charCodeAt(u.index - 1);else for (C = t - 1; C >= 0; C--) {if ("text" === e[C].type) {m = e[C].content.charCodeAt(e[C].content.length - 1);break;}}if (_ = 32, p < h) _ = c.charCodeAt(p);else for (C = t + 1; C < e.length; C++) {if ("text" === e[C].type) {_ = e[C].content.charCodeAt(0);break;}}if (g = a(m) || i(String.fromCharCode(m)), b = a(_) || i(String.fromCharCode(_)), k = o(m), v = o(_), v ? y = !1 : b && (k || g || (y = !1)), k ? x = !1 : g && (v || b || (x = !1)), 34 === _ && '"' === u[0] && m >= 48 && m <= 57 && (x = y = !1), y && x && (y = !1, x = b), y || x) {if (x) for (C = w.length - 1; C >= 0 && (d = w[C], !(w[C].level < f)); C--) {if (d.single === A && w[C].level === f) {d = w[C], A ? (D = r.md.options.quotes[2], q = r.md.options.quotes[3]) : (D = r.md.options.quotes[0], q = r.md.options.quotes[1]), s.content = n(s.content, u.index, q), e[d.token].content = n(e[d.token].content, d.pos, D), p += q.length - 1, d.token === t && (p += D.length - 1), c = s.content, h = c.length, w.length = C;continue e;}}y ? w.push({ token: t, pos: u.index, single: A, level: f }) : x && A && (s.content = n(s.content, u.index, "\u2019"));} else A && (s.content = n(s.content, u.index, "\u2019"));}}}}var o = e("../common/utils").isWhiteSpace,i = e("../common/utils").isPunctChar,a = e("../common/utils").isMdAsciiPunct,c = /['"]/,l = /['"]/g;r.exports = function (e) {var r;if (e.md.options.typographer) for (r = e.tokens.length - 1; r >= 0; r--) {"inline" === e.tokens[r].type && c.test(e.tokens[r].content) && s(e.tokens[r].children, e);}};}, { "../common/utils": 4 }], 36: [function (e, r, t) {"use strict";function n(e, r, t) {this.src = e, this.env = t, this.tokens = [], this.inlineMode = !1, this.md = r;}var s = e("../token");n.prototype.Token = s, r.exports = n;}, { "../token": 51 }], 37: [function (e, r, t) {"use strict";var n = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,s = /^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;r.exports = function (e, r) {var t,o,i,a,c,l,u = e.pos;return 60 === e.src.charCodeAt(u) && (t = e.src.slice(u), !(t.indexOf(">") < 0) && (s.test(t) ? (o = t.match(s), a = o[0].slice(1, -1), c = e.md.normalizeLink(a), !!e.md.validateLink(c) && (r || (l = e.push("link_open", "a", 1), l.attrs = [["href", c]], l.markup = "autolink", l.info = "auto", l = e.push("text", "", 0), l.content = e.md.normalizeLinkText(a), l = e.push("link_close", "a", -1), l.markup = "autolink", l.info = "auto"), e.pos += o[0].length, !0)) : !!n.test(t) && (i = t.match(n), a = i[0].slice(1, -1), c = e.md.normalizeLink("mailto:" + a), !!e.md.validateLink(c) && (r || (l = e.push("link_open", "a", 1), l.attrs = [["href", c]], l.markup = "autolink", l.info = "auto", l = e.push("text", "", 0), l.content = e.md.normalizeLinkText(a), l = e.push("link_close", "a", -1), l.markup = "autolink", l.info = "auto"), e.pos += i[0].length, !0))));};}, {}], 38: [function (e, r, t) {"use strict";r.exports = function (e, r) {var t,n,s,o,i,a,c = e.pos;if (96 !== e.src.charCodeAt(c)) return !1;for (t = c, c++, n = e.posMax; c < n && 96 === e.src.charCodeAt(c);) {c++;}for (s = e.src.slice(t, c), o = i = c; (o = e.src.indexOf("`", i)) !== -1;) {for (i = o + 1; i < n && 96 === e.src.charCodeAt(i);) {i++;}if (i - o === s.length) return r || (a = e.push("code_inline", "code", 0), a.markup = s, a.content = e.src.slice(c, o).replace(/[ \n]+/g, " ").trim()), e.pos = i, !0;}return r || (e.pending += s), e.pos += s.length, !0;};}, {}], 39: [function (e, r, t) {"use strict";r.exports = function (e) {var r,t,n,s,o = e.delimiters,i = e.delimiters.length;for (r = 0; r < i; r++) {if (n = o[r], n.close) for (t = r - n.jump - 1; t >= 0;) {if (s = o[t], s.open && s.marker === n.marker && s.end < 0 && s.level === n.level) {var a = (s.close || n.open) && void 0 !== s.length && void 0 !== n.length && (s.length + n.length) % 3 == 0;if (!a) {n.jump = r - t, n.open = !1, s.end = r, s.jump = 0;break;}}t -= s.jump + 1;}}};}, {}], 40: [function (e, r, t) {"use strict";r.exports.tokenize = function (e, r) {var t,n,s,o = e.pos,i = e.src.charCodeAt(o);if (r) return !1;if (95 !== i && 42 !== i) return !1;for (n = e.scanDelims(e.pos, 42 === i), t = 0; t < n.length; t++) {s = e.push("text", "", 0), s.content = String.fromCharCode(i), e.delimiters.push({ marker: i, length: n.length, jump: t, token: e.tokens.length - 1, level: e.level, end: -1, open: n.can_open, close: n.can_close });}return e.pos += n.length, !0;}, r.exports.postProcess = function (e) {var r,t,n,s,o,i,a = e.delimiters,c = e.delimiters.length;for (r = 0; r < c; r++) {t = a[r], 95 !== t.marker && 42 !== t.marker || t.end !== -1 && (n = a[t.end], i = r + 1 < c && a[r + 1].end === t.end - 1 && a[r + 1].token === t.token + 1 && a[t.end - 1].token === n.token - 1 && a[r + 1].marker === t.marker, o = String.fromCharCode(t.marker), s = e.tokens[t.token], s.type = i ? "strong_open" : "em_open", s.tag = i ? "strong" : "em", s.nesting = 1, s.markup = i ? o + o : o, s.content = "", s = e.tokens[n.token], s.type = i ? "strong_close" : "em_close", s.tag = i ? "strong" : "em", s.nesting = -1, s.markup = i ? o + o : o, s.content = "", i && (e.tokens[a[r + 1].token].content = "", e.tokens[a[t.end - 1].token].content = "", r++));}};}, {}], 41: [function (e, r, t) {"use strict";var n = e("../common/entities"),s = e("../common/utils").has,o = e("../common/utils").isValidEntityCode,i = e("../common/utils").fromCodePoint;r.exports = function (e, r) {var t,a,c = e.pos,l = e.posMax;if (38 !== e.src.charCodeAt(c)) return !1;if (c + 1 < l) if (35 === e.src.charCodeAt(c + 1)) {if (a = e.src.slice(c).match(/^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i)) return r || (t = "x" === a[1][0].toLowerCase() ? parseInt(a[1].slice(1), 16) : parseInt(a[1], 10), e.pending += i(o(t) ? t : 65533)), e.pos += a[0].length, !0;} else if ((a = e.src.slice(c).match(/^&([a-z][a-z0-9]{1,31});/i)) && s(n, a[1])) return r || (e.pending += n[a[1]]), e.pos += a[0].length, !0;return r || (e.pending += "&"), e.pos++, !0;};}, { "../common/entities": 1, "../common/utils": 4 }], 42: [function (e, r, t) {"use strict";for (var n = e("../common/utils").isSpace, s = [], o = 0; o < 256; o++) {s.push(0);}"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function (e) {s[e.charCodeAt(0)] = 1;}), r.exports = function (e, r) {var t,o = e.pos,i = e.posMax;if (92 !== e.src.charCodeAt(o)) return !1;if (++o < i) {if ((t = e.src.charCodeAt(o)) < 256 && 0 !== s[t]) return r || (e.pending += e.src[o]), e.pos += 2, !0;if (10 === t) {for (r || e.push("hardbreak", "br", 0), o++; o < i && (t = e.src.charCodeAt(o), n(t));) {o++;}return e.pos = o, !0;}}return r || (e.pending += "\\"), e.pos++, !0;};}, { "../common/utils": 4 }], 43: [function (e, r, t) {"use strict";function n(e) {var r = 32 | e;return r >= 97 && r <= 122;}var s = e("../common/html_re").HTML_TAG_RE;r.exports = function (e, r) {var t,o,i,a,c = e.pos;return !!e.md.options.html && (i = e.posMax, !(60 !== e.src.charCodeAt(c) || c + 2 >= i) && !(33 !== (t = e.src.charCodeAt(c + 1)) && 63 !== t && 47 !== t && !n(t)) && !!(o = e.src.slice(c).match(s)) && (r || (a = e.push("html_inline", "", 0), a.content = e.src.slice(c, c + o[0].length)), e.pos += o[0].length, !0));};}, { "../common/html_re": 3 }], 44: [function (e, r, t) {"use strict";var n = e("../common/utils").normalizeReference,s = e("../common/utils").isSpace;r.exports = function (e, r) {var t,o,i,a,c,l,u,p,h,f,d,m,_,g = "",b = e.pos,k = e.posMax;if (33 !== e.src.charCodeAt(e.pos)) return !1;if (91 !== e.src.charCodeAt(e.pos + 1)) return !1;if (l = e.pos + 2, (c = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1)) < 0) return !1;if ((u = c + 1) < k && 40 === e.src.charCodeAt(u)) {for (u++; u < k && (o = e.src.charCodeAt(u), s(o) || 10 === o); u++) {;}if (u >= k) return !1;for (_ = u, h = e.md.helpers.parseLinkDestination(e.src, u, e.posMax), h.ok && (g = e.md.normalizeLink(h.str), e.md.validateLink(g) ? u = h.pos : g = ""), _ = u; u < k && (o = e.src.charCodeAt(u), s(o) || 10 === o); u++) {;}if (h = e.md.helpers.parseLinkTitle(e.src, u, e.posMax), u < k && _ !== u && h.ok) for (f = h.str, u = h.pos; u < k && (o = e.src.charCodeAt(u), s(o) || 10 === o); u++) {;} else f = "";if (u >= k || 41 !== e.src.charCodeAt(u)) return e.pos = b, !1;u++;} else {if (void 0 === e.env.references) return !1;if (u < k && 91 === e.src.charCodeAt(u) ? (_ = u + 1, u = e.md.helpers.parseLinkLabel(e, u), u >= 0 ? a = e.src.slice(_, u++) : u = c + 1) : u = c + 1, a || (a = e.src.slice(l, c)), !(p = e.env.references[n(a)])) return e.pos = b, !1;g = p.href, f = p.title;}return r || (i = e.src.slice(l, c), e.md.inline.parse(i, e.md, e.env, m = []), d = e.push("image", "img", 0), d.attrs = t = [["src", g], ["alt", ""]], d.children = m, d.content = i, f && t.push(["title", f])), e.pos = u, e.posMax = k, !0;};}, { "../common/utils": 4 }], 45: [function (e, r, t) {"use strict";var n = e("../common/utils").normalizeReference,s = e("../common/utils").isSpace;r.exports = function (e, r) {var t,o,i,a,c,l,u,p,h,f,d = "",m = e.pos,_ = e.posMax,g = e.pos,b = !0;if (91 !== e.src.charCodeAt(e.pos)) return !1;if (c = e.pos + 1, (a = e.md.helpers.parseLinkLabel(e, e.pos, !0)) < 0) return !1;if ((l = a + 1) < _ && 40 === e.src.charCodeAt(l)) {for (b = !1, l++; l < _ && (o = e.src.charCodeAt(l), s(o) || 10 === o); l++) {;}if (l >= _) return !1;for (g = l, u = e.md.helpers.parseLinkDestination(e.src, l, e.posMax), u.ok && (d = e.md.normalizeLink(u.str), e.md.validateLink(d) ? l = u.pos : d = ""), g = l; l < _ && (o = e.src.charCodeAt(l), s(o) || 10 === o); l++) {;}if (u = e.md.helpers.parseLinkTitle(e.src, l, e.posMax), l < _ && g !== l && u.ok) for (h = u.str, l = u.pos; l < _ && (o = e.src.charCodeAt(l), s(o) || 10 === o); l++) {;} else h = "";(l >= _ || 41 !== e.src.charCodeAt(l)) && (b = !0), l++;}if (b) {if (void 0 === e.env.references) return !1;if (l < _ && 91 === e.src.charCodeAt(l) ? (g = l + 1, l = e.md.helpers.parseLinkLabel(e, l), l >= 0 ? i = e.src.slice(g, l++) : l = a + 1) : l = a + 1, i || (i = e.src.slice(c, a)), !(p = e.env.references[n(i)])) return e.pos = m, !1;d = p.href, h = p.title;}return r || (e.pos = c, e.posMax = a, f = e.push("link_open", "a", 1), f.attrs = t = [["href", d]], h && t.push(["title", h]), e.md.inline.tokenize(e), f = e.push("link_close", "a", -1)), e.pos = l, e.posMax = _, !0;};}, { "../common/utils": 4 }], 46: [function (e, r, t) {"use strict";var n = e("../common/utils").isSpace;r.exports = function (e, r) {var t,s,o = e.pos;if (10 !== e.src.charCodeAt(o)) return !1;for (t = e.pending.length - 1, s = e.posMax, r || (t >= 0 && 32 === e.pending.charCodeAt(t) ? t >= 1 && 32 === e.pending.charCodeAt(t - 1) ? (e.pending = e.pending.replace(/ +$/, ""), e.push("hardbreak", "br", 0)) : (e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0)) : e.push("softbreak", "br", 0)), o++; o < s && n(e.src.charCodeAt(o));) {o++;}return e.pos = o, !0;};}, { "../common/utils": 4 }], 47: [function (e, r, t) {"use strict";function n(e, r, t, n) {this.src = e, this.env = t, this.md = r, this.tokens = n, this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [];}var s = e("../token"),o = e("../common/utils").isWhiteSpace,i = e("../common/utils").isPunctChar,a = e("../common/utils").isMdAsciiPunct;n.prototype.pushPending = function () {var e = new s("text", "", 0);return e.content = this.pending, e.level = this.pendingLevel, this.tokens.push(e), this.pending = "", e;}, n.prototype.push = function (e, r, t) {this.pending && this.pushPending();var n = new s(e, r, t);return t < 0 && this.level--, n.level = this.level, t > 0 && this.level++, this.pendingLevel = this.level, this.tokens.push(n), n;}, n.prototype.scanDelims = function (e, r) {var t,n,s,c,l,u,p,h,f,d = e,m = !0,_ = !0,g = this.posMax,b = this.src.charCodeAt(e);for (t = e > 0 ? this.src.charCodeAt(e - 1) : 32; d < g && this.src.charCodeAt(d) === b;) {d++;}return s = d - e, n = d < g ? this.src.charCodeAt(d) : 32, p = a(t) || i(String.fromCharCode(t)), f = a(n) || i(String.fromCharCode(n)), u = o(t), h = o(n), h ? m = !1 : f && (u || p || (m = !1)), u ? _ = !1 : p && (h || f || (_ = !1)), r ? (c = m, l = _) : (c = m && (!_ || p), l = _ && (!m || f)), { can_open: c, can_close: l, length: s };}, n.prototype.Token = s, r.exports = n;}, { "../common/utils": 4, "../token": 51 }], 48: [function (e, r, t) {"use strict";r.exports.tokenize = function (e, r) {var t,n,s,o,i,a = e.pos,c = e.src.charCodeAt(a);if (r) return !1;if (126 !== c) return !1;if (n = e.scanDelims(e.pos, !0), o = n.length, i = String.fromCharCode(c), o < 2) return !1;for (o % 2 && (s = e.push("text", "", 0), s.content = i, o--), t = 0; t < o; t += 2) {s = e.push("text", "", 0), s.content = i + i, e.delimiters.push({ marker: c, jump: t, token: e.tokens.length - 1, level: e.level, end: -1, open: n.can_open, close: n.can_close });}return e.pos += n.length, !0;}, r.exports.postProcess = function (e) {var r,t,n,s,o,i = [],a = e.delimiters,c = e.delimiters.length;for (r = 0; r < c; r++) {n = a[r], 126 === n.marker && n.end !== -1 && (s = a[n.end], o = e.tokens[n.token], o.type = "s_open", o.tag = "s", o.nesting = 1, o.markup = "~~", o.content = "", o = e.tokens[s.token], o.type = "s_close", o.tag = "s", o.nesting = -1, o.markup = "~~", o.content = "", "text" === e.tokens[s.token - 1].type && "~" === e.tokens[s.token - 1].content && i.push(s.token - 1));}for (; i.length;) {for (r = i.pop(), t = r + 1; t < e.tokens.length && "s_close" === e.tokens[t].type;) {t++;}t--, r !== t && (o = e.tokens[t], e.tokens[t] = e.tokens[r], e.tokens[r] = o);}};}, {}], 49: [function (e, r, t) {"use strict";function n(e) {switch (e) {case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return !0;default:return !1;}}r.exports = function (e, r) {for (var t = e.pos; t < e.posMax && !n(e.src.charCodeAt(t));) {t++;}return t !== e.pos && (r || (e.pending += e.src.slice(e.pos, t)), e.pos = t, !0);};}, {}], 50: [function (e, r, t) {"use strict";r.exports = function (e) {var r,t,n = 0,s = e.tokens,o = e.tokens.length;for (r = t = 0; r < o; r++) {n += s[r].nesting, s[r].level = n, "text" === s[r].type && r + 1 < o && "text" === s[r + 1].type ? s[r + 1].content = s[r].content + s[r + 1].content : (r !== t && (s[t] = s[r]), t++);}r !== t && (s.length = t);};}, {}], 51: [function (e, r, t) {"use strict";function n(e, r, t) {this.type = e, this.tag = r, this.attrs = null, this.map = null, this.nesting = t, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;}n.prototype.attrIndex = function (e) {var r, t, n;if (!this.attrs) return -1;for (r = this.attrs, t = 0, n = r.length; t < n; t++) {if (r[t][0] === e) return t;}return -1;}, n.prototype.attrPush = function (e) {this.attrs ? this.attrs.push(e) : this.attrs = [e];}, n.prototype.attrSet = function (e, r) {var t = this.attrIndex(e),n = [e, r];t < 0 ? this.attrPush(n) : this.attrs[t] = n;}, n.prototype.attrGet = function (e) {var r = this.attrIndex(e),t = null;return r >= 0 && (t = this.attrs[r][1]), t;}, n.prototype.attrJoin = function (e, r) {var t = this.attrIndex(e);t < 0 ? this.attrPush([e, r]) : this.attrs[t][1] = this.attrs[t][1] + " " + r;}, r.exports = n;}, {}], 52: [function (e, r, t) {r.exports = { Aacute: "\xc1", aacute: "\xe1", Abreve: "\u0102", abreve: "\u0103", ac: "\u223E", acd: "\u223F", acE: "\u223E\u0333", Acirc: "\xc2", acirc: "\xe2", acute: "\xb4", Acy: "\u0410", acy: "\u0430", AElig: "\xc6", aelig: "\xe6", af: "\u2061", Afr: "\uD835\uDD04", afr: "\uD835\uDD1E", Agrave: "\xc0", agrave: "\xe0", alefsym: "\u2135", aleph: "\u2135", Alpha: "\u0391", alpha: "\u03B1", Amacr: "\u0100", amacr: "\u0101", amalg: "\u2A3F", amp: "&", AMP: "&", andand: "\u2A55", And: "\u2A53", and: "\u2227", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220", ange: "\u29A4", angle: "\u2220", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angmsd: "\u2221", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222", angst: "\xc5", angzarr: "\u237C", Aogon: "\u0104", aogon: "\u0105", Aopf: "\uD835\uDD38", aopf: "\uD835\uDD52", apacir: "\u2A6F", ap: "\u2248", apE: "\u2A70", ape: "\u224A", apid: "\u224B", apos: "'", ApplyFunction: "\u2061", approx: "\u2248", approxeq: "\u224A", Aring: "\xc5", aring: "\xe5", Ascr: "\uD835\uDC9C", ascr: "\uD835\uDCB6", Assign: "\u2254", ast: "*", asymp: "\u2248", asympeq: "\u224D", Atilde: "\xc3", atilde: "\xe3", Auml: "\xc4", auml: "\xe4", awconint: "\u2233", awint: "\u2A11", backcong: "\u224C", backepsilon: "\u03F6", backprime: "\u2035", backsim: "\u223D", backsimeq: "\u22CD", Backslash: "\u2216", Barv: "\u2AE7", barvee: "\u22BD", barwed: "\u2305", Barwed: "\u2306", barwedge: "\u2305", bbrk: "\u23B5", bbrktbrk: "\u23B6", bcong: "\u224C", Bcy: "\u0411", bcy: "\u0431", bdquo: "\u201E", becaus: "\u2235", because: "\u2235", Because: "\u2235", bemptyv: "\u29B0", bepsi: "\u03F6", bernou: "\u212C", Bernoullis: "\u212C", Beta: "\u0392", beta: "\u03B2", beth: "\u2136", between: "\u226C", Bfr: "\uD835\uDD05", bfr: "\uD835\uDD1F", bigcap: "\u22C2", bigcirc: "\u25EF", bigcup: "\u22C3", bigodot: "\u2A00", bigoplus: "\u2A01", bigotimes: "\u2A02", bigsqcup: "\u2A06", bigstar: "\u2605", bigtriangledown: "\u25BD", bigtriangleup: "\u25B3", biguplus: "\u2A04", bigvee: "\u22C1", bigwedge: "\u22C0", bkarow: "\u290D", blacklozenge: "\u29EB", blacksquare: "\u25AA", blacktriangle: "\u25B4", blacktriangledown: "\u25BE", blacktriangleleft: "\u25C2", blacktriangleright: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\u2261\u20E5", bNot: "\u2AED", bnot: "\u2310", Bopf: "\uD835\uDD39", bopf: "\uD835\uDD53", bot: "\u22A5", bottom: "\u22A5", bowtie: "\u22C8", boxbox: "\u29C9", boxdl: "\u2510", boxdL: "\u2555", boxDl: "\u2556", boxDL: "\u2557", boxdr: "\u250C", boxdR: "\u2552", boxDr: "\u2553", boxDR: "\u2554", boxh: "\u2500", boxH: "\u2550", boxhd: "\u252C", boxHd: "\u2564", boxhD: "\u2565", boxHD: "\u2566", boxhu: "\u2534", boxHu: "\u2567", boxhU: "\u2568", boxHU: "\u2569", boxminus: "\u229F", boxplus: "\u229E", boxtimes: "\u22A0", boxul: "\u2518", boxuL: "\u255B", boxUl: "\u255C", boxUL: "\u255D", boxur: "\u2514", boxuR: "\u2558", boxUr: "\u2559", boxUR: "\u255A", boxv: "\u2502", boxV: "\u2551", boxvh: "\u253C", boxvH: "\u256A", boxVh: "\u256B", boxVH: "\u256C", boxvl: "\u2524", boxvL: "\u2561", boxVl: "\u2562", boxVL: "\u2563", boxvr: "\u251C", boxvR: "\u255E", boxVr: "\u255F", boxVR: "\u2560", bprime: "\u2035", breve: "\u02D8", Breve: "\u02D8", brvbar: "\xa6", bscr: "\uD835\uDCB7", Bscr: "\u212C", bsemi: "\u204F", bsim: "\u223D", bsime: "\u22CD", bsolb: "\u29C5", bsol: "\\", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bump: "\u224E", bumpE: "\u2AAE", bumpe: "\u224F", Bumpeq: "\u224E", bumpeq: "\u224F", Cacute: "\u0106", cacute: "\u0107", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\u2A4B", cap: "\u2229", Cap: "\u22D2", capcup: "\u2A47", capdot: "\u2A40", CapitalDifferentialD: "\u2145", caps: "\u2229\uFE00", caret: "\u2041", caron: "\u02C7", Cayleys: "\u212D", ccaps: "\u2A4D", Ccaron: "\u010C", ccaron: "\u010D", Ccedil: "\xc7", ccedil: "\xe7", Ccirc: "\u0108", ccirc: "\u0109", Cconint: "\u2230", ccups: "\u2A4C", ccupssm: "\u2A50", Cdot: "\u010A", cdot: "\u010B", cedil: "\xb8", Cedilla: "\xb8", cemptyv: "\u29B2", cent: "\xa2", centerdot: "\xb7", CenterDot: "\xb7", cfr: "\uD835\uDD20", Cfr: "\u212D", CHcy: "\u0427", chcy: "\u0447", check: "\u2713", checkmark: "\u2713", Chi: "\u03A7", chi: "\u03C7", circ: "\u02C6", circeq: "\u2257", circlearrowleft: "\u21BA", circlearrowright: "\u21BB", circledast: "\u229B", circledcirc: "\u229A", circleddash: "\u229D", CircleDot: "\u2299", circledR: "\xae", circledS: "\u24C8", CircleMinus: "\u2296", CirclePlus: "\u2295", CircleTimes: "\u2297", cir: "\u25CB", cirE: "\u29C3", cire: "\u2257", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", ClockwiseContourIntegral: "\u2232", CloseCurlyDoubleQuote: "\u201D", CloseCurlyQuote: "\u2019", clubs: "\u2663", clubsuit: "\u2663", colon: ":", Colon: "\u2237", Colone: "\u2A74", colone: "\u2254", coloneq: "\u2254", comma: ",", commat: "@", comp: "\u2201", compfn: "\u2218", complement: "\u2201", complexes: "\u2102", cong: "\u2245", congdot: "\u2A6D", Congruent: "\u2261", conint: "\u222E", Conint: "\u222F", ContourIntegral: "\u222E", copf: "\uD835\uDD54", Copf: "\u2102", coprod: "\u2210", Coproduct: "\u2210", copy: "\xa9", COPY: "\xa9", copysr: "\u2117", CounterClockwiseContourIntegral: "\u2233", crarr: "\u21B5", cross: "\u2717", Cross: "\u2A2F", Cscr: "\uD835\uDC9E", cscr: "\uD835\uDCB8", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2", ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", cuesc: "\u22DF", cularr: "\u21B6", cularrp: "\u293D", cupbrcap: "\u2A48", cupcap: "\u2A46", CupCap: "\u224D", cup: "\u222A", Cup: "\u22D3", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00", curarr: "\u21B7", curarrm: "\u293C", curlyeqprec: "\u22DE", curlyeqsucc: "\u22DF", curlyvee: "\u22CE", curlywedge: "\u22CF", curren: "\xa4", curvearrowleft: "\u21B6", curvearrowright: "\u21B7", cuvee: "\u22CE", cuwed: "\u22CF", cwconint: "\u2232", cwint: "\u2231", cylcty: "\u232D", dagger: "\u2020", Dagger: "\u2021", daleth: "\u2138", darr: "\u2193", Darr: "\u21A1", dArr: "\u21D3", dash: "\u2010", Dashv: "\u2AE4", dashv: "\u22A3", dbkarow: "\u290F", dblac: "\u02DD", Dcaron: "\u010E", dcaron: "\u010F", Dcy: "\u0414", dcy: "\u0434", ddagger: "\u2021", ddarr: "\u21CA", DD: "\u2145", dd: "\u2146", DDotrahd: "\u2911", ddotseq: "\u2A77", deg: "\xb0", Del: "\u2207", Delta: "\u0394", delta: "\u03B4", demptyv: "\u29B1", dfisht: "\u297F", Dfr: "\uD835\uDD07", dfr: "\uD835\uDD21", dHar: "\u2965", dharl: "\u21C3", dharr: "\u21C2", DiacriticalAcute: "\xb4", DiacriticalDot: "\u02D9", DiacriticalDoubleAcute: "\u02DD", DiacriticalGrave: "`", DiacriticalTilde: "\u02DC", diam: "\u22C4", diamond: "\u22C4", Diamond: "\u22C4", diamondsuit: "\u2666", diams: "\u2666", die: "\xa8", DifferentialD: "\u2146", digamma: "\u03DD", disin: "\u22F2", div: "\xf7", divide: "\xf7", divideontimes: "\u22C7", divonx: "\u22C7", DJcy: "\u0402", djcy: "\u0452", dlcorn: "\u231E", dlcrop: "\u230D", dollar: "$", Dopf: "\uD835\uDD3B", dopf: "\uD835\uDD55", Dot: "\xa8", dot: "\u02D9", DotDot: "\u20DC", doteq: "\u2250", doteqdot: "\u2251", DotEqual: "\u2250", dotminus: "\u2238", dotplus: "\u2214", dotsquare: "\u22A1", doublebarwedge: "\u2306", DoubleContourIntegral: "\u222F", DoubleDot: "\xa8", DoubleDownArrow: "\u21D3", DoubleLeftArrow: "\u21D0", DoubleLeftRightArrow: "\u21D4", DoubleLeftTee: "\u2AE4", DoubleLongLeftArrow: "\u27F8", DoubleLongLeftRightArrow: "\u27FA", DoubleLongRightArrow: "\u27F9", DoubleRightArrow: "\u21D2", DoubleRightTee: "\u22A8", DoubleUpArrow: "\u21D1", DoubleUpDownArrow: "\u21D5", DoubleVerticalBar: "\u2225", DownArrowBar: "\u2913", downarrow: "\u2193", DownArrow: "\u2193", Downarrow: "\u21D3", DownArrowUpArrow: "\u21F5", DownBreve: "\u0311", downdownarrows: "\u21CA", downharpoonleft: "\u21C3", downharpoonright: "\u21C2", DownLeftRightVector: "\u2950", DownLeftTeeVector: "\u295E", DownLeftVectorBar: "\u2956", DownLeftVector: "\u21BD", DownRightTeeVector: "\u295F", DownRightVectorBar: "\u2957", DownRightVector: "\u21C1", DownTeeArrow: "\u21A7", DownTee: "\u22A4", drbkarow: "\u2910", drcorn: "\u231F", drcrop: "\u230C", Dscr: "\uD835\uDC9F", dscr: "\uD835\uDCB9", DScy: "\u0405", dscy: "\u0455", dsol: "\u29F6", Dstrok: "\u0110", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", dtrif: "\u25BE", duarr: "\u21F5", duhar: "\u296F", dwangle: "\u29A6", DZcy: "\u040F", dzcy: "\u045F", dzigrarr: "\u27FF", Eacute: "\xc9", eacute: "\xe9", easter: "\u2A6E", Ecaron: "\u011A", ecaron: "\u011B", Ecirc: "\xca", ecirc: "\xea", ecir: "\u2256", ecolon: "\u2255", Ecy: "\u042D", ecy: "\u044D", eDDot: "\u2A77", Edot: "\u0116", edot: "\u0117", eDot: "\u2251", ee: "\u2147", efDot: "\u2252", Efr: "\uD835\uDD08", efr: "\uD835\uDD22", eg: "\u2A9A", Egrave: "\xc8", egrave: "\xe8", egs: "\u2A96", egsdot: "\u2A98", el: "\u2A99", Element: "\u2208", elinters: "\u23E7", ell: "\u2113", els: "\u2A95", elsdot: "\u2A97", Emacr: "\u0112", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", EmptySmallSquare: "\u25FB", emptyv: "\u2205", EmptyVerySmallSquare: "\u25AB", emsp13: "\u2004", emsp14: "\u2005", emsp: "\u2003", ENG: "\u014A", eng: "\u014B", ensp: "\u2002", Eogon: "\u0118", eogon: "\u0119", Eopf: "\uD835\uDD3C", eopf: "\uD835\uDD56", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5", Epsilon: "\u0395", epsilon: "\u03B5", epsiv: "\u03F5", eqcirc: "\u2256", eqcolon: "\u2255", eqsim: "\u2242", eqslantgtr: "\u2A96", eqslantless: "\u2A95", Equal: "\u2A75", equals: "=", EqualTilde: "\u2242", equest: "\u225F", Equilibrium: "\u21CC", equiv: "\u2261", equivDD: "\u2A78", eqvparsl: "\u29E5", erarr: "\u2971", erDot: "\u2253", escr: "\u212F", Escr: "\u2130", esdot: "\u2250", Esim: "\u2A73", esim: "\u2242", Eta: "\u0397", eta: "\u03B7", ETH: "\xd0", eth: "\xf0", Euml: "\xcb", euml: "\xeb", euro: "\u20AC", excl: "!", exist: "\u2203", Exists: "\u2203", expectation: "\u2130", exponentiale: "\u2147", ExponentialE: "\u2147", fallingdotseq: "\u2252", Fcy: "\u0424", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03", fflig: "\uFB00", ffllig: "\uFB04", Ffr: "\uD835\uDD09", ffr: "\uD835\uDD23", filig: "\uFB01", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\u25AA", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", Fopf: "\uD835\uDD3D", fopf: "\uD835\uDD57", forall: "\u2200", ForAll: "\u2200", fork: "\u22D4", forkv: "\u2AD9", Fouriertrf: "\u2131", fpartint: "\u2A0D", frac12: "\xbd", frac13: "\u2153", frac14: "\xbc", frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xbe", frac35: "\u2157", frac38: "\u215C", frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", fscr: "\uD835\uDCBB", Fscr: "\u2131", gacute: "\u01F5", Gamma: "\u0393", gamma: "\u03B3", Gammad: "\u03DC", gammad: "\u03DD", gap: "\u2A86", Gbreve: "\u011E", gbreve: "\u011F", Gcedil: "\u0122", Gcirc: "\u011C", gcirc: "\u011D", Gcy: "\u0413", gcy: "\u0433", Gdot: "\u0120", gdot: "\u0121", ge: "\u2265", gE: "\u2267", gEl: "\u2A8C", gel: "\u22DB", geq: "\u2265", geqq: "\u2267", geqslant: "\u2A7E", gescc: "\u2AA9", ges: "\u2A7E", gesdot: "\u2A80", gesdoto: "\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", Gfr: "\uD835\uDD0A", gfr: "\uD835\uDD24", gg: "\u226B", Gg: "\u22D9", ggg: "\u22D9", gimel: "\u2137", GJcy: "\u0403", gjcy: "\u0453", gla: "\u2AA5", gl: "\u2277", glE: "\u2A92", glj: "\u2AA4", gnap: "\u2A8A", gnapprox: "\u2A8A", gne: "\u2A88", gnE: "\u2269", gneq: "\u2A88", gneqq: "\u2269", gnsim: "\u22E7", Gopf: "\uD835\uDD3E", gopf: "\uD835\uDD58", grave: "`", GreaterEqual: "\u2265", GreaterEqualLess: "\u22DB", GreaterFullEqual: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", GreaterSlantEqual: "\u2A7E", GreaterTilde: "\u2273", Gscr: "\uD835\uDCA2", gscr: "\u210A", gsim: "\u2273", gsime: "\u2A8E", gsiml: "\u2A90", gtcc: "\u2AA7", gtcir: "\u2A7A", gt: ">", GT: ">", Gt: "\u226B", gtdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrapprox: "\u2A86", gtrarr: "\u2978", gtrdot: "\u22D7", gtreqless: "\u22DB", gtreqqless: "\u2A8C", gtrless: "\u2277", gtrsim: "\u2273", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", Hacek: "\u02C7", hairsp: "\u200A", half: "\xbd", hamilt: "\u210B", HARDcy: "\u042A", hardcy: "\u044A", harrcir: "\u2948", harr: "\u2194", hArr: "\u21D4", harrw: "\u21AD", Hat: "^", hbar: "\u210F", Hcirc: "\u0124", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", hercon: "\u22B9", hfr: "\uD835\uDD25", Hfr: "\u210C", HilbertSpace: "\u210B", hksearow: "\u2925", hkswarow: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\u21A9", hookrightarrow: "\u21AA", hopf: "\uD835\uDD59", Hopf: "\u210D", horbar: "\u2015", HorizontalLine: "\u2500", hscr: "\uD835\uDCBD", Hscr: "\u210B", hslash: "\u210F", Hstrok: "\u0126", hstrok: "\u0127", HumpDownHump: "\u224E", HumpEqual: "\u224F", hybull: "\u2043", hyphen: "\u2010", Iacute: "\xcd", iacute: "\xed", ic: "\u2063", Icirc: "\xce", icirc: "\xee", Icy: "\u0418", icy: "\u0438", Idot: "\u0130", IEcy: "\u0415", iecy: "\u0435", iexcl: "\xa1", iff: "\u21D4", ifr: "\uD835\uDD26", Ifr: "\u2111", Igrave: "\xcc", igrave: "\xec", ii: "\u2148", iiiint: "\u2A0C", iiint: "\u222D", iinfin: "\u29DC", iiota: "\u2129", IJlig: "\u0132", ijlig: "\u0133", Imacr: "\u012A", imacr: "\u012B", image: "\u2111", ImaginaryI: "\u2148", imagline: "\u2110", imagpart: "\u2111", imath: "\u0131", Im: "\u2111", imof: "\u22B7", imped: "\u01B5", Implies: "\u21D2", incare: "\u2105", in: "\u2208", infin: "\u221E", infintie: "\u29DD", inodot: "\u0131", intcal: "\u22BA", int: "\u222B", Int: "\u222C", integers: "\u2124", Integral: "\u222B", intercal: "\u22BA", Intersection: "\u22C2", intlarhk: "\u2A17", intprod: "\u2A3C", InvisibleComma: "\u2063", InvisibleTimes: "\u2062", IOcy: "\u0401", iocy: "\u0451", Iogon: "\u012E", iogon: "\u012F", Iopf: "\uD835\uDD40", iopf: "\uD835\uDD5A", Iota: "\u0399", iota: "\u03B9", iprod: "\u2A3C", iquest: "\xbf", iscr: "\uD835\uDCBE", Iscr: "\u2110", isin: "\u2208", isindot: "\u22F5", isinE: "\u22F9", isins: "\u22F4", isinsv: "\u22F3", isinv: "\u2208", it: "\u2062", Itilde: "\u0128", itilde: "\u0129", Iukcy: "\u0406", iukcy: "\u0456", Iuml: "\xcf", iuml: "\xef", Jcirc: "\u0134", jcirc: "\u0135", Jcy: "\u0419", jcy: "\u0439", Jfr: "\uD835\uDD0D", jfr: "\uD835\uDD27", jmath: "\u0237", Jopf: "\uD835\uDD41",
        jopf: "\uD835\uDD5B", Jscr: "\uD835\uDCA5", jscr: "\uD835\uDCBF", Jsercy: "\u0408", jsercy: "\u0458", Jukcy: "\u0404", jukcy: "\u0454", Kappa: "\u039A", kappa: "\u03BA", kappav: "\u03F0", Kcedil: "\u0136", kcedil: "\u0137", Kcy: "\u041A", kcy: "\u043A", Kfr: "\uD835\uDD0E", kfr: "\uD835\uDD28", kgreen: "\u0138", KHcy: "\u0425", khcy: "\u0445", KJcy: "\u040C", kjcy: "\u045C", Kopf: "\uD835\uDD42", kopf: "\uD835\uDD5C", Kscr: "\uD835\uDCA6", kscr: "\uD835\uDCC0", lAarr: "\u21DA", Lacute: "\u0139", lacute: "\u013A", laemptyv: "\u29B4", lagran: "\u2112", Lambda: "\u039B", lambda: "\u03BB", lang: "\u27E8", Lang: "\u27EA", langd: "\u2991", langle: "\u27E8", lap: "\u2A85", Laplacetrf: "\u2112", laquo: "\xab", larrb: "\u21E4", larrbfs: "\u291F", larr: "\u2190", Larr: "\u219E", lArr: "\u21D0", larrfs: "\u291D", larrhk: "\u21A9", larrlp: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2", latail: "\u2919", lAtail: "\u291B", lat: "\u2AAB", late: "\u2AAD", lates: "\u2AAD\uFE00", lbarr: "\u290C", lBarr: "\u290E", lbbrk: "\u2772", lbrace: "{", lbrack: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", Lcaron: "\u013D", lcaron: "\u013E", Lcedil: "\u013B", lcedil: "\u013C", lceil: "\u2308", lcub: "{", Lcy: "\u041B", lcy: "\u043B", ldca: "\u2936", ldquo: "\u201C", ldquor: "\u201E", ldrdhar: "\u2967", ldrushar: "\u294B", ldsh: "\u21B2", le: "\u2264", lE: "\u2266", LeftAngleBracket: "\u27E8", LeftArrowBar: "\u21E4", leftarrow: "\u2190", LeftArrow: "\u2190", Leftarrow: "\u21D0", LeftArrowRightArrow: "\u21C6", leftarrowtail: "\u21A2", LeftCeiling: "\u2308", LeftDoubleBracket: "\u27E6", LeftDownTeeVector: "\u2961", LeftDownVectorBar: "\u2959", LeftDownVector: "\u21C3", LeftFloor: "\u230A", leftharpoondown: "\u21BD", leftharpoonup: "\u21BC", leftleftarrows: "\u21C7", leftrightarrow: "\u2194", LeftRightArrow: "\u2194", Leftrightarrow: "\u21D4", leftrightarrows: "\u21C6", leftrightharpoons: "\u21CB", leftrightsquigarrow: "\u21AD", LeftRightVector: "\u294E", LeftTeeArrow: "\u21A4", LeftTee: "\u22A3", LeftTeeVector: "\u295A", leftthreetimes: "\u22CB", LeftTriangleBar: "\u29CF", LeftTriangle: "\u22B2", LeftTriangleEqual: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960", LeftUpVectorBar: "\u2958", LeftUpVector: "\u21BF", LeftVectorBar: "\u2952", LeftVector: "\u21BC", lEg: "\u2A8B", leg: "\u22DA", leq: "\u2264", leqq: "\u2266", leqslant: "\u2A7D", lescc: "\u2AA8", les: "\u2A7D", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00", lesges: "\u2A93", lessapprox: "\u2A85", lessdot: "\u22D6", lesseqgtr: "\u22DA", lesseqqgtr: "\u2A8B", LessEqualGreater: "\u22DA", LessFullEqual: "\u2266", LessGreater: "\u2276", lessgtr: "\u2276", LessLess: "\u2AA1", lesssim: "\u2272", LessSlantEqual: "\u2A7D", LessTilde: "\u2272", lfisht: "\u297C", lfloor: "\u230A", Lfr: "\uD835\uDD0F", lfr: "\uD835\uDD29", lg: "\u2276", lgE: "\u2A91", lHar: "\u2962", lhard: "\u21BD", lharu: "\u21BC", lharul: "\u296A", lhblk: "\u2584", LJcy: "\u0409", ljcy: "\u0459", llarr: "\u21C7", ll: "\u226A", Ll: "\u22D8", llcorner: "\u231E", Lleftarrow: "\u21DA", llhard: "\u296B", lltri: "\u25FA", Lmidot: "\u013F", lmidot: "\u0140", lmoustache: "\u23B0", lmoust: "\u23B0", lnap: "\u2A89", lnapprox: "\u2A89", lne: "\u2A87", lnE: "\u2268", lneq: "\u2A87", lneqq: "\u2268", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", lobrk: "\u27E6", longleftarrow: "\u27F5", LongLeftArrow: "\u27F5", Longleftarrow: "\u27F8", longleftrightarrow: "\u27F7", LongLeftRightArrow: "\u27F7", Longleftrightarrow: "\u27FA", longmapsto: "\u27FC", longrightarrow: "\u27F6", LongRightArrow: "\u27F6", Longrightarrow: "\u27F9", looparrowleft: "\u21AB", looparrowright: "\u21AC", lopar: "\u2985", Lopf: "\uD835\uDD43", lopf: "\uD835\uDD5D", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", lowbar: "_", LowerLeftArrow: "\u2199", LowerRightArrow: "\u2198", loz: "\u25CA", lozenge: "\u25CA", lozf: "\u29EB", lpar: "(", lparlt: "\u2993", lrarr: "\u21C6", lrcorner: "\u231F", lrhar: "\u21CB", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", lscr: "\uD835\uDCC1", Lscr: "\u2112", lsh: "\u21B0", Lsh: "\u21B0", lsim: "\u2272", lsime: "\u2A8D", lsimg: "\u2A8F", lsqb: "[", lsquo: "\u2018", lsquor: "\u201A", Lstrok: "\u0141", lstrok: "\u0142", ltcc: "\u2AA6", ltcir: "\u2A79", lt: "<", LT: "<", Lt: "\u226A", ltdot: "\u22D6", lthree: "\u22CB", ltimes: "\u22C9", ltlarr: "\u2976", ltquest: "\u2A7B", ltri: "\u25C3", ltrie: "\u22B4", ltrif: "\u25C2", ltrPar: "\u2996", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\u2268\uFE00", lvnE: "\u2268\uFE00", macr: "\xaf", male: "\u2642", malt: "\u2720", maltese: "\u2720", Map: "\u2905", map: "\u21A6", mapsto: "\u21A6", mapstodown: "\u21A7", mapstoleft: "\u21A4", mapstoup: "\u21A5", marker: "\u25AE", mcomma: "\u2A29", Mcy: "\u041C", mcy: "\u043C", mdash: "\u2014", mDDot: "\u223A", measuredangle: "\u2221", MediumSpace: "\u205F", Mellintrf: "\u2133", Mfr: "\uD835\uDD10", mfr: "\uD835\uDD2A", mho: "\u2127", micro: "\xb5", midast: "*", midcir: "\u2AF0", mid: "\u2223", middot: "\xb7", minusb: "\u229F", minus: "\u2212", minusd: "\u2238", minusdu: "\u2A2A", MinusPlus: "\u2213", mlcp: "\u2ADB", mldr: "\u2026", mnplus: "\u2213", models: "\u22A7", Mopf: "\uD835\uDD44", mopf: "\uD835\uDD5E", mp: "\u2213", mscr: "\uD835\uDCC2", Mscr: "\u2133", mstpos: "\u223E", Mu: "\u039C", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nabla: "\u2207", Nacute: "\u0143", nacute: "\u0144", nang: "\u2220\u20D2", nap: "\u2249", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", napprox: "\u2249", natural: "\u266E", naturals: "\u2115", natur: "\u266E", nbsp: "\xa0", nbump: "\u224E\u0338", nbumpe: "\u224F\u0338", ncap: "\u2A43", Ncaron: "\u0147", ncaron: "\u0148", Ncedil: "\u0145", ncedil: "\u0146", ncong: "\u2247", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", Ncy: "\u041D", ncy: "\u043D", ndash: "\u2013", nearhk: "\u2924", nearr: "\u2197", neArr: "\u21D7", nearrow: "\u2197", ne: "\u2260", nedot: "\u2250\u0338", NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", nequiv: "\u2262", nesear: "\u2928", nesim: "\u2242\u0338", NestedGreaterGreater: "\u226B", NestedLessLess: "\u226A", NewLine: "\n", nexist: "\u2204", nexists: "\u2204", Nfr: "\uD835\uDD11", nfr: "\uD835\uDD2B", ngE: "\u2267\u0338", nge: "\u2271", ngeq: "\u2271", ngeqq: "\u2267\u0338", ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", nGg: "\u22D9\u0338", ngsim: "\u2275", nGt: "\u226B\u20D2", ngt: "\u226F", ngtr: "\u226F", nGtv: "\u226B\u0338", nharr: "\u21AE", nhArr: "\u21CE", nhpar: "\u2AF2", ni: "\u220B", nis: "\u22FC", nisd: "\u22FA", niv: "\u220B", NJcy: "\u040A", njcy: "\u045A", nlarr: "\u219A", nlArr: "\u21CD", nldr: "\u2025", nlE: "\u2266\u0338", nle: "\u2270", nleftarrow: "\u219A", nLeftarrow: "\u21CD", nleftrightarrow: "\u21AE", nLeftrightarrow: "\u21CE", nleq: "\u2270", nleqq: "\u2266\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338", nless: "\u226E", nLl: "\u22D8\u0338", nlsim: "\u2274", nLt: "\u226A\u20D2", nlt: "\u226E", nltri: "\u22EA", nltrie: "\u22EC", nLtv: "\u226A\u0338", nmid: "\u2224", NoBreak: "\u2060", NonBreakingSpace: "\xa0", nopf: "\uD835\uDD5F", Nopf: "\u2115", Not: "\u2AEC", not: "\xac", NotCongruent: "\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", NotElement: "\u2209", NotEqual: "\u2260", NotEqualTilde: "\u2242\u0338", NotExists: "\u2204", NotGreater: "\u226F", NotGreaterEqual: "\u2271", NotGreaterFullEqual: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", NotGreaterLess: "\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", NotGreaterTilde: "\u2275", NotHumpDownHump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", notin: "\u2209", notindot: "\u22F5\u0338", notinE: "\u22F9\u0338", notinva: "\u2209", notinvb: "\u22F7", notinvc: "\u22F6", NotLeftTriangleBar: "\u29CF\u0338", NotLeftTriangle: "\u22EA", NotLeftTriangleEqual: "\u22EC", NotLess: "\u226E", NotLessEqual: "\u2270", NotLessGreater: "\u2278", NotLessLess: "\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", NotLessTilde: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338", notni: "\u220C", notniva: "\u220C", notnivb: "\u22FE", notnivc: "\u22FD", NotPrecedes: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", NotPrecedesSlantEqual: "\u22E0", NotReverseElement: "\u220C", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangle: "\u22EB", NotRightTriangleEqual: "\u22ED", NotSquareSubset: "\u228F\u0338", NotSquareSubsetEqual: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", NotSubset: "\u2282\u20D2", NotSubsetEqual: "\u2288", NotSucceeds: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", NotSucceedsTilde: "\u227F\u0338", NotSuperset: "\u2283\u20D2", NotSupersetEqual: "\u2289", NotTilde: "\u2241", NotTildeEqual: "\u2244", NotTildeFullEqual: "\u2247", NotTildeTilde: "\u2249", NotVerticalBar: "\u2224", nparallel: "\u2226", npar: "\u2226", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", npr: "\u2280", nprcue: "\u22E0", nprec: "\u2280", npreceq: "\u2AAF\u0338", npre: "\u2AAF\u0338", nrarrc: "\u2933\u0338", nrarr: "\u219B", nrArr: "\u21CF", nrarrw: "\u219D\u0338", nrightarrow: "\u219B", nRightarrow: "\u21CF", nrtri: "\u22EB", nrtrie: "\u22ED", nsc: "\u2281", nsccue: "\u22E1", nsce: "\u2AB0\u0338", Nscr: "\uD835\uDCA9", nscr: "\uD835\uDCC3", nshortmid: "\u2224", nshortparallel: "\u2226", nsim: "\u2241", nsime: "\u2244", nsimeq: "\u2244", nsmid: "\u2224", nspar: "\u2226", nsqsube: "\u22E2", nsqsupe: "\u22E3", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsube: "\u2288", nsubset: "\u2282\u20D2", nsubseteq: "\u2288", nsubseteqq: "\u2AC5\u0338", nsucc: "\u2281", nsucceq: "\u2AB0\u0338", nsup: "\u2285", nsupE: "\u2AC6\u0338", nsupe: "\u2289", nsupset: "\u2283\u20D2", nsupseteq: "\u2289", nsupseteqq: "\u2AC6\u0338", ntgl: "\u2279", Ntilde: "\xd1", ntilde: "\xf1", ntlg: "\u2278", ntriangleleft: "\u22EA", ntrianglelefteq: "\u22EC", ntriangleright: "\u22EB", ntrianglerighteq: "\u22ED", Nu: "\u039D", nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvap: "\u224D\u20D2", nvdash: "\u22AC", nvDash: "\u22AD", nVdash: "\u22AE", nVDash: "\u22AF", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvHarr: "\u2904", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2", nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwarhk: "\u2923", nwarr: "\u2196", nwArr: "\u21D6", nwarrow: "\u2196", nwnear: "\u2927", Oacute: "\xd3", oacute: "\xf3", oast: "\u229B", Ocirc: "\xd4", ocirc: "\xf4", ocir: "\u229A", Ocy: "\u041E", ocy: "\u043E", odash: "\u229D", Odblac: "\u0150", odblac: "\u0151", odiv: "\u2A38", odot: "\u2299", odsold: "\u29BC", OElig: "\u0152", oelig: "\u0153", ofcir: "\u29BF", Ofr: "\uD835\uDD12", ofr: "\uD835\uDD2C", ogon: "\u02DB", Ograve: "\xd2", ograve: "\xf2", ogt: "\u29C1", ohbar: "\u29B5", ohm: "\u03A9", oint: "\u222E", olarr: "\u21BA", olcir: "\u29BE", olcross: "\u29BB", oline: "\u203E", olt: "\u29C0", Omacr: "\u014C", omacr: "\u014D", Omega: "\u03A9", omega: "\u03C9", Omicron: "\u039F", omicron: "\u03BF", omid: "\u29B6", ominus: "\u2296", Oopf: "\uD835\uDD46", oopf: "\uD835\uDD60", opar: "\u29B7", OpenCurlyDoubleQuote: "\u201C", OpenCurlyQuote: "\u2018", operp: "\u29B9", oplus: "\u2295", orarr: "\u21BB", Or: "\u2A54", or: "\u2228", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", ordf: "\xaa", ordm: "\xba", origof: "\u22B6", oror: "\u2A56", orslope: "\u2A57", orv: "\u2A5B", oS: "\u24C8", Oscr: "\uD835\uDCAA", oscr: "\u2134", Oslash: "\xd8", oslash: "\xf8", osol: "\u2298", Otilde: "\xd5", otilde: "\xf5", otimesas: "\u2A36", Otimes: "\u2A37", otimes: "\u2297", Ouml: "\xd6", ouml: "\xf6", ovbar: "\u233D", OverBar: "\u203E", OverBrace: "\u23DE", OverBracket: "\u23B4", OverParenthesis: "\u23DC", para: "\xb6", parallel: "\u2225", par: "\u2225", parsim: "\u2AF3", parsl: "\u2AFD", part: "\u2202", PartialD: "\u2202", Pcy: "\u041F", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", perp: "\u22A5", pertenk: "\u2031", Pfr: "\uD835\uDD13", pfr: "\uD835\uDD2D", Phi: "\u03A6", phi: "\u03C6", phiv: "\u03D5", phmmat: "\u2133", phone: "\u260E", Pi: "\u03A0", pi: "\u03C0", pitchfork: "\u22D4", piv: "\u03D6", planck: "\u210F", planckh: "\u210E", plankv: "\u210F", plusacir: "\u2A23", plusb: "\u229E", pluscir: "\u2A22", plus: "+", plusdo: "\u2214", plusdu: "\u2A25", pluse: "\u2A72", PlusMinus: "\xb1", plusmn: "\xb1", plussim: "\u2A26", plustwo: "\u2A27", pm: "\xb1", Poincareplane: "\u210C", pointint: "\u2A15", popf: "\uD835\uDD61", Popf: "\u2119", pound: "\xa3", prap: "\u2AB7", Pr: "\u2ABB", pr: "\u227A", prcue: "\u227C", precapprox: "\u2AB7", prec: "\u227A", preccurlyeq: "\u227C", Precedes: "\u227A", PrecedesEqual: "\u2AAF", PrecedesSlantEqual: "\u227C", PrecedesTilde: "\u227E", preceq: "\u2AAF", precnapprox: "\u2AB9", precneqq: "\u2AB5", precnsim: "\u22E8", pre: "\u2AAF", prE: "\u2AB3", precsim: "\u227E", prime: "\u2032", Prime: "\u2033", primes: "\u2119", prnap: "\u2AB9", prnE: "\u2AB5", prnsim: "\u22E8", prod: "\u220F", Product: "\u220F", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prop: "\u221D", Proportional: "\u221D", Proportion: "\u2237", propto: "\u221D", prsim: "\u227E", prurel: "\u22B0", Pscr: "\uD835\uDCAB", pscr: "\uD835\uDCC5", Psi: "\u03A8", psi: "\u03C8", puncsp: "\u2008", Qfr: "\uD835\uDD14", qfr: "\uD835\uDD2E", qint: "\u2A0C", qopf: "\uD835\uDD62", Qopf: "\u211A", qprime: "\u2057", Qscr: "\uD835\uDCAC", qscr: "\uD835\uDCC6", quaternions: "\u210D", quatint: "\u2A16", quest: "?", questeq: "\u225F", quot: '"', QUOT: '"', rAarr: "\u21DB", race: "\u223D\u0331", Racute: "\u0154", racute: "\u0155", radic: "\u221A", raemptyv: "\u29B3", rang: "\u27E9", Rang: "\u27EB", rangd: "\u2992", range: "\u29A5", rangle: "\u27E9", raquo: "\xbb", rarrap: "\u2975", rarrb: "\u21E5", rarrbfs: "\u2920", rarrc: "\u2933", rarr: "\u2192", Rarr: "\u21A0", rArr: "\u21D2", rarrfs: "\u291E", rarrhk: "\u21AA", rarrlp: "\u21AC", rarrpl: "\u2945", rarrsim: "\u2974", Rarrtl: "\u2916", rarrtl: "\u21A3", rarrw: "\u219D", ratail: "\u291A", rAtail: "\u291C", ratio: "\u2236", rationals: "\u211A", rbarr: "\u290D", rBarr: "\u290F", RBarr: "\u2910", rbbrk: "\u2773", rbrace: "}", rbrack: "]", rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", Rcaron: "\u0158", rcaron: "\u0159", Rcedil: "\u0156", rcedil: "\u0157", rceil: "\u2309", rcub: "}", Rcy: "\u0420", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdquo: "\u201D", rdquor: "\u201D", rdsh: "\u21B3", real: "\u211C", realine: "\u211B", realpart: "\u211C", reals: "\u211D", Re: "\u211C", rect: "\u25AD", reg: "\xae", REG: "\xae", ReverseElement: "\u220B", ReverseEquilibrium: "\u21CB", ReverseUpEquilibrium: "\u296F", rfisht: "\u297D", rfloor: "\u230B", rfr: "\uD835\uDD2F", Rfr: "\u211C", rHar: "\u2964", rhard: "\u21C1", rharu: "\u21C0", rharul: "\u296C", Rho: "\u03A1", rho: "\u03C1", rhov: "\u03F1", RightAngleBracket: "\u27E9", RightArrowBar: "\u21E5", rightarrow: "\u2192", RightArrow: "\u2192", Rightarrow: "\u21D2", RightArrowLeftArrow: "\u21C4", rightarrowtail: "\u21A3", RightCeiling: "\u2309", RightDoubleBracket: "\u27E7", RightDownTeeVector: "\u295D", RightDownVectorBar: "\u2955", RightDownVector: "\u21C2", RightFloor: "\u230B", rightharpoondown: "\u21C1", rightharpoonup: "\u21C0", rightleftarrows: "\u21C4", rightleftharpoons: "\u21CC", rightrightarrows: "\u21C9", rightsquigarrow: "\u219D", RightTeeArrow: "\u21A6", RightTee: "\u22A2", RightTeeVector: "\u295B", rightthreetimes: "\u22CC", RightTriangleBar: "\u29D0", RightTriangle: "\u22B3", RightTriangleEqual: "\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVectorBar: "\u2954", RightUpVector: "\u21BE", RightVectorBar: "\u2953", RightVector: "\u21C0", ring: "\u02DA", risingdotseq: "\u2253", rlarr: "\u21C4", rlhar: "\u21CC", rlm: "\u200F", rmoustache: "\u23B1", rmoust: "\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", robrk: "\u27E7", ropar: "\u2986", ropf: "\uD835\uDD63", Ropf: "\u211D", roplus: "\u2A2E", rotimes: "\u2A35", RoundImplies: "\u2970", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rrarr: "\u21C9", Rrightarrow: "\u21DB", rsaquo: "\u203A", rscr: "\uD835\uDCC7", Rscr: "\u211B", rsh: "\u21B1", Rsh: "\u21B1", rsqb: "]", rsquo: "\u2019", rsquor: "\u2019", rthree: "\u22CC", rtimes: "\u22CA", rtri: "\u25B9", rtrie: "\u22B5", rtrif: "\u25B8", rtriltri: "\u29CE", RuleDelayed: "\u29F4", ruluhar: "\u2968", rx: "\u211E", Sacute: "\u015A", sacute: "\u015B", sbquo: "\u201A", scap: "\u2AB8", Scaron: "\u0160", scaron: "\u0161", Sc: "\u2ABC", sc: "\u227B", sccue: "\u227D", sce: "\u2AB0", scE: "\u2AB4", Scedil: "\u015E", scedil: "\u015F", Scirc: "\u015C", scirc: "\u015D", scnap: "\u2ABA", scnE: "\u2AB6", scnsim: "\u22E9", scpolint: "\u2A13", scsim: "\u227F", Scy: "\u0421", scy: "\u0441", sdotb: "\u22A1", sdot: "\u22C5", sdote: "\u2A66", searhk: "\u2925", searr: "\u2198", seArr: "\u21D8", searrow: "\u2198", sect: "\xa7", semi: ";", seswar: "\u2929", setminus: "\u2216", setmn: "\u2216", sext: "\u2736", Sfr: "\uD835\uDD16", sfr: "\uD835\uDD30", sfrown: "\u2322", sharp: "\u266F", SHCHcy: "\u0429", shchcy: "\u0449", SHcy: "\u0428", shcy: "\u0448", ShortDownArrow: "\u2193", ShortLeftArrow: "\u2190", shortmid: "\u2223", shortparallel: "\u2225", ShortRightArrow: "\u2192", ShortUpArrow: "\u2191", shy: "\xad", Sigma: "\u03A3", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", sim: "\u223C", simdot: "\u2A6A", sime: "\u2243", simeq: "\u2243", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", slarr: "\u2190", SmallCircle: "\u2218", smallsetminus: "\u2216", smashp: "\u2A33", smeparsl: "\u29E4", smid: "\u2223", smile: "\u2323", smt: "\u2AAA", smte: "\u2AAC", smtes: "\u2AAC\uFE00", SOFTcy: "\u042C", softcy: "\u044C", solbar: "\u233F", solb: "\u29C4", sol: "/", Sopf: "\uD835\uDD4A", sopf: "\uD835\uDD64", spades: "\u2660", spadesuit: "\u2660", spar: "\u2225", sqcap: "\u2293", sqcaps: "\u2293\uFE00", sqcup: "\u2294", sqcups: "\u2294\uFE00", Sqrt: "\u221A", sqsub: "\u228F", sqsube: "\u2291", sqsubset: "\u228F", sqsubseteq: "\u2291", sqsup: "\u2290", sqsupe: "\u2292", sqsupset: "\u2290", sqsupseteq: "\u2292", square: "\u25A1", Square: "\u25A1", SquareIntersection: "\u2293", SquareSubset: "\u228F", SquareSubsetEqual: "\u2291", SquareSuperset: "\u2290", SquareSupersetEqual: "\u2292", SquareUnion: "\u2294", squarf: "\u25AA", squ: "\u25A1", squf: "\u25AA", srarr: "\u2192", Sscr: "\uD835\uDCAE", sscr: "\uD835\uDCC8", ssetmn: "\u2216", ssmile: "\u2323", sstarf: "\u22C6", Star: "\u22C6", star: "\u2606", starf: "\u2605", straightepsilon: "\u03F5", straightphi: "\u03D5", strns: "\xaf", sub: "\u2282", Sub: "\u22D0", subdot: "\u2ABD", subE: "\u2AC5", sube: "\u2286", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subne: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", subset: "\u2282", Subset: "\u22D0", subseteq: "\u2286", subseteqq: "\u2AC5", SubsetEqual: "\u2286", subsetneq: "\u228A", subsetneqq: "\u2ACB", subsim: "\u2AC7", subsub: "\u2AD5", subsup: "\u2AD3", succapprox: "\u2AB8", succ: "\u227B", succcurlyeq: "\u227D", Succeeds: "\u227B", SucceedsEqual: "\u2AB0", SucceedsSlantEqual: "\u227D", SucceedsTilde: "\u227F", succeq: "\u2AB0", succnapprox: "\u2ABA", succneqq: "\u2AB6", succnsim: "\u22E9", succsim: "\u227F", SuchThat: "\u220B", sum: "\u2211", Sum: "\u2211", sung: "\u266A", sup1: "\xb9", sup2: "\xb2", sup3: "\xb3", sup: "\u2283", Sup: "\u22D1", supdot: "\u2ABE", supdsub: "\u2AD8", supE: "\u2AC6", supe: "\u2287", supedot: "\u2AC4", Superset: "\u2283", SupersetEqual: "\u2287", suphsol: "\u27C9", suphsub: "\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supne: "\u228B", supplus: "\u2AC0", supset: "\u2283", Supset: "\u22D1", supseteq: "\u2287", supseteqq: "\u2AC6", supsetneq: "\u228B", supsetneqq: "\u2ACC", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swarhk: "\u2926", swarr: "\u2199", swArr: "\u21D9", swarrow: "\u2199", swnwar: "\u292A", szlig: "\xdf", Tab: "\t", target: "\u2316", Tau: "\u03A4", tau: "\u03C4", tbrk: "\u23B4", Tcaron: "\u0164", tcaron: "\u0165", Tcedil: "\u0162", tcedil: "\u0163", Tcy: "\u0422", tcy: "\u0442", tdot: "\u20DB", telrec: "\u2315", Tfr: "\uD835\uDD17", tfr: "\uD835\uDD31", there4: "\u2234", therefore: "\u2234", Therefore: "\u2234", Theta: "\u0398", theta: "\u03B8", thetasym: "\u03D1", thetav: "\u03D1", thickapprox: "\u2248", thicksim: "\u223C", ThickSpace: "\u205F\u200A", ThinSpace: "\u2009", thinsp: "\u2009", thkap: "\u2248", thksim: "\u223C", THORN: "\xde", thorn: "\xfe", tilde: "\u02DC", Tilde: "\u223C", TildeEqual: "\u2243", TildeFullEqual: "\u2245", TildeTilde: "\u2248", timesbar: "\u2A31", timesb: "\u22A0", times: "\xd7", timesd: "\u2A30", tint: "\u222D", toea: "\u2928", topbot: "\u2336", topcir: "\u2AF1", top: "\u22A4", Topf: "\uD835\uDD4B", topf: "\uD835\uDD65", topfork: "\u2ADA", tosa: "\u2929", tprime: "\u2034", trade: "\u2122", TRADE: "\u2122", triangle: "\u25B5", triangledown: "\u25BF", triangleleft: "\u25C3", trianglelefteq: "\u22B4", triangleq: "\u225C", triangleright: "\u25B9", trianglerighteq: "\u22B5", tridot: "\u25EC", trie: "\u225C", triminus: "\u2A3A", TripleDot: "\u20DB", triplus: "\u2A39", trisb: "\u29CD", tritime: "\u2A3B", trpezium: "\u23E2", Tscr: "\uD835\uDCAF", tscr: "\uD835\uDCC9", TScy: "\u0426", tscy: "\u0446", TSHcy: "\u040B", tshcy: "\u045B", Tstrok: "\u0166", tstrok: "\u0167", twixt: "\u226C", twoheadleftarrow: "\u219E", twoheadrightarrow: "\u21A0", Uacute: "\xda", uacute: "\xfa", uarr: "\u2191", Uarr: "\u219F", uArr: "\u21D1", Uarrocir: "\u2949", Ubrcy: "\u040E", ubrcy: "\u045E", Ubreve: "\u016C", ubreve: "\u016D", Ucirc: "\xdb", ucirc: "\xfb", Ucy: "\u0423", ucy: "\u0443", udarr: "\u21C5", Udblac: "\u0170", udblac: "\u0171", udhar: "\u296E", ufisht: "\u297E", Ufr: "\uD835\uDD18", ufr: "\uD835\uDD32", Ugrave: "\xd9", ugrave: "\xf9", uHar: "\u2963", uharl: "\u21BF", uharr: "\u21BE", uhblk: "\u2580", ulcorn: "\u231C", ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", Umacr: "\u016A", umacr: "\u016B", uml: "\xa8", UnderBar: "_", UnderBrace: "\u23DF", UnderBracket: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", UnionPlus: "\u228E", Uogon: "\u0172", uogon: "\u0173", Uopf: "\uD835\uDD4C", uopf: "\uD835\uDD66", UpArrowBar: "\u2912", uparrow: "\u2191", UpArrow: "\u2191", Uparrow: "\u21D1", UpArrowDownArrow: "\u21C5", updownarrow: "\u2195", UpDownArrow: "\u2195", Updownarrow: "\u21D5", UpEquilibrium: "\u296E", upharpoonleft: "\u21BF", upharpoonright: "\u21BE", uplus: "\u228E", UpperLeftArrow: "\u2196", UpperRightArrow: "\u2197", upsi: "\u03C5", Upsi: "\u03D2", upsih: "\u03D2", Upsilon: "\u03A5", upsilon: "\u03C5", UpTeeArrow: "\u21A5", UpTee: "\u22A5", upuparrows: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", Uring: "\u016E", uring: "\u016F", urtri: "\u25F9", Uscr: "\uD835\uDCB0", uscr: "\uD835\uDCCA", utdot: "\u22F0", Utilde: "\u0168", utilde: "\u0169", utri: "\u25B5", utrif: "\u25B4", uuarr: "\u21C8", Uuml: "\xdc", uuml: "\xfc", uwangle: "\u29A7", vangrt: "\u299C", varepsilon: "\u03F5", varkappa: "\u03F0", varnothing: "\u2205", varphi: "\u03D5", varpi: "\u03D6", varpropto: "\u221D", varr: "\u2195", vArr: "\u21D5", varrho: "\u03F1", varsigma: "\u03C2", varsubsetneq: "\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vartheta: "\u03D1", vartriangleleft: "\u22B2", vartriangleright: "\u22B3", vBar: "\u2AE8", Vbar: "\u2AEB", vBarv: "\u2AE9", Vcy: "\u0412", vcy: "\u0432", vdash: "\u22A2", vDash: "\u22A8", Vdash: "\u22A9", VDash: "\u22AB", Vdashl: "\u2AE6", veebar: "\u22BB", vee: "\u2228", Vee: "\u22C1", veeeq: "\u225A", vellip: "\u22EE", verbar: "|", Verbar: "\u2016", vert: "|", Vert: "\u2016", VerticalBar: "\u2223", VerticalLine: "|", VerticalSeparator: "\u2758", VerticalTilde: "\u2240", VeryThinSpace: "\u200A", Vfr: "\uD835\uDD19", vfr: "\uD835\uDD33", vltri: "\u22B2", vnsub: "\u2282\u20D2", vnsup: "\u2283\u20D2", Vopf: "\uD835\uDD4D", vopf: "\uD835\uDD67", vprop: "\u221D", vrtri: "\u22B3", Vscr: "\uD835\uDCB1", vscr: "\uD835\uDCCB", vsubnE: "\u2ACB\uFE00", vsubne: "\u228A\uFE00", vsupnE: "\u2ACC\uFE00", vsupne: "\u228B\uFE00", Vvdash: "\u22AA", vzigzag: "\u299A", Wcirc: "\u0174", wcirc: "\u0175", wedbar: "\u2A5F", wedge: "\u2227", Wedge: "\u22C0", wedgeq: "\u2259", weierp: "\u2118", Wfr: "\uD835\uDD1A", wfr: "\uD835\uDD34", Wopf: "\uD835\uDD4E", wopf: "\uD835\uDD68", wp: "\u2118", wr: "\u2240", wreath: "\u2240", Wscr: "\uD835\uDCB2", wscr: "\uD835\uDCCC", xcap: "\u22C2", xcirc: "\u25EF", xcup: "\u22C3", xdtri: "\u25BD", Xfr: "\uD835\uDD1B", xfr: "\uD835\uDD35", xharr: "\u27F7", xhArr: "\u27FA", Xi: "\u039E", xi: "\u03BE", xlarr: "\u27F5", xlArr: "\u27F8", xmap: "\u27FC", xnis: "\u22FB", xodot: "\u2A00", Xopf: "\uD835\uDD4F", xopf: "\uD835\uDD69", xoplus: "\u2A01", xotime: "\u2A02", xrarr: "\u27F6", xrArr: "\u27F9", Xscr: "\uD835\uDCB3", xscr: "\uD835\uDCCD", xsqcup: "\u2A06", xuplus: "\u2A04", xutri: "\u25B3", xvee: "\u22C1", xwedge: "\u22C0", Yacute: "\xdd", yacute: "\xfd", YAcy: "\u042F", yacy: "\u044F", Ycirc: "\u0176", ycirc: "\u0177", Ycy: "\u042B", ycy: "\u044B", yen: "\xa5", Yfr: "\uD835\uDD1C", yfr: "\uD835\uDD36", YIcy: "\u0407", yicy: "\u0457", Yopf: "\uD835\uDD50", yopf: "\uD835\uDD6A", Yscr: "\uD835\uDCB4", yscr: "\uD835\uDCCE", YUcy: "\u042E", yucy: "\u044E", yuml: "\xff", Yuml: "\u0178", Zacute: "\u0179", zacute: "\u017A", Zcaron: "\u017D", zcaron: "\u017E", Zcy: "\u0417", zcy: "\u0437", Zdot: "\u017B", zdot: "\u017C", zeetrf: "\u2128", ZeroWidthSpace: "\u200B", Zeta: "\u0396", zeta: "\u03B6", zfr: "\uD835\uDD37", Zfr: "\u2128", ZHcy: "\u0416", zhcy: "\u0436", zigrarr: "\u21DD", zopf: "\uD835\uDD6B", Zopf: "\u2124", Zscr: "\uD835\uDCB5", zscr: "\uD835\uDCCF", zwj: "\u200D", zwnj: "\u200C" };}, {}], 53: [function (e, r, t) {"use strict";function n(e) {return Array.prototype.slice.call(arguments, 1).forEach(function (r) {r && Object.keys(r).forEach(function (t) {e[t] = r[t];});}), e;}function s(e) {return Object.prototype.toString.call(e);}function o(e) {return "[object String]" === s(e);}function i(e) {return "[object Object]" === s(e);}function a(e) {return "[object RegExp]" === s(e);}function c(e) {return "[object Function]" === s(e);}function l(e) {return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");}function u(e) {return Object.keys(e || {}).reduce(function (e, r) {return e || b.hasOwnProperty(r);}, !1);}function p(e) {e.__index__ = -1, e.__text_cache__ = "";}function h(e) {return function (r, t) {var n = r.slice(t);return e.test(n) ? n.match(e)[0].length : 0;};}function f() {return function (e, r) {r.normalize(e);};}function d(r) {function t(e) {return e.replace("%TLDS%", s.src_tlds);}function n(e, r) {throw new Error('(LinkifyIt) Invalid schema "' + e + '": ' + r);}var s = r.re = e("./lib/re")(r.__opts__),u = r.__tlds__.slice();r.onCompile(), r.__tlds_replaced__ || u.push("a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]"), u.push(s.src_xn), s.src_tlds = u.join("|"), s.email_fuzzy = RegExp(t(s.tpl_email_fuzzy), "i"), s.link_fuzzy = RegExp(t(s.tpl_link_fuzzy), "i"), s.link_no_ip_fuzzy = RegExp(t(s.tpl_link_no_ip_fuzzy), "i"), s.host_fuzzy_test = RegExp(t(s.tpl_host_fuzzy_test), "i");var d = [];r.__compiled__ = {}, Object.keys(r.__schemas__).forEach(function (e) {var t = r.__schemas__[e];if (null !== t) {var s = { validate: null, link: null };return r.__compiled__[e] = s, i(t) ? (a(t.validate) ? s.validate = h(t.validate) : c(t.validate) ? s.validate = t.validate : n(e, t), void (c(t.normalize) ? s.normalize = t.normalize : t.normalize ? n(e, t) : s.normalize = f())) : o(t) ? void d.push(e) : void n(e, t);}}), d.forEach(function (e) {r.__compiled__[r.__schemas__[e]] && (r.__compiled__[e].validate = r.__compiled__[r.__schemas__[e]].validate, r.__compiled__[e].normalize = r.__compiled__[r.__schemas__[e]].normalize);}), r.__compiled__[""] = { validate: null, normalize: f() };var m = Object.keys(r.__compiled__).filter(function (e) {return e.length > 0 && r.__compiled__[e];}).map(l).join("|");r.re.schema_test = RegExp("(^|(?!_)(?:[><\uFF5C]|" + s.src_ZPCc + "))(" + m + ")", "i"), r.re.schema_search = RegExp("(^|(?!_)(?:[><\uFF5C]|" + s.src_ZPCc + "))(" + m + ")", "ig"), r.re.pretest = RegExp("(" + r.re.schema_test.source + ")|(" + r.re.host_fuzzy_test.source + ")|@", "i"), p(r);}function m(e, r) {var t = e.__index__,n = e.__last_index__,s = e.__text_cache__.slice(t, n);this.schema = e.__schema__.toLowerCase(), this.index = t + r, this.lastIndex = n + r, this.raw = s, this.text = s, this.url = s;}function _(e, r) {var t = new m(e, r);return e.__compiled__[t.schema].normalize(t, e), t;}function g(e, r) {if (!(this instanceof g)) return new g(e, r);r || u(e) && (r = e, e = {}), this.__opts__ = n({}, b, r), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = n({}, k, e), this.__compiled__ = {}, this.__tlds__ = v, this.__tlds_replaced__ = !1, this.re = {}, d(this);}var b = { fuzzyLink: !0, fuzzyEmail: !0, fuzzyIP: !1 },k = { "http:": { validate: function validate(e, r, t) {var n = e.slice(r);return t.re.http || (t.re.http = new RegExp("^\\/\\/" + t.re.src_auth + t.re.src_host_port_strict + t.re.src_path, "i")), t.re.http.test(n) ? n.match(t.re.http)[0].length : 0;} }, "https:": "http:", "ftp:": "http:", "//": { validate: function validate(e, r, t) {var n = e.slice(r);return t.re.no_http || (t.re.no_http = new RegExp("^" + t.re.src_auth + "(?:localhost|(?:(?:" + t.re.src_domain + ")\\.)+" + t.re.src_domain_root + ")" + t.re.src_port + t.re.src_host_terminator + t.re.src_path, "i")), t.re.no_http.test(n) ? r >= 3 && ":" === e[r - 3] ? 0 : r >= 3 && "/" === e[r - 3] ? 0 : n.match(t.re.no_http)[0].length : 0;} }, "mailto:": { validate: function validate(e, r, t) {var n = e.slice(r);return t.re.mailto || (t.re.mailto = new RegExp("^" + t.re.src_email_name + "@" + t.re.src_host_strict, "i")), t.re.mailto.test(n) ? n.match(t.re.mailto)[0].length : 0;} } },v = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444".split("|");g.prototype.add = function (e, r) {return this.__schemas__[e] = r, d(this), this;}, g.prototype.set = function (e) {return this.__opts__ = n(this.__opts__, e), this;}, g.prototype.test = function (e) {if (this.__text_cache__ = e, this.__index__ = -1, !e.length) return !1;var r, t, n, s, o, i, a, c;if (this.re.schema_test.test(e)) for (a = this.re.schema_search, a.lastIndex = 0; null !== (r = a.exec(e));) {if (s = this.testSchemaAt(e, r[2], a.lastIndex)) {this.__schema__ = r[2], this.__index__ = r.index + r[1].length, this.__last_index__ = r.index + r[0].length + s;break;}}return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (c = e.search(this.re.host_fuzzy_test)) >= 0 && (this.__index__ < 0 || c < this.__index__) && null !== (t = e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) && (o = t.index + t[1].length, (this.__index__ < 0 || o < this.__index__) && (this.__schema__ = "", this.__index__ = o, this.__last_index__ = t.index + t[0].length)), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && e.indexOf("@") >= 0 && null !== (n = e.match(this.re.email_fuzzy)) && (o = n.index + n[1].length, i = n.index + n[0].length, (this.__index__ < 0 || o < this.__index__ || o === this.__index__ && i > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = o, this.__last_index__ = i)), this.__index__ >= 0;}, g.prototype.pretest = function (e) {return this.re.pretest.test(e);}, g.prototype.testSchemaAt = function (e, r, t) {return this.__compiled__[r.toLowerCase()] ? this.__compiled__[r.toLowerCase()].validate(e, t, this) : 0;}, g.prototype.match = function (e) {var r = 0,t = [];this.__index__ >= 0 && this.__text_cache__ === e && (t.push(_(this, r)), r = this.__last_index__);for (var n = r ? e.slice(r) : e; this.test(n);) {t.push(_(this, r)), n = n.slice(this.__last_index__), r += this.__last_index__;}return t.length ? t : null;}, g.prototype.tlds = function (e, r) {return e = Array.isArray(e) ? e : [e], r ? (this.__tlds__ = this.__tlds__.concat(e).sort().filter(function (e, r, t) {return e !== t[r - 1];}).reverse(), d(this), this) : (this.__tlds__ = e.slice(), this.__tlds_replaced__ = !0, d(this), this);}, g.prototype.normalize = function (e) {e.schema || (e.url = "http://" + e.url), "mailto:" !== e.schema || /^mailto:/i.test(e.url) || (e.url = "mailto:" + e.url);}, g.prototype.onCompile = function () {}, r.exports = g;}, { "./lib/re": 54 }], 54: [function (e, r, t) {"use strict";r.exports = function (r) {var t = {};t.src_Any = e("uc.micro/properties/Any/regex").source, t.src_Cc = e("uc.micro/categories/Cc/regex").source, t.src_Z = e("uc.micro/categories/Z/regex").source, t.src_P = e("uc.micro/categories/P/regex").source, t.src_ZPCc = [t.src_Z, t.src_P, t.src_Cc].join("|"), t.src_ZCc = [t.src_Z, t.src_Cc].join("|");return t.src_pseudo_letter = "(?:(?![><\uFF5C]|" + t.src_ZPCc + ")" + t.src_Any + ")", t.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", t.src_auth = "(?:(?:(?!" + t.src_ZCc + "|[@/\\[\\]()]).)+@)?", t.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", t.src_host_terminator = "(?=$|[><\uFF5C]|" + t.src_ZPCc + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + t.src_ZPCc + "))", t.src_path = "(?:[/?#](?:(?!" + t.src_ZCc + "|[><\uFF5C]|[()[\\]{}.,\"'?!\\-]).|\\[(?:(?!" + t.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + t.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + t.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + t.src_ZCc + '|["]).)+\\"|\\\'(?:(?!' + t.src_ZCc + "|[']).)+\\'|\\'(?=" + t.src_pseudo_letter + "|[-]).|\\.{2,3}[a-zA-Z0-9%/]|\\.(?!" + t.src_ZCc + "|[.]).|" + (r && r["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + "\\,(?!" + t.src_ZCc + ").|\\!(?!" + t.src_ZCc + "|[!]).|\\?(?!" + t.src_ZCc + "|[?]).)+|\\/)?", t.src_email_name = '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+', t.src_xn = "xn--[a-z0-9\\-]{1,59}", t.src_domain_root = "(?:" + t.src_xn + "|" + t.src_pseudo_letter + "{1,63})", t.src_domain = "(?:" + t.src_xn + "|(?:" + t.src_pseudo_letter + ")|(?:" + t.src_pseudo_letter + "(?:-(?!-)|" + t.src_pseudo_letter + "){0,61}" + t.src_pseudo_letter + "))", t.src_host = "(?:(?:(?:(?:" + t.src_domain + ")\\.)*" + t.src_domain + "))", t.tpl_host_fuzzy = "(?:" + t.src_ip4 + "|(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%)))", t.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%))", t.src_host_strict = t.src_host + t.src_host_terminator, t.tpl_host_fuzzy_strict = t.tpl_host_fuzzy + t.src_host_terminator, t.src_host_port_strict = t.src_host + t.src_port + t.src_host_terminator, t.tpl_host_port_fuzzy_strict = t.tpl_host_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_port_no_ip_fuzzy_strict = t.tpl_host_no_ip_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + t.src_ZPCc + "|>|$))", t.tpl_email_fuzzy = "(^|[><\uFF5C]|\\(|" + t.src_ZCc + ")(" + t.src_email_name + "@" + t.tpl_host_fuzzy_strict + ")", t.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|" + t.src_ZPCc + "))((?![$+<=>^`|\uFF5C])" + t.tpl_host_port_fuzzy_strict + t.src_path + ")", t.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|" + t.src_ZPCc + "))((?![$+<=>^`|\uFF5C])" + t.tpl_host_port_no_ip_fuzzy_strict + t.src_path + ")", t;};}, {
      "uc.micro/categories/Cc/regex": 61, "uc.micro/categories/P/regex": 63, "uc.micro/categories/Z/regex": 64, "uc.micro/properties/Any/regex": 66 }], 55: [function (e, r, t) {"use strict";function n(e) {var r,t,n = o[e];if (n) return n;for (n = o[e] = [], r = 0; r < 128; r++) {t = String.fromCharCode(r), n.push(t);}for (r = 0; r < e.length; r++) {t = e.charCodeAt(r), n[t] = "%" + ("0" + t.toString(16).toUpperCase()).slice(-2);}return n;}function s(e, r) {var t;return "string" != typeof r && (r = s.defaultChars), t = n(r), e.replace(/(%[a-f0-9]{2})+/gi, function (e) {var r,n,s,o,i,a,c,l = "";for (r = 0, n = e.length; r < n; r += 3) {s = parseInt(e.slice(r + 1, r + 3), 16), s < 128 ? l += t[s] : 192 == (224 & s) && r + 3 < n && 128 == (192 & (o = parseInt(e.slice(r + 4, r + 6), 16))) ? (c = s << 6 & 1984 | 63 & o, l += c < 128 ? "\uFFFD\uFFFD" : String.fromCharCode(c), r += 3) : 224 == (240 & s) && r + 6 < n && (o = parseInt(e.slice(r + 4, r + 6), 16), i = parseInt(e.slice(r + 7, r + 9), 16), 128 == (192 & o) && 128 == (192 & i)) ? (c = s << 12 & 61440 | o << 6 & 4032 | 63 & i, l += c < 2048 || c >= 55296 && c <= 57343 ? "\uFFFD\uFFFD\uFFFD" : String.fromCharCode(c), r += 6) : 240 == (248 & s) && r + 9 < n && (o = parseInt(e.slice(r + 4, r + 6), 16), i = parseInt(e.slice(r + 7, r + 9), 16), a = parseInt(e.slice(r + 10, r + 12), 16), 128 == (192 & o) && 128 == (192 & i) && 128 == (192 & a)) ? (c = s << 18 & 1835008 | o << 12 & 258048 | i << 6 & 4032 | 63 & a, c < 65536 || c > 1114111 ? l += "\uFFFD\uFFFD\uFFFD\uFFFD" : (c -= 65536, l += String.fromCharCode(55296 + (c >> 10), 56320 + (1023 & c))), r += 9) : l += "\uFFFD";}return l;});}var o = {};s.defaultChars = ";/?:@&=+$,#", s.componentChars = "", r.exports = s;}, {}], 56: [function (e, r, t) {"use strict";function n(e) {var r,t,n = o[e];if (n) return n;for (n = o[e] = [], r = 0; r < 128; r++) {t = String.fromCharCode(r), /^[0-9a-z]$/i.test(t) ? n.push(t) : n.push("%" + ("0" + r.toString(16).toUpperCase()).slice(-2));}for (r = 0; r < e.length; r++) {n[e.charCodeAt(r)] = e[r];}return n;}function s(e, r, t) {var o,i,a,c,l,u = "";for ("string" != typeof r && (t = r, r = s.defaultChars), void 0 === t && (t = !0), l = n(r), o = 0, i = e.length; o < i; o++) {if (a = e.charCodeAt(o), t && 37 === a && o + 2 < i && /^[0-9a-f]{2}$/i.test(e.slice(o + 1, o + 3))) u += e.slice(o, o + 3), o += 2;else if (a < 128) u += l[a];else if (a >= 55296 && a <= 57343) {if (a >= 55296 && a <= 56319 && o + 1 < i && (c = e.charCodeAt(o + 1)) >= 56320 && c <= 57343) {u += encodeURIComponent(e[o] + e[o + 1]), o++;continue;}u += "%EF%BF%BD";} else u += encodeURIComponent(e[o]);}return u;}var o = {};s.defaultChars = ";/?:@&=+$,-_.!~*'()#", s.componentChars = "-_.!~*'()", r.exports = s;}, {}], 57: [function (e, r, t) {"use strict";r.exports = function (e) {var r = "";return r += e.protocol || "", r += e.slashes ? "//" : "", r += e.auth ? e.auth + "@" : "", r += e.hostname && e.hostname.indexOf(":") !== -1 ? "[" + e.hostname + "]" : e.hostname || "", r += e.port ? ":" + e.port : "", r += e.pathname || "", r += e.search || "", r += e.hash || "";};}, {}], 58: [function (e, r, t) {"use strict";r.exports.encode = e("./encode"), r.exports.decode = e("./decode"), r.exports.format = e("./format"), r.exports.parse = e("./parse");}, { "./decode": 55, "./encode": 56, "./format": 57, "./parse": 59 }], 59: [function (e, r, t) {"use strict";function n() {this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;}function s(e, r) {if (e && e instanceof n) return e;var t = new n();return t.parse(e, r), t;}var o = /^([a-z0-9.+-]+:)/i,i = /:[0-9]*$/,a = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,c = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],l = ["{", "}", "|", "\\", "^", "`"].concat(c),u = ["'"].concat(l),p = ["%", "/", "?", ";", "#"].concat(u),h = ["/", "?", "#"],f = { javascript: !0, "javascript:": !0 },d = { http: !0, https: !0, ftp: !0, gopher: !0, file: !0, "http:": !0, "https:": !0, "ftp:": !0, "gopher:": !0, "file:": !0 };n.prototype.parse = function (e, r) {var t,n,s,i,c,l = e;if (l = l.trim(), !r && 1 === e.split("#").length) {var u = a.exec(l);if (u) return this.pathname = u[1], u[2] && (this.search = u[2]), this;}var m = o.exec(l);if (m && (m = m[0], s = m.toLowerCase(), this.protocol = m, l = l.substr(m.length)), (r || m || l.match(/^\/\/[^@\/]+@[^@\/]+/)) && (!(c = "//" === l.substr(0, 2)) || m && f[m] || (l = l.substr(2), this.slashes = !0)), !f[m] && (c || m && !d[m])) {var _ = -1;for (t = 0; t < h.length; t++) {(i = l.indexOf(h[t])) !== -1 && (_ === -1 || i < _) && (_ = i);}var g, b;for (b = _ === -1 ? l.lastIndexOf("@") : l.lastIndexOf("@", _), b !== -1 && (g = l.slice(0, b), l = l.slice(b + 1), this.auth = g), _ = -1, t = 0; t < p.length; t++) {(i = l.indexOf(p[t])) !== -1 && (_ === -1 || i < _) && (_ = i);}_ === -1 && (_ = l.length), ":" === l[_ - 1] && _--;var k = l.slice(0, _);l = l.slice(_), this.parseHost(k), this.hostname = this.hostname || "";var v = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];if (!v) {var y = this.hostname.split(/\./);for (t = 0, n = y.length; t < n; t++) {var x = y[t];if (x && !x.match(/^[+a-z0-9A-Z_-]{0,63}$/)) {for (var C = "", A = 0, w = x.length; A < w; A++) {C += x.charCodeAt(A) > 127 ? "x" : x[A];}if (!C.match(/^[+a-z0-9A-Z_-]{0,63}$/)) {var D = y.slice(0, t),q = y.slice(t + 1),E = x.match(/^([+a-z0-9A-Z_-]{0,63})(.*)$/);E && (D.push(E[1]), q.unshift(E[2])), q.length && (l = q.join(".") + l), this.hostname = D.join(".");break;}}}}this.hostname.length > 255 && (this.hostname = ""), v && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));}var S = l.indexOf("#");S !== -1 && (this.hash = l.substr(S), l = l.slice(0, S));var F = l.indexOf("?");return F !== -1 && (this.search = l.substr(F), l = l.slice(0, F)), l && (this.pathname = l), d[s] && this.hostname && !this.pathname && (this.pathname = ""), this;}, n.prototype.parseHost = function (e) {var r = i.exec(e);r && (r = r[0], ":" !== r && (this.port = r.substr(1)), e = e.substr(0, e.length - r.length)), e && (this.hostname = e);}, r.exports = s;}, {}], 60: [function (r, t, n) {(function (r) {!function (s) {function o(e) {throw new RangeError(w[e]);}function i(e, r) {for (var t = e.length, n = []; t--;) {n[t] = r(e[t]);}return n;}function a(e, r) {var t = e.split("@"),n = "";return t.length > 1 && (n = t[0] + "@", e = t[1]), e = e.replace(/[\x2E\u3002\uFF0E\uFF61]/g, "."), n + i(e.split("."), r).join(".");}function c(e) {for (var r, t, n = [], s = 0, o = e.length; s < o;) {r = e.charCodeAt(s++), r >= 55296 && r <= 56319 && s < o ? (t = e.charCodeAt(s++), 56320 == (64512 & t) ? n.push(((1023 & r) << 10) + (1023 & t) + 65536) : (n.push(r), s--)) : n.push(r);}return n;}function l(e) {return i(e, function (e) {var r = "";return e > 65535 && (e -= 65536, r += q(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), r += q(e);}).join("");}function u(e) {return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : 36;}function p(e, r) {return e + 22 + 75 * (e < 26) - ((0 != r) << 5);}function h(e, r, t) {var n = 0;for (e = t ? D(e / 700) : e >> 1, e += D(e / r); e > 455; n += 36) {e = D(e / 35);}return D(n + 36 * e / (e + 38));}function f(e) {var r,t,n,s,i,a,c,p,f,d,m = [],_ = e.length,g = 0,b = 128,k = 72;for (t = e.lastIndexOf("-"), t < 0 && (t = 0), n = 0; n < t; ++n) {e.charCodeAt(n) >= 128 && o("not-basic"), m.push(e.charCodeAt(n));}for (s = t > 0 ? t + 1 : 0; s < _;) {for (i = g, a = 1, c = 36; s >= _ && o("invalid-input"), p = u(e.charCodeAt(s++)), (p >= 36 || p > D((x - g) / a)) && o("overflow"), g += p * a, f = c <= k ? 1 : c >= k + 26 ? 26 : c - k, !(p < f); c += 36) {d = 36 - f, a > D(x / d) && o("overflow"), a *= d;}r = m.length + 1, k = h(g - i, r, 0 == i), D(g / r) > x - b && o("overflow"), b += D(g / r), g %= r, m.splice(g++, 0, b);}return l(m);}function d(e) {var r,t,n,s,i,a,l,u,f,d,m,_,g,b,k,v = [];for (e = c(e), _ = e.length, r = 128, t = 0, i = 72, a = 0; a < _; ++a) {(m = e[a]) < 128 && v.push(q(m));}for (n = s = v.length, s && v.push("-"); n < _;) {for (l = x, a = 0; a < _; ++a) {(m = e[a]) >= r && m < l && (l = m);}for (g = n + 1, l - r > D((x - t) / g) && o("overflow"), t += (l - r) * g, r = l, a = 0; a < _; ++a) {if (m = e[a], m < r && ++t > x && o("overflow"), m == r) {for (u = t, f = 36; d = f <= i ? 1 : f >= i + 26 ? 26 : f - i, !(u < d); f += 36) {k = u - d, b = 36 - d, v.push(q(p(d + k % b, 0))), u = D(k / b);}v.push(q(p(u, 0))), i = h(t, g, n == s), t = 0, ++n;}}++t, ++r;}return v.join("");}function m(e) {return a(e, function (e) {return C.test(e) ? f(e.slice(4).toLowerCase()) : e;});}function _(e) {return a(e, function (e) {return A.test(e) ? "xn--" + d(e) : e;});}var g = "object" == typeof n && n && !n.nodeType && n,b = "object" == typeof t && t && !t.nodeType && t,k = "object" == typeof r && r;k.global !== k && k.window !== k && k.self !== k || (s = k);var v,y,x = 2147483647,C = /^xn--/,A = /[^\x20-\x7E]/,w = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" },D = Math.floor,q = String.fromCharCode;if (v = { version: "1.4.1", ucs2: { decode: c, encode: l }, decode: f, encode: d, toASCII: _, toUnicode: m }, "function" == typeof e && "object" == typeof e.amd && e.amd) e("punycode", function () {return v;});else if (g && b) {if (t.exports == g) b.exports = v;else for (y in v) {v.hasOwnProperty(y) && (g[y] = v[y]);}} else s.punycode = v;}(this);}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});}, {}], 61: [function (e, r, t) {r.exports = /[\0-\x1F\x7F-\x9F]/;}, {}], 62: [function (e, r, t) {r.exports = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804\uDCBD|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;}, {}], 63: [function (e, r, t) {r.exports = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E44\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;}, {}], 64: [function (e, r, t) {r.exports = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;}, {}], 65: [function (e, r, t) {"use strict";t.Any = e("./properties/Any/regex"), t.Cc = e("./categories/Cc/regex"), t.Cf = e("./categories/Cf/regex"), t.P = e("./categories/P/regex"), t.Z = e("./categories/Z/regex");}, { "./categories/Cc/regex": 61, "./categories/Cf/regex": 62, "./categories/P/regex": 63, "./categories/Z/regex": 64, "./properties/Any/regex": 66 }], 66: [function (e, r, t) {r.exports = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;}, {}], 67: [function (e, r, t) {"use strict";r.exports = e("./lib/");}, { "./lib/": 9 }] }, {}, [67])(67);});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 2)))

/***/ }),
/* 40 */
/*!**********************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/markdown/plugins/sub.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;!function (e) {if (true) module.exports = e();else { var r; }}(function () {return function e(r, o, n) {function t(i, u) {if (!o[i]) {if (!r[i]) {var f = "function" == typeof require && require;if (!u && f) return require(i, !0);if (s) return s(i, !0);var p = new Error("Cannot find module '" + i + "'");throw p.code = "MODULE_NOT_FOUND", p;}var a = o[i] = { exports: {} };r[i][0].call(a.exports, function (e) {var o = r[i][1][e];return t(o ? o : e);}, a, a.exports, e, r, o, n);}return o[i].exports;}for (var s = "function" == typeof require && require, i = 0; i < n.length; i++) {t(n[i]);}return t;}({ 1: [function (e, r) {"use strict";function o(e, r) {var o,t,s,i = e.posMax,u = e.pos;if (126 !== e.src.charCodeAt(u)) return !1;if (r) return !1;if (u + 2 >= i) return !1;for (e.pos = u + 1; e.pos < i;) {if (126 === e.src.charCodeAt(e.pos)) {o = !0;break;}e.md.inline.skipToken(e);}return o && u + 1 !== e.pos ? (t = e.src.slice(u + 1, e.pos), t.match(/(^|[^\\])(\\\\)*\s/) ? (e.pos = u, !1) : (e.posMax = e.pos, e.pos = u + 1, s = e.push("sub_open", "sub", 1), s.markup = "~", s = e.push("text", "", 0), s.content = t.replace(n, "$1"), s = e.push("sub_close", "sub", -1), s.markup = "~", e.pos = e.posMax + 1, e.posMax = i, !0)) : (e.pos = u, !1);}var n = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;r.exports = function (e) {e.inline.ruler.after("emphasis", "sub", o);};}, {}] }, {}, [1])(1);});

/***/ }),
/* 41 */
/*!**********************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/markdown/plugins/sup.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;!function (e) {if (true) module.exports = e();else { var r; }}(function () {return function e(r, o, n) {function t(i, p) {if (!o[i]) {if (!r[i]) {var u = "function" == typeof require && require;if (!p && u) return require(i, !0);if (s) return s(i, !0);var f = new Error("Cannot find module '" + i + "'");throw f.code = "MODULE_NOT_FOUND", f;}var a = o[i] = { exports: {} };r[i][0].call(a.exports, function (e) {var o = r[i][1][e];return t(o ? o : e);}, a, a.exports, e, r, o, n);}return o[i].exports;}for (var s = "function" == typeof require && require, i = 0; i < n.length; i++) {t(n[i]);}return t;}({ 1: [function (e, r) {"use strict";function o(e, r) {var o,t,s,i = e.posMax,p = e.pos;if (94 !== e.src.charCodeAt(p)) return !1;if (r) return !1;if (p + 2 >= i) return !1;for (e.pos = p + 1; e.pos < i;) {if (94 === e.src.charCodeAt(e.pos)) {o = !0;break;}e.md.inline.skipToken(e);}return o && p + 1 !== e.pos ? (t = e.src.slice(p + 1, e.pos), t.match(/(^|[^\\])(\\\\)*\s/) ? (e.pos = p, !1) : (e.posMax = e.pos, e.pos = p + 1, s = e.push("sup_open", "sup", 1), s.markup = "^", s = e.push("text", "", 0), s.content = t.replace(n, "$1"), s = e.push("sup_close", "sup", -1), s.markup = "^", e.pos = e.posMax + 1, e.posMax = i, !0)) : (e.pos = p, !1);}var n = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;r.exports = function (e) {e.inline.ruler.after("emphasis", "sup", o);};}, {}] }, {}, [1])(1);});

/***/ }),
/* 42 */
/*!**********************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/markdown/plugins/ins.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;!function (e) {if (true) module.exports = e();else { var n; }}(function () {return function e(n, t, o) {function r(s, f) {if (!t[s]) {if (!n[s]) {var u = "function" == typeof require && require;if (!f && u) return require(s, !0);if (i) return i(s, !0);var l = new Error("Cannot find module '" + s + "'");throw l.code = "MODULE_NOT_FOUND", l;}var p = t[s] = { exports: {} };n[s][0].call(p.exports, function (e) {var t = n[s][1][e];return r(t ? t : e);}, p, p.exports, e, n, t, o);}return t[s].exports;}for (var i = "function" == typeof require && require, s = 0; s < o.length; s++) {r(o[s]);}return r;}({ 1: [function (e, n, t) {"use strict";n.exports = function (e) {function n(e, n) {var t,o,r,i,s,f = e.pos,u = e.src.charCodeAt(f);if (n) return !1;if (43 !== u) return !1;if (o = e.scanDelims(e.pos, !0), i = o.length, s = String.fromCharCode(u), 2 > i) return !1;for (i % 2 && (r = e.push("text", "", 0), r.content = s, i--), t = 0; i > t; t += 2) {r = e.push("text", "", 0), r.content = s + s, e.delimiters.push({ marker: u, jump: t, token: e.tokens.length - 1, level: e.level, end: -1, open: o.can_open, close: o.can_close });}return e.pos += o.length, !0;}function t(e) {var n,t,o,r,i,s = [],f = e.delimiters,u = e.delimiters.length;for (n = 0; u > n; n++) {o = f[n], 43 === o.marker && -1 !== o.end && (r = f[o.end], i = e.tokens[o.token], i.type = "ins_open", i.tag = "ins", i.nesting = 1, i.markup = "++", i.content = "", i = e.tokens[r.token], i.type = "ins_close", i.tag = "ins", i.nesting = -1, i.markup = "++", i.content = "", "text" === e.tokens[r.token - 1].type && "+" === e.tokens[r.token - 1].content && s.push(r.token - 1));}for (; s.length;) {for (n = s.pop(), t = n + 1; t < e.tokens.length && "ins_close" === e.tokens[t].type;) {t++;}t--, n !== t && (i = e.tokens[t], e.tokens[t] = e.tokens[n], e.tokens[n] = i);}}e.inline.ruler.before("emphasis", "ins", n), e.inline.ruler2.before("emphasis", "ins", t);};}, {}] }, {}, [1])(1);});

/***/ }),
/* 43 */
/*!***********************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/markdown/plugins/mark.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;!function (e) {if (true) module.exports = e();else { var n; }}(function () {return function e(n, t, o) {function r(s, f) {if (!t[s]) {if (!n[s]) {var u = "function" == typeof require && require;if (!f && u) return require(s, !0);if (i) return i(s, !0);var l = new Error("Cannot find module '" + s + "'");throw l.code = "MODULE_NOT_FOUND", l;}var p = t[s] = { exports: {} };n[s][0].call(p.exports, function (e) {var t = n[s][1][e];return r(t ? t : e);}, p, p.exports, e, n, t, o);}return t[s].exports;}for (var i = "function" == typeof require && require, s = 0; s < o.length; s++) {r(o[s]);}return r;}({ 1: [function (e, n, t) {"use strict";n.exports = function (e) {function n(e, n) {var t,o,r,i,s,f = e.pos,u = e.src.charCodeAt(f);if (n) return !1;if (61 !== u) return !1;if (o = e.scanDelims(e.pos, !0), i = o.length, s = String.fromCharCode(u), 2 > i) return !1;for (i % 2 && (r = e.push("text", "", 0), r.content = s, i--), t = 0; i > t; t += 2) {r = e.push("text", "", 0), r.content = s + s, e.delimiters.push({ marker: u, jump: t, token: e.tokens.length - 1, level: e.level, end: -1, open: o.can_open, close: o.can_close });}return e.pos += o.length, !0;}function t(e) {var n,t,o,r,i,s = [],f = e.delimiters,u = e.delimiters.length;for (n = 0; u > n; n++) {o = f[n], 61 === o.marker && -1 !== o.end && (r = f[o.end], i = e.tokens[o.token], i.type = "mark_open", i.tag = "mark", i.nesting = 1, i.markup = "==", i.content = "", i = e.tokens[r.token], i.type = "mark_close", i.tag = "mark", i.nesting = -1, i.markup = "==", i.content = "", "text" === e.tokens[r.token - 1].type && "=" === e.tokens[r.token - 1].content && s.push(r.token - 1));}for (; s.length;) {for (n = s.pop(), t = n + 1; t < e.tokens.length && "mark_close" === e.tokens[t].type;) {t++;}t--, n !== t && (i = e.tokens[t], e.tokens[t] = e.tokens[n], e.tokens[n] = i);}}e.inline.ruler.before("emphasis", "mark", n), e.inline.ruler2.before("emphasis", "mark", t);};}, {}] }, {}, [1])(1);});

/***/ }),
/* 44 */
/*!************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/markdown/plugins/emoji.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/*! Project:无, Create:FWS 2020.01.15 14:04, Update:FWS 2020.01.15 14:04 */
!function (a) {if (true) module.exports = a();else { var e; }}(function () {return function () {function a(e, n, o) {function i(_, t) {if (!n[_]) {if (!e[_]) {var s = "function" == typeof require && require;if (!t && s) return require(_, !0);if (r) return r(_, !0);var l = new Error("Cannot find module '" + _ + "'");throw l.code = "MODULE_NOT_FOUND", l;}var c = n[_] = { exports: {} };e[_][0].call(c.exports, function (a) {return i(e[_][1][a] || a);}, c, c.exports, a, e, n, o);}return n[_].exports;}for (var r = "function" == typeof require && require, _ = 0; _ < o.length; _++) {i(o[_]);}return i;}return a;}()({ 1: [function (require, a, exports) {a.exports = { 100: "💯", 1234: "🔢", grinning: "😀", grimacing: "😬", grin: "😁", joy: "😂", rofl: "🤣", partying: "🥳", smiley: "😃", smile: "😄", sweat_smile: "😅", laughing: "😆", innocent: "😇", wink: "😉", blush: "😊", slightly_smiling_face: "🙂", upside_down_face: "🙃", relaxed: "☺️", yum: "😋", relieved: "😌", heart_eyes: "😍", smiling_face_with_three_hearts: "🥰", kissing_heart: "😘", kissing: "😗", kissing_smiling_eyes: "😙", kissing_closed_eyes: "😚", stuck_out_tongue_winking_eye: "😜", zany: "🤪", raised_eyebrow: "🤨", monocle: "🧐", stuck_out_tongue_closed_eyes: "😝", stuck_out_tongue: "😛", money_mouth_face: "🤑", nerd_face: "🤓", sunglasses: "😎", star_struck: "🤩", clown_face: "🤡", cowboy_hat_face: "🤠", hugs: "🤗", smirk: "😏", no_mouth: "😶", neutral_face: "😐", expressionless: "😑", unamused: "😒", roll_eyes: "🙄", thinking: "🤔", lying_face: "🤥", hand_over_mouth: "🤭", shushing: "🤫", symbols_over_mouth: "🤬", exploding_head: "🤯", flushed: "😳", disappointed: "😞", worried: "😟", angry: "😠", rage: "😡", pensive: "😔", confused: "😕", slightly_frowning_face: "🙁", frowning_face: "☹", persevere: "😣", confounded: "😖", tired_face: "😫", weary: "😩", pleading: "🥺", triumph: "😤", open_mouth: "😮", scream: "😱", fearful: "😨", cold_sweat: "😰", hushed: "😯", frowning: "😦", anguished: "😧", cry: "😢", disappointed_relieved: "😥", drooling_face: "🤤", sleepy: "😪", sweat: "😓", hot: "🥵", cold: "🥶", sob: "😭", dizzy_face: "😵", astonished: "😲", zipper_mouth_face: "🤐", nauseated_face: "🤢", sneezing_face: "🤧", vomiting: "🤮", mask: "😷", face_with_thermometer: "🤒", face_with_head_bandage: "🤕", woozy: "🥴", sleeping: "😴", zzz: "💤", poop: "💩", smiling_imp: "😈", imp: "👿", japanese_ogre: "👹", japanese_goblin: "👺", skull: "💀", ghost: "👻", alien: "👽", robot: "🤖", smiley_cat: "😺", smile_cat: "😸", joy_cat: "😹", heart_eyes_cat: "😻", smirk_cat: "😼", kissing_cat: "😽", scream_cat: "🙀", crying_cat_face: "😿", pouting_cat: "😾", palms_up: "🤲", raised_hands: "🙌", clap: "👏", wave: "👋", call_me_hand: "🤙", "+1": "👍", "-1": "👎", facepunch: "👊", fist: "✊", fist_left: "🤛", fist_right: "🤜", v: "✌", ok_hand: "👌", raised_hand: "✋", raised_back_of_hand: "🤚", open_hands: "👐", muscle: "💪", pray: "🙏", foot: "🦶", leg: "🦵", handshake: "🤝", point_up: "☝", point_up_2: "👆", point_down: "👇", point_left: "👈", point_right: "👉", fu: "🖕", raised_hand_with_fingers_splayed: "🖐", love_you: "🤟", metal: "🤘", crossed_fingers: "🤞", vulcan_salute: "🖖", writing_hand: "✍", selfie: "🤳", nail_care: "💅", lips: "👄", tooth: "🦷", tongue: "👅", ear: "👂", nose: "👃", eye: "👁", eyes: "👀", brain: "🧠", bust_in_silhouette: "👤", busts_in_silhouette: "👥", speaking_head: "🗣", baby: "👶", child: "🧒", boy: "👦", girl: "👧", adult: "🧑", man: "👨", woman: "👩", blonde_woman: "👱‍♀️", blonde_man: "👱", bearded_person: "🧔", older_adult: "🧓", older_man: "👴", older_woman: "👵", man_with_gua_pi_mao: "👲", woman_with_headscarf: "🧕", woman_with_turban: "👳‍♀️", man_with_turban: "👳", policewoman: "👮‍♀️", policeman: "👮", construction_worker_woman: "👷‍♀️", construction_worker_man: "👷", guardswoman: "💂‍♀️", guardsman: "💂", female_detective: "🕵️‍♀️", male_detective: "🕵", woman_health_worker: "👩‍⚕️", man_health_worker: "👨‍⚕️", woman_farmer: "👩‍🌾", man_farmer: "👨‍🌾", woman_cook: "👩‍🍳", man_cook: "👨‍🍳", woman_student: "👩‍🎓", man_student: "👨‍🎓", woman_singer: "👩‍🎤", man_singer: "👨‍🎤", woman_teacher: "👩‍🏫", man_teacher: "👨‍🏫", woman_factory_worker: "👩‍🏭", man_factory_worker: "👨‍🏭", woman_technologist: "👩‍💻", man_technologist: "👨‍💻", woman_office_worker: "👩‍💼", man_office_worker: "👨‍💼", woman_mechanic: "👩‍🔧", man_mechanic: "👨‍🔧", woman_scientist: "👩‍🔬", man_scientist: "👨‍🔬", woman_artist: "👩‍🎨", man_artist: "👨‍🎨", woman_firefighter: "👩‍🚒", man_firefighter: "👨‍🚒", woman_pilot: "👩‍✈️", man_pilot: "👨‍✈️", woman_astronaut: "👩‍🚀", man_astronaut: "👨‍🚀", woman_judge: "👩‍⚖️", man_judge: "👨‍⚖️", woman_superhero: "🦸‍♀️", man_superhero: "🦸‍♂️", woman_supervillain: "🦹‍♀️", man_supervillain: "🦹‍♂️", mrs_claus: "🤶", santa: "🎅", sorceress: "🧙‍♀️", wizard: "🧙‍♂️", woman_elf: "🧝‍♀️", man_elf: "🧝‍♂️", woman_vampire: "🧛‍♀️", man_vampire: "🧛‍♂️", woman_zombie: "🧟‍♀️", man_zombie: "🧟‍♂️", woman_genie: "🧞‍♀️", man_genie: "🧞‍♂️", mermaid: "🧜‍♀️", merman: "🧜‍♂️", woman_fairy: "🧚‍♀️", man_fairy: "🧚‍♂️", angel: "👼", pregnant_woman: "🤰", breastfeeding: "🤱", princess: "👸", prince: "🤴", bride_with_veil: "👰", man_in_tuxedo: "🤵", running_woman: "🏃‍♀️", running_man: "🏃", walking_woman: "🚶‍♀️", walking_man: "🚶", dancer: "💃", man_dancing: "🕺", dancing_women: "👯", dancing_men: "👯‍♂️", couple: "👫", two_men_holding_hands: "👬", two_women_holding_hands: "👭", bowing_woman: "🙇‍♀️", bowing_man: "🙇", man_facepalming: "🤦‍♂️", woman_facepalming: "🤦‍♀️", woman_shrugging: "🤷", man_shrugging: "🤷‍♂️", tipping_hand_woman: "💁", tipping_hand_man: "💁‍♂️", no_good_woman: "🙅", no_good_man: "🙅‍♂️", ok_woman: "🙆", ok_man: "🙆‍♂️", raising_hand_woman: "🙋", raising_hand_man: "🙋‍♂️", pouting_woman: "🙎", pouting_man: "🙎‍♂️", frowning_woman: "🙍", frowning_man: "🙍‍♂️", haircut_woman: "💇", haircut_man: "💇‍♂️", massage_woman: "💆", massage_man: "💆‍♂️", woman_in_steamy_room: "🧖‍♀️", man_in_steamy_room: "🧖‍♂️", couple_with_heart_woman_man: "💑", couple_with_heart_woman_woman: "👩‍❤️‍👩", couple_with_heart_man_man: "👨‍❤️‍👨", couplekiss_man_woman: "💏", couplekiss_woman_woman: "👩‍❤️‍💋‍👩", couplekiss_man_man: "👨‍❤️‍💋‍👨", family_man_woman_boy: "👪", family_man_woman_girl: "👨‍👩‍👧", family_man_woman_girl_boy: "👨‍👩‍👧‍👦", family_man_woman_boy_boy: "👨‍👩‍👦‍👦", family_man_woman_girl_girl: "👨‍👩‍👧‍👧", family_woman_woman_boy: "👩‍👩‍👦", family_woman_woman_girl: "👩‍👩‍👧", family_woman_woman_girl_boy: "👩‍👩‍👧‍👦", family_woman_woman_boy_boy: "👩‍👩‍👦‍👦", family_woman_woman_girl_girl: "👩‍👩‍👧‍👧", family_man_man_boy: "👨‍👨‍👦", family_man_man_girl: "👨‍👨‍👧", family_man_man_girl_boy: "👨‍👨‍👧‍👦", family_man_man_boy_boy: "👨‍👨‍👦‍👦", family_man_man_girl_girl: "👨‍👨‍👧‍👧", family_woman_boy: "👩‍👦", family_woman_girl: "👩‍👧", family_woman_girl_boy: "👩‍👧‍👦", family_woman_boy_boy: "👩‍👦‍👦", family_woman_girl_girl: "👩‍👧‍👧", family_man_boy: "👨‍👦", family_man_girl: "👨‍👧", family_man_girl_boy: "👨‍👧‍👦", family_man_boy_boy: "👨‍👦‍👦", family_man_girl_girl: "👨‍👧‍👧", yarn: "🧶", thread: "🧵", coat: "🧥", labcoat: "🥼", womans_clothes: "👚", tshirt: "👕", jeans: "👖", necktie: "👔", dress: "👗", bikini: "👙", kimono: "👘", lipstick: "💄", kiss: "💋", footprints: "👣", flat_shoe: "🥿", high_heel: "👠", sandal: "👡", boot: "👢", mans_shoe: "👞", athletic_shoe: "👟", hiking_boot: "🥾", socks: "🧦", gloves: "🧤", scarf: "🧣", womans_hat: "👒", tophat: "🎩", billed_hat: "🧢", rescue_worker_helmet: "⛑", mortar_board: "🎓", crown: "👑", school_satchel: "🎒", luggage: "🧳", pouch: "👝", purse: "👛", handbag: "👜", briefcase: "💼", eyeglasses: "👓", dark_sunglasses: "🕶", goggles: "🥽", ring: "💍", closed_umbrella: "🌂", dog: "🐶", cat: "🐱", mouse: "🐭", hamster: "🐹", rabbit: "🐰", fox_face: "🦊", bear: "🐻", panda_face: "🐼", koala: "🐨", tiger: "🐯", lion: "🦁", cow: "🐮", pig: "🐷", pig_nose: "🐽", frog: "🐸", squid: "🦑", octopus: "🐙", shrimp: "🦐", monkey_face: "🐵", gorilla: "🦍", see_no_evil: "🙈", hear_no_evil: "🙉", speak_no_evil: "🙊", monkey: "🐒", chicken: "🐔", penguin: "🐧", bird: "🐦", baby_chick: "🐤", hatching_chick: "🐣", hatched_chick: "🐥", duck: "🦆", eagle: "🦅", owl: "🦉", bat: "🦇", wolf: "🐺", boar: "🐗", horse: "🐴", unicorn: "🦄", honeybee: "🐝", bug: "🐛", butterfly: "🦋", snail: "🐌", beetle: "🐞", ant: "🐜", grasshopper: "🦗", spider: "🕷", scorpion: "🦂", crab: "🦀", snake: "🐍", lizard: "🦎", "t-rex": "🦖", sauropod: "🦕", turtle: "🐢", tropical_fish: "🐠", fish: "🐟", blowfish: "🐡", dolphin: "🐬", shark: "🦈", whale: "🐳", whale2: "🐋", crocodile: "🐊", leopard: "🐆", zebra: "🦓", tiger2: "🐅", water_buffalo: "🐃", ox: "🐂", cow2: "🐄", deer: "🦌", dromedary_camel: "🐪", camel: "🐫", giraffe: "🦒", elephant: "🐘", rhinoceros: "🦏", goat: "🐐", ram: "🐏", sheep: "🐑", racehorse: "🐎", pig2: "🐖", rat: "🐀", mouse2: "🐁", rooster: "🐓", turkey: "🦃", dove: "🕊", dog2: "🐕", poodle: "🐩", cat2: "🐈", rabbit2: "🐇", chipmunk: "🐿", hedgehog: "🦔", raccoon: "🦝", llama: "🦙", hippopotamus: "🦛", kangaroo: "🦘", badger: "🦡", swan: "🦢", peacock: "🦚", parrot: "🦜", lobster: "🦞", mosquito: "🦟", paw_prints: "🐾", dragon: "🐉", dragon_face: "🐲", cactus: "🌵", christmas_tree: "🎄", evergreen_tree: "🌲", deciduous_tree: "🌳", palm_tree: "🌴", seedling: "🌱", herb: "🌿", shamrock: "☘", four_leaf_clover: "🍀", bamboo: "🎍", tanabata_tree: "🎋", leaves: "🍃", fallen_leaf: "🍂", maple_leaf: "🍁", ear_of_rice: "🌾", hibiscus: "🌺", sunflower: "🌻", rose: "🌹", wilted_flower: "🥀", tulip: "🌷", blossom: "🌼", cherry_blossom: "🌸", bouquet: "💐", mushroom: "🍄", chestnut: "🌰", jack_o_lantern: "🎃", shell: "🐚", spider_web: "🕸", earth_americas: "🌎", earth_africa: "🌍", earth_asia: "🌏", full_moon: "🌕", waning_gibbous_moon: "🌖", last_quarter_moon: "🌗", waning_crescent_moon: "🌘", new_moon: "🌑", waxing_crescent_moon: "🌒", first_quarter_moon: "🌓", waxing_gibbous_moon: "🌔", new_moon_with_face: "🌚", full_moon_with_face: "🌝", first_quarter_moon_with_face: "🌛", last_quarter_moon_with_face: "🌜", sun_with_face: "🌞", crescent_moon: "🌙", star: "⭐", star2: "🌟", dizzy: "💫", sparkles: "✨", comet: "☄", sunny: "☀️", sun_behind_small_cloud: "🌤", partly_sunny: "⛅", sun_behind_large_cloud: "🌥", sun_behind_rain_cloud: "🌦", cloud: "☁️", cloud_with_rain: "🌧", cloud_with_lightning_and_rain: "⛈", cloud_with_lightning: "🌩", zap: "⚡", fire: "🔥", boom: "💥", snowflake: "❄️", cloud_with_snow: "🌨", snowman: "⛄", snowman_with_snow: "☃", wind_face: "🌬", dash: "💨", tornado: "🌪", fog: "🌫", open_umbrella: "☂", umbrella: "☔", droplet: "💧", sweat_drops: "💦", ocean: "🌊", green_apple: "🍏", apple: "🍎", pear: "🍐", tangerine: "🍊", lemon: "🍋", banana: "🍌", watermelon: "🍉", grapes: "🍇", strawberry: "🍓", melon: "🍈", cherries: "🍒", peach: "🍑", pineapple: "🍍", coconut: "🥥", kiwi_fruit: "🥝", mango: "🥭", avocado: "🥑", broccoli: "🥦", tomato: "🍅", eggplant: "🍆", cucumber: "🥒", carrot: "🥕", hot_pepper: "🌶", potato: "🥔", corn: "🌽", leafy_greens: "🥬", sweet_potato: "🍠", peanuts: "🥜", honey_pot: "🍯", croissant: "🥐", bread: "🍞", baguette_bread: "🥖", bagel: "🥯", pretzel: "🥨", cheese: "🧀", egg: "🥚", bacon: "🥓", steak: "🥩", pancakes: "🥞", poultry_leg: "🍗", meat_on_bone: "🍖", bone: "🦴", fried_shrimp: "🍤", fried_egg: "🍳", hamburger: "🍔", fries: "🍟", stuffed_flatbread: "🥙", hotdog: "🌭", pizza: "🍕", sandwich: "🥪", canned_food: "🥫", spaghetti: "🍝", taco: "🌮", burrito: "🌯", green_salad: "🥗", shallow_pan_of_food: "🥘", ramen: "🍜", stew: "🍲", fish_cake: "🍥", fortune_cookie: "🥠", sushi: "🍣", bento: "🍱", curry: "🍛", rice_ball: "🍙", rice: "🍚", rice_cracker: "🍘", oden: "🍢", dango: "🍡", shaved_ice: "🍧", ice_cream: "🍨", icecream: "🍦", pie: "🥧", cake: "🍰", cupcake: "🧁", moon_cake: "🥮", birthday: "🎂", custard: "🍮", candy: "🍬", lollipop: "🍭", chocolate_bar: "🍫", popcorn: "🍿", dumpling: "🥟", doughnut: "🍩", cookie: "🍪", milk_glass: "🥛", beer: "🍺", beers: "🍻", clinking_glasses: "🥂", wine_glass: "🍷", tumbler_glass: "🥃", cocktail: "🍸", tropical_drink: "🍹", champagne: "🍾", sake: "🍶", tea: "🍵", cup_with_straw: "🥤", coffee: "☕", baby_bottle: "🍼", salt: "🧂", spoon: "🥄", fork_and_knife: "🍴", plate_with_cutlery: "🍽", bowl_with_spoon: "🥣", takeout_box: "🥡", chopsticks: "🥢", soccer: "⚽", basketball: "🏀", football: "🏈", baseball: "⚾", softball: "🥎", tennis: "🎾", volleyball: "🏐", rugby_football: "🏉", flying_disc: "🥏", "8ball": "🎱", golf: "⛳", golfing_woman: "🏌️‍♀️", golfing_man: "🏌", ping_pong: "🏓", badminton: "🏸", goal_net: "🥅", ice_hockey: "🏒", field_hockey: "🏑", lacrosse: "🥍", cricket: "🏏", ski: "🎿", skier: "⛷", snowboarder: "🏂", person_fencing: "🤺", women_wrestling: "🤼‍♀️", men_wrestling: "🤼‍♂️", woman_cartwheeling: "🤸‍♀️", man_cartwheeling: "🤸‍♂️", woman_playing_handball: "🤾‍♀️", man_playing_handball: "🤾‍♂️", ice_skate: "⛸", curling_stone: "🥌", skateboard: "🛹", sled: "🛷", bow_and_arrow: "🏹", fishing_pole_and_fish: "🎣", boxing_glove: "🥊", martial_arts_uniform: "🥋", rowing_woman: "🚣‍♀️", rowing_man: "🚣", climbing_woman: "🧗‍♀️", climbing_man: "🧗‍♂️", swimming_woman: "🏊‍♀️", swimming_man: "🏊", woman_playing_water_polo: "🤽‍♀️", man_playing_water_polo: "🤽‍♂️", woman_in_lotus_position: "🧘‍♀️", man_in_lotus_position: "🧘‍♂️", surfing_woman: "🏄‍♀️", surfing_man: "🏄", bath: "🛀", basketball_woman: "⛹️‍♀️", basketball_man: "⛹", weight_lifting_woman: "🏋️‍♀️", weight_lifting_man: "🏋", biking_woman: "🚴‍♀️", biking_man: "🚴", mountain_biking_woman: "🚵‍♀️", mountain_biking_man: "🚵", horse_racing: "🏇", business_suit_levitating: "🕴", trophy: "🏆", running_shirt_with_sash: "🎽", medal_sports: "🏅", medal_military: "🎖", "1st_place_medal": "🥇", "2nd_place_medal": "🥈", "3rd_place_medal": "🥉", reminder_ribbon: "🎗", rosette: "🏵", ticket: "🎫", tickets: "🎟", performing_arts: "🎭", art: "🎨", circus_tent: "🎪", woman_juggling: "🤹‍♀️", man_juggling: "🤹‍♂️", microphone: "🎤", headphones: "🎧", musical_score: "🎼", musical_keyboard: "🎹", drum: "🥁", saxophone: "🎷", trumpet: "🎺", guitar: "🎸", violin: "🎻", clapper: "🎬", video_game: "🎮", space_invader: "👾", dart: "🎯", game_die: "🎲", chess_pawn: "♟", slot_machine: "🎰", jigsaw: "🧩", bowling: "🎳", red_car: "🚗", taxi: "🚕", blue_car: "🚙", bus: "🚌", trolleybus: "🚎", racing_car: "🏎", police_car: "🚓", ambulance: "🚑", fire_engine: "🚒", minibus: "🚐", truck: "🚚", articulated_lorry: "🚛", tractor: "🚜", kick_scooter: "🛴", motorcycle: "🏍", bike: "🚲", motor_scooter: "🛵", rotating_light: "🚨", oncoming_police_car: "🚔", oncoming_bus: "🚍", oncoming_automobile: "🚘", oncoming_taxi: "🚖", aerial_tramway: "🚡", mountain_cableway: "🚠", suspension_railway: "🚟", railway_car: "🚃", train: "🚋", monorail: "🚝", bullettrain_side: "🚄", bullettrain_front: "🚅", light_rail: "🚈", mountain_railway: "🚞", steam_locomotive: "🚂", train2: "🚆", metro: "🚇", tram: "🚊", station: "🚉", flying_saucer: "🛸", helicopter: "🚁", small_airplane: "🛩", airplane: "✈️", flight_departure: "🛫", flight_arrival: "🛬", sailboat: "⛵", motor_boat: "🛥", speedboat: "🚤", ferry: "⛴", passenger_ship: "🛳", rocket: "🚀", artificial_satellite: "🛰", seat: "💺", canoe: "🛶", anchor: "⚓", construction: "🚧", fuelpump: "⛽", busstop: "🚏", vertical_traffic_light: "🚦", traffic_light: "🚥", checkered_flag: "🏁", ship: "🚢", ferris_wheel: "🎡", roller_coaster: "🎢", carousel_horse: "🎠", building_construction: "🏗", foggy: "🌁", tokyo_tower: "🗼", factory: "🏭", fountain: "⛲", rice_scene: "🎑", mountain: "⛰", mountain_snow: "🏔", mount_fuji: "🗻", volcano: "🌋", japan: "🗾", camping: "🏕", tent: "⛺", national_park: "🏞", motorway: "🛣", railway_track: "🛤", sunrise: "🌅", sunrise_over_mountains: "🌄", desert: "🏜", beach_umbrella: "🏖", desert_island: "🏝", city_sunrise: "🌇", city_sunset: "🌆", cityscape: "🏙", night_with_stars: "🌃", bridge_at_night: "🌉", milky_way: "🌌", stars: "🌠", sparkler: "🎇", fireworks: "🎆", rainbow: "🌈", houses: "🏘", european_castle: "🏰", japanese_castle: "🏯", stadium: "🏟", statue_of_liberty: "🗽", house: "🏠", house_with_garden: "🏡", derelict_house: "🏚", office: "🏢", department_store: "🏬", post_office: "🏣", european_post_office: "🏤", hospital: "🏥", bank: "🏦", hotel: "🏨", convenience_store: "🏪", school: "🏫", love_hotel: "🏩", wedding: "💒", classical_building: "🏛", church: "⛪", mosque: "🕌", synagogue: "🕍", kaaba: "🕋", shinto_shrine: "⛩", watch: "⌚", iphone: "📱", calling: "📲", computer: "💻", keyboard: "⌨", desktop_computer: "🖥", printer: "🖨", computer_mouse: "🖱", trackball: "🖲", joystick: "🕹", clamp: "🗜", minidisc: "💽", floppy_disk: "💾", cd: "💿", dvd: "📀", vhs: "📼", camera: "📷", camera_flash: "📸", video_camera: "📹", movie_camera: "🎥", film_projector: "📽", film_strip: "🎞", telephone_receiver: "📞", phone: "☎️", pager: "📟", fax: "📠", tv: "📺", radio: "📻", studio_microphone: "🎙", level_slider: "🎚", control_knobs: "🎛", compass: "🧭", stopwatch: "⏱", timer_clock: "⏲", alarm_clock: "⏰", mantelpiece_clock: "🕰", hourglass_flowing_sand: "⏳", hourglass: "⌛", satellite: "📡", battery: "🔋", electric_plug: "🔌", bulb: "💡", flashlight: "🔦", candle: "🕯", fire_extinguisher: "🧯", wastebasket: "🗑", oil_drum: "🛢", money_with_wings: "💸", dollar: "💵", yen: "💴", euro: "💶", pound: "💷", moneybag: "💰", credit_card: "💳", gem: "💎", balance_scale: "⚖", toolbox: "🧰", wrench: "🔧", hammer: "🔨", hammer_and_pick: "⚒", hammer_and_wrench: "🛠", pick: "⛏", nut_and_bolt: "🔩", gear: "⚙", brick: "🧱", chains: "⛓", magnet: "🧲", gun: "🔫", bomb: "💣", firecracker: "🧨", hocho: "🔪", dagger: "🗡", crossed_swords: "⚔", shield: "🛡", smoking: "🚬", skull_and_crossbones: "☠", coffin: "⚰", funeral_urn: "⚱", amphora: "🏺", crystal_ball: "🔮", prayer_beads: "📿", nazar_amulet: "🧿", barber: "💈", alembic: "⚗", telescope: "🔭", microscope: "🔬", hole: "🕳", pill: "💊", syringe: "💉", dna: "🧬", microbe: "🦠", petri_dish: "🧫", test_tube: "🧪", thermometer: "🌡", broom: "🧹", basket: "🧺", toilet_paper: "🧻", label: "🏷", bookmark: "🔖", toilet: "🚽", shower: "🚿", bathtub: "🛁", soap: "🧼", sponge: "🧽", lotion_bottle: "🧴", key: "🔑", old_key: "🗝", couch_and_lamp: "🛋", sleeping_bed: "🛌", bed: "🛏", door: "🚪", bellhop_bell: "🛎", teddy_bear: "🧸", framed_picture: "🖼", world_map: "🗺", parasol_on_ground: "⛱", moyai: "🗿", shopping: "🛍", shopping_cart: "🛒", balloon: "🎈", flags: "🎏", ribbon: "🎀", gift: "🎁", confetti_ball: "🎊", tada: "🎉", dolls: "🎎", wind_chime: "🎐", crossed_flags: "🎌", izakaya_lantern: "🏮", red_envelope: "🧧", email: "✉️", envelope_with_arrow: "📩", incoming_envelope: "📨", "e-mail": "📧", love_letter: "💌", postbox: "📮", mailbox_closed: "📪", mailbox: "📫", mailbox_with_mail: "📬", mailbox_with_no_mail: "📭", package: "📦", postal_horn: "📯", inbox_tray: "📥", outbox_tray: "📤", scroll: "📜", page_with_curl: "📃", bookmark_tabs: "📑", receipt: "🧾", bar_chart: "📊", chart_with_upwards_trend: "📈", chart_with_downwards_trend: "📉", page_facing_up: "📄", date: "📅", calendar: "📆", spiral_calendar: "🗓", card_index: "📇", card_file_box: "🗃", ballot_box: "🗳", file_cabinet: "🗄", clipboard: "📋", spiral_notepad: "🗒", file_folder: "📁", open_file_folder: "📂", card_index_dividers: "🗂", newspaper_roll: "🗞", newspaper: "📰", notebook: "📓", closed_book: "📕", green_book: "📗", blue_book: "📘", orange_book: "📙", notebook_with_decorative_cover: "📔", ledger: "📒", books: "📚", open_book: "📖", safety_pin: "🧷", link: "🔗", paperclip: "📎", paperclips: "🖇", scissors: "✂️", triangular_ruler: "📐", straight_ruler: "📏", abacus: "🧮", pushpin: "📌", round_pushpin: "📍", triangular_flag_on_post: "🚩", white_flag: "🏳", black_flag: "🏴", rainbow_flag: "🏳️‍🌈", closed_lock_with_key: "🔐", lock: "🔒", unlock: "🔓", lock_with_ink_pen: "🔏", pen: "🖊", fountain_pen: "🖋", black_nib: "✒️", memo: "📝", pencil2: "✏️", crayon: "🖍", paintbrush: "🖌", mag: "🔍", mag_right: "🔎", heart: "❤️", orange_heart: "🧡", yellow_heart: "💛", green_heart: "💚", blue_heart: "💙", purple_heart: "💜", black_heart: "🖤", broken_heart: "💔", heavy_heart_exclamation: "❣", two_hearts: "💕", revolving_hearts: "💞", heartbeat: "💓", heartpulse: "💗", sparkling_heart: "💖", cupid: "💘", gift_heart: "💝", heart_decoration: "💟", peace_symbol: "☮", latin_cross: "✝", star_and_crescent: "☪", om: "🕉", wheel_of_dharma: "☸", star_of_david: "✡", six_pointed_star: "🔯", menorah: "🕎", yin_yang: "☯", orthodox_cross: "☦", place_of_worship: "🛐", ophiuchus: "⛎", aries: "♈", taurus: "♉", gemini: "♊", cancer: "♋", leo: "♌", virgo: "♍", libra: "♎", scorpius: "♏", sagittarius: "♐", capricorn: "♑", aquarius: "♒", pisces: "♓", id: "🆔", atom_symbol: "⚛", u7a7a: "🈳", u5272: "🈹", radioactive: "☢", biohazard: "☣", mobile_phone_off: "📴", vibration_mode: "📳", u6709: "🈶", u7121: "🈚", u7533: "🈸", u55b6: "🈺", u6708: "🈷️", eight_pointed_black_star: "✴️", vs: "🆚", accept: "🉑", white_flower: "💮", ideograph_advantage: "🉐", secret: "㊙️", congratulations: "㊗️", u5408: "🈴", u6e80: "🈵", u7981: "🈲", a: "🅰️", b: "🅱️", ab: "🆎", cl: "🆑", o2: "🅾️", sos: "🆘", no_entry: "⛔", name_badge: "📛", no_entry_sign: "🚫", x: "❌", o: "⭕", stop_sign: "🛑", anger: "💢", hotsprings: "♨️", no_pedestrians: "🚷", do_not_litter: "🚯", no_bicycles: "🚳", "non-potable_water": "🚱", underage: "🔞", no_mobile_phones: "📵", exclamation: "❗", grey_exclamation: "❕", question: "❓", grey_question: "❔", bangbang: "‼️", interrobang: "⁉️", low_brightness: "🔅", high_brightness: "🔆", trident: "🔱", fleur_de_lis: "⚜", part_alternation_mark: "〽️", warning: "⚠️", children_crossing: "🚸", beginner: "🔰", recycle: "♻️", u6307: "🈯", chart: "💹", sparkle: "❇️", eight_spoked_asterisk: "✳️", negative_squared_cross_mark: "❎", white_check_mark: "✅", diamond_shape_with_a_dot_inside: "💠", cyclone: "🌀", loop: "➿", globe_with_meridians: "🌐", m: "Ⓜ️", atm: "🏧", sa: "🈂️", passport_control: "🛂", customs: "🛃", baggage_claim: "🛄", left_luggage: "🛅", wheelchair: "♿", no_smoking: "🚭", wc: "🚾", parking: "🅿️", potable_water: "🚰", mens: "🚹", womens: "🚺", baby_symbol: "🚼", restroom: "🚻", put_litter_in_its_place: "🚮", cinema: "🎦", signal_strength: "📶", koko: "🈁", ng: "🆖", ok: "🆗", up: "🆙", cool: "🆒", new: "🆕", free: "🆓", zero: "0️⃣", one: "1️⃣", two: "2️⃣", three: "3️⃣", four: "4️⃣", five: "5️⃣", six: "6️⃣", seven: "7️⃣", eight: "8️⃣", nine: "9️⃣", keycap_ten: "🔟", asterisk: "*⃣", eject_button: "⏏️", arrow_forward: "▶️", pause_button: "⏸", next_track_button: "⏭", stop_button: "⏹", record_button: "⏺", play_or_pause_button: "⏯", previous_track_button: "⏮", fast_forward: "⏩", rewind: "⏪", twisted_rightwards_arrows: "🔀", repeat: "🔁", repeat_one: "🔂", arrow_backward: "◀️", arrow_up_small: "🔼", arrow_down_small: "🔽", arrow_double_up: "⏫", arrow_double_down: "⏬", arrow_right: "➡️", arrow_left: "⬅️", arrow_up: "⬆️", arrow_down: "⬇️", arrow_upper_right: "↗️", arrow_lower_right: "↘️", arrow_lower_left: "↙️", arrow_upper_left: "↖️", arrow_up_down: "↕️", left_right_arrow: "↔️", arrows_counterclockwise: "🔄", arrow_right_hook: "↪️", leftwards_arrow_with_hook: "↩️", arrow_heading_up: "⤴️", arrow_heading_down: "⤵️", hash: "#️⃣", information_source: "ℹ️", abc: "🔤", abcd: "🔡", capital_abcd: "🔠", symbols: "🔣", musical_note: "🎵", notes: "🎶", wavy_dash: "〰️", curly_loop: "➰", heavy_check_mark: "✔️", arrows_clockwise: "🔃", heavy_plus_sign: "➕", heavy_minus_sign: "➖", heavy_division_sign: "➗", heavy_multiplication_x: "✖️", infinity: "♾", heavy_dollar_sign: "💲", currency_exchange: "💱", copyright: "©️", registered: "®️", tm: "™️", end: "🔚", back: "🔙", on: "🔛", top: "🔝", soon: "🔜", ballot_box_with_check: "☑️", radio_button: "🔘", white_circle: "⚪", black_circle: "⚫", red_circle: "🔴", large_blue_circle: "🔵", small_orange_diamond: "🔸", small_blue_diamond: "🔹", large_orange_diamond: "🔶", large_blue_diamond: "🔷", small_red_triangle: "🔺", black_small_square: "▪️", white_small_square: "▫️", black_large_square: "⬛", white_large_square: "⬜", small_red_triangle_down: "🔻", black_medium_square: "◼️", white_medium_square: "◻️", black_medium_small_square: "◾", white_medium_small_square: "◽", black_square_button: "🔲", white_square_button: "🔳", speaker: "🔈", sound: "🔉", loud_sound: "🔊", mute: "🔇", mega: "📣", loudspeaker: "📢", bell: "🔔", no_bell: "🔕", black_joker: "🃏", mahjong: "🀄", spades: "♠️", clubs: "♣️", hearts: "♥️", diamonds: "♦️", flower_playing_cards: "🎴", thought_balloon: "💭", right_anger_bubble: "🗯", speech_balloon: "💬", left_speech_bubble: "🗨", clock1: "🕐", clock2: "🕑", clock3: "🕒", clock4: "🕓", clock5: "🕔", clock6: "🕕", clock7: "🕖", clock8: "🕗", clock9: "🕘", clock10: "🕙", clock11: "🕚", clock12: "🕛", clock130: "🕜", clock230: "🕝", clock330: "🕞", clock430: "🕟", clock530: "🕠", clock630: "🕡", clock730: "🕢", clock830: "🕣", clock930: "🕤", clock1030: "🕥", clock1130: "🕦", clock1230: "🕧", afghanistan: "🇦🇫", aland_islands: "🇦🇽", albania: "🇦🇱", algeria: "🇩🇿", american_samoa: "🇦🇸", andorra: "🇦🇩", angola: "🇦🇴", anguilla: "🇦🇮", antarctica: "🇦🇶", antigua_barbuda: "🇦🇬", argentina: "🇦🇷", armenia: "🇦🇲", aruba: "🇦🇼", australia: "🇦🇺", austria: "🇦🇹", azerbaijan: "🇦🇿", bahamas: "🇧🇸", bahrain: "🇧🇭", bangladesh: "🇧🇩", barbados: "🇧🇧", belarus: "🇧🇾", belgium: "🇧🇪", belize: "🇧🇿", benin: "🇧🇯", bermuda: "🇧🇲", bhutan: "🇧🇹", bolivia: "🇧🇴", caribbean_netherlands: "🇧🇶", bosnia_herzegovina: "🇧🇦", botswana: "🇧🇼", brazil: "🇧🇷", british_indian_ocean_territory: "🇮🇴", british_virgin_islands: "🇻🇬", brunei: "🇧🇳", bulgaria: "🇧🇬", burkina_faso: "🇧🇫", burundi: "🇧🇮", cape_verde: "🇨🇻", cambodia: "🇰🇭", cameroon: "🇨🇲", canada: "🇨🇦", canary_islands: "🇮🇨", cayman_islands: "🇰🇾", central_african_republic: "🇨🇫", chad: "🇹🇩", chile: "🇨🇱", cn: "🇨🇳", christmas_island: "🇨🇽", cocos_islands: "🇨🇨", colombia: "🇨🇴", comoros: "🇰🇲", congo_brazzaville: "🇨🇬", congo_kinshasa: "🇨🇩", cook_islands: "🇨🇰", costa_rica: "🇨🇷", croatia: "🇭🇷", cuba: "🇨🇺", curacao: "🇨🇼", cyprus: "🇨🇾", czech_republic: "🇨🇿", denmark: "🇩🇰", djibouti: "🇩🇯", dominica: "🇩🇲", dominican_republic: "🇩🇴", ecuador: "🇪🇨", egypt: "🇪🇬", el_salvador: "🇸🇻", equatorial_guinea: "🇬🇶", eritrea: "🇪🇷", estonia: "🇪🇪", ethiopia: "🇪🇹", eu: "🇪🇺", falkland_islands: "🇫🇰", faroe_islands: "🇫🇴", fiji: "🇫🇯", finland: "🇫🇮", fr: "🇫🇷", french_guiana: "🇬🇫", french_polynesia: "🇵🇫", french_southern_territories: "🇹🇫", gabon: "🇬🇦", gambia: "🇬🇲", georgia: "🇬🇪", de: "🇩🇪", ghana: "🇬🇭", gibraltar: "🇬🇮", greece: "🇬🇷", greenland: "🇬🇱", grenada: "🇬🇩", guadeloupe: "🇬🇵", guam: "🇬🇺", guatemala: "🇬🇹", guernsey: "🇬🇬", guinea: "🇬🇳", guinea_bissau: "🇬🇼", guyana: "🇬🇾", haiti: "🇭🇹", honduras: "🇭🇳", hong_kong: "🇭🇰", hungary: "🇭🇺", iceland: "🇮🇸", india: "🇮🇳", indonesia: "🇮🇩", iran: "🇮🇷", iraq: "🇮🇶", ireland: "🇮🇪", isle_of_man: "🇮🇲", israel: "🇮🇱", it: "🇮🇹", cote_divoire: "🇨🇮", jamaica: "🇯🇲", jp: "🇯🇵", jersey: "🇯🇪", jordan: "🇯🇴", kazakhstan: "🇰🇿", kenya: "🇰🇪", kiribati: "🇰🇮", kosovo: "🇽🇰", kuwait: "🇰🇼", kyrgyzstan: "🇰🇬", laos: "🇱🇦", latvia: "🇱🇻", lebanon: "🇱🇧", lesotho: "🇱🇸", liberia: "🇱🇷", libya: "🇱🇾", liechtenstein: "🇱🇮", lithuania: "🇱🇹", luxembourg: "🇱🇺", macau: "🇲🇴", macedonia: "🇲🇰", madagascar: "🇲🇬", malawi: "🇲🇼", malaysia: "🇲🇾", maldives: "🇲🇻", mali: "🇲🇱", malta: "🇲🇹", marshall_islands: "🇲🇭", martinique: "🇲🇶", mauritania: "🇲🇷", mauritius: "🇲🇺", mayotte: "🇾🇹", mexico: "🇲🇽", micronesia: "🇫🇲", moldova: "🇲🇩", monaco: "🇲🇨", mongolia: "🇲🇳", montenegro: "🇲🇪", montserrat: "🇲🇸", morocco: "🇲🇦", mozambique: "🇲🇿", myanmar: "🇲🇲", namibia: "🇳🇦", nauru: "🇳🇷", nepal: "🇳🇵", netherlands: "🇳🇱", new_caledonia: "🇳🇨", new_zealand: "🇳🇿", nicaragua: "🇳🇮", niger: "🇳🇪", nigeria: "🇳🇬", niue: "🇳🇺", norfolk_island: "🇳🇫", northern_mariana_islands: "🇲🇵", north_korea: "🇰🇵", norway: "🇳🇴", oman: "🇴🇲", pakistan: "🇵🇰", palau: "🇵🇼", palestinian_territories: "🇵🇸", panama: "🇵🇦", papua_new_guinea: "🇵🇬", paraguay: "🇵🇾", peru: "🇵🇪", philippines: "🇵🇭", pitcairn_islands: "🇵🇳", poland: "🇵🇱", portugal: "🇵🇹", puerto_rico: "🇵🇷", qatar: "🇶🇦", reunion: "🇷🇪", romania: "🇷🇴", ru: "🇷🇺", rwanda: "🇷🇼", st_barthelemy: "🇧🇱", st_helena: "🇸🇭", st_kitts_nevis: "🇰🇳", st_lucia: "🇱🇨", st_pierre_miquelon: "🇵🇲", st_vincent_grenadines: "🇻🇨", samoa: "🇼🇸", san_marino: "🇸🇲", sao_tome_principe: "🇸🇹", saudi_arabia: "🇸🇦", senegal: "🇸🇳", serbia: "🇷🇸", seychelles: "🇸🇨", sierra_leone: "🇸🇱", singapore: "🇸🇬", sint_maarten: "🇸🇽", slovakia: "🇸🇰", slovenia: "🇸🇮", solomon_islands: "🇸🇧", somalia: "🇸🇴", south_africa: "🇿🇦", south_georgia_south_sandwich_islands: "🇬🇸", kr: "🇰🇷", south_sudan: "🇸🇸", es: "🇪🇸", sri_lanka: "🇱🇰", sudan: "🇸🇩", suriname: "🇸🇷", swaziland: "🇸🇿", sweden: "🇸🇪", switzerland: "🇨🇭", syria: "🇸🇾", taiwan: "🇹🇼", tajikistan: "🇹🇯", tanzania: "🇹🇿", thailand: "🇹🇭", timor_leste: "🇹🇱", togo: "🇹🇬", tokelau: "🇹🇰", tonga: "🇹🇴", trinidad_tobago: "🇹🇹", tunisia: "🇹🇳", tr: "🇹🇷", turkmenistan: "🇹🇲", turks_caicos_islands: "🇹🇨", tuvalu: "🇹🇻", uganda: "🇺🇬", ukraine: "🇺🇦", united_arab_emirates: "🇦🇪", uk: "🇬🇧", england: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", wales: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", us: "🇺🇸", us_virgin_islands: "🇻🇮", uruguay: "🇺🇾", uzbekistan: "🇺🇿", vanuatu: "🇻🇺", vatican_city: "🇻🇦", venezuela: "🇻🇪", vietnam: "🇻🇳", wallis_futuna: "🇼🇫", western_sahara: "🇪🇭", yemen: "🇾🇪", zambia: "🇿🇲", zimbabwe: "🇿🇼", united_nations: "🇺🇳", pirate_flag: "🏴‍☠️" };}, {}], 2: [function (require, a, exports) {"use strict";a.exports = { angry: [">:(", ">:-("], blush: [':")', ':-")'], broken_heart: ["</3", "<\\3"], confused: [":/", ":-/"], cry: [":'(", ":'-(", ":,(", ":,-("], frowning: [":(", ":-("], heart: ["<3"], imp: ["]:(", "]:-("], innocent: ["o:)", "O:)", "o:-)", "O:-)", "0:)", "0:-)"], joy: [":')", ":'-)", ":,)", ":,-)", ":'D", ":'-D", ":,D", ":,-D"], kissing: [":*", ":-*"], laughing: ["x-)", "X-)"], neutral_face: [":|", ":-|"], open_mouth: [":o", ":-o", ":O", ":-O"], rage: [":@", ":-@"], smile: [":D", ":-D"], smiley: [":)", ":-)"], smiling_imp: ["]:)", "]:-)"], sob: [":,'(", ":,'-(", ";(", ";-("], stuck_out_tongue: [":P", ":-P"], sunglasses: ["8-)", "B-)"], sweat: [",:(", ",:-("], sweat_smile: [",:)", ",:-)"], unamused: [":s", ":-S", ":z", ":-Z", ":$", ":-$"], wink: [";)", ";-)"] };}, {}], 3: [function (require, a, exports) {"use strict";function e(a) {return a.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");}a.exports = function (a) {var n,o = a.defs;a.enabled.length && (o = Object.keys(o).reduce(function (e, n) {return a.enabled.indexOf(n) >= 0 && (e[n] = o[n]), e;}, {})), n = Object.keys(a.shortcuts).reduce(function (e, n) {return o[n] ? Array.isArray(a.shortcuts[n]) ? (a.shortcuts[n].forEach(function (a) {e[a] = n;}), e) : (e[a.shortcuts[n]] = n, e) : e;}, {});var i = Object.keys(o).map(function (a) {return ":" + a + ":";}).concat(Object.keys(n)).sort().reverse().map(function (a) {return e(a);}).join("|"),r = RegExp(i),_ = RegExp(i, "g");return { defs: o, shortcuts: n, scanRE: r, replaceRE: _ };};}, {}], 4: [function (require, a, exports) {"use strict";a.exports = function (a, e) {return a[e].content;};}, {}], 5: [function (require, a, exports) {"use strict";a.exports = function (a, e, n, o, i) {function r(a, o, r) {var _,t = 0,l = [];return a.replace(i, function (o, i, c) {var m;if (n.hasOwnProperty(o)) {if (m = n[o], i > 0 && !s.test(c[i - 1])) return;if (i + o.length < c.length && !s.test(c[i + o.length])) return;} else m = o.slice(1, -1);i > t && (_ = new r("text", "", 0), _.content = a.slice(t, i), l.push(_)), _ = new r("emoji", "", 0), _.markup = m, _.content = e[m], l.push(_), t = i + o.length;}), t < a.length && (_ = new r("text", "", 0), _.content = a.slice(t), l.push(_)), l;}var _ = a.utils.arrayReplaceAt,t = a.utils.lib.ucmicro,s = new RegExp([t.Z.source, t.P.source, t.Cc.source].join("|"));return function (a) {var e,n,i,t,s,l = a.tokens,c = 0;for (n = 0, i = l.length; n < i; n++) {if ("inline" === l[n].type) for (t = l[n].children, e = t.length - 1; e >= 0; e--) {s = t[e], "link_open" !== s.type && "link_close" !== s.type || "auto" === s.info && (c -= s.nesting), "text" === s.type && 0 === c && o.test(s.content) && (l[n].children = t = _(t, e, r(s.content, s.level, a.Token)));}}};};}, {}], 6: [function (require, a, exports) {"use strict";var e = require("./lib/data/full.json"),n = require("./lib/data/shortcuts"),o = require("./lib/render"),i = require("./lib/replace"),r = require("./lib/normalize_opts");a.exports = function (a, _) {var t = { defs: e, shortcuts: n, enabled: [] },s = r(a.utils.assign({}, t, _ || {}));a.renderer.rules.emoji = o, a.core.ruler.push("emoji", i(a, s.defs, s.shortcuts, s.scanRE, s.replaceRE));};}, { "./lib/data/full.json": 1, "./lib/data/shortcuts": 2, "./lib/normalize_opts": 3, "./lib/render": 4, "./lib/replace": 5 }] }, {}, [6])(6);});

/***/ }),
/* 45 */
/*!***********************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/markdown/plugins/todo.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;(function (f) {if (true) {module.exports = f();} else { var g; }})(function () {var define, module, exports;return function () {function e(t, n, r) {function s(o, u) {if (!n[o]) {if (!t[o]) {var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;}var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {var n = t[o][1][e];return s(n ? n : e);}, l, l.exports, e, t, n, r);}return n[o].exports;}var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {s(r[o]);}return s;}return e;}()({ 1: [function (require, module, exports) {
      // Markdown-it plugin to render GitHub-style task lists; see
      //
      // https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments
      // https://github.com/blog/1825-task-lists-in-all-markdown-documents

      var disableCheckboxes = true;
      var useLabelWrapper = false;
      var useLabelAfter = false;

      module.exports = function (md, options) {
        if (options) {
          disableCheckboxes = !options.enabled;
          useLabelWrapper = !!options.label;
          useLabelAfter = !!options.labelAfter;
        }

        md.core.ruler.after('inline', 'github-task-lists', function (state) {
          var tokens = state.tokens;

          // 用于寻找关闭标签的数组
          var tagPaired = function tagPaired(index) {
            var targetItem,
            item = tokens[index],
            tag = item.tag,
            level = item.level,
            targetType = item.type === 'list_item_open' ? 'list_item_close' : 'bullet_list_close';
            for (var _i = index, len = tokens.length; _i < len; _i++) {
              var _item = tokens[_i];

              if (_item.tag === tag && level === _item.level && _item.type === targetType) {
                targetItem = _item;
                break;
              };
            };
            return targetItem;

          };

          for (var i = 2; i < tokens.length; i++) {
            if (isTodoItem(tokens, i)) {
              todoify(tokens[i], state.Token);
              attrSet(tokens[i - 2], 'class', 'task-list-item' + (!disableCheckboxes ? ' enabled' : ''));
              attrSet(tokens[parentToken(tokens, i - 2)], 'class', 'contains-task-list');

              tagPaired(parentToken(tokens, i - 2)).tag = 'todogroup';
              tokens[parentToken(tokens, i - 2)].tag = 'todogroup';

              tagPaired(i - 2).tag = 'todolist';
              tokens[i - 2].tag = 'todolist';
            };
          };
        });
      };

      function attrSet(token, name, value) {
        var index = token.attrIndex(name);
        var attr = [name, value];

        if (index < 0) {
          token.attrPush(attr);
        } else {
          token.attrs[index] = attr;
        }
      }

      function parentToken(tokens, index) {
        var targetLevel = tokens[index].level - 1;
        for (var i = index - 1; i >= 0; i--) {
          if (tokens[i].level === targetLevel) {
            return i;
          }
        }
        return -1;
      }

      function isTodoItem(tokens, index) {
        return isInline(tokens[index]) &&
        isParagraph(tokens[index - 1]) &&
        isListItem(tokens[index - 2]) &&
        startsWithTodoMarkdown(tokens[index]);
      }

      function todoify(token, TokenConstructor) {
        token.children.unshift(makeCheckbox(token, TokenConstructor));
        token.children[1].content = token.children[1].content.slice(3);
        token.content = token.content.slice(3);

        if (useLabelWrapper) {
          if (useLabelAfter) {
            token.children.pop();

            // Use large random number as id property of the checkbox.
            var id = 'task-item-' + Math.ceil(Math.random() * (10000 * 1000) - 1000);
            token.children[0].content = token.children[0].content.slice(0, -1) + ' id="' + id + '">';
            token.children.push(afterLabel(token.content, id, TokenConstructor));
          } else {
            token.children.unshift(beginLabel(TokenConstructor));
            token.children.push(endLabel(TokenConstructor));
          }
        }
      }

      function makeCheckbox(token, TokenConstructor) {
        var checkbox = new TokenConstructor('html_inline', '', 0);
        var disabledAttr = disableCheckboxes ? ' disabled="" ' : '';
        var value = ' value="' + token.content + '" ';
        if (token.content.indexOf('[ ] ') === 0) {
          checkbox.content = '<checkbox class="h2w__todoCheckbox task-list-item-checkbox"' + disabledAttr + value + '/>';
        } else if (token.content.indexOf('[x] ') === 0 || token.content.indexOf('[X] ') === 0) {
          checkbox.content = '<checkbox class="h2w__todoCheckbox task-list-item-checkbox" checked="true"' + disabledAttr + value + '/>';
        }
        return checkbox;
      }

      // these next two functions are kind of hacky; probably should really be a
      // true block-level token with .tag=='label'
      function beginLabel(TokenConstructor) {
        var token = new TokenConstructor('html_inline', '', 0);
        token.content = '<label>';
        return token;
      }

      function endLabel(TokenConstructor) {
        var token = new TokenConstructor('html_inline', '', 0);
        token.content = '</label>';
        return token;
      }

      function afterLabel(content, id, TokenConstructor) {
        var token = new TokenConstructor('html_inline', '', 0);
        token.content = '<label class="task-list-item-label" for="' + id + '">' + content + '</label>';
        token.attrs = [{ for: id }];
        return token;
      }

      function isInline(token) {return token.type === 'inline';}
      function isParagraph(token) {return token.type === 'paragraph_open';}
      function isListItem(token) {return token.type === 'list_item_open';}

      function startsWithTodoMarkdown(token) {
        // leading whitespace in a list item is already trimmed off by markdown-it
        return token.content.indexOf('[ ] ') === 0 || token.content.indexOf('[x] ') === 0 || token.content.indexOf('[X] ') === 0;
      }

    }, {}] }, {}, [1])(1);
});

/***/ }),
/* 46 */
/*!************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/markdown/plugins/latex.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(/*! ../../../config */ 18);

// Test if potential opening or closing delimieter
// Assumes that there is a "$" at state.src[pos]
function isValidDelim(state, pos) {
  var prevChar,nextChar,
  max = state.posMax,
  can_open = true,
  can_close = true;

  prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1;
  nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1;

  // Check non-whitespace conditions for opening and closing, and
  // check that closing delimeter isn't followed by a number
  if (prevChar === 0x20 /* " " */ || prevChar === 0x09 /* \t */ ||
  nextChar >= 0x30 /* "0" */ && nextChar <= 0x39 /* "9" */) {
    can_close = false;
  }
  if (nextChar === 0x20 /* " " */ || nextChar === 0x09 /* \t */) {
      can_open = false;
    }

  return {
    can_open: can_open,
    can_close: can_close };

}

function math_inline(state, silent) {
  var start, match, token, res, pos, esc_count;

  if (state.src[state.pos] !== "$") {return false;}

  res = isValidDelim(state, state.pos);
  if (!res.can_open) {
    if (!silent) {state.pending += "$";}
    state.pos += 1;
    return true;
  }

  // First check for and bypass all properly escaped delimieters
  // This loop will assume that the first leading backtick can not
  // be the first character in state.src, which is known since
  // we have found an opening delimieter already.
  start = state.pos + 1;
  match = start;
  while ((match = state.src.indexOf("$", match)) !== -1) {
    // Found potential $, look for escapes, pos will point to
    // first non escape when complete
    pos = match - 1;
    while (state.src[pos] === "\\") {pos -= 1;}

    // Even number of escapes, potential closing delimiter found
    if ((match - pos) % 2 == 1) {break;}
    match += 1;
  }

  // No closing delimter found.  Consume $ and continue.
  if (match === -1) {
    if (!silent) {state.pending += "$";}
    state.pos = start;
    return true;
  }

  // Check if we have empty content, ie: $$.  Do not parse.
  if (match - start === 0) {
    if (!silent) {state.pending += "$$";}
    state.pos = start + 1;
    return true;
  }

  // Check for valid closing delimiter
  res = isValidDelim(state, match);
  if (!res.can_close) {
    if (!silent) {state.pending += "$";}
    state.pos = start;
    return true;
  }

  if (!silent) {
    token = state.push('math_inline', 'math', 0);
    token.markup = "$";
    token.content = state.src.slice(start, match);
  }

  state.pos = match + 1;
  return true;
}

function math_block(state, start, end, silent) {
  var firstLine,lastLine,next,lastPos,found = false,token,
  pos = state.bMarks[start] + state.tShift[start],
  max = state.eMarks[start];

  if (pos + 2 > max) {return false;}
  if (state.src.slice(pos, pos + 2) !== '$$') {return false;}

  pos += 2;
  firstLine = state.src.slice(pos, max);

  if (silent) {return true;}
  if (firstLine.trim().slice(-2) === '$$') {
    // Single line expression
    firstLine = firstLine.trim().slice(0, -2);
    found = true;
  }

  for (next = start; !found;) {

    next++;

    if (next >= end) {break;}

    pos = state.bMarks[next] + state.tShift[next];
    max = state.eMarks[next];

    if (pos < max && state.tShift[next] < state.blkIndent) {
      // non-empty line with negative indent should stop the list:
      break;
    }

    if (state.src.slice(pos, max).trim().slice(-2) === '$$') {
      lastPos = state.src.slice(0, max).lastIndexOf('$$');
      lastLine = state.src.slice(pos, lastPos);
      found = true;
    }

  }

  state.line = next + 1;

  token = state.push('math_block', 'math', 0);
  token.block = true;
  token.content = (firstLine && firstLine.trim() ? firstLine + '\n' : '') +
  state.getLines(start + 1, next, state.tShift[start], true) + (
  lastLine && lastLine.trim() ? lastLine : '');
  token.map = [start, state.line];
  token.markup = '$$';
  return true;
}

module.exports = function (md) {
  var inlineRenderer = function inlineRenderer(tokens, idx) {
    return "<latex value=\"".concat(encodeURIComponent(tokens[idx].content).replace(/'/g, '%27'), "\" type=\"line\"></latex>");
  };

  var blockRenderer = function blockRenderer(tokens, idx) {
    return "<latex value=\"".concat(encodeURIComponent(tokens[idx].content).replace(/'/g, '%27'), "\" type=\"block\"></latex>");
  };

  md.inline.ruler.after('escape', 'math_inline', math_inline);
  md.block.ruler.after('blockquote', 'math_block', math_block, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'] });

  md.renderer.rules.math_inline = inlineRenderer;
  md.renderer.rules.math_block = blockRenderer;
};

/***/ }),
/* 47 */
/*!***********************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/markdown/plugins/yuml.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(/*! ../../../config */ 18);
var mermaidChart = function mermaidChart(code) {
  return "<yuml value=\"".concat(encodeURIComponent(code), "\"></yuml>");
};

module.exports = function (md) {
  var temp = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
    var token = tokens[idx];
    var code = token.content.trim();
    if (token.info === 'yuml') {
      return mermaidChart(code);
    };
    // const firstLine = code.split(/\n/)[0].trim()
    // if (firstLine === 'gantt' || firstLine === 'sequenceDiagram' || firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
    //     return mermaidChart(code)
    // }
    return temp(tokens, idx, options, env, slf);
  };
};

/***/ }),
/* 48 */
/*!*******************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}var parse2 = __webpack_require__(/*! ./parse2/index */ 49),
// parse5 = require('./parse5/index').parse,
config = __webpack_require__(/*! ../config */ 18),

// html与wxml转换关系
correspondTag = function () {
  var result = {
    a: 'navigator',
    todogroup: 'checkbox-group',
    audio: 'audio-player' };


  // 该系列的标签都转换为text
  // ['span','b','strong','i','em','code','sub','sup','g-emoji','mark','ins','u'].forEach(item => {
  //     result[item] = 'text';
  // });

  // 该系列小程序原生tag，不需转换
  [].concat(_toConsumableArray(config.wxml), _toConsumableArray(config.components)).forEach(function (item) {
    result[item] = item;
  });
  return result;
}(),

// 元素与html对应的wxml标签名
getWxmlTag = function getWxmlTag(tagStr) {return !tagStr ? undefined : correspondTag[tagStr] || 'view';},

// 依赖父级的元素
relyList = ['li'],

// 精简数据，并初始化相关事件等
initObj = function initObj(obj, option) {
  var result = {
    theme: option.theme || 'light',
    _e: {} },

  events = global._events = {},
  base = option.base;

  // 主题保存到全局
  global._theme = result.theme;

  // 事件添加到全局中，各个组件在触发事件时会从全局调用
  if (option.events) {
    for (var key in option.events) {
      events[key] = option.events[key];
    };
  };

  // 遍历原始数据，处理成能解析的数据
  var _eachFn;
  (_eachFn = function eachFn(arr, obj, _e, isRichTextContent) {
    obj.children = obj.children || [];
    _e.child = _e.child || [];
    var child = obj.children,
    child_e = _e.child;

    arr.forEach(function (item) {
      if (item.type === 'comment') {
        return;
      };
      var o = {
        type: item.type === 'text' ? 'text' : isRichTextContent ? 'node' : item.type },

      e = {},
      attrs = o.attrs = item.attribs || {};
      if (item.type === 'text') {
        o.text = e.text = item.data;
      } else {
        if (isRichTextContent) {
          o.name = item.name;
        } else {
          o.tag = getWxmlTag(item.name); // 转换之后的标签
          // o.tag = o.tag === 'text' ? 'view' : o.tag;
          e.tag = item.name; // 原始
          o.attrs = item.attribs;
          e.attrs = JSON.parse(JSON.stringify(attrs));
        };
        attrs.class = attrs.class ? "h2w__".concat(item.name, " ").concat(attrs.class) : "h2w__".concat(item.name);

        // 处理资源相对路径
        if (base && attrs.src) {
          var src = attrs.src;
          switch (src.indexOf('//')) {
            case 0:
              attrs.src = "https:".concat(src);
              break;
            case -1:
              attrs.src = "".concat(base).concat(src);
              break;}
          ;
        };
      };

      o.rely = relyList.indexOf(e.tag) > -1; // 判断是否不能嵌套其它标签

      if (item.children) {
        _eachFn(item.children, o, e, isRichTextContent || item.name === 'rich-text');
      };
      child.push(o);
      child_e.push(e);
    });
  })(obj, result, result._e, false);
  return result;
};

module.exports = function (str, option) {
  str = function () {
    var re = /<body[^>]*>([\s\S]*)<\/body>/i;
    if (re.test(str)) {
      var result = re.exec(str);
      return result[1] || str;
    } else {
      return str;
    };
  }();
  return initObj(parse2(str, { decodeEntities: true }), option);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 2)))

/***/ }),
/* 49 */
/*!**************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/parse2/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
function parseDOM(r, e) {var a = new domhandler_1.DomHandler(void 0, e);return new Parser_1.Parser(a, e).end(r), a.dom;}var domhandler_1 = __webpack_require__(/*! ./domhandler/index */ 50),Parser_1 = __webpack_require__(/*! ./Parser */ 52);module.exports = parseDOM;

/***/ }),
/* 50 */
/*!*************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/parse2/domhandler/index.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
Object.defineProperty(exports, "__esModule", { value: !0 });var node_1 = __webpack_require__(/*! ./node */ 51);exports.Node = node_1.Node, exports.Element = node_1.Element, exports.DataNode = node_1.DataNode, exports.NodeWithChildren = node_1.NodeWithChildren;var reWhitespace = /\s+/g,defaultOpts = { normalizeWhitespace: !1, withStartIndices: !1, withEndIndices: !1 },DomHandler = function () {function t(t, e, o) {this.dom = [], this._done = !1, this._tagStack = [], this._lastNode = null, this._parser = null, "function" == typeof e && (o = e, e = defaultOpts), "object" == typeof t && (e = t, t = undefined), this._callback = t || null, this._options = e || defaultOpts, this._elementCB = o || null;}return t.prototype.onparserinit = function (t) {this._parser = t;}, t.prototype.onreset = function () {this.dom = [], this._done = !1, this._tagStack = [], this._lastNode = null, this._parser = this._parser || null;}, t.prototype.onend = function () {this._done || (this._done = !0, this._parser = null, this.handleCallback(null));}, t.prototype.onerror = function (t) {this.handleCallback(t);}, t.prototype.onclosetag = function () {this._lastNode = null;var t = this._tagStack.pop();t && this._parser && (this._options.withEndIndices && (t.endIndex = this._parser.endIndex), this._elementCB && this._elementCB(t));}, t.prototype.onopentag = function (t, e) {var o = new node_1.Element(t, e);this.addNode(o), this._tagStack.push(o);}, t.prototype.ontext = function (t) {var e = this._options.normalizeWhitespace,o = this._lastNode;if (o && "text" === o.type) e ? o.data = (o.data + t).replace(reWhitespace, " ") : o.data += t;else {e && (t = t.replace(reWhitespace, " "));var n = new node_1.DataNode("text", t);this.addNode(n), this._lastNode = n;}}, t.prototype.oncomment = function (t) {if (this._lastNode && "comment" === this._lastNode.type) return void (this._lastNode.data += t);var e = new node_1.DataNode("comment", t);this.addNode(e), this._lastNode = e;}, t.prototype.oncommentend = function () {this._lastNode = null;}, t.prototype.oncdatastart = function () {var t = new node_1.DataNode("text", ""),e = new node_1.NodeWithChildren("cdata", [t]);this.addNode(e), t.parent = e, this._lastNode = t;}, t.prototype.oncdataend = function () {this._lastNode = null;}, t.prototype.onprocessinginstruction = function (t, e) {var o = new node_1.ProcessingInstruction(t, e);this.addNode(o);}, t.prototype.handleCallback = function (t) {if ("function" == typeof this._callback) this._callback(t, this.dom);else if (t) throw t;}, t.prototype.addNode = function (t) {var e = this._tagStack[this._tagStack.length - 1],o = e ? e.children : this.dom,n = o[o.length - 1];this._parser && (this._options.withStartIndices && (t.startIndex = this._parser.startIndex), this._options.withEndIndices && (t.endIndex = this._parser.endIndex)), o.push(t), n && (t.prev = n, n.next = t), e && (t.parent = e), this._lastNode = null;}, t.prototype.addDataNode = function (t) {this.addNode(t), this._lastNode = t;}, t;}();exports.DomHandler = DomHandler, exports["default"] = DomHandler;

/***/ }),
/* 51 */
/*!************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/parse2/domhandler/node.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
var __extends = this && this.__extends || function () {var _e = function e(t, n) {return (_e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {t.hasOwnProperty(n) && (e[n] = t[n]);}})(t, n);};return function (t, n) {function r() {this.constructor = t;}_e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());};}();Object.defineProperty(exports, "__esModule", { value: !0 });var nodeTypes = new Map([["tag", 1], ["script", 1], ["style", 1], ["directive", 1], ["text", 3], ["cdata", 4], ["comment", 8]]),Node = function () {function e(e) {this.type = e, this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;}return Object.defineProperty(e.prototype, "nodeType", { get: function get() {return nodeTypes.get(this.type) || 1;}, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "parentNode", { get: function get() {return this.parent || null;}, set: function set(e) {this.parent = e;}, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "previousSibling", { get: function get() {return this.prev || null;}, set: function set(e) {this.prev = e;}, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "nextSibling", { get: function get() {return this.next || null;}, set: function set(e) {this.next = e;}, enumerable: !0, configurable: !0 }), e;}();exports.Node = Node;var DataNode = function (e) {function t(t, n) {var r = e.call(this, t) || this;return r.data = n, r;}return __extends(t, e), Object.defineProperty(t.prototype, "nodeValue", { get: function get() {return this.data;}, set: function set(e) {this.data = e;}, enumerable: !0, configurable: !0 }), t;}(Node);exports.DataNode = DataNode;var ProcessingInstruction = function (e) {function t(t, n) {var r = e.call(this, "directive", n) || this;return r.name = t, r;}return __extends(t, e), t;}(DataNode);exports.ProcessingInstruction = ProcessingInstruction;var NodeWithChildren = function (e) {function t(t, n) {var r = e.call(this, t) || this;return r.children = n, r;}return __extends(t, e), Object.defineProperty(t.prototype, "firstChild", { get: function get() {return this.children[0] || null;}, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "lastChild", { get: function get() {return this.children[this.children.length - 1] || null;}, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "childNodes", { get: function get() {return this.children;}, set: function set(e) {this.children = e;}, enumerable: !0, configurable: !0 }), t;}(Node);exports.NodeWithChildren = NodeWithChildren;var Element = function (e) {function t(t, n) {var r = e.call(this, "script" === t ? "script" : "style" === t ? "style" : "tag", []) || this;return r.name = t, r.attribs = n, r.attribs = n, r;}return __extends(t, e), Object.defineProperty(t.prototype, "tagName", { get: function get() {return this.name;}, set: function set(e) {this.name = e;}, enumerable: !0, configurable: !0 }), t;}(NodeWithChildren);exports.Element = Element;

/***/ }),
/* 52 */
/*!***************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/parse2/Parser.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
function Parser(t, e) {var s = this;return s._tagname = "", s._attribname = "", s._attribvalue = "", s._attribs = null, s._stack = [], s._foreignContext = [], s.startIndex = 0, s.endIndex = null, s.parseChunk = Parser.prototype.write, s.done = Parser.prototype.end, s._options = e || {}, s._cbs = t || {}, s._tagname = "", s._attribname = "", s._attribvalue = "", s._attribs = null, s._stack = [], s._foreignContext = [], s.startIndex = 0, s.endIndex = null, s._lowerCaseTagNames = "lowerCaseTags" in s._options ? !!s._options.lowerCaseTags : !s._options.xmlMode, s._lowerCaseAttributeNames = "lowerCaseAttributeNames" in s._options ? !!s._options.lowerCaseAttributeNames : !s._options.xmlMode, s._tokenizer = new (s._options.Tokenizer || Tokenizer_1["default"])(s._options, s), s._cbs.onparserinit && s._cbs.onparserinit(s), s;}var __importDefault = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(exports, "__esModule", { value: !0 });var Tokenizer_1 = __importDefault(__webpack_require__(/*! ./Tokenizer */ 53)),formTags = new Set(["input", "option", "optgroup", "select", "button", "datalist", "textarea"]),pTag = new Set(["p"]),openImpliesClose = { tr: new Set(["tr", "th", "td"]), th: new Set(["th"]), td: new Set(["thead", "th", "td"]), body: new Set(["head", "link", "script"]), li: new Set(["li"]), p: pTag, h1: pTag, h2: pTag, h3: pTag, h4: pTag, h5: pTag, h6: pTag, select: formTags, input: formTags, output: formTags, button: formTags, datalist: formTags, textarea: formTags, option: new Set(["option"]), optgroup: new Set(["optgroup", "option"]), dd: new Set(["dt", "dd"]), dt: new Set(["dt", "dd"]), address: pTag, article: pTag, aside: pTag, blockquote: pTag, details: pTag, div: pTag, dl: pTag, fieldset: pTag, figcaption: pTag, figure: pTag, footer: pTag, form: pTag, header: pTag, hr: pTag, main: pTag, nav: pTag, ol: pTag, pre: pTag, section: pTag, table: pTag, ul: pTag, rt: new Set(["rt", "rp"]), rp: new Set(["rt", "rp"]), tbody: new Set(["thead", "tbody"]), tfoot: new Set(["thead", "tbody"]) },voidElements = new Set(["area", "base", "basefont", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr"]),foreignContextElements = new Set(["math", "svg"]),htmlIntegrationElements = new Set(["mi", "mo", "mn", "ms", "mtext", "annotation-xml", "foreignObject", "desc", "title"]),reNameEnd = /\s|\//;Parser.prototype._updatePosition = function (t) {null === this.endIndex ? this._tokenizer._sectionStart <= t ? this.startIndex = 0 : this.startIndex = this._tokenizer._sectionStart - t : this.startIndex = this.endIndex + 1, this.endIndex = this._tokenizer.getAbsoluteIndex();}, Parser.prototype.ontext = function (t) {this._updatePosition(1), this.endIndex--, this._cbs.ontext && this._cbs.ontext(t);}, Parser.prototype.onopentagname = function (t) {if (this._lowerCaseTagNames && (t = t.toLowerCase()), this._tagname = t, !this._options.xmlMode && t in openImpliesClose) for (var e = void 0; openImpliesClose[t].has(e = this._stack[this._stack.length - 1]); this.onclosetag(e)) {;}!this._options.xmlMode && voidElements.has(t) || (this._stack.push(t), foreignContextElements.has(t) ? this._foreignContext.push(!0) : htmlIntegrationElements.has(t) && this._foreignContext.push(!1)), this._cbs.onopentagname && this._cbs.onopentagname(t), this._cbs.onopentag && (this._attribs = {});}, Parser.prototype.onopentagend = function () {this._updatePosition(1), this._attribs && (this._cbs.onopentag && this._cbs.onopentag(this._tagname, this._attribs), this._attribs = null), !this._options.xmlMode && this._cbs.onclosetag && voidElements.has(this._tagname) && this._cbs.onclosetag(this._tagname), this._tagname = "";}, Parser.prototype.onclosetag = function (t) {if (this._updatePosition(1), this._lowerCaseTagNames && (t = t.toLowerCase()), (foreignContextElements.has(t) || htmlIntegrationElements.has(t)) && this._foreignContext.pop(), !this._stack.length || !this._options.xmlMode && voidElements.has(t)) this._options.xmlMode || "br" !== t && "p" !== t || (this.onopentagname(t), this._closeCurrentTag());else {var e = this._stack.lastIndexOf(t);if (-1 !== e) {if (this._cbs.onclosetag) for (e = this._stack.length - e; e--;) {this._cbs.onclosetag(this._stack.pop());} else this._stack.length = e;} else "p" !== t || this._options.xmlMode || (this.onopentagname(t), this._closeCurrentTag());}}, Parser.prototype.onselfclosingtag = function () {this._options.xmlMode || this._options.recognizeSelfClosing || this._foreignContext[this._foreignContext.length - 1] ? this._closeCurrentTag() : this.onopentagend();}, Parser.prototype._closeCurrentTag = function () {var t = this._tagname;this.onopentagend(), this._stack[this._stack.length - 1] === t && (this._cbs.onclosetag && this._cbs.onclosetag(t), this._stack.pop());}, Parser.prototype.onattribname = function (t) {this._lowerCaseAttributeNames && (t = t.toLowerCase()), this._attribname = t;}, Parser.prototype.onattribdata = function (t) {this._attribvalue += t;}, Parser.prototype.onattribend = function () {this._cbs.onattribute && this._cbs.onattribute(this._attribname, this._attribvalue), this._attribs && !Object.prototype.hasOwnProperty.call(this._attribs, this._attribname) && (this._attribs[this._attribname] = this._attribvalue), this._attribname = "", this._attribvalue = "";}, Parser.prototype._getInstructionName = function (t) {var e = t.search(reNameEnd),s = e < 0 ? t : t.substr(0, e);return this._lowerCaseTagNames && (s = s.toLowerCase()), s;}, Parser.prototype.ondeclaration = function (t) {if (this._cbs.onprocessinginstruction) {var e = this._getInstructionName(t);this._cbs.onprocessinginstruction("!" + e, "!" + t);}}, Parser.prototype.onprocessinginstruction = function (t) {if (this._cbs.onprocessinginstruction) {var e = this._getInstructionName(t);this._cbs.onprocessinginstruction("?" + e, "?" + t);}}, Parser.prototype.oncomment = function (t) {this._updatePosition(4), this._cbs.oncomment && this._cbs.oncomment(t), this._cbs.oncommentend && this._cbs.oncommentend();}, Parser.prototype.oncdata = function (t) {this._updatePosition(1), this._options.xmlMode || this._options.recognizeCDATA ? (this._cbs.oncdatastart && this._cbs.oncdatastart(), this._cbs.ontext && this._cbs.ontext(t), this._cbs.oncdataend && this._cbs.oncdataend()) : this.oncomment("[CDATA[" + t + "]]");}, Parser.prototype.onerror = function (t) {this._cbs.onerror && this._cbs.onerror(t);}, Parser.prototype.onend = function () {if (this._cbs.onclosetag) for (var t = this._stack.length; t > 0; this._cbs.onclosetag(this._stack[--t])) {;}this._cbs.onend && this._cbs.onend();}, Parser.prototype.reset = function () {this._cbs.onreset && this._cbs.onreset(), this._tokenizer.reset(), this._tagname = "", this._attribname = "", this._attribs = null, this._stack = [], this._cbs.onparserinit && this._cbs.onparserinit(this);}, Parser.prototype.parseComplete = function (t) {this.reset(), this.end(t);}, Parser.prototype.write = function (t) {this._tokenizer.write(t);}, Parser.prototype.end = function (t) {this._tokenizer.end(t);}, Parser.prototype.pause = function () {this._tokenizer.pause();}, Parser.prototype.resume = function () {this._tokenizer.resume();}, exports.Parser = Parser;

/***/ }),
/* 53 */
/*!******************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/parse2/Tokenizer.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
function whitespace(t) {return " " === t || "\n" === t || "\t" === t || "\f" === t || "\r" === t;}function ifElseState(t, e, s) {var i = t.toLowerCase();return t === i ? function (t, a) {a === i ? t._state = e : (t._state = s, t._index--);} : function (a, _) {_ === i || _ === t ? a._state = e : (a._state = s, a._index--);};}function consumeSpecialNameChar(t, e) {var s = t.toLowerCase();return function (i, a) {a === s || a === t ? i._state = e : (i._state = 3, i._index--);};}var __importDefault = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(exports, "__esModule", { value: !0 });var decode_codepoint_1 = __importDefault(__webpack_require__(/*! ./entities/decode_codepoint */ 54)),entities_json_1 = __importDefault(__webpack_require__(/*! ./entities/maps/entities */ 56)),legacy_json_1 = __importDefault(__webpack_require__(/*! ./entities/maps/legacy */ 57)),xml_json_1 = __importDefault(__webpack_require__(/*! ./entities/maps/xml */ 58)),stateBeforeCdata1 = ifElseState("C", 23, 16),stateBeforeCdata2 = ifElseState("D", 24, 16),stateBeforeCdata3 = ifElseState("A", 25, 16),stateBeforeCdata4 = ifElseState("T", 26, 16),stateBeforeCdata5 = ifElseState("A", 27, 16),stateBeforeScript1 = consumeSpecialNameChar("R", 34),stateBeforeScript2 = consumeSpecialNameChar("I", 35),stateBeforeScript3 = consumeSpecialNameChar("P", 36),stateBeforeScript4 = consumeSpecialNameChar("T", 37),stateAfterScript1 = ifElseState("R", 39, 1),stateAfterScript2 = ifElseState("I", 40, 1),stateAfterScript3 = ifElseState("P", 41, 1),stateAfterScript4 = ifElseState("T", 42, 1),stateBeforeStyle1 = consumeSpecialNameChar("Y", 44),stateBeforeStyle2 = consumeSpecialNameChar("L", 45),stateBeforeStyle3 = consumeSpecialNameChar("E", 46),stateAfterStyle1 = ifElseState("Y", 48, 1),stateAfterStyle2 = ifElseState("L", 49, 1),stateAfterStyle3 = ifElseState("E", 50, 1),stateBeforeEntity = ifElseState("#", 52, 53),stateBeforeNumericEntity = ifElseState("X", 55, 54),Tokenizer = function () {function t(t, e) {this._state = 1, this._buffer = "", this._sectionStart = 0, this._index = 0, this._bufferOffset = 0, this._baseState = 1, this._special = 1, this._running = !0, this._ended = !1, this._cbs = e, this._xmlMode = !(!t || !t.xmlMode), this._decodeEntities = !(!t || !t.decodeEntities);}return t.prototype.reset = function () {this._state = 1, this._buffer = "", this._sectionStart = 0, this._index = 0, this._bufferOffset = 0, this._baseState = 1, this._special = 1, this._running = !0, this._ended = !1;}, t.prototype._stateText = function (t) {"<" === t ? (this._index > this._sectionStart && this._cbs.ontext(this._getSection()), this._state = 2, this._sectionStart = this._index) : this._decodeEntities && 1 === this._special && "&" === t && (this._index > this._sectionStart && this._cbs.ontext(this._getSection()), this._baseState = 1, this._state = 51, this._sectionStart = this._index);}, t.prototype._stateBeforeTagName = function (t) {"/" === t ? this._state = 5 : "<" === t ? (this._cbs.ontext(this._getSection()), this._sectionStart = this._index) : ">" === t || 1 !== this._special || whitespace(t) ? this._state = 1 : "!" === t ? (this._state = 15, this._sectionStart = this._index + 1) : "?" === t ? (this._state = 17, this._sectionStart = this._index + 1) : (this._state = this._xmlMode || "s" !== t && "S" !== t ? 3 : 31, this._sectionStart = this._index);}, t.prototype._stateInTagName = function (t) {("/" === t || ">" === t || whitespace(t)) && (this._emitToken("onopentagname"), this._state = 8, this._index--);}, t.prototype._stateBeforeCloseingTagName = function (t) {whitespace(t) || (">" === t ? this._state = 1 : 1 !== this._special ? "s" === t || "S" === t ? this._state = 32 : (this._state = 1, this._index--) : (this._state = 6, this._sectionStart = this._index));}, t.prototype._stateInCloseingTagName = function (t) {(">" === t || whitespace(t)) && (this._emitToken("onclosetag"), this._state = 7, this._index--);}, t.prototype._stateAfterCloseingTagName = function (t) {">" === t && (this._state = 1, this._sectionStart = this._index + 1);}, t.prototype._stateBeforeAttributeName = function (t) {">" === t ? (this._cbs.onopentagend(), this._state = 1, this._sectionStart = this._index + 1) : "/" === t ? this._state = 4 : whitespace(t) || (this._state = 9, this._sectionStart = this._index);}, t.prototype._stateInSelfClosingTag = function (t) {">" === t ? (this._cbs.onselfclosingtag(), this._state = 1, this._sectionStart = this._index + 1) : whitespace(t) || (this._state = 8, this._index--);}, t.prototype._stateInAttributeName = function (t) {("=" === t || "/" === t || ">" === t || whitespace(t)) && (this._cbs.onattribname(this._getSection()), this._sectionStart = -1, this._state = 10, this._index--);}, t.prototype._stateAfterAttributeName = function (t) {"=" === t ? this._state = 11 : "/" === t || ">" === t ? (this._cbs.onattribend(), this._state = 8, this._index--) : whitespace(t) || (this._cbs.onattribend(), this._state = 9, this._sectionStart = this._index);}, t.prototype._stateBeforeAttributeValue = function (t) {'"' === t ? (this._state = 12, this._sectionStart = this._index + 1) : "'" === t ? (this._state = 13, this._sectionStart = this._index + 1) : whitespace(t) || (this._state = 14, this._sectionStart = this._index, this._index--);}, t.prototype._stateInAttributeValueDoubleQuotes = function (t) {'"' === t ? (this._emitToken("onattribdata"), this._cbs.onattribend(), this._state = 8) : this._decodeEntities && "&" === t && (this._emitToken("onattribdata"), this._baseState = this._state, this._state = 51, this._sectionStart = this._index);}, t.prototype._stateInAttributeValueSingleQuotes = function (t) {"'" === t ? (this._emitToken("onattribdata"), this._cbs.onattribend(), this._state = 8) : this._decodeEntities && "&" === t && (this._emitToken("onattribdata"), this._baseState = this._state, this._state = 51, this._sectionStart = this._index);}, t.prototype._stateInAttributeValueNoQuotes = function (t) {whitespace(t) || ">" === t ? (this._emitToken("onattribdata"), this._cbs.onattribend(), this._state = 8, this._index--) : this._decodeEntities && "&" === t && (this._emitToken("onattribdata"), this._baseState = this._state, this._state = 51, this._sectionStart = this._index);}, t.prototype._stateBeforeDeclaration = function (t) {this._state = "[" === t ? 22 : "-" === t ? 18 : 16;}, t.prototype._stateInDeclaration = function (t) {">" === t && (this._cbs.ondeclaration(this._getSection()), this._state = 1, this._sectionStart = this._index + 1);}, t.prototype._stateInProcessingInstruction = function (t) {">" === t && (this._cbs.onprocessinginstruction(this._getSection()), this._state = 1, this._sectionStart = this._index + 1);}, t.prototype._stateBeforeComment = function (t) {"-" === t ? (this._state = 19, this._sectionStart = this._index + 1) : this._state = 16;}, t.prototype._stateInComment = function (t) {"-" === t && (this._state = 20);}, t.prototype._stateAfterComment1 = function (t) {this._state = "-" === t ? 21 : 19;}, t.prototype._stateAfterComment2 = function (t) {">" === t ? (this._cbs.oncomment(this._buffer.substring(this._sectionStart, this._index - 2)), this._state = 1, this._sectionStart = this._index + 1) : "-" !== t && (this._state = 19);}, t.prototype._stateBeforeCdata6 = function (t) {"[" === t ? (this._state = 28, this._sectionStart = this._index + 1) : (this._state = 16, this._index--);}, t.prototype._stateInCdata = function (t) {"]" === t && (this._state = 29);}, t.prototype._stateAfterCdata1 = function (t) {this._state = "]" === t ? 30 : 28;}, t.prototype._stateAfterCdata2 = function (t) {">" === t ? (this._cbs.oncdata(this._buffer.substring(this._sectionStart, this._index - 2)), this._state = 1, this._sectionStart = this._index + 1) : "]" !== t && (this._state = 28);}, t.prototype._stateBeforeSpecial = function (t) {"c" === t || "C" === t ? this._state = 33 : "t" === t || "T" === t ? this._state = 43 : (this._state = 3, this._index--);}, t.prototype._stateBeforeSpecialEnd = function (t) {2 !== this._special || "c" !== t && "C" !== t ? 3 !== this._special || "t" !== t && "T" !== t ? this._state = 1 : this._state = 47 : this._state = 38;}, t.prototype._stateBeforeScript5 = function (t) {("/" === t || ">" === t || whitespace(t)) && (this._special = 2), this._state = 3, this._index--;}, t.prototype._stateAfterScript5 = function (t) {">" === t || whitespace(t) ? (this._special = 1, this._state = 6, this._sectionStart = this._index - 6, this._index--) : this._state = 1;}, t.prototype._stateBeforeStyle4 = function (t) {("/" === t || ">" === t || whitespace(t)) && (this._special = 3), this._state = 3, this._index--;}, t.prototype._stateAfterStyle4 = function (t) {">" === t || whitespace(t) ? (this._special = 1, this._state = 6, this._sectionStart = this._index - 5, this._index--) : this._state = 1;}, t.prototype._parseNamedEntityStrict = function () {if (this._sectionStart + 1 < this._index) {var t = this._buffer.substring(this._sectionStart + 1, this._index),e = this._xmlMode ? xml_json_1["default"] : entities_json_1["default"];Object.prototype.hasOwnProperty.call(e, t) && (this._emitPartial(e[t]), this._sectionStart = this._index + 1);}}, t.prototype._parseLegacyEntity = function () {var t = this._sectionStart + 1,e = this._index - t;for (e > 6 && (e = 6); e >= 2;) {var s = this._buffer.substr(t, e);if (Object.prototype.hasOwnProperty.call(legacy_json_1["default"], s)) return this._emitPartial(legacy_json_1["default"][s]), void (this._sectionStart += e + 1);e--;}}, t.prototype._stateInNamedEntity = function (t) {";" === t ? (this._parseNamedEntityStrict(), this._sectionStart + 1 < this._index && !this._xmlMode && this._parseLegacyEntity(), this._state = this._baseState) : (t < "a" || t > "z") && (t < "A" || t > "Z") && (t < "0" || t > "9") && (this._xmlMode || this._sectionStart + 1 === this._index || (1 !== this._baseState ? "=" !== t && this._parseNamedEntityStrict() : this._parseLegacyEntity()), this._state = this._baseState, this._index--);}, t.prototype._decodeNumericEntity = function (t, e) {var s = this._sectionStart + t;if (s !== this._index) {var i = this._buffer.substring(s, this._index),a = parseInt(i, e);this._emitPartial(decode_codepoint_1["default"](a)), this._sectionStart = this._index;} else this._sectionStart--;this._state = this._baseState;}, t.prototype._stateInNumericEntity = function (t) {";" === t ? (this._decodeNumericEntity(2, 10), this._sectionStart++) : (t < "0" || t > "9") && (this._xmlMode ? this._state = this._baseState : this._decodeNumericEntity(2, 10), this._index--);}, t.prototype._stateInHexEntity = function (t) {";" === t ? (this._decodeNumericEntity(3, 16), this._sectionStart++) : (t < "a" || t > "f") && (t < "A" || t > "F") && (t < "0" || t > "9") && (this._xmlMode ? this._state = this._baseState : this._decodeNumericEntity(3, 16), this._index--);}, t.prototype._cleanup = function () {this._sectionStart < 0 ? (this._buffer = "", this._bufferOffset += this._index, this._index = 0) : this._running && (1 === this._state ? (this._sectionStart !== this._index && this._cbs.ontext(this._buffer.substr(this._sectionStart)), this._buffer = "", this._bufferOffset += this._index, this._index = 0) : this._sectionStart === this._index ? (this._buffer = "", this._bufferOffset += this._index, this._index = 0) : (this._buffer = this._buffer.substr(this._sectionStart), this._index -= this._sectionStart, this._bufferOffset += this._sectionStart), this._sectionStart = 0);}, t.prototype.write = function (t) {this._ended && this._cbs.onerror(Error(".write() after done!")), this._buffer += t, this._parse();}, t.prototype._parse = function () {for (; this._index < this._buffer.length && this._running;) {var t = this._buffer.charAt(this._index);1 === this._state ? this._stateText(t) : 12 === this._state ? this._stateInAttributeValueDoubleQuotes(t) : 9 === this._state ? this._stateInAttributeName(t) : 19 === this._state ? this._stateInComment(t) : 8 === this._state ? this._stateBeforeAttributeName(t) : 3 === this._state ? this._stateInTagName(t) : 6 === this._state ? this._stateInCloseingTagName(t) : 2 === this._state ? this._stateBeforeTagName(t) : 10 === this._state ? this._stateAfterAttributeName(t) : 13 === this._state ? this._stateInAttributeValueSingleQuotes(t) : 11 === this._state ? this._stateBeforeAttributeValue(t) : 5 === this._state ? this._stateBeforeCloseingTagName(t) : 7 === this._state ? this._stateAfterCloseingTagName(t) : 31 === this._state ? this._stateBeforeSpecial(t) : 20 === this._state ? this._stateAfterComment1(t) : 14 === this._state ? this._stateInAttributeValueNoQuotes(t) : 4 === this._state ? this._stateInSelfClosingTag(t) : 16 === this._state ? this._stateInDeclaration(t) : 15 === this._state ? this._stateBeforeDeclaration(t) : 21 === this._state ? this._stateAfterComment2(t) : 18 === this._state ? this._stateBeforeComment(t) : 32 === this._state ? this._stateBeforeSpecialEnd(t) : 38 === this._state ? stateAfterScript1(this, t) : 39 === this._state ? stateAfterScript2(this, t) : 40 === this._state ? stateAfterScript3(this, t) : 33 === this._state ? stateBeforeScript1(this, t) : 34 === this._state ? stateBeforeScript2(this, t) : 35 === this._state ? stateBeforeScript3(this, t) : 36 === this._state ? stateBeforeScript4(this, t) : 37 === this._state ? this._stateBeforeScript5(t) : 41 === this._state ? stateAfterScript4(this, t) : 42 === this._state ? this._stateAfterScript5(t) : 43 === this._state ? stateBeforeStyle1(this, t) : 28 === this._state ? this._stateInCdata(t) : 44 === this._state ? stateBeforeStyle2(this, t) : 45 === this._state ? stateBeforeStyle3(this, t) : 46 === this._state ? this._stateBeforeStyle4(t) : 47 === this._state ? stateAfterStyle1(this, t) : 48 === this._state ? stateAfterStyle2(this, t) : 49 === this._state ? stateAfterStyle3(this, t) : 50 === this._state ? this._stateAfterStyle4(t) : 17 === this._state ? this._stateInProcessingInstruction(t) : 53 === this._state ? this._stateInNamedEntity(t) : 22 === this._state ? stateBeforeCdata1(this, t) : 51 === this._state ? stateBeforeEntity(this, t) : 23 === this._state ? stateBeforeCdata2(this, t) : 24 === this._state ? stateBeforeCdata3(this, t) : 29 === this._state ? this._stateAfterCdata1(t) : 30 === this._state ? this._stateAfterCdata2(t) : 25 === this._state ? stateBeforeCdata4(this, t) : 26 === this._state ? stateBeforeCdata5(this, t) : 27 === this._state ? this._stateBeforeCdata6(t) : 55 === this._state ? this._stateInHexEntity(t) : 54 === this._state ? this._stateInNumericEntity(t) : 52 === this._state ? stateBeforeNumericEntity(this, t) : this._cbs.onerror(Error("unknown _state"), this._state), this._index++;}this._cleanup();}, t.prototype.pause = function () {this._running = !1;}, t.prototype.resume = function () {this._running = !0, this._index < this._buffer.length && this._parse(), this._ended && this._finish();}, t.prototype.end = function (t) {this._ended && this._cbs.onerror(Error(".end() after done!")), t && this.write(t), this._ended = !0, this._running && this._finish();}, t.prototype._finish = function () {this._sectionStart < this._index && this._handleTrailingData(), this._cbs.onend();}, t.prototype._handleTrailingData = function () {var t = this._buffer.substr(this._sectionStart);28 === this._state || 29 === this._state || 30 === this._state ? this._cbs.oncdata(t) : 19 === this._state || 20 === this._state || 21 === this._state ? this._cbs.oncomment(t) : 53 !== this._state || this._xmlMode ? 54 !== this._state || this._xmlMode ? 55 !== this._state || this._xmlMode ? 3 !== this._state && 8 !== this._state && 11 !== this._state && 10 !== this._state && 9 !== this._state && 13 !== this._state && 12 !== this._state && 14 !== this._state && 6 !== this._state && this._cbs.ontext(t) : (this._decodeNumericEntity(3, 16), this._sectionStart < this._index && (this._state = this._baseState, this._handleTrailingData())) : (this._decodeNumericEntity(2, 10), this._sectionStart < this._index && (this._state = this._baseState, this._handleTrailingData())) : (this._parseLegacyEntity(), this._sectionStart < this._index && (this._state = this._baseState, this._handleTrailingData()));}, t.prototype.getAbsoluteIndex = function () {return this._bufferOffset + this._index;}, t.prototype._getSection = function () {return this._buffer.substring(this._sectionStart, this._index);}, t.prototype._emitToken = function (t) {this._cbs[t](this._getSection()), this._sectionStart = -1;}, t.prototype._emitPartial = function (t) {1 !== this._baseState ? this._cbs.onattribdata(t) : this._cbs.ontext(t);}, t;}();exports["default"] = Tokenizer;

/***/ }),
/* 54 */
/*!**********************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/parse2/entities/decode_codepoint.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
function decodeCodePoint(e) {if (e >= 55296 && e <= 57343 || e > 1114111) return "�";e in decode_json_1["default"] && (e = decode_json_1["default"][e]);var o = "";return e > 65535 && (e -= 65536, o += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), o += String.fromCharCode(e);}var __importDefault = this && this.__importDefault || function (e) {return e && e.__esModule ? e : { default: e };};Object.defineProperty(exports, "__esModule", { value: !0 });var decode_json_1 = __importDefault(__webpack_require__(/*! ./maps/decode */ 55));exports["default"] = decodeCodePoint;

/***/ }),
/* 55 */
/*!*****************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/parse2/entities/maps/decode.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
module.exports = { 0: 65533, 128: 8364, 130: 8218, 131: 402, 132: 8222, 133: 8230, 134: 8224, 135: 8225, 136: 710, 137: 8240, 138: 352, 139: 8249, 140: 338, 142: 381, 145: 8216, 146: 8217, 147: 8220, 148: 8221, 149: 8226, 150: 8211, 151: 8212, 152: 732, 153: 8482, 154: 353, 155: 8250, 156: 339, 158: 382, 159: 376 };

/***/ }),
/* 56 */
/*!*******************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/parse2/entities/maps/entities.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
module.exports = { Aacute: "Á", aacute: "á", Abreve: "Ă", abreve: "ă", ac: "∾", acd: "∿", acE: "∾̳", Acirc: "Â", acirc: "â", acute: "´", Acy: "А", acy: "а", AElig: "Æ", aelig: "æ", af: "⁡", Afr: "𝔄", afr: "𝔞", Agrave: "À", agrave: "à", alefsym: "ℵ", aleph: "ℵ", Alpha: "Α", alpha: "α", Amacr: "Ā", amacr: "ā", amalg: "⨿", amp: "&", AMP: "&", andand: "⩕", And: "⩓", and: "∧", andd: "⩜", andslope: "⩘", andv: "⩚", ang: "∠", ange: "⦤", angle: "∠", angmsdaa: "⦨", angmsdab: "⦩", angmsdac: "⦪", angmsdad: "⦫", angmsdae: "⦬", angmsdaf: "⦭", angmsdag: "⦮", angmsdah: "⦯", angmsd: "∡", angrt: "∟", angrtvb: "⊾", angrtvbd: "⦝", angsph: "∢", angst: "Å", angzarr: "⍼", Aogon: "Ą", aogon: "ą", Aopf: "𝔸", aopf: "𝕒", apacir: "⩯", ap: "≈", apE: "⩰", ape: "≊", apid: "≋", apos: "'", ApplyFunction: "⁡", approx: "≈", approxeq: "≊", Aring: "Å", aring: "å", Ascr: "𝒜", ascr: "𝒶", Assign: "≔", ast: "*", asymp: "≈", asympeq: "≍", Atilde: "Ã", atilde: "ã", Auml: "Ä", auml: "ä", awconint: "∳", awint: "⨑", backcong: "≌", backepsilon: "϶", backprime: "‵", backsim: "∽", backsimeq: "⋍", Backslash: "∖", Barv: "⫧", barvee: "⊽", barwed: "⌅", Barwed: "⌆", barwedge: "⌅", bbrk: "⎵", bbrktbrk: "⎶", bcong: "≌", Bcy: "Б", bcy: "б", bdquo: "„", becaus: "∵", because: "∵", Because: "∵", bemptyv: "⦰", bepsi: "϶", bernou: "ℬ", Bernoullis: "ℬ", Beta: "Β", beta: "β", beth: "ℶ", between: "≬", Bfr: "𝔅", bfr: "𝔟", bigcap: "⋂", bigcirc: "◯", bigcup: "⋃", bigodot: "⨀", bigoplus: "⨁", bigotimes: "⨂", bigsqcup: "⨆", bigstar: "★", bigtriangledown: "▽", bigtriangleup: "△", biguplus: "⨄", bigvee: "⋁", bigwedge: "⋀", bkarow: "⤍", blacklozenge: "⧫", blacksquare: "▪", blacktriangle: "▴", blacktriangledown: "▾", blacktriangleleft: "◂", blacktriangleright: "▸", blank: "␣", blk12: "▒", blk14: "░", blk34: "▓", block: "█", bne: "=⃥", bnequiv: "≡⃥", bNot: "⫭", bnot: "⌐", Bopf: "𝔹", bopf: "𝕓", bot: "⊥", bottom: "⊥", bowtie: "⋈", boxbox: "⧉", boxdl: "┐", boxdL: "╕", boxDl: "╖", boxDL: "╗", boxdr: "┌", boxdR: "╒", boxDr: "╓", boxDR: "╔", boxh: "─", boxH: "═", boxhd: "┬", boxHd: "╤", boxhD: "╥", boxHD: "╦", boxhu: "┴", boxHu: "╧", boxhU: "╨", boxHU: "╩", boxminus: "⊟", boxplus: "⊞", boxtimes: "⊠", boxul: "┘", boxuL: "╛", boxUl: "╜", boxUL: "╝", boxur: "└", boxuR: "╘", boxUr: "╙", boxUR: "╚", boxv: "│", boxV: "║", boxvh: "┼", boxvH: "╪", boxVh: "╫", boxVH: "╬", boxvl: "┤", boxvL: "╡", boxVl: "╢", boxVL: "╣", boxvr: "├", boxvR: "╞", boxVr: "╟", boxVR: "╠", bprime: "‵", breve: "˘", Breve: "˘", brvbar: "¦", bscr: "𝒷", Bscr: "ℬ", bsemi: "⁏", bsim: "∽", bsime: "⋍", bsolb: "⧅", bsol: "\\", bsolhsub: "⟈", bull: "•", bullet: "•", bump: "≎", bumpE: "⪮", bumpe: "≏", Bumpeq: "≎", bumpeq: "≏", Cacute: "Ć", cacute: "ć", capand: "⩄", capbrcup: "⩉", capcap: "⩋", cap: "∩", Cap: "⋒", capcup: "⩇", capdot: "⩀", CapitalDifferentialD: "ⅅ", caps: "∩︀", caret: "⁁", caron: "ˇ", Cayleys: "ℭ", ccaps: "⩍", Ccaron: "Č", ccaron: "č", Ccedil: "Ç", ccedil: "ç", Ccirc: "Ĉ", ccirc: "ĉ", Cconint: "∰", ccups: "⩌", ccupssm: "⩐", Cdot: "Ċ", cdot: "ċ", cedil: "¸", Cedilla: "¸", cemptyv: "⦲", cent: "¢", centerdot: "·", CenterDot: "·", cfr: "𝔠", Cfr: "ℭ", CHcy: "Ч", chcy: "ч", check: "✓", checkmark: "✓", Chi: "Χ", chi: "χ", circ: "ˆ", circeq: "≗", circlearrowleft: "↺", circlearrowright: "↻", circledast: "⊛", circledcirc: "⊚", circleddash: "⊝", CircleDot: "⊙", circledR: "®", circledS: "Ⓢ", CircleMinus: "⊖", CirclePlus: "⊕", CircleTimes: "⊗", cir: "○", cirE: "⧃", cire: "≗", cirfnint: "⨐", cirmid: "⫯", cirscir: "⧂", ClockwiseContourIntegral: "∲", CloseCurlyDoubleQuote: "”", CloseCurlyQuote: "’", clubs: "♣", clubsuit: "♣", colon: ":", Colon: "∷", Colone: "⩴", colone: "≔", coloneq: "≔", comma: ",", commat: "@", comp: "∁", compfn: "∘", complement: "∁", complexes: "ℂ", cong: "≅", congdot: "⩭", Congruent: "≡", conint: "∮", Conint: "∯", ContourIntegral: "∮", copf: "𝕔", Copf: "ℂ", coprod: "∐", Coproduct: "∐", copy: "©", COPY: "©", copysr: "℗", CounterClockwiseContourIntegral: "∳", crarr: "↵", cross: "✗", Cross: "⨯", Cscr: "𝒞", cscr: "𝒸", csub: "⫏", csube: "⫑", csup: "⫐", csupe: "⫒", ctdot: "⋯", cudarrl: "⤸", cudarrr: "⤵", cuepr: "⋞", cuesc: "⋟", cularr: "↶", cularrp: "⤽", cupbrcap: "⩈", cupcap: "⩆", CupCap: "≍", cup: "∪", Cup: "⋓", cupcup: "⩊", cupdot: "⊍", cupor: "⩅", cups: "∪︀", curarr: "↷", curarrm: "⤼", curlyeqprec: "⋞", curlyeqsucc: "⋟", curlyvee: "⋎", curlywedge: "⋏", curren: "¤", curvearrowleft: "↶", curvearrowright: "↷", cuvee: "⋎", cuwed: "⋏", cwconint: "∲", cwint: "∱", cylcty: "⌭", dagger: "†", Dagger: "‡", daleth: "ℸ", darr: "↓", Darr: "↡", dArr: "⇓", dash: "‐", Dashv: "⫤", dashv: "⊣", dbkarow: "⤏", dblac: "˝", Dcaron: "Ď", dcaron: "ď", Dcy: "Д", dcy: "д", ddagger: "‡", ddarr: "⇊", DD: "ⅅ", dd: "ⅆ", DDotrahd: "⤑", ddotseq: "⩷", deg: "°", Del: "∇", Delta: "Δ", delta: "δ", demptyv: "⦱", dfisht: "⥿", Dfr: "𝔇", dfr: "𝔡", dHar: "⥥", dharl: "⇃", dharr: "⇂", DiacriticalAcute: "´", DiacriticalDot: "˙", DiacriticalDoubleAcute: "˝", DiacriticalGrave: "`", DiacriticalTilde: "˜", diam: "⋄", diamond: "⋄", Diamond: "⋄", diamondsuit: "♦", diams: "♦", die: "¨", DifferentialD: "ⅆ", digamma: "ϝ", disin: "⋲", div: "÷", divide: "÷", divideontimes: "⋇", divonx: "⋇", DJcy: "Ђ", djcy: "ђ", dlcorn: "⌞", dlcrop: "⌍", dollar: "$", Dopf: "𝔻", dopf: "𝕕", Dot: "¨", dot: "˙", DotDot: "⃜", doteq: "≐", doteqdot: "≑", DotEqual: "≐", dotminus: "∸", dotplus: "∔", dotsquare: "⊡", doublebarwedge: "⌆", DoubleContourIntegral: "∯", DoubleDot: "¨", DoubleDownArrow: "⇓", DoubleLeftArrow: "⇐", DoubleLeftRightArrow: "⇔", DoubleLeftTee: "⫤", DoubleLongLeftArrow: "⟸", DoubleLongLeftRightArrow: "⟺", DoubleLongRightArrow: "⟹", DoubleRightArrow: "⇒", DoubleRightTee: "⊨", DoubleUpArrow: "⇑", DoubleUpDownArrow: "⇕", DoubleVerticalBar: "∥", DownArrowBar: "⤓", downarrow: "↓", DownArrow: "↓", Downarrow: "⇓", DownArrowUpArrow: "⇵", DownBreve: "̑", downdownarrows: "⇊", downharpoonleft: "⇃", downharpoonright: "⇂", DownLeftRightVector: "⥐", DownLeftTeeVector: "⥞", DownLeftVectorBar: "⥖", DownLeftVector: "↽", DownRightTeeVector: "⥟", DownRightVectorBar: "⥗", DownRightVector: "⇁", DownTeeArrow: "↧", DownTee: "⊤", drbkarow: "⤐", drcorn: "⌟", drcrop: "⌌", Dscr: "𝒟", dscr: "𝒹", DScy: "Ѕ", dscy: "ѕ", dsol: "⧶", Dstrok: "Đ", dstrok: "đ", dtdot: "⋱", dtri: "▿", dtrif: "▾", duarr: "⇵", duhar: "⥯", dwangle: "⦦", DZcy: "Џ", dzcy: "џ", dzigrarr: "⟿", Eacute: "É", eacute: "é", easter: "⩮", Ecaron: "Ě", ecaron: "ě", Ecirc: "Ê", ecirc: "ê", ecir: "≖", ecolon: "≕", Ecy: "Э", ecy: "э", eDDot: "⩷", Edot: "Ė", edot: "ė", eDot: "≑", ee: "ⅇ", efDot: "≒", Efr: "𝔈", efr: "𝔢", eg: "⪚", Egrave: "È", egrave: "è", egs: "⪖", egsdot: "⪘", el: "⪙", Element: "∈", elinters: "⏧", ell: "ℓ", els: "⪕", elsdot: "⪗", Emacr: "Ē", emacr: "ē", empty: "∅", emptyset: "∅", EmptySmallSquare: "◻", emptyv: "∅", EmptyVerySmallSquare: "▫", emsp13: " ", emsp14: " ", emsp: " ", ENG: "Ŋ", eng: "ŋ", ensp: " ", Eogon: "Ę", eogon: "ę", Eopf: "𝔼", eopf: "𝕖", epar: "⋕", eparsl: "⧣", eplus: "⩱", epsi: "ε", Epsilon: "Ε", epsilon: "ε", epsiv: "ϵ", eqcirc: "≖", eqcolon: "≕", eqsim: "≂", eqslantgtr: "⪖", eqslantless: "⪕", Equal: "⩵", equals: "=", EqualTilde: "≂", equest: "≟", Equilibrium: "⇌", equiv: "≡", equivDD: "⩸", eqvparsl: "⧥", erarr: "⥱", erDot: "≓", escr: "ℯ", Escr: "ℰ", esdot: "≐", Esim: "⩳", esim: "≂", Eta: "Η", eta: "η", ETH: "Ð", eth: "ð", Euml: "Ë", euml: "ë", euro: "€", excl: "!", exist: "∃", Exists: "∃", expectation: "ℰ", exponentiale: "ⅇ", ExponentialE: "ⅇ", fallingdotseq: "≒", Fcy: "Ф", fcy: "ф", female: "♀", ffilig: "ﬃ", fflig: "ﬀ", ffllig: "ﬄ", Ffr: "𝔉", ffr: "𝔣", filig: "ﬁ", FilledSmallSquare: "◼", FilledVerySmallSquare: "▪", fjlig: "fj", flat: "♭", fllig: "ﬂ", fltns: "▱", fnof: "ƒ", Fopf: "𝔽", fopf: "𝕗", forall: "∀", ForAll: "∀", fork: "⋔", forkv: "⫙", Fouriertrf: "ℱ", fpartint: "⨍", frac12: "½", frac13: "⅓", frac14: "¼", frac15: "⅕", frac16: "⅙", frac18: "⅛", frac23: "⅔", frac25: "⅖", frac34: "¾", frac35: "⅗", frac38: "⅜", frac45: "⅘", frac56: "⅚", frac58: "⅝", frac78: "⅞", frasl: "⁄", frown: "⌢", fscr: "𝒻", Fscr: "ℱ", gacute: "ǵ", Gamma: "Γ", gamma: "γ", Gammad: "Ϝ", gammad: "ϝ", gap: "⪆", Gbreve: "Ğ", gbreve: "ğ", Gcedil: "Ģ", Gcirc: "Ĝ", gcirc: "ĝ", Gcy: "Г", gcy: "г", Gdot: "Ġ", gdot: "ġ", ge: "≥", gE: "≧", gEl: "⪌", gel: "⋛", geq: "≥", geqq: "≧", geqslant: "⩾", gescc: "⪩", ges: "⩾", gesdot: "⪀", gesdoto: "⪂", gesdotol: "⪄", gesl: "⋛︀", gesles: "⪔", Gfr: "𝔊", gfr: "𝔤", gg: "≫", Gg: "⋙", ggg: "⋙", gimel: "ℷ", GJcy: "Ѓ", gjcy: "ѓ", gla: "⪥", gl: "≷", glE: "⪒", glj: "⪤", gnap: "⪊", gnapprox: "⪊", gne: "⪈", gnE: "≩", gneq: "⪈", gneqq: "≩", gnsim: "⋧", Gopf: "𝔾", gopf: "𝕘", grave: "`", GreaterEqual: "≥", GreaterEqualLess: "⋛", GreaterFullEqual: "≧", GreaterGreater: "⪢", GreaterLess: "≷", GreaterSlantEqual: "⩾", GreaterTilde: "≳", Gscr: "𝒢", gscr: "ℊ", gsim: "≳", gsime: "⪎", gsiml: "⪐", gtcc: "⪧", gtcir: "⩺", gt: ">", GT: ">", Gt: "≫", gtdot: "⋗", gtlPar: "⦕", gtquest: "⩼", gtrapprox: "⪆", gtrarr: "⥸", gtrdot: "⋗", gtreqless: "⋛", gtreqqless: "⪌", gtrless: "≷", gtrsim: "≳", gvertneqq: "≩︀", gvnE: "≩︀", Hacek: "ˇ", hairsp: " ", half: "½", hamilt: "ℋ", HARDcy: "Ъ", hardcy: "ъ", harrcir: "⥈", harr: "↔", hArr: "⇔", harrw: "↭", Hat: "^", hbar: "ℏ", Hcirc: "Ĥ", hcirc: "ĥ", hearts: "♥", heartsuit: "♥", hellip: "…", hercon: "⊹", hfr: "𝔥", Hfr: "ℌ", HilbertSpace: "ℋ", hksearow: "⤥", hkswarow: "⤦", hoarr: "⇿", homtht: "∻", hookleftarrow: "↩", hookrightarrow: "↪", hopf: "𝕙", Hopf: "ℍ", horbar: "―", HorizontalLine: "─", hscr: "𝒽", Hscr: "ℋ", hslash: "ℏ", Hstrok: "Ħ", hstrok: "ħ", HumpDownHump: "≎", HumpEqual: "≏", hybull: "⁃", hyphen: "‐", Iacute: "Í", iacute: "í", ic: "⁣", Icirc: "Î", icirc: "î", Icy: "И", icy: "и", Idot: "İ", IEcy: "Е", iecy: "е", iexcl: "¡", iff: "⇔", ifr: "𝔦", Ifr: "ℑ", Igrave: "Ì", igrave: "ì", ii: "ⅈ", iiiint: "⨌", iiint: "∭", iinfin: "⧜", iiota: "℩", IJlig: "Ĳ", ijlig: "ĳ", Imacr: "Ī", imacr: "ī", image: "ℑ", ImaginaryI: "ⅈ", imagline: "ℐ", imagpart: "ℑ", imath: "ı", Im: "ℑ", imof: "⊷", imped: "Ƶ", Implies: "⇒", incare: "℅", in: "∈", infin: "∞", infintie: "⧝", inodot: "ı", intcal: "⊺", int: "∫", Int: "∬", integers: "ℤ", Integral: "∫", intercal: "⊺", Intersection: "⋂", intlarhk: "⨗", intprod: "⨼", InvisibleComma: "⁣", InvisibleTimes: "⁢", IOcy: "Ё", iocy: "ё", Iogon: "Į", iogon: "į", Iopf: "𝕀", iopf: "𝕚", Iota: "Ι", iota: "ι", iprod: "⨼", iquest: "¿", iscr: "𝒾", Iscr: "ℐ", isin: "∈", isindot: "⋵", isinE: "⋹", isins: "⋴", isinsv: "⋳", isinv: "∈", it: "⁢", Itilde: "Ĩ", itilde: "ĩ", Iukcy: "І", iukcy: "і", Iuml: "Ï", iuml: "ï", Jcirc: "Ĵ", jcirc: "ĵ", Jcy: "Й", jcy: "й", Jfr: "𝔍", jfr: "𝔧", jmath: "ȷ", Jopf: "𝕁", jopf: "𝕛", Jscr: "𝒥", jscr: "𝒿", Jsercy: "Ј", jsercy: "ј", Jukcy: "Є", jukcy: "є", Kappa: "Κ", kappa: "κ", kappav: "ϰ", Kcedil: "Ķ", kcedil: "ķ", Kcy: "К", kcy: "к", Kfr: "𝔎", kfr: "𝔨", kgreen: "ĸ", KHcy: "Х", khcy: "х", KJcy: "Ќ", kjcy: "ќ", Kopf: "𝕂", kopf: "𝕜", Kscr: "𝒦", kscr: "𝓀", lAarr: "⇚", Lacute: "Ĺ", lacute: "ĺ", laemptyv: "⦴", lagran: "ℒ", Lambda: "Λ", lambda: "λ", lang: "⟨", Lang: "⟪", langd: "⦑", langle: "⟨", lap: "⪅", Laplacetrf: "ℒ", laquo: "«", larrb: "⇤", larrbfs: "⤟", larr: "←", Larr: "↞", lArr: "⇐", larrfs: "⤝", larrhk: "↩", larrlp: "↫", larrpl: "⤹", larrsim: "⥳", larrtl: "↢", latail: "⤙", lAtail: "⤛", lat: "⪫", late: "⪭", lates: "⪭︀", lbarr: "⤌", lBarr: "⤎", lbbrk: "❲", lbrace: "{", lbrack: "[", lbrke: "⦋", lbrksld: "⦏", lbrkslu: "⦍", Lcaron: "Ľ", lcaron: "ľ", Lcedil: "Ļ", lcedil: "ļ", lceil: "⌈", lcub: "{", Lcy: "Л", lcy: "л", ldca: "⤶", ldquo: "“", ldquor: "„", ldrdhar: "⥧", ldrushar: "⥋", ldsh: "↲", le: "≤", lE: "≦", LeftAngleBracket: "⟨", LeftArrowBar: "⇤", leftarrow: "←", LeftArrow: "←", Leftarrow: "⇐", LeftArrowRightArrow: "⇆", leftarrowtail: "↢", LeftCeiling: "⌈", LeftDoubleBracket: "⟦", LeftDownTeeVector: "⥡", LeftDownVectorBar: "⥙", LeftDownVector: "⇃", LeftFloor: "⌊", leftharpoondown: "↽", leftharpoonup: "↼", leftleftarrows: "⇇", leftrightarrow: "↔", LeftRightArrow: "↔", Leftrightarrow: "⇔", leftrightarrows: "⇆", leftrightharpoons: "⇋", leftrightsquigarrow: "↭", LeftRightVector: "⥎", LeftTeeArrow: "↤", LeftTee: "⊣", LeftTeeVector: "⥚", leftthreetimes: "⋋", LeftTriangleBar: "⧏", LeftTriangle: "⊲", LeftTriangleEqual: "⊴", LeftUpDownVector: "⥑", LeftUpTeeVector: "⥠", LeftUpVectorBar: "⥘", LeftUpVector: "↿", LeftVectorBar: "⥒", LeftVector: "↼", lEg: "⪋", leg: "⋚", leq: "≤", leqq: "≦", leqslant: "⩽", lescc: "⪨", les: "⩽", lesdot: "⩿", lesdoto: "⪁", lesdotor: "⪃", lesg: "⋚︀", lesges: "⪓", lessapprox: "⪅", lessdot: "⋖", lesseqgtr: "⋚", lesseqqgtr: "⪋", LessEqualGreater: "⋚", LessFullEqual: "≦", LessGreater: "≶", lessgtr: "≶", LessLess: "⪡", lesssim: "≲", LessSlantEqual: "⩽", LessTilde: "≲", lfisht: "⥼", lfloor: "⌊", Lfr: "𝔏", lfr: "𝔩", lg: "≶", lgE: "⪑", lHar: "⥢", lhard: "↽", lharu: "↼", lharul: "⥪", lhblk: "▄", LJcy: "Љ", ljcy: "љ", llarr: "⇇", ll: "≪", Ll: "⋘", llcorner: "⌞", Lleftarrow: "⇚", llhard: "⥫", lltri: "◺", Lmidot: "Ŀ", lmidot: "ŀ", lmoustache: "⎰", lmoust: "⎰", lnap: "⪉", lnapprox: "⪉", lne: "⪇", lnE: "≨", lneq: "⪇", lneqq: "≨", lnsim: "⋦", loang: "⟬", loarr: "⇽", lobrk: "⟦", longleftarrow: "⟵", LongLeftArrow: "⟵", Longleftarrow: "⟸", longleftrightarrow: "⟷", LongLeftRightArrow: "⟷", Longleftrightarrow: "⟺", longmapsto: "⟼", longrightarrow: "⟶", LongRightArrow: "⟶", Longrightarrow: "⟹", looparrowleft: "↫", looparrowright: "↬", lopar: "⦅", Lopf: "𝕃", lopf: "𝕝", loplus: "⨭", lotimes: "⨴", lowast: "∗", lowbar: "_", LowerLeftArrow: "↙", LowerRightArrow: "↘", loz: "◊", lozenge: "◊", lozf: "⧫", lpar: "(", lparlt: "⦓", lrarr: "⇆", lrcorner: "⌟", lrhar: "⇋", lrhard: "⥭", lrm: "‎", lrtri: "⊿", lsaquo: "‹", lscr: "𝓁", Lscr: "ℒ", lsh: "↰", Lsh: "↰", lsim: "≲", lsime: "⪍", lsimg: "⪏", lsqb: "[", lsquo: "‘", lsquor: "‚", Lstrok: "Ł", lstrok: "ł", ltcc: "⪦", ltcir: "⩹", lt: "<", LT: "<", Lt: "≪", ltdot: "⋖", lthree: "⋋", ltimes: "⋉", ltlarr: "⥶", ltquest: "⩻", ltri: "◃", ltrie: "⊴", ltrif: "◂", ltrPar: "⦖", lurdshar: "⥊", luruhar: "⥦", lvertneqq: "≨︀", lvnE: "≨︀", macr: "¯", male: "♂", malt: "✠", maltese: "✠", Map: "⤅", map: "↦", mapsto: "↦", mapstodown: "↧", mapstoleft: "↤", mapstoup: "↥", marker: "▮", mcomma: "⨩", Mcy: "М", mcy: "м", mdash: "—", mDDot: "∺", measuredangle: "∡", MediumSpace: " ", Mellintrf: "ℳ", Mfr: "𝔐", mfr: "𝔪", mho: "℧", micro: "µ", midast: "*", midcir: "⫰", mid: "∣", middot: "·", minusb: "⊟", minus: "−", minusd: "∸", minusdu: "⨪", MinusPlus: "∓", mlcp: "⫛", mldr: "…", mnplus: "∓", models: "⊧", Mopf: "𝕄", mopf: "𝕞", mp: "∓", mscr: "𝓂", Mscr: "ℳ", mstpos: "∾", Mu: "Μ", mu: "μ", multimap: "⊸", mumap: "⊸", nabla: "∇", Nacute: "Ń", nacute: "ń", nang: "∠⃒", nap: "≉", napE: "⩰̸", napid: "≋̸", napos: "ŉ", napprox: "≉", natural: "♮", naturals: "ℕ", natur: "♮", nbsp: " ", nbump: "≎̸", nbumpe: "≏̸", ncap: "⩃", Ncaron: "Ň", ncaron: "ň", Ncedil: "Ņ", ncedil: "ņ", ncong: "≇", ncongdot: "⩭̸", ncup: "⩂", Ncy: "Н", ncy: "н", ndash: "–", nearhk: "⤤", nearr: "↗", neArr: "⇗", nearrow: "↗", ne: "≠", nedot: "≐̸", NegativeMediumSpace: "​", NegativeThickSpace: "​", NegativeThinSpace: "​", NegativeVeryThinSpace: "​", nequiv: "≢", nesear: "⤨", nesim: "≂̸", NestedGreaterGreater: "≫", NestedLessLess: "≪", NewLine: "\n", nexist: "∄", nexists: "∄", Nfr: "𝔑", nfr: "𝔫", ngE: "≧̸", nge: "≱", ngeq: "≱", ngeqq: "≧̸", ngeqslant: "⩾̸", nges: "⩾̸", nGg: "⋙̸", ngsim: "≵", nGt: "≫⃒", ngt: "≯", ngtr: "≯", nGtv: "≫̸", nharr: "↮", nhArr: "⇎", nhpar: "⫲", ni: "∋", nis: "⋼", nisd: "⋺", niv: "∋", NJcy: "Њ", njcy: "њ", nlarr: "↚", nlArr: "⇍", nldr: "‥", nlE: "≦̸", nle: "≰", nleftarrow: "↚", nLeftarrow: "⇍", nleftrightarrow: "↮", nLeftrightarrow: "⇎", nleq: "≰", nleqq: "≦̸", nleqslant: "⩽̸", nles: "⩽̸", nless: "≮", nLl: "⋘̸", nlsim: "≴", nLt: "≪⃒", nlt: "≮", nltri: "⋪", nltrie: "⋬", nLtv: "≪̸", nmid: "∤", NoBreak: "⁠", NonBreakingSpace: " ", nopf: "𝕟", Nopf: "ℕ", Not: "⫬", not: "¬", NotCongruent: "≢", NotCupCap: "≭", NotDoubleVerticalBar: "∦", NotElement: "∉", NotEqual: "≠", NotEqualTilde: "≂̸", NotExists: "∄", NotGreater: "≯", NotGreaterEqual: "≱", NotGreaterFullEqual: "≧̸", NotGreaterGreater: "≫̸", NotGreaterLess: "≹", NotGreaterSlantEqual: "⩾̸", NotGreaterTilde: "≵", NotHumpDownHump: "≎̸", NotHumpEqual: "≏̸", notin: "∉", notindot: "⋵̸", notinE: "⋹̸", notinva: "∉", notinvb: "⋷", notinvc: "⋶", NotLeftTriangleBar: "⧏̸", NotLeftTriangle: "⋪", NotLeftTriangleEqual: "⋬", NotLess: "≮", NotLessEqual: "≰", NotLessGreater: "≸", NotLessLess: "≪̸", NotLessSlantEqual: "⩽̸", NotLessTilde: "≴", NotNestedGreaterGreater: "⪢̸", NotNestedLessLess: "⪡̸", notni: "∌", notniva: "∌", notnivb: "⋾", notnivc: "⋽", NotPrecedes: "⊀", NotPrecedesEqual: "⪯̸", NotPrecedesSlantEqual: "⋠", NotReverseElement: "∌", NotRightTriangleBar: "⧐̸", NotRightTriangle: "⋫", NotRightTriangleEqual: "⋭", NotSquareSubset: "⊏̸", NotSquareSubsetEqual: "⋢", NotSquareSuperset: "⊐̸", NotSquareSupersetEqual: "⋣", NotSubset: "⊂⃒", NotSubsetEqual: "⊈", NotSucceeds: "⊁", NotSucceedsEqual: "⪰̸", NotSucceedsSlantEqual: "⋡", NotSucceedsTilde: "≿̸", NotSuperset: "⊃⃒", NotSupersetEqual: "⊉", NotTilde: "≁", NotTildeEqual: "≄", NotTildeFullEqual: "≇", NotTildeTilde: "≉", NotVerticalBar: "∤", nparallel: "∦", npar: "∦", nparsl: "⫽⃥", npart: "∂̸", npolint: "⨔", npr: "⊀", nprcue: "⋠", nprec: "⊀", npreceq: "⪯̸", npre: "⪯̸", nrarrc: "⤳̸", nrarr: "↛", nrArr: "⇏", nrarrw: "↝̸", nrightarrow: "↛", nRightarrow: "⇏", nrtri: "⋫", nrtrie: "⋭", nsc: "⊁", nsccue: "⋡", nsce: "⪰̸", Nscr: "𝒩", nscr: "𝓃", nshortmid: "∤", nshortparallel: "∦", nsim: "≁", nsime: "≄", nsimeq: "≄", nsmid: "∤", nspar: "∦", nsqsube: "⋢", nsqsupe: "⋣", nsub: "⊄", nsubE: "⫅̸", nsube: "⊈", nsubset: "⊂⃒", nsubseteq: "⊈", nsubseteqq: "⫅̸", nsucc: "⊁", nsucceq: "⪰̸", nsup: "⊅", nsupE: "⫆̸", nsupe: "⊉", nsupset: "⊃⃒", nsupseteq: "⊉", nsupseteqq: "⫆̸", ntgl: "≹", Ntilde: "Ñ", ntilde: "ñ", ntlg: "≸", ntriangleleft: "⋪", ntrianglelefteq: "⋬", ntriangleright: "⋫", ntrianglerighteq: "⋭", Nu: "Ν", nu: "ν", num: "#", numero: "№", numsp: " ", nvap: "≍⃒", nvdash: "⊬", nvDash: "⊭", nVdash: "⊮", nVDash: "⊯", nvge: "≥⃒", nvgt: ">⃒", nvHarr: "⤄", nvinfin: "⧞", nvlArr: "⤂", nvle: "≤⃒", nvlt: "<⃒", nvltrie: "⊴⃒", nvrArr: "⤃", nvrtrie: "⊵⃒", nvsim: "∼⃒", nwarhk: "⤣", nwarr: "↖", nwArr: "⇖", nwarrow: "↖", nwnear: "⤧", Oacute: "Ó", oacute: "ó", oast: "⊛", Ocirc: "Ô", ocirc: "ô", ocir: "⊚", Ocy: "О", ocy: "о", odash: "⊝", Odblac: "Ő", odblac: "ő", odiv: "⨸", odot: "⊙", odsold: "⦼", OElig: "Œ", oelig: "œ", ofcir: "⦿", Ofr: "𝔒", ofr: "𝔬", ogon: "˛", Ograve: "Ò", ograve: "ò", ogt: "⧁", ohbar: "⦵", ohm: "Ω", oint: "∮", olarr: "↺", olcir: "⦾", olcross: "⦻", oline: "‾", olt: "⧀", Omacr: "Ō", omacr: "ō", Omega: "Ω", omega: "ω", Omicron: "Ο", omicron: "ο", omid: "⦶", ominus: "⊖", Oopf: "𝕆", oopf: "𝕠", opar: "⦷", OpenCurlyDoubleQuote: "“", OpenCurlyQuote: "‘", operp: "⦹", oplus: "⊕", orarr: "↻", Or: "⩔", or: "∨", ord: "⩝", order: "ℴ", orderof: "ℴ", ordf: "ª", ordm: "º", origof: "⊶", oror: "⩖", orslope: "⩗", orv: "⩛", oS: "Ⓢ", Oscr: "𝒪", oscr: "ℴ", Oslash: "Ø", oslash: "ø", osol: "⊘", Otilde: "Õ", otilde: "õ", otimesas: "⨶", Otimes: "⨷", otimes: "⊗", Ouml: "Ö", ouml: "ö", ovbar: "⌽", OverBar: "‾", OverBrace: "⏞", OverBracket: "⎴", OverParenthesis: "⏜", para: "¶", parallel: "∥", par: "∥", parsim: "⫳", parsl: "⫽", part: "∂", PartialD: "∂", Pcy: "П", pcy: "п", percnt: "%", period: ".", permil: "‰", perp: "⊥", pertenk: "‱", Pfr: "𝔓", pfr: "𝔭", Phi: "Φ", phi: "φ", phiv: "ϕ", phmmat: "ℳ", phone: "☎", Pi: "Π", pi: "π", pitchfork: "⋔", piv: "ϖ", planck: "ℏ", planckh: "ℎ", plankv: "ℏ", plusacir: "⨣", plusb: "⊞", pluscir: "⨢", plus: "+", plusdo: "∔", plusdu: "⨥", pluse: "⩲", PlusMinus: "±", plusmn: "±", plussim: "⨦", plustwo: "⨧", pm: "±", Poincareplane: "ℌ", pointint: "⨕", popf: "𝕡", Popf: "ℙ", pound: "£", prap: "⪷", Pr: "⪻", pr: "≺", prcue: "≼", precapprox: "⪷", prec: "≺", preccurlyeq: "≼", Precedes: "≺", PrecedesEqual: "⪯", PrecedesSlantEqual: "≼", PrecedesTilde: "≾", preceq: "⪯", precnapprox: "⪹", precneqq: "⪵", precnsim: "⋨", pre: "⪯", prE: "⪳", precsim: "≾", prime: "′", Prime: "″", primes: "ℙ", prnap: "⪹", prnE: "⪵", prnsim: "⋨", prod: "∏", Product: "∏", profalar: "⌮", profline: "⌒", profsurf: "⌓", prop: "∝", Proportional: "∝", Proportion: "∷", propto: "∝", prsim: "≾", prurel: "⊰", Pscr: "𝒫", pscr: "𝓅", Psi: "Ψ", psi: "ψ", puncsp: " ", Qfr: "𝔔", qfr: "𝔮", qint: "⨌", qopf: "𝕢", Qopf: "ℚ", qprime: "⁗", Qscr: "𝒬", qscr: "𝓆", quaternions: "ℍ", quatint: "⨖", quest: "?", questeq: "≟", quot: '"', QUOT: '"', rAarr: "⇛", race: "∽̱", Racute: "Ŕ", racute: "ŕ", radic: "√", raemptyv: "⦳", rang: "⟩", Rang: "⟫", rangd: "⦒", range: "⦥", rangle: "⟩", raquo: "»", rarrap: "⥵", rarrb: "⇥", rarrbfs: "⤠", rarrc: "⤳", rarr: "→", Rarr: "↠", rArr: "⇒", rarrfs: "⤞", rarrhk: "↪", rarrlp: "↬", rarrpl: "⥅", rarrsim: "⥴", Rarrtl: "⤖", rarrtl: "↣", rarrw: "↝", ratail: "⤚", rAtail: "⤜", ratio: "∶", rationals: "ℚ", rbarr: "⤍", rBarr: "⤏", RBarr: "⤐", rbbrk: "❳", rbrace: "}", rbrack: "]", rbrke: "⦌", rbrksld: "⦎", rbrkslu: "⦐", Rcaron: "Ř", rcaron: "ř", Rcedil: "Ŗ", rcedil: "ŗ", rceil: "⌉", rcub: "}", Rcy: "Р", rcy: "р", rdca: "⤷", rdldhar: "⥩", rdquo: "”", rdquor: "”", rdsh: "↳", real: "ℜ", realine: "ℛ", realpart: "ℜ", reals: "ℝ", Re: "ℜ", rect: "▭", reg: "®", REG: "®", ReverseElement: "∋", ReverseEquilibrium: "⇋", ReverseUpEquilibrium: "⥯", rfisht: "⥽", rfloor: "⌋", rfr: "𝔯", Rfr: "ℜ", rHar: "⥤", rhard: "⇁", rharu: "⇀", rharul: "⥬", Rho: "Ρ", rho: "ρ", rhov: "ϱ", RightAngleBracket: "⟩", RightArrowBar: "⇥", rightarrow: "→", RightArrow: "→", Rightarrow: "⇒", RightArrowLeftArrow: "⇄", rightarrowtail: "↣", RightCeiling: "⌉", RightDoubleBracket: "⟧", RightDownTeeVector: "⥝", RightDownVectorBar: "⥕", RightDownVector: "⇂", RightFloor: "⌋", rightharpoondown: "⇁", rightharpoonup: "⇀", rightleftarrows: "⇄", rightleftharpoons: "⇌", rightrightarrows: "⇉", rightsquigarrow: "↝", RightTeeArrow: "↦", RightTee: "⊢", RightTeeVector: "⥛", rightthreetimes: "⋌", RightTriangleBar: "⧐", RightTriangle: "⊳", RightTriangleEqual: "⊵", RightUpDownVector: "⥏", RightUpTeeVector: "⥜", RightUpVectorBar: "⥔", RightUpVector: "↾", RightVectorBar: "⥓", RightVector: "⇀", ring: "˚", risingdotseq: "≓", rlarr: "⇄", rlhar: "⇌", rlm: "‏", rmoustache: "⎱", rmoust: "⎱", rnmid: "⫮", roang: "⟭", roarr: "⇾", robrk: "⟧", ropar: "⦆", ropf: "𝕣", Ropf: "ℝ", roplus: "⨮", rotimes: "⨵", RoundImplies: "⥰", rpar: ")", rpargt: "⦔", rppolint: "⨒", rrarr: "⇉", Rrightarrow: "⇛", rsaquo: "›", rscr: "𝓇", Rscr: "ℛ", rsh: "↱", Rsh: "↱", rsqb: "]", rsquo: "’", rsquor: "’", rthree: "⋌", rtimes: "⋊", rtri: "▹", rtrie: "⊵", rtrif: "▸", rtriltri: "⧎", RuleDelayed: "⧴", ruluhar: "⥨", rx: "℞", Sacute: "Ś", sacute: "ś", sbquo: "‚", scap: "⪸", Scaron: "Š", scaron: "š", Sc: "⪼", sc: "≻", sccue: "≽", sce: "⪰", scE: "⪴", Scedil: "Ş", scedil: "ş", Scirc: "Ŝ", scirc: "ŝ", scnap: "⪺", scnE: "⪶", scnsim: "⋩", scpolint: "⨓", scsim: "≿", Scy: "С", scy: "с", sdotb: "⊡", sdot: "⋅", sdote: "⩦", searhk: "⤥", searr: "↘", seArr: "⇘", searrow: "↘", sect: "§", semi: ";", seswar: "⤩", setminus: "∖", setmn: "∖", sext: "✶", Sfr: "𝔖", sfr: "𝔰", sfrown: "⌢", sharp: "♯", SHCHcy: "Щ", shchcy: "щ", SHcy: "Ш", shcy: "ш", ShortDownArrow: "↓", ShortLeftArrow: "←", shortmid: "∣", shortparallel: "∥", ShortRightArrow: "→", ShortUpArrow: "↑", shy: "­", Sigma: "Σ", sigma: "σ", sigmaf: "ς", sigmav: "ς", sim: "∼", simdot: "⩪", sime: "≃", simeq: "≃", simg: "⪞", simgE: "⪠", siml: "⪝", simlE: "⪟", simne: "≆", simplus: "⨤", simrarr: "⥲", slarr: "←", SmallCircle: "∘", smallsetminus: "∖", smashp: "⨳", smeparsl: "⧤", smid: "∣", smile: "⌣", smt: "⪪", smte: "⪬", smtes: "⪬︀", SOFTcy: "Ь", softcy: "ь", solbar: "⌿", solb: "⧄", sol: "/", Sopf: "𝕊", sopf: "𝕤", spades: "♠", spadesuit: "♠", spar: "∥", sqcap: "⊓", sqcaps: "⊓︀", sqcup: "⊔", sqcups: "⊔︀", Sqrt: "√", sqsub: "⊏", sqsube: "⊑", sqsubset: "⊏", sqsubseteq: "⊑", sqsup: "⊐", sqsupe: "⊒", sqsupset: "⊐", sqsupseteq: "⊒", square: "□", Square: "□", SquareIntersection: "⊓", SquareSubset: "⊏", SquareSubsetEqual: "⊑", SquareSuperset: "⊐", SquareSupersetEqual: "⊒", SquareUnion: "⊔", squarf: "▪", squ: "□", squf: "▪", srarr: "→", Sscr: "𝒮", sscr: "𝓈", ssetmn: "∖", ssmile: "⌣", sstarf: "⋆", Star: "⋆", star: "☆", starf: "★", straightepsilon: "ϵ", straightphi: "ϕ", strns: "¯", sub: "⊂", Sub: "⋐", subdot: "⪽", subE: "⫅", sube: "⊆", subedot: "⫃", submult: "⫁", subnE: "⫋", subne: "⊊", subplus: "⪿", subrarr: "⥹", subset: "⊂", Subset: "⋐", subseteq: "⊆", subseteqq: "⫅", SubsetEqual: "⊆", subsetneq: "⊊", subsetneqq: "⫋", subsim: "⫇", subsub: "⫕", subsup: "⫓", succapprox: "⪸", succ: "≻", succcurlyeq: "≽", Succeeds: "≻", SucceedsEqual: "⪰", SucceedsSlantEqual: "≽", SucceedsTilde: "≿", succeq: "⪰", succnapprox: "⪺", succneqq: "⪶", succnsim: "⋩", succsim: "≿", SuchThat: "∋", sum: "∑", Sum: "∑", sung: "♪", sup1: "¹", sup2: "²", sup3: "³", sup: "⊃", Sup: "⋑", supdot: "⪾", supdsub: "⫘", supE: "⫆", supe: "⊇", supedot: "⫄", Superset: "⊃", SupersetEqual: "⊇", suphsol: "⟉", suphsub: "⫗", suplarr: "⥻", supmult: "⫂", supnE: "⫌", supne: "⊋", supplus: "⫀", supset: "⊃", Supset: "⋑", supseteq: "⊇", supseteqq: "⫆", supsetneq: "⊋", supsetneqq: "⫌", supsim: "⫈", supsub: "⫔", supsup: "⫖", swarhk: "⤦", swarr: "↙", swArr: "⇙", swarrow: "↙", swnwar: "⤪", szlig: "ß", Tab: "\t", target: "⌖", Tau: "Τ", tau: "τ", tbrk: "⎴", Tcaron: "Ť", tcaron: "ť", Tcedil: "Ţ", tcedil: "ţ", Tcy: "Т", tcy: "т", tdot: "⃛", telrec: "⌕", Tfr: "𝔗", tfr: "𝔱", there4: "∴", therefore: "∴", Therefore: "∴", Theta: "Θ", theta: "θ", thetasym: "ϑ", thetav: "ϑ", thickapprox: "≈", thicksim: "∼", ThickSpace: "  ", ThinSpace: " ", thinsp: " ", thkap: "≈", thksim: "∼", THORN: "Þ", thorn: "þ", tilde: "˜", Tilde: "∼", TildeEqual: "≃", TildeFullEqual: "≅", TildeTilde: "≈", timesbar: "⨱", timesb: "⊠", times: "×", timesd: "⨰", tint: "∭", toea: "⤨", topbot: "⌶", topcir: "⫱", top: "⊤", Topf: "𝕋", topf: "𝕥", topfork: "⫚", tosa: "⤩", tprime: "‴", trade: "™", TRADE: "™", triangle: "▵", triangledown: "▿", triangleleft: "◃", trianglelefteq: "⊴", triangleq: "≜", triangleright: "▹", trianglerighteq: "⊵", tridot: "◬", trie: "≜", triminus: "⨺", TripleDot: "⃛", triplus: "⨹", trisb: "⧍", tritime: "⨻", trpezium: "⏢", Tscr: "𝒯", tscr: "𝓉", TScy: "Ц", tscy: "ц", TSHcy: "Ћ", tshcy: "ћ", Tstrok: "Ŧ", tstrok: "ŧ", twixt: "≬", twoheadleftarrow: "↞", twoheadrightarrow: "↠", Uacute: "Ú", uacute: "ú", uarr: "↑", Uarr: "↟", uArr: "⇑", Uarrocir: "⥉", Ubrcy: "Ў", ubrcy: "ў", Ubreve: "Ŭ", ubreve: "ŭ", Ucirc: "Û", ucirc: "û", Ucy: "У", ucy: "у", udarr: "⇅", Udblac: "Ű", udblac: "ű", udhar: "⥮", ufisht: "⥾", Ufr: "𝔘", ufr: "𝔲", Ugrave: "Ù", ugrave: "ù", uHar: "⥣", uharl: "↿", uharr: "↾", uhblk: "▀", ulcorn: "⌜", ulcorner: "⌜", ulcrop: "⌏", ultri: "◸", Umacr: "Ū", umacr: "ū", uml: "¨", UnderBar: "_", UnderBrace: "⏟", UnderBracket: "⎵", UnderParenthesis: "⏝", Union: "⋃", UnionPlus: "⊎", Uogon: "Ų", uogon: "ų", Uopf: "𝕌", uopf: "𝕦", UpArrowBar: "⤒", uparrow: "↑", UpArrow: "↑", Uparrow: "⇑", UpArrowDownArrow: "⇅", updownarrow: "↕", UpDownArrow: "↕", Updownarrow: "⇕", UpEquilibrium: "⥮", upharpoonleft: "↿", upharpoonright: "↾", uplus: "⊎", UpperLeftArrow: "↖", UpperRightArrow: "↗", upsi: "υ", Upsi: "ϒ", upsih: "ϒ", Upsilon: "Υ", upsilon: "υ", UpTeeArrow: "↥", UpTee: "⊥", upuparrows: "⇈", urcorn: "⌝", urcorner: "⌝", urcrop: "⌎", Uring: "Ů", uring: "ů", urtri: "◹", Uscr: "𝒰", uscr: "𝓊", utdot: "⋰", Utilde: "Ũ", utilde: "ũ", utri: "▵", utrif: "▴", uuarr: "⇈", Uuml: "Ü", uuml: "ü", uwangle: "⦧", vangrt: "⦜", varepsilon: "ϵ", varkappa: "ϰ", varnothing: "∅", varphi: "ϕ", varpi: "ϖ", varpropto: "∝", varr: "↕", vArr: "⇕", varrho: "ϱ", varsigma: "ς", varsubsetneq: "⊊︀", varsubsetneqq: "⫋︀", varsupsetneq: "⊋︀", varsupsetneqq: "⫌︀", vartheta: "ϑ", vartriangleleft: "⊲", vartriangleright: "⊳", vBar: "⫨", Vbar: "⫫", vBarv: "⫩", Vcy: "В", vcy: "в", vdash: "⊢", vDash: "⊨", Vdash: "⊩", VDash: "⊫", Vdashl: "⫦", veebar: "⊻", vee: "∨", Vee: "⋁", veeeq: "≚", vellip: "⋮", verbar: "|", Verbar: "‖", vert: "|", Vert: "‖", VerticalBar: "∣", VerticalLine: "|", VerticalSeparator: "❘", VerticalTilde: "≀", VeryThinSpace: " ", Vfr: "𝔙", vfr: "𝔳", vltri: "⊲", vnsub: "⊂⃒", vnsup: "⊃⃒", Vopf: "𝕍", vopf: "𝕧", vprop: "∝", vrtri: "⊳", Vscr: "𝒱", vscr: "𝓋", vsubnE: "⫋︀", vsubne: "⊊︀", vsupnE: "⫌︀", vsupne: "⊋︀", Vvdash: "⊪", vzigzag: "⦚", Wcirc: "Ŵ", wcirc: "ŵ", wedbar: "⩟", wedge: "∧", Wedge: "⋀", wedgeq: "≙", weierp: "℘", Wfr: "𝔚", wfr: "𝔴", Wopf: "𝕎", wopf: "𝕨", wp: "℘", wr: "≀", wreath: "≀", Wscr: "𝒲", wscr: "𝓌", xcap: "⋂", xcirc: "◯", xcup: "⋃", xdtri: "▽", Xfr: "𝔛", xfr: "𝔵", xharr: "⟷", xhArr: "⟺", Xi: "Ξ", xi: "ξ", xlarr: "⟵", xlArr: "⟸", xmap: "⟼", xnis: "⋻", xodot: "⨀", Xopf: "𝕏", xopf: "𝕩", xoplus: "⨁", xotime: "⨂", xrarr: "⟶", xrArr: "⟹", Xscr: "𝒳", xscr: "𝓍", xsqcup: "⨆", xuplus: "⨄", xutri: "△", xvee: "⋁", xwedge: "⋀", Yacute: "Ý", yacute: "ý", YAcy: "Я", yacy: "я", Ycirc: "Ŷ", ycirc: "ŷ", Ycy: "Ы", ycy: "ы", yen: "¥", Yfr: "𝔜", yfr: "𝔶", YIcy: "Ї", yicy: "ї", Yopf: "𝕐", yopf: "𝕪", Yscr: "𝒴", yscr: "𝓎", YUcy: "Ю", yucy: "ю", yuml: "ÿ", Yuml: "Ÿ", Zacute: "Ź", zacute: "ź", Zcaron: "Ž", zcaron: "ž", Zcy: "З", zcy: "з", Zdot: "Ż", zdot: "ż", zeetrf: "ℨ", ZeroWidthSpace: "​", Zeta: "Ζ", zeta: "ζ", zfr: "𝔷", Zfr: "ℨ", ZHcy: "Ж", zhcy: "ж", zigrarr: "⇝", zopf: "𝕫", Zopf: "ℤ", Zscr: "𝒵", zscr: "𝓏", zwj: "‍", zwnj: "‌" };

/***/ }),
/* 57 */
/*!*****************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/parse2/entities/maps/legacy.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
module.exports = { Aacute: "Á", aacute: "á", Acirc: "Â", acirc: "â", acute: "´", AElig: "Æ", aelig: "æ", Agrave: "À", agrave: "à", amp: "&", AMP: "&", Aring: "Å", aring: "å", Atilde: "Ã", atilde: "ã", Auml: "Ä", auml: "ä", brvbar: "¦", Ccedil: "Ç", ccedil: "ç", cedil: "¸", cent: "¢", copy: "©", COPY: "©", curren: "¤", deg: "°", divide: "÷", Eacute: "É", eacute: "é", Ecirc: "Ê", ecirc: "ê", Egrave: "È", egrave: "è", ETH: "Ð", eth: "ð", Euml: "Ë", euml: "ë", frac12: "½", frac14: "¼", frac34: "¾", gt: ">", GT: ">", Iacute: "Í", iacute: "í", Icirc: "Î", icirc: "î", iexcl: "¡", Igrave: "Ì", igrave: "ì", iquest: "¿", Iuml: "Ï", iuml: "ï", laquo: "«", lt: "<", LT: "<", macr: "¯", micro: "µ", middot: "·", nbsp: " ", not: "¬", Ntilde: "Ñ", ntilde: "ñ", Oacute: "Ó", oacute: "ó", Ocirc: "Ô", ocirc: "ô", Ograve: "Ò", ograve: "ò", ordf: "ª", ordm: "º", Oslash: "Ø", oslash: "ø", Otilde: "Õ", otilde: "õ", Ouml: "Ö", ouml: "ö", para: "¶", plusmn: "±", pound: "£", quot: '"', QUOT: '"', raquo: "»", reg: "®", REG: "®", sect: "§", shy: "­", sup1: "¹", sup2: "²", sup3: "³", szlig: "ß", THORN: "Þ", thorn: "þ", times: "×", Uacute: "Ú", uacute: "ú", Ucirc: "Û", ucirc: "û", Ugrave: "Ù", ugrave: "ù", uml: "¨", Uuml: "Ü", uuml: "ü", Yacute: "Ý", yacute: "ý", yen: "¥", yuml: "ÿ" };

/***/ }),
/* 58 */
/*!**************************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/parse/parse2/entities/maps/xml.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
module.exports = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };

/***/ }),
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */
/*!*****************************************************!*\
  !*** D:/My-Document/projects/WanBig/async/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.request = void 0;var request = function request(filePath) {
  wx.showLoading({
    title: "加载中" });

  return new Promise(function (resolve, reject) {
    wx.cloud.uploadFile({
      cloudPath: "good-pictures/" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000),
      filePath: filePath,
      name: "file",
      formData: { user: "test" },
      success: function success(res) {
        resolve(res);
        console.log("调用异步请求成功");
      },
      fail: function fail(err) {
        reject(err);
        console.log("调用异步请求失败");
      },
      complete: function complete() {
        wx.hideLoading();
      } });

  });
};exports.request = request;

/***/ }),
/* 74 */
/*!***********************************************************!*\
  !*** D:/My-Document/projects/WanBig/pages/utils/delay.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.delay = delay;function delay(milSec) {
  console.log("延迟2秒.....");
  return new Promise(function (resolve) {
    setTimeout(resolve, milSec);
  });
}

/***/ }),
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */
/*!****************************************************************!*\
  !*** D:/My-Document/projects/WanBig/pages/utils/formatTime.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join("-") + " " + [hour, minute].map(formatNumber).join(":");
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

module.exports = {
  formatTime: formatTime };

/***/ }),
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */
/*!*************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/pages/utils/formatTimeToChinese.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function formatTimeToChinese(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  return year + "年" + month + "月" + day + "日";
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

module.exports = {
  formatTimeToChinese: formatTimeToChinese };

/***/ }),
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */
/*!**********************************************************************!*\
  !*** D:/My-Document/projects/WanBig/wxcomponents/vant/icon/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _component = __webpack_require__(/*! ../common/component */ 125);
(0, _component.VantComponent)({
  props: {
    dot: Boolean,
    info: null,
    size: null,
    color: String,
    customStyle: String,
    classPrefix: {
      type: String,
      value: 'van-icon' },

    name: String },

  methods: {
    onClick: function onClick() {
      this.$emit('click');
    } } });

/***/ }),
/* 125 */
/*!****************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/wxcomponents/vant/common/component.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.VantComponent = VantComponent;var _basic = __webpack_require__(/*! ../mixins/basic */ 126);
function mapKeys(source, target, map) {
  Object.keys(map).forEach(function (key) {
    if (source[key]) {
      target[map[key]] = source[key];
    }
  });
}
function VantComponent(vantOptions) {
  var options = {};
  mapKeys(vantOptions, options, {
    data: 'data',
    props: 'properties',
    mixins: 'behaviors',
    methods: 'methods',
    beforeCreate: 'created',
    created: 'attached',
    mounted: 'ready',
    destroyed: 'detached',
    classes: 'externalClasses' });

  // add default externalClasses
  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push('custom-class');
  // add default behaviors
  options.behaviors = options.behaviors || [];
  options.behaviors.push(_basic.basic);
  // add relations
  var relation = vantOptions.relation;
  if (relation) {
    options.relations = relation.relations;
    options.behaviors.push(relation.mixin);
  }
  // map field to form-field behavior
  if (vantOptions.field) {
    options.behaviors.push('wx://form-field');
  }
  // add default options
  options.options = {
    multipleSlots: true,
    addGlobalClass: true };

  Component(options);
}

/***/ }),
/* 126 */
/*!************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/wxcomponents/vant/mixins/basic.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.basic = void 0;var basic = Behavior({
  methods: {
    $emit: function $emit(name, detail, options) {
      this.triggerEvent(name, detail, options);
    },
    set: function set(data) {
      this.setData(data);
      return new Promise(function (resolve) {return wx.nextTick(resolve);});
    } } });exports.basic = basic;

/***/ }),
/* 127 */
/*!***********************************************************************!*\
  !*** D:/My-Document/projects/WanBig/wxcomponents/vant/popup/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _component = __webpack_require__(/*! ../common/component */ 125);
var _transition = __webpack_require__(/*! ../mixins/transition */ 128);
(0, _component.VantComponent)({
  classes: [
  'enter-class',
  'enter-active-class',
  'enter-to-class',
  'leave-class',
  'leave-active-class',
  'leave-to-class',
  'close-icon-class'],

  mixins: [(0, _transition.transition)(false)],
  props: {
    round: Boolean,
    closeable: Boolean,
    customStyle: String,
    overlayStyle: String,
    transition: {
      type: String,
      observer: 'observeClass' },

    zIndex: {
      type: Number,
      value: 100 },

    overlay: {
      type: Boolean,
      value: true },

    closeIcon: {
      type: String,
      value: 'cross' },

    closeIconPosition: {
      type: String,
      value: 'top-right' },

    closeOnClickOverlay: {
      type: Boolean,
      value: true },

    position: {
      type: String,
      value: 'center',
      observer: 'observeClass' },

    safeAreaInsetBottom: {
      type: Boolean,
      value: true },

    safeAreaInsetTop: {
      type: Boolean,
      value: false },

    lockScroll: {
      type: Boolean,
      value: true } },


  created: function created() {
    this.observeClass();
  },
  methods: {
    onClickCloseIcon: function onClickCloseIcon() {
      this.$emit('close');
    },
    onClickOverlay: function onClickOverlay() {
      this.$emit('click-overlay');
      if (this.data.closeOnClickOverlay) {
        this.$emit('close');
      }
    },
    observeClass: function observeClass() {var _this$data =
      this.data,transition = _this$data.transition,position = _this$data.position,duration = _this$data.duration;
      var updateData = {
        name: transition || position };

      if (transition === 'none') {
        updateData.duration = 0;
        this.originDuration = duration;
      } else
      if (this.originDuration != null) {
        updateData.duration = this.originDuration;
      }
      this.setData(updateData);
    } } });

/***/ }),
/* 128 */
/*!*****************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/wxcomponents/vant/mixins/transition.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.transition = transition;
var _utils = __webpack_require__(/*! ../common/utils */ 129);
var _validator = __webpack_require__(/*! ../common/validator */ 130); // @ts-nocheck
var getClassNames = function getClassNames(name) {return {
    enter: "van-".concat(name, "-enter van-").concat(name, "-enter-active enter-class enter-active-class"),
    'enter-to': "van-".concat(name, "-enter-to van-").concat(name, "-enter-active enter-to-class enter-active-class"),
    leave: "van-".concat(name, "-leave van-").concat(name, "-leave-active leave-class leave-active-class"),
    'leave-to': "van-".concat(name, "-leave-to van-").concat(name, "-leave-active leave-to-class leave-active-class") };};

function transition(showDefaultValue) {
  return Behavior({
    properties: {
      customStyle: String,
      // @ts-ignore
      show: {
        type: Boolean,
        value: showDefaultValue,
        observer: 'observeShow' },

      // @ts-ignore
      duration: {
        type: null,
        value: 300,
        observer: 'observeDuration' },

      name: {
        type: String,
        value: 'fade' } },


    data: {
      type: '',
      inited: false,
      display: false },

    ready: function ready() {
      if (this.data.show === true) {
        this.observeShow(true, false);
      }
    },
    methods: {
      observeShow: function observeShow(value, old) {
        if (value === old) {
          return;
        }
        value ? this.enter() : this.leave();
      },
      enter: function enter() {var _this = this;var _this$data =
        this.data,duration = _this$data.duration,name = _this$data.name;
        var classNames = getClassNames(name);
        var currentDuration = (0, _validator.isObj)(duration) ? duration.enter : duration;
        this.status = 'enter';
        this.$emit('before-enter');
        (0, _utils.requestAnimationFrame)(function () {
          if (_this.status !== 'enter') {
            return;
          }
          _this.$emit('enter');
          _this.setData({
            inited: true,
            display: true,
            classes: classNames.enter,
            currentDuration: currentDuration });

          (0, _utils.requestAnimationFrame)(function () {
            if (_this.status !== 'enter') {
              return;
            }
            _this.transitionEnded = false;
            _this.setData({ classes: classNames['enter-to'] });
          });
        });
      },
      leave: function leave() {var _this2 = this;
        if (!this.data.display) {
          return;
        }var _this$data2 =
        this.data,duration = _this$data2.duration,name = _this$data2.name;
        var classNames = getClassNames(name);
        var currentDuration = (0, _validator.isObj)(duration) ? duration.leave : duration;
        this.status = 'leave';
        this.$emit('before-leave');
        (0, _utils.requestAnimationFrame)(function () {
          if (_this2.status !== 'leave') {
            return;
          }
          _this2.$emit('leave');
          _this2.setData({
            classes: classNames.leave,
            currentDuration: currentDuration });

          (0, _utils.requestAnimationFrame)(function () {
            if (_this2.status !== 'leave') {
              return;
            }
            _this2.transitionEnded = false;
            setTimeout(function () {return _this2.onTransitionEnd();}, currentDuration);
            _this2.setData({ classes: classNames['leave-to'] });
          });
        });
      },
      onTransitionEnd: function onTransitionEnd() {
        if (this.transitionEnded) {
          return;
        }
        this.transitionEnded = true;
        this.$emit("after-".concat(this.status));var _this$data3 =
        this.data,show = _this$data3.show,display = _this$data3.display;
        if (!show && display) {
          this.setData({ display: false });
        }
      } } });


}

/***/ }),
/* 129 */
/*!************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/wxcomponents/vant/common/utils.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.range = range;exports.nextTick = nextTick;exports.getSystemInfoSync = getSystemInfoSync;exports.addUnit = addUnit;exports.requestAnimationFrame = requestAnimationFrame;exports.pickExclude = pickExclude;exports.getRect = getRect;exports.getAllRect = getAllRect;exports.groupSetData = groupSetData;exports.toPromise = toPromise;exports.getCurrentPage = getCurrentPage;Object.defineProperty(exports, "isDef", { enumerable: true, get: function get() {return _validator.isDef;} });var _validator = __webpack_require__(/*! ./validator */ 130);
var _version = __webpack_require__(/*! ./version */ 131);

function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function nextTick(cb) {
  if ((0, _version.canIUseNextTick)()) {
    wx.nextTick(cb);
  } else
  {
    setTimeout(function () {
      cb();
    }, 1000 / 30);
  }
}
var systemInfo;
function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync();
  }
  return systemInfo;
}
function addUnit(value) {
  if (!(0, _validator.isDef)(value)) {
    return undefined;
  }
  value = String(value);
  return (0, _validator.isNumber)(value) ? "".concat(value, "px") : value;
}
function requestAnimationFrame(cb) {
  var systemInfo = getSystemInfoSync();
  if (systemInfo.platform === 'devtools') {
    return setTimeout(function () {
      cb();
    }, 1000 / 30);
  }
  return wx.
  createSelectorQuery().
  selectViewport().
  boundingClientRect().
  exec(function () {
    cb();
  });
}
function pickExclude(obj, keys) {
  if (!(0, _validator.isPlainObject)(obj)) {
    return {};
  }
  return Object.keys(obj).reduce(function (prev, key) {
    if (!keys.includes(key)) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
}
function getRect(context, selector) {
  return new Promise(function (resolve) {
    wx.createSelectorQuery().
    in(context).
    select(selector).
    boundingClientRect().
    exec(function () {var rect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];return resolve(rect[0]);});
  });
}
function getAllRect(context, selector) {
  return new Promise(function (resolve) {
    wx.createSelectorQuery().
    in(context).
    selectAll(selector).
    boundingClientRect().
    exec(function () {var rect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];return resolve(rect[0]);});
  });
}
function groupSetData(context, cb) {
  if ((0, _version.canIUseGroupSetData)()) {
    context.groupSetData(cb);
  } else
  {
    cb();
  }
}
function toPromise(promiseLike) {
  if ((0, _validator.isPromise)(promiseLike)) {
    return promiseLike;
  }
  return Promise.resolve(promiseLike);
}
function getCurrentPage() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

/***/ }),
/* 130 */
/*!****************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/wxcomponents/vant/common/validator.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.isFunction = isFunction;exports.isPlainObject = isPlainObject;exports.isPromise = isPromise;exports.isDef = isDef;exports.isObj = isObj;exports.isNumber = isNumber;exports.isBoolean = isBoolean;exports.isImageUrl = isImageUrl;exports.isVideoUrl = isVideoUrl; // eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(val) {
  return typeof val === 'function';
}
function isPlainObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}
function isPromise(val) {
  return isPlainObject(val) && isFunction(val.then) && isFunction(val.catch);
}
function isDef(value) {
  return value !== undefined && value !== null;
}
function isObj(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}
function isNumber(value) {
  return /^\d+(\.\d+)?$/.test(value);
}
function isBoolean(value) {
  return typeof value === 'boolean';
}
var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
var VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;
function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}
function isVideoUrl(url) {
  return VIDEO_REGEXP.test(url);
}

/***/ }),
/* 131 */
/*!**************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/wxcomponents/vant/common/version.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.canIUseModel = canIUseModel;exports.canIUseFormFieldButton = canIUseFormFieldButton;exports.canIUseAnimate = canIUseAnimate;exports.canIUseGroupSetData = canIUseGroupSetData;exports.canIUseNextTick = canIUseNextTick;exports.canIUseCanvas2d = canIUseCanvas2d;exports.canIUseGetUserProfile = canIUseGetUserProfile;var _utils = __webpack_require__(/*! ./utils */ 129);
function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  var len = Math.max(v1.length, v2.length);
  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }
  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i], 10);
    var num2 = parseInt(v2[i], 10);
    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}
function gte(version) {
  var system = (0, _utils.getSystemInfoSync)();
  return compareVersion(system.SDKVersion, version) >= 0;
}
function canIUseModel() {
  return gte('2.9.3');
}
function canIUseFormFieldButton() {
  return gte('2.10.3');
}
function canIUseAnimate() {
  return gte('2.9.0');
}
function canIUseGroupSetData() {
  return gte('2.4.0');
}
function canIUseNextTick() {
  return wx.canIUse('nextTick');
}
function canIUseCanvas2d() {
  return gte('2.9.0');
}
function canIUseGetUserProfile() {
  return !!wx.getUserProfile;
}

/***/ }),
/* 132 */
/*!************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/wxcomponents/vant/picker/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _component = __webpack_require__(/*! ../common/component */ 125);
var _shared = __webpack_require__(/*! ./shared */ 133);
(0, _component.VantComponent)({
  classes: ['active-class', 'toolbar-class', 'column-class'],
  props: Object.assign(Object.assign({}, _shared.pickerProps), { valueKey: {
      type: String,
      value: 'text' },
    toolbarPosition: {
      type: String,
      value: 'top' },
    defaultIndex: {
      type: Number,
      value: 0 },
    columns: {
      type: Array,
      value: [],
      observer: function observer() {var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        this.simple = columns.length && !columns[0].values;
        if (Array.isArray(this.children) && this.children.length) {
          this.setColumns().catch(function () {});
        }
      } } }),

  beforeCreate: function beforeCreate() {var _this = this;
    Object.defineProperty(this, 'children', {
      get: function get() {return _this.selectAllComponents('.van-picker__column') || [];} });

  },
  methods: {
    noop: function noop() {},
    setColumns: function setColumns() {var _this2 = this;var
      data = this.data;
      var columns = this.simple ? [{ values: data.columns }] : data.columns;
      var stack = columns.map(function (column, index) {return _this2.setColumnValues(index, column.values);});
      return Promise.all(stack);
    },
    emit: function emit(event) {var
      type = event.currentTarget.dataset.type;
      if (this.simple) {
        this.$emit(type, {
          value: this.getColumnValue(0),
          index: this.getColumnIndex(0) });

      } else
      {
        this.$emit(type, {
          value: this.getValues(),
          index: this.getIndexes() });

      }
    },
    onChange: function onChange(event) {
      if (this.simple) {
        this.$emit('change', {
          picker: this,
          value: this.getColumnValue(0),
          index: this.getColumnIndex(0) });

      } else
      {
        this.$emit('change', {
          picker: this,
          value: this.getValues(),
          index: event.currentTarget.dataset.index });

      }
    },
    // get column instance by index
    getColumn: function getColumn(index) {
      return this.children[index];
    },
    // get column value by index
    getColumnValue: function getColumnValue(index) {
      var column = this.getColumn(index);
      return column && column.getValue();
    },
    // set column value by index
    setColumnValue: function setColumnValue(index, value) {
      var column = this.getColumn(index);
      if (column == null) {
        return Promise.reject(new Error('setColumnValue: 对应列不存在'));
      }
      return column.setValue(value);
    },
    // get column option index by column index
    getColumnIndex: function getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).data.currentIndex;
    },
    // set column option index by column index
    setColumnIndex: function setColumnIndex(columnIndex, optionIndex) {
      var column = this.getColumn(columnIndex);
      if (column == null) {
        return Promise.reject(new Error('setColumnIndex: 对应列不存在'));
      }
      return column.setIndex(optionIndex);
    },
    // get options of column by index
    getColumnValues: function getColumnValues(index) {
      return (this.children[index] || {}).data.options;
    },
    // set options of column by index
    setColumnValues: function setColumnValues(index, options) {var needReset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var column = this.children[index];
      if (column == null) {
        return Promise.reject(new Error('setColumnValues: 对应列不存在'));
      }
      var isSame = JSON.stringify(column.data.options) === JSON.stringify(options);
      if (isSame) {
        return Promise.resolve();
      }
      return column.set({ options: options }).then(function () {
        if (needReset) {
          column.setIndex(0);
        }
      });
    },
    // get values of all columns
    getValues: function getValues() {
      return this.children.map(function (child) {return child.getValue();});
    },
    // set values of all columns
    setValues: function setValues(values) {var _this3 = this;
      var stack = values.map(function (value, index) {return _this3.setColumnValue(index, value);});
      return Promise.all(stack);
    },
    // get indexes of all columns
    getIndexes: function getIndexes() {
      return this.children.map(function (child) {return child.data.currentIndex;});
    },
    // set indexes of all columns
    setIndexes: function setIndexes(indexes) {var _this4 = this;
      var stack = indexes.map(function (optionIndex, columnIndex) {return _this4.setColumnIndex(columnIndex, optionIndex);});
      return Promise.all(stack);
    } } });

/***/ }),
/* 133 */
/*!*************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/wxcomponents/vant/picker/shared.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.pickerProps = void 0;var pickerProps = {
  title: String,
  loading: Boolean,
  showToolbar: Boolean,
  cancelButtonText: {
    type: String,
    value: '取消' },

  confirmButtonText: {
    type: String,
    value: '确认' },

  visibleItemCount: {
    type: Number,
    value: 6 },

  itemHeight: {
    type: Number,
    value: 44 } };exports.pickerProps = pickerProps;

/***/ }),
/* 134 */
/*!***********************************************************************!*\
  !*** D:/My-Document/projects/WanBig/wxcomponents/vant/toast/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _component = __webpack_require__(/*! ../common/component */ 125);
(0, _component.VantComponent)({
  props: {
    show: Boolean,
    mask: Boolean,
    message: String,
    forbidClick: Boolean,
    zIndex: {
      type: Number,
      value: 1000 },

    type: {
      type: String,
      value: 'text' },

    loadingType: {
      type: String,
      value: 'circular' },

    position: {
      type: String,
      value: 'middle' } },


  methods: {
    // for prevent touchmove
    noop: function noop() {} } });

/***/ }),
/* 135 */
/*!**************************************************************!*\
  !*** D:/My-Document/projects/WanBig/static/towxml/towxml.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Component({
  options: {
    styleIsolation: 'shared' },

  properties: {
    nodes: {
      type: Object,
      value: {} } },


  data: {
    someData: {} } });

/***/ }),
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */
/*!************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/wxcomponents/vant/button/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _component = __webpack_require__(/*! ../common/component */ 125);
var _button = __webpack_require__(/*! ../mixins/button */ 158);
var _version = __webpack_require__(/*! ../common/version */ 131);
var mixins = [_button.button];
if ((0, _version.canIUseFormFieldButton)()) {
  mixins.push('wx://form-field-button');
}
(0, _component.VantComponent)({
  mixins: mixins,
  classes: ['hover-class', 'loading-class'],
  data: {
    baseStyle: '' },

  props: {
    formType: String,
    icon: String,
    classPrefix: {
      type: String,
      value: 'van-icon' },

    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    loadingText: String,
    customStyle: String,
    loadingType: {
      type: String,
      value: 'circular' },

    type: {
      type: String,
      value: 'default' },

    dataset: null,
    size: {
      type: String,
      value: 'normal' },

    loadingSize: {
      type: String,
      value: '20px' },

    color: String },

  methods: {
    onClick: function onClick(event) {var _this = this;
      this.$emit('click', event);var _this$data =
      this.data,canIUseGetUserProfile = _this$data.canIUseGetUserProfile,openType = _this$data.openType,getUserProfileDesc = _this$data.getUserProfileDesc,lang = _this$data.lang;
      if (openType === 'getUserInfo' && canIUseGetUserProfile) {
        wx.getUserProfile({
          desc: getUserProfileDesc || '  ',
          lang: lang || 'en',
          complete: function complete(userProfile) {
            _this.$emit('getuserinfo', userProfile);
          } });

      }
    } } });

/***/ }),
/* 158 */
/*!*************************************************************************!*\
  !*** D:/My-Document/projects/WanBig/wxcomponents/vant/mixins/button.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.button = void 0;var _version = __webpack_require__(/*! ../common/version */ 131);
var button = Behavior({
  externalClasses: ['hover-class'],
  properties: {
    id: String,
    lang: String,
    businessId: Number,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    ariaLabel: String,
    openType: String,
    getUserProfileDesc: String },

  data: {
    canIUseGetUserProfile: (0, _version.canIUseGetUserProfile)() },

  methods: {
    onGetUserInfo: function onGetUserInfo(event) {
      this.triggerEvent('getuserinfo', event.detail);
    },
    onContact: function onContact(event) {
      this.triggerEvent('contact', event.detail);
    },
    onGetPhoneNumber: function onGetPhoneNumber(event) {
      this.triggerEvent('getphonenumber', event.detail);
    },
    onError: function onError(event) {
      this.triggerEvent('error', event.detail);
    },
    onLaunchApp: function onLaunchApp(event) {
      this.triggerEvent('launchapp', event.detail);
    },
    onOpenSetting: function onOpenSetting(event) {
      this.triggerEvent('opensetting', event.detail);
    } } });exports.button = button;

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map