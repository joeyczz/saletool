import classnames from 'classnames';
import React, { Component } from 'react';
import { injectUnmout } from '@/utils/utils';

// import './LoginHeader.scss';

@injectUnmout
class BusinessCircle extends Component {
  static defaultProps = {
    prefixCls: 'zd-business-circle',
  };

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, `${prefixCls}`);
    return (
      <div className={cls}>
        zd-business-circle
      </div>
    );
  }
}

export default BusinessCircle;
