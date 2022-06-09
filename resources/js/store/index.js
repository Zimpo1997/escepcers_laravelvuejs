import Vue from 'vue';
import Vuex from 'vuex';
import router from './../router/router'

import finance from './../modules/finance/store/index';
import nutrition from './../modules/nutrition/store/index';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        finance,
        nutrition
    },
    state: {
        appname: 'BCK Office',
        hoscode: '11245',
        hosname: 'โรงพยาบาลคีรีมาศ',
        token: localStorage.getItem("token"),
        currentUser: {},
    },
    mutations: {
        // เปลี่ยนค่าตัวแปรในส่วนของ state
        setToken(state, token) {
            state.token = token;
        },
        setCurrentUser(state, currentUser) {
            state.currentUser = currentUser;
        },
    },
    getters: {
        // ดึงค่าตัวแปรในส่วนของ state
        appname: state => state.appname,
        hoscode: state => state.hoscode,
        hosname: state => state.hosname,
        token: state => state.token,
        currentUser: state => state.currentUser,
    },
    actions: {
        autoSignIn({ commit }, payload) {
            commit('setCurrentUser', payload)
        },

        getCurrentUser({ commit }) {
            // getCurrentUser(context) {
            return new Promise((resolve, reject) => {
                axios
                    .get("/api/user")
                    .then(({ data, status }) => {
                        if (status === 200) {
                            commit("setCurrentUser", data);
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });

            });
        },

        // สร้างฟังก์ชันสำหรับการเรียกใช้งานฟังก์ชันของอื่นๆ
        LOGIN: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/login", payload)
                    .then(({ data, status }) => {
                        if (status === 200) {
                            commit("setToken", data);
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });

            });
        },
        REGISTER: ({ commit }, { name, email, username, password, password_confirmation }) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/register", {
                        name,
                        email,
                        username,
                        password,
                        password_confirmation
                    })
                    .then(({ data, status }) => {
                        if (status === 201) {
                            resolve(true);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });

            });
        },
        LOGOUT: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/logout", payload)
                    .then(({ data, status }) => {
                        if (status === 200) {
                            commit('setCurrentUser', null)
                            localStorage.removeItem('token')
                            router.push('/login')
                                // resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });

            });
        },
    },

});

export default store;