// 框架执行的环境，如 weapp、h5
const TARO_ENV = process.env.TARO_ENV;

/*
* 服务器请求地址，变量以 weapp 为准
* */
export const hosts = {
  // 开发环境
  develop: 'https://dev.box.imedicpro.com',
  // 体验环境
  trial: 'https://dev.box.imedicpro.com',
  // 生产环境
  release: 'https://box.imedicpro.com',
}[TARO_ENV === 'weapp' ? __wxConfig?.envVersion : 'develop'];

// 正则
export const REGEXP = {
  SEED: /^[\u4E00-\u9FA5A-Za-z]+$/, // 中文、英文
};


/*
* 业务相关参数
* */