import { computed, ref } from "vue";
import { hydrogen } from "../gamestate";

export function useUpgrade(name: string, costFormula: (n: number) => number) {
	const amount = ref(0);
	const cost = computed(() => costFormula(amount.value));

	const canAfford = () => hydrogen.amount.value >= cost.value;

	function buy() {
		if (!canAfford) return;

		hydrogen.amount.value -= cost.value;
		amount.value++;
	}

	return {
		amount,
		cost,
		name,

		buy,
		canAfford,
	}
}

export type Upgrade = ReturnType<typeof useUpgrade>