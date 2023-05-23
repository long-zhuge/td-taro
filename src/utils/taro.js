// 由于在非 weapp 模式下，直接使用 Taro.xxx 会报错，所以在此进行解构

import {
  // 路由：https://taro-docs.jd.com/docs/apis/route/switchTab
  switchTab,
  reLaunch,
  redirectTo,
  navigateTo,
  navigateBack,

  // 文件上传：https://taro-docs.jd.com/docs/apis/network/upload/uploadFile
  uploadFile,

  // 请求：https://taro-docs.jd.com/docs/apis/network/request/
  request,

  // 界面交互
  hideToast,
  showToast,
  showModal,
  showLoading,
  hideLoading,
  getMenuButtonBoundingClientRect,
  setNavigationBarTitle,

  // 数据缓存：https://taro-docs.jd.com/docs/apis/storage/getStorageSync
  getStorageSync,
  setStorageSync,

  // 设备：https://taro-docs.jd.com/docs/apis/device/clipboard/setClipboardData
  setClipboardData,
  makePhoneCall,

  // 框架：https://taro-docs.jd.com/docs/apis/framework/getCurrentPages
  getCurrentPages,

  // 基础：https://taro-docs.jd.com/docs/apis/base/canIUse
  login,
  canIUse,
  checkSession,
  getUpdateManager,
  getSystemInfoSync,

  // 跳转预加载：https://taro-docs.jd.com/docs/optimized#%E8%B7%B3%E8%BD%AC%E9%A2%84%E5%8A%A0%E8%BD%BD
  preload,
  getCurrentInstance,
} from '@tarojs/taro';

export default {
  switchTab,
  reLaunch,
  redirectTo,
  navigateTo,
  navigateBack,

  uploadFile,

  request,

  hideToast,
  showToast,
  showModal,
  showLoading,
  hideLoading,
  getMenuButtonBoundingClientRect,
  setNavigationBarTitle,

  getStorageSync,
  setStorageSync,

  setClipboardData,
  makePhoneCall,

  getCurrentPages,

  login,
  canIUse,
  checkSession,
  getUpdateManager,
  getSystemInfoSync,

  preload,
  getCurrentInstance,
};