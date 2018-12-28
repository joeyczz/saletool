import classnames from 'classnames';
import React, { Component } from 'react';
import loginBg from '@/assets/images/login-bg.svg';
import loginPerson from '@/assets/images/login-person.svg';
import loginPerson1 from '@/assets/images/login-person-1.svg';
import loginFont from '@/assets/images/login-font.svg';
import './LoginHeader.scss';
class Login extends Component {
  render() {
    const { className } = this.props;
    const cls = classnames(className, 'login-header-bg');
    return (
      <header className={cls}>
        <img src={loginBg} className="login-bg" alt="bg" />
        <img src={loginFont} className="login-font" alt="bg" />
        <span className="login-version">v1.1.0</span>
        <img src={loginPerson} className="login-person" alt="bg" />
        <img src={loginPerson1} className="login-person1" alt="bg" />
      </header>
    );
  }
}

export default Login;
