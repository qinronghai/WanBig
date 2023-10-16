<template>
	<view class="register">
		<view class="top-bg"></view>
		<view class="contain">
			<view class="card">
				<view class="title">用户注册</view>
				<view class="user-wrap">
					<view class="avatar">
						<image :src="randomAvatarSrc" class="avatar-image" @load="onImageLoad" @error="onImageError">
						</image>
					</view>
					<view class="input-wrapper">
						<input @input="nickInput" :value="randomNickName" maxlength="30" placeholder-class="pache"
							placeholder="输入您的昵称" />
					</view>
					<button @click="randomAvatarAndName(true)">随机</button>
				</view>

				<!-- 学院与专业 -->
				<picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange"
					:value="multiIndex" :range="newArr">
					<view class="campus">
						<block v-if="multiIndex[0] !== -1">
							当前选择：{{ newArr[0][multiIndex[0]] }}--{{ newArr[1][multiIndex[1]] }}</block>
						<block v-if="multiIndex[0] == -1">请选择您的学院与专业</block>
						<image v-if="multiIndex[0] == -1" class="right" src="/static/images/right.png" />
					</view>
				</picker>
				<!-- <view class="contact">
					<input @input="emInput" :value="email" maxlength="30" placeholder-class="pache"
						placeholder="输入您的邮箱地址" />
				</view> -->
				<view class="contact">
					<input @input="wxInput" :value="wxnum" maxlength="30" placeholder-class="pache"
						placeholder="输入您的微信号" />
				</view>
				<view class="contact">
					<input type="number" @input="qqInput" :value="qqnum" maxlength="20" placeholder-class="pache"
						placeholder="输入您的QQ号" />
				</view>
				<view class="attention">
					⚠微信和QQ必填一个，以便买家联系您。
				</view>
			</view>
			<!-- 底部确认 -->
			<button class="confirm" open-type="getUserInfo" @getuserinfo="getUserInfo">注册并登录</button>
			<view class="shen_title">
				<image class="about" src="/static/images/about.png" />
				使用申明
			</view>
			<view class="des">1. 注册时，头像和昵称是本程序随机提供，登录后可在个人信息页面进行修改。</view>
			<view class="des">2. 请确保学院和专业百分百有效，之后将用于图书与专业的相匹配。</view>
			<view class="des">3. 在未经您同意及确认之前，本程序不会将您的注册信息用于任何其它商业目的。</view>
			<!-- <view class="des">3. 本程序将对您所提供的资料进行严格的管理及保护，本程序将使用相应的技术，防止您的个人资料丢失、被盗用或遭篡改。</view> -->
		</view>
	</view>
</template>

