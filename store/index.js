export const state = () => ({
  menus: [],
  /**
   * 登录状态
   * false-未登录
   * true-已登录
   */
  loginflag: false
});
export const mutations = {
  set_menu(state, menus) {
    state.menus = menus;
  },
  set_loginflag(state, flag) {
    state.loginflag = flag;
  }
};
export const getters = {};
export const actions = {
  /**
   * logflag
   *  true：表示做登录
   *  flase：表示做登出
   */
  getMenu({ state, commit }, logflag) {
    var menus = [
      {
        id: "1",
        index: "/welcome",
        title: "门户",
        icon: "el-icon-menu",
        isleaf: true,
        children: []
      },
      {
        id: "2",
        index: "/user",
        title: "用户管理",
        icon: "el-icon-location",
        isleaf: false,
        children: [
          {
            id: "2-1",
            index: "/user/customer",
            title: "用户管理",
            icon: "",
            isleaf: true
          },
          {
            id: "2-2",
            index: "/user/dealer",
            title: "处理员管理",
            icon: "",
            isleaf: true
          },
          {
            id: "2-3",
            index: "/user/admin",
            title: "管理员管理",
            icon: "",
            isleaf: true
          }
        ]
      }
    ];
    if (logflag) {
      commit("set_menu", menus);
    } else {
      commit("set_menu", []);
    }
  },
  logSys({ state, commit, dispatch }, flag) {
    dispatch("getMenu", flag);
    commit("set_loginflag", flag);
  }
};
