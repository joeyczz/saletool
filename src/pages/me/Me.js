import classnames from 'classnames';
import React, { Component } from 'react';
import { injectUnmout } from '@/utils/utils';
import PropTypes from 'prop-types';

import Tabbar from '@/components/Tabbar';

// import './style/Me.scss';

@injectUnmout
class Me extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: 'zd-me',
    className: '',
  };

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, prefixCls);
    return (
      <div className={cls}>
        Me
        <Tabbar selectedKey="me" />
      </div>
    );
  }
}

export default Me;
