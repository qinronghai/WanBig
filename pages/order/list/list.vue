<template>
  <view style="height: 100%">
    <view class="tab_contain">
      <block
        v-for="(item, index) in tab"
        :key="index">
        <view
          class="tab_one"
          @tap="changeTab"
          :data-id="index">
          <view :class="tabid == item.id ? 'tab_on' : ''">{{ item.name }}</view>
        </view>
      </block>
    </view>

    <view
      class="contain"
      v-if="list.length !== 0">
      <block
        v-for="(item, index) in list"
        :key="index">
        <view
          class="card shadow"
          @tap="godetail"
          :data-id="item._id">
          <view class="top">
            <view class="top1">
              <view :class="'title ' + (item.status == 1 ? 'text-red' : '')">
                <image src="../../../static/order/road-sign.svg"></image>
                <view>{{ item.status == 1 ? "等待卖家确认订单" : item.status == 2 ? "交易中" : item.status == 3 ? "交易完成" : "已取消" }}</view>
              </view>
              <view class="date">{{ morejs.timelog(item.creat) }}</view>
            </view>
          </view>
          <view class="center">
            <image :src="item.bookinfo.pic"></image>
            <view class="content">
              <view class="book">
                <view class="book_name text-cut">{{ item.bookinfo.title }}</view>
                <view class="book_author text-cut">{{ item.bookinfo.author }}</view>
              </view>
              <view class="price">￥{{ item.price }}.00元</view>
            </view>
          </view>
          <view class="bottom">
            <view
              v-if="item.status == 1 || item.status == 2"
              class="cancel"
              @tap.stop.prevent="cancel"
              :data-ord="item"
              >取消订单</view
            >
            <view
              v-if="item.status == 2"
              class="confirm"
              @tap.stop.prevent="confirm"
              :data-ord="item"
              >确认收货</view
            >
            <view
              v-if="item.status == 3 || item.status == 4"
              class="cancel"
              @tap.stop.prevent="deleteFun"
              :data-ord="item"
              >删除订单</view
            >
          </view>
        </view>
      </block>
    </view>

    <!-- 无内容显示 -->
    <view
      class="nocontent"
      v-if="list.length == 0">
      <image src="/static/images/blank.png"></image>
      <view class="blank_text">这里空空如也~</view>
    </view>

    <block v-if="list.length > 10">
      <!-- parse <template is="loadmore" :data="nomore"/> -->
      <block
        name="loadmore"
        v-if="false">
        <view class="loadmore">
          <image
            v-if="!nomore"
            src="/static/images/more.gif"></image>
          <view v-if="nomore">已加载到底</view>
        </view>
      </block>
    </block>
    <van-transition
      v-show="scrollTop >= 500"
      custom-class="block"
      duration="600">
      <view
        class="totop"
        @tap="gotop">
        <image src="/static/images/top.png"></image>
      </view>
    </van-transition>
  </view>
</template>
<script module="morejs" lang="wxs" src="@/common.wxs"></script>
<script>
const app = getApp();
const db = wx.cloud.database();
const config = require("../../../config.js");
const util = require("../../../util.js");
import truncatedString from "../../utils/truncatedString.js";

