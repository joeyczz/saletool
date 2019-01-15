import classnames from 'classnames';
import React, { Component } from 'react';
// import _ from 'lodash';
// import api from '@/utils/api';
// import urlList from '@/utils/urlList';
// import storage from '@/utils/storage';
// import enums from '@/utils/enums';
import './Home.scss';
import { injectUnmout } from '@/utils/utils';

@injectUnmout
class Home extends Component {

  static defaultProps = {
    prefixCls: 'home-form',
  };

  constructor() {
    super();
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
    const {
      // prefixCls,
      className
    } = this.props;
    const cls = classnames(className, 'home-container');

    return (
      <div className={cls}>
        <button onClick={this.goLogin}>go Login</button>
      </div>
    );
  }
}

export default Home;
