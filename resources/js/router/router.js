import Vue from 'vue'
import VueRouter from 'vue-router'
import financeRoutes from './../modules/finance/router/index';
import nutritionRoutes from './../modules/nutrition/router/index';


import IndexMain from './../components/views/main/IndexMain.vue'
import Login from './../components/views/auth/Login.vue'
import Register from './../components/views/auth/Register.vue'
import Dashboard from './../components/views/main/Dashboard.vue'

Vue.use(VueRouter)

const baseRoutes = [{
        path: '/',
        name: "Main",
        component: IndexMain, // สร้างหน้าหลัก
        meta: { requiresAuth: true },
        redirect: { name: 'Dashboard' },
        children: [{
            path: '/dashboard',
            name: "Dashboard",
            meta: { requiresAuth: true },
            components: {
                default: IndexMain,
                MainView: Dashboard,
            }
        }]
    },
    {
        path: '/login',
        name: "Login",
        meta: { guest: true },
        component: Login
    },
    {
        path: '/register',
        name: "Register",
        meta: { guest: true },
        component: Register
    }
]

const routes = baseRoutes.concat(financeRoutes, nutritionRoutes);

const router = new VueRouter({
    mode: "history",
    routes
})

function isLoggedIn() {
    return localStorage.getItem("token");
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLoggedIn()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (isLoggedIn()) {
            next({
                path: '/dashboard',
                query: { redirect: to.fullPath },
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;