const _ = db.command;
export default {
  data() {
    return {
      scrollTop: 0,
      nomore: false,

      tab: [
        {
          name: "全部",
          id: 0,
        },
        {
          name: "待确认",
          id: 1,
        },
        {
          name: "交易中",
          id: 2,
        },
        {
          name: "交易完成",
          id: 3,
        },
        {
          name: "已取消",
          id: 4,
        },
      ],

      tabid: 0,
      page: 0,
      list: "",
    };
  },
  onLoad() {
    uni.showLoading({
      title: "加载中",
    });
    this.getlist();
  },
  //下拉刷新
  onPullDownRefresh() {
    this.getlist();
  },
  //监测屏幕滚动
  onPageScroll: function (e) {
    this.setData({
      scrollTop: parseInt(e.scrollTop * uni.getSystemInfoSync().pixelRatio),
    });
  },
  onReachBottom() {
    this.more();
  },
  methods: {
    //导航栏切换
    changeTab(e) {
      let that = this;
      that.setData({
        tabid: e.currentTarget.dataset.id,
      });
      that.getlist();
    },

    //跳转详情页
    godetail(e) {
      uni.navigateTo({
        url: "/pages/order/detail/detail?id=" + e.currentTarget.dataset.id,
      });
    },

    //获取列表
    getlist() {
      let that = this;
      let status = that.tabid;
      if (status == 0) {
        var statusid = _.neq(0); //除-2之外所有
      } else {
        var statusid = parseInt(status); //小程序搜索必须对应格式
      }

      db.collection("order")
        .where({
          status: statusid,
          _openid: app.globalData.openid,
        })
        .orderBy("creat", "desc")
        .get({
          success(re) {
            uni.stopPullDownRefresh(); //暂停刷新动作
            that.setData({
              nomore: false,
              page: 0,
              list: re.data,
            });
            uni.hideLoading();
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
          },
        })
        .then((res) => {
          console.log("发送订单状态变更通知成功", res);
        })
        .catch((err) => {
          console.log("发送订单状态变更通知失败", err);
        });
    },

    //取消订单(订单为待确认或者交易中时候，取消后卖家状态恢复)
    cancel(ord) {
      console.log("ord :>> ", ord);
      let that = this;
      let detail = ord.currentTarget.dataset.ord;
      uni.showModal({
        title: "温馨提示",
        content: "您确认要取消该订单吗",
        success(res) {
          if (res.confirm) {
            uni.showLoading({
              title: "正在处理",
            });
            // 修改卖家在售状态
            db.collection("publish")
              .doc(detail.sellid)
              .update({
                data: {
                  status: 0,
                },
                success: function (res) {
                  console.log("修改卖家在售状态成功", res.data);
                  // 修改订单状态
                  db.collection("order")
                    .doc(detail._id)
                    .update({
                      data: {
                        status: 4,
                      },
                      success: function (res) {
                        console.log("修改订单状态成功", res.data);
                        // that.up(detail.price); //返回钱到余额
                        // 给卖家发送订单状态变更通知
                        that.sendOrderChangeMsg(detail.seller, {
                          orderId: detail._id,
                          goodName: detail.bookinfo.title,
                          status: "取消订单",
                          time: util.formatTime(new Date()),
                        });
                        // that.canceltip(detail.seller, detail.bookinfo.title);
                        that.getlist();
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

            /*  uniCloud.callFunction({
              name: "pay",
              data: {
                $url: "changeP",
                //云函数路由参数
                _id: detail.sellid,
                status: 0, //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
              },

              success: (res) => {
                console.log("修改订单状态成功");
                uniCloud.callFunction({
                  name: "pay",
                  data: {
                    $url: "changeO",
                    //云函数路由参数
                    _id: detail._id,
                    status: 3, //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
                  },

                  success: (res) => {
                    console.log("修改订单状态成功");
                    that.up(detail.price); //返回钱到余额
                    that.canceltip(detail.seller, detail.bookinfo.title);
                    that.getlist();
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
            }); */
          }
        },
      });
    },

    //确认收货
    confirm(ord) {
      let that = this;
      let detail = ord.currentTarget.dataset.ord;
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
                _id: detail.sellid,
                status: 2, //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
              },

              success: (res) => {
                console.log("修改订单状态成功");
                uniCloud.callFunction({
                  name: "pay",
                  data: {
                    $url: "changeO",
                    //云函数路由参数
                    _id: detail._id,
                    status: 2, //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
                  },

                  success: (res) => {
                    uniCloud.callFunction({
                      name: "his",
                      data: {
                        $url: "toseller",
                        //云函数路由参数
                        seller: detail.seller,
                        num: detail.price,
                      },
                      success() {
                        uni.hideLoading();
                        that.confirmtip(detail.seller, detail.bookinfo.title);
                        that.getlist();
                      },
                    });
                  },
                });
              },
            });
          }
        },
      });
    },

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
            });
            db.collection("order")
              .doc(detail._id)
              .remove({
                success() {
                  that.getlist();
                },
                fail: console.error,
              });
          }
        },
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
          console.log("钱包历史记录成功");
        },
        fail: console.error,
      });
    },

    //至顶
    gotop() {
      uni.pageScrollTo({
        scrollTop: 0,
      });
    },

    //加载更多
    more() {
      let that = this;
      if (that.nomore || that.list.length < 20) {
        return false;
      }
      let page = that.page + 1;
      let status = that.tabid;
      if (status == 0) {
        var statusid = _.neq(0); //除-2之外所有
      } else {
        var statusid = parseInt(status); //小程序搜索必须对应格式
      }

      db.collection("order")
        .where({
          status: statusid,
          _openid: app.globalData.openid,
        })
        .orderBy("creat", "desc")
        .skip(page * 20)
        .limit(20)
        .get({
          success: function (res) {
            if (res.data.length == 0) {
              that.setData({
                nomore: true,
              });
              return false;
            }
            if (res.data.length < 20) {
              that.setData({
                nomore: true,
              });
            }
            that.setData({
              page: page,
              list: that.list.concat(res.data),
            });
          },
          fail() {
            uni.showToast({
              title: "获取失败",
              icon: "none",
            });
          },
        });
    },

    //邮件提醒订单取消
    //m卖家_id,n书籍名字
    canceltip(m, n) {
      let that = this;
      db.collection("user")
        .where({
          _openid: m,
        })
        .get({
          success: function (res) {
            console.log(res);
            uniCloud.callFunction({
              name: "email",
              data: {
                type: 4,
                //1下单提醒2提醒收货3取消交易4取消订单5交易完成
                email: res.data[0].email,
                title: n,
              },
              success: (re) => {
                console.log(re);
              },
            });
          },
        });
    },

    //邮件提醒交易完成
    //m卖家_id,n书籍名字
    confirmtip(m, n) {
      let that = this;
      db.collection("user")
        .where({
          _openid: m,
        })
        .get({
          success: function (res) {
            console.log(res);
            uniCloud.callFunction({
              name: "email",
              data: {
                type: 5,
                //1下单提醒2提醒收货3取消交易4取消订单//5交易完成
                email: res.data[0].email,
                title: n,
              },
              success: (re) => {
                console.log(re);
              },
            });
          },
        });
    },
  },
};
</script>
<style>
.tab_contain {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 90rpx;
  border-bottom: 1rpx solid #eee;
}

