import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
// import { onLogin } from '@/utils';
import styles from './index.less';

export default () => {
  useEffect(() => {
    // onLogin.weixinLogin();
  }, []);

  return (
    <View className={styles.wrap}>
      <View>您正在登录</View>
      <AtButton
        type="primary"
        className={styles.btn}
        openType="getPhoneNumber"
        onGetPhoneNumber={(e) => {
          // onLogin.loginByPhone(e.detail)
        }}
      >一键登录
      </AtButton>
    </View>
  );
}
