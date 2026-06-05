<script setup lang="ts">
import { MoveRightIcon, SmartphoneChargingIcon } from '@lucide/vue';
import { useEnergy } from '../../composables/gamestate/useEnergy';
import { useHydrogen } from '../../composables/gamestate/useHydrogen.ts';
import { computed, ref } from 'vue';
import AmountButtons from '../misc/AmountButtons.vue';
import { round } from '../../utils.ts';

const energy = useEnergy();
const hydrogen = useHydrogen();

const conversionRate = 0.01;

let shatterPercent = ref(0);

const hydrogenToShatter = computed(() => {
	if (shatterPercent.value === 0) return 1;

	return round(hydrogen.amount.value * shatterPercent.value);
});
const energyToGain = computed(() => round(conversionRate * hydrogenToShatter.value, 2));

function shatter() {
	energy.gain(energyToGain.value);
	hydrogen.take(hydrogenToShatter.value);
}

const canAfford = computed(() => hydrogen.amount.value > 0);
</script>

<template>
	<div class="shatter-container noflex">
		<button class="shatter-button" :disabled="!canAfford" @click="shatter">
			<p>Shatter</p>
			<p class="small reaction">
				<span>{{ hydrogenToShatter }} H</span>
				<MoveRightIcon />
				<span>{{ energyToGain }} <SmartphoneChargingIcon /></span>
			</p>
		</button>
		
		<AmountButtons @change="p => shatterPercent = p" />
	</div>
</template>

<style lang="scss" scoped>
.shatter-container {
	& > .shatter-button {
		width: 200px;
		height: 125px;
		font-size: 1.25em;
		border-radius: 4px 4px 0 0;
	}
}
</style>