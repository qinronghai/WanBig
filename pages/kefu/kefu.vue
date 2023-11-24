<template>
  <view class="contain">
    <view style="height: 20rpx"></view>
    <!-- 顶部图 -->
    <image
      :src="banner"
      class="slide-image" />
    <!-- 在线咨询 -->
    <view class="card">
      <view class="card1">
        <image
          class="wechatimg"
          src="/static/images/online.png" />
      </view>
      <view class="borderbox">
        <view class="border"></view>
      </view>
      <view class="centercontain">
        <view class="name">在线咨询</view>
        <view class="des">点击即可在线咨询客服</view>
      </view>
      <view class="rightico">
        <image
          class="rightimg"
          src="/static/images/right.png" />
      </view>
      <button open-type="contact"></button>
    </view>
    <!-- 微信联系 -->
    <view
      class="card"
      @tap="copy"
      :data-copy="weixin"
      data-name="微信">
      <view class="card1">
        <image
          class="wechatimg"
          src="/static/images/weixin.png" />
      </view>
      <view class="borderbox">
        <view class="border"></view>
      </view>
      <view class="centercontain">
        <view class="name">官方微信</view>
        <view class="des">点击即可复制官方微信</view>
      </view>
      <view class="rightico">
        <image
          class="rightimg"
          src="/static/images/right.png" />
      </view>
    </view>
    <!-- QQ联系 -->
    <view
      class="card"
      @tap="copy"
      :data-copy="qq"
      data-name="QQ">
      <view class="card1">
        <image
          class="wechatimg"
          src="/static/images/qq.png" />
      </view>
      <view class="borderbox">
        <view class="border"></view>
      </view>
      <view class="centercontain">
        <view class="name">QQ联系</view>
        <view class="des">点击即可复制客服QQ</view>
      </view>
      <view class="rightico">
        <image
          class="rightimg"
          src="/static/images/right.png" />
      </view>
    </view>
    <!-- 电话联系 -->
    <view
      v-if="phone"
      class="card"
      @tap="phoneFun1"
      :data-phone="phone">
      <view class="card1">
        <image
          class="wechatimg"
          src="/static/images/phone.png" />
      </view>
      <view class="borderbox">
        <view class="border"></view>
      </view>
      <view class="centercontain">
        <view class="name">24小时服务热线</view>
        <view class="des">{{ phoneFun }}</view>
      </view>
      <view class="rightico">
        <image
          class="rightimg"
          src="/static/images/right.png" />
      </view>
    </view>
    <!-- 公众号  -->
    <!--   <view
      class="card"
      @tap="preview"
      :data-link="gzh">
      <view class="card1">
        <image
          class="wechatimg"
          src="/static/images/gzh.png" />
      </view>
      <view class="borderbox">
        <view class="border"></view>
      </view>
      <view class="centercontain">
        <view class="name">官方公众号</view>
        <view class="des">识别二维码关注官方公众号</view>
      </view>
      <view class="rightico">
        <image
          class="rightimg"
          src="/static/images/right.png" />
      </view>
    </view> -->
  </view>
</template>

<script>
var app = getApp();
const config = require("../../config.js");
export default {
  data() {
    return {
      weixin: JSON.parse(config.data).kefu.weixin,
      qq: JSON.parse(config.data).kefu.qq,
      gzh: JSON.parse(config.data).kefu.gzh,
      phone: JSON.parse(config.data).kefu.phone,
      banner: "cloud://qrh-database01-5gz9zkuedd28e7fc.7172-qrh-database01-5gz9zkuedd28e7fc-1313188449/nodeteleimg/kefu.jpg",
      phoneFun: "",
    };
  },
  onLoad() {},
  methods: {
    //复制
    copy(e) {
      uni.setClipboardData({
        data: e.currentTarget.dataset.copy,
        success: (res) => {
          uni.showToast({
            title: "复制" + e.currentTarget.dataset.name + "成功",
            icon: "success",
            duration: 1000,
          });
        },
      });
    },

    //电话拨打
    phoneFun1(e) {
      uni.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
      });
    },

    //预览图片
    preview(e) {
      console.log("e", e);
      uni.previewImage({
        urls: e.currentTarget.dataset.link.split(","),
      });
    },
  },
};
</script>
<style>
.contain {
  box-sizing: border-box;
  width: 100%;
  padding: 0 46rpx;
}

.slide-image {
  width: 100%;
  height: 310rpx;
  border-radius: 20rpx;
}

.card {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 162rpx;
  margin-top: 40rpx;
  box-shadow: 0 0 20rpx #eee;
  border-radius: 20rpx;
}

.card button {
  position: absolute;
  top: 0rpx;
  left: 0rpx;
  width: 100%;
  height: 100%;
  opacity: 0.01;
}

.card1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140rpx;
  height: 100%;
}

.wechatimg {
  width: 90rpx;
  height: 90rpx;
}

.borderbox {
  display: flex;
  align-items: center;
  width: 10rpx;
  height: 100%;
}

.border {
  box-sizing: border-box;
  width: 4rpx;
  height: 82rpx;
  border-left: 3rpx solid #eee;
}

.centercontain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 420rpx;
  height: 100%;
  padding-left: 20rpx;
}

.name {
  font-size: 32rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
}

.des {
  padding-top: 10rpx;
  color: rgb(161, 161, 161);
  font-size: 28rpx;
  letter-spacing: 2rpx;
}

.rightico {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40rpx;
  height: 100%;
}

.rightimg {
  width: 30rpx;
  height: 30rpx;
}
</style>
