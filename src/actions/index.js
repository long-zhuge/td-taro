// 服务器请求地址
export const base = {
  develop: 'https://dev.box.imedicpro.com', // 开发环境
  trial: 'https://dev.box.imedicpro.com',   // 体验环境
  release: 'https://box.imedicpro.com',  // 线上环境
};
export const baseUrl = base[__wxConfig.envVersion];
// 服务器静态资源请求地址
export const assetsUrl = `${base.release}/cdn/assets`; // 线上静态文件地址
export const baseImgUrl = `${baseUrl}/cdn`;
export const getImgUrl = (path = '') => {
  if (!!path) {
    const arr = path.split(',');

    return `${baseImgUrl}${arr[0].replace('/cdn', '')}`
  }
};

// 正则
export const REGEXP = {
  SEED: /^[\u4E00-\u9FA5A-Za-z]+$/, // 中文、英文
};


/*
* 业务相关参数
* */