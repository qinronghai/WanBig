<template>
  <view class="container">
    <view class="wrap">
      <view class="item" v-for="(item, id) in catgList" :key="id">
        <image class="image" :src="item.img" mode="scaleToFill" />
        <text class="text"> {{ item.title }}</text>
        <view :class="item.isActive ? 'active' : ''"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      catgList: [
        {
          id: 1,
          img: "../../../static/category-nav/all.svg",
          title: "全部商品",
          isActive: true,
        },
        {
          id: 2,
          img: "../../../static/category-nav/books.svg",
          title: "教材书籍",
          isActive: false,
        },
        {
          id: 3,
          img: "../../../static/category-nav/iphone.svg",
          title: "电子设备",
          isActive: false,
        },
        {
          id: 4,
          img: "../../../static/category-nav/fitness.svg",
          title: "健身器材",
          isActive: false,
        },
        {
          id: 5,
          img: "../../../static/category-nav/brush.svg",
          title: "美妆日化",
          isActive: false,
        },
        {
          id: 6,
          img: "../../../static/category-nav/clothes.svg",
          title: "服装服饰",
          isActive: false,
        },
        {
          id: 7,
          img: "../../../static/category-nav/other.svg",
          title: "其他宝贝",
          isActive: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 123.39rpx;
  margin-top: 20.52rpx;
  background-color: #fff;
  border-radius: 22.78rpx;
  .wrap {
    display: flex;
    width: 95%;
    white-space: nowrap;
    transform: translateY(-10%);
    .item {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      width: 56.07rpx;
      height: 73.6rpx;
      .image {
        width: 26px;
        height: 26px;
      }
      .text {
        margin-top: 5.5rpx;
        font-size: 9px;
        font-weight: normal;
      }
      .active {
        position: absolute;
        bottom: -15rpx;
        width: 55rpx;
        height: 8rpx;
        background-color: #fc9b42;
        border-radius: 25px;
      }
    }
    .item:nth-child(6) {
      margin-right: 0;
    }
  }
}
</style>
