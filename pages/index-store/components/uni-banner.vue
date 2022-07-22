<template>
  <view class="banner-container">
    <swiper class="swiper" autoplay circular>
      <swiper-item class="swiper-item" v-for="(item, id) in itemList" :key="id">
        <image class="image" :src="item.img" mode="scaleToFill" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      sum: 0,
      itemList: [
        {
          id: 1,
          title: "第一张图片",
          img: "../../../static/banner/curtain.svg",
        },
        {
          id: 2,
          title: "第二张图片",
          img: "../../../static/banner/curtain.svg",
        },
        {
          id: 3,
          title: "第三张图片",
          img: "../../../static/banner/curtain.svg",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.banner-container {
  border-radius: 26.29rpx;

  .swiper {
    overflow: hidden;
    height: 380.16rpx;
    background-color: green;
    border-radius: 26.29rpx;

    .swiper-item {
      .image {
        z-index: -1;
        width: 100%;
        height: inherit;
      }
    }
  }
}
</style>
