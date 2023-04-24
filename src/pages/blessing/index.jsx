// https://taro-docs.jd.com/docs/hooks#useready

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLoad, useReady, useDidShow, setNavigationBarTitle } from '@tarojs/taro';
import { View } from '@tarojs/components';
import styles from './index.less';

const Blessing = () => {
  useEffect(() => {

  }, []);

  // 页面加载成功
  useLoad((options) => {
    console.log(options);
    // 动态修改 navbar
    setNavigationBarTitle({ title: 'demo' });
  });

  useReady(() => {

  })

  // 页面显示出来时执行，比如返回之类的
  useDidShow(() => {

  });

  return (
    <View className={styles.wrap}>
      福袋
    </View>
  );
}

export default connect(({ global }) => ({ ...global }), null, null, { forwardRef: true })(Blessing);