import React, { Component } from 'react';
import loginBg from '../../assets/images/login-bg.svg';
import loginP from '../../assets/images/login-p.svg';
import loginFont from '../../assets/images/login-font.svg';
import './Login.less';

class Login extends Component {
  render() {
    return (
      <div className="Login-container">
        <header className="login-header">
          <img src={loginBg} className="login-bg" alt="bg" />
          <img src={loginFont} className="login-font" alt="bg" />
          <span className="login-version">v1.1.0</span>
          <img src={loginP} className="login-p" alt="bg" />
        </header>
      </div>
    );
  }
}

export default Login;
