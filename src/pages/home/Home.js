import classnames from 'classnames';
import React, { Component } from 'react';
import { injectUnmout } from '@/utils/utils';
import PropTypes from 'prop-types';

import { PullToRefresh, Toast } from 'antd-mobile';

import Tabbar from '@/components/Tabbar';
import HomeHeader from './HomeHeader';

import _ from 'lodash';
import api from '@/utils/api';
// import urlList from '@/utils/urlList';
// import storage from '@/utils/storage';
// import enums from '@/utils/enums';

import emptyImg from '@/assets/images/empty-bg.svg';
import './style/Home.scss';

class StoreList extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    storeList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        distance: PropTypes.string,
      })
    ).isRequired,
  };

  static defaultProps = {
    prefixCls: 'zd-home',
    className: '',
  };

  constructor() {
    super();

    this.state = {
      refreshing: false,
    };
  }

  render() {
    const { prefixCls, className, storeList } = this.props;
    const cls = classnames(className, `${prefixCls}-store-list`, {
      empty: _.isEmpty(storeList),
    });

    const { refreshing } = this.state;
    const container = _.isEmpty(storeList) ? (
      <div className={cls}>
        <img src={emptyImg} alt="empty_bg" />
        <p>暂无商户列表</p>
      </div>
    ) : (
      <PullToRefresh
        className={cls}
        direction="up"
        refreshing={refreshing}
        onRefresh={e => {
          console.log('refresh', e);
          this.setState({ refreshing: false });
        }}
      >
        {storeList.map(item => (
          <div className={`${prefixCls}-store-list-item`} key={item.id}>
            {!_.isNil(item.intention) && item.intention !== '' ? (
              <div className="mark">{item.intention}</div>
            ) : null}
            <div className="info">
              <p className="name">{item.name}</p>
              <p className="distance">{item.distance}</p>
            </div>
            <p className="address">{item.address}</p>
            <p className="message">{item.message}</p>
          </div>
        ))}
      </PullToRefresh>
    );
    return container;
  }
}

@injectUnmout
class Home extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: 'zd-home',
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      // storeList: [],
      storeList: [
        {
          id: 1,
          name: '麻辣香锅麻辣香锅麻辣香锅麻辣香锅',
          distance: '500m',
          intention: '高意向嘛',
          address: '上海市黄浦区浙江中路1108弄18号',
          message: '最近拜访：10天前',
        },
        {
          id: 2,
          name: '麻辣香锅麻辣香锅麻辣香锅麻辣香锅',
          distance: '500m',
          intention: null,
          address: '上海市黄浦区浙江中路1108弄18号',
          message: '最近拜访：10天前',
        },
      ],
    };

    // bind this
    this.filterHandler = this.filterHandler.bind(this);
    this.goLogin = this.goLogin.bind(this);
  }

  componentDidMount() {
    this.testHandler();
  }

  // 登录处理
  testHandler() {
    const param = { id: 'aaa' };
    Toast.loading('加载中', 0);
    api
      .delete('/put-test', param)
      .then(res => {
        Toast.hide();
        console.log(this, res);
        // 处理token
      })
      .catch(() => {});
  }

  filterHandler(item) {
    console.log(this, item);
  }

  goLogin() {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    history.push('login');
  }

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, `${prefixCls}`);

    const { storeList } = this.state;
    return (
      <div className={cls}>
        <HomeHeader filterHandler={this.filterHandler} />
        <Tabbar selectedKey="home" />
        <StoreList storeList={storeList} />
      </div>
    );
  }
}

export default Home;
