/*
* 页脚悬浮组件
* @params：
*   visible<Boolean>：是否显示
* */

import React from 'react';
import cx from 'classnames';
import { View } from '@tarojs/components';
import styles from './index.less';

export default (props) => {
  const {
    line = false,
    visible = true,
    className,
  } = props;

  return visible && (
    <View
      className={cx(styles.footer, className, {
        [styles.line]: line,
      })}
    >
      {props.children}
    </View>
  );
}
