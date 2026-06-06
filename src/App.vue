<script setup>
import Footer from './components/Footer.vue';
import Game from './components/Game.vue'
</script>

<template>
	<Game />

	<Footer />
</template>

<style lang="scss">
/* Setup */
* {
	font-family: 'Segoe UI', sans-serif;
	box-sizing: border-box;
	transition: 0.06s;

	position: relative;
}
html, body {
	width: 100%;
	height: 100%;
	margin: 0;

	display: flex;
	align-items: center;
}
#app {
	width: 100%;
	height: 75%;
	margin: 0;

	justify-content: center;
	align-items: safe center;
}

/* Text */
body { font-size: 1.5em; }
p { margin-block: 0; }

/* Divs */
div:not(.noflex) { display: flex; }
</style>