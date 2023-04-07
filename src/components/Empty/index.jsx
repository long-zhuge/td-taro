/*
* 空状态
* @params：
*   type<String>：图片类型
*   description<String>：自定义描述
*   space<Array>：上下间隔，如 ['0.4rem', '0.2rem']
* */

import React from 'react';
import cx from 'classnames';
import { View } from '@tarojs/components';
import styles from './index.less';

export default (props) => {
  const {
    type = '0',
    description = '暂无数据',
    space = [65, 30],
  } = props;

  return (
    <View
      className={styles.empty}
      style={{ paddingTop: space[0], paddingBottom: space[1] }}
    >
      <View className={cx(styles.empty_img, styles[`empty_img_${type}`])} />
      <View className={styles.empty_desc}>{description}</View>
    </View>
  );
}
