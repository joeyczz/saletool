import classnames from 'classnames';
import React, { Component } from 'react';
import { injectUnmout } from '@/utils/utils';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { TabBar } from 'antd-mobile';
import './style/Tabbar.scss';

import homeIconImg from '@/assets/images/tabbar_home.svg';
import homeIconActiveImg from '@/assets/images/tabbar_home_active.svg';
import reportIconImg from '@/assets/images/tabbar_report.svg';
import reportIconActiveImg from '@/assets/images/tabbar_report_active.svg';
import meIconImg from '@/assets/images/tabbar_me.svg';
import meIconActiveImg from '@/assets/images/tabbar_me_active.svg';

const homeIcon = (
  <div
    style={{
      width: '20px',
      height: '20px',
      background: `url(${homeIconImg}) center center / 20px 20px no-repeat`,
    }}
  />
);

const homeSelectedIcon = (
  <div
    style={{
      width: '20px',
      height: '20px',
      background: `url(${homeIconActiveImg}) center center / 20px 20px no-repeat`,
    }}
  />
);

const reportIcon = (
  <div
    style={{
      width: '20px',
      height: '20px',
      background: `url(${reportIconImg}) center center / 20px 20px no-repeat`,
    }}
  />
);

const reportSelectedIcon = (
  <div
    style={{
      width: '20px',
      height: '20px',
      background: `url(${reportIconActiveImg}) center center / 20px 20px no-repeat`,
    }}
  />
);

const meIcon = (
  <div
    style={{
      width: '20px',
      height: '20px',
      background: `url(${meIconImg}) center center / 20px 20px no-repeat`,
    }}
  />
);

const meSelectedIcon = (
  <div
    style={{
      width: '20px',
      height: '20px',
      background: `url(${meIconActiveImg}) center center / 20px 20px no-repeat`,
    }}
  />
);

// tabbar 列表
const tabbarItemList = [
  {
    name: '门店列表',
    key: 'home',
    path: '/',
    icon: homeIcon,
    selectedIcon: homeSelectedIcon,
  },
  {
    name: '商圈报告',
    key: 'report',
    path: '/report',
    icon: reportIcon,
    selectedIcon: reportSelectedIcon,
  },
  {
    name: '我的',
    key: 'me',
    path: '/me',
    icon: meIcon,
    selectedIcon: meSelectedIcon,
  },
];

@injectUnmout
class Tabbar extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    selectedKey: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: 'zd-tabbar',
    className: '',
    selectedKey: 'home',
  };

  constructor() {
    super();

    // bind this
    this.tabbarClickHandler = this.tabbarClickHandler.bind(this);
  }

  tabbarClickHandler(item) {
    console.log(item);
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    history.push(item.path);
  }

  render() {
    const { prefixCls, className, selectedKey } = this.props;
    const cls = classnames(className, prefixCls);

    // tabbar 具体项
    const listItems = tabbarItemList.map(item => (
      <TabBar.Item
        title={item.name}
        key={item.key}
        selected={selectedKey === item.key}
        icon={item.icon}
        selectedIcon={item.selectedIcon}
        onPress={this.tabbarClickHandler.bind(this, item)}
      />
    ));

    return (
      <div className={cls}>
        <TabBar
          barTintColor="#fff"
          unselectedTintColor="#999"
          tintColor="#EE5053"
        >
          {listItems}
        </TabBar>
      </div>
    );
  }
}

export default withRouter(Tabbar);
