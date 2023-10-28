<template>
	<view>
		<button type="primary" @click="deleteUserData">
			删除用户数据
		</button>

		<button type="default" @click="addBooks('9787121181184')">根据isbn获取图书数据</button>

		<van-stepper :value="price" integer @change="priceChange" min="1" max="100" />

		<button @click="test">测试uni异步化</button>
		<button @click="check">测试检测登录</button>
		<input v-model="text" placeholder="请输入文本" placeholder-class="input-placeholder" @blur="onChangeInput" />

		<!-- 轮播图+点击预览图片 -->
		<swiper class="swiper" circular indicator-dots autoplay interval="3000" :duration="800">
			<swiper-item v-for="(pic, index) in goodpics" :key="index" @tap="previewImage(goodpics)">
				<view class="swiper-item uni-bg-red">
					<image :src="pic.url" mode="widthFix" />
				</view>
			</swiper-item>

		</swiper>

		<!-- 成色和品质标签 -->
		<view class="tags">
			<uni-tag text="全新" type="success"></uni-tag>
			<uni-tag text="健身器材" type="warning"></uni-tag>

		</view>

	</view>
</template>

<script>
const db = wx.cloud.database();
const _ = db.command;
import VanStepper from "../../wxcomponents/vant/stepper/index";

export default {
	components: {

		VanStepper
	},
	data() {
		return {
			price: 15,
			text: '',
			background: ['color1', 'color2', 'color3'],

			goodpics: [{ url: 'cloud://qrh-database01-5gz9zkuedd28e7fc.7172-qrh-database01-5gz9zkuedd28e7fc-1313188449/good-pictures/1698301471557-764' }, { url: 'cloud://qrh-database01-5gz9zkuedd28e7fc.7172-qrh-database01-5gz9zkuedd28e7fc-1313188449/good-pictures/1698301471560-97' }]
		}
	},
	methods: {
		// 预览图片
		previewImage(goodpics) {
			const urls = goodpics.map(pic => pic.url);
			uni.previewImage({
				urls: urls,
			})
		},
		// 文本测试检测
		async onChangeInput(e) {

			console.log(e)
			const text = e.detail.value.toString();
			uni.showLoading({
				title: '文本合法性检测中',

				mask: true
			})

			await wx.cloud.callFunction({
				name: 'msgcheck',
				data: {
					content: text,
					openid: uni.getStorageSync('openid')
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
			})
		},

		// check
		check() {
			this.$checkRegisterStatus();
		},
		//价格输入改变
		priceChange(e) {
			console.log(e);
			console.log(this.price);
		},
		async deleteUserData() {
			db.collection("user-info").get().then(res => {
				console.log("最新用户数据", res);
			})
		},


		async test() {
			// 1. 获取用户信息
			let userInfo = uni.getStorageSync('userInfo');
			let _this = this;
			// 2. 判断用户是否存在
			try {
				if (!userInfo.info) {
					const showModalRes = await this.$uniAsync.showModal({
						title: '提示',
						content: '您还未登录，请登录之后，再提交审核',
					})

					if (showModalRes.confirm) {
						console.log('用户点击确定')
						uni.switchTab({
							url: '/pages/my-copy/my'
						});
					} else if (showModalRes.cancel) {
						console.log('用户点击取消')
					}
				} else {
					console.log("用户已注册");
					// this.openid = uni.getStorageSync('openid');
					// await this.$uniAsync.showModal({
					// 	title: '提示',
					// 	content: '确定要提交审核吗？',
					// 	async success(res) {
					// 		if (res.confirm) {
					// 			console.log('用户点击确定')
					// 			// 让卖家订阅消息
					// 			await _this.subscribNews();

					// 		} else if (res.cancel) {
					// 			console.log('用户点击取消')
					// 		}
					// 	}
					// })
				}
			} catch (e) {
				//TODO handle the exception
				console.log(e, "错误！！！");
			}
		},

		async getBookData(isbn) {
			let _this = this;
			console.log("get book data");
			// uni.request({
			// 	url: 'http://www.bookschina.com/ashx/AdvancedSearch.ashx',
			// 	method: 'GET',
			// 	data: {
			// 		isSpecial: false,
			// 		isbn: '9787563553075',
			// 		pageIndex: 1,
			// 		reverse: true,
			// 		sort: 0
			// 	},
			// 	header: {
			// 		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
			// 		'Accept': '*/*',
			// 		'Host': 'www.bookschina.com',
			// 		'Connection': 'keep-alive',
			// 		'content-type': 'application/x-www-form-urlencoded'

			// 	},

			// 	success: function(res) {
			// 		console.log(res.data.BookInfoEntityList);
			// 	},
			// 	fail: function(error) {
			// 		console.log(error);
			// 	}
			// });
			wx.cloud.callFunction({
				name: 'books2',
				data: {
					$url: 'bookinfo',
					//云函数路由参数
					isbn: 9787121181184
				},
				success: (res1) => {
					// 无法请求该图书信息
					if (res1.result.body.BookInfoEntityList.length === 0) {
						console.log("无法请求该图书信息");
					}
					console.log("books2云函数测试打印", res1);
					let bookInfo = res1.result.body && res1.result.body.BookInfoEntityList[0];
					if (bookInfo) {
						console.log(bookInfo.AUTHOR_NAME);
						// 解构映射字段
						const {
							AUTHOR_NAME: author,
							BOOK_COVER: pic,
							BOOK_PRICE: price,
							PUBLISH_DATE: pubdate,
							PUBLISH_NAME: publisher,
							BOOK_NAME: title,
							BookIntro: summary,
							Categoryname: keyword
						} = bookInfo;

						bookInfo = {
							author,
							pic: "http:" + pic,
							price,
							pubdate: pubdate.slice(0, 7),
							publisher,
							title,
							summary,
							keyword
						}
						console.log('整理后的值', bookInfo);
						db.collection("books").add({
							data: bookInfo,
							success: function (res) {
								_this.setData({
									bookInfo,
								});
								console.log("上传数据库", res);
							},
							fail: (err) => {
								console.error(err);
							}
						})


					} else {
						console.log(bookInfo, "bookInfo 无值");
					}



					// 添加到数据库


				},
				fail: (err) => {
					console.error(err);
				}
			});
			console.log("----------");

		},

		/* async addbooks(isbn) {
			let _this = this;
			wx.cloud.callFunction({
				name: 'books2',
				data: {
					$url: 'bookinfo',
					//云函数路由参数
					isbn: isbn
				},
				success: (res1) => {
					let bookInfo = res1.result.body && res1.result.body.BookInfoEntityList[0];
					// 无法请求该图书信息
					if (bookInfo && !bookInfo.length === 0) {
						// 解构赋值映射字段
						const {
							AUTHOR_NAME: author,
							BOOK_COVER: pic,
							BOOK_PRICE: price,
							PUBLISH_DATE: pubdate,
							PUBLISH_NAME: publisher,
							BOOK_NAME: title,
							BookIntro: summary,
							Categoryname: keyword
						} = bookInfo;
						
						bookInfo = {
							author,
							pic: "http:" + pic,
							price,
							pubdate: pubdate.slice(0, 7),
							publisher,
							title,
							summary,
							keyword
						}
						console.log('整理后的值', bookInfo);
						// 添加到数据库books集合
						db.collection("books").add({
							data: bookInfo,
							success: function(res) {
								_this.setData({
									bookInfo,
									show_a: false,
									show_b: true,
									show_c: false,
									active: 1
								});
								uni.hideLoading();
							},
							fail: (err) => {
								console.error(err);
							}
						})
					}
				},
				fail: (err) => {
					console.error(err);
				}
			});
		} */

		async addBooks(isbn) {
			try {
				const res1 = await wx.cloud.callFunction({
					name: 'books2',
					data: {
						$url: 'bookinfo',
						isbn: isbn
					}
				});
				console.log(res1, "yun res1");

				const bookInfo = res1.result.body && res1.result.body.BookInfoEntityList[0];

				if (bookInfo && Object.keys(bookInfo).length !== 0) {
					const {
						AUTHOR_NAME: author,
						BOOK_COVER: pic,
						BOOK_PRICE: price,
						PUBLISH_DATE: pubdate,
						PUBLISH_NAME: publisher,
						BOOK_NAME: title,
						BookIntro: summary,
						Categoryname: keyword
					} = bookInfo;

					const formattedBookInfo = {
						author,
						pic: "http:" + pic,
						price,
						pubdate: pubdate.slice(0, 7),
						publisher,
						title,
						summary,
						keyword
					};

					console.log('整理后的值', formattedBookInfo);

					const res = await db.collection("books").add({
						data: formattedBookInfo
					});

					this.setData({
						bookInfo: formattedBookInfo,
						show_a: false,
						show_b: true,
						show_c: false,
						active: 1
					});

					uni.hideLoading();
				}
			} catch (err) {
				console.log(err);
			}
		}
	}
}
</script>

<style></style>