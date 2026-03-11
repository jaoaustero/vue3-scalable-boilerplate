import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'landing',
			component: () => import('@/views/landing/LandingPage.vue'),
			meta: { requiresGuest: true },
		},
		{
			path: '/home',
			name: 'home',
			component: () => import('@/views/home/HomePage.vue'),
			meta: { requiresAuth: true },
		},
	],
});

router.beforeEach((to) => {
	const authStore = useAuthStore();

	if (to.meta.requiresAuth && !authStore.isAuthenticated) {
		return { name: 'landing' };
	}

	if (to.meta.requiresGuest && authStore.isAuthenticated) {
		return { name: 'home' };
	}
});

export default router;
