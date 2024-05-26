import { createRouter, createWebHashHistory } from 'vue-router'

import HomeCalc from '../views/HomeCalcView.vue'
import RegisterView from '../views/RegisterView.vue'
import loginView from '../views/loginView.vue'
import showProfile from '../views/ShowProfileView.vue'
import startCalc from '../views/StartCalc.vue'
import ShowCalculations from '../views/ShowCalculationsView.vue'
import recoveryPass from '../views/RecoveryPassView.vue'

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

 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router