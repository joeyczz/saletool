import Cookies from 'js-cookie';
import constant from './constant';

// react 注入
export const injectUnmout = (target) => {
  // 改装componentWillUnmount，销毁的时候记录一下
  const next = target.prototype.componentWillUnmount
  target.prototype.componentWillUnmount = function () {
    if (next) next.call(this, ...arguments);
    this.unmount = true
  }
  // 对setState的改装，setState查看目前是否已经销毁
  const setState = target.prototype.setState
  target.prototype.setState = function () {
    if (this.unmount) return;
    setState.call(this, ...arguments)
  }
};

// cookie 设置值
export const setCookie = (key, value, param) => Cookies.set(constant.prefix + key, value, param);

// cookie 获取值
export const getCookie = (key) => Cookies.get(constant.prefix + key);
