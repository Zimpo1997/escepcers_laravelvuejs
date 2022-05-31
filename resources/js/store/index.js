import Vue from 'vue';
import Vuex from 'vuex';

import finance from './../modules/finance/store/index';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        finance,
    },
    state: {
        token: localStorage.getItem("token"),
        currentUser: {
            name: 'das'
        },
        notification: {
            display: false,
            text: "Notification placeholder text",
            alertClass: "success"
        }
    },
    mutations: {
        // เปลี่ยนค่าตัวแปรในส่วนของ state
        setToken(state, token) {
            state.token = token;
        },
        setCurrentUser(state, currentUser) {
            state.currentUser = currentUser;
        },
        SET_NOTIFICATION: (state, { display, text, alertClass }) => {
            state.notification.display = display;
            state.notification.text = text;
            state.notification.class = alertClass;
        }
    },
    getters: {
        // ดึงค่าตัวแปรในส่วนของ state
        token: state => state.token,
        currentUser: state => state.currentUser,
        NOTIFICATION: state => {
            return state.notification;
        }
    },
    actions: {
        // สร้างฟังก์ชันสำหรับการเรียกใช้งานฟังก์ชันของอื่นๆ
        LOGIN: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/login", payload)
                    .then(({ data, status }) => {
                        if (status === 200) {
                            resolve(data);
                        }
                        localStorage.setItem("token", response.data);

                        // this.$refs.loginForm.reset();
                        // this.$router.push("/dashboard");
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
        }
    },

});

export default store;