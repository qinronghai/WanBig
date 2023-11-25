<template>
	<view>
		<button class="avatar" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<image :src="avatarUrl"></image>
		</button>
		<view class="card">
			<label for="nickname">昵称：</label>
			<input id="nickname" type="nickname" :value="nickName" class="weui-input" placeholder="请输入昵称"
				@blur="onChangeNickName" />
		</view>
		<view class="card">
			<label for="qqnum">QQ：</label>
			<input type="number" :value="qqnum" class="weui-input" placeholder="请输入QQ号" @blur="onChangeQQNum" />
		</view>
		<view class="card">
			<label for="wxnum">微信：</label>
			<input type="wxnum" :value="wxnum" class="weui-input" placeholder="请输入昵称" @blur="onChangeWXNum" />
		</view>
		<button @click="submit" size="default" type="primary" style="width: 30%">
			确认修改
		</button>
	</view>
</template>

<script>
	const db = wx.cloud.database();
	const defaultAvatarUrl =
		"https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
	import {
		request
	} from "../../async/index";
	export default {
		data() {
			return {
				avatarUrl: defaultAvatarUrl,
				userInfo: {},
				nickName: "",
				qqnum: "",
				wxnum: "",
				isChagneAvatar: false,
			};
		},
		onLoad(options) {
			console.log("编辑资料页面加载了");
			this.userInfo = uni.getStorageSync("userInfo");
			this.avatarUrl = this.userInfo.info.avatarUrl;
			this.nickName = this.userInfo.info.nickName;
			this.qqnum = this.userInfo.qqnum;
			this.wxnum = this.userInfo.wxnum;
			// this.getUserInfo(uni.getStorageSync("openid"));
		},

		methods: {
			async onChooseAvatar(e) {
				const {
					avatarUrl
				} = e.detail;

				this.avatarUrl = avatarUrl;
				this.isChagneAvatar = true;
				/* // 上传头像到数据库
				 */
			},
			getUserInfo(openid) {
				db.collection("user")
					.where({
						_openid: openid,
					})
					.get()
					.then((res) => {
						console.log("获取用户数据", res);
					});
			},
			onChangeNickName(e) {
				console.log("触发修改", e);
				const nickName = e.detail.value;
				this.nickName = nickName;
			},
			onChangeQQNum(e) {
				console.log("触发修改", e);
				const qqnum = e.detail.value;
				this.qqnum = qqnum;
			},
			onChangeWXNum(e) {
				console.log("触发修改", e);
				const wxnum = e.detail.value;
				this.wxnum = wxnum;
			},
			async submit() {
				let that = this;
				console.log("点击了提交", that.isChagneAvatar);
				uni.showLoading({
					title: "加载中",
					mask: true,
				});
				// 判断是否修改了头像
				if (that.isChagneAvatar) {
					// 删除原来的头像
					await wx.cloud
						.deleteFile({
							fileList: [that.userInfo.info.avatarUrl],
						})
						.then((res) => {
							console.log("删除原来的头像成功", res);
						})
						.catch((err) => {
							console.log("删除失败", err);
						});
					// 上传新的头像
					await request(that.avatarUrl, "avatar/").then((result) => {
						if (result.statusCode === 204) {
							console.log("上传头像成功", result);
							// 将头像的临时路径替换成服务器存储链接
							that.userInfo.info.avatarUrl = result.fileID;
							that.avatarUrl = result.fileID;
						}
					});
				}
				// 获取最新数据
				that.userInfo.qqnum = that.qqnum;
				that.userInfo.wxnum = that.wxnum;
				that.userInfo.info.nickName = that.nickName;
				// 修改数据库的信息
				try {
					const updateResult = await db
						.collection("user")
						.doc(that.userInfo._id)
						.update({
							data: {
								info: that.userInfo.info,
								qqnum: that.userInfo.qqnum,
								wxnum: that.userInfo.wxnum,
							},
						});
					console.log(updateResult);

					// 判断是否修改成功
					if (updateResult.stats.updated === 1) {
						uni.showToast({
							title: "修改成功",
							icon: "success",
							duration: 2000,
						});
						// 重置是否修改头像的标识
						that.isChagneAvatar = false;
					} else {
						uni.showModal({
							title: "提示",
							content: "修改失败，请稍后重试",
							showCancel: true,
							success: ({
								confirm,
								cancel
							}) => {},
						});
						return;
					}
					// 修改成功后重新请求数据
					const getRes = await db.collection("user").doc(that.userInfo._id).get();
					that.userInfo = getRes.data;
					uni.setStorageSync("userInfo", getRes.data);

					uni.hideLoading();
					/* uni.showToast({
					  title: "修改成功",
					  icon: "success",
					  duration: 2000,
					}); */
				} catch (error) {
					console.error(error);
				}
			},
		},
	};
</script>

<style lang="scss">
	.avatar {
		width: 160rpx;
		height: 160rpx;
		padding: 0;
		margin-bottom: 25rpx;
		background: none;
	}

	.avatar image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 200rpx;
	}

	.weui-input {
		flex: 1;
		height: 100rpx;
		padding-left: 30rpx;
		margin: 20rpx auto;
		background: #eee;
		border-radius: 10rpx;
	}

	.card {
		display: flex;
		align-items: center;
		padding: 0 30rpx;

		label {
			width: 120rpx;
		}
	}
</style>