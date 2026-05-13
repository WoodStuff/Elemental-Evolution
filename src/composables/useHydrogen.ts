import { computed, ref } from "vue";
import { random } from "../utils";
import { useUpgrade } from "./useUpgrade";

// Main
const amount = ref(0);
const highest = ref(0);

// Gathering
const baseGather = computed(() => {
	const eff: number = upEfficiency.amount.value;
	return (3 + eff) * Math.pow(1.04, eff);
});
const minGather = computed(() => Math.round(baseGather.value * 0.75));
const maxGather = computed(() => Math.round(baseGather.value * 1.25));
const getGatherAmount = () => random(minGather.value, maxGather.value);
const gatherCooldown = computed(() => 200 * (Math.pow(0.8, upCooldown.amount.value)));

// Upgrades
const upEfficiency = useUpgrade("Efficiency", amount, n => Math.round(Math.pow(1.25, n) * 10));
const upCooldown = useUpgrade("Cooldown", amount, n => Math.round(Math.pow(1.5, n) * 40));

// Actions
function gain(n: number) {
	amount.value += n;
	if (amount.value > highest.value) highest.value = amount.value;
}

export function useHydrogen() {
	return {
		amount,
		highest,

		baseGather,
		minGather,
		maxGather,
		getGatherAmount,
		gatherCooldown,

		upEfficiency,
		upCooldown,

		gain,
	}
}