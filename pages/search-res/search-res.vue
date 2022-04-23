<template>
  <view class="container">
    <div class="search">
      <van-search
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        bind:search="onSearch"
        bind:cancel="onCancel"
      />
    </div>
    <div class="dropdown-menu">
      <van-dropdown-menu active-color="#ffc300">
        <van-dropdown-item :value="value1" :options="option1" />
        <van-dropdown-item :value="value2" :options="option2" />
      </van-dropdown-menu>
    </div>
    <div class="exhibit-goods">
      <uni-exhibit-my-goods></uni-exhibit-my-goods>
    </div>
  </view>
</template>

<script>
import uniExhibitMyGoods from "../my/components/uni-exhibit-my-goods.vue";
export default {
  components: { uniExhibitMyGoods },
  data() {
    return {
      option1: [
        {
          icon: "/static/category-nav/all.svg",
          text: "全部商品",
          value: 0,
        },
        {
          icon: "/static/category-nav/books.svg",
          text: "书籍材料",
          value: 1,
        },
        {
          icon: "/static/category-nav/iphone.svg",
          text: "电子产品",
          value: 2,
        },
        {
          icon: "/static/category-nav/fitness.svg",
          text: "健身器材",
          value: 3,
        },
        {
          icon: "/static/category-nav/clothes.svg",
          text: "服装服饰",
          value: 4,
        },
        {
          icon: "/static/category-nav/brush.svg",
          text: "美妆日化",
          value: 5,
        },
        {
          icon: "/static/category-nav/other.svg",
          text: "其他宝贝",
          value: 6,
        },
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "最新", value: "b" },
        { text: "价格由高到低", value: "c" },
        { text: "价格由低到高", value: "d" },
      ],
      value1: 0,
      value2: "a",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  // padding: 0 29.79rpx;
  background-color: $uni-bg-color-grey;
  .search {
    padding-top: 20px;
  }
  .dropdown-menu {
    margin-top: 20px;
  }
   /deep/ .van-search {
    padding: 0;
    // margin: 17px 0 0 0;
    background-color: #e9e9e9 !important;
  }
  .exhibit-goods {
    margin: 20px 29rpx 0;
  }
}
</style>
