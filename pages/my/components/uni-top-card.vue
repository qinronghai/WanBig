<template>
  <div class="wrap">

    <!--个人信息  -->
    <div class="top-person-info">
      <div class="left" v-on:click="login">
        <image :src="avatarUrl" mode="aspectFill" class="left-avatar"></image>
        <div class="left-name-id">
          <div class="name">{{ nickName }}</div>
        </div>
      </div>
      <van-popup :show="showLogin" round position="bottom" custom-style="height: 40%" @close="onCloseLogin" closeable>
        <div class="login">
          <h1 class="title">湾大闲置杂货铺欢迎你~</h1>
          <div class="btn-login">
            <button class="btn" v-on:click="clickOneLogin">微信一键登录</button>
          </div>
          <div class="no-login" v-on:click="clickNoLogin">暂不登录</div>
          <div class="tip">—— 登录即同意我们的《用户协议》——</div>
        </div>
      </van-popup>
      <div class="right">
        <div class="label vip" v-if="userInfo.vip">
          <image class="label__icon vip" src="../../../static/goods-detail/vip.svg" mode="" />
          <span class="vip__txt">vip</span>
        </div>
        <div class="label auditor" v-if="userInfo.isAuditor">
          <image class="label__icon" src="../../../static/goods-detail/auditor.svg" mode="" />
          <span class="auditor__txt">审核员</span>
        </div>
        <div class="label deal-num" v-if="userInfo.dealNum > 0">
          <image class="label__icon" src="../../../static/goods-detail/deal.svg" mode="" />
          <span class="deal-num__txt">已成交{{ userInfo.dealNum }}</span>
          <!-- TODO 用户发布一个商品就需要更新其用户信息中的已成交数量 -->
        </div>
      </div>
    </div>

    <!-- 项目信息 -->
    <div class="bottom-project-info">
      <div class="item__to" @click="isAuditor">
        <div class="txt">审核员专属</div>
        <div class="icon">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="item__to" @click="toProjectPage">
        <div class="txt">了解本项目</div>
        <div class="icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import VanIcon from '../../../wxcomponents/vant/icon'
import UniLogin from './uni-login.vue'
const db = wx.cloud.database()
export default {
  data() {
    return {
      showLogin: false,
      nickName: '',
      avatarUrl: '',
      Auditor: '',
      userInfo: {}
    }
  },
  methods: {
    toProjectPage() {
      uni.navigateTo({ url: '/pages/project-info/project-info' })
    },
    login() {
      console.log('弹窗一键登录')
      this.showLogin = true
    },
    // 点击一键登录
    clickOneLogin() {
      let _this = this
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserProfile({
              desc: '登录',
              success: res => {
                // 定义一个新的用户对象
                let userInfo = {
                  nickName: '',
                  avatarUrl: '',
                  dealNum: 0,
                  goodsNum: 0,
                  isAuditor: false,
                  vip: false
                };
                // 取返回的头像和名字
                userInfo.nickName = res.userInfo.nickName;
                userInfo.avatarUrl = res.userInfo.avatarUrl;

                console.log('初始化用户信息', userInfo);
                // 用户信息存入缓存中
                // uni.setStorageSync('userInfo', userInfo);

                _this.renderPage(userInfo.nickName, userInfo.avatarUrl)
                _this.userInfo = userInfo;
                // 存入数据库
                db.collection('user-info')
                  .add({
                    data: {
                      nickName: userInfo.nickName,
                      avatarUrl: userInfo.avatarUrl,
                      // 给每个新用户的标签初始化
                      vip: false,
                      isAuditor: false,
                      dealNum: 0,
                      // 发布的商品数量
                      goodsNum: 0,
                    }
                  })
                  .then(res => {
                    console.log('将用户信息--存入数据库--成功');
                    // 存入nickName到缓存中
                    uni.setStorageSync('userInfo', userInfo);
                  })
              },
              fail: res => {
                console.log('登录授权，获取用户信息--成功', res);
              }
            })
          }
        }
      })
    },
    // 点击了暂不登录
    clickNoLogin() {
      this.showLogin = false
      console.log('用户点击了暂不登录')
    },
    // 关闭登录框
    onCloseLogin() {
      this.showLogin = false
    },
    // 判断数据库中有无用户信息
    async judgeUserInDatabase(openId) {
      let _this = this
      await db
        .collection('user-info')
        .where({
          _openid: openId
        })
        .get()
        .then(res => {
          if (res.data.length === 0) {
            console.log('数据库中--无该用户的信息')
            // 弹窗“一键登录”，获取信息存入缓存中并渲染页面
            _this.login()
          } else {
            console.log('数据库中--有该用户的信息', res.data[0])

            let userInfo = res.data[0]

            uni.setStorageSync('userInfo', userInfo)

            this.userInfo = userInfo;

            _this.renderPage(userInfo.nickName, userInfo.avatarUrl)
          }
        })
    },
    renderPage(nickName = '未登录', avatarUrl) {
      this.showLogin = false
      this.nickName = nickName
      this.avatarUrl = avatarUrl
    },
    // 判断当前用户是否是审核员
    isAuditor() {
      if (this.userInfo.isAuditor) {
        uni.navigateTo({ url: '/pages/auditor/auditor' })
      } else {
        wx.showModal({
          title: '提示',
          content: '您还不是审核员，请联系作者申请',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              //  TODO跳转到联系作者页面
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },
  components: {
    VanIcon,
    UniLogin
  },
  mounted() {
    // 1. 获取全局openid
    let openid = uni.getStorageSync('openid');
    // 2. 获取数据库中的用户信息
    this.judgeUserInDatabase(openid);
  },

}
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
        font-size: 14px;
        font-weight: bold;

        .name {
          font-size: 24.53rpx;
        }
      }
    }

    .right {
      display: flex;
      width: auto;
      height: 29.79rpx;
      margin-top: 21.03rpx;
      font-size: 17.52rpx;

      .label {
        display: flex;
        align-items: center;
        padding: 14rpx;
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
        font-style: italic;
        font-weight: bold;
      }

      .icon {
        margin-right: 26.29rpx;
      }
    }
  }
}
</style>
