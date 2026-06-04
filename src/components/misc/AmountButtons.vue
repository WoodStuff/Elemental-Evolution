<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
	change: [number]
}>()

const amounts = [
	{ name: "1",    percent: 0   },
	{ name: "50%",  percent: 0.5 },
	{ name: "100%", percent: 1   },
];
let selected = ref(0);

function select(id: number) {
	selected.value = id;
	emit('change', amounts[id].percent)
}
</script>

<template>
	<div class="amount-buttons">
		<button
			:disabled="selected == i"
			v-for="(btn, i) in amounts"
			@click="select(i)"
		>
			{{ btn.name }}
		</button>
	</div>
</template>

<style lang="scss">
.amount-buttons {
	display: flex;

	& > button {
		border-radius: 0;
		border-width: 0 1px 2px 1px;
		flex: 1;

		font-size: 0.75em;

		&:first-child {
			border-left-width: 2px;
			border-bottom-left-radius: 4px;
		}
		&:last-child {
			border-right-width: 2px;
			border-bottom-right-radius: 4px;
		}
	}
}
</style>