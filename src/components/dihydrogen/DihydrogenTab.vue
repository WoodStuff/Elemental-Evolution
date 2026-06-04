<script setup lang="ts">
import { useHydrogen } from '../../composables/useHydrogen.ts';
import { Upgrade } from '../../composables/useUpgrade.ts';
import UpgradeButton from '../hydrogen/UpgradeButton.vue';
import CombineButton from './CombineButton.vue';

const { dihydrogen, upAttractor } = useHydrogen();

const upgrades: Upgrade[] = [upAttractor];
</script>

<template>
	<div class="dihydrogen">
		<p class="big">You have {{ dihydrogen }} H<sub>2</sub></p>
		<CombineButton />

		<div class="upgrades">
			<UpgradeButton v-for="up in upgrades" :type="up" currency="H₂" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.dihydrogen {
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