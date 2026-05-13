<script setup lang="ts">
import GatherButton from './GatherButton.vue';
import UpgradeButton from './UpgradeButton.vue';
import { useHydrogen } from '../composables/useHydrogen';
import { computed } from 'vue';

const { amount, highest, upEfficiency, upCooldown } = useHydrogen();

const upgradeUnlocks = {
	efficiency: 10,
	cooldown: 40,
}
const showUpEfficiency = computed(() => highest.value >= upgradeUnlocks.efficiency);
const showUpCooldown = computed(() => highest.value >= upgradeUnlocks.cooldown);
</script>

<template>
	<div class="element-tab">
		<p class="big">You have {{ amount }} hydrogen</p>
		<GatherButton />

		<div class="upgrades" v-if="showUpEfficiency">
			<UpgradeButton :type="upEfficiency" />
			<UpgradeButton :type="upCooldown" v-if="showUpCooldown" />
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