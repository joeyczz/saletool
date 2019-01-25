import Cookies from 'js-cookie';
import constant from './constant';
import regions from '@/assets/datas/regions.json';
import _ from 'lodash';

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
export const getCookie = key => Cookies.get(constant.prefix + key);

// 获取地址信息
export const getRegions = () => {
  return new Promise(resolve => {
    const regionList = regions.map(({ id, province, cities }) => {
      // 省直辖市
      const proItem = { value: _.toString(id), label: province };
      if (_.isNil(cities)) proItem.children = [];
      else proItem.children = cities.map(({ id, city, areas }) => {
        // 城市
        const cityItem = { value: _.toString(id), label: city };
        if (_.isNil(areas)) cityItem.children = [];
        else cityItem.children = areas.map(({ id, area }) => {
          // 区域
          return { value: _.toString(id), label: area };
        });
        return cityItem;
      });
      return proItem;
    });
    regionList.sort((a, b) => (_.toInteger(a.id) >= _.toInteger(b.id)) ? 1 : -1);
    resolve(regionList);
  });
};
