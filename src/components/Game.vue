<script setup lang="ts">
import { computed } from 'vue';
import { useHydrogen } from '../composables/useHydrogen';
import { Upgrade } from '../composables/useUpgrade';
import EnergyTab from '../components/energy/EnergyTab.vue';
import GatherButton from '../components/GatherButton.vue';
import UpgradeButton from '../components/UpgradeButton.vue';

const { amount, highest, upEfficiency, upCooldown } = useHydrogen();

const upgrades: Upgrade[] = [upEfficiency, upCooldown];
const filteredUpgrades = computed(() => upgrades.filter(up => {
	if (up === upEfficiency) return highest.value >= 10;
	if (up === upCooldown) return highest.value >= 50;
}));
</script>

<template>
	<div id="game">
		<div class="element-tab">	
			<p class="big">You have {{ amount }} hydrogen</p>
			<GatherButton />

			<div class="upgrades" v-if="filteredUpgrades.length > 0">
				<UpgradeButton v-for="up in filteredUpgrades" :type="up" />
			</div>
		</div>

		<EnergyTab />
	</div>
</template>

<style lang="scss" scoped>
#game {
	display: flex;
	gap: 100px;

	& > .element-tab {
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
}
</style>