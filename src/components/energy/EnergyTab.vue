<script setup>
import { useEnergy } from '../../composables/useEnergy';
import ShatterButton from './ShatterButton.vue';

const { energy } = useEnergy();
</script>

<template>
	<div id="energy-tab">
		<p class="big">{{ energy }} energy</p>
		<ShatterButton />
	</div>
</template>

<style lang="scss" scoped>
#energy-tab {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
}
</style>