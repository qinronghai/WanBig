<template>
  <view class="main" v-if="isShow">
    <div class="column_item_0">
      <div class="test-style">

        <image class="book-icon" src="../../../static/category-nav/books.svg" mode="" />
        书籍市场

      </div>
      <view class="item" v-for="(pics, index) in columns[0]" :key="index">
        <image :src="pics" class="column_pic" mode="aspectFill" />
        <div class="column-bottom">


          <div class="bottom-text">
            <span class="label"> <span class="text">自取</span> </span>完美，手抖，下班時間忙，重要的不是禮物的貴重
          </div>
          <div class="box">


            <div class="bottom-price">
              <span class="price"><span class="symbol">￥</span>10</span>
            </div>
            <div class="property-label">
              <div class="quality">
                <span class="text-quality">几乎全新</span>
              </div>
            </div>
          </div>
        </div>
      </view>
    </div>
    <div class="column_item_1">
      <view class="item" v-for="(pics, index) in columns[1]" :key="index">
        <image :src="pics" class="column_pic" mode="aspectFill" />
        <div class="column-bottom">


          <div class="bottom-text">
            <span class="label"> <span class="text">自取</span> </span>完美，手抖，下班時間忙，重要的不是禮物的貴重
          </div>
          <div class="box">


            <div class="bottom-price">
              <span class="price"><span class="symbol">￥</span>10</span>
            </div>
            <div class="property-label">
              <div class="quality">
                <span class="text-quality">几乎全新</span>
              </div>
            </div>
          </div>
        </div>
      </view>
    </div>
  </view>
</template>

<script>
const db = wx.cloud.database()

export default {
  data() {
    return {
      pics: [
        "https://res.wx.qq.com/wxdoc/dist/assets/img/5101.c1db6a96.png",
        "https://www.thoughtco.com/thmb/jtUUbpSwsJTs7Kr4HEdvTagqxZ4=/1732x1272/filters:fill(auto,1)/GettyImages-1036106366-5c58ee26c9e77c00016b4152.jpg",
        "https://res.wx.qq.com/wxdoc/dist/assets/img/5106.d1c51378.png",
        "https://s1.ax1x.com/2022/04/14/LQalVJ.jpg",
        "https://res.wx.qq.com/wxdoc/dist/assets/img/5102.332bb21d.png",
        "https://img.lookvin.com/editor/202006/19/112020624.png",
        "https://s1.ax1x.com/2022/04/14/LQaGP1.jpg",
        "https://res.wx.qq.com/wxdoc/dist/assets/img/5109.c1a972f0.png",
        "https://res.wx.qq.com/wxdoc/dist/assets/img/5103.47e64f38.png",
        "https://res.wx.qq.com/wxdoc/dist/assets/img/5104.401091c6.png",
        "https://res.wx.qq.com/wxdoc/dist/assets/img/51203.97d4269b.png",
        "https://res.wx.qq.com/wxdoc/dist/assets/img/5803.c3f8aebf.png",
      ],
      goodsInfo: [],
      jsData: {
        columnsHeight: [0, 0],
        isLoading: false,
      },
      columns: [[], []],
      tempPics: [],
      Mode: "Loop",
      isShow: false,
    };
  },
  methods: {
    getImageInfo(src) {
      console.log("getImageInfo被调用了");
      return new Promise((resolve, reject) => {
        uni.getImageInfo({
          src,
          success(res) {
            const height = (res.height * 750) / res.width;
            // 374*668
            resolve({ ...res, height, src });
          },
          fail(e) {
            console.error(e, "失败了");
            resolve({
              type: "error",
              height: 750,
              src,
            });
          },
        });
      });
    },
    //获取所有图片信息以后一次加载，加载慢，渲染效果稍好
    batchPics: function (picList, columns) {
      let loadPicPs = [];

      for (let i = 0; i < picList.length; i++) {
        loadPicPs.push(this.getImageInfo(picList[i]));
      }

      Promise.all(loadPicPs).then((results) => {
        for (let i = 0; i < results.length; i++) {
          let res = results[i];
          if (i < results.length / 2) {
            columns[0].push(res.path);
          } else {
            columns[1].push(res.path);
          }
        }

        this.columns = columns;
        // this.jsData.columnsHeight = columnsHeight;
        wx.hideLoading();
        this.isShow = true;
      });
    },
    //递归图片加载，这种是获取一个信息往collumn里面放一个
    //加载图片有点像挤牙膏
    loopPics: function (picList, columns, columnsHeight, index) {
      console.log(picList);
      let pic = picList.shift();
      if (!pic) return;
      this.getImageInfo(pic).then((res) => {
        console.log("wtfffffffff", res);
        index = columnsHeight[1] < columnsHeight[0] ? 1 : 0;
        columns[index].push(res.path);
        columnsHeight[index] += res.height;

        this.columns = columns;
        this.jsData.columnsHeight = columnsHeight;
        loopPics();
      });
    },
    // 渲染页面
    renderPage: function (picList) {
      var that = this,
        data = this,
        columns = data.columns,
        tempPics = data.tempPics,
        length = tempPics.length,
        index = 0;

      this.Mode == "Batch"
        ? this.loopPics(
          picList,
          columns,
          tempPics,
          length,
          columnsHeight,
          index
        )
        : this.batchPics(picList, columns);
    },
    //加载数据
    loadData: function () {
      var that = this;
      console.log(that.jsData.isLoading);
      if (!that.jsData.isLoading) {
        that.jsData.isLoading = true;
        console.log('resssss', this.pics);
        that.renderPage(that.pics);
      }
    },
    async loadGoodsInfo() {
      // 向数据库发送请求
      console.log('请求数据库');
      await db.collection('goods').get().then(res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
        this.goodsInfo = res.data;
        let goodsInfo = res.data;

        // 拆分图片单独做组
        let pics = goodsInfo.map(item => {

          return item.pics[0].url;
        })
        console.log("888", pics);
        this.pics = pics;
        this.loadData();

      })
    },
    judgeGoodsInLocal() {
      // 判断本地存储有无商品信息
      let goodsInfo = uni.getStorageSync('goodsInfo');
      if (goodsInfo.length) {
        this.goodsInfo = goodsInfo;
      } else {
        this.loadGoodsInfo();
      }
    },
    startTest() {
      this.judgeGoodsInLocal();
    }
  },
  async mounted() {
    await this.startTest();
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;

// 交叉轴的起点对齐
  align-items: flex-start;
  margin-top: 20rpx;

  .column_item_0 {
    width: 48%;

// width: 100%;
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
        height: 140rpx;
        padding: 10.51rpx 15rpx;
        background: #fff;
        border-radius: 0 0 10rpx 10rpx;

        .bottom-text {
          display: -webkit-box;
          overflow: hidden;
          height: 70rpx;
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
        padding-top: 5px;

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
            border: .5px solid rgb(255, 101, 101);
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
      height: 140rpx;
      padding: 10.51rpx 15rpx;
      background: #fff;
      border-radius: 0 0 10rpx 10rpx;

      .bottom-text {
        display: -webkit-box;
        overflow: hidden;
        height: 70rpx;
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
      padding-top: 5px;

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
          border: .5px solid rgb(255, 101, 101);
          border-radius: 5rpx;

          .text-quality {
            margin: 10rpx;
          }
        }
      }
    }
  }
}
</style>
