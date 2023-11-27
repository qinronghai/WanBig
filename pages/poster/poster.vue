<template>
  <view style="height: 100%">
    <CanvasDrawer
      :painting="painting"
      class="canvasdrawer"
      @getImage="eventGetImage" />

    <view
      class="contain"
      @tap="preview"
      :data-link="shareImage">
      <image
        mode="widthFix"
        class="shareImage"
        :src="shareImage"></image>
    </view>

    <view
      class="bottom"
      @tap="eventSave">
      <view>保存到手机</view>
    </view>
    <Dialog
      confirm-button
      -
      color="#fbbd08"
      id="van-dialog" />

    <Dialog
      title="授权失败"
      message="您之前误点了拒绝授权，请允许保存此图片至您的相册"
      :show="show"
      confirm-button-color="#fbbd08"
      confirm-button-open-type="openSetting"
      @opensetting="getSetting"></Dialog>
  </view>
</template>

<script>
const app = getApp();
const db = wx.cloud.database();
const config = require("../../config.js");
const _ = db.command;
import Dialog from "../../wxcomponents/vant/dialog/index";
import CanvasDrawer from "../../wxcomponents/canvasdrawer/canvasdrawer";
export default {
  components: {
    Dialog,
    CanvasDrawer,
  },
  data() {
    return {
      info: "",
      painting: "",
      shareImage: "",
      show: false,
      from: "",
    };
  },
  onLoad(e) {
    this.setData({
      info: JSON.parse(e.info),
      from: e.from,
    });
    this.getqrcode();
  },
  methods: {
    getqrcode() {
      let that = this;
      uni.showLoading({
        title: "绘制分享图片中",
        mask: true,
      });
      wx.cloud
        .callFunction({
          name: "qrcode",
          data: {
            scene: that.info.id,
          },
        })
        .then((idres) => {
          console.log(idres);
          console.log("调用函数结果", idres);
          wx.cloud
            .getTempFileURL({
              fileList: [
                {
                  fileID: idres.result,
                },
              ],
            })
            .then((res) => {
              console.log("getTempFileURL", res);
              that.eventDraw(res.fileList[0].tempFileURL);
            })
            .catch((error) => {
              console.log("error1 :>> ", error);
              uni.hideLoading();
              uni.showToast({
                title: "制作失败",
                icon: "none",
              });
            });
        })
        .catch((error) => {
          console.log("error", error);
          uni.hideLoading();
          uni.showToast({
            title: "制作失败",
            icon: "none",
          });
        });
    },

    //作图
    eventDraw(qrurl) {
      let that = this;
      let info = that.info;
      this.painting = {
        width: 385,
        height: 375,
        clear: true,
        views: [
          {
            type: "rect",
            background: "#ffffff",
            top: 0,
            left: 0,
            width: 385,
            height: 375,
          },
          {
            type: "image",
            //封面图
            url: info.pic,
            top: 20,
            left: 20,
            width: 110,
            height: 110,
          },
          {
            type: "text",
            //标题
            content: info.name,
            fontSize: 16,
            lineHeight: 21,
            color: "#383549",
            textAlign: "left",
            top: 25,
            left: 150,
            width: 185,
            MaxLineNumber: 2,
            breakWord: true,
            bolder: true,
          },
          {
            type: "text",
            //现价
            content: "￥" + info.now,
            fontSize: 19,
            color: "#E62004",
            textAlign: "left",
            top: 103,
            left: 150,
            MaxLineNumber: 1,
            bolder: true,
          },
          {
            type: "text",
            //原价
            content: this.from === "goodDetail" ? "" : "原价:￥" + info.origin,
            fontSize: 13,
            color: "#7E7E8B",
            textAlign: "left",
            top: 107,
            left: 240,
            textDecoration: "line-through",
          },
          {
            type: "rect",
            background: "#eeeeee",
            top: 150,
            left: 0,
            width: 375,
            height: 1,
          },
          {
            type: "image",
            //小程序码
            url: qrurl,
            top: 170,
            left: 137.5,
            width: 120,
            height: 120,
          },
          {
            type: "text",
            content: "长按识别小程序，查看详情",
            fontSize: 14,
            lineHeight: 21,
            color: "#b8b8b8",
            textAlign: "left",
            top: 305,
            left: 115,
          },
          {
            type: "rect",
            background: "#eeeeee",
            top: 330,
            left: 0,
            width: 375,
            height: 1,
          },
          {
            type: "image",
            //logo
            url: "/static/images/poster/logo1.png",
            top: 345,
            left: 20,
            width: 139,
            height: 20,
          },
          {
            type: "text",
            content: "— — 让环保延续，让温暖传递",
            fontSize: 13,
            lineHeight: 20,
            color: "#383549",
            textAlign: "left",
            top: 350,
            left: 170,
          },
        ],
      };
      console.log("作图完成 :>> ");
    },

    eventGetImage(event) {
      console.log(event, "eventttt");
      uni.hideLoading();
      const { tempFilePath, errMsg } = event;
      if (errMsg === "canvasdrawer:ok") {
        this.setData({
          shareImage: tempFilePath,
        });
      }
    },

    //保存相册
    eventSave() {
      let that = this;
      uni.saveImageToPhotosAlbum({
        filePath: that.shareImage,
        success(res) {
          uni.showToast({
            title: "保存图片成功",
            icon: "success",
            duration: 2000,
          });
        },
        fail() {
          that.setData({
            show: true,
          });
        },
      });
    },

    getSetting(e) {
      let that = this;
      let isSet = e.detail.authSetting["scope.writePhotosAlbum"];
      if (isSet) {
        that.setData({
          show: false,
        });
        that.eventSave();
      } else {
        that.setData({
          show: true,
        });
      }
    },

    //预览图片
    preview(e) {
      uni.previewImage({
        urls: e.currentTarget.dataset.link.split(","),
      });
    },
  },
};
</script>
<style>
.contain {
  display: flex;
  justify-content: center;
  width: 100%;
}

.shareImage {
  margin-top: 90rpx;
  box-shadow: 0 0 20rpx #e0e0e0;
  border-radius: 10rpx;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120rpx;
  box-shadow: 0 0 20rpx #e0e0e0;
}

.bottom view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90rpx;
  color: #fff;
  font-size: 30rpx;
  letter-spacing: 4rpx;
  background: #fbbd08;
}
</style>
