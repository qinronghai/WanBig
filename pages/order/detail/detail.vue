<template>
	<view class="contain">
		<view class="card">
			<image class="top_over" src="/static/images/over.png"></image>
			<image class="bot_over" src="/static/images/over.png"></image>
			<view class="goods_box">
				<image class="goods_img" :src="detail.bookinfo ? detail.bookinfo.pic : detail.goodinfo.pic"></image>
				<view class="goods_content">
					<view class="goods_title text-cut">{{ detail.bookinfo ? detail.bookinfo.title : detail.goodinfo.title }}
					</view>
					<view class="goods_author text-cut">{{ detail.bookinfo ? detail.bookinfo.author : detail.goodinfo.category }}
					</view>
				</view>
				<view class="goods_price">￥{{ detail.price }}元</view>
			</view>
			<view v-if="detail.status == 2 && detail.code" class="trade-code">
				<view>
					<view class="trade-code-label">{{ detail.code ? "交易码" : "请输入交易码" }}</view>
					<view class="code-number" v-if="detail.seller == openid && detail.code">{{ detail.code }}</view>
					<codeInput v-if="detail._openid == openid && detail.code" ref="codeInput" @verificationCode="verificationCode"
						codeType="block" :errorType="errorType" :blockNum="6"></codeInput>
				</view>
			</view>

			<view class="border"></view>
			<view class="list">
				<view class="list_1">{{ detail.deliveryid == 0 ? "自提地址" : "配送地址" }}</view>
				<view class="list_2">{{ detail.deliveryid == 0 ? detail.ztplace : detail.psplace }}</view>
			</view>
			<view class="border"></view>
			<view class="list">
				<view class="list_1">{{
          detail.status == 1 && detail.seller == openid
            ? "预定订单"
            : detail.status == 1 && detail._openid == openid
            ? "等待卖家确认订单"
            : detail.status == 2 && detail._openid == openid
            ? "待收货"
            : detail.status == 2 && detail.seller == openid
            ? "待发货"
            : detail.status == 3
            ? "交易完成"
            : detail.status == 4
            ? "已取消预定"
            : detail.status == 42
            ? "已取消交易"
            : detail.status == 43
            ? "已拒绝预定"
            : "已取消"
        }}</view>
				<view class="list_2">{{
          detail.status == 1 && detail.seller == openid
            ? "请在72小时内为买家做出反馈"
            : detail.status == 1 && detail._openid == openid
            ? "系统已发消息通知卖家确认订单"
            : detail.status == 2 && detail._openid == openid
            ? "等待收货中，确认收货后请点击确认收货按钮"
            : detail.status == 2 && detail.seller == openid
            ? "请您尽快与买家取得联系，并进行商品的交付，完成交易"
            : detail.status == 3
            ? "本次交易圆满完成，感谢n(*≧▽≦*)n"
            : detail.status == 4
            ? "您取消了预定"
            : detail.status == 42
            ? "交易已被取消"
            : detail.status == 43
            ? "您拒绝了买家的预定申请，该商品已被系统下架"
            : "已取消"
        }}</view>
			</view>
			<view class="border"></view>
			<view class="orderfare">ORDER FARE</view>
			<view class="fare_box">
				<view class="fare_title">下单时间</view>
				<view class="fare_des">{{ creatTime }}</view>
			</view>
			<view class="fare_box">
				<view class="fare_title">支付金额</view>
				<view class="fare_des">￥{{ detail.price }}元</view>
			</view>
			<view class="border"></view>
			<view class="orderfare">CONTACT SELLER</view>
			<view class="fare_box" @tap="phone" :data-phone="userinfo.phonenum">
				<view class="fare_title">电话</view>
				<view class="fare_des">{{ userinfo.phonenum }}</view>
			</view>
			<!-- <view
        class="fare_box"
        @tap="copy"
        :data-copy="userinfo.email"
        data-name="邮箱">
        <view class="fare_title">邮箱</view>
        <view class="fare_des">{{ userinfo.email }}</view>
      </view> -->
			<view class="fare_box" v-if="userinfo.wxnum !== ''" @tap="copy" :data-copy="userinfo.wxnum" data-name="微信">
				<view class="fare_title">微信</view>
				<view class="fare_des">{{ userinfo.wxnum }}</view>
			</view>
			<view class="fare_box" v-if="userinfo.qqnum !== ''" @tap="copy" :data-copy="userinfo.qqnum" data-name="QQ">
				<view class="fare_title">QQ</view>
				<view class="fare_des">{{ userinfo.qqnum }}</view>
			</view>
			<view class="border"></view>
			<view class="bot_box">
				<!-- 确认预定：向买家发送确认订单的通知，表明卖家确认了买家的预定申请 -->
				<view v-if="detail.status == 1 && detail.seller == openid" class="contact" @tap.stop.prevent="confirmReserve"
					:data-ord="detail">
					确认订单
				</view>
				<!-- 拒绝预定：卖家拒绝买家的预定请求 -->
				<view v-if="detail.status == 1 && detail.seller == openid" class="cancel" @tap.stop.prevent="rejectReserve"
					:data-ord="detail">拒绝预定</view>

				<!-- 待确认-等待买家确认 -->
				<view v-if="detail.status == 1 && detail._openid == openid" class="cancel" @tap.stop.prevent="cancelReserve"
					:data-ord="detail">取消预定</view>
				<!-- 交易中 -->
				<block>
					<view v-if="detail.status == 2 && detail._openid == openid" class="contact" @tap.stop.prevent="confirm"
						:data-ord="detail" :data-issend="false">确认收货</view>
					<view v-if="detail.status == 2 && detail.seller == openid" class="contact" @tap.stop.prevent="confirm"
						:data-ord="detail" :data-issend="true">确认发货</view>
					<view v-if="detail.status == 2" class="cancel" @tap.stop.prevent="cancelTransaction" :data-ord="detail">取消交易
					</view>
				</block>
				<!-- 完成交易和已取消 -->
				<view v-if="detail.status == 3 || detail.status == 4 || detail.status == 42 || detail.status == 43"
					class="cancel" @tap.stop.prevent="deleteFun" :data-ord="detail">删除订单</view>
			</view>
			<!-- <view
        class="bot_box"
        v-if="detail.status == 1">
        <view
          class="cancel"
          @tap="cancel"
          >取消订单</view
        >
        <view
          class="contact"
          @tap="confirm"
          >确认收货</view
        >
      </view>
      <view class="bot_box">
        <view
          v-if="detail.status == 2 || detail.status == 3"
          class="delete"
          @tap="deleteFun"
          >删除订单</view
        >
      </view> -->
		</view>
		<!-- 确认订单-弹窗提示 -->
		<uni-popup ref="popup" @change="change">
			<view class="popup-container">
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<view class="trade-code">
						<view class="trade-code-label">交易码</view>
						<view class="code-number">{{ code }}</view>
					</view>
					<view class="reminder">
						<view class="reminder-title">温馨提示：</view>
						<view class="reminder-text">1、为了顺利完成本次交易，请在交付货品时出示此交易码。</view>
						<view class="reminder-text">2、请提醒买家在收到商品后输入此交易码以确认交易完成。</view>
					</view>
					<view class="attention">
						<view class="attention-title">注意：</view>
						<view class="attention-text">1、未在72小时内输入交易码可能影响您的信誉分。</view>
						<view class="attention-text">2、信誉分将决定您是否能够继续使用本平台。</view>
					</view>
					<view class="checkbox-label">
						<checkbox-group @change="onChangeAgree">
							<label>
								<checkbox :value="isAgree" :checked="isAgree" color="#1890ff" style="transform: scale(0.7)" />
								我已认真读完上面的提示，并同意遵守相关规定。
							</label>
						</checkbox-group>
						<button class="detail-button" @click="goToOrderDetail">
							确认订单
						</button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	const db = wx.cloud.database();
	const config = require("../../../config.js");
	const util = require("../../../util.js");
	import truncatedString from "../../utils/truncatedString.js";
	const _ = db.command;
	import codeInput from "./verification-codeInput/verification-codeInput.vue";
	export default {
		components: {
			codeInput,
		},
		data() {
			return {
				creatTime: "",

				detail: {
					bookinfo: {
						pic: "",
						title: "",
						edition: "",
						author: "",
					},

					price: "",
					deliveryid: 0,
					ztplace: "",
					psplace: "",
					status: 0,
				},

				userinfo: {
					phone: "",
					email: "",
					wxnum: "",
					qqnum: "",
				},
				openid: uni.getStorageSync("openid"),

				code: 0,
				isAgree: false,
				itemid: "",
			};
		},
		onLoad: async function(options) {
			console.log("options :>> ", options);
			/* from:
			    1. my-goods
			    2. good-detail
			*/
			this.itemid = options.id;
			if (options.from == "my-goods") {
				await this.getdetailByGoodId(options.id);
			} else {
				// 必须等到获取到订单详情
				await this.getdetail(options.id);
			}
			// 从list页面点击的确认订单按钮触发
			if (options.flag === "1") {
				// 触发确认订单按钮事件（确认买家的预定）
				await this.confirmReserve();
			}
			if (options.flag === "2") {
				// 触发确认收货按钮事件
				uni.showToast({
					title: "请输入交易码",
					icon: "none",
					mask: true,
				});
			}
		},

		methods: {
			onChangeAgree(e) {
				console.log("e :>> ", e);
				this.isAgree = !this.isAgree;
			},
			change(e) {
				console.log("当前模式：" + e.type + ",状态：" + e.show);
			},
			toggle(type) {
				this.type = type;
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type);
			},
			//验证交易码
			verificationCode(e) {
				const code = e;
				console.log("e :>> ", e);
				this.code = code;
				this.confirm();
			},
			//回到首页
			home() {
				uni.switchTab({
					url: "/pages/index/index",
				});
			},
			//根据id获取订单中的商品详情
			async getdetailByGoodId(goodId) {
				let that = this;
				try {
					const res = await db
						.collection("order")
						.where({
							sellid: goodId,
							status: _.eq(1).or(_.eq(2)),
						})
						.get();
					console.log("根据id获取订单详情 :>> ", res.data);
					that.setData({
						creatTime: config.formTime(res.data[0].creat),
						detail: res.data[0],
					});

					that.getBuyer(res.data[0]._openid); // 获取买家的信息
				} catch (error) {
					uni.showToast({
						title: "获取失败，请稍后到订单中心内查看",
						icon: "none",
					});
				}
			},
			//获取买家信息
			getBuyer(m) {
				let that = this;
				db.collection("user")
					.where({
						_openid: m,
					})
					.get({
						success: function(res) {
							uni.hideLoading();
							that.setData({
								userinfo: res.data[0],
							});
						},
					});
			},
			//获取订单详情
			async getdetail(_id) {
				let that = this;
				try {
					const res = await db.collection("order").doc(_id).get();

					console.log("res.data ok :>> ", res.data);
					that.setData({
						creatTime: config.formTime(res.data.creat),
						detail: res.data,
					});
					// 判断订单中的_openid是不是自己
					if (res.data._openid === this.openid) {
						// 是自己
						that.getSeller(res.data.seller);
					} else {
						// 不是自己
						that.getBuyer(res.data._openid);
					}
					// that.getSeller(res.data.seller);
				} catch (error) {
					console.log("error :>> ", error);
					uni.showToast({
						title: "获取失败，请稍后到订单中心内查看",
						icon: "none",
					});
				}
			},

			//获取卖家信息
			getSeller(m) {
				let that = this;
				db.collection("user")
					.where({
						_openid: m,
					})
					.get({
						success: function(res) {
							uni.hideLoading();
							that.setData({
								userinfo: res.data[0],
							});
						},
					});
			},
			//生成交易码
			async createCode(id) {
				let that = this;

				// 判断该订单是否有交易码
				await db
					.collection("order")
					.doc(id)
					.get({
						success: async function(res) {
							console.log("获取订单成功", res);
							console.log("res :>> ", res);
							if (res.data.code) {
								// 有交易码
								that.code = res.data.code;
							} else {
								// 无交易码
								let code = Math.floor(Math.random() * 900000) + 100000;

								that.code = code;
								db.collection("order")
									.doc(id)
									.update({
										data: {
											code: code,
										},
										success: function(res) {
											console.log("生成交易码成功", res);
											uni.hideLoading();
											/*  uni.showToast({
											  title: "确认成功",
											  icon: "success",
											  mask: true,
											  duration: 1500,
											  success: function () {
											    setTimeout(() => {
											      uni.navigateTo({ url: "/pages/order/detail/detail?id=" + id });
											    }, 1500);
											  },
											}); */
										},
										fail(e) {
											uni.hideLoading();
											uni.showToast({
												title: "发生异常，请及时和管理人员联系处理",
												icon: "none",
											});
										},
									});
							}
							that.itemid = id;
							that.toggle("center");
						},
						fail: console.error,
					});
			},
			goToOrderDetail(e) {
				uni.hideLoading();
				// 判断是否勾选同意
				if (!this.isAgree) {
					uni.showModal({
						title: "提示",
						content: "请先阅读并勾选同意《湾大闲置品平台交易规则》",
						showCancel: true,
						success: ({
							confirm,
							cancel
						}) => {},
					});
					return;
				}
				if (this.isAgree) {
					//跳转到订单详情页（交易中）
					uni.redirectTo({
						url: "/pages/order/detail/detail?id=" + this.itemid
					});
				}
			},
			// 给卖家发送订单状态变更通知
			async sendOrderChangeMsg(openid, data) {
				await wx.cloud
					.callFunction({
						name: "sendOrderChangeMsg",
						data: {
							openid: openid, // 卖家openid
							orderId: data.orderId, // 订单号
							goodName: truncatedString(data.goodName, 19), // 商品名称
							status: data.status, // 订单状态
							time: data.time, // 时间
							note: data.note, // 备注
						},
					})
					.then((res) => {
						console.log("发送订单状态变更通知成功", res);
					})
					.catch((err) => {
						console.log("发送订单状态变更通知失败", err);
					});
			},
			// 给买家发送订单确认通知
			async sendOrderConfirmMsg(openid, data) {
				await wx.cloud
					.callFunction({
						name: "sendOrderConfirmMsg",
						data: {
							openid: openid, // 买家openid
							orderId: data.orderId, // 订单号
							goodName: truncatedString(data.goodName, 19), // 商品名称
							time: data.time, // 时间
							content: data.content, // 内容
							note: data.note, // 备注
						},
					})
					.then((res) => {
						console.log("发送订单确认通知成功", res);
					})
					.catch((err) => {
						console.log("发送订单确认通知失败", err);
					});
			},
			//卖家确认订单(订单确认通知)
			async confirmReserve(ord) {
				let that = this;
				let detail;
				let isSend;
				if (ord) {
					// 由点击确认订单按钮触发
					detail = ord.currentTarget.dataset.ord;
					isSend = ord.currentTarget.dataset.issend;
				} else {
					// 由list页面进来直接触发
					detail = that.detail;
					isSend = false;
				}
				console.log(detail, isSend);
				console.log("that.code :>> ", that.code);
				console.log("detail.code :>> ", detail.code);
				// 直接跳转详情页面，并触发确认订单按钮事件
				console.log("ord :>> ", ord);
				// 初始化同意勾选的状态
				this.isAgree = false;
				console.log("detail :>> ", detail);

				uni.showModal({
					title: "温馨提示",
					content: "您确认要同意该预定吗",
					showCancel: true,
					success: ({
						confirm,
						cancel
					}) => {
						if (confirm) {
							uni.showLoading({
								title: "正在处理",
								mask: true,
							});
							const collection = detail.bookinfo ? "publish" : "goods";
							console.log("collection :>> ", collection);
							// 修改卖家在售状态
							db.collection(collection)
								.doc(detail.sellid)
								.update({
									data: {
										status: 2,
									},
									success: function(res) {
										console.log("修改卖家在售状态成功", res);
									},
									fail(e) {
										console.log("修改卖家在售状态失败 :>> ", e);
										uni.hideLoading();
										uni.showToast({
											title: "发生异常，请及时和管理人员联系处理",
											icon: "none",
										});
									},
								});
							// 1.修改订单状态
							db.collection("order")
								.doc(detail._id)
								.update({
									data: {
										status: 2,
									},
									success: function(res) {
										console.log("修改订单状态成功", res);
										// 2.给买家发送订单确认通知
										that.sendOrderConfirmMsg(detail._openid, {
											orderId: detail._id,
											goodName: collection === "publish" ? detail.bookinfo.title : detail.goodinfo.title,
											time: util.formatTime(new Date()),
											content: "卖家同意了您的预定请求",
											note: "请尽快与卖家联系，确认交易事宜",
										});

										// 4.生成随机交易码
										that.createCode(detail._id);
									},
									fail(e) {
										uni.hideLoading();
										uni.showToast({
											title: "发生异常，请及时和管理人员联系处理",
											icon: "none",
										});
									},
								});
						}
					},
				});
			},
			//买家取消预定(订单状态更新提醒通知)(待确认下-等待卖家确认部分，取消后卖家状态恢复)
			cancelReserve(ord) {
				console.log("ord :>> ", ord);
				let that = this;
				let detail = ord.currentTarget.dataset.ord;
				uni.showModal({
					title: "温馨提示",
					content: "您确认要取消该预定吗",
					success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: "正在处理",
								mark: true,
							});
							const collection = detail.bookinfo ? "publish" : "goods";
							console.log("collection :>> ", collection);
							// 修改卖家在售状态
							db.collection(collection)
								.doc(detail.sellid)
								.update({
									data: {
										status: 0,
									},
									success: function(res) {
										console.log("修改卖家在售状态成功", res);
										// 修改订单状态
										db.collection("order")
											.doc(detail._id)
											.update({
												data: {
													status: 4,
												},
												success: function(res) {
													console.log("修改订单状态成功", res);
													// that.up(detail.price); //返回钱到余额
													// 给卖家发送订单状态变更通知
													that.sendOrderChangeMsg(detail.seller, {
														orderId: detail._id,
														goodName: collection === "publish" ? detail.bookinfo.title : detail.goodinfo
															.title,
														status: "取消预定",
														time: util.formatTime(new Date()),
														note: "买家取消预定该商品",
													});
													//跳转到订单详情页（交易中）
													uni.redirectTo({
														url: "/pages/order/detail/detail?id=" + detail._id
													});
												},
												fail(e) {
													uni.hideLoading();
													uni.showToast({
														title: "发生异常，请及时和管理人员联系处理",
														icon: "none",
													});
												},
											});
									},
								});
						}
					},
				});
			},
			//卖家拒绝预定(订单确认通知)
			rejectReserve(ord) {
				console.log("卖家点击了拒绝预定", ord);
				let that = this;
				let detail = ord.currentTarget.dataset.ord;
				uni.showModal({
					title: "温馨提示",
					content: "您确认要拒绝该预定吗？拒绝后，系统默认将该商品下架",
					showCancel: true,
					success: ({
						confirm,
						cancel
					}) => {
						if (confirm) {
							uni.showLoading({
								title: "正在处理",
								mask: true,
							});
							const collection = detail.bookinfo ? "publish" : "goods";
							console.log("collection :>> ", collection);
							// 1.修改卖家在售状态
							db.collection(collection)
								.doc(detail.sellid)
								.update({
									data: {
										status: 43, //4表示交易取消，3表示：卖家拒绝预定
									},
									success: function(res) {
										console.log("修改卖家在售状态成功", res);
									},
								});
							// 2.修改订单状态
							db.collection("order")
								.doc(detail._id)
								.update({
									data: {
										status: 43,
									},
									success: function(res) {
										console.log("修改订单状态成功", res);
										// 3.给买家发送订单确认通知
										that.sendOrderConfirmMsg(detail._openid, {
											orderId: detail._id,
											goodName: collection === "publish" ? detail.bookinfo.title : detail.goodinfo.title,
											time: util.formatTime(new Date()),
											content: "卖家拒绝了您的预定请求",
											note: "您可以再看看其他卖家的商品",
										});
										//跳转到订单详情页（交易中）
										uni.redirectTo({
											url: "/pages/order/detail/detail?id=" + detail._id
										});
									},
									fail(e) {
										uni.hideLoading();
										uni.showToast({
											title: "发生异常，请及时和管理人员联系处理",
											icon: "none",
										});
									},
								});
						}
					},
				});
			},
			//取消交易
			cancelTransaction(ord) {
				console.log("ord :>> ", ord);
				let that = this;
				let detail = ord.currentTarget.dataset.ord;

				// 分辨用户
				if (detail.seller === this.openid && detail.status === 2) {
					console.log("卖家点击 :>> ");
					// 取消交易-卖方
					this.cTForSeller(detail);
				} else if (detail._openid === this.openid && detail.status === 2) {
					console.log("买家点击 :>> ");
					// 取消交易-买方
					this.cTForBuyer(detail);
				}
			},
			// 卖家取消交易
			cTForSeller(detail) {
				let that = this;
				console.log("卖家取消交易 :>> ");
				uni.showModal({
					title: "提示",
					content: "您确认要取消该交易吗？取消后，系统默认将该商品下架",
					showCancel: true,
					success: ({
						confirm,
						cancel
					}) => {
						if (confirm) {
							uni.showLoading({
								title: "加载中",
								mask: true,
							});
							const collection = detail.bookinfo ? "publish" : "goods";
							console.log("collection :>> ", collection);
							// 1. 修改卖家在售状态
							db.collection(collection)
								.doc(detail.sellid)
								.update({
									data: {
										status: 42, //4表示交易取消，2表示：卖家取消交易
									},
									success: function(res) {
										console.log("修改卖家在售状态成功", res);
									},
								});
							// 2. 修改订单状态
							db.collection("order")
								.doc(detail._id)
								.update({
									data: {
										status: 42, //4表示交易取消，2表示：卖家取消交易
									},
									success: function(res) {
										console.log("修改订单状态成功", res);
										// 3. 给买家发送订单状态变更通知
										that.sendOrderChangeMsg(detail._openid, {
											orderId: detail._id,
											goodName: collection === "publish" ? detail.bookinfo.title : detail.goodinfo.title,
											status: "取消交易",
											time: util.formatTime(new Date()),
											note: "卖家取消交易，交易作废。",
										});
										//跳转到订单详情页（交易中）
										uni.redirectTo({
											url: "/pages/order/detail/detail?id=" + detail._id
										});
									},
									fail(e) {
										uni.hideLoading();
										uni.showToast({
											title: "发生异常，请及时和管理人员联系处理",
											icon: "none",
										});
									},
								});
						}
					},
				});
			},
			// 买家取消交易
			cTForBuyer(detail) {
				let that = this;

				console.log("买家取消交易 :>> ");
				uni.showModal({
					title: "提示",
					content: "您确认要取消该交易吗？",
					showCancel: true,
					success: ({
						confirm,
						cancel
					}) => {
						if (confirm) {
							uni.showLoading({
								title: "加载中",
								mask: true,
							});
							const collection = detail.bookinfo ? "publish" : "goods";
							console.log("collection :>> ", collection);
							// 1.修改卖家在售状态
							db.collection(collection)
								.doc(detail.sellid)
								.update({
									data: {
										status: 0,
									},
									success: function(res) {
										console.log("修改卖家在售状态成功", res);
									},
								});
							// 2.修改订单状态
							db.collection("order")
								.doc(detail._id)
								.update({
									data: {
										status: 42,
									},
									success: function(res) {
										console.log("修改订单状态成功", res);
										// 3.给卖家发送订单状态变更通知
										that.sendOrderChangeMsg(detail.seller, {
											orderId: detail._id,
											goodName: collection === "publish" ? detail.bookinfo.title : detail.goodinfo.title,
											status: "取消交易",
											time: util.formatTime(new Date()),
											note: "买家取消交易，商品将重新回归市场。",
										});
										//跳转到订单详情页（交易中）
										uni.redirectTo({
											url: "/pages/order/detail/detail?id=" + detail._id
										});
									},
									fail(e) {
										uni.hideLoading();
										uni.showToast({
											title: "发生异常，请及时和管理人员联系处理",
											icon: "none",
										});
									},
								});
						}
					},
				});
			},

			//确认收货/确认发货
			async confirm(ord) {
				let that = this;
				let detail;
				let isSend;
				if (ord) {
					// 由点击确认收货按钮触发
					detail = ord.currentTarget.dataset.ord;
					isSend = ord.currentTarget.dataset.issend;
				} else {
					// 由输入交易码触发
					detail = that.detail;
					isSend = false;
				}
				console.log(detail, isSend);
				console.log("that.code :>> ", that.code);
				console.log("detail.code :>> ", detail.code);
				// 验证交易码

				if (detail._openid === this.openid && Number(that.code) !== detail.code) {
					//说明是买家，并且输入的交易码不正确
					uni.showModal({
						title: "提示",
						content: "您输入的交易码不正确，请重新输入",
						showCancel: true,
						success: ({
							confirm,
							cancel
						}) => {},
					});
					return;
				}
				uni.showModal({
					title: "提示",
					content: isSend ? "您确认已经发货了吗？" : "您确认已经收货了吗？",
					showCancel: true,
					success: ({
						confirm,
						cancel
					}) => {
						if (confirm) {
							uni.showLoading({
								title: "加载中",
								mask: true,
							});
							const collection = detail.bookinfo ? "publish" : "goods";
							console.log("collection :>> ", collection);
							//1. 修改卖家在售状态
							db.collection(collection)
								.doc(detail.sellid)
								.update({
									data: {
										status: 3,
									},
									success: function(res) {
										console.log("修改卖家在售状态成功", res);
									},
								});
							//2. 修改订单状态
							db.collection("order")
								.doc(detail._id)
								.update({
									data: {
										status: 3,
									},
									success: function(res) {
										console.log("修改订单状态成功", res);
										//3. 给卖家发送订单状态变更通知
										that.sendOrderChangeMsg(isSend ? detail._openid : detail.seller, {
											orderId: detail._id,
											goodName: collection === "publish" ? detail.bookinfo.title : detail.goodinfo.title,
											status: "交易完成",
											time: util.formatTime(new Date()),
											note: (isSend ? "卖家已确认发货，" : "买家已确认收货，") + "交易完成。",
										});
										//4. 跳转到完成订单的页面

										uni.redirectTo({
											url: "/pages/order/detail/detail?id=" + detail._id
										});
									},
									fail(e) {
										uni.hideLoading();
										uni.showToast({
											title: "发生异常，请及时和管理人员联系处理",
											icon: "none",
										});
									},
								});
						}
					},
				});
			},
			/* //删除订单
			deleteFun() {
			  let that = this;
			  uni.showModal({
			    title: "温馨提示",
			    content: "您确认要删除此订单吗",
			    success(res) {
			      if (res.confirm) {
			        uni.showLoading({
			          title: "正在处理",
			        });
			        db.collection("order")
			          .doc(that.detail._id)
			          .remove({
			            success() {
			              //页面栈返回
			              let i = getCurrentPages();
			              uni.navigateBack({
			                success: function () {
			                  i[i.length - 2].getlist();
			                },
			              });
			            },
			            fail: console.error,
			          });
			      }
			    },
			  });
			}, */
			//删除订单
			deleteFun(ord) {
				let that = this;
				let detail = ord.currentTarget.dataset.ord;
				uni.showModal({
					title: "温馨提示",
					content: "您确认要删除此订单吗",
					success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: "正在处理",
								mask: true,
							});

							let deleted = 99;
							// 判断是买家还是卖家
							if (detail._openid === that.openid) {
								// 买家删除订单
								deleted = 1;
							}

							if (detail.seller === that.openid) {
								// 卖家删除订单
								deleted = 2;
							}
							// 判断之前买家或者卖家是否已经删除过订单
							if (detail.deleted === 1 || detail.deleted === 2) {
								// 买家或者卖家已经删除过订单
								deleted = 3;
							}
							/*    
							  delete: 0表示未删除，1表示买家删除，2表示卖家删除，3表示买家和卖家都删除，99表示异常
							*/
							db.collection("order")
								.doc(detail._id)
								.update({
									data: {
										deleted: deleted,
									},
									success: function(res) {
										uni.showToast({
											title: "删除成功",
											icon: "success",
											mask: true,
											success: function() {
												setTimeout(() => {
													uni.navigateBack({
														delta: 1
													});
												}, 1500);
											},
										});
									},
									fail(e) {
										uni.hideLoading();
										uni.showToast({
											title: "发生异常，请及时和管理人员联系处理",
											icon: "none",
										});
									},
								});
						}
					},
				});
			},

			//复制
			copy(e) {
				uni.setClipboardData({
					data: e.currentTarget.dataset.copy,
					success: (res) => {
						uni.showToast({
							title: "复制" + e.currentTarget.dataset.name + "成功",
							icon: "success",
							duration: 1000,
						});
					},
				});
			},

			//电话拨打
			phone(e) {
				uni.makePhoneCall({
					phoneNumber: e.currentTarget.dataset.phone,
				});
			},

			//余额计算
			up(num) {
				let that = this;
				uniCloud.callFunction({
					name: "his",
					data: {
						$url: "recharge",
						//云函数路由参数
						num: num,
					},
					success(e) {
						uni.showToast({
							title: "取消成功",
							icon: "success",
						});
						that.history("取消订单退款", num, 1);
					},
					fail(e) {
						uni.showToast({
							title: "发送错误，请联系管理员",
							icon: "none",
						});
					},
				});
			},

			//历史记录
			history(name, num, type) {
				let that = this;
				db.collection("history").add({
					data: {
						stamp: new Date().getTime(),
						type: type,
						//1充值2支付
						name: name,
						num: num,
						oid: app.globalData.openid,
					},
					success: function(res) {
						console.log(res);
					},
					fail: console.error,
				});
			},

			//邮件提醒交易取消
			canceltip() {
				let that = this;
				uniCloud.callFunction({
					name: "email",
					data: {
						type: 4,
						//1下单提醒2提醒收货3取消交易4取消订单5交易完成
						email: that.userinfo.email,
						title: that.detail.bookinfo.title,
					},
					success: (res) => {
						console.log(res);
					},
				});
			},

			//邮件提醒订单完成
			confirmtip() {
				let that = this;
				uniCloud.callFunction({
					name: "email",
					data: {
						type: 5,
						//1下单提醒2提醒收货3取消交易4取消订单5交易完成
						email: that.userinfo.email,
						title: that.detail.bookinfo.title,
					},
					success: (res) => {
						console.log(res);
					},
				});
			},
		},
	};
