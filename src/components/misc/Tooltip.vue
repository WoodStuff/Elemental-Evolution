<script setup lang="ts">

</script>

<template>
	<div class="tooltip noflex">
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

	width: max-content;
	max-width: 250px;

	opacity: 0;
	transition: opacity 0.25s;

	background-color: #111;
	color: #fff;
	padding: 8px;
	border-radius: 8px;

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

	& > * { margin: 0; }

	// tooltip elements
	& > h1 { font-size: 16px; font-weight: 600; }
	& > p { font-size: 14px; }
}

*:hover > .tooltip {
	opacity: 1;
}
</style>