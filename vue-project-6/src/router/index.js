// Використайте store для отримання данних про користувача у файлах Roter, 
//наприклад для переадресаціі неавторизованних користувачів

import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth) {
    if (userStore.user) {
      next();
    } else {
      await userStore.fetchUserData();
      if (userStore.user) {
        next();
      } else {
        next('/login');
      }
    }
  } else {
    next();
  }
});

export default router;
