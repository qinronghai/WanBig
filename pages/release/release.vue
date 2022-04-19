<template>
  <view class="container">
    <div class="top-warp">
      <uni-header-bar></uni-header-bar>
    </div>
    <div class="center-wrap">
      <uni-goods-desc></uni-goods-desc>
      <div class="goods-pictures">
        <van-uploader :file-list="fileList" @after-read="afterRead" />
      </div>
    </div>
    <div class="bottom-wrap">
      <uni-top-form></uni-top-form>
      <uni-bottom-options></uni-bottom-options>
    </div>
  </view>
</template>

<script>
import UniBottomOptions from "./components/uni-bottom-options.vue";
import UniGoodsDesc from "./components/uni-goods-desc.vue";
import uniHeaderBar from "./components/uni-header-bar.vue";
import UniTopForm from "./components/uni-top-form.vue";
export default {
  components: { uniHeaderBar, UniGoodsDesc, UniTopForm, UniBottomOptions },
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    afterRead(event) {
      console.log(event);
      const { file } = event.detail;

      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.uploadFile({
        url: "https://example.weixin.qq.com/upload", // 仅为示例，非真实的接口地址
        filePath: file.url,
        name: "file",
        formData: { user: "test" },
        success(res) {
          console.log("上传成功！");
          // 上传完成需要更新 fileList
          const { fileList = [] } = this.data;
          fileList.push({ ...file, url: res.data });
          this.setData({ fileList });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  padding: 0 29.79rpx;
  background-color: $uni-bg-color-grey;
  .top-warp {
    padding: 0 21.03rpx;
  }

  .center-wrap {
    padding: 0 10px;
    margin-top: 20px;

    .goods-pictures {
      width: 130px;
      height: 125px;
      margin: 8px 0 0 5px;
      background-color: #fff;
      border-radius: 15px;
    }
  }

  .bottom-wrap {
    // background-color: #fff;
  }
}
</style>
