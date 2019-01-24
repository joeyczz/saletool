import classnames from 'classnames';
import React, { Component } from 'react';
import { InputItem, Toast, Button } from 'antd-mobile';

// import searchBg1 from '@/assets/images/search-bg-1.svg';

import './style/StoreSearch.scss';

class LoginHeader extends Component {
  static defaultProps = {
    prefixCls: 'zd-store-search',
  };

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, `${prefixCls}`);
    return (
      <div className={cls}>
        <div className={`${prefixCls}-form`}>
          <div className={`${prefixCls}-form-title`}>请输入本次您拜访的客户信息</div>
          <section className={`${prefixCls}-form-item`}>
            <InputItem className={`${prefixCls}-form-input`} maxLength="11" placeholder="输入您的手机号码" clear
               ></InputItem>
          </section>

        </div>
        <Button className={`${prefixCls}-button`}>搜索</Button>
      </div>
    );
  }
}

export default LoginHeader;
