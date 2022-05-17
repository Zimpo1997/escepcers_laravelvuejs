import Finance from '../views/Finance.vue';
import Welcome from './../views/Welcome.vue';
import Details from './../views/Details.vue';
import Create from './../views/Create.vue';
import Edit from './../views/Edit.vue';

export default [{
    path: '/finance',
    name: 'finance',
    component: Finance,
    title: 'finance',
    icon: 'fa-users',
    meta: { requiresAuth: true },
    redirect: { name: 'finance-welcome' },
    children: [{
            path: 'welcome',
            name: 'finance-welcome',
            meta: { requiresAuth: true },
            components: {
                default: Finance,
                MainView: Welcome,
            }
        },
        {
            path: 'create',
            name: 'finance-create',
            meta: { requiresAuth: true },
            components: {
                default: Finance,
                MainView: Create,
            }
        },
        {
            path: ':id',
            name: 'finance-details',
            meta: { requiresAuth: true },
            components: {
                default: Finance,
                MainView: Details,
            }
        },
        {
            path: ':id/edit',
            name: 'people-edit',
            meta: { requiresAuth: true },
            components: {
                default: Finance,
                MainView: Edit,
            }
        },
    ],
}];