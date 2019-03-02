import classnames from 'classnames';
import React, { Component } from 'react';
import { injectUnmout } from '@/utils/utils';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import './style/HomeHeader.scss';

@injectUnmout
class HomeHeader extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    filterHandler: PropTypes.func.isRequired,
  };

  static defaultProps = {
    prefixCls: 'zd-home-header',
    className: '',
  };

  constructor() {
    super();
    this.state = {
      // 是否打开
      show: false,
      showActiveKey: '',
      showList: [],

      distanceTagList: ['500m', '1km', '2km', '3km', '5km'],
      intentionTagList: [
        '全部',
        '较高意向',
        '高意向',
        '一般意向',
        '较低意向',
        '低意向',
        '没啥意向',
      ],
      signTagList: ['全部', '未签单', '已签单'],
      distance: '',
      intention: '',
      sign: '',
      firstVisit: false,
    };

    // bind this
    this.closeSelectHandler = this.closeSelectHandler.bind(this);
    this.tagClickHandler = this.tagClickHandler.bind(this);
    this.selectClickHandler = this.selectClickHandler.bind(this);
  }

  // 当前标签是否active
  isTagActive(key) {
    const { distance, intention, sign, firstVisit } = this.state;
    let active = false;
    switch (key) {
      case 'distance':
        active = distance !== '';
        break;
      case 'intention':
        active = intention !== '';
        break;
      case 'sign':
        active = sign !== '';
        break;
      case 'firstVisit':
        active = firstVisit;
        break;
      default:
        active = false;
        break;
    }
    return active;
  }

  isSelectItemActiv(item) {
    const { distance, intention, sign, showActiveKey } = this.state;
    let active = false;
    switch (showActiveKey) {
      case 'distance':
        active = distance === item;
        break;
      case 'intention':
        active = intention === item;
        break;
      case 'sign':
        active = sign === item;
        break;
      default:
        active = false;
        break;
    }
    return active;
  }

  closeSelectHandler() {
    this.setState({ show: false });
  }

  // 选项标签点击事件
  tagClickHandler(item) {
    if (item.key === 'firstVisit') {
      this.setState(
        prevState => ({
          firstVisit: !prevState.firstVisit,
          show: false,
        }),
        this.query
      );
    } else {
      this.setState({
        show: true,
        showList: item.tagList,
        showActiveKey: item.key,
      });
    }
  }

  selectClickHandler(item) {
    const { showActiveKey } = this.state;
    switch (showActiveKey) {
      case 'distance':
        this.setState({ distance: item, show: false });
        break;
      case 'intention':
        this.setState({ intention: item, show: false });
        break;
      case 'sign':
        this.setState({ sign: item, show: false });
        break;
      default:
        break;
    }
    this.query();
  }

  query() {
    const { filterHandler } = this.props;
    const { distance, intention, sign, firstVisit } = this.state;
    const param = { distance, intention, sign, firstVisit };
    filterHandler(param);
  }

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(className, `${prefixCls}`);

    const { distanceTagList, intentionTagList, signTagList } = this.state;
    const list = [
      { name: '附近', key: 'distance', tagList: distanceTagList },
      { name: '意向', key: 'intention', tagList: intentionTagList },
      { name: '签单', key: 'sign', tagList: signTagList },
      { name: '0次访问', key: 'firstVisit' },
    ];
    // filter tag 具体项
    const listItems = list.map(item => {
      const itemClc = classnames(`${prefixCls}-filter-item`, {
        down: !_.isEmpty(item.tagList),
        active: this.isTagActive(item.key),
      });
      return (
        <div
          className={itemClc}
          key={item.key}
          onClick={this.tagClickHandler.bind(this, item)}
          onKeyUp={this.tagClickHandler.bind(this, item)}
          role="button"
          tabIndex="-1"
        >
          <span>{item.name}</span>
        </div>
      );
    });

    // 下拉选项
    const { show, showList } = this.state;
    const selectList = showList.map(item => {
      // const curSelectedItem = '';
      // if (show)
      const selectItemCls = classnames(`${prefixCls}-filter-select-item`, {
        active: this.isSelectItemActiv(item),
      });
      return (
        <button
          type="button"
          key={item}
          className={selectItemCls}
          onClick={this.selectClickHandler.bind(this, item)}
        >
          {item}
        </button>
      );
    });

    // 下拉选项容器
    const selectContainer = show ? (
      <div
        className={`${prefixCls}-filter-select`}
        onClick={this.closeSelectHandler}
        onKeyPress={this.closeSelectHandler}
        tabIndex="-1"
        role="button"
      >
        <div
          className={`${prefixCls}-filter-select-list`}
          onClick={e => e.stopPropagation()}
          onKeyPress={e => e.stopPropagation()}
          tabIndex="-1"
          role="button"
        >
          {selectList}
        </div>
      </div>
    ) : null;

    return (
      <header className={cls}>
        <div className={`${prefixCls}-store-search`}>
          <div type="button" className={`${prefixCls}-store-search-btn`}>
            请输入门店名称
          </div>
        </div>
        <section className={`${prefixCls}-store-filter`}>{listItems}</section>
        {selectContainer}
      </header>
    );
  }
}

export default withRouter(HomeHeader);
