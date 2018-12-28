import classnames from 'classnames';
import React, {Component} from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      defaultCodeText: '获取验证码',
      codeDisabled: false,
      countTime: 60,
      codeText: '123',
      checkCodeTimer: undefined,
    }
  }

  render() {
    const prefixCls = 'zd-code';
    const {className } = this.props;
    const cls = classnames(className, `${prefixCls}`);
    return (
      <div className={cls}>
        <span onClick={() => this.handleClick()}>{this.state.codeText}</span>
      </div>
    );
  }

}

export default Login;
