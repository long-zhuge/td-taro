import taro from '@/taro';
import { hosts } from '@/actions';
import { onLogin, toast } from '@/utils';

const defaultErrMsg = '服务器升级中，稍等片刻哦';

export default function request(options) {
  const {
    url,  // 请求地址
    data,  // 携带参数
    header, // 头部参数
    proxy = '/mh',
    method = 'GET',  // 请求方法
    showLoading = { // 显示 loading 提示框
      title: '正在加载',
      mask: true
    },
    continually = false, // 连续请求
    showToast = true,  // 轻提醒
    loginPrompt = true, // 登录弹窗
    onComplete, // 请求结束的回调函数
    onSuccess,  // 成功回调
    onFail  // 失败回调
  } = options

  return new Promise((resolve, reject) => {
    showLoading && taro.showLoading(showLoading)
    taro.request({
      credentials: 'include',
      enableCache: true,
      url: `${hosts}${proxy}${url}`,
      data,
      header: {
        'Cookie': taro.getStorageSync('Cookie'),
        'content-type': 'application/json',
        ...header,
      },
      method: method.toUpperCase(),
      complete() {
        onComplete && onComplete()
      },
      success(res) {
        const { success, dataObject, errorCode, errorMessage } = res.data;
        if (res.statusCode === 200 && success) {
          showLoading && !continually && taro.hideLoading()
          const cookie = res.header['Set-Cookie'];
          if (cookie && cookie.includes('shiroCookie')) {
            taro.setStorageSync('Cookie', res.header['Set-Cookie']);
          }
          resolve(dataObject || {});
          onSuccess && onSuccess(dataObject || {});
        } else {
          showLoading && taro.hideLoading();
          if (errorCode === 'UNLOGIN') {
            onLogin.resetLogined();
            loginPrompt && onLogin.prompt();
          }
          onFail && onFail({ errorCode, errorMessage });
          const error = new Error(errorMessage);
          error.errorCode = errorCode;
          reject(error);
        }
      },
      fail(res) {
        showLoading && taro.hideLoading()
        reject(new Error(res.errMsg));
      }
    })
  }).catch(e => {
    if (showToast && e.errorCode !== 'UNLOGIN') {
      toast({ text: e.message || defaultErrMsg });
    }
  })
}

export const fileUpload = (options) => {
  const {
    url, // 请求地址
    filePath, // tempFilePath
    formData,
    onComplete,
    onSuccess,
    onFail,
  } = options;

  return new Promise((resolve, reject) => {
    taro.uploadFile({
      url: `${hosts}${url}`,
      filePath,
      formData,
      name: 'file',
      complete: onComplete,
      success (res) {
        const resData = JSON.parse(res.data);
        if (res.statusCode === 200 && resData.success) {
          resolve(resData.dataObject);
          onSuccess && onSuccess(resData.dataObject);
        } else {
          onFail && onFail(resData.errorMessage);
          reject(new Error(resData.errorMessage || resData.message));
        }
      },
      fail(res) {
        reject(new Error(res.errMsg));
      }
    })
  }).catch(e => {
    toast({ text: e.message || defaultErrMsg });
  })
}