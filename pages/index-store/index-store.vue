<template>
  <view class="index-store-page">
    <!-- 搜索框 -->
    <van-search
      :value="searchKey"
      placeholder="请输入搜索关键词"
      show-action
      @change="searchOnChange"
      @search="toSearchPage"
      bind:cancel="onCancel" />
    <!-- 轮播图 -->
    <view class="banner-container">
      <swiper
        class="swiper"
        autoplay
        circular>
        <swiper-item
          class="swiper-item"
          v-for="(item, index) in swiperList"
          :key="index">
          <image
            class="image"
            :src="item"
            mode="scaleToFill" />
        </swiper-item>
      </swiper>
    </view>
    <!-- 分类导航图标 -->
    <view
      class="container"
      :class="{ fixed: scrollValue >= 723 }">
      <view class="wrap">
        <view
          class="item"
          v-for="(item, id) in catgList"
          :key="id"
          @click="toggleCategory(id)">
          <image
            class="image"
            :src="item.img"
            mode="scaleToFill" />
          <text class="text"> {{ item.title }}</text>
          <view :class="item.isActive ? 'active' : ''"></view>
        </view>
      </view>
    </view>
    <!-- 商品卡片展示 -->
    <view class="main">
      <view
        class="book-layout"
        v-if="!showWelcome">
        <uni-book
          ref="bookRef"
          :scrollValue="scrollValue"></uni-book>
      </view>
      <div class="column_item_0">
        <div
          class="test-style"
          @click="toBookMarket"
          v-if="showWelcome">
          <image
            class="book-icon"
            src="../../static/logo.png"
            mode="" />
          welcome
        </div>
        <view
          class="item"
          v-for="(item, index) in columnLeft"
          :key="index"
          @click="toGoodDetailPage(item._id)">
          <image
            :src="item.pics"
            class="column_pic"
            mode="aspectFill" />
          <div class="column-bottom">
            <div class="bottom-text">
              <span class="label">
                <span class="text">{{ item.delivery }}</span> </span
              >{{ item.title }}
            </div>
            <div class="box">
              <div class="bottom-price">
                <span class="price"><span class="symbol">￥</span>{{ item.price }}</span>
              </div>
              <div class="property-label">
                <div class="quality">
                  <span class="text-quality">{{ item.condition }}</span>
                </div>
              </div>
            </div>
          </div>
        </view>
      </div>
      <div class="column_item_1">
        <view
          class="item"
          v-for="(item, index) in columnRight"
          :key="index"
          @click="toGoodDetailPage(item._id)">
          <image
            :src="item.pics"
            class="column_pic"
            mode="aspectFill" />
          <div class="column-bottom">
            <div class="bottom-text">
              <span class="label">
                <span class="text">{{ item.delivery }}</span> </span
              >{{ item.title }}
            </div>
            <div class="box">
              <div class="bottom-price">
                <span class="price"><span class="symbol">￥</span>{{ item.price }}</span>
              </div>
              <div class="property-label">
                <div class="quality">
                  <span class="text-quality">{{ item.condition }}</span>
                </div>
              </div>
            </div>
          </div>
        </view>
      </div>
    </view>
  </view>
</template>

<script>
const db = wx.cloud.database();
import UniBook from "./components/uni-book.vue";

