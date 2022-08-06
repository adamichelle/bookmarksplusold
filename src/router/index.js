import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@auth0/auth0-vue'

import AboutPage from '../views/AboutPage.vue'
import HomePage from '../views/HomePage.vue'
import LandingPage from '../views/LandingPage.vue'
import store from '../store'

const extendedAuth0Guard = async (to) => {
  const response = await authGuard(to)
  store.commit('updateAuthenticationStatus', { isAuthenticated: response })
}

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    beforeEnter: extendedAuth0Guard
  }
]

export default function routerFunction({ store }) {
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
      routes,
  });
  
  router.beforeEach((to, from, next) => {
    const appName = 'BookmarksPlus';
  
    if (to.meta.title) {
      const pageTitle = to.meta.title instanceof Function ? to.meta.title(to) : to.meta.title;
      document.title = `${pageTitle} - ${appName}`;
    } else {
      document.title = appName;
    }

    store.commit('updateAuthButtonVisibility', { fullPath: to.fullPath });

    next();
  });
  
  return router;
}