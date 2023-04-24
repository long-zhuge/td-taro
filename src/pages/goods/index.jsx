/*
* 积分商城
* */

import React from 'react';
import { connect } from 'react-redux';
import { View } from '@tarojs/components';
import styles from './index.less';

const Goods = ({ userInfo }) => {

  return (
    <View className={styles.wrap}>
      商城
    </View>
  );
}

export default connect(({ global }) => ({ ...global }), null, null, { forwardRef: true })(Goods);