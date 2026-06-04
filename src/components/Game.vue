<script setup lang="ts">
import { useHydrogen } from '../composables/gamestate/useHydrogen.ts';
import EnergyTab from '../components/energy/EnergyTab.vue';
import HydrogenTab from './hydrogen/HydrogenTab.vue';
import DihydrogenTab from './dihydrogen/DihydrogenTab.vue';
import { useEnergy } from '../composables/gamestate/useEnergy.ts';

const { total: totalHydrogen } = useHydrogen();
const { highest: highestEnergy } = useEnergy();
</script>

<template>
	<div id="game">
		<div class="row">
			<HydrogenTab />

			<EnergyTab v-if="totalHydrogen >= 1500" />
		</div>

		<DihydrogenTab v-if="highestEnergy >= 0.5" />
	</div>
</template>

<style lang="scss" scoped>
#game {
	display: flex;
	flex-direction: column;
	gap: 32px;

	.row {
		display: flex;
		gap: 100px;
	}
}
</style>