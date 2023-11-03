<template>
	<view style="height: 100%">
		<view class="top_contain">
			<view class="des_contain">
				<view class="tui-msg-right">
					<tui-tag @tap.native="chooseimgae" size="small" tui-tag-class="tui-mrbtm">更换聊天背景</tui-tag>
				</view>
				<view class="name">{{ haoyouinfo.userInfo.info.nickName }}</view>
				<view class="sign">{{ haoyouinfo.userInfo.country }}</view>
			</view>
			<view class="avator_box">
				<image class="avator" :src="haoyouinfo.userInfo.info.avatarUrl"></image>
			</view>
		</view>
		<view class="contain">
			<view class="title">系统备注</view>
			<view class="description">
				<text space="emsp" :decode="true">{{ des }}</text>
				<image @tap="preview" src="https://636f-code-test-1301231348.tcb.qcloud.la/qrode.png"></image>
			</view>
			<view class="title">联系方式</view>
			<view class="description">
				<view class="tip" @tap="copy" data-copy="一只拒绝穿格子衫的程序猿" data-name="一只拒绝穿格子衫的程序猿">
					<view>公众号</view>
					:
					<text>一只拒绝穿格子衫的程序猿</text>
				</view>
				<view class="tip" @tap="copy" data-copy="一只拒绝穿格子衫的程序猿" data-name="性别">
					<view>城市</view>
					:
					<text>{{ haoyouinfo.userInfo.province }}</text>
				</view>
				<view class="tip" @tap="copy" data-copy="1666666666" data-name="微信号">
					<view>微信号</view>
					:
					<text>1666666666</text>
				</view>
			</view>

			<button @tap="chat">点击进行聊天</button>
		</view>
	</view>
</template>

<script>
	import tuiTag from '../components/tag/tag';
	const app = getApp();
	// pages/about/about.js
	export default {
		components: {
			tuiTag
		},
		data() {
			return {
				imgList: [],
				backgroundimage: '',
				des: '欢迎关注公众号【一只拒绝穿格子衫的程序猿】 回复 【仿微信】 获取源代码',

				haoyouinfo: {
					userInfo: {
						nickName: '',
						country: '',
						avatarUrl: '',
						province: ''
					}
				},

				chatid: '',
				chatname: '',
				backgroundimage1: ''
			};
		},
		onLoad: function(options) {
			let haoyouinfo1 = JSON.parse(options.haoyouinfo);
			this.setData({
				haoyouinfo: haoyouinfo1
			});
			console.log(this.haoyouinfo);
		},
		methods: {
			preview() {
				uni.previewImage({
					current: 'https://636f-code-test-1301231348.tcb.qcloud.la/qrode.png',
					urls: ['https://636f-code-test-1301231348.tcb.qcloud.la/qrode.png']
				});
			},

			//复制
			copy(e) {
				uni.setClipboardData({
					data: e.currentTarget.dataset.copy,
					success: (res) => {
						uni.showToast({
							title: '复制' + e.currentTarget.dataset.name + '成功',
							icon: 'success',
							duration: 1000
						});
					}
				});
			},

			chat() {
				let that = this;
				if (!this.backgroundimage1) {
					//就证明没有更换图片
					that.setData({
						//这个id就唯一标识这个好友
						chatid: that.haoyouinfo.id,
						chatname: that.haoyouinfo.userInfo.info.nickName,
						backgroundimage: that.haoyouinfo.backgroundimage
					});
				} else {
					that.setData({
						//这个id就唯一标识这个好友
						chatid: that.haoyouinfo.id,
						chatname: that.haoyouinfo.userInfo.nickName,
						backgroundimage: that.backgroundimage1
					});
				}

				// wx.navigateTo({
				//   url: '/pages/example/chatroom_example/room/room?id=' + that.data.chatid + '&name=' + that.data.chatname+'&backgroundimage='+that.data.backgroundimage+'&haoyou_openid='+that.data.haoyouinfo._openid,
				// })
				let lessonSubId = 'wP0DrgBo_CKL51uA2QYFRJS-_IMnLUMWataPkALuw6s';
				//调用订阅消息提醒
				// 如果开启这个订阅消息提醒，否则就不提醒
				if (app.globalData.useTmp) {
					uni.requestSubscribeMessage({
						tmplIds: [lessonSubId],
						//这个是微信平台申请的 id
						success: (res) => {
							console.log(res);
							console.log(res[lessonSubId]);
							if (res[lessonSubId] == 'accept') {
								console.log('接受订阅申请');
								uni.navigateTo({
									url: '/pages/example/chatroom_example/room/room?id=' +
										that.chatid +
										'&name=' +
										that.chatname +
										'&backgroundimage=' +
										that.backgroundimage +
										'&haoyou_openid=' +
										that.haoyouinfo._openid
								});
							} else if (res[lessonSubId] == 'reject') {
								console.log('拒绝接受订阅申请');
							}
						},
						fail(res) {
							console.log(res);
						}
					});
				} else {
					uni.navigateTo({
						url: '/pages/chat-room/chat-room?id=' +
							that.chatid +
							'&name=' +
							that.chatname +
							'&backgroundimage=' +
							that.backgroundimage +
							'&haoyou_openid=' +
							that.haoyouinfo._openid
					});
				}
			},

			chooseimgae() {
				this.setData({
					imgList: []
				});
				uni.chooseImage({
					count: 1,
					//默认9
					sizeType: ['original', 'compressed'],
					//可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'],
					//从相册选择
					success: (res) => {
						uni.showLoading({
							title: '上传中'
						});
						console.log(res);
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							const filePath = res.tempFilePaths[i];
							const cloudPath = `好友聊天背景` + `/${new Date().getTime()} ` + filePath.match(/\.[^.]+?$/)[0];
							wx.cloud.uploadFile({
								cloudPath,
								filePath,
								success: (res) => {
									console.log('[上传文件] 成功：', res);
									console.log(res);
									this.setData({
										imgList: this.imgList.concat(res.fileID)
									});
									wx.cloud.callFunction({
										name: 'yunrouter',
										data: {
											$url: 'upadatebackground',
											//云函数路由参数
											pic: this.imgList[0],
											haoyouopenid: this.haoyouinfo._openid
										},
										success: (res) => {
											console.log(res);
											//至空
											this.setData({
												backgroundimage1: this.imgList[0]
											});
										},
										fail(e) {
											console.log(e);
										}
									});
								},
								fail: (e) => {
									console.error('[上传文件] 失败：', e);
									uni.showToast({
										icon: 'none',
										title: '上传失败'
									});
								},
								complete: () => {
									uni.hideToast();
									uni.hideLoading();
								}
							});
						}
					},
					fail: (e) => {
						console.error(e);
					}
				});
			}
		}
	};
