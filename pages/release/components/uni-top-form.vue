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
        <div class="radio">
          <!-- <van-radio-group bind:change="onChange" direction="horizontal">
            <van-radio name="1">西区</van-radio>
            <van-radio name="2">东区</van-radio>
          </van-radio-group> -->
        </div>
        <div class="input__number">请输入楼号</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
      .input__number {
        padding-left: 30px;
      }
    }
  }
}
</style>
