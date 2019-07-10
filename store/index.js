var _ = require('lodash');

export const state = () => ({
    /**
     * 原始的菜单数据
     */
    original_menus: [],
    menus: [],
    /**
     * 当前打开的所有的tabs
     */
    tabs: [],
    /**
     * 当前激活的tab
     */
    active_tab: null,
    /**
     * 登录状态
     * false-未登录
     * true-已登录
     */
    loginflag: false,
    /**
     * 设备号
     */
    device_id: null,
    access_token: null,
    refresh_token: null
});
export const mutations = {
    set_menu(state, menus) {
        state.menus = menus;
    },
    set_original_menu(state, menus) {
        state.original_menus = menus;
    },
    set_loginflag(state, flag) {
        state.loginflag = flag;
    },
    /**
     * 点击左侧菜单
     * @param state
     * @param menu
     */
    push_tabs(state, menu) {
        let hasExist = state.tabs.some(function (val) {
            return val.index === menu.index;
        });
        if (!hasExist) {
            state.tabs.push(menu)
            state.active_tab = menu;
        }
    },
    remove_tabs(state, menu) {
        state.tabs = _.filter(state.tabs, function (val) {
            return val.index !== menu.index;
        });
        if (state.active_tab.index == menu.index) {
            let len = state.tabs.length;
            state.tabs.length > 0 ? state.active_tab = state.tabs[len - 1] : null;
        }
    },
    set_tab_active(state, menu) {
        state.active_tab = menu;
    },
    set_deviceid(state, id) {
        state.device_id = id;
        sessionStorage.setItem('device_id', id)
    },
    set_accesstoken(state, token) {
        state.access_token = token;
        sessionStorage.setItem('access_token', token)
    },
    set_refreshtoken(state, token) {
        state.refresh_token = token;
        sessionStorage.setItem('refresh_token', token)
    }

};
export const getters = {
    getAllPathByName: (state) => (name) => {
        let result = [];
        let names = name.split('-');
        let temp;
        // let flatmenu=state.menus._flatten()
        // console.log(flatmenu)
        names.forEach(function (val, index) {
            if (index == 0) {
                temp = val;
            } else {
                temp += '-' + val;
            }
            let m = state.original_menus.find(function (menu) {
                return menu.name === temp;
            });
            if (m) {
                result.push(m);
            }

        });
        return result;
    },
    getCurrentPathTitle: (state) => (name) => {
        let m = state.original_menus.find(function (menu) {
            return menu.name === name;
        });
        return m ? m.title : '';
    },
    accessToken: ({access_token}) => {
        if (access_token === null) {
            return sessionStorage.getItem("access_token")
        } else {
            return access_token;
        }
    },
    refreshToken: ({refresh_token}) => {
        if (refresh_token === null) {
            return sessionStorage.getItem("refresh_token")
        } else {
            return refresh_token;
        }
    },
    deviceId: ({device_id}) => {
        if (device_id === null) {
            return sessionStorage.getItem("device_id")
        } else {
            return device_id;
        }
    }
};
export const actions = {
    async getMenu({commit}) {
        var menus = [];
        var original = [
            {
                id: "1",
                index: "/welcome",
                title: "门户",
                icon: "el-icon-menu",
                isleaf: true,
                name: 'welcome',
                parent: '-1',
            },
            {
                id: "2",
                index: "/user",
                title: "用户管理",
                icon: "el-icon-s-custom",
                isleaf: false,
                name: 'user',
                parent: '-1',
            },
            {
                id: "2-1",
                index: "/user/customer",
                title: "客户管理",
                icon: "",
                isleaf: true,
                name: 'user-customer',
                parent: '2',
            },
            {
                id: "2-2",
                index: "/user/dealer",
                title: "处理员管理",
                icon: "",
                isleaf: true,
                name: 'user-dealer',
                parent: '2',
            },
            {
                id: "2-3",
                index: "/user/admin",
                title: "管理员管理",
                icon: "",
                isleaf: true,
                name: 'user-admin',
                parent: '2',
            },
            {
                id: "3",
                index: "/param",
                title: "参数管理",
                icon: "el-icon-setting",
                isleaf: false,
                name: 'param',
                parent: '-1',
            },
            {
                id: "3-1",
                index: "/param/address",
                title: "地址管理",
                icon: "",
                isleaf: true,
                name: 'param-address',
                parent: '3',
            },
            {
                id: "4",
                index: "/order",
                title: "订单",
                icon: "el-icon-tickets",
                isleaf: false,
                name: 'order',
                parent: '-1',
            },
            {
                id: "4-1",
                index: "/order/manage",
                title: "订单管理",
                icon: "",
                isleaf: true,
                name: 'order-manage',
                parent: '4',
            },
            {
                id: "4-2",
                index: "/order/quality",
                title: "质检",
                icon: "",
                isleaf: true,
                name: 'order-quality',
                parent: '4',
            }
        ];
        let groupMenu = _.groupBy(original, function (val) {
            return val.parent;
        });
        _.each(original, function (val) {
            let pid = val.parent;
            let id = val.id;
            let keys = _.keys(groupMenu);
            //console.log('indexof',keys,id,_.indexOf(keys, id)>-1)
            if (_.indexOf(keys, id) > -1) {
                val.children = groupMenu[id];
            }
            if (pid == '-1') {
                menus.push(val)
            }
        });
        commit("set_menu", menus);
        commit("set_original_menu", original);
    },
    //请求设备号
    async getDeviceId({commit}) {
        //登录时候，才去请求设备号
        let response = await this.$loginApi.getDeviceId()
        commit('set_deviceid', response.data.content)
    },
    //发送验证码
    async askServerSendSmsCode({commit,dispatch},phone){
        await dispatch('getDeviceId');
        return this.$loginApi.sendSmsCode(phone)
    },

    //使用密码登录
    async loginByPwd({commit,dispatch},payload){
        let response = await this.$loginApi.loginByPassWord(payload)
        let access_token=response.data.access_token;
        let refresh_token=response.data.refresh_token;
        commit('set_accesstoken',access_token);
        commit('set_refreshtoken',refresh_token);
        commit('set_loginflag',true);
        await dispatch("getMenu");
        commit("set_tab_active", null);
    },
    //使用短信验证码登录
    async loginBySms({commit,dispatch},payload){
        let response = await this.$loginApi.loginBySmsCode(payload)
        let access_token=response.data.access_token;
        let refresh_token=response.data.refresh_token;
        commit('set_accesstoken',access_token);
        commit('set_refreshtoken',refresh_token);
        commit('set_loginflag',true);
        await dispatch("getMenu");
        commit("set_tab_active", null);
    },

    //退出系统
    async logoutSys({commit}){
        commit('set_accesstoken',null);
        commit('set_refreshtoken',null);
        commit('set_deviceid',null);
        commit('set_loginflag',false);
        commit('set_menu', []);
        commit('set_original_menu', []);
    },
};
