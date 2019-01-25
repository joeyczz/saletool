import classnames from 'classnames';
import React, { Component } from 'react';
import { InputItem, Button, Picker } from 'antd-mobile';
import { getRegions } from '@/utils/utils';
import _ from 'lodash';
import queryString from 'query-string';
import { injectUnmout } from '@/utils/utils';

import arrowDownImg from '@/assets/images/arrow-down.svg';

import './style/StoreSearch.scss';

@injectUnmout
class LoginHeader extends Component {
  static defaultProps = {
    prefixCls: 'zd-store-search',
  };

  constructor() {
    super();
    
    this.state = {
      selectedAddress: '',
      district: [],
      districtName: '',
      provinceId: '',
      cityId: '',
      areaId: '',
      storeName: ''
    }

    // bind this
    this.regionOnChange = this.regionOnChange.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.confirmHandler = this.confirmHandler.bind(this);
  }

  componentWillMount() {
    getRegions().then(res => {
      this.setState({ district: res });
    });
  }

  // 地理位置选择
  regionOnChange(e) {
    const [provinceId, cityId, areaId] = e;
    // 查找数据
    const provinceItem = _.find(this.state.district, { value: provinceId });
    const cityItem = _.isNil(provinceItem) ? '' : _.find(provinceItem.children, { value: cityId });
    const areaItem = _.isNil(cityItem) ? '' : _.find(cityItem.children, { value: areaId });
    // 获取名
    const provinceName = _.isNil(provinceItem) ? '' : provinceItem.label;
    const cityName = _.isNil(cityItem) ? '' : cityItem.label;
    const areaName = _.isNil(areaItem) ? '' : areaItem.label;
    this.setState({
      provinceId: _.isNil(provinceItem) ? '' : provinceItem.value,
      cityId: _.isNil(cityItem) ? '' : cityItem.value,
      areaId: _.isNil(areaItem) ? '' : areaItem.value,
      districtName: `${provinceName} ${cityName} ${areaName}`
    });
  }

  // 检查输入 按钮是否disabled
  checkInput() {
    return this.state.provinceId !== '' && this.state.cityId !== ''
      && this.state.areaId !== '' && this.state.storeName.trim() !== '';
  }

  // 前往门店列表
  confirmHandler() {
    const { provinceId, cityId, areaId, storeName } = this.state;
    this.props.history.push({
      pathname: 'storeList',
      search: queryString.stringify({
        provinceId, cityId, areaId, storeName
      })
    });
  }

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, `${prefixCls}`);
    const pickerCls = classnames(`${prefixCls}-form-picker`, this.state.districtName || 'placeholder');
    const inputItemCls = classnames(`${prefixCls}-form-item`, this.state.districtName || 'disabled');
    const buttonDisabled = !this.checkInput();

    return (
      <div className={cls}>
        <div className={`${prefixCls}-form`}>
          <div className={`${prefixCls}-form-title`}>请输入本次您拜访的客户信息</div>
          <section className={`${prefixCls}-form-item`}>
            <div className={pickerCls}>
              <Picker data={this.state.district} onOk={this.regionOnChange}>
                <div className={`${prefixCls}-form-picker-text`}>
                  {this.state.districtName || '请选择所在区域'}
                  <img src={arrowDownImg} alt="arrow" />
                </div>
              </Picker>
            </div>
          </section>
          <section className={inputItemCls}>
            <InputItem className={`${prefixCls}-form-input`}
              disabled={this.state.districtName.trim() === ''} placeholder="请输入门店名称" clear
              value={this.state.storeName} onChange={value => this.setState({ storeName: value })}>
            </InputItem>
          </section>
        </div>
        <Button className={`${prefixCls}-button`} disabled={buttonDisabled} onClick={this.confirmHandler}>搜索</Button>
      </div>
    );
  }
}

export default LoginHeader;
