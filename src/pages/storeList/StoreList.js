import classnames from 'classnames';
import React, { Component } from 'react';
import { Toast, Button } from 'antd-mobile';
import _ from 'lodash';
import queryString from 'query-string';
import api from '@/utils/api';
import urlList from '@/utils/urlList';

import './style/StoreList.scss';

class StoreItem extends Component {
  static defaultProps = {
    prefixCls: 'zd-store-list-item',
    store: {}
  };

  render() {
    const { prefixCls, className, store, onClick } = this.props;
    const cls = classnames(className, `${prefixCls}`);

    return (
      <div className={cls} onClick={onClick}>
        <p className={`${prefixCls}-info`}>
          <span>{store.storeName || ''}</span>
          <span>{`${store.linkman || ''}(${store.phone || ''})`}</span>
        </p>
        <p className={`${prefixCls}-info`}>
          {store.storeAddress || ''}
        </p>
      </div>
    );
  }
}

class StoreList extends Component {
  static defaultProps = {
    prefixCls: 'zd-store-list',
  };

  constructor() {
    super();

    this.state = {
      storeList: [],
    }

    // bind this
    this.getStoreList = this.getStoreList.bind(this);
    this.selectStoreHandler = this.selectStoreHandler.bind(this);
    this.createStoreHandler = this.createStoreHandler.bind(this);
  }

  componentWillMount() {
    this.getStoreList();
  }

  // 获取门店列表
  getStoreList() {
    const { provinceId, cityId, areaId, storeName } = queryString.parse(this.props.location.search);
    const param = {
      tradeProviceId: provinceId,
      tradeCityId: cityId,
      tradeCountyId: areaId,
      storeName
    };
    Toast.loading('加载中', 0);
    api.post(urlList.queryStoresUrl, param).then(res => {
      Toast.hide();
      console.log(res)
      this.setState({ storeList: res.storeInfo || [] })
    }).catch(err => { });
  }

  // 选中某个门店
  selectStoreHandler(item) {
    console.log('selectStoreHandler', item);
  }

  createStoreHandler() {
    console.log('createStoreHandler');
  }

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, `${prefixCls}`);

    const listItems = this.state.storeList.map(item =>
      <StoreItem key={_.toString(item.id)} store={item}
        onClick={this.selectStoreHandler.bind(this, item)} />
    );

    return (
      <div className={cls}>
        <p className={`${prefixCls}-title`}>以下内容为本次搜索匹配到的门店信息</p>
        <section className={`${prefixCls}-content`}>
          {listItems}
        </section>
        <div className={`${prefixCls}-button`}>
          <Button onClick={this.createStoreHandler}>没有我要的，去新增</Button>
        </div>
      </div>
    );
  }
}

export default StoreList;
