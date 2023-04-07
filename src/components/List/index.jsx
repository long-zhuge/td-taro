/*
* List 组件
* @params：
*   space<Array>：上下间隔，如 [0, 0]
*   items<List>：列表对象
*     label<String|ReactNode>：名称
*     arrow<Boolean>：是否展示箭头
*     visible<Boolean>：是否展示
*     extra<String|ReactNode>：右侧额外的内容
* */

import React from 'react';
import cx from 'classnames';
import { Image, View } from '@tarojs/components';
import arrowImg from '@/assets/arrow-right-gray.png';
import styles from './index.less';

export default (props) => {
  const {
    className,
    items = [],
    space = [0, 0],
  } = props;

  return (
    <View
      className={styles.list}
      style={{ marginTop: space[0], marginBottom: space[1] }}
    >
      {items.map((i) => {
        const {
          label = '',
          value = '',
          arrow = false,
          labelClassName,
          valueClassName,
          visible = true,
          line = true,
          extra,
          ...rest
        } = i;

        return visible && (
          <View
            className={cx(styles.list_item, className, {
              [styles.item_line]: line,
            })}
            {...rest}
          >
            <View className={cx(styles.item_label, labelClassName)}>{label}</View>
            <View className={cx(styles.item_value, valueClassName)}>
              {extra || value}{arrow && <Image className={styles.arrow} src={arrowImg} mode="widthFix" />}
            </View>
          </View>
        );
      })}
    </View>
  );
}
