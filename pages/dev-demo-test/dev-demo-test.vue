<template>
	<view>
		{{ currentTime }}
	</view>
</template>

<script>
var util = require("../utils/formatTime.js");

export default {
	data() {
		return {
			currentTime: ''
		}
	},
	methods: {

	},
	mounted() {
		let currentTime = new Date();
		this.currentTime = currentTime;
		console.log(util.formatTime(currentTime));
	}
}
</script>

<style>
</style>
