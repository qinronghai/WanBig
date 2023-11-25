<template>
	<view class="index-store-page">
		<!-- 搜索框 -->
		<van-search :value="searchKey" placeholder="请输入搜索关键词" show-action @change="searchOnChange" @search="toSearchPage"
			bind:cancel="onCancel" />
		<!-- 轮播图 -->
		<view class="banner-container">
			<swiper class="swiper" autoplay circular>
				<swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index">
					<image class="image" :src="item" mode="scaleToFill" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类导航图标 -->
		<view class="container" :class="{ fixed: scrollValue >= 723 }">
			<view class="wrap">
				<view class="item" v-for="(item, id) in catgList" :key="id" @click="toggleCategory(id)">
					<image class="image" :src="item.img" mode="scaleToFill" />
					<text class="text"> {{ item.title }}</text>
					<view :class="item.isActive ? 'active' : ''"></view>
				</view>
			</view>
		</view>
		<!-- 商品卡片展示 -->
		<view class="main">
			<view class="book-layout" v-if="!showWelcome">
				<uni-book ref="bookRef" :scrollValue="scrollValue"></uni-book>
			</view>
			<div class="column_item_0" v-if="showWelcome">
				<div class="test-style" @click="toBookMarket" v-if="showWelcome">
					<image class="book-icon" src="../../static/logo.png" mode="" />
					welcome
				</div>
				<view class="item" v-for="(item, index) in columnLeft" :key="index" @click="toGoodDetailPage(item._id)">
					<image :src="item.pics[0].url" class="column_pic" mode="aspectFill" />
					<div class="column-bottom">
						<div class="bottom-text">
							<span class="label">
								<span class="text">{{ item.delivery }}</span> </span>{{ item.title }}
						</div>
						<div class="box">
							<div class="bottom-price">
								<span class="price"><span class="symbol">￥</span>{{ item.price }}</span>
							</div>
							<div class="property-label">
								<div class="quality">
									<span class="text-quality">{{ item.condition }}</span>
								</div>
							</div>
						</div>
					</div>
				</view>
			</div>
			<div class="column_item_1" v-if="showWelcome">
				<view class="item" v-for="(item, index) in columnRight" :key="index" @click="toGoodDetailPage(item._id)">
					<image :src="item.pics[0].url" class="column_pic" mode="aspectFill" />
					<div class="column-bottom">
						<div class="bottom-text">
							<span class="label">
								<span class="text">{{ item.delivery }}</span> </span>{{ item.title }}
						</div>
						<div class="box">
							<div class="bottom-price">
								<span class="price"><span class="symbol">￥</span>{{ item.price }}</span>
							</div>
							<div class="property-label">
								<div class="quality">
									<span class="text-quality">{{ item.condition }}</span>
								</div>
							</div>
						</div>
					</div>
				</view>
			</div>
		</view>
		<!-- 无内容显示 -->
		<view class="nocontent" v-if="goodsInfo.length == 0 && categoryid !== 1">
			<image src="/static/images/blank.png"></image>
			<view class="blank_text">这里空空如也~</view>
		</view>
		<!-- 没有更多提示 -->
		<view class="loadmore" v-if="goodsInfo.length > 0">
			<image v-if="!nomore" src="/static/images/more.gif"></image>
			<view v-if="nomore">已加载到底</view>
		</view>
		<!-- totop -->
		<van-transition v-show="scrollValue > 500" custom-class="block" duration="600">
			<view class="totop" @tap="gotop">
				<image lazy-load src="/static/images/top.png"></image>
			</view>
		</van-transition>
	</view>
</template>

