<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import ICard from '@/components/card/ICard.vue';
import IInput from '@/components/input/IInput.vue';
import IButton from '@/components/button/IButton.vue';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleLogin = () => {
	if (!email.value || !password.value) {
		return;
	}

	authStore.login(email.value);
	router.push({ name: 'home' });
};
</script>

<template>
	<div class="i-landing">
		<i-card class="i-landing-card">
			<h2 class="i-landing-title">Sign In</h2>
			<p class="i-landing-subtitle">Enter your credentials to continue</p>

			<form class="i-landing-form" @submit.prevent="handleLogin">
				<i-input
					v-model="email"
					label="Email"
					type="email"
					is-required />

				<i-input
					v-model="password"
					label="Password"
					type="password"
					is-required />

				<i-button
					color="primary"
					type="submit"
					class="i-landing-button">
					Login
				</i-button>
			</form>
		</i-card>
	</div>
</template>

<style lang="scss">
@use "./LandingPage.scss" as *;
</style>