<script>
	const db = wx.cloud.database();
	const app = getApp();
	const config = require('../../config.js');
	import {
		getRandomNickname
	} from '../utils/randomNickName.js';
	import {
		request
	} from "../../async/index";
	export default {
		watch: {
			randomNickName(newVal, oldVal) {
				this.nickname = newVal;
			}
		},
		data() {
			return {
				ids: -1,
				nickname: '',
				wxnum: '',
				qqnum: '',
				email: '',
				campus: JSON.parse(config.data).campus,
				multiIndex: [-1, -1],
				multiIds: [], // 最终选择

				test: 1, // 辅助触发响应式

				// 最终选择
				newArr: [],

				userInfo: '',
				randomAvatarSrc: '', // 随机生成的头像 URL
				randomNickName: '' // 随机生成的昵称
			};
		}
		/*
		 * 生命周期函数--监听页面加载
		 */
		,
		mounted: function(options) {
			let state = {
				arr: [],
				arr1: [],
				arr2: [],
				multiIds: []
			};
			this.campus.map((v, vk) => {
				state.arr1.push(v.label);
				if (this.multiIndex[0] === vk) {
					state.multiIds[0] = v;
				}
				if (state.arr2.length <= 0) {
					v.children.map((c, ck) => {
						state.arr2.push(c.label);
						if (this.multiIndex[1] === ck) {
							state.multiIds[1] = c;
						}
					});
				}
			});
			state.arr[0] = state.arr1;
			state.arr[1] = state.arr2;
			this.setData({
				newArr: state.arr,
				multiIds: state.multiIds
			});

			// 随机头像和昵称
			uni.showLoading({
				title: "加载头像中",
				mask: true
			})

			uni.getImageInfo({
				src: "https://picsum.photos/46",
				success: (res) => {
					this.randomAvatarSrc = res.path;
					console.log('加载完成的图片 URL:', this.randomAvatarSrc);

				}
			});
			// this.randomAvatarSrc = "";
			this.randomNickName = getRandomNickname();
		},

		methods: {
			randomAvatarAndName(isName = true) {
				let randomParam = Math.floor(Math.random() * 400) + 1;
				console.log("点击了随机", randomParam);
				uni.showLoading({
					title: "加载头像中",
					mask: true
				})
				if (isName) {
					console.log("isName", isName);
					this.randomAvatarSrc = `https://picsum.photos/id/${randomParam}/46`;
					this.randomNickName = getRandomNickname();

				} else {
					randomParam = Math.floor(Math.random() * 400) + 1;
					this.randomAvatarSrc = `https://picsum.photos/id/${randomParam}/46`;
				}
			},

			onImageLoad(e) {
				console.log("图片加载完成", e);
				uni.getImageInfo({
					src: this.randomAvatarSrc,
					success: (res) => {
						this.randomAvatarSrc = res.path;
						console.log('加载完成的图片 URL:', this.randomAvatarSrc);
					}
				});
				uni.hideLoading()
			},
			onImageError(e) {
				console.log("图片加载出错", e);
				this.randomAvatarAndName(false);
			},
			bindMultiPickerChange(e) {
				console.log(this.multiIds, "test1", this.multiIndex);
			},

			bindMultiPickerColumnChange(e) {
				let data = {
					newArr: this.newArr,
					multiIndex: this.multiIndex,
					multiIds: this.multiIds
				};
				data.multiIndex[e.detail.column] = e.detail.value;

				let searchColumn = () => {
					let arr1 = [];
					this.campus.map((item, index) => {
						if (data.multiIndex[0] === index) {
							data.multiIds[0] = {
								...item
							};
							item.children.map((c, ck) => {
								arr1.push(c.label);
								if (data.multiIndex[1] === ck) {
									data.multiIds[1] = {
										...c
									};
								}
							});
						}
					});

					data.newArr[1] = arr1;
				};
				switch (e.detail.column) {
					case 0:
						// 每次切换还原初始值
						data.multiIndex[1] = 0;
						// 执行函数处理
						searchColumn();
						break;
					case 1:
						searchColumn();
						break;
				}
				console.log('data-======', data);
				this.setData(data);
				this.test = this.test + 1;

			},

			nickInput(e) {
				this.nickname = e.detail.value;
			},

			wxInput(e) {
				this.wxnum = e.detail.value;
			},

			qqInput(e) {
				this.qqnum = e.detail.value;
			},

			emInput(e) {
				this.email = e.detail.value;
			},

			async getUserInfo(e) {
				let that = this;
				console.log(e);
				let test = e.detail.errMsg.indexOf('ok');
				if (test == '-1') {
					uni.showToast({
						title: '请授权后方可使用',
						icon: 'none',
						duration: 2000
					});
				} else {
					console.log("first", this.userInfo);
					await that.setData({
						userInfo: e.detail.userInfo
					});

					that.check();
				}
			},

			//校检
			async check() {
				let that = this;
				// 校验用户昵称
				let nickname = that.nickname;
				console.log("校验昵称", nickname);
				if (nickname === '') {
					uni.showToast({
						title: "请先输入您的昵称",
						icon: 'none',
						duration: 2000
					})
					return false;
				}

				// 处理头像和昵称
				this.userInfo.avatarUrl = this.randomAvatarSrc;
				this.userInfo.nickName = this.nickname;

				//校检学院与专业
				let multiIds = that.multiIds;
				if (multiIds.length === 0) {
					uni.showToast({
						title: '请先选择您的学院与专业',
						icon: 'none',
						duration: 2000
					});
					return false;
				}

				// qq和微信号必填其一检查
				let qqnum = that.qqnum;
				let wxnum = that.wxnum;

				if (qqnum === '' && wxnum === '') {
					uni.showToast({
						title: 'QQ和微信必填一个哦',
						icon: 'none',
						duration: 2000
					});
					return false;
				}

				if (qqnum !== '') {
					if (!/^[1-9][0-9]{4,9}$/.test(qqnum)) {
						uni.showToast({
							title: '请输入正确QQ号',
							icon: 'none',
							duration: 2000
						});
						return false;
					}
				}

				if (wxnum !== '') {
					if (!/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(wxnum)) {
						uni.showToast({
							title: '请输入正确微信号',
							icon: 'none',
							duration: 2000
						});
						return false;
					}
				}
				console.log("检查完毕，提交---", this.randomAvatarSrc)
				uni.showLoading({
					title: '正在提交'
				});
				// 上传头像到数据库
				await request(this.randomAvatarSrc, "avatar/").then(result => {
					if (result.statusCode === 204) {
						console.log("上传头像成功", result);
						// 将头像的临时路径替换成服务器存储链接
						that.userInfo.avatarUrl = result.fileID;
						// 进行注册用户
						db.collection('user').add({
							data: {
								qqnum: that.qqnum,
								wxnum: that.wxnum,
								stamp: new Date().getTime(),
								info: that.userInfo,
								useful: true,
								parse: 0,
								// 添加字段 学院与专业
								college: {
									id: that.multiIds[0].id,
									name: that.multiIds[0].label
								},
								profession: {
									id: that.multiIds[1].id,
									name: that.multiIds[1].label
								},
								// 添加商品字段
								dealNum: 0,
								goodsNum: 0,
								isAuditor: false,
								vip: false
							},
							success: function(res) {
								console.log(res);
								db.collection('user')
									.doc(res._id)
									.get({
										success: function(res) {
											uni.setStorageSync("userInfo", res.data);
											uni.setStorageSync("openid", res.data._openid);
											uni.setStorageSync("isRegister", true);
											console.log("注册成功")
											uni.navigateBack({
												delta: 1 // 返回的页面数，1表示返回上一个页面
											});
										}
									});
							},

							fail() {
								uni.hideLoading();
								uni.showToast({
									title: '注册失败，请重新提交',
									icon: 'none'
								});
							}
						});
					}


				})

			}
		}
	};
