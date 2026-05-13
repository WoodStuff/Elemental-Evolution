<script setup lang="ts">
import { hydrogen } from '../gamestate';
import GatherButton from './GatherButton.vue';
import UpgradeButton from './UpgradeButton.vue';
</script>

<template>
	<div class="element-tab">
		<p class="big">You have {{ hydrogen.amount }} hydrogen</p>
		<GatherButton />

		<br v-if="hydrogen.highest.value >= 10">

		<div class="upgrades" v-if="hydrogen.highest.value >= 10">
			<UpgradeButton :type="hydrogen.upEfficiency" />
			<UpgradeButton :type="hydrogen.upCooldown" v-if="hydrogen.highest.value >= 40" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
div.element-tab {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;

	& > div.upgrades {
		display: flex;
		gap: 8px;
	}
}
</style>