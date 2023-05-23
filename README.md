## 版本依赖

- nodejs：v14.19.0
- tarojs：3.5.12

## 微信文档

- [传送门](https://developers.weixin.qq.com/miniprogram/dev/component)

## Taro

- [Taro文档](https://taro-docs.jd.com/docs/)
- 版本支持：v3.5.12
- 安装命令：`yarn global add @tarojs/cli@3.5.12`

## Taro UI

- [传送门](https://taro-ui.jd.com)
- 需要的安装依赖
  - 如果框架是 less，则需要安装 `@tarojs/plugin-sass`
  - taro-ui 版本号：如果 tarojs 是 3.x 版本，则也需要安装 3.x 版本

## 目录结构

```
├── dist                        // 小程序编译结果目录
├── README.md
├── config                      // 配置目录
│   ├── dev.js                  // 开发时配置
│   ├── index.js                // 默认配置
│   └── prod.js                 // 打包时配置
├── src
│   ├── actions                 // 全局常量
│   ├── assets                  // 静态资源目录
│   ├── components              // 全局组件目录
│   ├── package                 // 分包目录（结构同 pages）
│   ├── pages                   // 页面文件目录
│   ├── reducers                // redux
│   ├── store                   // 全局数据（redux）
│   └── utils                   // 工具集
│       ├── index.js            // 常用工具
│       ├── request.js          // 请求工具
│       ├── taro.js             // @tarojs/taro 拆解包，方便 h5 编译
│       └── useService.js       // 指定服务端接口请求
│   ├── app.config.js           // app 配置文件
│   ├── app.js                  // 项目入口文件
│   ├── app.less                // 项目总通用样式
│   ├── index.html              // 入口文件
│   ├── theme.less              // 样式变量文件
├── project.config.json         // 微信小程序配置
└── package.json
```

## 项目启动

### 安装

```
  # 使用 yarn 安装依赖
  $ yarn
  # OR 使用 cnpm 安装依赖
  $ cnpm install
  # OR 使用 npm 安装依赖
  $ npm install
```

### 运行

```
  # 小程序
  $ yarn dev:weapp
  # H5
  $ yarn dev:h5
```

### 打包

```
  # 小程序
  $ yarn build:weapp
  # H5
  $ yarn build:h5
```

## FAQ

### 1. Radio

```
// 更改大小，使用样式缩放
radio {
  transform: scale(.65);
}

// 使用 onClick 事件来改变状态
```

### 2. Taro 多行省略

> /* autoprefixer: ignore next */ 代码是关键，请不要改变位置

```
display: -webkit-box;
word-break: break-all;
/* autoprefixer: ignore next */
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
text-overflow: ellipsis;
```

### 3. 单行省略

```
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

### 4. 微信小程序设置全局分享事件

> 写在 app.js 中

```
// 设置小程序全局默认分享事件
!function(){
  var PageTmp = Page;

  Page = function (pageConfig) {
    // 设置全局默认分享
    pageConfig = Object.assign({
      onShareAppMessage(res) {
        if (res.from === 'menu') {
          let path;

          try {
            const pages = Taro.getCurrentPages();
            const view = pages[pages.length - 1];
            path = view.data.root.uid.split('$taroTimestamp')[0];
          } catch (e) {
            path = '/pages/index/index';
          }

          return {
            title: '新春送福，新人盲盒首抽免费',
            path,
            imageUrl: `${assetsUrl}/index/global_share.png`,
          };
        }
      },
    }, pageConfig);

    PageTmp(pageConfig);
  };
}();
```

### 5. Taro.xxx 方法在 h5 模式下无法正常使用和打包

> 可以使用 utils/taro 下的方法

```
将使用方法拆解成如下方式：
import { showLoading, request, getStorageSync, hideLoading, setStorageSync, uploadFile } from '@tarojs/taro';
```

### 6. 关于 hooks

- 可直接使用 @tarojs/taro 包中的方法，如下：

```
import { useLoad, useReady, useDidShow } from '@tarojs/taro';
```

### 7. 全局配置缺少 pages 字段，请检查！

- [issues](https://github.com/NervJS/taro/issues/13544)
