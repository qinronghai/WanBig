<template>
  <view class="container">
    <image class="img-bg" src="../../static/my/bg-img.jpg" mode="widthFix" />
    <uni-top-card></uni-top-card>
    <uni-center-nav></uni-center-nav>
    <uni-bottom-exhibit> </uni-bottom-exhibit>
  </view>
</template>

<script>
import UniBottomExhibit from "./components/uni-bottom-exhibit.vue";
import UniCenterNav from "./components/uni-center-nav.vue";
import uniTopCard from "./components/uni-top-card.vue";
export default {
  components: { uniTopCard, UniCenterNav, UniBottomExhibit },
  data() {
    return {};
  },
  onLoad: function (option) {
    console.log(option.showLogin); //打印出上个页面传递的参数。
    this.showLogin = option.showLogin;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  padding: 0 29.79rpx;
  background-color: $uni-bg-color-grey;

  .img-bg {
    width: 100%;
    border-radius: 10px;
  }
}
</style>