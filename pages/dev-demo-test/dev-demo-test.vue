<template>
	<view>
		<!-- <van-dropdown-menu active-color="#ffc300">
			<van-dropdown-item :value="categoryDefault" :options="categoryOption" />
			<van-dropdown-item :value="sortDefault" :options="sortOption" />
		</van-dropdown-menu> -->

		<w-swiper-out :swiperOutBtns="btns1" @delete="delete1" @added="added" buttonWidth="50">
			<view class="example-content" style="">
				Example Content
			</view>
		</w-swiper-out>
	</view>
</template>

<script>
var util = require("../utils/formatTime.js");
import { WSwiperOut } from "../../wxcomponents/wuss-weapp/w-swiper-out/index";

export default {
	components: {
		WSwiperOut
	},
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
			btns1: [
				{
					text: '成交',
					color: '#ffffff',
					background: '#28a745',
					disabled: false,
					size: '14px',
					type: 'added',
				},
				{
					text: '删除',
					color: '#ffffff',
					background: '#e42112',
					disabled: false,
					size: '14px',
					type: 'delete',
				},
			],
		}
	},
	methods: {
		delete1(e) {
			wx.showModal({
				title: '提示',
				content: 'delete',
				showCancel: false,
			});
		},
		added() {
			wx.showModal({
				title: '提示',
				content: 'added',
				showCancel: false,
			});
		},
		handleBtnClick(e) {
			const { onPress } = e.detail;
			onPress.call(this);
		},
	},
	mounted() {
		let currentTime = new Date();
		this.currentTime = currentTime;
		console.log(util.formatTime(currentTime));
	}
}
</script>

<style lang="scss" scoped>
.example-content {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
</style>
