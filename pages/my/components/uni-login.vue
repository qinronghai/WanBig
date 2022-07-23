<template>
  <div class="login">
    <h1 class="title">湾大闲置杂货铺欢迎你~</h1>
    <div class="btn-login">
      <button class="btn" v-on:click="login">微信一键登录</button>
    </div>
    <div class="no-login">暂不登录</div>
    <div class="tip">—— 登录即同意我们的《用户协议》——</div>

  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  },

}
</script>

<style lang="scss" scoped>
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
</style>