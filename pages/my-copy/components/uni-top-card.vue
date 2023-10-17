<template>
	<div class="wrap">

		<!--个人信息  -->
		<div class="top-person-info">
			<div class="left" v-on:click="login">
				<image :src="showAvatar ? avatarUrl : defaultAvatar" mode="aspectFill" class="left-avatar"></image>
				<div class="left-name-id">
					<div class="name">{{ nickName }}</div>
					<view class="login-tip">{{ !showAvatar ? "快速登录，体验所有功能" : "当前积分：" + integral }}</view>

				</div>
			</div>

			<van-popup :show="showLogin" round position="bottom" custom-style="height: 40%" @close="onCloseLogin" closeable>
				<div class="login">
					<h1 class="title">湾大闲置品小铺欢迎你~</h1>
					<div class="btn-login">
						<button class="btn" v-on:click="clickOneLogin">微信一键登录</button>
					</div>
					<div class="no-login" v-on:click="clickNoLogin">暂不登录</div>
					<div class="tip">—— 登录即同意我们的《用户协议》——</div>
				</div>
			</van-popup>
			<div class="right">
				<div class="label vip" v-if="userInfo.vip">
					<image class="label__icon vip" src="../../../static/goods-detail/vip.svg" mode="" />
					<span class="vip__txt">vip</span>
				</div>
				<div class="label auditor" v-if="userInfo.isAuditor">
					<image class="label__icon" src="../../../static/goods-detail/auditor.svg" mode="" />
					<span class="auditor__txt">审核员</span>
				</div>
				<div class="label deal-num" v-if="userInfo.dealNum > 0">
					<image class="label__icon" src="../../../static/goods-detail/deal.svg" mode="" />
					<span class="deal-num__txt">已成交{{ userInfo.dealNum }}</span>
					<!-- TODO 用户发布一个商品就需要更新其用户信息中的已成交数量 -->
				</div>
			</div>
		</div>

		<!-- 项目信息 -->
		<!-- <div class="bottom-project-info">
			<div class="item__to" @click="isAuditor">
				<div class="txt">审核员专属</div>
				<div class="icon">
					<van-icon name="arrow" />
				</div>
			</div>
			<div class="item__to" @click="toProjectPage">
				<div class="txt">了解本项目</div>
				<div class="icon">
					<van-icon name="arrow" />
				</div>
			</div>
		</div> -->



	</div>
</template>

<script>
import VanIcon from '../../../wxcomponents/vant/icon'
import VanSkeleton from '../../../wxcomponents/vant/skeleton/index.js'
const db = wx.cloud.database()
export default {
	components: {
		VanIcon,
		VanSkeleton
	},
	data() {
		return {
			showLogin: false,
			nickName: '',
			avatarUrl: '',
			Auditor: '',
			userInfo: {},

			showAvatar: false,
			defaultAvatar: "../../../static/images/avator.png",
			integral: 0
		}
	},
	mounted() {
		// this.loading = true;
		// 1. 获取全局openid
		let openid = uni.getStorageSync('openid');
		// 判断用户是否注册过
		if (uni.getStorageSync('isRegister')) {
			// 已注册

			this.userInfo = uni.getStorageSync('userInfo');

			this.renderPage(this.userInfo.info.nickName, this.userInfo.info.avatarUrl)
		} else {
			console.log('数据库中--无该用户的信息')
			// 弹窗“一键登录”，获取信息存入缓存中并渲染页面
			this.login()
		}

		//this.judgeUserInDatabase(openid);
		console.log("登录启动")
	},
	methods: {
		toProjectPage() {
			uni.navigateTo({
				url: '/pages/project-info/project-info'
			})
		},
		login() {
			// console.log('弹窗一键登录')
			// this.showLogin = true

			// 判断是否注册过
			if (!uni.getStorageSync('isRegister')) {

				uni.navigateTo({
					url: '/pages/register/register'
				})
			}
		},
		// 点击一键登录
		clickOneLogin() {
			let _this = this
			wx.getSetting({
				success(res) {
					if (res.authSetting['scope.userInfo']) {
						wx.getUserProfile({
							desc: '登录',
							success: res => {
								// 定义一个新的用户对象
								let userInfo = {
									nickName: '',
									avatarUrl: '',
									dealNum: 0,
									goodsNum: 0,
									isAuditor: false,
									vip: false
								};
								// 取返回的头像和名字
								userInfo.nickName = res.userInfo.nickName;
								userInfo.avatarUrl = res.userInfo.avatarUrl;

								console.log('初始化用户信息', userInfo);
								// 用户信息存入缓存中
								// uni.setStorageSync('userInfo', userInfo);

								_this.renderPage(userInfo.nickName, userInfo.avatarUrl)
								_this.userInfo = userInfo;
								// 存入数据库
								db.collection('user')
									.add({
										data: {
											nickName: userInfo.nickName,
											avatarUrl: userInfo.avatarUrl,
											// 给每个新用户的标签初始化
											vip: false,
											isAuditor: false,
											dealNum: 0,
											// 发布的商品数量
											goodsNum: 0,
										}
									})
									.then(async res => {
										console.log('将用户信息--存入数据库--成功');
										// 注册成功后，重新获取最新的用户信息（拿到_id和_openid）
										// 获取最新的用户数据
										let userInfo = await _this.getUserInfo();
										uni.setStorageSync('userInfo', userInfo)
										uni.setStorageSync('isRegister', true);


									})
							},
							fail: res => {
								console.log('登录失败', res);
							}
						})
					}
				}
			})
		},
		// 点击了暂不登录
		clickNoLogin() {
			this.showLogin = false
			console.log('用户点击了暂不登录')
		},
		// 关闭登录框
		onCloseLogin() {
			this.showLogin = false
		},

		//渲染页面
		renderPage(nickName = '点击登录', avatarUrl) {
			this.showLogin = false
			this.nickName = nickName
			this.avatarUrl = avatarUrl
			this.showAvatar = true
		},
		async getUserInfo() {
			try {
				const res = await db.collection('user').where({
					_openid: uni.getStorageSync('openid')
				}).get();

				console.log('获取最新的用户数据', res);

				if (res.data.length > 0) {
					console.log("heello")
					return res.data[0];
				} else {
					// 如果没有找到用户数据，可以返回一个空对象或null，表示未找到用户信息
					return null;
				}
			} catch (error) {
				// 处理错误情况，例如数据库查询失败
				console.error('获取用户信息失败', error);
				throw error; // 将错误传递给调用者
			}
		},

	},
	components: {
		VanIcon,

	},


}
</script>

