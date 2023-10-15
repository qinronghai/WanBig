<template>
	<view class="uni-book">
		<view v-if="!iscard" class="list-layout">
			<view class="left_scroll">
				<scroll-view scroll-y class="scroll_content">
					<view :class="'nav-item-Y ' +
						(-2 == collegeCur ? 'tab-on-Y' : '') +
						' ' +
						(-2 == allPrevIndex ? 'prev-radius-all-1' : '') +
						(0 == allPrevIndex ? 'prev-radius-all-2' : '') +
						' '
						" @tap="selectAll">
						<view class="nav-text">全部</view>
					</view>
					<view class="content">
						<view :class="'nav-item-Y ' + (item.id == prevIndex ? 'prev-radius' : '') + ' ' + (item.id == nextIndex ? 'next-radius' : '')" @tap="collegeSelectY" :data-id="item.id" v-for="(item, index) in college"
																																																																																																:key="index">
							<view :class="'nav-text ' + (index == collegeCur + 1 ? 'tab-on-Y' : '')">
								{{ item.name }}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="right_scroll">
				<scroll-view scroll-y v-if="list.length > 0" :scroll-top="localScrollTop" class="scroll_content" @scroll="onContentScroll">
					<block>
						<block v-for="(item1, index) in list" :key="index">

							<view class="list_box" @tap="detail" :data-id="item1._id">
								<view class="image-wrap">

									<image lazy-load class="list_poster" :src="item1.bookinfo.pic" mode="aspectFit">
									</image>
								</view>


								<view class="list_content">
									<view class="list_word">
										<view class="list_title text-cut">
											{{ item1.bookinfo.title }}
										</view>
										<view class="list_author text-cut">
											{{ item1.bookinfo.author }}
										</view>
										<view class="list_profession-wrap">
											<view v-if="item1.profession" class="list_profession text-cut">
												{{ item1.profession }}
											</view>
										</view>
									</view>
									<view class="list_between">
										<view class="list_price">￥{{ item1.price }}.00</view>
										<view class="list_time">{{ morejs.timelog(item1.creat) }}发布</view>
									</view>
								</view>
							</view>
						</block>
					</block>
					<block v-if="list.length > 10">
						<!-- parse <template is="loadmore" :data="nomore"/> -->
						<block name="loadmore">
							<view class="loadmore">
								<image v-if="!nomore" src="/static/images/more.gif"></image>
								<view v-if="nomore">已加载到底</view>
							</view>
						</block>
					</block>
				</scroll-view>
				<view v-if="list.length == 0" class="nocontent">
					<image lazy-load src="/static/images/blank.png"></image>
					<view class="blank_text">这里空空如也~</view>
				</view>

			</view>
		</view>

		<van-transition v-show="localScrollTop > 500" custom-class="block" duration="600">
			<view class="totop" @tap="gotop">
				<image lazy-load src="/static/images/top.png"></image>
			</view>
		</van-transition>
		<!-- 首次进入提示收藏小程序 -->
		<tips />
	</view>
