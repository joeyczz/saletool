/**
 * 缓存处理工具
 */
import Constant from './constant';
import _ from 'lodash';
import { Toast } from 'antd-mobile';

const prefix = Constant.prefix;

let lsStorage, ssStorage;
let storage;

if (!window.localStorage || !window.sessionStorage) {
  Toast.loading('该浏览器不支持，请使用新版Chrome或者Firefox。');
} else {
  lsStorage = window.localStorage;
  ssStorage = window.sessionStorage;
  storage = {};
}

/**
 * localStorage
 */
storage.lsSetValue = (key, value) => {
  if (value instanceof Object) {
    lsStorage.setItem(prefix + key, JSON.stringify(value));
  } else if (_.isNil(value)) {
    lsStorage.setItem(prefix + key, '');
  } else {
    lsStorage.setItem(prefix + key, value);
  }
};

storage.lsGetValue = key => {
  const value = lsStorage.getItem(prefix + key);
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

storage.lsRemove = key => {
  lsStorage.removeItem(prefix + key);
};

/**
 * sessionStorage
 */
storage.ssSetValue = (key, value) => {
  if (value instanceof Object) {
    ssStorage.setItem(prefix + key, JSON.stringify(value));
  } else if (_.isNil(value)) {
    ssStorage.setItem(prefix + key, '');
  } else {
    ssStorage.setItem(prefix + key, value);
  }
};

storage.ssGetValue = key => {
  const value = ssStorage.getItem(prefix + key);
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

storage.ssRemoveByKey = key => {
  ssStorage.removeItem(prefix + key);
};

/**
 * common
 */
storage.clearAll = () => {
  ssStorage.clear();
  ssStorage.clear();
};

export default storage;
