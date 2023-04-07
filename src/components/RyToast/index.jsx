/*
* 轻提示
* @params
*   title<String>：标题
*   content<String>：内容
*   okText<String/Boolean>：确定按钮文案，空时不展示
*   cancelText<String/Boolean>：取消按钮文案，空时不展示
*   onOk<Function(setVisible)>：确定按钮的回调函数
*   onCancel<Function(setVisible)>：取消按钮的回调函数
*   custom<Function>：自定义按钮，会覆盖原生按钮
* */

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import cx from 'classnames';
import { View, Button } from '@tarojs/components';
import RyMask from '../RyMask';
import styles from './index.less';

export default forwardRef((props, ref) => {
  const {
    title = '',
    content = '',
    okText = '知道了',
    cancelText = '取消',
    onOk,
    okButtonProps = {},
    onCancel,
    cancelButtonProps = {},
  } = props;

  const [visible, setVisible] = useState(false);

  // 提供给外部的接口
  useImperativeHandle(ref, () => ({
    visible: setVisible,
  }));

  // 取消按钮
  const cancelButton = (
    <Button
      className={cx(styles.btn, {
        [styles.btn_block]: !okText,
      })}
      onClick={() => onCancel ? onCancel(setVisible) : setVisible(false)}
      {...cancelButtonProps}
    >
      {cancelText}
    </Button>
  );

  // 确定按钮
  const okButton = (
    <Button
      className={cx(styles.btn, styles.btn_ok, {
        [styles.btn_block]: !cancelText,
      })}
      onClick={() => onOk ? onOk(setVisible) : setVisible(false)}
      {...okButtonProps}
    >
      {okText}
    </Button>
  );

  return (
    <RyMask visible={visible}>
      <View className={styles.container}>
        <View className={styles.title}>{title}</View>
        <View className={styles.content}>{content}</View>
        <View className={styles.footer}>
          {cancelText && cancelButton}
          {okText && okButton}
        </View>
      </View>
    </RyMask>
  );
})
