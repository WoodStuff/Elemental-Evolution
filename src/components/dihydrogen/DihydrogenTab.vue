<script setup lang="ts">
import { useHydrogen } from '../../composables/useHydrogen.ts';
import CombineButton from './CombineButton.vue';

const { dihydrogen } = useHydrogen();
</script>

<template>
	<div class="dihydrogen">
		<p class="big">You have {{ dihydrogen }} H<sub>2</sub></p>
		<CombineButton />

		<div class="upgrades"></div>
	</div>
</template>

<style lang="scss" scoped>
.dihydrogen {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
}
</style>