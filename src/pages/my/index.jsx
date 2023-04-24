import React from 'react';
import { connect } from 'react-redux';
import { View } from '@tarojs/components';
import { jump } from '@/utils';
import styles from './index.less';

const My = (props) => {
  const {
    userInfo = {},
  } = props;

  console.log(userInfo)

  return (
    <View className={styles.wrap}>
      <View
        onClick={() => {
          // onLogin.prompt()
          // console.log(123);
          jump({ url: '/package/pages/login/index' });
        }}
      >去登录</View>
    </View>
  );
}

export default connect(({ global }) => ({ ...global }), null, null, { forwardRef: true })(My);