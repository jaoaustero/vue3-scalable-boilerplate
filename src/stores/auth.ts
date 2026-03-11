import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
	const user = ref<{ email: string } | null>(null);

	const isAuthenticated = computed(() => !!user.value);

	function login(email: string) {
		user.value = { email };
	}

	function logout() {
		user.value = null;
	}

	return { user, isAuthenticated, login, logout };
});
