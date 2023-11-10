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
      <VanTabs
        v-show="tabid == 1 || tabid == 2"
        :activePage="activePage"
        type="card"
        class="van-tabs"
        @click="onChangeVanTab"
        color="#ffc300"
        background="#e9e9e9">
        <VanTab
          :title="tabid == 1 ? '确认预定订单' : '待收货'"
          class="good-container"
          color="#ffc300">
          <view class="text-tip">{{ tabid == 1 ? "有买家预定您的商品，是否同意此预定？" : "" }}</view>
        </VanTab>
        <VanTab
          :title="tabid == 1 ? '等待卖家确认' : '待发货'"
          class="want-container"
          color="#ffc300">
          <view class="text-tip">{{ tabid == 1 ? "您预定的商品，需要等待卖家确认预定，您可以主动联系卖家。" : "" }}</view>
        </VanTab>
      </VanTabs>
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
                <view>{{
                  tabid == 0 && item.status == 1
                    ? "待确认"
                    : tabid == 0 && item.status == 2
                    ? "交易中"
                    : tabid == 0 && item.status == 3
                    ? "交易完成"
                    : tabid == 0 && item.status == 4
                    ? "已取消"
                    : item.status == 1 && activePage == 0
                    ? "买家的预定订单"
                    : item.status == 1 && activePage == 1
                    ? "等待卖家确认订单"
                    : item.status == 2 && activePage == 0
                    ? "待收货"
                    : item.status == 2 && activePage == 1
                    ? "待发货"
                    : item.status == 3
                    ? "交易完成"
                    : item.status == 1 && tabid == 0
                    ? "待确认"
                    : item.status == 2 && tabid == 0
                    ? "交易中"
                    : "已取消"
                }}</view>
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
            <!-- 待确认-确认预定订单部分 -->
            <block>
              <!-- 拒绝预定：卖家拒绝买家的预定请求 -->
              <view
                v-if="item.status == 1 && activePage == 0"
                class="cancel"
                @tap.stop.prevent="rejectReserve"
                :data-ord="item"
                >拒绝预定</view
              >
              <!-- 确认预定：向买家发送确认订单的通知，表明卖家确认了买家的预定申请 -->
              <view
                v-if="item.status == 1 && activePage == 0"
                class="confirm"
                @tap.stop.prevent="confirmReserve"
                :data-ord="item">
                确认订单
              </view>
            </block>
            <!-- 待确认-等待买家确认 -->
            <view
              v-if="item.status == 1 && activePage == 1"
              class="cancel"
              @tap.stop.prevent="cancelReserve"
              :data-ord="item"
              >取消预定</view
            >
            <!-- 交易中 -->
            <block>
              <view
                v-if="item.status == 2"
                class="cancel"
                @tap.stop.prevent="confirm"
                :data-ord="item"
                >取消交易</view
              >
              <view
                v-if="item.status == 2 && activePage == 0"
                class="confirm"
                @tap.stop.prevent="confirm"
                :data-ord="item"
                >确认收货</view
              >
              <view
                v-if="item.status == 2 && activePage == 1"
                class="confirm"
                @tap.stop.prevent="confirm"
                :data-ord="item"
                >确认发货</view
              >
            </block>
            <!-- 完成交易和已取消 -->
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
import VanTab from "../../../wxcomponents/vant/tab/index.js";
import VanTabs from "../../../wxcomponents/vant/tabs/index.js";

