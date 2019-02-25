import classnames from 'classnames';
import React, { Component } from 'react';
import { injectUnmout } from '@/utils/utils';
import PropTypes from 'prop-types';

import Tabbar from '@/components/Tabbar';

// import './style/Report.scss';

@injectUnmout
class Report extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: 'zd-report',
    className: '',
  };

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, prefixCls);
    return (
      <div className={cls}>
        Report
        <Tabbar selectedKey="report" />
      </div>
    );
  }
}

export default Report;
