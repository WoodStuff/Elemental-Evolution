<script setup lang="ts">
import { useHydrogen } from '../composables/useHydrogen';
import EnergyTab from './energy/EnergyTab.vue';
import HydrogenTab from './HydrogenTab.vue';

const { total } = useHydrogen();
</script>

<template>
	<div id="game">
		<HydrogenTab />

		<EnergyTab v-if="total > 1500" />
	</div>
</template>

<style lang="scss" scoped>
#game {
	display: flex;
	gap: 100px;
}
</style>