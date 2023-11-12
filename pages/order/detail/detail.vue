<template>
  <view class="contain">
    <view class="card">
      <image
        class="top_over"
        src="/static/images/over.png"></image>
      <image
        class="bot_over"
        src="/static/images/over.png"></image>
      <view class="goods_box">
        <image
          class="goods_img"
          :src="detail.bookinfo.pic"></image>
        <view class="goods_content">
          <view class="goods_title text-cut">{{ detail.bookinfo.title }}</view>
          <view class="goods_author text-cut">{{ detail.bookinfo.author }}</view>
        </view>
        <view class="goods_price">￥{{ detail.price }}元</view>
      </view>

      <view
        v-if="detail.status == 2"
        class="trade-code">
        <view>
          <view class="trade-code-label">{{ detail.code ? "交易码" : "请输入交易码" }}</view>
          <view
            class="code-number"
            v-if="detail.seller == openid && detail.code"
            >{{ detail.code }}</view
          >
          <codeInput
            v-if="detail._openid == openid && detail.code"
            ref="codeInput"
            @verificationCode="verificationCode"
            codeType="block"
            :errorType="errorType"
            :blockNum="6"></codeInput>
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
        <view class="fare_des">￥{{ detail.price }}.00元</view>
      </view>
      <view class="border"></view>
      <view class="orderfare">CONTACT SELLER</view>
      <view
        class="fare_box"
        @tap="phone"
        :data-phone="userinfo.phone">
        <view class="fare_title">电话</view>
        <view class="fare_des">{{ userinfo.phone }}</view>
      </view>
      <view
        class="fare_box"
        @tap="copy"
        :data-copy="userinfo.email"
        data-name="邮箱">
        <view class="fare_title">邮箱</view>
        <view class="fare_des">{{ userinfo.email }}</view>
      </view>
      <view
        class="fare_box"
        v-if="userinfo.wxnum !== ''"
        @tap="copy"
        :data-copy="userinfo.wxnum"
        data-name="微信">
        <view class="fare_title">微信</view>
        <view class="fare_des">{{ userinfo.wxnum }}</view>
      </view>
      <view
        class="fare_box"
        v-if="userinfo.qqnum !== ''"
        @tap="copy"
        :data-copy="userinfo.qqnum"
        data-name="QQ">
        <view class="fare_title">QQ</view>
        <view class="fare_des">{{ userinfo.qqnum }}</view>
      </view>
      <view class="border"></view>
      <view class="bot_box">
        <!-- 确认预定：向买家发送确认订单的通知，表明卖家确认了买家的预定申请 -->
        <view
          v-if="detail.status == 1 && detail.seller == openid"
          class="contact"
          @tap.stop.prevent="confirmReserve"
          :data-ord="detail">
          确认订单
        </view>
        <!-- 拒绝预定：卖家拒绝买家的预定请求 -->
        <view
          v-if="detail.status == 1 && detail.seller == openid"
          class="cancel"
          @tap.stop.prevent="rejectReserve"
          :data-ord="detail"
          >拒绝预定</view
        >

        <!-- 待确认-等待买家确认 -->
        <view
          v-if="detail.status == 1 && detail._openid == openid"
          class="cancel"
          @tap.stop.prevent="cancelReserve"
          :data-ord="detail"
          >取消预定</view
        >
        <!-- 交易中 -->
        <block>
          <view
            v-if="detail.status == 2 && detail._openid == openid"
            class="contact"
            @tap.stop.prevent="confirm"
            :data-ord="detail"
            :data-issend="false"
            >确认收货</view
          >
          <view
            v-if="detail.status == 2 && detail.seller == openid"
            class="contact"
            @tap.stop.prevent="confirm"
            :data-ord="detail"
            :data-issend="true"
            >确认发货</view
          >
          <view
            v-if="detail.status == 2"
            class="cancel"
            @tap.stop.prevent="cancelTransaction"
            :data-ord="detail"
            >取消交易</view
          >
        </block>
        <!-- 完成交易和已取消 -->
        <view
          v-if="detail.status == 3 || detail.status == 4 || detail.status == 42 || detail.status == 43"
          class="cancel"
          @tap.stop.prevent="deleteFun"
          :data-ord="detail"
          >删除订单</view
        >
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
      openid: uni.getStorageSync("openid"),

      userinfo: {
        phone: "",
        email: "",
        wxnum: "",
        qqnum: "",
      },
      code: 0,
    };
  },
  onLoad: function (e) {
    this.getdetail(e.id);
  },
  methods: {
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

    //获取订单详情
    getdetail(_id) {
      let that = this;
      db.collection("order")
        .doc(_id)
        .get({
          success(e) {
            that.setData({
              creatTime: config.formTime(e.data.creat),
              detail: e.data,
            });
            that.getSeller(e.data.seller);
          },
          fail() {
            uni.showToast({
              title: "获取失败，请稍后到订单中心内查看",
              icon: "none",
            });
          },
        });
    },

    //获取卖家信息
    getSeller(m) {
      let that = this;
      db.collection("user")
        .where({
          _openid: m,
        })
        .get({
          success: function (res) {
            uni.hideLoading();
            that.setData({
              userinfo: res.data[0],
            });
          },
        });
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

    //取消订单
    cancel() {
      let that = this;
      uni.showModal({
        title: "温馨提示",
        content: "您确认要取消该订单吗",
        success(res) {
          if (res.confirm) {
            uni.showLoading({
              title: "正在处理",
            });
            uniCloud.callFunction({
              name: "pay",
              data: {
                $url: "changeP",
                //云函数路由参数
                _id: that.detail.sellid,
                status: 0, //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
              },

              success: (res) => {
                console.log("修改订单状态成功");
                uniCloud.callFunction({
                  name: "pay",
                  data: {
                    $url: "changeO",
                    //云函数路由参数
                    _id: that.detail._id,
                    status: 3, //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
                  },

                  success: (res) => {
                    console.log("修改订单状态成功");
                    that.up(that.detail.price); //返回钱到余额
                    that.canceltip();
                    that.getdetail(that.detail._id);
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

    //确认收货
    /* confirm() {
      let that = this;
      uni.showModal({
        title: "温馨提示",
        content: "您确认已收货吗",
        success(res) {
          if (res.confirm) {
            uni.showLoading({
              title: "正在处理",
            });
            uniCloud.callFunction({
              name: "pay",
              data: {
                $url: "changeP",
                //云函数路由参数
                _id: that.detail.sellid,
                status: 2, //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
              },

              success: (res) => {
                console.log("修改订单状态成功");
                uniCloud.callFunction({
                  name: "pay",
                  data: {
                    $url: "changeO",
                    //云函数路由参数
                    _id: that.detail._id,
                    status: 2, //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
                  },

                  success: (res) => {
                    console.log("修改订单状态成功");
                    uniCloud.callFunction({
                      name: "his",
                      data: {
                        $url: "toseller",
                        //云函数路由参数
                        seller: that.detail.seller,
                        num: that.detail.price,
                      },
                      success() {
                        uni.hideLoading();
                        that.confirmtip();
                        that.getdetail(that.detail._id);
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
    }, */
    //确认收货/确认发货
    confirm(ord) {
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
      if (Number(that.code) !== detail.code) {
        uni.showModal({
          title: "提示",
          content: "您输入的交易码不正确，请重新输入",
          showCancel: true,
          success: ({ confirm, cancel }) => {},
        });
        return;
      }
      uni.showModal({
        title: "提示",
        content: isSend ? "您确认已经发货了吗？" : "您确认已经收货了吗？",
        showCancel: true,
        success: ({ confirm, cancel }) => {
          if (confirm) {
            uni.showLoading({
              title: "加载中",
              mask: true,
            });
            // 验证交易码

            //1. 修改卖家在售状态
            db.collection("publish")
              .doc(detail.sellid)
              .update({
                data: {
                  status: 3,
                },
                success: function (res) {
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
                success: function (res) {
                  console.log("修改订单状态成功", res);
                  //3. 给卖家发送订单状态变更通知
                  that.sendOrderChangeMsg(isSend ? detail._openid : detail.seller, {
                    orderId: detail._id,
                    goodName: detail.bookinfo.title,
                    status: "交易完成",
                    time: util.formatTime(new Date()),
                    note: (isSend ? "卖家已确认发货，" : "买家已确认收货，") + "交易完成。",
                  });
                  //4. 跳转到完成订单的页面

                  uni.redirectTo({ url: "/pages/order/detail/detail?id=" + detail._id });
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
    //删除订单
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
        success: function (res) {
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
  /* padding: 15px 0; */
  text-align: center;
}

.trade-code-label {
  padding: 30rpx 0;
  color: #333;
  font-size: 20px;
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

/* 交易码样式 */
.trade-code {
  /* padding: 15px 0; */
  text-align: center;
}

.trade-code-label {
  padding: 30rpx 0;
  color: #333;
  font-size: 20px;
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
</style>