<script>
	const db = wx.cloud.database();
	const _ = db.command;

	import UniBook from "./components/uni-book.vue";

	export default {
		components: {
			UniBook,
		},
		data() {
			return {
				// 将父组件的scrollValue传给子组件
				scrollValue: 0,
				searchKey: "",
				// isShow: 'true',
				pics: [],
				jsData: {
					columnsHeight: [0, 0],
					isLoading: false,
				},
				columns: [
					[],
					[]
				],
				indexObj: {},
				tempPics: [],
				Mode: "Loop",
				isShow: false,
				showWelcome: true,
				columnLeft: [],
				columnRight: [],
				catgList: [{
						id: 1,
						img: "../../static/category-nav/all.svg",
						title: "全部商品",
						isActive: true,
					},

					{
						id: 2,
						img: "../../static/category-nav/books.svg",
						title: "书籍教材",
						isActive: false,
					},
					{
						id: 3,
						img: "../../static/category-nav/iphone.svg",
						title: "电子设备",
						isActive: false,
					},
					{
						id: 4,
						img: "../../static/category-nav/fitness.svg",
						title: "健身器材",
						isActive: false,
					},
					{
						id: 5,
						img: "../../static/category-nav/brush.svg",
						title: "美妆日化",
						isActive: false,
					},
					{
						id: 6,
						img: "../../static/category-nav/clothes.svg",
						title: "服装服饰",
						isActive: false,
					},
					{
						id: 7,
						img: "../../static/category-nav/other.svg",
						title: "其他宝贝",
						isActive: false,
					},
				],
				sum: 0,
				swiperList: [],

				categoryid: 0,


				// 加载数据相关
				page: 0,
				rows: 20,
				nomore: false,
				goodsInfo: [],
			};
		},
		onShow: async function() {
			console.log("index Page Show");
			// 清空搜索框文字
			this.searchKey = "";
			// 刷新页面，重新请求数据
			// await this.getGoodsItinfo();
		},
		//监测屏幕滚动
		onPageScroll: function(e) {
			const scrollTop = parseInt(e.scrollTop * uni.getSystemInfoSync().pixelRatio);
			this.scrollValue = scrollTop;
		},
		onReachBottom() {
			console.log("到底了");
			this.more();
		},

		onShareAppMessage() {},
		async onPullDownRefresh() {
			// 判断是不是书籍组件的刷新
			if (!this.showWelcome) {
				await this.$refs.bookRef.getList();
			} else {
				await this.getGoodsInfo();
			}
			uni.stopPullDownRefresh();
		},
		methods: {
			toBookMarket() {
				console.log("切换到书籍书籍市场");
			},

			searchOnChange(e) {
				console.log(e.detail);
				this.searchKey = e.detail;
			},
			toSearchPage() {
				// 跳转搜索结果页
				uni.navigateTo({
					url: "/pages/search-res/search-res?searchKey=" + this.searchKey,
				});
			},
			filterPics() {
				// 首页商品卡片的图片单独做组
				this.goodsInfo.forEach((item) => {
					item.pics = item.pics[0].url;
				});
			},
			gotop() {
				this.scrollValue = 0;
				uni.pageScrollTo({
					scrollTop: 0,
				});
			},
			async sortData(goodsInfo) {
				// 拆分两为两列
				let columnLeft = goodsInfo.filter((item, index) => {
					return index % 2 === 0;
				});
				let columnRight = goodsInfo.filter((item, index) => {
					return index % 2 !== 0;
				});
				// 当数组长度为单数时，造成右列空缺很高，需要补一个
				if (goodsInfo.length % 2 !== 0) {
					columnRight.push({
						pics: [{
							url: "cloud://qrh-database01-5gz9zkuedd28e7fc.7172-qrh-database01-5gz9zkuedd28e7fc-1313188449/swiper-pictures/books-5937716_640.jpg",
						}, ],
						delivery: "不送",
						title: "曾梦想仗剑走天涯，没想到码农过一生",
						price: 100,
						condition: "底部彩蛋",
					});
				}
				this.columnLeft = columnLeft;
				this.columnRight = columnRight;

				console.log("首页--调整数据--完毕", columnLeft, columnRight);
			},
			/* 获取商品数据 */
			async getGoodsInfo(id) {
				try {
					wx.showLoading({
						title: "数据加载中",
						mark: true,
					});

					const categoryMap = {
						0: "全部",
						1: "书籍资料",
						2: "电子设备",
						3: "健身器材",
						4: "美妆日化",
						5: "服装服饰",
						6: "其他宝贝",
					};

					const category = categoryMap[id] || "全部";

					const queryCondition = {
						status: 0, // 在售
						audited: true, // 已审核
						pass: true, // 审核通过
						dura: _.gt(new Date().getTime()), // 有效期内
					};

					if (category !== "全部") {
						queryCondition.category = category;
					}

					const res = await db.collection("goods").where(queryCondition).orderBy("creat", "desc").limit(this.rows)
					.get();
					console.log("首次加载数据", res);

					uni.hideLoading();

					if (res.data.length === 0) {
						this.setData({
							nomore: true,
							goodsInfo: [],
						});
					} else {
						this.setData({
							page: 0,
							goodsInfo: res.data,
							nomore: res.data.length < this.rows, // 小于this.rows，nomore：true，大于等于this.rows，nomore：false
						});
					}

					uni.setStorageSync("goodsInfo", res.data);
					this.goodsInfo = res.data;

					// this.filterPics();
					this.sortData(this.goodsInfo);
				} catch (error) {
					uni.hideLoading();
					uni.showToast({
						title: "获取数据异常，请联系管理员",
						icon: "error",
						mask: true,
					});
					console.error("获取商品数据失败", error);
				}
			},
			/* 加载更多商品数据 */
			async more() {
				try {
					if (this.nomore || this.goodsInfo.length < this.rows) {
						return false;
					}
					uni.showLoading({
						title: "数据加载中",
						mark: true,
					});
					let page = this.page + 1;
					const categoryMap = {
						0: "全部",
						1: "书籍资料",
						2: "电子设备",
						3: "健身器材",
						4: "美妆日化",
						5: "服装服饰",
						6: "其他宝贝",
					};

					const category = categoryMap[this.categoryid] || "全部";

					const queryCondition = {
						status: 0, // 在售
						audited: true, // 已审核
						pass: true, // 审核通过
						dura: _.gt(new Date().getTime()), // 有效期内
					};

					if (category !== "全部") {
						queryCondition.category = category;
					}
					const res = await db
						.collection("goods")
						.where(queryCondition)
						.orderBy("creat", "desc")
						.skip(page * this.rows)
						.limit(this.rows)
						.get();

					console.log("加载更多", res);
					console.log("category", category);
					console.log("queryCondition", queryCondition);

					if (res.data.length === 0) {
						this.setData({
							nomore: true,
						});
						uni.hideLoading();
						return false;
					}
					if (res.data.length < this.rows) {
						this.setData({
							nomore: true,
						});
					}
					this.page = page;
					this.goodsInfo = this.goodsInfo.concat(res.data);

					uni.setStorageSync("goodsInfo", this.goodsInfo);

					// this.filterPics();
					this.sortData(this.goodsInfo);

					uni.hideLoading();
				} catch (error) {
					uni.hideLoading();
					console.error("加载更多商品数据失败", error);
				}
			},
			async getswiperList() {
				await db
					.collection("swiper")
					.doc("def1da45650023a10182606c71ecd04e")
					.get()
					.then((res) => {
						console.log("首页--请求轮播图数据--成功", res);

						this.swiperList = res.data.swiperList;
					});
			},
			async toggleCategory(id) {
				// 隐藏欢迎标语
				this.showWelcome = id !== 1; // 如果 id 不等于 1，则隐藏欢迎标语

				// 打印切换信息
				console.log(`切换到了--${this.catgList[id].title}--分类--${id}`);

				// 存储当前分类id
				this.categoryid = id;

				// 将所有分类设为非活跃状态
				this.catgList.forEach((item) => {
					item.isActive = false;
				});

				// 将当前分类设为活跃状态
				this.catgList[id].isActive = true;

				// 获取商品信息并等待完成
				await this.getGoodsInfo(id);
			},

			toGoodDetailPage(goodId) {
				console.log(goodId);
				uni.navigateTo({
					url: `/pages/good-detail/good-detail?goodId=${goodId}&from=index`,
				});
			},
		},
		async mounted() {
			await this.getGoodsInfo();
			await this.getswiperList();
		},
	};
