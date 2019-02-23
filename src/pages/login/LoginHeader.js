import classnames from 'classnames';
import React, { Component } from 'react';
import loginBgImg from '@/assets/images/login-bg.png';
import { injectUnmout } from '@/utils/utils';

import './style/LoginHeader.scss';

@injectUnmout
class LoginHeader extends Component {
  static defaultProps = {
    prefixCls: 'zd-login-header',
  };

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, `${prefixCls}`);
    return (
      <header className={cls}>
        <img src={loginBgImg} className={`${prefixCls}-bg`} alt="bg" />
      </header>
    );
  }
}

export default LoginHeader;
