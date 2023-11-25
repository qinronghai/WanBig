<template>
	<div class="wrap">
		<div class="contact-ways">
			<div class="item" @click="popContactQQ">
				<image src="../../../static/my/qq.svg" class="icon"></image>
				<span class="txt">185043843</span>
			</div>
			<div class="item" @click="popContactWX">
				<image src="../../../static/my/wx.svg" class="icon"></image>
				<span class="txt">AHAI_1010</span>
			</div>
			<div class="click-button">--点击相应号码可复制--</div>
		</div>
		<div class="avatar">
			<image class="img-avatar" src="../../../static/my/avatar.png" mode="" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				contact: {
					QQ: "185043843",
					WX: "AHAI_1010",
				},
			};
		},
		methods: {
			popContactQQ() {
				wx.showModal({
					title: "开发者的联系方式",
					content: "QQ：185043843",
					success(res) {
						if (res.confirm) {
							console.log("用户点击确定");
							// 点击确定之后 自动复制到剪切板
							wx.setClipboardData({
								data: "185043843",
								success(res) {
									wx.getClipboardData({
										success(res) {
											console.log("已成功复制联系方式", res.data); // data
										},
									});
								},
							});
						} else if (res.cancel) {
							console.log("用户点击取消");
						}
					},
				});
			},
			popContactWX() {
				wx.showModal({
					title: "开发者的联系方式",
					content: `微信: ${this.contact.WX}`,
					success(res) {
						if (res.confirm) {
							console.log("用户点击确定");
							// 点击确定之后 自动复制到剪切板
							wx.setClipboardData({
								data: `AHAI_1010`,
								success(res) {
									wx.getClipboardData({
										success(res) {
											console.log("已成功复制联系方式", res.data); // data
										},
									});
								},
							});
						} else if (res.cancel) {
							console.log("用户点击取消");
						}
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: auto;
		background-color: #fff;
		border-radius: 20rpx;

		.contact-ways {
			padding: 50rpx 70rpx;

			.item {
				display: flex;
				align-items: center;
				padding: 20rpx 0;
				color: #000;
				font-size: 24rpx;

				.icon {
					width: 40rpx;
					height: 40rpx;
					padding-right: 30rpx;
				}
			}

			.click-button {
				display: inline;
				font-size: 20rpx;
				background-color: #ffc300;
				border-radius: 4rpx;
			}
		}

		.img-avatar {
			width: 200rpx;
			height: 200rpx;
			margin-right: 80rpx;
			border-radius: 20rpx;
		}

	}
</style>