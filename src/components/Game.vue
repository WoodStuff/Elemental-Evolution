<script setup lang="ts">
import { hydrogen } from '../gamestate';
	
function gather(): void {
	hydrogen.amount += hydrogen.getGatherAmount();
}
</script>

<template>
	<div class="element-tab">
		<p class="big">You have {{ hydrogen.amount }} hydrogen</p>
		<button class="xwide tall big" @click="gather">
			Gather
			<p class="small">({{ hydrogen.minGather }}–{{ hydrogen.maxGather }})</p>
		</button>
	</div>
</template>

<style lang="scss" scoped>
div.element-tab {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
}
</style>