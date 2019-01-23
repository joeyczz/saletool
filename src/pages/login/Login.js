import classnames from 'classnames';
import React, { Component } from 'react';
import { InputItem, Toast, Button } from 'antd-mobile';
import LoginHeader from './loginHeader/LoginHeader'
import _ from 'lodash';
import api from '@/utils/api';
import urlList from '@/utils/urlList';
import storage from '@/utils/storage';
import enums from '@/utils/enums';
import { injectUnmout, setCookie } from '@/utils/utils';
import Constant from '@/utils/constant';
import './Login.scss';

// 默认获取验证码显示内容
const defaultCodeText = '获取验证码';
// 默认倒计时时间
const defaultCountTime = 60;
// 手机号 参数名
const phone = 'saleMobile';
// 手机验证码 参数名
const code = 'smsCode';
// 手机号正则验证
const phoneRe = /^1[0-9]{10}$/;

@injectUnmout
class Login extends Component {

  static defaultProps = {
    prefixCls: 'login-form',
  };

  constructor() {
    super();
    this.state = {
      // 获取验证码 disabled 状态
      codeDisabled: true,
      // login button disabled 状态
      buttonDisabled: true,
      // 倒计时时间
      countTime: defaultCountTime,
      // 获取验证码 显示内容
      codeText: defaultCodeText,
      // 手机号
      saleMobile: '',
      // 验证码
      smsCode: ''
    }

    // bind this
    this.sendCode = this.sendCode.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  componentDidMount() {
    // 初始化手机号 + 验证码
    this.setState({
      saleMobile: '',
      smsCode: ''
    });
  }

  componentWillUnmount() {
    // 清除计时器
    clearInterval(this.checkCodeTimer);
  }

  // methods
  sendCode() {
    // code disabled 状态 不能点击
    if (this.state.codeDisabled) return;
    // 设置倒计时
    this.setState({
      codeDisabled: true,
      countTime: 60,
      codeText: '60s',
    });
    // 构建请求参数
    const param = { saleMobile: this.state.saleMobile };
    Toast.loading('加载中', 0);
    api.post(urlList.getSmsCodeUrl, param).then(res => {
      Toast.hide();
      // 定时倒计时
      clearInterval(this.checkCodeTimer);
      this.checkCodeTimer = setInterval(() => {
        // 倒计时 -1
        this.setState(prevState => ({ countTime: prevState.countTime - 1 }));
        if (this.state.countTime < 0) {
          // 倒计时完成
          clearInterval(this.checkCodeTimer);
          this.setState({
            codeDisabled: !phoneRe.test(this.state.saleMobile),
            codeText: defaultCodeText
          });
        } else {
          // 修改倒计时显示秒数
          this.setState(prevState => ({ codeText: prevState.countTime + 's' }));
        }
      }, 1 * 1000);
    }).catch(err => {
      // 失败恢复状态
      this.setState({
        codeDisabled: !phoneRe.test(this.state.saleMobile),
        codeText: defaultCodeText
      });
    });
  }

  // 处理数据框
  handleInputChange(name, value) {
    this.setState({ [name]: value });
    if (phone === name) {
      this.setState({
        codeDisabled: !phoneRe.test(value),
        buttonDisabled: !(phoneRe.test(value) && this.state.smsCode.length === 4)
      });
    } else if (code === name) {
      this.setState({
        buttonDisabled: !(phoneRe.test(this.state.saleMobile) && value.length === 4)
      });
    }
  }

  // 登录处理
  loginHandler() {
    // this.props.history.push('/');
    const param = {
      saleMobile: this.state.saleMobile,
      smsCode: this.state.smsCode
    };
    Toast.loading('加载中', 0);
    api.post(urlList.saleLoginUrl, param).then(res => {
      Toast.hide();
      // 处理token
      setCookie(Constant.token, res.token);
      setCookie(Constant.saleId, res.saleId);
      setCookie(Constant.saleMobile, res.saleMobile);
      // 设置 缓存 cookie
      storage.lsSetValue(Constant.cookiesInfo, {
        token: res.token,
        saleId: res.saleId,
        saleMobile: res.saleMobile
      });
      // 设置 缓存 用户信息
      storage.lsSetValue(Constant.userInfo, {
        saleId: res.saleId,
        saleMobile: res.saleMobile,
        saleName: res.saleName,
        spId: res.spId
      });
      this.props.history.push('/');
    }).catch(err => { });
  }

  render() {
    const {
      prefixCls,
      className
    } = this.props;
    const cls = classnames(className, 'login-container');

    const formCls = classnames(className, `${prefixCls}`);
    const codeCls = classnames({
      'code-btn': true,
      'disabled': this.state.codeDisabled
    });

    return (
      <div className={cls}>
        <LoginHeader className="login-header" />
        <div className={formCls}>
          <section className={`${prefixCls}-item`}>
            <InputItem className="login-input" maxLength="11" placeholder="输入您的手机号码" clear
              value={this.state.saleMobile} onChange={this.handleInputChange.bind(this, phone)} ></InputItem>
          </section>
          <section className={`${prefixCls}-item`}>
            <InputItem className="login-input" maxLength="4" placeholder="输入手机验证码" clear
              value={this.state.smsCode} onChange={this.handleInputChange.bind(this, code)}></InputItem>
            <span className={codeCls} onClick={_.debounce(this.sendCode, 3 * 1000, { leading: true })}>
              {this.state.codeText}
            </span>
          </section>
        </div>
        <Button className="login-button" disabled={this.state.buttonDisabled}
          onClick={_.debounce(this.loginHandler, 3 * 1000, { leading: true })}>
          登录
          </Button>
      </div>
    );
  }
}

export default Login;
