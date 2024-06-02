import { createRouter, createWebHashHistory } from 'vue-router'

import HomeCalc from '../views/HomeCalcView.vue'
import RegisterView from '../views/RegisterView.vue'
import loginView from '../views/loginView.vue'
import showProfile from '../views/ShowProfileView.vue'
import startCalc from '../views/StartCalc.vue'
import ShowCalculations from '../views/ShowCalculationsView.vue'
import recoveryPass from '../views/RecoveryPassView.vue'
import Products from '../views/productsView.vue'
import AddProduct from '@/views/AddProductView.vue'
import Contact from '../views/contactView.vue'
import ShowUsers from '../views/ShowUsersView.vue'
import Statistics from '../views/StatisticsView.vue'


const routes = [

  {
    path: '/',
    name: 'HomeCalc',
    component: HomeCalc
  },

  {
    path: '/Register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: loginView
  },
  {
    path: '/showProfile',
    name: 'showProfile',
    component: showProfile
  },

  {
    path: '/recoveryPass',
    name: 'recoveryPass',
    component: recoveryPass
  },

{
    path: '/startCalc',
    name: 'startCalc',
    component: startCalc,
},
{
    path: '/ShowCalculations',
    name: 'ShowCalculations',
    component: ShowCalculations,
},
{
    path: '/Products',
    name: 'Products',
    component: Products,
},

{
    path: '/AddProduct',
    name: 'AddProduct',
    component: AddProduct,
},
{
    path: '/Contact',
    name: 'Contact',
    component: Contact,
},
{
    path: '/ShowUsers',
    name: 'ShowUsers',
    component: ShowUsers,
},
{
    path: '/statistics',
    name: 'statistics',
    component: Statistics,
}


 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router