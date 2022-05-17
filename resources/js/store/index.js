import Vue from 'vue';
import Vuex from 'vuex';

import finance from './../modules/finance/store/index';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        finance,
    },
    state: {
        token: 'asdasd',
        currentUser: {},
    },
    mutations: {
        // เปลี่ยนค่าตัวแปรในส่วนของ state
        setToken(state, token) {
            state.token = token;
        },
    },
    getters: {
        // ดึงค่าตัวแปรในส่วนของ state
        getToken(state) {
            return state.token;
        },
    },
    actions: {
        // สร้างฟังก์ชันสำหรับการเรียกใช้งานฟังก์ชันของอื่นๆ

    },
});

export default store;