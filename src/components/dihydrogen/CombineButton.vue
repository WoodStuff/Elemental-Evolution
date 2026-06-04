<script setup lang="ts">
import { MoveRightIcon, SmartphoneChargingIcon } from '@lucide/vue';
import { useHydrogen } from '../../composables/useHydrogen';
import { useEnergy } from '../../composables/useEnergy';

const hydrogen = useHydrogen();
const energy = useEnergy();

function combine() {
	hydrogen.take(2);
	energy.take(1);

	hydrogen.dihydrogen.value++;
}
</script>

<template>
	<button @click="combine">
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