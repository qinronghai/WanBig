<template>
	<view id="page">
		<!-- 导航栏菜单 -->
		<view class="navbar">
			<view class="navbar-item-icon">
				<image class="icon" src="../../static/logo.png" mode="" />
			</view>
			<!-- 菜单项 -->
			<view v-for="(item, index) in menuItems" :key="index" class="navbar-item"
				:class="{ active: activeIndex === index }" @click="changeActive(index)">
				{{ item }}

				<view class="item-line" :class="{ active: activeIndex === index }"></view>
			</view>
		</view>

		<!-- 提示文本 -->
		<div class="tip">对着商品卡片 <span class="tip-key">左划</span> 可进行成交、下架和重新编辑操作哦~</div>

		<!-- 内容区域 :  根据当前选中的菜单项显示不同的内容-->
		<view class="content">
			<!-- 未审核 -->
			<view v-if="activeIndex === 0">
				<uniSwiperOut :goodsInfo="noAudit" :btnIndex="activeIndex"></uniSwiperOut>
			</view>
			<!-- 未成交 -->
			<view v-if="activeIndex === 1">
				<uniSwiperOut :goodsInfo="noDeal" :btnIndex="activeIndex"></uniSwiperOut>
			</view>
			<!-- 已成交 -->
			<view v-if="activeIndex === 2">
				<uniSwiperOut :goodsInfo="dealed" :btnIndex="activeIndex"></uniSwiperOut>
			</view>
			<!-- 不通过 -->
			<view v-if="activeIndex === 3">
				<uniSwiperOut :goodsInfo="noDeal" :btnIndex="activeIndex"></uniSwiperOut>
			</view>
		</view>
	</view>
</template>

