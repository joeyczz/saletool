import classnames from 'classnames';
import React, { Component } from 'react';
import loginBg from '@/assets/images/login-bg.svg';
import loginPerson from '@/assets/images/login-person.svg';
import loginPerson1 from '@/assets/images/login-person-1.svg';
import loginFont from '@/assets/images/login-font.svg';

import './style/LoginHeader.scss';

class LoginHeader extends Component {
  static defaultProps = {
    prefixCls: 'zd-login-header',
  };

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, `${prefixCls}`);
    return (
      <header className={cls}>
        <img src={loginBg} className={`${prefixCls}-bg`} alt="bg" />
        <img src={loginFont} className={`${prefixCls}-font`} alt="bg" />
        <span className={`${prefixCls}-version`}>v1.1.0</span>
        <img src={loginPerson} className={`${prefixCls}-person`} alt="bg" />
        <img src={loginPerson1} className={`${prefixCls}-person1`} alt="bg" />
      </header>
    );
  }
}

export default LoginHeader;
