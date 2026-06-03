import { ref } from "vue";
import { round } from "../utils";

// Main
const energy = ref(0);

// Actions
function gain(n: number) {
	energy.value += n;
	roundEnergy();
}

// Helpers
function roundEnergy() {
	energy.value = round(energy.value, 2);
}

export function useEnergy() {
	return {
		energy,

		gain,
	}
}