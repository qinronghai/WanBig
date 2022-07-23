<template>
  <div class="container">
    <div class="detail-card">
      <!--详情页面展示  -->
      <image class="detail-card__img" src="https://s1.ax1x.com/2022/04/14/LQaGP1.jpg" />
      <!-- 价格和收藏栏 -->
      <div class="detail-card__bottom">
        <div class="detail-card__bar">
          <div class="price">￥10</div>
        </div>
        <!-- 上架时间 -->
        <div class="detail-card__time">上架于7天前</div>
        <!-- 商品介绍文本 -->
        <div class="detail-card__desc">
          但從頭到尾那些網頁也不是他自己寫的，呵呵；老師好、看似完美，甚至他沒有出席過任何一堂課
        </div>
        <!-- 浏览量和想要人数图标 -->
        <div class="detail-card__icons">
          <div class="browse">
            <image class="browse__icon" src="../../static/goods-detail/browse.svg" mode="" />
            <span class="browse__num">7</span>
          </div>
          <div class="heart">
            <image class="heart__icon" src="../../static/goods-detail/want.svg" mode="" />
            <span class="heart__num">7</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 卖家信息栏 test
	--> 
    <div class="seller-warp">
      <div class="seller-info">
        <!-- 左边 -->
        <div class="seller-info__left">
          <div class="avatar-info">
            <image class="avatar-info__avatar" src="" mode="" />
            <span class="avatar-info__name">AHAI</span>
          </div>
          <span class="on-sell__number">我有7件商品在售</span>
        </div>
        <!-- 右边 -->
        <div class="seller-info__right">
          <!-- 认证标签 -->
          <div class="certification-labels">
            <div class="label vip">
              <image class="label__icon vip" src="../../static/goods-detail/vip.svg" mode="" />
              <span class="vip__txt">vip</span>
            </div>
            <div class="label auditor">
              <image class="label__icon" src="../../static/goods-detail/auditor.svg" mode="" />
              <span class="auditor__txt">审核员</span>
            </div>
            <div class="label deal-num">
              <image class="label__icon" src="../../static/goods-detail/deal.svg" mode="" />
              <span class="deal-num__txt">已成交 8</span>
            </div>
          </div>
          <!-- 联系方式 -->
          <div class="contact__button">
            <van-button icon="smile-comment-o" round type="info" color="#7232dd" size="small">联系卖家</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 29.79rpx;
  background-color: #e9e9e9;

  .detail-card {
    width: 100%;
    height: auto;
    background-color: #fff;
    border-radius: 35.05rpx;

    .detail-card__img {
      width: 100%;
      height: 800rpx;
      border-radius: 35.05rpx 35.05rpx 0 0;
    }
    .detail-card__bottom {
      margin: 0 22.78rpx;

      .detail-card__bar {
        display: flex;
        justify-content: start;
        height: 52.57rpx;
        margin-top: 10rpx;
        .price {
          color: red;
          font-size: 40rpx;
          font-weight: bold;
          text-align: center;
        }
      }
    }

    .detail-card__time {
      height: 17.52rpx;
      margin: 14.02rpx 0 17.52rpx 0;
      font-size: 17.52rpx;
    }

    .detail-card__desc {
      height: auto;
      margin-bottom: 17.52rpx;
    }

    .detail-card__icons {
      display: flex;
      justify-content: flex-end;
      padding-bottom: 17.52rpx;
      color: rgb(131, 131, 131);
      font-size: 21.03rpx;
      .browse {
        display: flex;
        align-items: center;
        margin-right: 14.02rpx;
        .browse__icon {
          width: 45.56rpx;
          height: 45.56rpx;
          margin-right: 3.5rpx;
        }
      }

      .heart {
        display: flex;
        align-items: center;
        margin-right: 8.76rpx;

        .heart__icon {
          width: 42.06rpx;
          height: 42.06rpx;
          margin-right: 3.5rpx;
        }
      }
    }
  }
  .seller-warp {
    height: 175.23rpx;
    margin: 90rpx 0 20rpx;
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
