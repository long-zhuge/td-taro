const INITIAL_STATE = {
  userInfo: {},               // system的用户数据

  navBarHeight: 0,            // 导航栏高度
  menuRight: 0,               // 胶囊距离右方间距（保持左右间距一样）
  menuTop: 0,                 // 胶囊距离顶部间距
  menuHeight: 0,              // 胶囊高度
}

export default function global (state = INITIAL_STATE, action) {
  const payload = action.payload || {};

  return {
    ...state,
    ...payload,
  };
}
