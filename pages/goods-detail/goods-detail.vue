<template>
  <div class="container">
    <!-- 卖家信息栏 test -->
    <div class="seller-warp">
      <div class="seller-info">
        <!-- 左边 -->
        <div class="seller-info__left">
          <div class="avatar-info">
            <image class="avatar-info__avatar" :src="userInfo.avatarUrl" mode="" />
            <span class="avatar-info__name">{{ userInfo.nickName }}</span>
          </div>
          <span class="on-sell__number">我有{{ userInfo.goodsNum }}件商品在售</span>
        </div>
        <!-- 右边 -->
        <div class="seller-info__right">
          <!-- 认证标签 -->
          <div class="certification-labels">
            <div class="label vip" v-if="userInfo.vip">
              <image class="label__icon vip" src="../../static/goods-detail/vip.svg" mode="" />
              <span class="vip__txt">vip</span>
            </div>
            <div class="label auditor" v-if="userInfo.isAuditor">
              <image class="label__icon" src="../../static/goods-detail/auditor.svg" mode="" />
              <span class="auditor__txt">审核员</span>
            </div>
            <div class="label deal-num" v-if="userInfo.dealNum > 0">
              <image class="label__icon" src="../../static/goods-detail/deal.svg" mode="" />
              <span class="deal-num__txt">已成交{{ userInfo.dealNum }}</span>
            </div>
          </div>
          <!-- 联系方式 -->
          <div class="contact__button">
            <van-button @click="popContact" icon="smile-comment-o" round type="info" color="#7232dd" size="small">
              马上预定
            </van-button>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-card">
      <!-- 价格和收藏栏 -->
      <div class="detail-card__bottom">
        <!-- 商品介绍文本 -->
        <div class="detail-card__desc">
          {{ good.title }}
        </div>
        <div class="detail-card__bar">
          <div class="price">￥{{ good.price }}<span class="label"> <span class="text">{{ good.transport }}</span></span>
          </div>
          <!-- 上架时间 -->
          <div class="detail-card__time">{{ good.quality }}</div>
        </div>
        <!-- 浏览量 -->
        <div class="detail-card__icons">
          <div class="address">
            <image class="icon-address" src="../../static/label/address.svg" mode="scaleToFill" />{{ good.address }}
          </div>
          <div class="browse">
            {{ good.views }} 浏览
          </div>

        </div>
      </div>
    </div>
    <!-- 详情页面展示  -->
    <div class="image" v-for="(pic, index) in good.pics" :key="index">
      <image class="detail-card__img" mode="aspectFill" :src="pic.url" />
    </div>

  </div>
</template>

<script>
import VanButton from "../../wxcomponents/vant/button/index";
var util = require("../utils/formatTime.js");
const db = wx.cloud.database()
const _ = db.command;

