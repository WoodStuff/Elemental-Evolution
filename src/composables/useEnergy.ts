import { ref } from "vue";
import { round } from "../utils";

// Main
const energy = ref(0);
const highest = ref(0);

// Actions
function gain(n: number) {
	energy.value += n;
	if (energy.value > highest.value) highest.value = energy.value;

	roundEnergy();
}
function take(n: number) {
	energy.value -= n;

	roundEnergy();
}

// Helpers
function roundEnergy() {
	energy.value = round(energy.value, 2);
}

if (0) {
	energy.value = 5;
	highest.value = 5;
}

export function useEnergy() {
	return {
		energy,
		highest,

		gain,
		take,
	}
}