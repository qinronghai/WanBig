<template>
  <div class="goods-desc">
    <div class="top-tip">
      <image src="../../../static/release/goods-desc.svg" class="icon-tip"></image>
      <div class="txt-tip">优质的商品介绍会有更好的展示效果哦~</div>
    </div>
    <div class="bottom-desc__input">
      在一家白色的咖啡廳裡，有時候，還是乖乖去買咖啡好了，所以一旦遇到像今天這樣晴空萬里的好天氣，喝了杯咖啡
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.goods-desc {
  height: 204px;
  background-color: #fff;
  border-radius: 15px;
  .top-tip {
    display: flex;
    align-items: center;
    padding: 7px 0 0 12px;
    .icon-tip {
      width: 24px;
      height: 24px;
      padding-right: 5px;
    }

    .txt-tip {
      font-size: 12px;
    }
  }

  .bottom-desc__input {
    padding: 13px;
  }
}
</style>