export default {
  data() {
    return {
      good: {},
      goodId: '',
      goodsInfo: {},
      userInfo: ''
    };
  },
  components: { VanButton },
  onLoad: function (option) {
    console.log(option.goodId, '//打印出上个页面传递的参数。'); //打印出上个页面传递的参数。
    console.log(option.flag, '//打印出上个页面传递的参数。'); //打印出上个页面传递的参数。

    this.goodId = option.goodId;
    if (option.flag === '1') {
      // 从我的页面--我的商品来的
      this.goodsInfo = uni.getStorageSync('goodsInfoFlag');
    } else {
      // 从主页来的
      this.goodsInfo = uni.getStorageSync('goodsInfo');
    }
    // 用户信息
    let userInfo = uni.getStorageSync('userInfo');
    this.getUserInfo(userInfo._id);
    this.userInfo = userInfo;
    console.log(userInfo, '查看详情页的用户信息');
    // 更新浏览量
    this.updateViews(option);
    this.render(option.goodId);


  },
  methods: {
    async getUserInfo(id) {
      await db.collection('user-info').doc(id).get().then((res) => {
        console.log('详情页面----------获取用户信息', res);
      })
    },
    async updateViews(option) {
      await db.collection('goods').doc(option.goodId).update({
        data: {
          views: _.inc(1),
        },
        success: function (res) {
          console.log(res, '更新--浏览量--成功')
        }
      })
    },
    async sendBookingSuccessMsg() {
      // 处理时间格式
      let startingTime = util.formatTime(this.buyTime);

      // 现在的毫秒数
      let cur = Date.now();

      // 两天后的毫秒数
      let curAdd2 = cur + (86400000 * 2)
      // 数字化
      curAdd2 = parseInt(curAdd2)
      // 
      let twoDaysLater = new Date(curAdd2);
      twoDaysLater = util.formatTime(twoDaysLater);
      console.log(twoDaysLater);
      await wx.cloud
        .callFunction({
          name: "sendBookingSuccessMsg",
          data: {
            openid: this.good.userInfo._openid,
            goodId: this.goodId,
            orderInfo: this.good.title,
            startingTime: startingTime,
            contact: this.good.contact,
            address: this.good.address,
            endTime: twoDaysLater
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updataBuyTime() {
      this.buyTime = new Date();

      let id = this.good._id;
      console.log(this.buyTime);
      await db.collection("goods").doc(id).update({
        data: {
          buyTime: this.buyTime,
          buy: true
        },
        success: function (res) {
          console.log(res)
        }
      })

    },
    popContact() {
      console.log('弹窗联系方式--');
      let { contact } = this.good;
      let _this = this;
      wx.showModal({
        title: '联系我~',
        content: contact,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // 复制到粘贴板
            wx.setClipboardData({
              data: contact,
              success(res) {
                wx.getClipboardData({
                  success(res) {
                    console.log("已成功复制联系方式", res.data);
                    // 更新数据库中的数据：预定信息，将其锁定，并上传预定的时间和购买状态。
                    _this.updataBuyTime();
                    // 发出订阅消息通知卖家该商品已被某某预定，附带联系方式，请卖家及时主动联系买家进行交货。
                    _this.sendBookingSuccessMsg();
                    // TODO 每次有发布过商品的卖家登录该小程序时，如果其有商品是buy，则弹窗提示卖家进行核验该商品是否卖出去，如果是则下架该商品。
                  },
                });
              },
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    render(goodId) {
      console.log(goodId);
      console.log(this.goodsInfo);
      this.goodsInfo.forEach(good => {
        if (good._id === goodId) {
          this.good = good;
          console.log("商品详情--该商品--", good);
          console.log("商品详情--发布该商品的用户--", good.userInfo);
        }
      });
    },

  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 29.79rpx 50px;
  background-color: #f0f0f0;

  .detail-card {
    width: 100%;
    height: auto;
    padding: 10px 0 5px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 35.05rpx;


    .detail-card__bottom {
      margin: 22.78rpx;

      .detail-card__bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 52.57rpx;
        padding-top: 10px;
        margin-top: 10rpx;

        .price {
          display: flex;
          align-items: center;
          color: red;
          font-size: 50rpx;
          font-weight: bold;
          text-align: center;

          .label {
            width: auto;
            margin-left: 5px;
            font-size: 10px;
            font-weight: normal;
            background-color: #0095ff;
            border-radius: 2px;

            .text {
              padding: 5px 6px;
              color: #fff;
              font-size: 10px;
            }
          }
        }
      }
    }

    .detail-card__time {
      height: 17.52rpx;
      padding-right: 10px;
      margin: 14.02rpx 0 17.52rpx 0;
      font-size: 30rpx;
      font-style: italic;
      font-weight: bold;
    }

    .detail-card__desc {
      height: auto;
      margin-bottom: 17.52rpx;
    }

    .detail-card__icons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      font-size: 12px;

      .address {
        display: flex;
        align-items: center;

        .icon-address {
          width: 15px;
          height: 15px;
          padding-right: 5px;
        }
      }

      .browse {
        padding-right: 10px;
        color: rgb(131, 131, 131);
        font-size: 10px;
      }
    }
  }

  .image {
    .detail-card__img {
      width: 100%;

// height: 620rpx;
      // margin-bottom: 10px;
      border-radius: 35.05rpx;
    }
  }

  .seller-warp {
    height: 175.23rpx;
    margin: 30rpx 0;

    .seller-info {
      display: flex;
      width: 100%;
      height: 175.23rpx;
      background-color: #ffe21b;
      border-radius: 35.05rpx;

      .seller-info__left {
        display: flex;
        flex-direction: column;
        width: 50%;

        .avatar-info {
          display: flex;
          align-items: center;
          margin: 35.05rpx 0rpx 0 35.05rpx;

          .avatar-info__avatar {
            width: 87.62rpx;
            height: 87.62rpx;
            margin-right: 21.03rpx;
            background-color: #2a82e4;
            border-radius: 50%;
          }

          .avatar-info__name {
            font-weight: bold;
          }
        }

        .on-sell__number {
          width: auto;
          margin-left: 141.17rpx;
          font-size: 21.03rpx;
        }
      }

      .seller-info__right {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        padding: 35.05rpx 17.52rpx 0;

        .certification-labels {
          display: flex;
          font-size: 17.52rpx;

          .label {
            display: flex;
            align-items: center;
            padding: 5rpx;
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
              // margin-right: 5rpx;
            }
          }

          .label.auditor {
            background-color: #2a82e4;
          }

          .label.deal-num {
            background-color: #43cf7c;
          }
        }

        .contact__button {
          display: flex;
          justify-content: center;
          margin-top: 35.05rpx;
        }
      }
    }
  }
}
</style>
