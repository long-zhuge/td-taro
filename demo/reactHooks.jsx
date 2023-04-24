// https://taro-docs.jd.com/docs/hooks#useready

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Taro, { useDidShow, useReady, useLoad } from '@tarojs/taro';
import { View } from '@tarojs/components';
import request from '@/utils/request';
import styles from './index.less';

const Demo = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, []);

  // 页面加载成功
  useLoad((options) => {
    console.log(options);
    // 动态修改 navbar
    Taro.setNavigationBarTitle({ title: 'demo' });
  });

  useReady(() => {

  })

  // 页面显示出来时执行，比如返回之类的
  useDidShow(() => {

  });

  return (
    <View className={styles.wrap}>

    </View>
  );
}

export default connect(({ global }) => ({ ...global }), null, null, { forwardRef: true })(Demo);