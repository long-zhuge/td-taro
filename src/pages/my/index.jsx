import React from 'react';
import { connect } from 'react-redux';
import { View } from '@tarojs/components';
import { onLogin } from '@/utils';
import styles from './index.less';

const My = (props) => {
  const {
    userInfo = {},
  } = props;

  return (
    <View className={styles.wrap}>
      <View
        onClick={() => {
          onLogin.prompt()
          console.log(123);
        }}
      >去登录</View>
    </View>
  );
}

export default connect(({ global }) => ({ ...global }))(My);