<template>
  <div class="top-form">
    <div class="top-form__item">
      <div class="left">
        <image src="../../../static/release/price.svg" class="icon"></image>
        <div class="txt">价格</div>
      </div>
      <div class="input">请输入价格</div>
    </div>
    <div class="top-form__item contact">
      <div class="left">
        <image src="../../../static/release/contact.svg" class="icon"></image>
        <div class="txt">联系方式</div>
      </div>
      <div class="input">QQ号/微信</div>
    </div>
    <div class="top-form__item address">
      <div class="left">
        <image src="../../../static/release/floor-num.svg" class="icon"></image>
        <div class="txt">楼号</div>
      </div>
      <div class="input">
        <radio-group @change="radioChange">
          <label class="radio-west"
            ><radio
              style="transform: scale(0.7)"
              value="西区"
              :checked="area"
            />西区</label
          >
          <label class="radio"
            ><radio style="transform: scale(0.7)" value="东区" />东区</label
          >
        </radio-group>
        <div class="input__number">请输入楼号</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // radio
      area: true,
    };
  },
  methods: {
    radioChange(e) {
      console.log(e);
    },
  },
};
</script>
<style lang="scss" scoped>
.top-form {
  margin-top: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  &__item {
    display: flex;
    justify-content: space-between;
    padding: 25px 15px 0;
    font-size: 12px;
    font-weight: bold;
    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 24px;
        height: 24px;
        margin-right: 15px;
      }

      .txt {
        text-align: center;
      }
    }

    .input {
    }
  }
  .top-form__item.address {
    padding-bottom: 15px;
    .input {
      display: flex;
      align-items: center;
      .radio-west {
        padding-right: 5px;
      }
      .input__number {
        padding-left: 30px;
      }
    }
  }
}
</style>
