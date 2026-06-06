<script setup lang="ts">

</script>

<template>
	<div class="tooltip">
		<slot></slot>
	</div>
</template>

<style lang="scss">
.tooltip {
	position: absolute;
	bottom: calc(100% + 8px);
	left: 50%;
	transform: translateX(-50%);
	z-index: 1;

	opacity: 0;
	transition: 0.5s;

	background-color: #111;
	color: #fff;	
	padding: 8px;
	border-radius: 8px;

	font-size: 16px;

	pointer-events: none;

	&::after {
		content: " ";

		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);

		border: solid 4px transparent;
		border-top-color: #111;
	}
}

*:hover > .tooltip {
	opacity: 1;
}
</style>