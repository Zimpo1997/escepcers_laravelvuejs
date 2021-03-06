/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

import router from './router/router';
import store from './store/index';
// import './plugins/vuetify.js';
import swal from 'sweetalert'


import '@mdi/font/css/materialdesignicons.css';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
    icon: {
        iconfont: 'mdi'
    }
}

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('my-app', require('./App.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    store,
    router,
    vuetify: new Vuetify(opts),
    created() {
        if (this.$route.meta.requiresAuth) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.getters.token}`
            axios.defaults.headers.post['Content-Type'] =
                'application/x-www-form-urlencoded'
            this.$store.dispatch('getCurrentUser').then((res) => {
                this.$store.dispatch('autoSignIn', res)
            })
        }
    },
});