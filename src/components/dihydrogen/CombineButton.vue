<script setup lang="ts">
import { MoveRightIcon, SmartphoneChargingIcon } from '@lucide/vue';
import { useHydrogen } from '../../composables/gamestate/useHydrogen';
import { useEnergy } from '../../composables/gamestate/useEnergy';
import { computed } from 'vue';

const hydrogen = useHydrogen();
const energy = useEnergy();

function combine() {
	hydrogen.take(2);
	energy.take(1);

	hydrogen.dihydrogen.value++;
}

const canAfford = computed(() => hydrogen.amount.value >= 2 && energy.amount.value >= 1);
</script>

<template>
	<button :disabled="!canAfford" @click="combine">
		<p>Combine</p>
		<p class="small reaction">
			<span>2 H + 1 <SmartphoneChargingIcon /></span>
			<MoveRightIcon />
			<span>1 H₂</span>
		</p>
	</button>
</template>

<style lang="scss" scoped>
button {
	width: 200px;
	height: 125px;
	font-size: 1.25em;
}
</style>