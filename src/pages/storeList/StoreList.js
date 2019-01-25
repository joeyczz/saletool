import classnames from 'classnames';
import React, { Component } from 'react';
import { InputItem, Toast, Button, Picker } from 'antd-mobile';

import './style/StoreList.scss';

class BusinessCircle extends Component {
  static defaultProps = {
    prefixCls: 'zd-store-list',
  };

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, `${prefixCls}`);
    return (
      <div className={cls}>
        <p>以下内容为本次搜索匹配到的门店信息</p>
        <section>

        </section>
        <div className={`${prefixCls}-button`}>
          <Button>没有我要的，去新增</Button>
        </div>
      </div>
    );
  }
}

export default BusinessCircle;
