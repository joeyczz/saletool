import classnames from 'classnames';
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { injectUnmout } from '@/utils/utils';

import HomeHeader from './HomeHeader'
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

  static defaultProps = {
    prefixCls: 'zd-home',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    }

    // bind this
    this.goLogin = this.goLogin.bind(this);
  }

  componentDidMount() {
    // 初始化手机号 + 验证码
    // this.setState({});
  }

  goLogin() {
    this.props.history.push('login');
  }

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, `${prefixCls}`);

    return (
      <div className={cls}>
        <HomeHeader className={`${prefixCls}-header-container`} />

        <div className={`${prefixCls}-tabs`}>
          <div className='active'>服务菜单</div>
          <div>商圈报告</div>
        </div>

        <div className={`${prefixCls}-views`}>
          <Switch>
            <Route path="/businessCircle" component={BusinessCircle} />
            <Route exact path={this.props.match.path} component={StoreSearch} />
            <Redirect to="/"></Redirect>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Home;