</script>
<style>
	page {
		background: #eee;
	}

	.top_contain {
		position: relative;
		display: flex;
		justify-content: flex-end;
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx 36rpx 30rpx 0;
		background: #fbbd08;
	}

	.des_contain {
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-sizing: border-box;
		width: 618rpx;
		height: 157rpx;
		padding: 0 0 0 90rpx;
		background: #fff;
		border-radius: 10rpx;
	}

	.name {
		font-size: 36rpx;
		line-height: 50rpx;
	}

	.name1 {
		right: 0;
		display: flex;
		font-size: 36rpx;
		line-height: 50rpx;
	}

	.tui-msg-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		margin-left: auto;
		text-align: right;
	}

	.tui-msg-right.tui-right-dot {
		height: 76rpx;
		padding-bottom: 10rpx;
	}

	.tui-msg-time {
		width: 100%;
		color: #9397a4;
		font-size: 14px;
		line-height: 24rpx;
	}

	.sign {
		margin-top: 10rpx;
		color: #b8b8b8;
		font-size: 28rpx;
		line-height: 45rpx;
		letter-spacing: 3rpx;
	}

	.avator_box {
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		display: flex;
		padding: 44rpx 0 0 40rpx;
	}

	.avator {
		width: 110rpx;
		height: 110rpx;
		box-shadow: 0 0 10rpx #b8b8b8;
		border-radius: 20rpx;
	}

	.contain {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		padding: 0 20rpx;
		background: #eee;
	}

	.title {
		padding-left: 20rpx;
		margin-top: 20rpx;
		color: #000;
		font-size: 32rpx;
		line-height: 56rpx;
		letter-spacing: 3rpx;
	}

	.description {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		padding: 24rpx 30rpx;
		background: #fff;
		border-radius: 10rpx;
	}

	.description text {
		width: 100%;
		font-size: 28rpx;
		line-height: 44rpx;
		letter-spacing: 3rpx;
	}

	.tip {
		display: flex;
		align-items: center;
	}

	.tip view {
		display: flex;
		justify-content: space-between;
		width: 150rpx;
		padding: 15rpx 0;
		font-size: 30rpx;
		letter-spacing: 2rpx;
	}

	.tip text {
		margin-left: 20rpx;
		color: #008ecf;
		font-size: 28rpx;

		text-decoration-line: underline;
	}
</style>