<template>
	<div id="page">
		<div v-if="showPage === 0" class="fake">
			<towxml :nodes="content" />
		</div>
		<VanTabs :activePage="activePage" animated class="van-tabs" color="#ffc300" swipeable>
			<VanTab title="商品发布" class="container" color="#ffc300">
				<!-- <view v-if="showPage ===1" :key="componentKey" class="container"> -->
				<!-- 商品描述文本组件 -->
				<uni-goods-desc v-on:getGoodTitle="getGoodTitle" class="uni-goods-desc"></uni-goods-desc>
				<!-- 中间容器 -->
				<div class="center-wrap">
					<div class="goods-pictures">
						<van-uploader class="uploader" max-count="3" multiple="true" :file-list="fileList" @delete="deleteImg"
							@after-read="afterRead" />
					</div>
				</div>
				<!-- 底部容器 -->
				<div class="bottom-wrap">
					<div class="top-form">
						<div class="top-form__item price">
							<div class="left ">
								<image src="../../static/release/price.svg" class="icon"></image>
								<div class="txt">价格</div>
							</div>
							<div class="input">
								<input :value="price" confirm-type="done" class="price-input" type="number" placeholder="请输入价格"
									@confirm="handlePrice" @blur="handlePrice" />
							</div>
						</div>
						<div class="top-form__item contact">
							<div class="left">
								<image src="../../static/release/contact.svg" class="icon"></image>
								<div class="txt">联系方式</div>
							</div>
							<div class="input"> <input :value="contact" class="contact-input" placeholder="QQ / WX"
									@blur="handleContact" @confirm="handleContact" />
							</div>
						</div>
						<div class="top-form__item address">
							<div class="left">
								<image src="../../static/release/floor-num.svg" class="icon"></image>
								<div class="txt">楼号</div>
							</div>
							<div class="input">
								<radio-group class="radio" @change="areaRadioChange">
									<label class="radio-west">
										<radio style="transform: scale(0.7)" value="西区" :checked="areaRadio" />西区
									</label>
									<label class="radio-west">
										<radio style="transform: scale(0.7)" value="东区" />东区
									</label>
								</radio-group>
								<div class="input__number"> <input :value="floorNum" confirm-type="done" class="address-input"
										type="number" placeholder="请输入楼号" @blur="handleFloorNum" />
								</div>
							</div>
						</div>
					</div>
					<!-- 底部区域 -->
					<div class="bottom-options">
						<!-- 商品分类 -->
						<van-popup duration="900" :show="showGoodsCategory" round position="bottom" custom-style="height: 40%"
							@close="onCloseGoodsCategory" closeable>
							<div class="goods-category">
								<div class="goods-category__item" v-for="item in navList" :key="item.id">
									<div class="goods-category__item--block" @click="handleCategory(item.id)">
										<image class="icon" :src="item.img" />
										<div class="txt" :class="{ active: item.id === clickCateIndex }">{{ item.txt }}
										</div>
									</div>
								</div>
							</div>
						</van-popup>
						<div class="bottom-options__item category" @click="showPopup">
							<div class="left">
								<image src="../../static/release/category.svg" class="icon"></image>
								<div class="txt">商品分类 (必选)</div>
							</div>
							<div class="option">
								<van-icon v-show="showCategoryArrow" name="arrow" size="18px" />
								<div v-show="!showCategoryArrow">{{ category }}</div>
							</div>
						</div>
						<!-- 商品成色 -->
						<van-popup duration="900" :show="showGoodQuality" round position="bottom" custom-style="height: 40%"
							@close="onCloseGoodQuality" closeable>
							<div class="goods-quality">
								<div class="goods-quality__item" v-for="(item, index) in qualityList" :key="index"
									@click="rightTap(index)">
									<div class="goods-quality__item--block">
										<div class="txt" :class="{ active: index === rightIndex }">
											{{ item.title }}
										</div>
									</div>
								</div>
							</div>
						</van-popup>
						<div @click="showGoodQualityPopup" class="bottom-options__item">
							<div class="left">
								<image src="../../static/release/goods-quality.svg" class="icon"></image>
								<div class="txt">商品成色</div>
							</div>
							<div class="option">
								<van-icon v-show="showQualityArrow" name="arrow" size="18px" />
								<div v-show="!showQualityArrow">{{ quality }}</div>
							</div>
						</div>
						<!-- 出/蹲 -->
						<div class="bottom-options__item need">
							<div class="left">
								<image src="../../static/release/goods-need.svg" class="icon"></image>
								<div class="txt">出/蹲</div>
							</div>
							<div class="options">
								<radio-group class="radio-group__need" @change="needRadioChange">
									<label class="radio-sell">
										<radio value="出" :checked="needRadio" style="transform: scale(0.7)" />出
									</label>
									<label class="radio">
										<radio value="蹲" style="transform: scale(0.7)" />蹲
									</label>
								</radio-group>
							</div>
						</div>
					</div>
				</div>
				<!-- 送货方式 -->
				<div class="transport">
					<div class="left">
						<image src="../../static/release/transport.svg" class="icon"></image>
						<div class="txt">送货</div>
					</div>
					<div class="options">
						<radio-group @change="transportRadioChange">
							<label class="radio-sell">
								<radio value="自提" :checked="transportRadio" style="transform: scale(0.7)" />自提
							</label>
							<label class="radio">
								<radio value="配送" style="transform: scale(0.7)" />配送
							</label>
						</radio-group>
					</div>
				</div>
				<!-- 提交按钮 -->
				<view class="submit_btn">
					<button class="btn" type="primary" @click="handleSubmitBtn">提交审核</button>
				</view>
			</VanTab>
			<VanTab title="图书发布"><!-- 图书上架  -->
				<!-- <view v-else-if="showPage === 2" class=""> -->
				<uni-book-release></uni-book-release>
			</VanTab>
		</VanTabs>
	</div>
