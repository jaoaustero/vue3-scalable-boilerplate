import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import { baseConfig } from './vite.config.base';

export default defineConfig({
	...baseConfig,
	plugins: [...baseConfig.plugins, vueDevTools()],
});