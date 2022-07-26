<template>
  <div class="goods-desc">
    <div class="top-tip">
      <image src="../../../static/release/goods-desc.svg" class="icon-tip"></image>
      <div class="txt-tip">优质的商品介绍会有更好的展示效果哦~</div>
    </div>
    <div class="bottom-desc__input">
      <textarea :value="title" v-on:confirm="confirm" v-on:blur="confirm" auto-height="true" maxlength="140"
        class="textarea" placeholder="在这里输入商品描述文字哦~ （限140字）" focus="{{focus}}" confirm-type="done" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  methods: {

    confirm(e) {
      console.log('点击了确认')
      const text = e.detail.value;
      this.title = text;
      this.$emit('getGoodTitle', this.title)
    }

  },
  watch: {

  },
};
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

    .textarea {
      width: 100%;
      font-size: 14px;
      // height: 100%;
    }
  }
}
</style>
