<template>
	<div class="title-container">
		<h1>{{ title }}</h1>
	</div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
defineProps({
	title: {
		type: String,
	},
});
</script>
<style lang="scss" scoped>
.title-container {
	text-align: center;
	padding: 3.5rem 0 4rem 0;
	font-size: 4rem;
	display: flex;
	justify-content: center;

	h1 {
		margin: 0;
		color: #ffdede;
		-webkit-text-stroke: 1px #d52323;
		background: -webkit-linear-gradient(260deg, #ffc7c7, #e66868);
		background-clip: text;
		-webkit-text-fill-color: transparent;
		position: relative;
		display: flex;

		&::after,
		&::before {
			content: "";
			display: flex;
			position: absolute;
			width: 2.5rem;
			height: 0.3rem;
			border: #d52323 solid 1px;
			background: #ffc7c7;
			top: 50%;
			border-radius: 0.5em;
		}

		&::after {
			left: 0;
			transform: translate(-5rem, -50%);
		}
		&::before {
			right: 0;
			transform: translate(5rem, -50%);
		}
	}
}
</style>
