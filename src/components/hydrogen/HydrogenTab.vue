<script setup lang="ts">
import { computed } from 'vue';
import { useHydrogen } from '../../composables/gamestate/useHydrogen.ts';
import { Upgrade } from '../../composables/useUpgrade';
import GatherButton from './GatherButton.vue';
import UpgradeButton from './UpgradeButton.vue';

const { amount, highest, upEfficiency, upCooldown } = useHydrogen();

const upgrades: Upgrade[] = [upEfficiency, upCooldown];
const filteredUpgrades = computed(() => upgrades.filter(up => {
	if (up === upEfficiency) return highest.value >= 10;
	if (up === upCooldown) return highest.value >= 50;
}));
</script>

<template>
	<div class="element-tab">	
		<p class="big">You have {{ amount }} hydrogen</p>
		<GatherButton />

		<div class="upgrades" v-if="filteredUpgrades.length > 0">
			<UpgradeButton v-for="up in filteredUpgrades" :upgrade="up" currency="H" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.element-tab {
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