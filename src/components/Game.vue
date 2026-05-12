<script setup lang="ts">
import { hydrogen } from '../gamestate';
import GatherButton from './GatherButton.vue';
</script>

<template>
	<div class="element-tab">
		<p class="big">You have {{ hydrogen.amount }} hydrogen</p>
		<GatherButton></GatherButton>
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