</script>
<style>
	.register {
		height: 100vh;
	}

	.top-bg {
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 500rpx;
		background-image: linear-gradient(to bottom, #ffc300, transparent);
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.contain {
		position: absolute;
		top: 140rpx;
		left: 0rpx;
		box-sizing: border-box;
		width: 100%;
		padding: 0rpx 40rpx 0rpx 40rpx;
	}

	.card {
		box-sizing: border-box;
		width: 100%;
		padding: 50rpx 60rpx;
		background: #fff;
		box-shadow: 0 0 20rpx #eee;
		border-radius: 32rpx;
	}

	.title {
		width: 100%;
		margin-bottom: 30rpx;
		font-size: 40rpx;
		font-weight: 600;
		letter-spacing: 6rpx;
		text-align: center;
	}

	.phone {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: 92rpx;
		padding: 0 20rpx 0 36rpx;
		margin-top: 45rpx;
		color: #8c9aa8;
		font-size: 32rpx;
		text-align: left;
		background: #f1f3f8;
		border: none;
		border-radius: 10rpx;
	}

	.phone::after {
		border: none;
	}

	.campus {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: 92rpx;
		padding: 0 20rpx 0 36rpx;
		margin-top: 24rpx;
		color: #8c9aa8;
		font-size: 32rpx;
		text-align: left;
		background: #f1f3f8;
		border-radius: 10rpx;
	}

	.right {
		width: 30rpx;
		height: 30rpx;
	}

	.contact {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: 92rpx;
		padding: 0 36rpx;
		margin-top: 24rpx;
		color: #8c9aa8;
		font-size: 32rpx;
		text-align: left;
		background: #f1f3f8;
		border-radius: 10rpx;
	}

	.user-wrap {
		display: flex;
		align-items: center;

	}

	.user-wrap button {
		width: 64px;
		height: 46px;
		background-color: #f1f3f8;

		font-size: 32rpx;
		line-height: 46px;


	}

	.avatar {
		overflow: hidden;
		width: 45.5px;
		height: 45.5px;
		margin-right: 10px;
		margin-right: 25rpx;
		background-color: #f1f3f8;
		border-radius: 10rpx;
	}

	.avatar-image {
		width: 100%;
		height: 100%;
	}

	.input-wrapper {
		width: 285rpx;
		height: 96rpx;

		background: #f1f3f8;
		border-radius: 10rpx;
	}

	.input-wrapper input {
		height: 100%;
		padding-left: 30rpx;
	}

	.contact input {
		width: 100%;
		height: 100%;
	}

	.pache {
		color: #8c9aa8;
		font-size: 32rpx;
	}

	.confirm {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100rpx;
		margin-top: 50rpx;
		color: #fff;
		font-size: 40rpx;
		letter-spacing: 4rpx;
		background: linear-gradient(#fae74e, #ffc300);
		box-shadow: 0 0 20rpx #eee;
		border: none;
		border-radius: 60rpx;
	}

	.confirm::after {
		border: none;
	}

	.shen_title {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 40rpx;
		font-size: 32rpx;
		letter-spacing: 2rpx;
	}

	.about {
		width: 32rpx;
		height: 32rpx;
		padding-right: 10rpx;
	}

	.des {
		padding-top: 20rpx;
		padding-left: 30rpx;
		color: #acacac;
		font-size: 26rpx;
		line-height: 42rpx;
		letter-spacing: 2rpx;
	}

	/* 新增 */
	.attention {
		display: flex;
		align-items: top;
		margin-top: 10px;
		font-size: 26rpx;
		/* color: #f9f9f9; */
	}

	.attention .about {}
</style>
