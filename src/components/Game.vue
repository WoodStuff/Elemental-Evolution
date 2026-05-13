<script setup lang="ts">
import GatherButton from './GatherButton.vue';
import UpgradeButton from './UpgradeButton.vue';
import { useHydrogen } from '../composables/useHydrogen';
import { computed } from 'vue';
import { Upgrade } from '../composables/useUpgrade';

const { amount, highest, upEfficiency, upCooldown } = useHydrogen();

const upgrades: Upgrade[] = [upEfficiency, upCooldown];
const filteredUpgrades = computed(() => upgrades.filter(up => {
	if (up === upEfficiency) return highest.value >= 10;
	if (up === upCooldown) return highest.value >= 40;
}));
</script>

<template>
	<div class="element-tab">
		<p class="big">You have {{ amount }} hydrogen</p>
		<GatherButton />

		<div class="upgrades">
			<UpgradeButton v-for="up in filteredUpgrades" :type="up" />
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

		margin-top: 16px;
	}
}
</style>