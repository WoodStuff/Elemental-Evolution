import { ref } from "vue";

// Main
const energy = ref(0);

// Actions
function gain(n: number) {
	energy.value += n;
	roundEnergy();
}

// Helpers
function roundEnergy() {
	energy.value = Math.round(energy.value * 100) / 100;
}

export function useEnergy() {
	return {
		energy,

		gain,
	}
}