import taro from '@/taro';
import store from '@/store';
import request from '@/utils/request';

// 对象判断
export const typeOf = (obj, type) => Object.prototype.toString.call(obj) === `[object ${type}]`;

// 判断对象中是否有属性
export const isNonEmptyObject = (obj = {}) => {
  try {
    return Object.getOwnPropertyNames(obj).length > 0;
  } catch (e) {
    return false;
  }
};

// 延迟
export function delay(seconds = 2) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

// 提示
export const toast = (params = {}) => {
  const {
    text = '',
    duration = 2,
    ...restParam
  } = params;

  taro.showToast({
    title: text,
    icon: 'none',
    duration: duration * 1000,
    ...restParam,
  });
};

// 复制到剪切板
export const setClipboard = (data) => {
  taro.setClipboardData({
    data,
  })
}

// 拨打电话
export const phoneCall = (phone) => {
  taro.makePhoneCall({
    phoneNumber: phone,
  })
}

// 获取当前加载页面的url
export const currentRouter = () => {
  const pages = taro.getCurrentPages();
  const currentPage = pages[pages.length - 1];
  return currentPage.$component.$router;
}

// 信息脱敏：姓名、邮箱、手机号、身份证号
export function noPassByInfo(v = '') {
  // 邮箱
  if (String (v).indexOf ('@') > 0) {
    const str = v.split('@');
    const length = str[0].length;
    let s = '';

    if (length > 3) {
      s = str[0].substr(0, 3);
      s += new Array(length - 2).join('*');
    } else {
      s = str[0].substr(0, 1);
      s += new Array(length).join('*');
    }
    return `${s}@${str[1]}`;
  }

  // 手机号、身份证
  if (/^[0-9Xx]*$/.test(v)) {
    if (v.length <= 11) {
      const reg = /(\d{3})\d*(\d{4})/;
      return v.replace(reg, '$1****$2');
    }

    const reg = /(\d{4})\d*(\d{4})/;
    return v.replace(reg, '$1***********$2');
  }

  // 姓名
  if (v.length <= 3) {
    return `${v.substring(0, 1)}${v.length > 1 ? '*' : ''}${v.substring(2, v.length)}`;
  } else if (v.length > 3 && v.length <= 6) {
    return `${v.substring(0, 2)}**${v.substring(4, v.length)}`;
  } else if (v.length > 6) {
    return `${v.substring(0, 2)}****${v.substring(6, v.length)}`;
  }
}

