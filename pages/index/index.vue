<template>
  <view class="container">
    <uniHeader></uniHeader>
    <uni-version-info></uni-version-info>
    <uni-main-nav></uni-main-nav>
    <uni-footer></uni-footer>
  </view>
</template>

<script>
import UniFooter from "./components/uni-footer.vue";
import uniHeader from "./components/uni-header.vue";
import UniMainNav from "./components/uni-main-nav.vue";
import UniVersionInfo from "./components/uni-version-info.vue";

export default {
  components: { uniHeader, UniVersionInfo, UniMainNav, UniFooter },
};
</script>
<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(255, 255, 255);
}
</style>