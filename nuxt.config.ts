// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    srcDir: 'src/',
    ssr: false,
    modules: ["@nuxtjs/tailwindcss", '@vueuse/nuxt', 'nuxt-icon'],
	css: ['~/assets/css/tailwind.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
})
