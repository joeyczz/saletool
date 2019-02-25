import Cookies from 'js-cookie';
import _ from 'lodash';
import { prefix } from './constant';
import regions from '@/assets/datas/regions.json';

// react 注入
export const injectUnmout = target => {
  // 改装componentWillUnmount，销毁的时候记录一下
  const next = target.prototype.componentWillUnmount;
  // eslint-disable-next-line func-names
  target.prototype.componentWillUnmount = function(...args) {
    if (next) next.call(this, args);
    this.unmount = true;
  };
  // 对setState的改装，setState查看目前是否已经销毁
  const { setState } = target.prototype;
  // eslint-disable-next-line func-names
  target.prototype.setState = function(...args) {
    if (this.unmount) return;
    setState.call(this, args);
  };
};

// cookie 设置值
export const setCookie = (key, value, param) =>
  Cookies.set(prefix + key, value, param);

// cookie 获取值
export const getCookie = key => Cookies.get(prefix + key);

// 获取地址信息
export const getRegions = () =>
  new Promise(resolve => {
    const regionList = regions.map(({ id: proId, province, cities }) => {
      // 省直辖市
      const proItem = { value: _.toString(proId), label: province };
      if (_.isNil(cities)) proItem.children = [];
      else {
        proItem.children = cities.map(({ id: cityId, city, areas }) => {
          // 城市
          const cityItem = { value: _.toString(cityId), label: city };
          if (_.isNil(areas)) cityItem.children = [];
          else {
            cityItem.children = areas.map(({ id: areaId, area }) => ({
              value: _.toString(areaId),
              label: area,
            }));
          }
          return cityItem;
        });
      }
      return proItem;
    });
    regionList.sort((a, b) =>
      _.toInteger(a.id) >= _.toInteger(b.id) ? 1 : -1
    );
    resolve(regionList);
  });
