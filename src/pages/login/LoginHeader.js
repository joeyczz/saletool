import classnames from 'classnames';
import React, { Component } from 'react';
import loginBgImg from '@/assets/images/login-bg.svg';
import loginPersonImg from '@/assets/images/login-person.svg';
import loginPerson1Img from '@/assets/images/login-person-1.svg';
import loginFontImg from '@/assets/images/login-font.svg';
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
        <img src={loginFontImg} className={`${prefixCls}-font`} alt="bg" />
        <span className={`${prefixCls}-version`}>v1.1.0</span>
        <img src={loginPersonImg} className={`${prefixCls}-person`} alt="bg" />
        <img src={loginPerson1Img} className={`${prefixCls}-person1`} alt="bg" />
      </header>
    );
  }
}

export default LoginHeader;