.tab_one {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 25%;
  height: 100%;
}

.tab_one view {
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 30rpx;
  letter-spacing: 2rpx;
}

.tab_on {
  font-size: 32rpx;
  font-weight: 600;
  border-bottom: 4rpx solid #fbbd08;
}

.contain {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 24rpx;
}

.card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 15rpx 30rpx;
  margin-bottom: 30rpx;
  border-radius: 15rpx;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #eee;
}
.text-red {
  color: #f60;
}
.top1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.date {
  color: #b2b2b2;
  font-size: 28rpx;
  letter-spacing: 2rpx;
}

.title {
  display: flex;
  align-items: center;
}

.title image {
  width: 36rpx;
  height: 36rpx;
}

.title view {
  padding-left: 10rpx;
  font-size: 28rpx;
  /* font-weight: 600; */
  letter-spacing: 3rpx;
}

.del {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 40rpx;
  padding: 0 10rpx;
  border: 1rpx solid #c2c2c2;
  border-radius: 20rpx;
}

.del image {
  width: 28rpx;
  height: 28rpx;
}

.del view {
  color: #c2c2c2;
  font-size: 26rpx;
  letter-spacing: 3rpx;
}

.center {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}

.center image {
  width: 150rpx;
  height: 150rpx;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  width: calc(100% - 150rpx);
  height: 150rpx;
  padding: 0 20rpx;
}

.book {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.book_name {
  /* 2行文本溢出显示省略号 */
  display: -webkit-box;
  overflow: hidden;
  font-size: 30rpx;
  letter-spacing: 2rpx;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.book_author {
  overflow: hidden;
  padding-top: 10rpx;
  color: #c2c2c2;
  font-size: 26rpx;
  letter-spacing: 3rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.price {
  display: flex;
  justify-content: flex-end;
  color: #f80202;
  font-size: 32rpx;
}

.bottom {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 20rpx 0 0 0;
}

.cancel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110rpx;
  height: 50rpx;
  padding: 0 20rpx;
  margin-left: 20rpx;
  color: #333;
  font-size: 26rpx;
  border: 1rpx solid #c2c2c2;
  border-radius: 30rpx;
}

.confirm {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110rpx;
  height: 50rpx;
  padding: 0 20rpx;
  margin-left: 20rpx;
  color: #f60;
  font-size: 26rpx;
  border: 1rpx solid #f60;
  border-radius: 30rpx;
}

.nocontent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 90rpx);
}

.nocontent image {
  width: 340rpx;
  height: 272rpx;
  padding-left: 80rpx;
}

.blank_text {
  padding-top: 40rpx;
  color: #c6c6c8;
  font-size: 32rpx;
  letter-spacing: 2rpx;
}

.totop {
  position: fixed;
  right: 60rpx;
  bottom: 100rpx;
}

.totop image {
  width: 100rpx;
  height: 100rpx;
}

@import "@/../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/bin";
</style>
