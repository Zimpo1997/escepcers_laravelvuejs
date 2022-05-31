import Finance from '../views/Finance.vue';
import Welcome from './../views/Welcome.vue';
import Details from './../views/Details.vue';
import Create from './../views/Create.vue';
import Edit from './../views/Edit.vue';
import CreateWaybill from './../views/Create-Waybill.vue';

// Reports
import reportInhalfs from './../views/reports/revenue/inhalf.vue';
import reportDays from './../views/reports/revenue/day.vue';
import reportMonths from './../views/reports/revenue/month.vue';
import reportQuarter from './../views/reports/revenue/quarter.vue';
import reportYear from './../views/reports/revenue/year.vue';

export default [{
    path: '/finance',
    name: 'finance',
    component: Finance,
    title: 'finance',
    icon: 'fa-users',
    meta: { requiresAuth: true },
    redirect: { name: 'finance-dashboard' },
    children: [{
            path: 'dashboard',
            name: 'finance-dashboard',
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
            name: 'finance-edit',
            meta: { requiresAuth: true },
            components: {
                default: Finance,
                MainView: Edit,
            }
        },
        {
            path: 'waybill',
            name: 'finance-waybill',
            meta: { requiresAuth: true },
            components: {
                default: Finance,
                MainView: CreateWaybill,
            }
        },
        {
            path: 'report/inhalf',
            name: 'finance-report-inhalf',
            meta: { requiresAuth: true },
            components: {
                default: Finance,
                MainView: reportInhalfs,
            }
        },
        {
            path: 'report/day',
            name: 'finance-report-day',
            meta: { requiresAuth: true },
            components: {
                default: Finance,
                MainView: reportDays,
            }
        },
        {
            path: 'report/month',
            name: 'finance-report-month',
            meta: { requiresAuth: true },
            components: {
                default: Finance,
                MainView: reportMonths,
            }
        },
        {
            path: 'report/quarter',
            name: 'finance-report-quarter',
            meta: { requiresAuth: true },
            components: {
                default: Finance,
                MainView: reportQuarter,
            }
        },
        {
            path: 'report/year',
            name: 'finance-report-year',
            meta: { requiresAuth: true },
            components: {
                default: Finance,
                MainView: reportYear,
            }
        },
    ],
}];