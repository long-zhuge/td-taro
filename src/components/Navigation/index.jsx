/*
* 自定义 navigationBar 组件
* @params：
*   mode<Enum>：模式，black/white
*   name<String>：navBar 名称
*   customImage<ReactNode>：自定义返回箭头
*   fixed<Boolean>：是否固定在上方
* */

import React from 'react';
import Taro from '@tarojs/taro';
import cx from 'classnames';
import { connect } from 'react-redux';
import { View, Text, Image } from '@tarojs/components';
import arrowLeftWhite from '@/assets/arrow-left-white.png';
import arrowLeftBlack from '@/assets/arrow-left-black.png';
import { jump } from '@/utils';
import styles from './index.less';

const Navigation = (props) => {
  const {
    mode = 'black',
    name = '试否',
    fixed = false,
    customImage,
    navBarHeight,
    menuRight,
    menuTop,
    menuHeight,
  } = props;

  const isModeBlack = mode === 'black';

  const onBack = () => {
    if (Taro.getCurrentPages().length > 1) {
      Taro.navigateBack();
    } else {
      jump({ method: 'switchTab', url: '/pages/index/index' });
    }
  };

  return (
    <View
      className={cx(styles.wrap, {
        [styles.fixed]: fixed,
      })}
      style={{
        height: navBarHeight,
      }}
    >
      <View
        className={cx(styles.nav, {
          [styles.mode_black]: isModeBlack,
        })}
        style={{
          top: menuTop,
          height: menuHeight,
          left: menuRight,
        }}
      >
        {customImage || (
          <Image
            onClick={onBack}
            className={styles.img}
            src={isModeBlack ? arrowLeftBlack : arrowLeftWhite}
          />
        )}
        <Text onClick={onBack}>{name}</Text>
      </View>
    </View>
  )
}

export default connect(({ global }) => ({ ...global }))(Navigation);
