<template>
  <div class="wrap" :key="numberkey">

    <div class="my-goods" v-if="index === 0">
      <uni-exhibit-my-goods></uni-exhibit-my-goods>
    </div>
    <div class="tip" v-if="index === 1">
      <uni-exhibit-tip></uni-exhibit-tip>
    </div>
    <div class="contact-author" v-if="index === 2">
      <uni-exhibit-contact-author></uni-exhibit-contact-author>
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
      numberkey: 0,
      index: 0,
      navIconList: [],// 导航图标

    };
  },
  methods: {

  },
  computed: {},
  components: { uniExhibitMyGoods, UniExhibitContactAuthor, UniExhibitTip },
  mounted() {
    console.log(this.index);
    let _this = this;
    uni.$on("update", function (data) {
      let index = data.index;
      _this.index = index;
      _this.chenRender();
    });
  },
  methods: {
    // 重新渲染
    chenRender() {
      this.numberkey += 1;
    }
  },

};
</script>

<style lang="scss" scoped>
.wrap {
  min-height: 280px;
  margin-top: 15px;
}

.example-content {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
</style>