export default {
  components: {
    UniBook,
  },
  data() {
    return {
      // 将父组件的scrollValue传给子组件
      scrollValue: 0,
      searchKey: "",
      // isShow: 'true',
      pics: [],
      goodsInfo: [],
      jsData: {
        columnsHeight: [0, 0],
        isLoading: false,
      },
      columns: [[], []],
      indexObj: {},
      tempPics: [],
      Mode: "Loop",
      isShow: false,
      showWelcome: true,
      columnLeft: [],
      columnRight: [],
      catgList: [
        {
          id: 1,
          img: "../../static/category-nav/all.svg",
          title: "全部商品",
          isActive: true,
        },

        {
          id: 2,
          img: "../../static/category-nav/books.svg",
          title: "书籍教材",
          isActive: false,
        },
        {
          id: 3,
          img: "../../static/category-nav/iphone.svg",
          title: "电子设备",
          isActive: false,
        },
        {
          id: 4,
          img: "../../static/category-nav/fitness.svg",
          title: "健身器材",
          isActive: false,
        },
        {
          id: 5,
          img: "../../static/category-nav/brush.svg",
          title: "美妆日化",
          isActive: false,
        },
        {
          id: 6,
          img: "../../static/category-nav/clothes.svg",
          title: "服装服饰",
          isActive: false,
        },
        {
          id: 7,
          img: "../../static/category-nav/other.svg",
          title: "其他宝贝",
          isActive: false,
        },
      ],
      sum: 0,
      swiperList: [],
    };
  },
  onShow: async function () {
    console.log("index Page Show");
    // 清空搜索框文字
    this.searchKey = "";
    // 刷新页面，重新请求数据
    // await this.getGoodsInfo();
  },
  //监测屏幕滚动
  onPageScroll: function (e) {
    const scrollTop = parseInt(e.scrollTop * uni.getSystemInfoSync().pixelRatio);
    this.scrollValue = scrollTop;
  },
  onReachBottom() {
    // this.more();
    console.log("到底了");
  },

  onShareAppMessage() {},
  async onPullDownRefresh() {
    // 判断是不是书籍组件的刷新
    if (!this.showWelcome) {
      await this.$refs.bookRef.getList();
    } else {
      await this.getGoodsInfo();
    }
    uni.stopPullDownRefresh();
  },
  methods: {
    toBookMarket() {
      console.log("切换到书籍书籍市场");
    },

    searchOnChange(e) {
      console.log(e.detail);
      this.searchKey = e.detail;
    },
    toSearchPage() {
      // 跳转搜索结果页
      uni.navigateTo({
        url: "/pages/search-res/search-res?searchKey=" + this.searchKey,
      });
    },
    filterPics() {
      // 首页商品卡片的图片单独做组
      this.goodsInfo.forEach((item) => {
        item.pics = item.pics[0].url;
      });
    },
    async sortData(goodsInfo) {
      // 拆分两为两列
      let columnLeft = goodsInfo.filter((item, index) => {
        return index % 2 === 0;
      });
      let columnRight = goodsInfo.filter((item, index) => {
        return index % 2 !== 0;
      });
      // 当数组长度为单数时，造成右列空缺很高，需要补一个
      if (goodsInfo.length % 2 !== 0) {
        columnRight.push({
          pics: "cloud://qrh-database01-5gz9zkuedd28e7fc.7172-qrh-database01-5gz9zkuedd28e7fc-1313188449/swiper-pictures/books-5937716_640.jpg",
          transport: "不送",
          title: "曾梦想仗剑走天涯，没想到码农过一生",
          price: 100,
          quality: "底部彩蛋",
        });
      }
      this.columnLeft = columnLeft;
      this.columnRight = columnRight;

      console.log("首页--调整数据--完毕", columnLeft, columnRight);
    },
    async getGoodsInfo() {
      let _this = this;
      wx.showLoading({
        title: "数据加载中",
        mark: true,
      });
      await wx.cloud
        .callFunction({
          name: "getGoodsInfo",
        })
        .then((res) => {
          console.log("首页-请求所有数据-成功");
          this.goodsInfo = res.result.data;
          wx.hideLoading({
            success: (res) => {
              uni.setStorageSync("goodsInfo", this.goodsInfo);
              // 筛选第一张图片
              this.filterPics();
              // 整理数据 -- 全部商品
              _this.sortData(this.goodsInfo);
              wx.hideLoading();
            },
          });
        })
        .catch(console.error);
    },
    async getswiperList() {
      await db
        .collection("swiper")
        .doc("def1da45650023a10182606c71ecd04e")
        .get()
        .then((res) => {
          console.log("首页--请求轮播图数据--成功", res);

          this.swiperList = res.data.swiperList;
        });
    },
    toggleCategory(id) {
      // 隐藏欢迎标语
      if (id === 1) {
        this.showWelcome = false;
      } else {
        this.showWelcome = true;
      }

      console.log("切换到了--" + this.catgList[id].title + "--分类" + "--" + id);
      this.catgList.forEach((item) => {
        item.isActive = false;
      });
      this.catgList[id].isActive = true;

      let goodsInfo = this.goodsInfo;
      switch (id) {
        case 0:
          this.sortData(goodsInfo);
          break;
        case 1:
          let boos = goodsInfo.filter((item) => {
            return item.category === "书籍资料";
          });
          this.sortData(boos);
          break;
        case 2:
          let electronic = goodsInfo.filter((item) => {
            return item.category === "电子设备";
          });
          this.sortData(electronic);
          break;
        case 3:
          let fitness = goodsInfo.filter((item) => {
            return item.category === "健身器材";
          });
          this.sortData(fitness);
          break;
        case 4:
          let makeups = goodsInfo.filter((item) => {
            return item.category === "美妆日化";
          });
          this.sortData(makeups);
          break;
        case 5:
          let clothing = goodsInfo.filter((item) => {
            return item.category === "服装服饰";
          });
          this.sortData(clothing);
          break;
        case 6:
          let other = goodsInfo.filter((item) => {
            return item.category === "其他宝贝";
          });
          this.sortData(other);
          break;
        default:
      }
    },
    toGoodDetailPage(goodId) {
      console.log(goodId);
      uni.navigateTo({
        url: `/pages/good-detail/good-detail?goodId=${goodId}&from=index`,
      });
    },
  },
  async mounted() {
    await this.getGoodsInfo();
    await this.getswiperList();
  },
};
</script>
<style lang="scss" scoped>
.index-store-page {
  display: flex;
  flex-direction: column;
  padding: 0 29.79rpx;
  min-height: 100vh;
  background-color: $global-bg-color;

  /deep/ .van-search {
    padding: 0;
    padding: 10rpx 0 17.52rpx 0;
    background-color: $global-bg-color !important;
  }

  .banner-container {
    margin-bottom: 20.52rpx;
    border-radius: 26.29rpx;

    .swiper {
      overflow: hidden;
      height: 380.16rpx;
      border-radius: 26.29rpx;
      background-color: rgb(204, 204, 204);

      .swiper-item {
        .image {
          z-index: -1;
          width: 100%;
          height: inherit;
        }
      }
    }
  }

  .main {
    display: flex;
    flex: 1;
    justify-content: space-between;
    // 叉轴的起点对齐 align-items: flex-start;
    margin-top: 20rpx;

    .book-layout {
      position: relative;
      z-index: 10;
      width: 100%;
    }

    .column_item_0 {
      margin: 0 0 15rpx 0;
      margin-bottom: 18rpx;
      width: 48%;
      border-radius: 8.76rpx;

      .test-style {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20rpx;
        width: 100%;
        height: 120rpx;
        border-radius: 17.52rpx;
        background-color: #fff;
        // font-weight: bold;
        text-align: center;

        .book-icon {
          margin-right: 10rpx;
          width: 60rpx;
          height: 60rpx;
          border-radius: 10rpx;
        }
      }

      .item {
        margin-bottom: 15rpx;

        .column_pic {
          display: block;
          width: 100%;
          height: 336.45rpx;
          border-radius: 12rpx;
        }

        .column-bottom {
          box-sizing: border-box;
          padding: 10.51rpx 15rpx;
          width: 100%;
          height: auto;
          border-radius: 0 0 10rpx 10rpx;
          background: #fff;

          .bottom-text {
            overflow: hidden;
            -webkit-box-orient: vertical;
            padding-bottom: 5rpx;
            height: auto;
            text-overflow: ellipsis;
            white-space: nowrap; /* 添加这一行 */
            font-weight: bold;
            font-size: 24rpx;

            -webkit-line-clamp: 2;

            .label {
              margin-right: 10rpx;
              width: auto;
              border-radius: 4rpx;
              background-color: #0095ff;
              font-weight: normal;
              font-size: 20rpx;

              .text {
                padding: 4rpx 8rpx;
                color: #fff;
                font-size: 20rpx;
              }
            }
          }
        }

        .box {
          display: flex;
          padding: 10rpx 0;

          .bottom-price {
            display: flex;
            align-items: center;
            height: 40rpx;

            .price {
              color: rgb(255, 0, 0);
              font-weight: bold;
              font-size: 35rpx;

              .symbol {
                font-size: 22.52rpx;
              }
            }
          }

          .property-label {
            position: relative;
            display: flex;
            align-items: center;
            margin-left: 20rpx;
            height: 40rpx;
            font-weight: normal;
            font-size: 16.02rpx;

            .quality {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 4rpx;
              margin-right: 15rpx;
              width: auto;
              height: 23rpx;
              border: 2rpx solid rgb(255, 101, 101);
              border-radius: 5rpx;
              color: #ed555c;

              .text-quality {
                margin: 10rpx;
              }
            }
          }
        }
      }
    }
  }

  .column_item_1 {
    margin: 0 0 15rpx 0;
    margin-bottom: 18rpx;
    width: 48%;
    border-radius: 8.76rpx;

    .test-style {
      margin-bottom: 10rpx;
      width: 100%;
      height: 150rpx;
      border-radius: 17.52rpx;
      background-color: green;
    }

    .item {
      margin-bottom: 15rpx;

      .column_pic {
        display: block;
        width: 100%;
        height: 336.45rpx;
        border-radius: 12rpx;
      }

      .column-bottom {
        box-sizing: border-box;
        padding: 10.51rpx 15rpx;
        width: 100%;
        height: auto;
        border-radius: 0 0 10rpx 10rpx;
        background: #fff;

        .bottom-text {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          padding-bottom: 5rpx;
          height: auto;
          text-overflow: ellipsis;
          font-weight: bold;
          font-size: 24rpx;

          -webkit-line-clamp: 2;

          .label {
            margin-right: 10rpx;
            width: auto;
            border-radius: 4rpx;
            background-color: #0095ff;
            font-weight: normal;
            font-size: 20rpx;

            .text {
              padding: 4rpx 8rpx;
              color: #fff;
              font-size: 20rpx;
            }
          }
        }
      }

      .box {
        display: flex;
        padding: 10rpx 0;

        .bottom-price {
          display: flex;
          align-items: center;
          height: 40rpx;

          .price {
            color: rgb(255, 0, 0);
            font-weight: bold;
            font-size: 35rpx;

            .symbol {
              font-size: 22.52rpx;
            }
          }
        }

        .property-label {
          position: relative;
          display: flex;
          align-items: center;
          margin-left: 20rpx;
          height: 40rpx;
          font-weight: normal;
          font-size: 16.02rpx;

          .quality {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 4rpx;
            margin-right: 15rpx;
            width: auto;
            height: 23rpx;
            border: 2rpx solid rgb(255, 101, 101);
            border-radius: 5rpx;
            color: #ed555c;

            .text-quality {
              margin: 10rpx;
            }
          }
        }
      }
    }
  }

  .fixed {
    position: fixed;
    top: 0;
    left: 0;

    // margin-top: 0;
    z-index: 20;
    width: 100%;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 130.39rpx;
    border-radius: 22.78rpx;
    background-color: rgb(255, 255, 255);

    .wrap {
      display: flex;
      width: 95%;
      white-space: nowrap;
      transform: translateY(-10%);

      .item {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
        width: 90rpx;
        height: 90rpx;

        .image {
          width: 80rpx;
          height: 80rpx;
        }

        .text {
          margin-top: 7rpx;
          font-weight: bold;
          font-size: 20rpx;
        }

        .active {
          position: absolute;
          bottom: -18rpx;
          width: 55rpx;
          height: 8rpx;
          border-radius: 50rpx;
          background-color: #fc9b42;
        }
      }

      .item:nth-child(6) {
        margin-right: 0;
      }
    }
  }
}
</style>
