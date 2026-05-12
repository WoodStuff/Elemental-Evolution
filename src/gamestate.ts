import { computed, reactive } from "vue";
import { random } from "./utils";

export const hydrogen = reactive({
	// Main
	amount: 0,
	
	// Gathering
	baseGather: 3,
	minGather: computed(() => Math.round(hydrogen.baseGather * 0.75)),
	maxGather: computed(() => Math.round(hydrogen.baseGather * 1.25)),
	getGatherAmount: () => random(hydrogen.minGather, hydrogen.maxGather),
});