import { Component } from 'react';
import { Provider } from 'react-redux';
import taro from '@/taro';
// import { weappUpdate, onLogin } from '@/utils';
import store from './store';

import 'taro-ui/dist/style/index.scss'
import './app.less';

// 设置小程序全局默认分享事件
process.env.TARO_ENV === 'weapp' &&
!function(){
  var PageTmp = Page;

  Page = function (pageConfig) {
    // 设置全局默认分享
    pageConfig = Object.assign({
      onShareAppMessage(res) {
        if (res.from === 'menu') {
          let path;

          try {
            const pages = taro.getCurrentPages();
            const view = pages[pages.length - 1];
            path = view.data.root.uid.split('$taroTimestamp')[0];
          } catch (e) {
            path = '/pages/index/index';
          }

          return {
            title: '分享标题',
            path,
            imageUrl: '',
          };
        }
      },
    }, pageConfig);

    PageTmp(pageConfig);
  };
}();

class App extends Component {
  componentDidMount () {
    /*
    * 对自定义导航栏数据进行计算
    * */
    // const menu = taro.getMenuButtonBoundingClientRect();
    // const systemInfo = taro.getSystemInfoSync();
    //
    // store.dispatch({
    //   type: 'global',
    //   payload: {
    //     navBarHeight: systemInfo.statusBarHeight + 44,
    //     menuRight: systemInfo.screenWidth - menu.right,
    //     menuTop: menu.top,
    //     menuHeight: menu.height,
    //   },
    // });

    // 检查版本更新
    // weappUpdate();
    // 进入应用时检查服务端登录态(获取用户信息)
    // onLogin.getUserInfo();
    // 进入应用时检查weixinsession是否有效
    // onLogin.getSession();
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
