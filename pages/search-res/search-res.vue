<template>
  <view class="container">
    <div class="search">
      <van-search placeholder="请输入搜索关键词" :value="searchKey" show-action bind:search="onSearch" bind:cancel="onCancel" />
    </div>
    <div class="dropdown-menu">
      <van-dropdown-menu :overlay="false" active-color="#ffc300">
        <van-dropdown-item :value="categoryDefault" :options="categoryOption" />
        <van-dropdown-item @close="close2" :value="sortDefault" :options="sortOption" />
      </van-dropdown-menu>
    </div>

    <div class="exhibit-goods" @click="test">
      <div class="wrap">
        <div class="left">
          <image class="img-good"
            src="cloud://wb-dev-test-8g4qxuuj00591c1e.7762-wb-dev-test-8g4qxuuj00591c1e-1313188449/swiper/long-loney-dirt-road-in-the-desert-photorealistic_0000-100.webp"
            mode="aspectFill" />
        </div>
        <div class="center">
          <div class="top">
            <div class="desc">
              笔记本水冷改装在练习的过程中，重构現在我不敢肯定，請允許我，我什麼都要，我沒有妳會死，照顧你生命中的每一天，現在已經過了人生的四分之一，什麼都別說了，現在已經過了人生的四分之一，我會終生守護妳。《湾大杂货铺》这个小程序。
            </div>
            <div class="price">￥10</div>
          </div>
          <div class="bottom">
            <div class="label">
              <div class="transport">
                <image class="icon-transport" src="../../static/label/transport.svg" mode="" />
                <span class="text-transport">自取</span>
              </div>
              <div class="address">
                <image class="icon-address" src="../../static/label/address.svg" mode="" />
                <span class="text-address">西8</span>
              </div>
              <div class="quality">
                <image class="icon-quality" src="../../static/label/quality.svg" mode="" />
                <span class="text-quality">几乎全新</span>
              </div>
            </div>
            <div class="browse">
              <div class="icon-eye">
                <van-icon name="eye-o" />
              </div>
              <span class="num">7</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </view>
</template>

<script>
import VanIcon from "../../wxcomponents/vant/icon/index";
export default {
  onLoad: function (option) {
    console.log(option.searchKey); //打印出上个页面传递的参数。
    this.searchKey = option.searchKey;
  },
  components: { VanIcon },
  data() {
    return {
      categoryOption: [
        {
          icon: "/static/category-nav/all.svg",
          text: "全部商品",
          value: 0,
        },
        {
          icon: "/static/category-nav/books.svg",
          text: "书籍材料",
          value: 1,
        },
        {
          icon: "/static/category-nav/iphone.svg",
          text: "电子产品",
          value: 2,
        },
        {
          icon: "/static/category-nav/fitness.svg",
          text: "健身器材",
          value: 3,
        },
        {
          icon: "/static/category-nav/clothes.svg",
          text: "服装服饰",
          value: 4,
        },
        {
          icon: "/static/category-nav/brush.svg",
          text: "美妆日化",
          value: 5,
        },
        {
          icon: "/static/category-nav/other.svg",
          text: "其他宝贝",
          value: 6,
        },
      ],
      sortOption: [
        { text: "默认排序", value: "a" },
        { text: "最新", value: "b" },
        { text: "价格由高到低", value: "c" },
        { text: "价格由低到高", value: "d" },
      ],
      categoryDefault: 0,
      sortDefault: "a",
      searchKey: ''
    };
  },
  methods: {
    change1(e) {
      console.log('e.detail :>> ', e);
    },
    test() {
      console.log('test点击出现了吗');
    },
    close2() {
      console.log('close2');
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  padding: 0 15px;
  background-color: #f0f0f0;

  .search {
    padding-top: 10px;
  }

  .dropdown-menu {
    margin: 20px 0 0;
  }




   /deep/ .van-search {
    padding: 0;
    background-color: #f0f0f0 !important;
  }

  .exhibit-goods {
    margin: 15px 0 0;

    .wrap {
      display: flex;
      height: 100px;
      background-color: #fff;
      border-radius: 10px;

      .left {
        padding: 10px;

        .img-good {
          width: 80px;
          height: 80px;
          border-radius: 5px;
        }
      }

      .center {
        padding-right: 10px;

        .top {
          margin-top: 10px;

          .desc {
            display: -webkit-box;
            overflow: hidden;
            font-size: 13px;
            font-weight: 500;
            text-overflow: ellipsis;

            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }

          .price {
            padding: 5px 0 0;
            color: #d43f3f;
            font-weight: bold;
          }
        }

        .bottom {
          display: flex;
          justify-content: space-between;

          .label {
            position: relative;
            display: flex;
            align-items: center;
            height: 40rpx;
            font-size: 16.02rpx;
            font-weight: bolder;

            .transport {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 30rpx;
              margin-top: 4rpx;
              margin-right: 15rpx;
              background-color: #4da4e2;
              border-radius: 5rpx;

              .text-transport {
                margin: 10rpx;
              }

              .icon-transport {
                width: 19.28rpx;
                height: 19.28rpx;
                margin-left: 10rpx;
              }
            }

            .address {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 30rpx;
              margin-top: 4rpx;
              margin-right: 15rpx;
              background-color: #ffc300;
              border-radius: 5rpx;

              .text-address {
                margin: 10rpx;
              }

              .icon-address {
                width: 19.28rpx;
                height: 19.28rpx;
                margin-left: 10rpx;
              }
            }

            .quality {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 30rpx;
              margin-top: 4rpx;
              margin-right: 15rpx;
              background-color: #ffc300;
              border-radius: 5rpx;

              .text-quality {
                margin: 10rpx;
              }

              .icon-quality {
                width: 17.52rpx;
                height: 17.52rpx;
                margin-left: 10rpx;
              }
            }
          }

          .browse {
            display: flex;
            align-items: center;
            padding-right: 20px;

            .icon-eye {
              padding-right: 5px;
            }

            .num {
              font-size: 10px;
              text-align: center;
            }
          }
        }
      }

      .right {
        display: flex;
        align-items: center;
        width: 25px;
        background-color: #292929;
        border-radius: 0 10px 10px 0;

        .arrow_left {
          width: 26px;
          height: 26px;
        }
      }
    }
  }
}
</style>
