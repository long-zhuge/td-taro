/*
* 基础 Mask 组件
* @params：
*   visible<Boolean>：是否显示
* */

import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.less';

export default ({ visible = false, ...rest }) => {
  return visible && (
    <View className={styles.wrap}>
      {rest.children}
    </View>
  );
}
