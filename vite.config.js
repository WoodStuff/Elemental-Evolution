import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const useDevTools = false;

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), useDevTools ? vueDevTools() : undefined],
	base: '/Elemental-Evolution/',
})