</template>

<script>
	import UniGoodsDesc from "./components/uni-goods-desc.vue";
	import UniBookRelease from "./components/uni-book-release.vue"
	import VanIcon from "../../wxcomponents/vant/icon";
	import VanPopup from "../../wxcomponents/vant/popup/index";
	import VanPicker from "../../wxcomponents/vant/picker";
	import VanTab from "../../wxcomponents/vant/tab/index.js";
	import VanTabs from "../../wxcomponents/vant/tabs/index.js";
	import Toast from "../../wxcomponents/vant/toast";
	import {
		request
	} from "../../async/index";
	const db = wx.cloud.database();
	const _ = db.command;

	import {
		delay
	} from "../utils/delay";
	import towxml from '../../static/towxml/towxml'

	export default {
		components: {
			UniGoodsDesc,
			UniBookRelease,
			VanPopup,
			VanIcon,
			VanPicker,
			VanTab,
			VanTabs,
			Toast,
			towxml
		},
		data() {
			return {
				content: '',
				activePage: 1,
				current: 0,
				navList: [{
						id: 1,
						img: "../../static/category-nav/books.svg",
						txt: "书籍资料",
					},
					{
						id: 2,
						img: "../../static/category-nav/iphone.svg ",
						txt: "电子设备",
					},
					{
						id: 3,
						img: "../../static/category-nav/fitness.svg",
						txt: "健身器材",
					},
					{
						id: 4,
						img: "../../static/category-nav/brush.svg",
						txt: "美妆日化",
					},
					{
						id: 5,
						img: "../../static/category-nav/clothes.svg",
						txt: "服装服饰",
					},
					{
						id: 6,
						img: "../../static/category-nav/other.svg",
						txt: "其他宝贝",
					},
				],
				qualityList: [{
						id: 1,
						title: "全新",
					},
					{
						id: 2,
						title: "几乎全新",
					},
					{
						id: 3,
						title: "轻微痕迹",
					},
					{
						id: 4,
						title: "明显痕迹",
					},
				],
				// 控制真页面切换 0：fack页面， 1：商品发布页面，2：图书发布页面
				showPage: 2,
				// 显示控制
				showGoodsCategory: false,
				showGoodQuality: false,
				showCategoryArrow: true,
				showQualityArrow: true,

				// 索引判断
				rightIndex: 0,
				clickCateIndex: 0,

				// 复选框控制
				areaRadio: true,
				needRadio: true,
				transportRadio: true,

				// 文本检测通过反馈
				ischeckText: false,

				// 商品图片信息
				fileList: [],
				category: '其他宝贝',
				quality: '全新',
				need: '出',
				title: '',
				price: '',
				area: '西区',
				floorNum: '',
				contact: '',
				views: 0,
				releaseTime: '',
				transport: '自提',
				userInfo: {},

				audited: false,
				buy: false,
				buyTime: '1',
			};
		},
		async onLoad(options) {

			// 控制页面切换
			let curTime = new Date();
			// db.collection('swiper').doc('8de6ebcc65002a6f017fcdd65698e102').get().then((res) => {
			// 	let allowTime = res.data.time;
			// 	console.log("服务器时间", allowTime);
			// 	if (curTime < allowTime) {
			// 		this.showPage = 0;
			// 	} else {
			// 		this.showPage = 1;
			// 	}
			// })

			let str = `# 项目介绍

本项目的前身是《湾大杂货铺》(于2021年11月份开发完成上线)，上线之后经过小规模的校园推广，注册登录用户后台显示达2500人。由于初次开发，能力有限，代码有诸多的bug且本人时间精力有限，很大程度是我想重新重构这个项目，然后《湾大杂货铺》小程序停止了维护。

后面我转入学习vue和uniapp，记不清具体什么时间点才重新重构《湾大杂货铺》了。好在最后也完成了。可是我又觉得是从一座代码屎山到另外一座代码屎山罢了。

当初我的想法是，在原来《湾大杂货铺》的基础上，把书籍部分的逻辑抽离出来做一个二手书市场。后来也不清楚，为什么这部分没做。所以这一版的书籍部分还是混在一起的。


## 2023-09-12
### 重启项目


## 2022-08-09
### 主要功能

主要功能在之前的基础上，添加了：

1. 全新的设计及重构。
2. 增加成功的通知。
3. 增加算法机制。
`

			this.content = this.towxml(
				str, 'markdown', {
					base: "../../static"
				})

			// 获取openid
			let openid = uni.getStorageSync('openid');
			// 获取最新的用户数据
			await db.collection('user').where({
				_openid: openid
			}).get().then((res) => {
				console.log('获取最新的用户数据', res);
				this.userInfo = res.data[0];
				uni.setStorageSync('userInfo', this.userInfo)
			})
		},
		onShow() {
			console.log("发布页面显示")
			this.userInfo = uni.getStorageSync('userInfo');
		},
		onShareAppMessage() {},
		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			getGoodTitle: function(title) {
				// title就是子组件传过来的值
				console.log('des组件传title值过来了--', title);
				this.title = title
			},

			deleteImg(event) {
				// 获取点击图片的下标：
				const index = event.detail.index;
				// 获取fileList数据
				let fileList = this.fileList;
				// 删除对应index的元素
				fileList.splice(index, 1);
				// 重新放回fileList中
				this.fileList = fileList;
				console.log("删除--图片--成功", this.fileList);
			},

			afterRead(event) {
				const {
					file
				} = event.detail;
				console.log("图片列表", file);
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let pics = file.map(item => {
					return {
						url: item.thumb,
					}
				})
				console.log("afterRead--添加的图片：", pics)
				this.fileList.push(...pics);
				console.log("afterRead--添加后的图片列表：", this.fileList)


			},

			areaRadioChange(e) {
				this.area = e.detail.value;
			},

			transportRadioChange(e) {
				this.transport = e.detail.value;
				console.log("改变--运送方式：", e.detail.value);
			},

			handleContact(event) {
				let contact = event.detail.value;

				let wxReg = new RegExp("^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$"); //微信号正则校验   
				let qqReg = new RegExp("^[1-9][0-9]{4,9}$"); //QQ号正则校验   

				let flagWX = wxReg.test(contact);
				let flagQQ = qqReg.test(contact);

				if (flagWX) {
					let WX = '微信：' + contact;
					this.contact = WX;
					console.log(WX);
				} else if (flagQQ) {
					let QQ = 'QQ：' + contact;
					this.contact = QQ;
					console.log(QQ);

				}

			},

			handlePrice(event) {
				let price = parseInt(event.detail.value);
				this.price = price;
				console.log("价格：" + price);
			},

			handleFloorNum(event) {
				this.floorNum = event.detail.value;
			},

			handleCategory(id) {
				let category = this.navList[id - 1].txt;
				console.log('点击了商品分类--', this.navList[id - 1].txt);
				this.category = category;
				this.clickCateIndex = id;

				this.showGoodsCategory = false;
				this.showCategoryArrow = false;
			},

			showPopup() {
				this.showGoodsCategory = true;
			},

			showGoodQualityPopup() {
				this.showGoodQuality = true;
			},

			onCloseGoodsCategory() {
				this.showGoodsCategory = false;
			},

			onCloseGoodQuality() {
				this.showGoodQuality = false;
			},

			rightTap(index) {
				this.rightIndex = index;
				let quality = this.qualityList[index].title
				console.log("商品成色：" + quality);
				this.quality = quality;
				this.showGoodQuality = false;
				this.showQualityArrow = false;
			},

			needRadioChange(e) {
				this.need = e.detail.value;
			},

			async subscribNews() {
				let tempId = 'W6CsnO_5tp5kxNFMjFsh9z7PwuXWe_OUyXHxsNQeTag';
				let _this = this;
				wx.requestSubscribeMessage({
					tmplIds: ['W6CsnO_5tp5kxNFMjFsh9z7PwuXWe_OUyXHxsNQeTag',
						'9Fs4ueUrKEpp1brJDggbOcQ-m3TAOLVEc6SwBxGY3l4'
					],
					success: res => {
						console.log(res);
						if (res[tempId] == "accept") {
							wx.showToast({
								title: '订阅成功！',
								duration: 1000,
								success() {
									console.log('订阅消息--成功');
									// 点击订阅成功后再去提交审核
									_this.submitAudit();
								}
							})
						} else {
							wx.showModal({
								content: '未授权发送通知，您将收不到通知！',
								confirmText: '重新授权',
								cancelText: '取消授权',
								success: (res) => {
									if (res.confirm) {
										// 重新授权
										_this.subscribNews();
									} else {
										console.log('用户取消授权');
									}
								}
							})

						}
					}
				})
			},

			async submitAudit() {
				// 先进行文本检测
				await this.checkText(this.title, this.openid);
				console.log("文本检测--ischeckText is --" + this.ischeckText);
				if (this.ischeckText) {
					await delay(1000);
					// 文本合法，上传图片
					this.upLoadImage();
				}
			},

			async handleSubmitBtn() {

				let userInfo = uni.getStorageSync('userInfo');
				console.log('----teest---', userInfo);
				let _this = this;
				if (userInfo.nickName == null) {
					console.log("您还未登录，请登录之后，再提交审核。");
					wx.showModal({
						title: '提示',
						content: '您还未登录，请登录之后，再提交审核',
						success(res) {
							if (res.confirm) {
								console.log('用户点击确定')
								uni.switchTab({
									url: '/pages/my/my'
								});
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				} else {
					this.openid = uni.getStorageSync('openid');
					wx.showModal({
						title: '提示',
						content: '确定要提交审核吗？',
						async success(res) {
							if (res.confirm) {
								console.log('用户点击确定')
								// 让卖家订阅消息
								await _this.subscribNews();

							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				}

			},

			async checkText(text, openid) {
				// 推荐文本内容检测
				// wx.hideLoading();
				wx.showLoading({
					title: '文本合法性检测中',
					mask: true
				})

				this.ischeckText = true;
				/* await wx.cloud.callFunction({
				  name: 'msgcheck',
				  data: {
				    content: text,
				    openid: openid
				  }
				}).then(ckres => {
				  console.log("文本检测--返回的结果--", ckres);
				  if (ckres.result.errCode == 0 && (ckres.result).result.label == 100) {
				    wx.hideLoading();
				    wx.showToast({
				      title: '文本检测通过',
				      icon: 'success',
				      duration: 1500
				    })
				    console.log("文本检测--通过");
				    this.ischeckText = true;
				  } else if (ckres.result.errCode === 44004) {
				    wx.hideLoading();
				    wx.showToast({
				      title: '文本为空',
				      icon: 'error',
				      duration: 2000
				    })
				    this.ischeckText = false;
				    console.log("文本检测--不通过--文本为空");
				  } else {
				    wx.hideLoading();
				    wx.showModal({
				      title: '提示',
				      content: '文本检测不通过，可能含敏感信息',
				      showCancel: false
				    })
				    console.log('文本检测--不通过--含敏感信息');
				  }
				}) */
			},

			async upLoadGoodInfo() {

				let userInfo = this.userInfo;
				// 提交时间
				this.releaseTime = new Date();
				let goodInfo = {
					title: this.title,
					pics: this.fileList,
					price: this.price,
					contact: this.contact,
					address: this.address,
					category: this.category,
					quality: this.quality,
					need: this.need,
					views: this.views,
					transport: this.transport,
					releaseTime: this.releaseTime,
					userInfo: userInfo,
					audited: this.audited,
					buy: false,
					buyTime: this.buyTime,
					pass: false
				}
				this.goodInfo = goodInfo;
				console.log("上传商品信息之前--合成后的商品数据：", goodInfo);
				// 校验数据是否为空
				let isNotEmpty = this.checkGoodInfo(this.goodInfo);
				console.log('校验商品信息--已填写--', isNotEmpty);
				if (isNotEmpty) {

					// userInfo.goodsNum++;
					let _this = this;
					await db.collection('goods')
						.add({
							data: {
								title: this.title,
								pics: this.fileList,
								price: this.price,
								contact: this.contact,
								address: this.address,
								category: this.category,
								quality: this.quality,
								transport: this.transport,
								need: this.need,
								views: this.views,
								releaseTime: this.releaseTime,
								user: {
									id: userInfo._id,
									openid: userInfo._openid
								},
								audited: this.audited,
								buy: false,
								buyTime: this.buyTime,
								pass: false

							}
						})
						.then(res => {
							console.log('上传商品信息--存入数据库--成功', res);
							// 更新所在售的商品数量
							db.collection("user").doc(userInfo._id).update({
								data: {
									goodsNum: _.inc(1),
								},
								success: function(res) {
									console.log('更新--商品数--成功', res)
								}
							})
							wx.showToast({
								title: '已提交，审核中',
								icon: 'success',
								duration: 2000,
								mark: true
							}).then(res => {

								setTimeout(() => {
									// 清空表单
									Object.assign(this.$data, this.$options.data());
									uni.switchTab({
										url: '/pages/index-store/index-store',
									});
								}, 1500);
							})


						})
				}


			},

			async upLoadImage() {
				let fileList = this.fileList;
				for (let i = 0; i < fileList.length; i++) {
					console.log(fileList[i].url);
					await request(fileList[i].url).then(result => {
						fileList[i].url = result.fileID;
						if (result.statusCode === 204) {
							console.log('上传图片--' + (i + 1) + '--成功');
						}

						if ((i === fileList.length - 1) && result.statusCode === 204) {
							console.log('上传图片--全部图片--上传完毕');
							this.upLoadGoodInfo();
						}
					})

				}
			},

			checkGoodInfo(userInfo) {
				let values = Object.values(userInfo);
				try {
					values.forEach(item => {
						if (item === '') {
							console.log('检测商品信息完整性--不完整');
							throw new error;
						}
					});
				} catch (error) {
					wx.showToast({
						title: '还有没填的信息',
						icon: 'error',
						duration: 2500
					})
					return false;
				}
				console.log('检测商品信息完整性--完整');
				return true;
			}
		},

		computed: {
			// 商品的地址由 地区+楼号 组成
			address: function() {
				console.log("地址：" + (this.area + ' ' + this.floorNum));
				return this.area + ' ' + this.floorNum
			}
		}
	};
</script>

<style lang="scss" scoped>
	#page {
		background-color: #fff;
	}

	.uni-goods-desc {
		padding: 0;
		width: 100vw;
	}

	.tabs-index--wan-tabs__wrap {
		background-color: #fff !important;
	}

	.container {
		min-height: 100%;
		// padding: 0 29.79rpx;
		// padding: 0 30rpx;
		// background-color: $uni-bg-color-grey;
		box-shadow: 0 30rpx 20rpx rgb(240, 240, 240);
		background: #f6f7fa;

		.center-wrap {
			padding: 0 30rpx;

			.goods-pictures {
				display: flex;
				justify-content: center;
				align-items: center;
				height: auto;
				padding: 8px 13px 0;
				margin: 8px 0 5px 0;
				background-color: #fff;
				border-radius: 15px;
			}
		}

		.bottom-wrap {
			padding: 0 30rpx;

			.top-form {
				margin-top: 10px;
				background-color: rgb(255, 255, 255);
				border-radius: 15px;

				&__item {
					display: flex;
					justify-content: space-between;
					padding: 25px 15px 0;
					font-size: 12px;
					font-weight: bold;

					.left {
						display: flex;
						align-items: center;

						.icon {
							width: 24px;
							height: 24px;
							margin-right: 15px;
						}

						.txt {
							font-size: 12px;
							text-align: center;
						}
					}

					.input {
						width: 80px;
						font-weight: 500;
						text-align: right;
					}
				}

				.top-form__item.price {
					padding: 15px 15px 0;
				}

				.top-form__item.contact {
					.icon {
						width: 23px;
						height: 23px;
					}
				}

				.top-form__item.address {
					padding-bottom: 15px;

					.left {
						text-align: center;

						.icon {
							width: 26px;
							height: 26px;
							margin-right: 12px;
						}
					}

					.input {
						display: flex;
						align-items: center;
						width: auto;

						.radio {
							display: flex;
							align-items: center;
						}

						.input__number {
							padding-left: 10px;

							.address-input {
								width: 80px;
							}
						}
					}
				}
			}

			.bottom-options {
				margin-top: 10px;
				background-color: rgb(255, 255, 255);
				border-radius: 15px;

				.popup {
					width: 50px;
					height: 50px;
				}

				.goods-category {
					display: flex;
					flex-wrap: wrap;
					margin: 30px 20px 0;

					&__item {
						flex-grow: 1;

						&--block {
							display: flex;
							flex-direction: column;
							align-items: center;
							padding: 30px 25px 20px;

							.active {
								padding: 5px 5px;
								color: #000;
								font-size: 16px;
								font-weight: bold;
								background-color: #ffc300;
								border-radius: 10px;
							}

							.icon {
								width: 30px;
								height: 30px;
							}

							.txt {
								margin-top: 10px;
								font-size: 14px;
								font-weight: bold;
							}
						}
					}
				}

				.goods-quality {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					height: 100%;
					margin-top: 40px;

					&__item {
						flex-grow: 1;

						&--block {
							.active {
								padding: 5px 10px;
								color: #000;
								font-size: 16px;
								font-weight: bold;
								background-color: #ffc300;
								border-radius: 10px;
							}
						}
					}
				}

				&__item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20px 15px 0;
					font-size: 12px;
					font-weight: bold;

					.left {
						display: flex;
						align-items: center;

						.icon {
							width: 23px;
							height: 23px;
							margin-right: 15px;
						}

						.txt {
							text-align: center;
						}
					}

					.input {}
				}

				&__item.need {
					padding-bottom: 15px;

					.options {
						.radio-group__need {
							width: 106px;
						}

						.radio-sell {
							padding-right: 12px;
						}
					}
				}

				&__item.category {
					.icon {
						width: 24px;
						height: 24px;
						margin-right: 15px;
					}

					.option {
						text-align: center;
					}
				}
			}
		}

		.transport {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 30rpx;
			padding: 15px 15px;
			margin-top: 10px;
			font-size: 12px;
			font-weight: bold;
			background-color: #fff;
			border-radius: 10px;

			.left {
				display: flex;
				align-items: center;

				.icon {
					width: 23px;
					height: 23px;
					margin-right: 15px;
				}

				.txt {
					text-align: center;
				}
			}

			.input {}
		}

		.submit_btn {
			padding: 20px 0;

			.btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: calc(100vw - 60rpx);
				height: 80rpx;
				color: #fff;
				font-size: 32rpx;
				font-weight: 500;
				letter-spacing: 4rpx;
				background: #ffc300;
				border: none;
				border-radius: 40rpx;
			}
		}
	}
</style>