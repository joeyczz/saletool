import classnames from 'classnames';
import React, { Component } from 'react';
import userLogoImg from '@/assets/images/user-logo.svg';
import { injectUnmout } from '@/utils/utils';
import PropTypes from 'prop-types';

import './style/HomeHeader.scss';

@injectUnmout
class HomeHeader extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: 'zd-home-header',
    className: '',
  };

  constructor() {
    super();
    this.state = {};

    // bind this
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler() {
    console.log('logou', this);
  }

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, `${prefixCls}`);
    return (
      <header className={cls}>
        <div className={`${prefixCls}-logo`}>
          <img src={userLogoImg} alt="logo" />
        </div>
        <section className={`${prefixCls}-info`}>
          <p>
            亲爱的，
            <span>某某某</span>
            你好～
          </p>
          <p>
            买和不买永远不是价格的问题，而是价值的问题。 小哥哥、小姐姐加油！
          </p>
        </section>
        <div className={`${prefixCls}-logout`}>
          <button type="button" onClick={this.logoutHandler}>
            退出
          </button>
        </div>
      </header>
    );
  }
}

export default HomeHeader;
