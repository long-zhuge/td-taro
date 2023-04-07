// https://taro-docs.jd.com/docs/app-config

export default defineAppConfig({
  lazyCodeLoading: 'requiredComponents', // 组件按需注入
  pages: [
    'pages/index/index',
    'pages/goods/index',
    'pages/blessing/index',
    'pages/my/index',
  ],
  subPackages: [
    {
      root: 'package',
      name: 'package',
      pages: [
        'pages/login/index',
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '试否盲盒',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F7F8FD',
  },
  tabBar: {
    color: '#383838',
    selectedColor: '#E7402E',
    borderStyle: 'white',
    backgroundColor: '#FFFFFF',
    list: [
      {
        text: '首页',
        pagePath: 'pages/index/index',
        iconPath: './assets/tabBar/0.png',
        selectedIconPath: './assets/tabBar/0.png'
      }, {
        text: '商城',
        pagePath: 'pages/goods/index',
        iconPath: './assets/tabBar/1.png',
        selectedIconPath: './assets/tabBar/1.png'
      }, {
        text: '福袋',
        pagePath: 'pages/blessing/index',
        iconPath: './assets/tabBar/2.png',
        selectedIconPath: './assets/tabBar/2.png'
      }, {
        text: '我的',
        pagePath: 'pages/my/index',
        iconPath: './assets/tabBar/3.png',
        selectedIconPath: './assets/tabBar/3.png'
      }
    ]
  }
})
