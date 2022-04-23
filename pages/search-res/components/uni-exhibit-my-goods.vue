<template>
  <div class="wrap">
    <div class="left">
      <image
        class="img-good"
        src="https://s1.ax1x.com/2022/04/14/LQalVJ.jpg"
        mode="aspectFill"
      />
    </div>
    <div class="center">
      <div class="top">
        <div class="desc">
          笔记本水冷改装在练习的过程中，重构現在我不敢肯定，請允許我，我什麼都不要，我沒有妳會死，照顧你生命中的每一天，現在已經過了人生的四分之一，什麼都別說了，現在已經過了人生的四分之一，我會終生守護妳。《湾大杂货铺》这个小程序。
        </div>
        <div class="price">￥10</div>
      </div>
      <div class="bottom">
        <div class="label">
          <div class="address">
            <image
              class="icon-address"
              src="../../../static/label/address.svg"
              mode=""
            />
            <span class="text-address">西8</span>
          </div>
          <div class="quality">
            <image
              class="icon-quality"
              src="../../../static/label/quality.svg"
              mode=""
            />
            <span class="text-quality">几乎全新</span>
          </div>
        </div>
        <div class="browse">
          <div class="icon-eye">
            <van-icon name="eye-o" />
          </div>
          <span class="num">7</span>
        </div>
      </div>
    </div>
    <div class="right">
      <image
        class="arrow_left"
        src="../../../static/my/arrow_left.svg"
        mode=""
      />
    </div>
  </div>
</template>

<script>
import VanIcon from "../../../wxcomponents/vant/icon";

export default {
  components: {
    VanIcon,
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  height: 110px;
  background-color: #fff;
  border-radius: 10px;
  .left {
    padding: 15px 20px;
    .img-good {
      width: 80px;
      height: 80px;
    }
  }

  .center {
    .top {
      margin-top: 15px;
      .desc {
        display: -webkit-box;
        overflow: hidden;
        font-size: 13px;
        font-weight: 500;
        // height: 70rpx;
        // font-size: 22.78rpx;
        text-overflow: ellipsis;
        // background-color: red;

        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .price {
        padding: 5px 0;
        color: #d43f3f;
        font-weight: bold;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      .label {
        position: relative;
        display: flex;
        align-items: center;
        height: 40rpx;
        font-size: 16.02rpx;
        font-weight: bolder;
        .address {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30rpx;
          margin-top: 4rpx;
          margin-right: 15rpx;
          background-color: #ffc300;
          border-radius: 10rpx;
          .text-address {
            margin: 10rpx;
          }
          .icon-address {
            width: 19.28rpx;
            height: 19.28rpx;
            margin-left: 10rpx;
          }
        }
        .quality {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30rpx;
          margin-top: 4rpx;
          margin-right: 15rpx;
          background-color: #ffc300;
          border-radius: 10rpx;
          .text-quality {
            margin: 10rpx;
          }
          .icon-quality {
            width: 17.52rpx;
            height: 17.52rpx;
            margin-left: 10rpx;
          }
        }
      }

      .browse {
        display: flex;
        align-items: center;
        padding-right: 20px;
        .icon-eye {
          padding-right: 5px;
        }
        .num {
          font-size: 10px;
          text-align: center;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    width: 25px;
    background-color: #292929;
    border-radius: 0 10px 10px 0;
    .arrow_left {
      width: 26px;
      height: 26px;
    }
  }
}
</style>