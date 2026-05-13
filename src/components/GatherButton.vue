<script setup lang="ts">
import { computed } from 'vue';
import { useTimer } from '../composables/useTimer';
import { hydrogen } from '../gamestate';

const gatherTimer = useTimer(200, finishGathering);
const gatherText = computed(() => {
	if (!gatherTimer.running.value) return 'Gather';

	const t = gatherTimer.remainingMs.value;
	return `${(t / 1000).toFixed(1)}s`;
})

function startGathering(): void {
	gatherTimer.start();
}
function finishGathering(): void {
	hydrogen.gain(hydrogen.getGatherAmount());
}
</script>

<template>
	<button :disabled="gatherTimer.running.value" @click="startGathering">
		<p>{{ gatherText }}</p>
		<p class="small">({{ hydrogen.minGather }}–{{ hydrogen.maxGather }})</p>
		<div class="progress" :style="{
			width: `${gatherTimer.progress.value * 100}%`,
		}"></div>
	</button>
</template>

<style lang="scss" scoped>
button {
	width: 250px;
	height: 150px;
	font-size: 1.33em;

	& > div.progress {
		position: absolute;
		transition: 0s;
		background-color: rgba(0, 0, 0, 0.2);

		height: 100%;
		left: 0;
		top: 0;
	}
}
</style>