<style lang="scss" scoped>
.wrap {
	// height: 335.51rpx;
	padding: 0 43.81rpx;
	background-color: #fff;
	border-radius: 17.52rpx 17.52rpx 0 0;


	.top-person-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-top: 40rpx;


		.login {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;

			.title {
				position: absolute;
				top: 50px;
				padding: 0 0 17.52rpx;
				font-size: 40.54rpx;
				font-weight: bold;
			}

			.btn-login {
				width: 60%;
				padding-top: 180rpx;
				margin: 35.05rpx 0;

				.btn {
					padding: 10rpx 0;
					font-size: 28.04rpx;
					font-weight: bold;
					background-color: #f7d02b;
					border-radius: 52.57rpx;
				}
			}

			.no-login {
				padding-top: 25.05rpx;
				color: #6c6c6c;
				font-size: 21.03rpx;
				font-weight: 500;
				border-bottom: 1px solid #6c6c6c;
			}

			.tip {
				padding-top: 60.05rpx;
				color: #9d9898;
				font-size: 21.03rpx;
			}
		}

		.left {
			display: flex;
			width: auto;

			.left-avatar {
				width: 120rpx;
				height: 120rpx;

				// background-color: #2a82e4;
				border-radius: 50%;
				transform: translateY(-30%);
			}

			.left-name-id {
				margin-left: 40.57rpx;
				font-size: 14px;
				// font-weight: bold;

				.name {
					// font-size: 24.53rpx;
				}

				.login-tip {
					color: #919191;
				}
			}
		}

		.right {
			display: flex;
			width: auto;
			height: 29.79rpx;

			// margin-top: 21.03rpx;
			font-size: 17.52rpx;

			.label {
				display: flex;
				align-items: center;
				padding: 14rpx;
				padding-right: 10rpx;
				font-weight: bold;

				.label__icon {
					width: 24.53rpx;
					height: 24.53rpx;
					margin-right: 5rpx;
				}
			}

			.label.vip {
				background-color: #ffc402;

				.label__icon.vip {
					width: 21.03rpx;
					height: 21.03rpx;
				}
			}

			.label.auditor {
				background-color: #2a82e4;
			}

			.label.deal-num {
				background-color: #43cf7c;
			}
		}
	}

	.bottom-project-info {
		.item__to {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 77.1rpx;
			margin-top: 20rpx;
			background-color: #c4c4c4;
			border-radius: 15.77rpx;

			.txt {
				margin-left: 26.29rpx;
				font-size: 26.29rpx;
				font-style: italic;
				font-weight: bold;
			}

			.icon {
				margin-right: 26.29rpx;
			}
		}
	}
}
</style>