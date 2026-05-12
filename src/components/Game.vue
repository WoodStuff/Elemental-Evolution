<script setup lang="ts">
import { ref } from 'vue';

const hydrogen = ref<number>(0);

console.log(hydrogen.value);

function gather(): void {
	hydrogen.value++;
}
</script>

<template>
	<p>You have {{ hydrogen }} hydrogen</p>
	<button @click="gather">Gather</button>
</template>