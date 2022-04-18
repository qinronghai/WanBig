<template>
  <view class="index-store-page">
    <uni-banner></uni-banner>
    <van-search placeholder="请输入搜索关键词" show-action bind:search="onSearch" bind:cancel="onCancel" />
    <uni-product-catg-nav></uni-product-catg-nav>
    <test></test>
    <!-- <uni-goods-card></uni-goods-card> -->
  </view>
</template>

<script>
import Test from "./components/test.vue";
import uniBanner from "./components/uni-banner.vue";
import UniGoodsCard from "./components/uni-goods-card.vue";
import UniProductCatgNav from "./components/uni-product-catg-nav.vue";
export default {
  components: { uniBanner, UniProductCatgNav, UniGoodsCard, Test },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.index-store-page {
  height: auto;
  padding: 0 29.79rpx;
  background-color: #e9e9e9;
   /deep/ .van-search {
    padding: 0;
    margin: 17px 0 0 0;
    background-color: #e9e9e9 !important;
  }
}
</style>
