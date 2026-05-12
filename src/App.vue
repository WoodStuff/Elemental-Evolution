<script setup>
import Footer from './components/Footer.vue';
import Game from './components/Game.vue'
</script>

<template>
	<Game></Game>

	<Footer></Footer>
</template>

<style lang="scss">
/* Setup */
* {
	font-family: 'Segoe UI', sans-serif;
	box-sizing: border-box;
}
html, body, #app {
	width: 100%;
	height: 100%;
	margin: 0;
}
#app {
	display: flex;
	justify-content: center;
	align-items: center;
}

/* Text */
body { font-size: 1.5em; }
p { margin-block: 0; }
</style>