const _ = db.command;
export default {
  components: {
    VanTab,
    VanTabs,
  },
  data() {
    return {
      scrollTop: 0,
      nomore: false,
      activePage: 0,
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
      openid: "",
    };
  },
  onLoad() {
    uni.showLoading({
      title: "加载中",
    });
    this.openid = uni.getStorageSync("openid");
    this.getAllList();
  },
  //下拉刷新
  onPullDownRefresh() {
    if (this.tabid === 0) {
      this.getAllList();
    } else if (this.tabid === 1 && this.activePage === 0) {
      this.getlist1();
    } else {
      this.getlist();
    }
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
    // 待确认子级导航栏切换
    onChangeVanTab(e) {
      this.activePage = e.index;
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      /*  if (this.activePage === 0) {
        this.getlist1();
      } else {
        this.getlist();
      } */
      this.tabOperate();
    },
    //导航栏切换
    async changeTab(e) {
      let that = this;

      that.setData({
        tabid: e.currentTarget.dataset.id,
      });
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      this.tabOperate();
    },
    //判断在哪个tabid下的操作,执行对应的getlist
    tabOperate() {
      // 全部
      if (this.tabid === 0) {
        this.getAllList();
      }
      // 待确认&&确认预定订单
      if (this.tabid === 1 && this.activePage === 0) {
        this.getlist1();
      } else if (this.tabid === 2 && this.activePage === 0) {
        // 交易中-待收货
        /*
          seller: q4
          _openid: NQ
          status:2
        */
        this.getlist2();
      } else if (this.tabid === 2 && this.activePage === 1) {
        this.getlist3();
      } else {
        this.getlist();
      }
    },
    //获取全部列表
    async getAllList() {
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      const list = await this.getlist();
      const list1 = await this.getlist1();
      const list2 = await this.getlist2();
      const list3 = await this.getlist3();
      console.log("list :>> ", list);
      console.log("list1 :>> ", list1);
      console.log("list2 :>> ", list2);
      console.log("list3 :>> ", list3);

      // 链接四个数组，并按照creat排序
      this.list = [...list, ...list1, ...list2, ...list3].sort((a, b) => b.creat - a.creat);

      // uni.hideLoading();
    },

    //跳转详情页
    godetail(e) {
      uni.navigateTo({
        url: "/pages/order/detail/detail?id=" + e.currentTarget.dataset.id,
      });
    },

    //获取列表(确认预定的订单之外的)
    async getlist() {
      let that = this;

      let status = that.tabid;
      if (status == 0) {
        var statusid = _.neq(0); //除-2之外所有
      } else {
        var statusid = parseInt(status); //小程序搜索必须对应格式
      }
      console.log("this.openid :>> ", this.openid);
      try {
        const re = await db
          .collection("order")
          .where({
            status: statusid,
            _openid: this.openid,
          })
          .orderBy("creat", "desc")
          .get();
        uni.stopPullDownRefresh(); //暂停刷新动作
        that.setData({
          nomore: false,
          page: 0,
          list: that.tabid == 0 ? that.list : re.data,
        });

        uni.hideLoading();
        console.log("re.data :>> ", re.data);
        return re.data;
      } catch (error) {
        console.log("error :>> ", error);
        uni.hideLoading();

        return [];
      }
    },
    //获取列表(确认预定的订单)
    async getlist1() {
      let that = this;
      try {
        const re = await db
          .collection("order")
          .where({
            status: 1,
            seller: this.openid,
          })
          .orderBy("creat", "desc")
          .get();

        console.log("re :>> ", re);
        uni.stopPullDownRefresh(); //暂停刷新动作
        that.setData({
          nomore: false,
          page: 0,
          list: that.tabid == 0 ? that.list : re.data,
        });

        uni.hideLoading();
        return re.data;
      } catch (error) {
        console.log("error :>> ", error);
        uni.hideLoading();

        return [];
      }
      /* const re=await db
        .collection("order")
        .where({
          status: 1,
          seller: this.openid,
        })
        .orderBy("creat", "desc")
        .get({
          success(re) {
            console.log("re :>> ", re);
            uni.stopPullDownRefresh(); //暂停刷新动作
            that.setData({
              nomore: false,
              page: 0,
              list: re.data,
            });
            uni.hideLoading();
            return re.data;
          },
        }); */
    },
    //获取列表(交易中-待收货)
    async getlist2() {
      console.log("getlist2 :>> ");
      /*
          seller: q4
          _openid: NQ
          status:2
        */
      let that = this;
      try {
        const re = await db
          .collection("order")
          .where({
            status: 2,
            seller: _.neq(this.openid), // 卖家不是本人的
          })
          .orderBy("creat", "desc")
          .get();

        console.log("re :>> ", re);
        uni.stopPullDownRefresh(); //暂停刷新动作
        that.setData({
          nomore: false,
          page: 0,
          list: re.data,
        });

        uni.hideLoading();
        return re.data;
      } catch (error) {
        console.log("error :>> ", error);
        uni.hideLoading();

        return [];
      }
    },
    //获取列表(交易中-待发货)
    async getlist3() {
      /*
      1. seller: 本人
      2. status：2
       */
      let that = this;
      try {
        const re = await db
          .collection("order")
          .where({
            status: 2,
            seller: this.openid, // 卖家是本人的
          })
          .orderBy("creat", "desc")
          .get();

        console.log("re :>> ", re);
        uni.stopPullDownRefresh(); //暂停刷新动作
        that.setData({
          nomore: false,
          page: 0,
          list: re.data,
        });

        uni.hideLoading();
        return re.data;
      } catch (error) {
        console.log("error :>> ", error);
        uni.hideLoading();

        return [];
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

    //取消订单(订单为待确认或者待收货时候，取消后卖家状态恢复)
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
                          status: "取消预定",
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
                          status: "取消预定",
                          time: util.formatTime(new Date()),
                          note: "买家取消预定该商品",
                        });
                        // 判断在哪个tabid下的操作，执行对应的getlist
                        that.tabOperate();
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
    //卖家确认订单(订单确认通知)
    confirmReserve(ord) {
      console.log("ord :>> ", ord);
      let that = this;
      let detail = ord.currentTarget.dataset.ord;

      uni.showModal({
        title: "温馨提示",
        content: "您确认要同意该预定吗",
        showCancel: true,
        success: ({ confirm, cancel }) => {
          if (confirm) {
            uni.showLoading({
              title: "正在处理",
              mask: true,
            });
            // 1.修改订单状态
            db.collection("order")
              .doc(detail._id)
              .update({
                data: {
                  status: 2,
                },
                success: function (res) {
                  console.log("修改订单状态成功", res);
                  // 2.给买家发送订单确认通知
                  that.sendOrderConfirmMsg(detail._openid, {
                    orderId: detail._id,
                    goodName: detail.bookinfo.title,
                    time: util.formatTime(new Date()),
                    content: "卖家同意了您的预定请求",
                    note: "请尽快与卖家联系，确认交易事宜",
                  });
                  // 3.判断在哪个tabid下的操作,执行对应的getlist
                  that.tabOperate();
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
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 25%;
  height: 100%;
}

.tab_one view {
  display: flex;
  align-items: center;
  height: 100%;
  letter-spacing: 2rpx;
  font-size: 30rpx;
}

.tab_on {
  border-bottom: 4rpx solid #fbbd08;
  font-weight: 600;
  font-size: 32rpx;
}

.contain {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 24rpx;
  width: 100%;
}

.card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-bottom: 30rpx;
  padding: 15rpx 30rpx;
  width: 100%;
  border-radius: 15rpx;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20rpx;
  width: 100%;
  border-bottom: 1rpx solid #eee;
}

.text-red {
  color: #f60;
}

.top1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.date {
  color: #b2b2b2;
  letter-spacing: 2rpx;
  font-size: 28rpx;
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
  /* font-weight: 600; */
  letter-spacing: 3rpx;
  font-size: 28rpx;
}

.del {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10rpx;
  height: 40rpx;
  border: 1rpx solid #c2c2c2;
  border-radius: 20rpx;
}

.del image {
  width: 28rpx;
  height: 28rpx;
}

.del view {
  color: #c2c2c2;
  letter-spacing: 3rpx;
  font-size: 26rpx;
}

.center {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20rpx 0;
  width: 100%;
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
  padding: 0 20rpx;
  width: calc(100% - 150rpx);
  height: 150rpx;
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
  -webkit-box-orient: vertical;
  letter-spacing: 2rpx;
  font-size: 30rpx;

  -webkit-line-clamp: 2;
}

.book_author {
  overflow: hidden;
  padding-top: 10rpx;
  color: #c2c2c2;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 3rpx;
  font-size: 26rpx;
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
  padding: 20rpx 0 0 0;
  width: 100%;
}

.cancel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20rpx;
  padding: 0 20rpx;
  width: 110rpx;
  height: 50rpx;
  border: 1rpx solid #c2c2c2;
  border-radius: 30rpx;
  color: #333;
  font-size: 26rpx;
}

.confirm {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20rpx;
  padding: 0 20rpx;
  width: 110rpx;
  height: 50rpx;
  border: 1rpx solid #f60;
  border-radius: 30rpx;
  color: #f60;
  font-size: 26rpx;
}

.nocontent {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 90rpx);
}

.nocontent image {
  padding-left: 80rpx;
  width: 340rpx;
  height: 272rpx;
}

.blank_text {
  padding-top: 40rpx;
  color: #c6c6c8;
  letter-spacing: 2rpx;
  font-size: 32rpx;
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

.text-tip {
  padding-top: 15rpx;
  color: #666;
  text-indent: 40rpx;
  font-size: 28rpx;
}

@import "@/../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/bin";
</style>
