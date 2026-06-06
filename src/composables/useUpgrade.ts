import { computed, Ref, ref } from "vue";

export function useUpgrade(
	name: string,
	description: string,
	currency: Ref<number>,
	costFormula: (n: number) => number,
) {
	const amount = ref(0);
	const cost = computed(() => costFormula(amount.value));

	const canAfford = () => currency.value >= cost.value;

	function buy() {
		if (!canAfford()) return;

		currency.value -= cost.value;
		amount.value++;
	}

	return {
		amount,
		cost,
		name,
		description,

		buy,
		canAfford,
	}
}

export type Upgrade = ReturnType<typeof useUpgrade>