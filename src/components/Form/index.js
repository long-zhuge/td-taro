/*
* Form 表单组件
* @params
*   items<FormItems>：渲染表单子组件的数据
*     name：字段名
*     label：名称
*     required：是否必填
*     inputType：输入类型，text|area
*     placeholder：提示信息
*     rules<List>：校验规则
*       pattern：校验规则，一般是正则
*       message：校验不通过时的提示信息
*   form：表单对象，一般由 useRef 生成
*   方法：
*     form.validateFields：触发表单验证
*     form.setFieldsValue：设置表单的值
* */

import React, { useState } from 'react';
import { View, Input } from '@tarojs/components';
import Area from './components/Area';
import { toast } from '@/utils';
import styles from './index.less';

const Form = (props) => {
  const {
    items = [],
    form = {},
  } = props;

  const [values, setValues] = useState({});

  // 表单校验获取字段内容
  form.validateFields = () => {
    const isError = items.some(item => {
      const value = values[item.name];

      if (item.required && !value) {
        toast({ text: `${item.label}不能为空` });
        return true;
      }

      if (value && item.rules) {
        const isRuleError = item.rules.some(i => {
          if (!i.pattern.test(value)) {
            toast({ text: i.message });
            return true;
          }
        });

        if (isRuleError) {
          return true;
        }
      }
    });

    return new Promise((resolve) => {
      if (!isError) {
        resolve(values);
      }
    })
  };

  // 设置表单字段内容
  form.setFieldsValue = (v) => {
    setValues(v);
  };

  return (
    <View className={styles.form}>
      {items.map(item => (
        <View className={styles.form_item} key={item.name}>
          <View className={styles.form_item_label}>{item.label}</View>
          <View className={styles.form_item_value}>
            {item.inputType === 'text' && (
              <Input
                name={item.name}
                placeholder={item.placeholder}
                className={styles.form_item_input}
                value={values[item.name]}
                onInput={({ target }) => {
                  setValues({
                    ...values,
                    [item.name]: target.value,
                  });
                }}
              />
            )}
            {item.inputType === 'area' && (
              <Area
                onChange={res => {
                  setValues({
                    ...values,
                    [item.name]: res,
                  });
                }}
                defaultValue={values[item.name]?.map(i => i.value)}
              >
                <Input
                  disabled
                  name={item.name}
                  placeholder={item.placeholder}
                  className={styles.form_item_input}
                  value={values[item.name]?.map(i => i.label).join('-')}
                />
              </Area>
            )}
          </View>
        </View>
      ))}
    </View>
  )
};

export default Form;
