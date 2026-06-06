<script setup lang="ts">
import { Upgrade } from "../../composables/useUpgrade";
import Tooltip from "../misc/Tooltip.vue"

const { upgrade, currency } = defineProps<{
	upgrade: Upgrade,
	currency: string,
}>()

function buy() {
	upgrade.buy();
}
</script>

<template>
	<button :disabled="!upgrade.canAfford()" @click="buy">
		<p>{{ upgrade.name }}</p>
		<p class="small">Cost: {{ upgrade.cost }} {{ currency }}</p>

		<div class="amount">{{ upgrade.amount }}</div>

		<Tooltip>
			<h1>{{ upgrade.name }}</h1>
			<p>{{ upgrade.description }}</p>
		</Tooltip>
	</button>
</template>

<style lang="scss" scoped>
button {
	width: 150px;
	height: 100px;

	& > div.amount {
		position: absolute;
		align-items: center;
		justify-content: center;

		background-color: var(--button-bg);
		border: 2px solid var(--border);
		border-radius: 20px;

		padding: 4px;
		
		min-width: 40px;
		height: 40px;
		left: 50%;
		top: -20px;
		transform: translateX(-50%);
	}

	// raise tooltip to account for amount indicator
	& > .tooltip {
		translate: 0 -20px;
	}
}
</style>