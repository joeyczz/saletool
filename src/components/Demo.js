import classnames from 'classnames';
import React, { Component } from 'react';
import { injectUnmout } from '@/utils/utils';
import PropTypes from 'prop-types';

// import './style/Demo.scss';

@injectUnmout
class Demo extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: 'zd-demo',
    className: '',
  };

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, prefixCls);
    return <div className={cls}>demo</div>;
  }
}

export default Demo;
