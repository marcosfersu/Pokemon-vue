<template>
	<div class="shiny-btn">
		<p class="nomal-text">normal</p>
		<div>
			<input type="checkbox" id="switch" v-model="check" /><label for="switch"
				>Toggle</label
			>
		</div>
		<p>shiny</p>
	</div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";
const props = defineProps({
	swicthShiny: { type: [Array, Boolean] },
	value: { type: [Boolean, Object] },
	label: { type: String },
});
const emit = defineEmits(["swicthShiny"]);
const check = computed({
	get() {
		return props.swicthShiny;
	},
	set(value) {
		emit("swicthShiny", value);
	},
});
</script>

<style lang="scss">
.shiny-btn {
	display: flex;
	gap: 1em;
	justify-content: center;
	align-items: center;

	.nomal-text {
		@media screen and (max-width: 550px) {
			display: none;
		}
	}
}
input[type="checkbox"] {
	height: 0;
	width: 0;
	visibility: hidden;
	position: absolute;
}

label {
	cursor: pointer;
	text-indent: -9999px;
	width: 100px;
	height: 50px;
	background: #d2d2d2;
	display: block;
	border-radius: 100px;
	position: relative;

	@media screen and (max-height: 950px) and (max-width: 1300px) {
		width: 70px;
		height: 40px;
	}

	@media screen and (max-height: 750px) {
		width: 70px;
		height: 40px;
	}

	@media screen and (max-width: 550px) {
		width: 70px;
		height: 40px;
	}
}

label:after {
	content: "";
	position: absolute;
	top: 5px;
	left: 5px;
	width: 40px;
	height: 40px;
	background: #fff;
	border-radius: 90px;
	transition: 0.3s;

	@media screen and (max-height: 750px) {
		width: 30px;
		height: 30px;
	}

	@media screen and (max-height: 950px) and (max-width: 1300px) {
		width: 30px;
		height: 30px;
	}

	@media screen and (max-width: 550px) {
		width: 30px;
		height: 30px;
	}
}

input:checked + label {
	background: #3494e6; /* fallback for old browsers */
	background: -webkit-linear-gradient(
		to right,
		#eea7ca,
		#77b5ec
	); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(
		to right,
		#eea7ca,
		#77b5ec
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

input:checked + label:after {
	left: calc(100% - 5px);
	transform: translateX(-100%);
}

label:active:after {
	width: 50px;
}
</style>
