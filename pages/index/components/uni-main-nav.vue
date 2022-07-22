<template>
  <view class="nav-container">
    <view class="store">湾大杂货铺</view>
    <view class="job">兼职职道</view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav-container {
  position: relative;
  margin-top: 119.33rpx;
  .store {
    position: absolute;
    top: 0;
    left: -50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 175.23rpx;
    height: 175.23rpx;
    font-size: 24.78rpx;
    font-weight: 700;
    // background-color: $uni-zt-color-store;
    border-radius: 26.29rpx;
  }
  .job {
    position: relative;
    top: 108.29rpx; // 黄金比例 0.618
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 175.23rpx;
    height: 175.23rpx;
    font-size: 24.78rpx;
    font-weight: 700;
    // background-color: $uni-zt-color-job;
    border-radius: 26.29rpx;
  }
}
</style>