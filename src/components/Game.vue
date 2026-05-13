<script setup lang="ts">
import GatherButton from './GatherButton.vue';
import UpgradeButton from './UpgradeButton.vue';
import { useHydrogen } from '../composables/useHydrogen';

const { amount, highest, upEfficiency, upCooldown } = useHydrogen();
</script>

<template>
	<div class="element-tab">
		<p class="big">You have {{ amount }} hydrogen</p>
		<GatherButton />

		<br v-if="highest >= 10">

		<div class="upgrades" v-if="highest >= 10">
			<UpgradeButton :type="upEfficiency" />
			<UpgradeButton :type="upCooldown" v-if="highest >= 40" />
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