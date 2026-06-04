import { ref } from "vue";
import { round } from "../utils";

// Main
const amount = ref(0);
const highest = ref(0);

// Actions
function gain(n: number) {
	amount.value += n;
	if (amount.value > highest.value) highest.value = amount.value;

	roundEnergy();
}
function take(n: number) {
	amount.value -= n;

	roundEnergy();
}

// Helpers
function roundEnergy() {
	amount.value = round(amount.value, 2);
}

if (0) {
	amount.value = 5;
	highest.value = 5;
}

export function useEnergy() {
	return {
		amount,
		highest,

		gain,
		take,
	}
}