</script>
<style lang="scss" scoped>
	.index-store-page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding: 0 29.79rpx;
		background-color: $global-bg-color;

		/deep/ .van-search {
			padding: 0;
			padding: 10rpx 0 17.52rpx 0;
			background-color: $global-bg-color !important;
		}

		.banner-container {
			margin-bottom: 20.52rpx;
			border-radius: 26.29rpx;

			.swiper {
				overflow: hidden;
				height: 380.16rpx;
				background-color: rgb(204, 204, 204);
				border-radius: 26.29rpx;

				.swiper-item {
					.image {
						z-index: -1;
						width: 100%;
						height: inherit;
						border-radius: 30rpx;
					}
				}
			}
		}

		.main {
			display: flex;
			justify-content: space-between;
			flex: 1;

			// 叉轴的起点对齐 align-items: flex-start;
			margin-top: 20rpx;

			.book-layout {
				position: relative;
				z-index: 10;
				width: 100%;
			}

			.column_item_0 {
				width: 48%;
				margin: 0 0 15rpx 0;
				margin-bottom: 18rpx;
				border-radius: 8.76rpx;

				.test-style {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 120rpx;
					margin-bottom: 20rpx;

					// font-weight: bold;
					text-align: center;
					background-color: #fff;
					border-radius: 17.52rpx;

					.book-icon {
						width: 60rpx;
						height: 60rpx;
						margin-right: 10rpx;
						border-radius: 10rpx;
					}
				}

				.item {
					margin-bottom: 15rpx;

					.column_pic {
						display: block;
						width: 100%;
						height: 336.45rpx;
						border-radius: 12rpx;
					}

					.column-bottom {
						box-sizing: border-box;
						width: 100%;
						height: auto;
						padding: 10.51rpx 15rpx;
						background: #fff;
						border-radius: 0 0 10rpx 10rpx;

						.bottom-text {
							overflow: hidden;
							height: auto;
							padding-bottom: 5rpx;
							font-size: 24rpx;
							font-weight: bold;
							text-overflow: ellipsis;
							white-space: nowrap;

							/* 添加这一行 */

							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;

							.label {
								width: auto;
								margin-right: 10rpx;
								font-size: 20rpx;
								font-weight: normal;
								background-color: #0095ff;
								border-radius: 4rpx;

								.text {
									padding: 4rpx 8rpx;
									color: #fff;
									font-size: 20rpx;
								}
							}
						}
					}

					.box {
						display: flex;
						padding: 10rpx 0;

						.bottom-price {
							display: flex;
							align-items: center;
							height: 40rpx;

							.price {
								color: rgb(255, 0, 0);
								font-size: 35rpx;
								font-weight: bold;

								.symbol {
									font-size: 22.52rpx;
								}
							}
						}

						.property-label {
							position: relative;
							display: flex;
							align-items: center;
							height: 40rpx;
							margin-left: 20rpx;
							font-size: 16.02rpx;
							font-weight: normal;

							.quality {
								display: flex;
								justify-content: center;
								align-items: center;
								width: auto;
								height: 23rpx;
								margin-top: 4rpx;
								margin-right: 15rpx;
								color: #ed555c;
								border: 2rpx solid rgb(255, 101, 101);
								border-radius: 5rpx;

								.text-quality {
									margin: 10rpx;
								}
							}
						}
					}
				}
			}
		}

		.column_item_1 {
			width: 48%;
			margin: 0 0 15rpx 0;
			margin-bottom: 18rpx;
			border-radius: 8.76rpx;

			.test-style {
				width: 100%;
				height: 150rpx;
				margin-bottom: 10rpx;
				background-color: green;
				border-radius: 17.52rpx;
			}

			.item {
				margin-bottom: 15rpx;

				.column_pic {
					display: block;
					width: 100%;
					height: 336.45rpx;
					border-radius: 12rpx;
				}

				.column-bottom {
					box-sizing: border-box;
					width: 100%;
					height: auto;
					padding: 10.51rpx 15rpx;
					background: #fff;
					border-radius: 0 0 10rpx 10rpx;

					.bottom-text {
						display: -webkit-box;
						overflow: hidden;
						height: auto;
						padding-bottom: 5rpx;
						font-size: 24rpx;
						font-weight: bold;
						text-overflow: ellipsis;

						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;

						.label {
							width: auto;
							margin-right: 10rpx;
							font-size: 20rpx;
							font-weight: normal;
							background-color: #0095ff;
							border-radius: 4rpx;

							.text {
								padding: 4rpx 8rpx;
								color: #fff;
								font-size: 20rpx;
							}
						}
					}
				}

				.box {
					display: flex;
					padding: 10rpx 0;

					.bottom-price {
						display: flex;
						align-items: center;
						height: 40rpx;

						.price {
							color: rgb(255, 0, 0);
							font-size: 35rpx;
							font-weight: bold;

							.symbol {
								font-size: 22.52rpx;
							}
						}
					}

					.property-label {
						position: relative;
						display: flex;
						align-items: center;
						height: 40rpx;
						margin-left: 20rpx;
						font-size: 16.02rpx;
						font-weight: normal;

						.quality {
							display: flex;
							justify-content: center;
							align-items: center;
							width: auto;
							height: 23rpx;
							margin-top: 4rpx;
							margin-right: 15rpx;
							color: #ed555c;
							border: 2rpx solid rgb(255, 101, 101);
							border-radius: 5rpx;

							.text-quality {
								margin: 10rpx;
							}
						}
					}
				}
			}
		}

		.fixed {
			position: fixed;
			top: 0;
			left: 0;

			// margin-top: 0;
			z-index: 20;
			width: 100%;
		}

		.container {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 130.39rpx;
			background-color: rgb(255, 255, 255);
			border-radius: 22.78rpx;

			.wrap {
				display: flex;
				width: 95%;
				white-space: nowrap;
				transform: translateY(-10%);

				.item {
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					flex-grow: 1;
					width: 90rpx;
					height: 90rpx;

					.image {
						width: 80rpx;
						height: 80rpx;
					}

					.text {
						margin-top: 7rpx;
						font-size: 20rpx;
						font-weight: bold;
					}

					.active {
						position: absolute;
						bottom: -18rpx;
						width: 55rpx;
						height: 8rpx;
						background-color: #fc9b42;
						border-radius: 50rpx;
					}
				}

				.item:nth-child(6) {
					margin-right: 0;
				}
			}
		}
	}

	.nocontent {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: calc(100% - 100rpx);
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

	.loadmore {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
		color: #999;
		font-size: 28rpx;
		background-color: #f5f5f5;
		border-top: 2rpx solid #ddd;
	}

	.loadmore image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 16rpx;
	}

	.loadmore .nomore {
		color: #666;
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
</style>