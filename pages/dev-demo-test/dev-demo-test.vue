<template>
	<view>
		<van-dropdown-menu active-color="#ffc300">
			<van-dropdown-item :value="categoryDefault" :options="categoryOption" />
			<van-dropdown-item :value="sortDefault" :options="sortOption" />
		</van-dropdown-menu>
	</view>
</template>

<script>
var util = require("../utils/formatTime.js");

export default {
	data() {
		return {
			currentTime: '',
			categoryOption: [
				{
					icon: "/static/category-nav/all.svg",
					text: "全部商品",
					value: 0,
				},
				{
					icon: "/static/category-nav/books.svg",
					text: "书籍材料",
					value: 1,
				},
				{
					icon: "/static/category-nav/iphone.svg",
					text: "电子产品",
					value: 2,
				},
				{
					icon: "/static/category-nav/fitness.svg",
					text: "健身器材",
					value: 3,
				},
				{
					icon: "/static/category-nav/clothes.svg",
					text: "服装服饰",
					value: 4,
				},
				{
					icon: "/static/category-nav/brush.svg",
					text: "美妆日化",
					value: 5,
				},
				{
					icon: "/static/category-nav/other.svg",
					text: "其他宝贝",
					value: 6,
				},
			],
			sortOption: [
				{ text: "默认排序", value: "a" },
				{ text: "最新", value: "b" },
				{ text: "价格由高到低", value: "c" },
				{ text: "价格由低到高", value: "d" },
			],
			categoryDefault: 0,
			sortDefault: "a",
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
