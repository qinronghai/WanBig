<template>
  <view style="height: 100%">
    <view
      class="contain"
      v-if="list.length !== 0">
      <block
        v-for="(item, index) in list"
        :key="index">
        <view
          class="card"
          @tap="detail"
          :data-detail="item">
          <view class="a">
            <view :class="'a1 ' + (item.status == 1 ? 'text-red' : '')">
              <image
                lazy-load
                src="/static/images/onsell.png"></image>
              {{ item.status == 0 ? "待出售" : item.status == 1 ? "交易中" : item.status == 2 ? "已完成" : "交易取消" }}
            </view>
            <view class="a2">{{ morejs.timelog(item.creat) }}</view>
          </view>
          <view class="b">
            <image
              lazy-load
              :src="item.bookinfo.pic"></image>
            <view class="b1">
              <view class="b11">
                <view class="b111 text-cut">{{ item.bookinfo.title }}</view>
                <view class="b112 text-cut">{{ item.bookinfo.author }}</view>
              </view>
              <view class="b12">￥{{ item.price }}.'00'元</view>
            </view>
          </view>
          <view class="c">
            <view
              class="c1 bg-grey"
              @tap.stop.prevent="del"
              :data-del="item"
              v-if="item.status !== 1"
              >删除</view
            >
            <view
              class="c2"
              v-if="item.status == 1"
              >更多操作</view
            >
            <view
              class="c1 bg-yellow"
              v-if="item.status == 0"
              @tap.stop.prevent="crash"
              :data-crash="item"
              >擦亮</view
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
      :show="scrollTop > 500"
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
const _ = db.command;
export default {
  data() {
    return {
      list: [],
      page: 1,
      scrollTop: 0,
      nomore: false,
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */ onLoad: function (options) {
    uni.showLoading({
      title: "加载中",
    });
    this.getList();
  },
  //下拉刷新
  onPullDownRefresh() {
    this.getList();
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
    getList() {
      let that = this;
      db.collection("publish")
        .where({
          _openid: uni.getStorageSync("openid"),
        })
        .orderBy("creat", "desc")
        .limit(20)
        .get({
          success: function (res) {
            uni.hideLoading();
            uni.stopPullDownRefresh(); //暂停刷新动作
            that.setData({
              list: res.data,
              nomore: false,
              page: 0,
            });
            console.log(res.data);
          },
        });
    },

    //删除
    del(e) {
      let that = this;
      let del = e.currentTarget.dataset.del;
      uni.showModal({
        title: "温馨提示",
        content: "您确定要删除此条订单吗？",
        success(res) {
          if (res.confirm) {
            uni.showLoading({
              title: "正在删除",
            });
            db.collection("publish")
              .doc(del._id)
              .remove({
                success() {
                  uni.hideLoading();
                  uni.showToast({
                    title: "成功删除",
                  });
                  that.getList();
                },
                fail() {
                  uni.hideLoading();
                  uni.showToast({
                    title: "删除失败",
                    icon: "none",
                  });
                },
              });
          }
        },
      });
    },

    //擦亮
    crash(e) {
      let that = this;
      let crash = e.currentTarget.dataset.crash;
      uni.showModal({
        title: "温馨提示",
        content: "您确定要擦亮此条订单吗？",
        success(res) {
          if (res.confirm) {
            uni.showLoading({
              title: "正在擦亮",
            });
            db.collection("publish")
              .doc(crash._id)
              .update({
                data: {
                  creat: new Date().getTime(),
                  dura: new Date().getTime() + 7 * (86400 * 1000), //每次擦亮管7天
                },

                success() {
                  uni.hideLoading();
                  uni.showToast({
                    title: "成功擦亮",
                  });
                  that.getList();
                },
                fail() {
                  uni.hideLoading();
                  uni.showToast({
                    title: "操作失败",
                    icon: "none",
                  });
                },
              });
          }
        },
      });
    },

    //查看详情
    detail(e) {
      let that = this;
      let detail = e.currentTarget.dataset.detail;
      if (detail.status == 0) {
        uni.navigateTo({
          url: "/pages/detail/detail?scene=" + detail._id,
        });
      }
      if (detail.status == 1) {
        uni.navigateTo({
          url: "/pages/sell/detail/detail?id=" + detail._id,
        });
      }
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
      db.collection("publish")
        .where({
          _openid: uni.getStorageSync("openid"),
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
  },
};
</script>
<style>
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
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 0 20rpx #eee;
  border-radius: 16rpx;
}

.a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 24rpx;
  border-bottom: 1rpx solid #eee;
}

.a1 {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  letter-spacing: 2rpx;
}

.text-red {
  color: #f80202;
}

.a1 image {
  width: 40rpx;
  height: 40rpx;
  padding-right: 10rpx;
}

.a2 {
  color: #b2b2b2;
  font-size: 28rpx;
  letter-spacing: 2rpx;
}

.b {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}

.b image {
  width: 130rpx;
  height: 130rpx;
}

.b1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  width: calc(100% - 130rpx);
  height: 130rpx;
  padding: 0 20rpx;
}

.b11 {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.b111 {
  font-size: 30rpx;
  letter-spacing: 2rpx;
}

.b112 {
  padding-top: 10rpx;
  color: #c2c2c2;
  font-size: 26rpx;
  letter-spacing: 3rpx;
}

.b12 {
  display: flex;
  justify-content: flex-end;
  color: #f80202;
  font-size: 32rpx;
}

.c {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 20rpx;
}

.c1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120rpx;
  height: 50rpx;
  margin-left: 20rpx;
  font-size: 26rpx;
  letter-spacing: 2rpx;
  border-radius: 10rpx;
}

.bg-grey {
  background: #eee;
}

.bg-yellow {
  color: #fff;
  background: #fbbd08;
}

.c2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200rpx;
  height: 53rpx;
  margin-left: 20rpx;
  color: #fff;
  font-size: 26rpx;
  letter-spacing: 4rpx;
  background: #f00;
  border-radius: 10rpx;
}

.nocontent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 100rpx);
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
@import "@/../../../../../uni-app开发工具/HBuilderX.3.3.13.20220314/HBuilderX/bin";
</style>
