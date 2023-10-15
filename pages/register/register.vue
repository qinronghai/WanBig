<template>
	<view class="register">
		<view class="top-bg"></view>
		<view class="contain">
			<view class="card">
				<view class="title">登记注册</view>
				<view class="user-wrap">
					<view class="avatar">
						<image :src="randomAvatarSrc" class="avatar-image" @load="onImageLoad" @error="onImageError">
						</image>
					</view>
					<view class="input-wrapper">
						<input @input="phInput" :value="randomNickName" maxlength="30" placeholder-class="pache"
							placeholder="输入您的昵称" />
					</view>
					<button type="default" @click="randomAvatarAndName(true)">随机头像</button>
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
					⚠ ️微信号和QQ号必填一个，以便买家联系您。
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
	export default {
		data() {
			return {
				ids: -1,
				phone: '',
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
			this.randomAvatarSrc = "https://picsum.photos/46";
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

			phInput(e) {
				this.phone = e.detail.value;
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

			getUserInfo(e) {
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
					that.setData({
						userInfo: e.detail.userInfo
					});
					that.check();
				}
			},

			//校检
			check() {
				let that = this;
				//校检手机
				let phone = that.phone;
				if (phone == '') {
					uni.showToast({
						title: '请先获取您的电话',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				//校检校区
				let ids = that.ids;
				let campus = that.campus;
				if (ids == -1) {
					uni.showToast({
						title: '请先获取您的校区',
						icon: 'none',
						duration: 2000
					});
				}
				//校检邮箱
				let email = that.email;
				if (!/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(email)) {
					uni.showToast({
						title: '请输入常用邮箱',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				//校检QQ号
				let qqnum = that.qqnum;
				if (qqnum !== '') {
					if (!/^\s*[.0-9]{5,11}\s*$/.test(qqnum)) {
						uni.showToast({
							title: '请输入正确QQ号',
							icon: 'none',
							duration: 2000
						});
						return false;
					}
				}
				//校检微信号
				let wxnum = that.wxnum;
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
				uni.showLoading({
					title: '正在提交'
				});
				db.collection('user').add({
					data: {
						phone: that.phone,
						qqnum: that.qqnum,
						email: that.email,
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
						}
					},
					success: function(res) {
						console.log(res);
						db.collection('user')
							.doc(res._id)
							.get({
								success: function(res) {
									app.globalData.userinfo = res.data;
									app.globalData.openid = res.data._openid;
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
		background-repeat: no-repeat;
		background-size: 100%;
		background-image: linear-gradient(to bottom, #ffc300, transparent);
	}

	.contain {
		position: absolute;
		top: 140rpx;
		left: 0rpx;
		width: 100%;
		padding: 0rpx 40rpx 0rpx 40rpx;
		box-sizing: border-box;
	}

	.card {
		border-radius: 32rpx;
		width: 100%;
		background: #fff;
		padding: 50rpx 60rpx;
		box-sizing: border-box;
		box-shadow: 0 0 20rpx #eee;
	}

	.title {
		width: 100%;
		text-align: center;
		font-size: 40rpx;
		font-weight: 600;
		letter-spacing: 6rpx;
		margin-bottom: 30rpx;
	}

	.phone {
		justify-content: space-between;
		margin-top: 45rpx;
		width: 100%;
		height: 92rpx;
		background: #f1f3f8;
		border-radius: 10rpx;
		text-align: left;
		padding: 0 20rpx 0 36rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		color: #8c9aa8;
		border: none;
	}

	.phone::after {
		border: none;
	}

	.campus {
		margin-top: 24rpx;
		width: 100%;
		height: 92rpx;
		background: #f1f3f8;
		border-radius: 10rpx;
		text-align: left;
		padding: 0 20rpx 0 36rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #8c9aa8;
	}

	.right {
		width: 30rpx;
		height: 30rpx;
	}

	.contact {
		margin-top: 24rpx;
		width: 100%;
		height: 92rpx;
		background: #f1f3f8;
		border-radius: 10rpx;
		text-align: left;
		padding: 0 36rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #8c9aa8;
	}

	.user-wrap {
		display: flex;
		align-items: center;
	}

	.user-wrap button {
		background-color: #f1f3f8;
		border: 0px;
		width: 64px;
		height: 46px;
	}

	.avatar {
		width: 45.5px;
		height: 45.5px;
		border-radius: 10rpx;
		overflow: hidden;
		margin-right: 10px;
		background-color: #f1f3f8;
		margin-right: 25rpx;
	}

	.avatar-image {
		width: 100%;
		height: 100%;
	}

	.input-wrapper {
		width: 285rpx;
		color: #8c9aa8;
		background: #f1f3f8;
		height: 96rpx;
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
		font-size: 32rpx;
		color: #8c9aa8;
	}

	.confirm {
		margin-top: 50rpx;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(#fae74e, #ffc300);
		border-radius: 60rpx;
		color: #fff;
		font-size: 40rpx;
		letter-spacing: 4rpx;
		box-shadow: 0 0 20rpx #eee;
		border: none;
	}

	.confirm::after {
		border: none;
	}

	.shen_title {
		margin-top: 40rpx;
		font-size: 32rpx;
		letter-spacing: 2rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.about {
		width: 32rpx;
		height: 32rpx;
		padding-right: 10rpx;
	}

	.des {
		padding-left: 30rpx;
		padding-top: 20rpx;
		font-size: 26rpx;
		color: #acacac;
		letter-spacing: 2rpx;
		line-height: 42rpx;
	}

	/* 新增 */
	.attention {
		margin-top: 10px;
		display: flex;
		align-items: top;
		font-size: 26rpx;
		/* color: #f9f9f9; */

	}

	.attention .about {}
</style>
