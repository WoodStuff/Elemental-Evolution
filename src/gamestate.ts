import { computed, ref, shallowReactive } from "vue";
import { random } from "./utils";
import { useUpgrade } from "./composables/useUpgrade";

export const hydrogen = shallowReactive({
	// Main
	amount: ref(0),
	total: ref(0),
	
	// Gathering
	baseGather: computed<number>(() => {
		const eff: number = hydrogen.upEfficiency.amount.value;
		return (3 + eff) * Math.pow(1.04, eff);
	}),
	minGather: computed<number>(() => Math.round(hydrogen.baseGather.value * 0.75)),
	maxGather: computed<number>(() => Math.round(hydrogen.baseGather.value * 1.25)),
	getGatherAmount: () => random(hydrogen.minGather.value, hydrogen.maxGather.value),

	// Upgrades
	upEfficiency: useUpgrade("Efficiency", n => Math.round(Math.pow(1.25, n) * 10)),

	// Actions
	gain(amount: number) {
		hydrogen.amount.value += amount;
		if (amount > 0) hydrogen.total.value += amount;
	}
});