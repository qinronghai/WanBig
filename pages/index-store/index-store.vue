<template>
  <view class="index-store-page">
    <van-search placeholder="请输入搜索关键词" show-action bind:search="onSearch" bind:cancel="onCancel" />
    <uni-banner></uni-banner>
    <navigator url="/pages/search-res/search-res" open-type="navigate" hover-class="navigator-hover">
    </navigator>
    <uni-product-catg-nav></uni-product-catg-nav>
    <uni-goods-card></uni-goods-card>
  </view>
</template>

<script>
import uniGoodsCard from "./components/uni-goods-card.vue";
import uniBanner from "./components/uni-banner.vue";
import UniGoodsCard from "./components/uni-goods-card.vue";
import UniProductCatgNav from "./components/uni-product-catg-nav.vue";
export default {
  components: { uniBanner, UniProductCatgNav, UniGoodsCard, uniGoodsCard },
  data() {
    return {};
  },
  methods: {
    toSearchPage() { },
  },
};
</script>

<style lang="scss" scoped>
.index-store-page {
  height: auto;
  padding: 0 29.79rpx;
  background-color: #f0f0f0;

   /deep/ .van-search {
    padding: 0;
    padding: 10rpx 0 17.52rpx 0;
    background-color: #f0f0f0 !important;
  }
}
</style>
