import { useState, useEffect } from 'react';
import request from '@/utils/request';

// 获取资源位配置列表
// export function useBanner(props = {}) {
//   const {
//     type = '',
//   } = props;
//
//   const [data, setData] = useState([]);
//
//   const query = () => {
//     request({
//       url: '/banner/getClient.json',
//       data: { type },
//       onSuccess(res) {
//         setData(res);
//       }
//     });
//   };
//
//   useEffect(() => {
//     query();
//   }, []);
//
//   return [data];
// }
//
// // 获取优惠券列表
// export function useCouponList(props = {}) {
//   const {
//     immediately = true,
//     dependencies = [],
//     filter = i => i,
//     success = () => {},
//   } = props;
//
//   const [data, setData] = useState([]);
//
//   const query = () => {
//     request({
//       url: '/discount/getDiscount.json',
//       data: { status: 'PROCESS', pageSize: 100 },
//       onSuccess({ values = [] }) {
//         const arr = filter(values);
//         setData(arr);
//         success(arr);
//       }
//     });
//   };
//
//   useEffect(() => {
//     if (immediately) {
//       query();
//     }
//   }, dependencies);
//
//   return [data, setData, query];
// }