</template>
<script module="morejs" lang="wxs" src="../../../common.wxs"></script>
<script>
	const app = getApp();
	const db = wx.cloud.database();
	const config = require('../../../config.js');

	const _ = db.command;
	export default {
		props: ['isTrigger'],
		watch: {
			isTrigger(newVal, oldVal) {
				if (newVal) {
					this.getList();
				}
			}
		},
		data() {
			return {
				college: JSON.parse(config.data).college,
				collegeCur: -2,
				showList: false,
				// scrollTop: 0,
				nomore: false,
				list: [],
				prevIndex: -2,

				// 上一个项的索引
				nextIndex: -1,

				// 下一个项的索引
				// 全部的索引
				allPrevIndex: -2,

				iscard: '',
				scrollLeft: '',
				page: 0,
				banner: '',

				localScrollTop:this.scrollTop


			};
		},

		mounted() {

			this.getList();
			console.log("传过来的", this.scrollTop);
		},

		onShareAppMessage() {
			return {
				title: JSON.parse(config.data).share_title,
				imageUrl: JSON.parse(config.data).share_img,
				path: '/pages/start/start'
			};
		},
		methods: {

			onContentScroll(e) {
				const contentScrollTop = e.detail.scrollTop;
				console.log("监测y",contentScrollTop)
				this.localScrollTop = contentScrollTop;
				
			},


			//跳转搜索
			search() {
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},



			//竖向学院选择
			collegeSelectY(e) {
				const currentIndex = e.currentTarget.dataset.id;
				console.log(currentIndex, '竖向滚动条');

				const prevIndex = currentIndex - 1;
				const nextIndex = currentIndex + 1;

				this.collegeCur = e.currentTarget.dataset.id;
				this.prevIndex = prevIndex;
				this.nextIndex = nextIndex;
				this.allPrevIndex = currentIndex === -1 ? -2 : 0;

				this.getList();
			},

			//选择全部
			selectAll() {

				this.collegeCur = -2;
				this.scrollLeft = -200;
				this.showList = false;
				this.nextIndex = -1;
				this.prevIndex = -2;
				this.getList();
			},

			//展示列表小面板
			showlist() {
				let that = this;
				if (that.showList) {
					that.setData({
						showList: false
					});
				} else {
					that.setData({
						showList: true
					});
				}
			},

			//获取图书列表
			async getList() {
				uni.showLoading({
					title: "数据加载中",
					mask: true
				})
				let that = this;
				if (that.collegeCur == -2) {
					var collegeid = _.neq(-2); //除-2之外所有
					console.log(collegeid, 'suoyou');
				} else {
					var collegeid = that.collegeCur + ''; //小程序搜索必须对应格式
				}

				await db.collection('publish')
					.where({
						status: 0,
						// 过期时间
						dura: _.gt(new Date().getTime()),
						collegeid: collegeid
					})
					.orderBy('creat', 'desc')
					.limit(20)
					.get({
						success: function(res) {
							uni.hideLoading();
							if (res.data.length == 0) {
								that.setData({
									nomore: true,
									list: []
								});
								return false;
							}
							if (res.data.length < 20) {
								that.setData({
									nomore: true,
									page: 0,
									list: res.data
								});
							} else {
								that.setData({
									page: 0,
									list: res.data,
									nomore: false
								});
							}
						}
					});

			},

			more() {
				let that = this;
				if (that.nomore || that.list.length < 20) {
					return false;
				}
				let page = that.page + 1;
				if (that.collegeCur == -2) {
					var collegeid = _.neq(-2); //除-2之外所有
				} else {
					var collegeid = that.collegeCur + ''; //小程序搜索必须对应格式
				}

				db.collection('publish')
					.where({
						status: 0,
						dura: _.gt(new Date().getTime()),
						collegeid: collegeid
					})
					.orderBy('creat', 'desc')
					.skip(page * 20)
					.limit(20)
					.get({
						success: function(res) {
							if (res.data.length == 0) {
								that.setData({
									nomore: true
								});
								return false;
							}
							if (res.data.length < 20) {
								that.setData({
									nomore: true
								});
							}
							that.setData({
								page: page,
								list: that.list.concat(res.data)
							});
						},
						fail() {
							uni.showToast({
								title: '获取失败',
								icon: 'none'
							});
						}
					});
			},

			gotop() {
				this.localScrollTop = 0;
				uni.pageScrollTo({
					scrollTop: 0
				});
			},

			//跳转详情
			detail(e) {
				let that = this;
				uni.navigateTo({
					url: '/pages/detail/detail?scene=' + e.currentTarget.dataset.id
				});
			},

			//获取轮播
			getbanner() {
				let that = this;
				db.collection('banner')
					.where({})
					.get({
						success: function(res) {
							that.setData({
								banner: res.data[0].list
							});
						}
					});
			},

			//跳转轮播链接
			goweb(e) {
				if (e.currentTarget.dataset.web) {
					uni.navigateTo({
						url: '/pages/web/web?url=' + e.currentTarget.dataset.web.url
					});
				}
			}
		}
	};
