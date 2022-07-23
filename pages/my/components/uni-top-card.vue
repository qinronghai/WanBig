<template>
  <div class="wrap">
    <div class="top-person-info">
      <div class="left" v-on:click="login">
        <image class="left-avatar"></image>
        <div class="left-name-id">
          <div class="name">未登录</div>
          <div class="id">ID:未知</div>
        </div>
      </div>
      <van-popup :show="showLogin" round position="bottom" custom-style="height: 40%" @close="onCloseLogin" closeable>
        <uni-login></uni-login>
      </van-popup>
      <div class="right">
        <div class="label vip">
          <image class="label__icon vip" src="../../../static/goods-detail/vip.svg" mode="" />
          <span class="vip__txt">vip</span>
        </div>
        <div class="label auditor">
          <image class="label__icon" src="../../../static/goods-detail/auditor.svg" mode="" />
          <span class="auditor__txt">审核员</span>
        </div>
        <div class="label deal-num">
          <image class="label__icon" src="../../../static/goods-detail/deal.svg" mode="" />
          <span class="deal-num__txt">已成交 8</span>
        </div>
      </div>
    </div>
    <div class="bottom-project-info">
      <div class="item__to">
        <div class="txt">申请成为审核员</div>
        <div class="icon">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="item__to">
        <div class="txt">了解本项目</div>
        <div class="icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VanIcon from "../../../wxcomponents/vant/icon";
import UniLogin from "./uni-login.vue";

export default {
  data() {
    return {
      showLogin: false
    };
  },
  methods: {
    login() {
      console.log("点击了登录");
      this.showLogin = true;
    },
    onCloseLogin() {
      this.showLogin = false;
      console.log("点击了关闭登录");
    }
  },
  components: {
    VanIcon,
    UniLogin
  },
  mounted() {
    this.showLogin = true;
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 385.51rpx;
  padding: 0 43.81rpx;
  background-color: #fff;
  border-radius: 17.52rpx;

  .top-person-info {
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      width: auto;

      .left-avatar {
        width: 105.14rpx;
        height: 105.14rpx;
        background-color: #2a82e4;
        border-radius: 50%;
        transform: translateY(-50%);
      }

      .left-name-id {
        margin-left: 40.57rpx;

        .name {
          font-size: 24.53rpx;
        }

        .id {
          font-size: 15.77rpx;
        }
      }
    }

    .right {
      display: flex;
      // justify-content: space-between;
      width: auto;
      height: 29.79rpx;
      margin-top: 21.03rpx;
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
        }
      }

      .label.auditor {
        background-color: #2a82e4;
      }

      .label.deal-num {
        background-color: #43cf7c;
      }
    }
  }

  .bottom-project-info {
    margin-top: 35.05rpx;

    .item__to {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 77.1rpx;
      margin-top: 26.29rpx;
      background-color: #c4c4c4;
      border-radius: 15.77rpx;

      .txt {
        margin-left: 26.29rpx;
        font-size: 26.29rpx;
      }

      .icon {
        margin-right: 26.29rpx;
      }
    }
  }
}
</style>