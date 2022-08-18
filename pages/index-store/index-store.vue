<template>
  <view class="index-store-page">
    <!-- 搜索框 -->
    <van-search :value="searchKey" placeholder="请输入搜索关键词" show-action @change="searchOnChange" @search="toSearchPage"
      bind:cancel="onCancel" />
    <!-- 轮播图 -->
    <view class="banner-container">
      <swiper class="swiper" autoplay circular>
        <swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index">
          <image class="image" :src="item" mode="scaleToFill" />
        </swiper-item>
      </swiper>
    </view>
    <!-- 分类导航图标 -->
    <view class="container">
      <view class="wrap">
        <view class="item" v-for="(item, id) in catgList" :key="id" @click="toggleCategory(id)">
          <image class="image" :src="item.img" mode="scaleToFill" />
          <text class="text"> {{ item.title }}</text>
          <view :class="item.isActive ? 'active' : ''"></view>
        </view>
      </view>
    </view>
    <!-- 商品卡片展示 -->
    <view class="main">
      <div class="column_item_0">
        <div class="test-style">
          <image class="book-icon" src="../../static/category-nav/books.svg" mode="" />
          书籍市场
        </div>
        <view class="item" v-for="(item, index) in columnLeft" :key="index" @click="toGoodDetailPage(item._id)">
          <image :src="item.pics" class="column_pic" mode="aspectFill" />
          <div class="column-bottom">
            <div class="bottom-text">
              <span class="label"> <span class="text">{{ item.transport }}</span> </span>{{ item.title }}
            </div>
            <div class="box">
              <div class="bottom-price">
                <span class="price"><span class="symbol">￥</span>{{ item.price }}</span>
              </div>
              <div class="property-label">
                <div class="quality">
                  <span class="text-quality">{{ item.quality }}</span>
                </div>
              </div>
            </div>
          </div>
        </view>
      </div>
      <div class="column_item_1">
        <view class="item" v-for="(item, index) in columnRight" :key="index" @click="toGoodDetailPage(item._id)">
          <image :src="item.pics" class="column_pic" mode="aspectFill" />
          <div class="column-bottom">
            <div class="bottom-text">
              <span class="label"> <span class="text">{{ item.transport }}</span> </span>{{ item.title }}
            </div>
            <div class="box">
              <div class="bottom-price">
                <span class="price"><span class="symbol">￥</span>{{ item.price }}</span>
              </div>
              <div class="property-label">
                <div class="quality">
                  <span class="text-quality">{{ item.quality }}</span>
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
import uniGoodsCard from "./components/uni-goods-card.vue";
import uniBanner from "./components/uni-banner.vue";
import UniGoodsCard from "./components/uni-goods-card.vue";
import UniProductCatgNav from "./components/uni-product-catg-nav.vue";
const db = wx.cloud.database()
export default {
  components: { uniBanner, UniProductCatgNav, UniGoodsCard, uniGoodsCard },
  data() {
    return {
      searchKey: '',
      isShow: 'true',
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
          img: "../../static/category-nav/iphone.svg",
          title: "电子设备",
          isActive: false,
        },
        {
          id: 3,
          img: "../../static/category-nav/fitness.svg",
          title: "健身器材",
          isActive: false,
        },
        {
          id: 4,
          img: "../../static/category-nav/brush.svg",
          title: "美妆日化",
          isActive: false,
        },
        {
          id: 5,
          img: "../../static/category-nav/clothes.svg",
          title: "服装服饰",
          isActive: false,
        },
        {
          id: 6,
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
    this.searchKey = '';
    // 刷新页面，重新请求数据
    // await this.getGoodsInfo();

  },
  async onPullDownRefresh() {
    await this.getGoodsInfo();
    uni.stopPullDownRefresh();
  },
  methods: {
    searchOnChange(e) {
      console.log(e.detail);
      this.searchKey = e.detail;
    },
    toSearchPage() {
      // 跳转搜索结果页
      uni.navigateTo({
        url: '/pages/search-res/search-res?searchKey=' + this.searchKey
      });
    },
    filterPics() {
      // 首页商品卡片的图片单独做组
      this.goodsInfo.forEach(item => {
        item.pics = item.pics[0].url
      });
    },
    async sortData(goodsInfo) {
      // 拆分两为两列
      let columnLeft = goodsInfo.filter((item, index) => {
        return index % 2 === 0
      })
      let columnRight = goodsInfo.filter((item, index) => {
        return index % 2 !== 0
      })
      // 当数组长度为单数时，造成右列空缺很高，需要补一个
      if (goodsInfo.length % 2 !== 0) {
        columnRight.push({
          pics: "cloud://wb-dev-test-8g4qxuuj00591c1e.7762-wb-dev-test-8g4qxuuj00591c1e-1313188449/good-pictures/Snipaste_2022-04-23_08-37-48.png",
          transport: "不送",
          title: "曾梦想仗剑走天涯，没想到码农过一生",
          price: 100,
          quality: "底部彩蛋"
        })
      }
      this.columnLeft = columnLeft;
      this.columnRight = columnRight;

      console.log("首页--调整数据--完毕", columnLeft, columnRight);
    },
    async getGoodsInfo() {
      let _this = this;
      wx.showLoading({
        title: '数据加载中',
        mark: true
      })
      await wx.cloud.callFunction({
        name: 'getGoodsInfo',
      })
        // TODO 已审核的数据筛选
        .then(res => {
          console.log("首页-请求所有数据-成功")
          this.goodsInfo = res.result.data;
          wx.hideLoading({
            success: (res) => {
              uni.setStorageSync('goodsInfo', this.goodsInfo);
              // 筛选第一张图片
              this.filterPics();
              // 整理数据 -- 全部商品
              _this.sortData(this.goodsInfo);
            },
          })
        })
        .catch(console.error)
    },
    async getswiperList() {
      await db.collection("swiper").doc('058dfefe62e372210fc0828f369ba54d').get().then((res) => {
        console.log("首页--请求轮播图数据--成功");
        this.swiperList = res.data.swiperList;
      })
    },
    toggleCategory(id) {
      console.log('切换到了--' + this.catgList[id].title + '--分类' + "--" + id);
      this.catgList.forEach(item => {
        item.isActive = false;
      });
      this.catgList[id].isActive = true;

      let goodsInfo = this.goodsInfo;
      switch (id) {
        case 0:
          this.sortData(goodsInfo);
          break;
        case 1:
          let electronic = goodsInfo.filter(item => {
            return item.category === '电子设备'
          })
          this.sortData(electronic);
          break;
        case 2:
          let fitness = goodsInfo.filter(item => {
            return item.category === '健身器材'
          })
          this.sortData(fitness);
          break;
        case 3:
          let makeups = goodsInfo.filter(item => {
            return item.category === '美妆日化'
          })
          this.sortData(makeups);
          break;
        case 4:
          let clothing = goodsInfo.filter(item => {
            return item.category === '服装服饰'
          })
          this.sortData(clothing);
          break;
        case 5:
          let other = goodsInfo.filter(item => {
            return item.category === '其他宝贝'
          })
          this.sortData(other);
          break;
        default:

      }
    },
    toGoodDetailPage(goodId) {
      console.log(goodId);
      uni.navigateTo({
        url: '/pages/goods-detail/goods-detail?goodId=' + goodId
      });
    }
  },
  async mounted() {
    await this.getGoodsInfo();
    await this.getswiperList();
  },
};
</script>
<style lang="scss" scoped>
.index-store-page {
  height: auto;
  padding: 0 29.79rpx;
  background-color: #f0f0f0;

   /deep/ .van-search {
    padding: 0;
    padding: 10rpx 0 17.52rpx 0;
    background-color: #f0f0f0 !important;
  }

  .banner-container {
    border-radius: 26.29rpx;

    .swiper {
      overflow: hidden;
      height: 380.16rpx;
      background-color: rgb(204, 204, 204);
      border-radius: 26.29rpx;

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
    justify-content: space-between;

// 叉轴的起点对齐 align-items: flex-start;
    margin-top: 20rpx;

    .column_item_0 {
      width: 48%;
      margin: 0 0 15rpx 0;
      margin-bottom: 18rpx;
      border-radius: 8.76rpx;

      .test-style {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 120rpx;
        margin-bottom: 10rpx;
        font-weight: bold;
        text-align: center;
        background-color: #ffc300;
        border-radius: 17.52rpx;

        .book-icon {
          width: 50rpx;
          height: 50rpx;
          padding-right: 5px;
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
          width: 100%;
          height: auto;
          padding: 10.51rpx 15rpx;
          background: #fff;
          border-radius: 0 0 10rpx 10rpx;

          .bottom-text {
            display: -webkit-box;
            overflow: hidden;
            height: auto;
            padding-bottom: 5rpx;
            font-size: 12px;
            font-weight: bold;
            text-overflow: ellipsis;

            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;

            .label {
              width: auto;
              margin-right: 5px;
              font-size: 10px;
              font-weight: normal;
              background-color: #0095ff;
              border-radius: 2px;

              .text {
                padding: 2px 4px;
                color: #fff;
                font-size: 10px;
              }
            }
          }
        }

        .box {
          display: flex;
          padding: 5px 0;

          .bottom-price {
            display: flex;
            align-items: center;
            height: 40rpx;

            .price {
              color: rgb(255, 0, 0);
              font-size: 35rpx;
              font-weight: bold;

              .symbol {
                font-size: 22.52rpx;
              }
            }
          }

          .property-label {
            position: relative;
            display: flex;
            align-items: center;
            height: 40rpx;
            margin-left: 10px;
            font-size: 16.02rpx;
            font-weight: normal;

            .quality {
              display: flex;
              justify-content: center;
              align-items: center;
              width: auto;
              height: 23rpx;
              margin-top: 4rpx;
              margin-right: 15rpx;
              color: #ed555c;
              border: 1px solid rgb(255, 101, 101);
              border-radius: 5rpx;

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
    width: 48%;
    margin: 0 0 15rpx 0;
    margin-bottom: 18rpx;
    border-radius: 8.76rpx;

    .test-style {
      width: 100%;
      height: 150rpx;
      margin-bottom: 10rpx;
      background-color: green;
      border-radius: 17.52rpx;
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
        width: 100%;
        height: auto;
        padding: 10.51rpx 15rpx;
        background: #fff;
        border-radius: 0 0 10rpx 10rpx;

        .bottom-text {
          display: -webkit-box;
          overflow: hidden;
          height: auto;
          padding-bottom: 5rpx;
          font-size: 12px;
          font-weight: bold;
          text-overflow: ellipsis;

          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;

          .label {
            width: auto;
            margin-right: 5px;
            font-size: 10px;
            font-weight: normal;
            background-color: #0095ff;
            border-radius: 2px;

            .text {
              padding: 2px 4px;
              color: #fff;
              font-size: 10px;
            }
          }
        }
      }

      .box {
        display: flex;
        padding: 5px 0;

        .bottom-price {
          display: flex;
          align-items: center;
          height: 40rpx;

          .price {
            color: rgb(255, 0, 0);
            font-size: 35rpx;
            font-weight: bold;

            .symbol {
              font-size: 22.52rpx;
            }
          }
        }

        .property-label {
          position: relative;
          display: flex;
          align-items: center;
          height: 40rpx;
          margin-left: 10px;
          font-size: 16.02rpx;
          font-weight: normal;

          .quality {
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
            height: 23rpx;
            margin-top: 4rpx;
            margin-right: 15rpx;
            color: #ed555c;
            border: 1px solid rgb(255, 101, 101);
            border-radius: 5rpx;

            .text-quality {
              margin: 10rpx;
            }
          }
        }
      }
    }
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 130.39rpx;
    margin-top: 20.52rpx;
    background-color: rgb(255, 255, 255);
    border-radius: 22.78rpx;

    .wrap {
      display: flex;
      width: 95%;
      white-space: nowrap;
      transform: translateY(-10%);

      .item {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        width: 90rpx;
        height: 90rpx;

        .image {
          width: 80rpx;
          height: 80rpx;
        }

        .text {
          margin-top: 7rpx;
          font-size: 20rpx;
          font-weight: bold;
        }

        .active {
          position: absolute;
          bottom: -18rpx;
          width: 55rpx;
          height: 8rpx;
          background-color: #fc9b42;
          border-radius: 25px;
        }
      }

      .item:nth-child(6) {
        margin-right: 0;
      }
    }
  }
}
</style>


