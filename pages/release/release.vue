<template>
  <view class="container">
    <div class="top-warp">
      <uni-header-bar></uni-header-bar>
    </div>
    <div class="center-wrap">
      <uni-goods-desc></uni-goods-desc>
      <div class="goods-pictures">
        <van-uploader
          class="uploader"
          :file-list="fileList"
          @after-read="afterRead"
        />
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
      fileList: [
        {
          url: "https://img.yzcdn.cn/vant/leaf.jpg",
          name: "图片1",
        },
        {
          url: "https://img.yzcdn.cn/vant/leaf.jpg",
          name: "图片2",
        },
      ],
    };
  },
  methods: {
    afterRead(event) {
      console.log(event);
      const { file } = event.detail;
      console.log(file);
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.uploadFile({
        url: file.url, // 仅为示例，非真实的接口地址
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
  }

  .center-wrap {
    margin-top: 20px;

    .goods-pictures {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: auto;
      padding-top: 8px;
      margin: 8px 0 5px 0;
      background-color: #fff;
      border-radius: 15px;
    }
  }

  .bottom-wrap {
  }
}
</style>
