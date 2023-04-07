/*
* 级联选择组件；对 Picker 进行二次封装
*   @PS：最多支持3层级联
*   @params
*     fieldNames<Object>: 数据中指定的 label、value、children，如：
*       { label: 'label', value: 'value', children: 'children' }
*     dataSource<Array(Object)>: 数据源
*     defaultValue<Array(String)>: 默认选中项，如 ['11'， '1101'， '110101']，其中 string 的值表示数据源中的 key
*     onChange<Function(values)>: 选择级联数据的回调事件
* */

import React, { useState, useEffect } from 'react';
import { Picker } from '@tarojs/components';

const Cascader = (props) => {
  const {
    fieldNames = { label: 'label', value: 'value', children: 'children' },
    dataSource = [],
    defaultValue = [],
    onChange = () => {},
    rangeKey = 'label',
    ...rest
  } = props;

  /*
  * 当前需要显示的级联数据
  *   1级：全部展示，一级数据改变时，需要重置 columns 数据和 二三级数据
  *   2级：根据一级选中的 key，筛选指定数据进行渲染二级数据
  *   3级：根据二级选中的 key，筛选指定数据进行渲染三级数据
  * */
  const [activeRange, setActiveRange] = useState([]);

  // 当前数据队列，用于从 range 中选出指定数据渲染到 Picker 中
  const [columns, setColumns] = useState([0, 0, 0]);
  // 经过 fieldNames 过滤后的数据源
  const [data, setData] = useState([]);

  // 数据初始化时，将数据源按照 fieldNames 进行过滤，并重排成 [[], [], []] 的格式
  useEffect(() => {
    if (dataSource[0]) {
      const one = [];
      const two = [];
      const three = [];

      dataSource.forEach((i, index1) => {
        const { label, value, children } = fieldNames;

        const label1 = i[label];
        const value1 = i[value];
        const children1 = i[children] || [];

        // 将1级数据进行缓存插入
        one.push({
          label: label1,
          value: value1,
          index: index1,
        });

        // 遍历1级数据的 children
        children1.forEach((i2, index2) => {
          const label2 = i2[label];
          const value2 = i2[value];
          const children2 = i2[children] || [];

          // 将2级数据进行缓存插入
          two.push({
            label: label2,
            value: value2,
            parent: value1,
            parentIndex: index1,
            index: index2,
          });

          // 遍历2级数据的 children
          children2.forEach((i3, index3) => {
            const label3 = i3[label];
            const value3 = i3[value];

            three.push({
              label: label3,
              value: value3,
              parent: value2,
              finishParent: value1,
              parentIndex: index2,
              finishParentIndex: index1,
              index: index3,
            });
          })
        });
      });

      setData([one, two, three]);
    }
  }, [dataSource]);

  // 初始化 defaultValue，将其转化为 columns 所示的下标
  useEffect(() => {
    if (defaultValue.length > 0 && data[0]) {
      const currentColumns = [];

      data[0].find((i) => {
        if (i.value === defaultValue[0]) {
          currentColumns[0] = i.index;
          return true;
        }
      });

      data[1] && data[1].find((i) => {
        if (i.value === defaultValue[1]) {
          currentColumns[1] = i.index;
          return true;
        }
      });

      data[2] && data[2].find((i) => {
        if (i.value === defaultValue[2]) {
          currentColumns[2] = i.index;
          return true;
        }
      });

      setColumns(currentColumns);
    }
  }, [defaultValue, data]);

  // 根据 columns 获取需要渲染的 range
  useEffect(() => {
    if (data[0]) {
      const one = data[0];
      const two = data[1].filter(i => i.parentIndex === columns[0]);
      const three = data[2].filter(i => i.finishParentIndex === columns[0] && i.parentIndex === columns[1]);

      setActiveRange([one, two, three]);
    }
  }, [columns, data]);

  // 列事件发生时，记录列数据
  const onColumnChange = ({ detail }) => {
    if (detail.column === 0) {
      setColumns([detail.value, 0, 0]);
    } else if (detail.column === 1) {
      setColumns([columns[0], detail.value, 0]);
    } else if (detail.column === 2) {
      setColumns([columns[0], columns[1], detail.value]);
    }
  };

  const onChangeRange = ({ detail }) => {
    const one = activeRange[0][detail.value[0]];
    const two = activeRange[1][detail.value[1]];
    const three = activeRange[2][detail.value[2]];
    onChange([one, two, three]);
  };

  return (
    <Picker
      mode="multiSelector"
      rangeKey={rangeKey}
      range={activeRange}
      onColumnChange={onColumnChange}
      onChange={onChangeRange}
      value={columns}
      style={{ width: '100%' }}
      {...rest}
    />
  )
};

export default Cascader;
