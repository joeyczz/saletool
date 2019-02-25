import classnames from 'classnames';
import React, { Component } from 'react';
import { injectUnmout } from '@/utils/utils';
import PropTypes from 'prop-types';

import Tabbar from '@/components/Tabbar';

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
    const { prefixCls, className } = this.props;
    const cls = classnames(className, `${prefixCls}`);

    return (
      <div className={cls}>
        Me
        <Tabbar selectedKey="home" />
      </div>
    );
  }
}

export default Home;
