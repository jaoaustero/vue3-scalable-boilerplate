<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import IButton from '@/components/button/IButton.vue';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
	authStore.logout();
	router.push({ name: 'landing' });
};
</script>

<template>
	<div class="i-home">
		<h1>Welcome, {{ authStore.user?.email }}</h1>
		<p>You are now logged in.</p>

		<i-button
			color="default"
			@click="handleLogout">
			Logout
		</i-button>
	</div>
</template>

<style lang="scss">
@use "./HomePage.scss" as *;
</style>
