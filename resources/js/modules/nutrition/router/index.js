import Nutrition from '../views/Nutrition.vue';
import Dashboard from './../views/Dashboard.vue';
import Listopd from './../views/Listopd.vue';

export default [{
    path: '/nutrition',
    name: 'nutrition',
    component: Nutrition,
    title: 'nutrition',
    icon: 'fa-users',
    meta: { requiresAuth: true },
    redirect: { name: 'nutrition-dashboard' },
    children: [{
        path: 'dashboard',
        name: 'nutrition-dashboard',
        meta: { requiresAuth: true },
        components: {
            default: Nutrition,
            MainView: Dashboard,
        }
    }, {
        path: 'listopd',
        name: 'nutrition-listopd',
        meta: { requiresAuth: true },
        components: {
            default: Nutrition,
            MainView: Listopd,
        }
    }, ],
}];