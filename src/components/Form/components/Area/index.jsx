/*
* 省市县组件
* */

import React, { useState, useEffect } from 'react';
import { Cascader } from '@/components';
import request from '@/utils/request';

const Area = (props) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    request({
      showLoading: false,
      url: '/address/getAllAddress.json',
      onSuccess(res) {
        setDataSource(res);
      }
    })
  }, []);

  return (
    <Cascader
      dataSource={dataSource}
      fieldNames={{ label: 'label', value: 'value', children: 'list' }}
      {...props}
    />
  )
};

export default Area;