// 小程序更新提示
export function weappUpdate() {
  if (taro.canIUse('getUpdateManager')) {
    const updateManager = taro.getUpdateManager()
    updateManager.onCheckForUpdate(({ hasUpdate }) => {
      if (hasUpdate) {
        updateManager.onUpdateReady(() => {
          taro.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: (res) => {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(() => {
          // 新的版本下载失败
          taro.showModal({
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
          })
        })
      }
    })
  }
}

/*
* 授权登录的相关操作
* */
export const onLogin = {
  logined: false, // 服务器登录态
  giveVip: false, // 首次登录弹窗提示激活会员
  showPrompt: false, // 是否已经弹窗
  toDo:() => {},// 登录后的回调
  // 获取 sessionKey 和 openId
  sessionByStorage(type, openid = '', session_key = '') {
    // type  'g':获取sessionKey  ‘s’:设置sessionKey
    if (type === 'g') {
      return {
        sessionKey: taro.getStorageSync('sessionKey'),
        openId: taro.getStorageSync('openId')
      }
    } else {
      taro.setStorageSync('openId', openid);
      taro.setStorageSync('sessionKey', session_key);
    }
  },
  // 获取系统用户信息和微信用户信息
  getUserInfo(cb) {
    Promise.all([
      request({
        url: '/system/user/info.json',
        showLoading: false,
        showToast: false,
        loginPrompt: false,
      }),
      request({
        url: '/user/getUsrInfo.json',
        showLoading: false,
        showToast: false,
        loginPrompt: false,
      }),
    ]).then(([res = {}, res2 = {}]) => {
      if (res.account) {
        this.logined = true;
        store.dispatch({
          type: 'global',
          payload: { userInfo: {...res, ...res2} },
        });
        cb && cb();
      }
    }).catch(() => {
      this.logined = false;
    });
  },
  // 检查 weixinsession 是否有效
  checkWeixinSession() {
    // 微信：检查登录态是否可用
    return new Promise((resolve, reject) => {
      taro.checkSession({
        complete: (res) => {
          console.log(res);
        },
        success: () => {
          resolve();
        },
        fail: () => {
          reject();
        }
      });
    })
  },
  // 微信端登录
  weixinLogin() {
    const _this = this;
    // 将 js_code 发送给后端获取 openId 和 sessionKey，并进行缓存
    taro.login({
      success: ({ code }) => {
        // 将 js_code 发送给后端获取 openId 和 sessionKey，并进行缓存
        request({
          url: `/user/open/getSessionKey.json?code=${code}`,
          showLoading: {
            title: '加载中...',
            mask: true
          },
          onSuccess: ({ openid, session_key }) => {
            _this.sessionByStorage('s', openid, session_key);
          },
        })
      }
    });
  },
  // 获取 session
  getSession() {
    const _this = this;
    _this.checkWeixinSession().catch(() => {
      _this.weixinLogin();
    })
  },
  // 手机号登录
  loginByPhone(props) {
    const _this = this;
    const {
      iv,
      encryptedData,
      errMsg,
    } = props;

    if (errMsg === 'getPhoneNumber:ok') {
      const { openId, sessionKey } = this.sessionByStorage('g');
      request({
        url: '/user/open/registeredByEncrypted.json',
        method: 'POST',
        showLoading: {
          title: '登录中...',
          mask: true
        },
        data: {
          iv,
          encryptedData,
          sessionKey,
          openId,
        },
        onSuccess: (res) => {
          const { phone, giveVip } = res;
          taro.setStorageSync('phone', phone);
          _this.giveVip = giveVip;
          _this.loginToDo();
        },
        onFail: () => {
          _this.weixinLogin();
        },
      });
    } else {
      taro.showToast({
        title: '已退出一键登录',
        icon: 'none'
      })
    }
  },
  // 登录后续操作
  loginToDo() {
    this.getUserInfo(() => {
      taro.navigateBack();
      this.toDo();
      this.toDo = () => {};
    });
  },
  // 登录提醒
  prompt(cb = () => {}) {
    const _this = this;
    if (_this.logined) {
      // 已登录，则执行回调函数
      cb();
    } else {
      // 将后续操作存储下来
      _this.toDo = cb
      if (!_this.showPrompt) {
        _this.showPrompt = true;
        taro.showModal({
          content: '还未登录',
          confirmText: '去登录',
          success({ confirm }) {
            _this.showPrompt = false;
            if (confirm) {
              jump({ url: '/package/pages/login/index' });
            }
          }
        });
      }
    }
  },
  resetLogined() {
    this.logined = false;
    store.dispatch({
      type: 'global',
      payload: { userInfo: {} },
    });
  },
};

// 将upload返回的 path 进行过滤
export const filterCdnPath = (path = '', first = false) => {
  const arr = !!path ? path.split(',') : [];

  return first ? arr[0] : arr;
};

// toFixed
export const toFixed = (number = 0) => {
  return +number.toFixed(2);
};

// jump 跳转 --《start》
const PAGE_WEBVIEW = '/package2/pages/webview/index';

export function stringify(payload = {}, encode = true) {
  const arr = Object.keys(payload).filter(k => payload[k]).map(key =>
    `${key}=${encode ? encodeURIComponent(payload[key]) : payload[key]}`
  )
  return arr.join('&');
}

function urlStringify(url, payload, encode = true) {
  const params = stringify(payload, encode);

  // NOTE 注意支付宝小程序跳转链接如果没有参数，就不要带上 ?，否则可能无法跳转
  return params ? `${url}?${params}` : url
}

/**
 * NOTE 后端返回的 url 可能是网页链接，需要在 webview 中打开
 * 也可能是小程序自身的链接，只能用 navigate/redirect 之类的打开
 * 就需要有个地方统一判断处理
 * @ps：method的用法，https://taro-docs.jd.com/docs/apis/route/switchTab
 */
export const jump = (options) => {
  const { url, title = '', payload = {}, method = 'navigateTo', encode = true } = options;

  if (/^https?:\/\//.test(url)) {
    taro[method]({
      url: urlStringify(PAGE_WEBVIEW, { url, title })
    })
  } else if (/^(\/package\d?)?\/pages\//.test(url)) {
    taro[method]({
      url: urlStringify(url, payload, encode)
    })
  }
}
// jump 跳转 --《end》