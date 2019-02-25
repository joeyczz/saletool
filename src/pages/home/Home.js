import classnames from 'classnames';
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { injectUnmout } from '@/utils/utils';

import PropTypes from 'prop-types';
import HomeHeader from './HomeHeader';
import StoreSearch from './StoreSearch';
import BusinessCircle from './BusinessCicle';

// import _ from 'lodash';
// import api from '@/utils/api';
// import urlList from '@/utils/urlList';
// import storage from '@/utils/storage';
// import enums from '@/utils/enums';
import './style/Home.scss';

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
      // isLogin: false,
    };

    // bind this
    this.goLogin = this.goLogin.bind(this);
  }

  componentDidMount() {
    // 初始化手机号 + 验证码
    // this.setState({});
  }

  goLogin() {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    history.push('login');
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { prefixCls, className, match } = this.props;
    const cls = classnames(className, `${prefixCls}`);

    return (
      <div className={cls}>
        <HomeHeader className={`${prefixCls}-header-container`} />

        <div className={`${prefixCls}-tabs`}>
          <div className="active">服务菜单</div>
          <div>商圈报告</div>
        </div>

        <div className={`${prefixCls}-views`}>
          <Switch>
            <Route path="/businessCircle" component={BusinessCircle} />
            <Route exact path={match.path} component={StoreSearch} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Home;
