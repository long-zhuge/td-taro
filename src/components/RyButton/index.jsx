/*
* Button 组件
* @PS：无法使用微信授权等相关功能
* */

import React from 'react';
import cx from 'classnames';
import { View } from '@tarojs/components';
import styles from './index.less';

export default ({ className, type = 'default', size = '', ...rest }) => (
  <View
    className={cx(styles.ry_btn, className, {
      [styles.ry_btn_primary]: type === 'primary',
      [styles.ry_btn_large]: size === 'large',
    })}
    {...rest}
  />
);