</script>
<style>
	page {
		background: #fbbd08;
	}

	.contain {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx 28rpx;
	}

	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		padding: 40rpx 25rpx;
		background: #fff;
	}

	.top_over {
		position: absolute;
		top: -10rpx;
		left: 0rpx;
		width: 100%;
		height: 20rpx;
	}

	.bot_over {
		position: absolute;
		bottom: -10rpx;
		left: 0rpx;
		width: 100%;
		height: 20rpx;
	}

	.goods_box {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: auto;
	}

	.goods_img {
		width: 150rpx;
		height: 150rpx;
	}

	.goods_content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: calc(100% - 240rpx);
		height: 90%;
		padding-left: 20rpx;
	}

	.goods_title {
		font-size: 29rpx;
		letter-spacing: 3rpx;
	}

	.goods_author {
		color: rgb(150, 150, 150);
		font-size: 26rpx;
		letter-spacing: 2rpx;
	}

	.goods_price {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 150rpx;
		height: 100%;
		color: #f00;
		font-size: 32rpx;
		white-space: nowrap;
	}

	.border {
		width: 100%;
		height: 20rpx;
		border-bottom: 1rpx solid #eee;
	}

	.list {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 30rpx 0 10rpx 0;
	}

	.list_1 {
		color: rgb(167, 167, 167);
		font-size: 26rpx;
		letter-spacing: 2rpx;
	}

	.list_2 {
		padding-top: 10rpx;
		font-size: 32rpx;
		letter-spacing: 3rpx;
	}

	.orderfare {
		padding-bottom: 20rpx;
		margin-top: 28rpx;
		color: rgb(167, 167, 167);
		font-size: 22rpx;
		font-weight: 600;
		letter-spacing: 2rpx;
	}

	.fare_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 10rpx 0;
	}

	.fare_title {
		font-size: 28rpx;
		letter-spacing: 2rpx;
	}

	.fare_des {
		color: rgb(167, 167, 167);
		font-size: 27rpx;
	}

	.bot_box {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.cancel {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 620rpx;
		height: 80rpx;
		margin-top: 40rpx;
		color: #fff;
		font-size: 30rpx;
		letter-spacing: 4rpx;
		background: #000;
		border-radius: 20rpx;
	}

	.contact {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 620rpx;
		height: 80rpx;
		margin-top: 20rpx;
		color: #000;
		font-size: 30rpx;
		letter-spacing: 4rpx;
		background: #fbbd08;
		border-radius: 20rpx;
	}

	.delete {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 620rpx;
		height: 80rpx;
		margin-top: 20rpx;
		color: #fff;
		font-size: 30rpx;
		letter-spacing: 4rpx;
		background: #adadad;
		border-radius: 20rpx;
	}

	/* 交易码样式 */
	.trade-code {
		margin: 40rpx 0;
		/* padding: 30rpx 0; */
		text-align: center;
	}

	.trade-code-label {
		padding: 30rpx 0;
		color: #333;
		font-size: 40rpx;
		font-weight: 600;
		letter-spacing: 5rpx;
		background-color: #f0f0f0;
	}

	.code-number {
		margin-top: 30rpx;
		color: #1890ff;
		font-size: 50rpx;
		font-weight: bold;
	}

	/* 交易码样式 */
	.trade-code {
		/* padding: 30rpx 0; */
		text-align: center;
	}

	.trade-code-label {
		padding: 30rpx 0;
		color: #333;
		font-size: 40rpx;
		font-weight: 600;
		letter-spacing: 5rpx;
		background-color: #f0f0f0;
	}

	.code-number {
		margin-top: 20rpx;
		color: #1890ff;
		font-size: 50rpx;
		font-weight: bold;
	}

	/* 弹窗容器 */
	.popup-container {
		margin: 40rpx;
	}

	/* 弹窗内容 */
	.popup-content {
		overflow: hidden;
		background-color: #fff;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
		border-radius: 16rpx;
	}

	/* 交易码样式 */
	.trade-code {
		/* padding: 30rpx 0; */
		text-align: center;
	}

	.trade-code-label {
		padding: 30rpx 0;
		color: #333;
		font-size: 40rpx;
		font-weight: 600;
		letter-spacing: 5rpx;
		background-color: #f0f0f0;
	}

	.code-number {
		padding-top: 20rpx;
		color: #1890ff;
		font-size: 50rpx;
		font-weight: bold;
	}

	/* 提示信息样式 */
	.reminder {
		padding: 30rpx;
	}

	.reminder-title {
		margin-bottom: 16rpx;
		color: #333;
		font-size: 32rpx;
		font-weight: bold;
	}

	.reminder-text {
		color: #666;
		font-size: 30rpx;
		line-height: 1.5;
	}

	/* 注意事项样式 */
	.attention {
		padding: 30rpx;
	}

	.attention-title {
		margin-bottom: 16rpx;
		color: #ff4d4f;
		font-size: 32rpx;
		font-weight: bold;
	}

	.attention-text {
		color: #ff4d4f;
		font-size: 30rpx;
		line-height: 1.5;
	}

	/* 按钮样式 */
	.detail-button {
		display: block;
		width: 100%;
		padding: 20rpx;
		margin: 40rpx 0;
		color: #fff;
		font-size: 32rpx;
		text-align: center;
		background-color: #1890ff;
		border: none;
		border-radius: 8rpx;
		cursor: pointer;
	}

	.detail-button:hover {
		background-color: #40a9ff;
	}

	.checkbox-label {
		padding: 0 30rpx;
		color: #666;
		font-size: 28rpx;
	}
</style>