</script>
<style>
page {
	background-color: #f8f8f8;
}

.uni-book {
	position: relative;
	width: 100%;
	height: calc(100vh - (20rpx));
}

.top_box {
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	padding: 20rpx 30rpx;
	background: #fbbd08;
}

.top_list {
	width: 50rpx;
	height: 50rpx;
}

.search_box {
	display: flex;
	align-items: center;
	width: 620rpx;
	height: 66rpx;
	background: #fff;
	border-radius: 33rpx;
}

.search_ico {
	width: 32rpx;
	height: 32rpx;
	padding-left: 30rpx;
}

.search_text {
	padding-left: 10rpx;
	color: rgb(167, 167, 167);
	font-size: 28rpx;
	letter-spacing: 2rpx;
}

.banner {
	display: flex;
	box-sizing: border-box;
	width: 100%;
	height: 184rpx;
	border-radius: 22rpx;
}

.image-wrap {
	padding: 10rpx 15rpx;
	border-radius: 22rpx;
}

.banner_image {
	display: flex;
	box-sizing: border-box;
	width: 100%;
	height: 180rpx;
	border-radius: 22rpx;
}

::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
}

.space {
	width: 100%;
	height: 20rpx;
	background: #eee;
}

.kind_contain {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	height: 90rpx;

	/* margin: 0 20rpx; */
	background: #fff;
	border-bottom: 1rpx solid #eee;
}

.nav {
	display: flex;
	box-sizing: border-box;
	width: calc(100% - 190rpx);
	height: 100%;
	white-space: nowrap;
}

.nav-item {
	display: inline-block;
	width: 100rpx;
	height: 100%;
	font-size: 32rpx;
}

.nav-text {
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	color: #000;
	letter-spacing: 4rpx;
}

.tab-on {
	color: #fbbd08;
	font-size: 32rpx !important;
	font-weight: 600;
	border-bottom: 4rpx solid #fbbd08 !important;
}

.nav-item-Y {
	display: inline-block;
	width: 160rpx;
	height: 70rpx;
	font-size: 30rpx;
	background-color: #eee;
	border-radius: 10rpx 0 0 0;
}

.tab-on-Y {
	color: #000;
	font-size: 30rpx !important;
	font-weight: 600;
	background-color: #fff;
}

.prev-radius-all-1 {
	border-radius: 10rpx 10rpx 10rpx 0;
}

.prev-radius-all-2 {
	border-radius: 10rpx 10rpx 0 0;
}

.prev-radius {
	border-radius: 0 0 10rpx 0;
}

.next-radius {
	border-radius: 0 10rpx 0 0;
}

.kind_img {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60rpx;
	height: 60rpx;
}

.kind_img image {
	width: 32rpx;
	height: 32rpx;
}

.kindlist_box {
	position: absolute;
	top: 90rpx;
	left: 0rpx;
	width: 100%;
	border-bottom: 1rpx solid #eee;
}

.kindlist_card {
	display: flex;
	box-sizing: border-box;
	width: 100%;
	padding: 20rpx 20rpx 0 20rpx;
	background: #fff;
}

.list-layout {
	display: flex;
	width: 100%;

	/* height: calc(100% - (394rpx + 96rpx));
		 */
	height: 100%;
}

.left_scroll {
	width: 140rpx;
	height: 100%;
}

.right_scroll {
	flex: 1;
	width: calc(100vw - 160rpx);
	height: 100%;
	border-radius: 20rpx;
}

.scroll_content {
	width: 100%;
	height: 100%;
}

.list_grid {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
}

.list_one {
	display: flex;
	box-sizing: border-box;
	width: 25%;
	padding: 0 10rpx 20rpx 10rpx;
}

.list_one view {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 60rpx;
	font-size: 28rpx;
	letter-spacing: 2rpx;
	border: 1rpx solid #eee;
	border-radius: 10rpx;
}

.list-on {
	color: #fff;
	background: #fbbd08;
	border: none !important;
}

