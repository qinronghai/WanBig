<template>
  <div class="goods-desc">
    <div class="top-tip">
      <image src="../../../static/release/goods-desc.svg" class="icon-tip"></image>
      <div class="txt-tip">优质的商品介绍会有更好的展示效果哦~</div>
    </div>
    <div class="bottom-desc__input">
      <textarea :value="title" v-on:confirm="confirmDesc" v-on:blur="confirmDesc" auto-height="true" maxlength="140"
        class="textarea" placeholder="在这里输入商品描述文字哦~（限140字）" confirm-type="done" />
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
    confirmDesc(e) {
      this.title = e.detail.value;
      console.log('确认文本--', this.title);
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
