/*
* 适用于 cdn 模式下的 Image，默认模式 mode="widthFix"
* */

import React from 'react';
import { Image } from '@tarojs/components';
import { getImgUrl, assetsUrl } from '@/actions';

export default ({ src = '', cdn = false, ...rest }) => {
  const url = cdn ? `${assetsUrl}${src}` : getImgUrl(src);

  return url ? <Image src={url} mode="widthFix" lazyLoad {...rest} /> : null;
}