<script>
	import VanIcon from "../../wxcomponents/vant/icon";
	import uniSwiperOut from "./components/uni-swiper-out.vue";

	const db = wx.cloud.database();
	const _ = db.command;
	export default {
		components: {
			VanIcon,
			uniSwiperOut
		},
		data() {
			return {
				// 导航栏菜单项
				menuItems: ['未审核', '未成交', '已成交', '不通过'],
				activeIndex: 1, // 当前选中的菜单项索引

				openid: '',

				// 全部的商品信息
				goodsInfo: [],
				// 未审核的商品信息
				noAudit: [],
				// 未成交的商品信息
				noDeal: [],
				// 已成交的商品信息
				dealed: [],
				// 不通过
				noPass: [],
			}
		},

		onLoad: async function(option) {
			// 处理登录请求
			console.log('打印出上个页面传递的参数。', option.showLogin); //打印出上个页面传递的参数。
			// 从缓存中获取openid
			this.openid = await uni.getStorageSync('openid');
			console.log("我的--获取openid--成功", this.openid);

			// 请求用户信息
			this.userInfo = uni.getStorageSync('userInfo');
			// 获取我的商品信息
			await this.getMyGoods(this.openid);

			uni.$on("getMyGoods", async () => {
				await this.getMyGoods(this.openid);
				console.log("点击了----testnow");
			})
		},
		onUnload: function() {
			uni.$off(["getMyGoods"]);
		},
		onShareAppMessage() {},
		methods: {
			// 切换选中的菜单项
			changeActive(index) {
				this.activeIndex = index
			},
			// 下拉刷新页面
			async onPullDownRefresh() {
				// 请求用户信息
				this.userInfo = uni.getStorageSync('userInfo');
				// 获取我的商品信息
				await this.getMyGoods(this.openid);
				uni.stopPullDownRefresh();
			},

			// 获取我的商品数据
			async getMyGoods(openid) {
				let _this = this;

				wx.showLoading({
					title: '数据加载中',
					mark: true
				})

				await db.collection('goods').where({
					_openid: openid,
				}).get().then((res) => {
					if (res.data.length >= 0) {
						console.log('获取--我的商品信息--成功', res);

						_this.goodsInfo = res.data;
						if (res.data.length > 0) {
							// 根据 deal属性进行分类
							_this.sortDataForDeal(res.data);
						} else if (res.data.length === 0) {
							this.dealed = [];
							this.noDeal = [];
							this.noAudit = [];
							this.noPass = [];
						}
					} else {
						console.log('获取--我的商品信息--失败');
					}
				}).catch((err) => {
					console.log('获取-我的商品信息--出错', err);
				});
				wx.hideLoading();
			},
			// TODO: 未成交和不通过的逻辑
			// 根据deal属性进行分类商品数据
			async sortDataForDeal(goodsInfo) {

				let dealed = [];
				let noDeal = [];
				// 提炼出所有未审核的
				let noAudit = [];

				goodsInfo.forEach(item => {
					if (item.deal === true) {
						dealed.push(item);
					} else if (item.audited === true) {
						noDeal.push(item);
					} else if (item.audited === false) {
						noAudit.push(item);
					}
				})

				this.dealed = dealed;
				this.noDeal = noDeal;
				this.noAudit = noAudit;

			},
			// 重新渲染
			chenRender() {
				this.numberkey += 1;
			},

			// 去商品详情页
			toGoodDetailPage(goodId) {
				let goodsInfo = this.goodsInfo
				uni.setStorageSync('goodsInfoFlag', goodsInfo);
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?goodId=' + goodId + '&flag=' + 1
				});
			},
			// 处理删除按钮事件
			delete2(item, noDeal) {
				let _this = this;
				wx.showModal({
					title: '提示',
					content: '是否确定下架该商品？',
					async success(res) {
						if (res.confirm) {
							console.log('用户点击确定--确定下架该商品');
							// 删除该用户上传的图片
							await _this.deleteGoodPicture(item);
							// 删除数据库对应的记录
							await _this.deleteData(item);
							// 更新用户的在售商品数量
							if (noDeal === true) {
								await db.collection('user').doc(_this.userInfo._id).update({
									data: {
										goodsNum: _.inc(-1)
									},
									success: function(res) {
										console.log('更新--商品数量--成功', res);
										setTimeout(() => {
											wx.showToast({
												title: '成功下架该商品',
												icon: "success",
												duration: 2000,
												mask: true
											})
										}, 1500);

									}
								})
							}
						} else if (res.cancel) {
							console.log('用户点击取消--取消下架该商品');
						}
					}
				})
			},
			// 处理成交按钮事件
			deal(item, noDeal) {
				let _this = this;
				wx.showModal({
					title: '提示',
					content: '该商品是否已成交？',
					async success(res) {
						if (res.confirm) {
							console.log('用户确定该商品已成交');
							// 更新已成交商品数量记录
							await _this.updateGoodDealNum(noDeal);
							// 增加deal属性
							await _this.addPropertyDeal(item);
							// 重新获取我的数据
							await _this.getMyGoods(_this.openid);

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},

			// 删除改商品在存储中的照片
			async deleteGoodPicture(item) {
				let _this = this;
				// 获取商品图片的FileID列表
				let fileList = [];
				item.pics.forEach(item => {
					fileList.push(item.url);
				});
				// 删除云端图片
				await wx.cloud.deleteFile({
					fileList: fileList
				}).then(res => {
					console.log('删除该商品在存储中的照片成功', res.fileList);
				}).catch(error => {
					console.log('删除该商品在存储中的照片失败', error);
				})

			},
			// 删除数据库中的对应的商品记录
			async deleteData(item) {
				let _this = this;
				await db.collection('goods').doc(item._id).remove({
					success: function(res) {
						console.log('删除数据库中的对应商品记录成功', res)
						// 重新请求我的商品数据
						_this.getMyGoods(_this.openid);
					}
				})
			},
			// 增加‘成交’属性
			async addPropertyDeal(item) {
				let _this = this;
				await db.collection('goods').doc(item._id).update({
					data: {
						deal: true
					}
				}).then(res => {
					console.log('增加--deal--属性', res);
				})
			},

			// 更新商品成交数量
			async updateGoodDealNum(noDeal) {
				if (noDeal === true) {
					await db.collection("user").doc(this.userInfo._id).update({
						data: {
							dealNum: _.inc(1),
							goodsNum: _.inc(-1)
						},
						success: function(res) {
							console.log('更新--成交数--成功', res)
						}
					})
				}
			},

		},
	}
</script>

<style lang="scss" scoped>
	#page {
		min-height: 100vh;
		background-color: $uni-bg-color-grey;
	}



	.navbar {
		display: flex;
		align-items: center;
	}

	.navbar-item-icon {
		padding-left: 10px;
		color: #666;
		font-size: 28rpx;
		cursor: pointer;
	}

	.icon {
		position: relative;
		top: 5px;
		width: 25px;
		height: 25px;
	}

	.navbar-item {
		position: relative;
		padding: 20px 20px 10px 20px;
		color: #666;
		font-size: 28rpx;
		cursor: pointer;
	}

	.navbar-item.active {
		color: #333;
		font-weight: bold;
	}

	.item-line.active {
		position: absolute;
		top: calc(50% + 16px);
		left: calc(50% - 10px);
		width: 20px;
		height: 2px;
		background-color: #ffc23f;
	}

	.tip {
		padding: 0 11px;
		padding-bottom: 10px;
		color: #888;
		font-size: 14px;
	}

	.tip-key {
		font-weight: bold;
	}

	.content {
		// height: 100vh;
		margin: 0 10px;
		// background-color: #9c1414;
	}

	.example-content {
		display: flex;
		align-items: center;
	}

	.wrap {
		display: flex;
		width: 94.5%;
		height: 100px;
		background-color: #fff;
		box-shadow: 1px 1.5px 5px 1px rgb(201, 199, 199);
		border-radius: 10px;

		.left {
			padding: 10px;

			.img-good {
				width: 80px;
				height: 80px;
				border-radius: 5px;
			}
		}

		;

		.center {
			flex: 1;

			.top {
				margin-top: 10px;

				.desc {
					display: -webkit-box;
					overflow: hidden;
					min-height: 33px;
					font-size: 13px;
					font-weight: 500;
					text-overflow: ellipsis;

					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.price {
					padding: 5px 0 0;
					color: #d43f3f;
					font-weight: bold;
				}
			}

			.bottom {
				display: flex;
				justify-content: space-between;

				.label {
					position: relative;
					display: flex;
					align-items: center;
					height: 40rpx;
					font-size: 16.02rpx;
					font-weight: bolder;

					.transport {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 30rpx;
						margin-top: 4rpx;
						margin-right: 15rpx;
						background-color: #4da4e2;
						border-radius: 5rpx;

						.text-transport {
							margin: 10rpx;
						}

						.icon-transport {
							width: 19.28rpx;
							height: 19.28rpx;
							margin-left: 10rpx;
						}
					}

					.address {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 30rpx;
						margin-top: 4rpx;
						margin-right: 15rpx;
						background-color: #ffc300;
						border-radius: 5rpx;

						.text-address {
							margin: 10rpx;
						}

						.icon-address {
							width: 19.28rpx;
							height: 19.28rpx;
							margin-left: 10rpx;
						}
					}

					.quality {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 30rpx;
						margin-top: 4rpx;
						margin-right: 15rpx;
						background-color: #ffc300;
						border-radius: 5rpx;

						.text-quality {
							margin: 10rpx;
						}

						.icon-quality {
							width: 17.52rpx;
							height: 17.52rpx;
							margin-left: 10rpx;
						}
					}
				}

				.browse {
					display: flex;
					align-items: center;
					padding-right: 20px;

					.icon-eye {
						padding-right: 5px;
					}

					.num {
						font-size: 10px;
						text-align: center;
					}
				}
			}
		}

		.right {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 25px;
			background-color: #eee;
			border-radius: 0 10px 10px 0;
		}
	}
</style>
