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
    <VanTabs
      v-show="tabid == 1 || tabid == 2 || tabid == 4"
      :activePage="activePage"
      type="card"
      class="van-tabs"
      @click="onChangeVanTab"
      color="#ffc300"
      background="#e9e9e9">
      <VanTab
        :title="tabid == 1 ? '确认预定订单' : tabid == 2 ? '待收货' : '已取消预定'"
        class="good-container"
        color="#ffc300">
        <view class="text-tip">{{ tabid == 1 ? "有买家预定您的商品，是否同意此预定？" : "" }}</view>
      </VanTab>
      <VanTab
        :title="tabid == 1 ? '等待卖家确认' : tabid == 2 ? '待发货' : '已取消交易'"
        class="want-container"
        color="#ffc300">
        <view class="text-tip">{{ tabid == 1 ? "您预定的商品，需要等待卖家确认预定，您可以主动联系卖家。" : "" }}</view>
      </VanTab>
      <VanTab
        v-if="tabid == 4"
        title="已拒绝预定"
        class="want-container"
        color="#ffc300">
      </VanTab>
    </VanTabs>
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
              <view
                v-if="tabid === 0 || tabid === 3"
                :class="'title ' + (item.status == 1 ? 'text-red' : '')">
                <image src="../../../static/order/road-sign.svg"></image>
                <view>{{
                  /* tabid == 0 && item.status == 1
                    ? "待确认"
                    : tabid == 0 && item.status == 2
                    ? "交易中"
                    : tabid == 0 && item.status == 3
                    ? "交易完成"
                    : tabid == 0 && item.status == 4
                    ? "已取消预定"
                    : tabid == 0 && item.status == 42
                    ? "已取消交易"
                    : tabid == 0 && item.status == 43
                    ? "已拒绝预定"
                    : */ item.status == 1 && item.seller == openid
                    ? "买家的预定订单"
                    : item.status == 1 && item._openid == openid
                    ? "等待卖家确认订单"
                    : item.status == 2 && item._openid == openid
                    ? "待收货"
                    : item.status == 2 && item.seller == openid
                    ? "待发货"
                    : item.status == 3
                    ? "交易完成"
                    : item.status == 4
                    ? "已取消预定"
                    : item.status == 42
                    ? "已取消交易"
                    : item.status == 43
                    ? "已拒绝预定"
                    : "已取消"
                }}</view>
              </view>
              <view class="date">{{ morejs.timelog(item.creat) }}</view>
            </view>
          </view>
          <view class="centerui">
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
            <!-- 拒绝预定：卖家拒绝买家的预定请求 -->
            <view
              v-if="item.status == 1 && item.seller == openid"
              class="cancel"
              @tap.stop.prevent="rejectReserve"
              :data-ord="item"
              >拒绝预定</view
            >
            <!-- 确认预定：向买家发送确认订单的通知，表明卖家确认了买家的预定申请 -->
            <view
              v-if="item.status == 1 && item.seller == openid"
              class="confirm"
              @tap.stop.prevent="confirmReserve"
              :data-ord="item">
              确认订单
            </view>
            <!-- 待确认-等待买家确认 -->
            <view
              v-if="item.status == 1 && item._openid == openid"
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
                @tap.stop.prevent="cancelTransaction"
                :data-ord="item"
                >取消交易</view
              >
              <view
                v-if="item.status == 2 && item._openid == openid"
                class="confirm"
                @tap.stop.prevent="confirm"
                :data-ord="item"
                :data-issend="false"
                >确认收货</view
              >
              <view
                v-if="item.status == 2 && item.seller == openid"
                class="confirm"
                @tap.stop.prevent="confirm"
                :data-ord="item"
                :data-issend="true"
                >确认发货</view
              >
            </block>
            <!-- 完成交易和已取消 -->
            <view
              v-if="item.status == 3 || item.status == 4 || item.status == 42 || item.status == 43"
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
    <!-- 确认订单-弹窗提示 -->
    <uni-popup
      ref="popup"
      @change="change">
      <view class="popup-container">
        <view
          class="popup-content"
          :class="{ 'popup-height': type === 'left' || type === 'right' }">
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
                <checkbox
                  :value="isAgree"
                  :checked="isAgree"
                  color="#1890ff"
                  style="transform: scale(0.7)" />我已认真读完上面的提示，并同意遵守相关规定。
              </label>
            </checkbox-group>
            <button
              class="detail-button"
              @click="goToOrderDetail">
              去订单详情
            </button>
          </view>
        </view>
      </view>
    </uni-popup>
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
      isAgree: false,
      code: 0,
      itemid: "",
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
  // TODO 修改
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
    // 待确认子级导航栏切换
    onChangeVanTab(e) {
      this.activePage = e.index;
      uni.showLoading({
        title: "加载中",
        mask: true,
      });

      this.tabOperate();
    },
    //判断在哪个tabid下的操作,执行对应的getlist
    async tabOperate() {
      console.log("tabid :>> ", this.tabid);
      console.log("activePage :>> ", this.activePage);
      // 全部
      if (this.tabid === 0) {
        this.getAllList();
      } else if (this.tabid === 1 && this.activePage === 0) {
        // 待确认&&确认预定订单
        this.list = await this.getlist1();
      } else if (this.tabid === 2 && this.activePage === 0) {
        // 交易中-待收货
        this.list = await this.getlist2(2);
      } else if (this.tabid === 2 && this.activePage === 1) {
        // 交易中-待发货
        this.list = await this.getlist3(2);
      } else if (this.tabid === 4 && this.activePage === 1) {
        // 已取消交易
        this.list = await this.getlist42();
      } else if (this.tabid === 4 && this.activePage === 2) {
        // 已拒绝预定
        this.list = await this.getlist43();
      } else {
        // 1.等待卖家确认
        // 2.已取消预定
        this.list = await this.getlist();
      }
    },
    //获取全部列表
    async getAllList() {
      try {
        // 显示加载中提示
        uni.showLoading({
          title: "加载中",
          mask: true,
        });

        /* // 并行获取所有列表数据
        const [list, list1, list2, list3, list42] = await Promise.all([
          this.getlist(true),
          this.getlist1(true),
          this.getlist2(2, true),
          this.getlist3(2, true),
          this.getlist42(true),
        ]); */
        // 并行获取所有列表数据
        const [list, list1, list3, list42] = await Promise.all([this.getlist(true), this.getlist1(true), this.getlist3(2, true), this.getlist42(true)]);

        // 输出各个列表数据
        console.log("list :>> ", list);
        console.log("list1 :>> ", list1);
        // console.log("list2 :>> ", list2);
        console.log("list3 :>> ", list3);
        console.log("list42 :>> ", list42);

        // 合并并按创建时间排序所有列表数据
        const allList = [...list, ...list1, ...list3, ...list42].sort((a, b) => b.creat - a.creat);

        // 按状态筛选列表数据
        const list2Arr = allList.filter((item) => item.status === 2);
        const list1Arr = allList.filter((item) => item.status === 1);
        const OtherArr = allList.filter((item) => item.status !== 2 && item.status !== 1);

        // 合并按状态排序后的列表数据:交易中-待确认-其他
        const listAll = [...list2Arr, ...list1Arr, ...OtherArr];

        this.list = listAll;

        console.log("listAll :>> ", listAll);
      } catch (error) {
        // 处理异步操作中的错误
        console.error("在 getAllList 中发生错误: ", error);
      } finally {
        // 隐藏加载提示，确保无论异步操作成功或失败都执行
        uni.hideLoading();
      }
    },
    //获取已取消和已拒绝的列表

    //获取列表(确认预定的订单之外的)
    async getlist(isAll = false) {
      console.log("getlist :>> ");
      let that = this;

      let status = that.tabid;
      if (status == 0) {
        var statusid = _.neq(0); //除-2之外所有
      } else {
        var statusid = parseInt(status); //小程序搜索必须对应格式
      }
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
          // list: that.tabid == 0 ? that.list : re.data,
        });

        if (!isAll) {
          uni.hideLoading();
        }
        return re.data;
      } catch (error) {
        console.log("getlist error :>> ", error);
        uni.hideLoading();
        return [];
      }
    },
    //获取列表(确认预定的订单)
    async getlist1(isAll = false) {
      console.log("getlist1 :>> ");

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

        uni.stopPullDownRefresh(); //暂停刷新动作
        that.setData({
          nomore: false,
          page: 0,
          // list: that.tabid == 0 ? that.list : re.data,
        });

        if (!isAll) {
          uni.hideLoading();
        }
        return re.data;
      } catch (error) {
        console.log("error :>> ", error);
        uni.hideLoading();

        return [];
      }
    },
    //获取列表(交易中-待收货)
    async getlist2(status, isAll = false) {
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
            status: status,
            seller: _.neq(this.openid), // 卖家不是本人的
            _openid: this.openid, // 买家是本人的
          })
          .orderBy("creat", "desc")
          .get();

        uni.stopPullDownRefresh(); //暂停刷新动作
        that.setData({
          nomore: false,
          page: 0,
          // list: re.data,
        });

        if (!isAll) {
          uni.hideLoading();
        }
        return re.data;
      } catch (error) {
        console.log("error :>> ", error);
        uni.hideLoading();

        return [];
      }
    },
    //获取列表(交易中-待发货)
    async getlist3(status, isAll = false) {
      /*
      1. seller: 本人
      2. status：2
       */
      console.log("getlist3 :>> ");

      let that = this;
      try {
        const re = await db
          .collection("order")
          .where({
            status: status,
            seller: this.openid, // 卖家是本人的
          })
          .orderBy("creat", "desc")
          .get();

        uni.stopPullDownRefresh(); //暂停刷新动作
        that.setData({
          nomore: false,
          page: 0,
          // list: re.data,
        });

        if (!isAll) {
          uni.hideLoading();
        }
        return re.data;
      } catch (error) {
        console.log("error :>> ", error);
        uni.hideLoading();

        return [];
      }
    },
    //获取列表(已取消-已取消交易)
    async getlist42(isAll = false) {
      console.log("getlist42 :>> ");
      /*
        status：42
        seller：this.openid
        or _openid: this.openid
      */
      const pendingReceipt = await this.getlist2(42);
      const toBeShipped = await this.getlist3(42);

      return [...pendingReceipt, ...toBeShipped].sort((a, b) => b.creat - a.creat);

      if (!isAll) {
        uni.hideLoading();
      }
    },
    //获取列表(已取消-已拒绝)
    async getlist43(isAll = false) {
      /*
        status：43
        seller：this.openid

      */
      console.log("getlist43 :>> ");

      console.log("已拒绝 :>> ");

      let that = this;
      try {
        const re = await db
          .collection("order")
          .where({
            status: 43,
            seller: this.openid, // 卖家是本人的
          })
          .orderBy("creat", "desc")
          .get();

        uni.stopPullDownRefresh(); //暂停刷新动作
        that.setData({
          nomore: false,
          page: 0,
          // list: re.data,
        });

        if (!isAll) {
          uni.hideLoading();
        }
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
                        status: 41, // 4表示交易取消，1表示：买家已取消预定
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
      this.isAgree = false;

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
    //卖家拒绝预定(订单确认通知)
    rejectReserve(ord) {
      console.log("卖家点击了拒绝预定", ord);
      let that = this;
      let detail = ord.currentTarget.dataset.ord;
      uni.showModal({
        title: "温馨提示",
        content: "您确认要拒绝该预定吗？拒绝后，系统默认将该商品下架",
        showCancel: true,
        success: ({ confirm, cancel }) => {
          if (confirm) {
            uni.showLoading({
              title: "正在处理",
              mask: true,
            });
            // 1.修改卖家在售状态
            db.collection("publish")
              .doc(detail.sellid)
              .update({
                data: {
                  status: 43, //4表示交易取消，3表示：卖家拒绝预定
                },
                success: function (res) {
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
                success: function (res) {
                  console.log("修改订单状态成功", res);
                  // 3.给买家发送订单确认通知
                  that.sendOrderConfirmMsg(detail._openid, {
                    orderId: detail._id,
                    goodName: detail.bookinfo.title,
                    time: util.formatTime(new Date()),
                    content: "卖家拒绝了您的预定请求",
                    note: "您可以再看看其他卖家的商品",
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
        success: ({ confirm, cancel }) => {
          if (confirm) {
            uni.showLoading({
              title: "加载中",
              mask: true,
            });
            // 1. 修改卖家在售状态
            db.collection("publish")
              .doc(detail.sellid)
              .update({
                data: {
                  status: 42, //4表示交易取消，2表示：卖家取消交易
                },
                success: function (res) {
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
                success: function (res) {
                  console.log("修改订单状态成功", res);
                  // 3. 给买家发送订单状态变更通知
                  that.sendOrderChangeMsg(detail._openid, {
                    orderId: detail._id,
                    goodName: detail.bookinfo.title,
                    status: "取消交易",
                    time: util.formatTime(new Date()),
                    note: "卖家取消交易，交易作废。",
                  });
                  // 4. 判断在哪个tabid下的操作,执行对应的getlist
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
    // 买家取消交易
    cTForBuyer(detail) {
      let that = this;

      console.log("买家取消交易 :>> ");
      uni.showModal({
        title: "提示",
        content: "您确认要取消该交易吗？",
        showCancel: true,
        success: ({ confirm, cancel }) => {
          if (confirm) {
            uni.showLoading({
              title: "加载中",
              mask: true,
            });
            // 1.修改卖家在售状态
            db.collection("publish")
              .doc(detail.sellid)
              .update({
                data: {
                  status: 0,
                },
                success: function (res) {
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
                success: function (res) {
                  console.log("修改订单状态成功", res);
                  // 3.给卖家发送订单状态变更通知
                  that.sendOrderChangeMsg(detail.seller, {
                    orderId: detail._id,
                    goodName: detail.bookinfo.title,
                    status: "取消交易",
                    time: util.formatTime(new Date()),
                    note: "买家取消交易，商品将重新回归市场。",
                  });
                  // 4.判断在哪个tabid下的操作,执行对应的getlist
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
    //确认收货/确认发货
    confirm(ord) {
      let that = this;
      let detail = ord.currentTarget.dataset.ord;
      let isSend = ord.currentTarget.dataset.issend;
      console.log(ord, isSend);
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
                  //4. 判断在哪个tabid下的操作,执行对应的getlist
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
                  //4. 判断在哪个tabid下的操作,执行对应的getlist
                  that.tabOperate();
                },
                fail: console.error,
              });
          }
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
          success: async function (res) {
            console.log("获取订单成功", res);
            console.log("res :>> ", res);
            if (res.data.code) {
              // 有交易码
              that.code = res.data.code;
            } else {
              // 无交易码
              let code = Math.floor(Math.random() * 1000000);
              that.code = code;
              db.collection("order")
                .doc(id)
                .update({
                  data: {
                    code: code,
                  },
                  success: function (res) {
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
    //跳转详情页
    godetail(e) {
      uni.navigateTo({
        url: "/pages/order/detail/detail?id=" + e.currentTarget.dataset.id,
      });
    },
    goToOrderDetail(e) {
      console.log("itemid :>> ", this.itemid);
      // 点击确认订单的详情页tiaozhuan
      if (!this.isAgree) {
        uni.showModal({
          title: "提示",
          content: "请先阅读并勾选同意《湾大闲置品平台交易规则》",
          showCancel: true,
          success: ({ confirm, cancel }) => {},
        });
        return;
      }
      if (this.isAgree) {
        uni.navigateTo({
          url: "/pages/order/detail/detail?id=" + this.itemid,
        });
      }
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
  margin-bottom: 15rpx;
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
  padding-top: 10rpx;
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

.centerui {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}

.centerui image {
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

.text-tip {
  padding-top: 15rpx;
  color: #666;
  font-size: 28rpx;
  text-indent: 40rpx;
}

/* 弹窗容器 */
.popup-container {
  margin: 20px;
}

/* 弹窗内容 */
.popup-content {
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
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

/* 提示信息样式 */
.reminder {
  padding: 30rpx;
}

.reminder-title {
  margin-bottom: 8px;
  color: #333;
  font-size: 16px;
  font-weight: bold;
}

.reminder-text {
  color: #666;
  font-size: 15px;
  line-height: 1.5;
}

/* 注意事项样式 */
.attention {
  padding: 30rpx;
}

.attention-title {
  margin-bottom: 8px;
  color: #ff4d4f;
  font-size: 16px;
  font-weight: bold;
}

.attention-text {
  color: #ff4d4f;
  font-size: 15px;
  line-height: 1.5;
}

/* 按钮样式 */
.detail-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  background-color: #1890ff;
  border: none;
  border-radius: 4px;
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

@import "@/../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/bin";
</style>
