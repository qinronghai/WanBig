<template>
  <div class="wrap">
    <div class="top-person-info">
      <div class="left" v-on:click="login">
        <image :src="avatarUrl" mode="aspectFill" class="left-avatar"></image>
        <div class="left-name-id">
          <div class="name">{{ userInfo.nickName }}</div>
          <div class="id">ID:未知</div>
        </div>
      </div>
      <van-popup :show="showLogin" round position="bottom" custom-style="height: 40%" @close="onCloseLogin" closeable>
        <div class="login">
          <h1 class="title">湾大闲置杂货铺欢迎你~</h1>
          <div class="btn-login">
            <button class="btn" v-on:click="handleLogin">微信一键登录</button>
          </div>
          <div class="no-login" v-on:click="handleNoLogin">暂不登录</div>
          <div class="tip">—— 登录即同意我们的《用户协议》——</div>

        </div>
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
      showLogin: false,
      userInfo: {
        nickName: "未登录",
        // avatarUrl: ''
      },
      avatarUrl: ''
    };
  },
  methods: {
    login() {
      console.log("点击了登录");
      this.showLogin = true;

    },
    // 处理登录
    handleLogin() {
      console.log("用户点击了登录按钮");
      let _this = this;
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserProfile({
              desc: '登录',
              success: (res) => {
                let user = res.userInfo;
                let userInfo = uni.getStorageSync('userInfo');
                // 给缓存中的用户数据添加头像和名字
                userInfo.avatarUrl = user.avatarUrl;
                userInfo.nickName = user.nickName;
                _this.userInfo = userInfo;
                _this.avatarUrl = userInfo.avatarUrl;
                // 
                uni.setStorage({
                  key: 'userInfo',
                  data: userInfo,
                }).then(res => {
                  console.log("用户已经成功登录");
                  _this.showLogin = false;
                })
              },
              fail: (res) => {
                // debugger
                console.log(res)
              }
            });
          }
        }
      })
    },
    // 处理点击了暂不登录
    handleNoLogin() {
      this.showLogin = false;
      console.log('用户点击了暂不登录');

    },
    // 关闭登录框
    onCloseLogin() {
      this.showLogin = false;
      console.log("点击了关闭登录");
    },
    isUserInfo() {
      let userInfo = uni.getStorageSync('userInfo');
      console.log("测试", userInfo);
      if (userInfo.nickName) {
        console.log("本地缓存中有用户的信息");
        this.showLogin = false;
        this.userInfo = userInfo;
        this.avatarUrl = userInfo.avatarUrl;
      } else {
        console.log("本地缓存中没有用户的信息");
        // 弹窗显示登录组件
        this.showLogin = true;
      }
    }
  },
  components: {
    VanIcon,
    UniLogin
  },
  mounted() {
    // 判断是否登录过--本地是否有用户信息
    this.isUserInfo();  // TODO 获取用户ID号，以及上传用户到数据库中的user表。
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

    .login {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;

      .title {
        position: absolute;
        top: 50px;
        padding: 0 0 17.52rpx;
        font-size: 40.54rpx;
        font-weight: bold;
      }

      .btn-login {
        width: 60%;
        padding-top: 180rpx;
        margin: 35.05rpx 0;

        .btn {
          padding: 10rpx 0;
          font-size: 28.04rpx;
          font-weight: bold;
          background-color: #f7d02b;
          border-radius: 52.57rpx;
        }
      }

      .no-login {
        padding-top: 25.05rpx;
        color: #6c6c6c;
        font-size: 21.03rpx;
        font-weight: 500;
        border-bottom: 1px solid #6c6c6c;
      }

      .tip {
        padding-top: 60.05rpx;
        color: #9d9898;
        font-size: 21.03rpx;
      }
    }

    .left {
      display: flex;
      width: auto;

      .left-avatar {
        width: 105.14rpx;
        height: 105.14rpx;
        // background-color: #2a82e4;
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