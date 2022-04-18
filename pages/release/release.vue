<template>
  <view class="container">
    <div class="top-warp">
      <uni-header-bar></uni-header-bar>
    </div>
    <div class="center-wrap">
      <uni-goods-desc></uni-goods-desc>
      <div class="goods-pictures">
        <van-uploader file-list="{{ fileList }}" @after-read="afterRead" />
      </div>
    </div>
    <div class="bottom-wrap">
      <div class="top-form">
        <div class="price">
          <image src="" class="icon-price"></image>
          <div class="txt-price">价格</div>
          <div class="input-price">请输入价格</div>
        </div>
        <div class="contact">
          <image src="" class="icon-contact"></image>
          <div class="txt-contact">联系方式</div>
          <div class="input-contact">QQ号/微信</div>
        </div>
      </div>
      <div class="bottom-options">
        <div class="address">
          <image src="" class="icon-address"></image>
          <div class="txt-address">楼号</div>
          <div class="option-address"></div>
        </div>
        <div class="category">
          <image src="" class="icon-category"></image>
          <div class="txt-category">商品分类</div>
          <div class="option-category"></div>
        </div>
        <div class="quality">
          <image src="" class="icon-quality"></image>
          <div class="txt-quality">商品成色</div>
          <div class="option-quality"></div>
        </div>
        <div class="need">
          <image src="" class="icon-need"></image>
          <div class="txt-need">出/蹲</div>
          <div class="option-need"></div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
import UniGoodsDesc from "./components/uni-goods-desc.vue";
import uniHeaderBar from "./components/uni-header-bar.vue";
export default {
  components: { uniHeaderBar, UniGoodsDesc },
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
    .top-form {
      .price {
        .icon-price {
        }

        .txt-price {
        }

        .input-price {
        }
      }

      .contact {
        .icon-contact {
        }

        .txt-contact {
        }

        .input-contact {
        }
      }
    }

    .bottom-options {
      .address {
        .icon-address {
        }

        .txt-address {
        }

        .option-address {
        }
      }

      .category {
        .icon-category {
        }

        .txt-category {
        }

        .option-category {
        }
      }

      .quality {
        .icon-quality {
        }

        .txt-quality {
        }

        .option-quality {
        }
      }

      .need {
        .icon-need {
        }

        .txt-need {
        }

        .option-need {
        }
      }
    }
  }
}
</style>
