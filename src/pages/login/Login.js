import classnames from 'classnames';
import React, { Component } from 'react';
import { InputItem, Toast, Button } from 'antd-mobile';
import _ from 'lodash';
import api from '@/utils/api';
import urlList from '@/utils/urlList';
import storage from '@/utils/storage';
import { injectUnmout, setCookie } from '@/utils/utils';
import Constant from '@/utils/constant';
import PropTypes from 'prop-types';

import LoginHeader from './LoginHeader';

import './style/Login.scss';

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
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: 'zd-login',
    className: '',
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
      smsCode: '',
    };

    // bind this
    this.sendCode = this.sendCode.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  componentDidMount() {
    // 初始化手机号 + 验证码
    this.setState({
      saleMobile: '',
      smsCode: '',
    });
  }

  componentWillUnmount() {
    // 清除计时器
    clearInterval(this.checkCodeTimer);
  }

  // methods
  sendCode() {
    // code disabled 状态 不能点击
    const { codeDisabled, saleMobile, countTime } = this.state;
    if (codeDisabled) return;
    // 设置倒计时
    this.setState({
      codeDisabled: true,
      countTime: 60,
      codeText: '60s',
    });
    // 构建请求参数
    const param = { saleMobile };
    Toast.loading('加载中', 0);
    api
      .post(urlList.getSmsCodeUrl, param)
      .then(() => {
        Toast.hide();
        // 定时倒计时
        clearInterval(this.checkCodeTimer);
        this.checkCodeTimer = setInterval(() => {
          // 倒计时 -1
          this.setState(prevState => ({ countTime: prevState.countTime - 1 }));
          if (countTime < 0) {
            // 倒计时完成
            clearInterval(this.checkCodeTimer);
            this.setState({
              codeDisabled: !phoneRe.test(saleMobile),
              codeText: defaultCodeText,
            });
          } else {
            // 修改倒计时显示秒数
            this.setState(prevState => ({
              codeText: `${prevState.countTime}s`,
            }));
          }
        }, 1 * 1000);
      })
      .catch(() => {
        // 失败恢复状态
        this.setState({
          codeDisabled: !phoneRe.test(saleMobile),
          codeText: defaultCodeText,
        });
      });
  }

  // 处理数据框
  handleInputChange(name, value) {
    const { smsCode, saleMobile } = this.state;
    this.setState({ [name]: value });
    if (phone === name) {
      this.setState({
        codeDisabled: !phoneRe.test(value),
        buttonDisabled: !(phoneRe.test(value) && smsCode.length === 4),
      });
    } else if (code === name) {
      this.setState({
        buttonDisabled: !(phoneRe.test(saleMobile) && value.length === 4),
      });
    }
  }

  // 登录处理
  loginHandler() {
    const { saleMobile, smsCode } = this.state;
    const param = { saleMobile, smsCode };
    Toast.loading('加载中', 0);
    api
      .post(urlList.saleLoginUrl, param)
      .then(res => {
        Toast.hide();
        // 处理token
        setCookie(Constant.token, res.token);
        setCookie(Constant.saleId, res.saleId);
        setCookie(Constant.saleMobile, res.saleMobile);
        // 设置 缓存 cookie
        storage.lsSetValue(Constant.cookiesInfo, {
          token: res.token,
          saleId: res.saleId,
          saleMobile: res.saleMobile,
        });
        // 设置 缓存 用户信息
        storage.lsSetValue(Constant.userInfo, {
          saleId: res.saleId,
          saleMobile: res.saleMobile,
          saleName: res.saleName,
          spId: res.spId,
        });
        // eslint-disable-next-line react/prop-types
        const { history } = this.props;
        history.push('/');
      })
      .catch(() => {});
  }

  render() {
    const {
      codeDisabled,
      saleMobile,
      smsCode,
      buttonDisabled,
      codeText,
    } = this.state;
    const { prefixCls, className } = this.props;
    const cls = classnames(className, `${prefixCls}`);

    const formCls = classnames(className, `${prefixCls}-form`);
    const codeCls = classnames({
      [`${prefixCls}-form-code-button`]: true,
      disabled: codeDisabled,
    });

    return (
      <div className={cls}>
        <LoginHeader className={`${prefixCls}-header-container`} />
        <div className={formCls}>
          <section className={`${prefixCls}-form-item`}>
            <InputItem
              className={`${prefixCls}-form-input`}
              maxLength="11"
              placeholder="输入您的手机号码"
              clear
              value={saleMobile}
              onChange={this.handleInputChange.bind(this, phone)}
            />
          </section>
          <section className={`${prefixCls}-form-item`}>
            <InputItem
              className={`${prefixCls}-form-input`}
              maxLength="4"
              placeholder="输入手机验证码"
              clear
              value={smsCode}
              onChange={this.handleInputChange.bind(this, code)}
            />
            <button
              type="button"
              className={codeCls}
              onClick={_.debounce(this.sendCode, 3 * 1000, { leading: true })}
            >
              {codeText}
            </button>
          </section>
          <Button
            className={`${prefixCls}-button`}
            disabled={buttonDisabled}
            onClick={_.debounce(this.loginHandler, 3 * 1000, { leading: true })}
          >
            登录
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