.list_profession-wrap {
	display: flex;
	align-items: center;
	padding-top: 10rpx;
}

.list_profession {
	display: inline-block;
	max-width: 100%;
	padding: 4rpx 10rpx;
	color: #fff;
	font-size: 22rpx;
	letter-spacing: 3rpx;
	background-color: #fbbd08;
	border-radius: 10rpx;
}

.card_grid {
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	width: 100%;
	padding: 10rpx 5rpx 20rpx;
	background-color: #f8f8f8;
}

.card_one-wrap {
	width: calc(50% - 15rpx);
	padding: 7.5rpx;
}

.card_one {
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	padding: 20rpx 20rpx 10rpx;
	background-color: #fff;
	border-radius: 15rpx;
}

.card_poster {
	width: 335rpx;
	height: 335rpx;
}

.card_title {
	width: 100%;
	margin-top: 20rpx;
	font-size: 30rpx;
	line-height: 45rpx;
	letter-spacing: 3rpx;
}

.card_author {
	width: 100%;
	color: rgb(129, 129, 129);
	font-size: 25rpx;
	line-height: 35rpx;
	letter-spacing: 3rpx;
}

.card_between {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-top: 5rpx;
}

.card_price {
	color: #f30;
	font-size: 27rpx;
	font-weight: 600;
}

.card_buy {
	width: 40rpx;
	height: 40rpx;
	padding-right: 10rpx;
}

.card_profession {
	display: inline-block;
	max-width: 40%;
	padding: 4rpx 10rpx;
	color: #fff;
	font-size: 22rpx;
	letter-spacing: 3rpx;
	background-color: #fbbd08;
	border-radius: 10rpx;
}

.list_box {
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;

	/* width: calc(100vw - 140rpx); */
	padding: 15rpx 15rpx 15rpx 0;
	background-color: #fff;
	border-bottom: 1rpx solid #f8f8f8;
	border-radius: 0 10rpx 10rpx 0;
}

.image-wrap {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200rpx;
	height: 200rpx;
}

.list_poster {
	width: 200rpx;
	height: 200rpx;
}



.list_content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;

	/* width: calc(100% - 200rpx); */
	/* width: 100%; */
	height: 200rpx;
	padding: 0 10rpx;
}

.list_word {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	width: 100%;
}

.list_title {
	width: 100%;
	font-size: 32rpx;
	line-height: 45rpx;
	letter-spacing: 3rpx;
}

.list_author {
	width: 100%;
	padding-top: 10rpx;
	color: rgb(129, 129, 129);
	font-size: 25rpx;
	line-height: 35rpx;
	letter-spacing: 3rpx;
}

.list_between {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding-bottom: 10rpx;
}

.list_price {
	color: #f30;
	font-size: 27rpx;
	font-weight: 600;
}

.list_time {
	color: #8c8c8e;
	font-size: 22rpx;
	letter-spacing: 2rpx;
}

.nocontent {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	height: calc(100% - 400rpx);
}

.nocontent-Y {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}

.nocontent-Y image {
	width: 340rpx;
	height: 272rpx;
	padding-left: 80rpx;
}

.nocontent image {
	width: 340rpx;
	height: 272rpx;
	padding-left: 80rpx;
}

.blank_text {
	padding-top: 40rpx;
	color: #c6c6c8;
	font-size: 32rpx;
	letter-spacing: 2rpx;
}

.fixed {
	position: fixed;
	top: 0rpx;
	left: 0rpx;
}

.nofixed {
	width: 100%;
	height: 91rpx;
	background: #fff;
}

.totop {
	position: fixed;
	right: 60rpx;
	bottom: 100rpx;
}

.totop image {
	width: 100rpx;
	height: 100rpx;
}

.loadmore {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	color: #999;
	font-size: 14px;
	background-color: #f5f5f5;
	border-top: 1px solid #ddd;
}

.loadmore img {
	width: 20px;
	height: 20px;
	margin-right: 8px;
}

.loadmore .nomore {
	color: #666;
}

@import "@/../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/bin";
</style>
