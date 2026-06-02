<script setup lang="ts">
import { MoveRightIcon, SmartphoneChargingIcon } from '@lucide/vue';
import { useEnergy } from '../../composables/useEnergy';
import { useHydrogen } from '../../composables/useHydrogen';
import { computed, ref } from 'vue';

const energy = useEnergy();
const hydrogen = useHydrogen();

const conversionRate = 0.01;

const amounts = [
	{ name: "1",    amount: 0 },
	{ name: "50%",  amount: 0.5 },
	{ name: "100%", amount: 1 },
];

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

		<div class="amount-buttons">
			<button v-for="btn in amounts" @click="shatterPercent = btn.amount">{{ btn.name }}</button>
		</div>
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

	& > .amount-buttons {
		display: flex;

		& > button {
			border-radius: 0;
			border-width: 0 1px 2px 1px;
			flex: 1;

			&:first-child {
				border-left-width: 2px;
				border-bottom-left-radius: 4px;
			}
			&:last-child {
				border-right-width: 2px;
				border-bottom-right-radius: 4px;
			}
		}
	}
}
</style>