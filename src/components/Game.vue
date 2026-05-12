<script setup lang="ts">
import { ref } from 'vue';

const hydrogen = ref<number>(0);

function gather(): void {
	hydrogen.value++;
}
</script>

<template>
	<div class="element-tab">
		<p class="big">You have {{ hydrogen }} hydrogen</p>
		<button class="xwide tall big" @click="gather">Gather</button>
	</div>
</template>

<style lang="scss" scoped>
.element-tab {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
}
</style>