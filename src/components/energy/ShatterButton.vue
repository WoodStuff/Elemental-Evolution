<script setup lang="ts">
import { MoveRightIcon, SmartphoneChargingIcon } from '@lucide/vue';
import { useEnergy } from '../../composables/useEnergy';
import { useHydrogen } from '../../composables/useHydrogen';
import { computed, ref } from 'vue';
import AmountButtons from '../AmountButtons.vue';

const energy = useEnergy();
const hydrogen = useHydrogen();

const conversionRate = 0.01;

let shatterPercent = ref(0);
const shatterAmount = computed(() => {
	if (shatterPercent.value === 0) return 1;

	return Math.round(hydrogen.amount.value * shatterPercent.value);
});
const energyToGain = computed(() => conversionRate * shatterAmount.value);

function shatter() {
	hydrogen.gain(-shatterAmount.value);
	energy.gain(energyToGain.value);
}

const canAfford = () => hydrogen.amount.value > 0;
</script>

<template>
	<div class="shatter-container">
		<button class="shatter-button" :disabled="!canAfford()" @click="shatter">
			<p>Shatter</p>
			<p class="small reaction">
				<span>{{ shatterAmount }} H</span>
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