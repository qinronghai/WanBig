<template>
  <div class="wrap">
    <div class="contact-ways">
      <div class="item" @click="popContactQQ">
        <image src="../../../static/my/qq.svg" class="icon"></image>
        <span class="txt">185043843</span>
      </div>
      <div class="item" @click="popContactWX">
        <image src="../../../static/my/wx.svg" class="icon"></image>
        <span class="txt">AHAI_1010</span>
      </div>
      <div class="click-button">--点击相应号码可复制--</div>
    </div>
    <div class="avatar">
      <image class="img-avatar" src="../../../static/my/avatar.png" mode="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contact: {
        QQ: "185043843",
        WX: "AHAI_1010",
      },
    };
  },
  methods: {
    popContactQQ() {
      wx.showModal({
        title: "开发者的联系方式",
        content: "QQ：185043843",
        success(res) {
          if (res.confirm) {
            console.log("用户点击确定");
            // 点击确定之后 自动复制到剪切板
            wx.setClipboardData({
              data: "185043843",
              success(res) {
                wx.getClipboardData({
                  success(res) {
                    console.log("已成功复制联系方式", res.data); // data
                  },
                });
              },
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    popContactWX() {
      wx.showModal({
        title: "开发者的联系方式",
        content: `微信: ${this.contact.WX}`,
        success(res) {
          if (res.confirm) {
            console.log("用户点击确定");
            // 点击确定之后 自动复制到剪切板
            wx.setClipboardData({
              data: `AHAI_1010`,
              success(res) {
                wx.getClipboardData({
                  success(res) {
                    console.log("已成功复制联系方式", res.data); // data
                  },
                });
              },
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  background-color: #fff;
  border-radius: 10px;
  .contact-ways {
    padding: 25px 35px;
    .item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      color: #707070;
      font-size: 12px;
      .icon {
        width: 20px;
        height: 20px;
        padding-right: 15px;
      }
    }
    .click-button {
      display: inline;
      font-size: 10px;
      background-color: #ffc400;
      border-radius: 15px;
    }
  }
  .img-avatar {
    width: 100px;
    height: 100px;
    margin-right: 50px;
  }
}
</style>