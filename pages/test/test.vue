<template>
	<view>
		<button type="primary" @click="deleteUserData">
			删除用户数据
		</button>

		<button type="default" @click="addBooks('9787121181184')">根据isbn获取图书数据</button>

		<van-stepper :value="price" integer @change="priceChange" min="1" max="100" />

		<button @click="test">测试uni异步化</button>

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
				price: 15
			}
		},
		methods: {
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
								success: function(res) {
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

<style>

</style>