/*
* DescList 组件
* @params：
*   space<Array>：上下间隔，如 [0, 0]
*   columns<List>：列表对象
*     label<String|ReactNode>：名称
*     arrow<Boolean>：是否展示箭头
*     visible<Boolean>：是否展示
*     extra<String|ReactNode>：右侧额外的内容
* */

import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.less';

export default (props) => {
  const {
    space = [0, 0],
    columns = [],
    dataSource = {},
  } = props;

  return (
    <View
      className={styles.desclist}
      style={{ marginTop: space[0], marginBottom: space[1] }}
    >
      {columns.map(({ visible = true, extra, ...i }) => {
        if (visible) {
          return (
            <View className={styles.item}>
              <View className={styles.label}>{i.title}</View>
              <View className={styles.value}>{dataSource[i.dataIndex]}</View>
              {extra}
            </View>
          );
        }
      })}
    </View>
  );
}
