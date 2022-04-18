<template>
  <view class="version-info">
    <view class="new-text">{{ newText }}</view>
    <view class="version-num">version {{ versionNum }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      versionNum: "3.7",
      newText: "新版本发布啦",
    };
  },
};
</script>

<style lang="scss" scoped>
.version-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40.3rpx;
  .new-text {
    font-weight: 900;
  }
  .version-num {
    margin-top: 25.52rpx;
    font-weight: 700;
    font-size: 21.03rpx;
  }
}
</style>