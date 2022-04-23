<template>
  <div class="wrap">
    <div class="my-goods">
      <!-- <uni-exhibit-my-goods></uni-exhibit-my-goods> -->
    </div>
    <div class="contact-author">
      <!-- <uni-exhibit-contact-author></uni-exhibit-contact-author> -->
    </div>
    <div class="tip">
      <uni-exhibit-tip></uni-exhibit-tip>
    </div>
  </div>
</template>

<script>
import uniExhibitMyGoods from "./uni-exhibit-my-goods.vue";
import UniExhibitContactAuthor from "./uni-exhibit-contact-author.vue";
import UniExhibitTip from "./uni-exhibit-tip.vue";
export default {
  data() {
    return {
      index: 1,
    };
  },
  methods: {},
  computed: {},
  components: { uniExhibitMyGoods, UniExhibitContactAuthor, UniExhibitTip },
  mounted() {
    console.log(this.index);
    uni.$on("update", function (data) {
      console.log("监听到事件来自 update ，携带参数 index 为：" + data.index);
      this.index = data.index;
      console.log(this.index);
    });
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  min-height: 280px;
  margin-top: 15px;
}
</style>