/**
 * 缓存处理工具
 */

var storage, ssStorage;
var dataStorage;

if (!window.localStorage || !window.sessionStorage) {
  alert("该浏览器不支持，请使用新版Chrome或者Firefox。");
} else {
  storage = window.localStorage;
  ssStorage = window.sessionStorage;
  dataStorage = {};
}

/**
 * localStorage
 */
dataStorage.setValue = function (key, value = '') {
  storage.setItem(key, value);
};

dataStorage.getValue = function (key) {
  return storage.getItem(key);
};

dataStorage.setObject = function (key, object) {
  if (object !== undefined && object !== null && typeof(object) === "object") {
    var value = JSON.stringify(object);
    storage.setItem(key, value);
  } else {
    // 错误格式存入空字符串
    storage.setItem(key, "");
  }
};

dataStorage.getObject = function (key) {
  var value = storage.getItem(key);
  try {
    return value !== "" ? JSON.parse(value) : value;
  } catch (e) {
    return "";
  }
};

dataStorage.removeByKey = function (key) {
  storage.removeItem(key);
};

/**
 * sessionStorage
 */
dataStorage.ssSetValue = function (key, value) {
  ssStorage.setItem(key, value);
};

dataStorage.ssGetValue = function (key) {
  return ssStorage.getItem(key);
};

dataStorage.ssSetObject = function (key, object) {
  if (object !== undefined && object !== null && typeof(object) === "object") {
    var value = JSON.stringify(object);
    ssStorage.setItem(key, value);
  }
};

dataStorage.ssGetObject = function (key) {
  var value = ssStorage.getItem(key);
  try {
    return value !== "" ? JSON.parse(value) : value;
  } catch (e) {
    return "";
  }
};

dataStorage.ssRemoveByKey = function (key) {
  ssStorage.removeItem(key);
};

/**
 * common
 */
dataStorage.clearAll = function () {
  storage.clear();
  ssStorage.clear();
};

export default dataStorage
