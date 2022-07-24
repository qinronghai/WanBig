<template>
  <div class="wrap">
    <div class="top-person-info">
      <div class="left" v-on:click="login">
        <image :src="avatarUrl" mode="aspectFill" class="left-avatar"></image>
        <div class="left-name-id">
          <div class="name">{{ userInfo.nickName }}</div>
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
const db = wx.cloud.database();
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
      console.log("点击了未登录的地方");
      this.showLogin = true;

    },

    handleLogin() {
      console.log("用户点击了一键登录按钮");
      let _this = this;
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserProfile({
              desc: '登录',
              success: (res) => {
                console.log('登录成功', res.userInfo);
                let { userInfo } = res;
                // 存入本地缓存
                uni.setStorageSync('userInfo', userInfo);
                // 渲染页面
                _this.userInfo.nickName = userInfo.nickName;
                _this.avatarUrl = userInfo.avatarUrl;
                _this.showLogin = false
                // 存入数据库
                db.collection('user-info').add({
                  // data 字段表示需新增的 JSON 数据
                  data: {
                    _openid: userInfo.openid,
                    name: userInfo.nickName,
                    avatarUrl: userInfo.avatarUrl,
                    vip: true,
                    auditor: true,
                    selledNum: 10,
                    phone: '18376161994'
                  }
                })
                  .then(res => {
                    console.log(res)
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
    // 请求数据库是否有用户信息
    async getUserInfo(openId) {
      console.log(openId
      );
      let _this = this;
      await db.collection('user-info').where({
        _openid: openId
      }).get().then(res => {
        console.log(res);
        // 如果数据库中没有用户信息，表明该用户是新用户
        if (res.data.length === 0) {
          console.log('数据库中无该用户的信息');
          // 弹窗“一键登录”，获取信息存入缓存中并渲染页面
          _this.login();
          // 将新用户存入到数据库表中
          // _this.setUserInfoToDatabase();
        } else {
          console.log('数据库中有该用户的信息');
          let userInfo = res.data[0];
          // 存入缓存中
          uni.setStorageSync('userInfo', userInfo);
          // 渲染页面
          _this.userInfo.nickName = userInfo.name;
          _this.avatarUrl = userInfo.avatarUrl;
        }
      })
    },
    // 判断本地缓存是否有用户信息
    isUserInfo() {
      let userInfo = uni.getStorageSync('userInfo');
      console.log("测试", userInfo);
      console.log(userInfo.nickName);
      if (userInfo.nickName != null) {
        console.log("本地缓存中有用户的信息");
        // 有用户信息，执行渲染逻辑
        this.showLogin = false;
        this.userInfo = userInfo;
        this.avatarUrl = userInfo.avatarUrl;
      } else {
        console.log("本地缓存中没有用户的信息");
        // 本地缓存没有用户信息，执行请求数据库判断是否有用户信息
        this.getUserInfo(userInfo.openId);
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
  height: 335.51rpx;
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
    // margin-top: 10rpx;

    .item__to {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 77.1rpx;
      margin-top: 20rpx;
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