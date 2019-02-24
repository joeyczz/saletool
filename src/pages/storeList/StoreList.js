import classnames from 'classnames';
import React, { Component } from 'react';
import { Toast, Button } from 'antd-mobile';
import _ from 'lodash';
import queryString from 'query-string';
import api from '@/utils/api';
import urlList from '@/utils/urlList';
import { injectUnmout } from '@/utils/utils';
import PropTypes from 'prop-types';

import emptyBgImg from '@/assets/images/empty-bg.svg';
import './style/StoreList.scss';

class StoreItem extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    store: PropTypes.shape({
      storeName: PropTypes.string,
      linkman: PropTypes.string,
      storeAddress: PropTypes.string,
      phone: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    prefixCls: 'zd-store-list-item',
    className: '',
    onClick() {},
  };

  render() {
    const {
      prefixCls, className, store, onClick,
    } = this.props;
    const cls = classnames(className, `${prefixCls}`);

    return (
      <div className={cls} onClick={onClick} role="button" tabIndex={0}>
        <p className={`${prefixCls}-info`}>
          <span>{store.storeName || ''}</span>
          <span>{`${store.linkman || ''}(${store.phone || ''})`}</span>
        </p>
        <p className={`${prefixCls}-info`}>{store.storeAddress || ''}</p>
      </div>
    );
  }
}

@injectUnmout
class StoreList extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    location: PropTypes.shape(),
  };

  static defaultProps = {
    prefixCls: 'zd-store-list',
    className: '',
    location: {},
  };

  constructor() {
    super();

    this.state = {
      // 门店列表
      storeList: [],
    };

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
    const { location } = this.props;
    const {
      provinceId, cityId, areaId, storeName,
    } = queryString.parse(location.search);
    const param = {
      tradeProviceId: provinceId,
      tradeCityId: cityId,
      tradeCountyId: areaId,
      storeName,
    };
    Toast.loading('加载中', 0);
    api
      .post(urlList.queryStoresUrl, param)
      .then((res) => {
        Toast.hide();
        console.log(res);
        this.setState({ storeList: res.storeInfo || [] });
      })
      .catch(() => {});
  }

  // 选中某个门店
  selectStoreHandler(item) {
    console.log('selectStoreHandler', item, this);
  }

  // 跳转创建新门店
  createStoreHandler() {
    console.log('createStoreHandler', this);
  }

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, prefixCls);

    let content = null;
    const { storeList } = this.state;
    if (_.isEmpty(storeList)) {
      content = (
        <div className={`${prefixCls}-empty`}>
          <div className={`${prefixCls}-img`}>
            <img src={emptyBgImg} alt="bg" />
          </div>
          <p>后台还没该门店信息，建议您新增一个门店</p>
        </div>
      );
    } else {
      const listItems = storeList.map(item => (
        <StoreItem
          key={_.toString(item.id)}
          store={item}
          onClick={this.selectStoreHandler.bind(this, item)}
        />
      ));

      content = (
        <div className={`${prefixCls}-box`}>
          <p className={`${prefixCls}-title`}>
            以下内容为本次搜索匹配到的门店信息
          </p>
          <section className={`${prefixCls}-content`}>{listItems}</section>
        </div>
      );
    }

    return (
      <div className={cls}>
        {content}
        <div className={`${prefixCls}-button`}>
          <Button onClick={this.createStoreHandler}>没有我要的，去新增</Button>
        </div>
      </div>
    );
  }
}

export default StoreList;
