<template>
  <view class="header">
    <image class="avatar" src="../../../static/tarbar/index-header.png" />
    <view @click="popContact" class="find-me"> Find me. </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      contact: "185043843",
    };
  },
  methods: {
    // 弹出联系方式
    popContact() {
      // 模拟窗弹出开发者的联系方式
      wx.showModal({
        title: "开发者的联系方式",
        content: "QQ：185043843",
        success(res) {
          if (res.confirm) {
            console.log("用户点击确定");
            // 点击确定之后 自动复制到剪切板
            wx.setClipboardData({
              data: "185043843",
              success(res) {
                wx.getClipboardData({
                  success(res) {
                    console.log("已成功复制联系方式", res.data); // data
                  },
                });
              },
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .avatar {
    width: 483.64rpx;
    height: 483.64rpx;
  }
  .find-me {
    margin-top: 0rpx;
    border-bottom: 1px solid #000;
  }
}
</style>