<template>
  <view class="main" v-if="isShow">
    <div class="column_item_0">
      <div class="test-style"><div class="test-text">插槽</div></div>
      <view class="item" v-for="(pics, index) in columns[0]" :key="index">
        <image :src="pics" class="column_pic" mode="aspectFill" />
        <div class="column-bottom">
          <view class="bottom-text">完美，手抖，下班時間忙，重要的不是禮物的貴重</view>
          <div class="bottom-price">
            <span class="price"><span class="symbol">￥</span>10</span>
            <div class="want">5人想要</div>
          </div>
          <div class="property-label">
            <div class="address">
              <image class="icon-address" src="../../../static/label/address.svg" mode="" />
              <span class="text-address">西8</span>
            </div>
            <div class="quality">
              <image class="icon-quality" src="../../../static/label/quality.svg" mode="" />
              <span class="text-quality">几乎全新</span>
            </div>
          </div>
        </div>
      </view>
    </div>
    <div class="column_item_1">
      <view class="item" v-for="(pics, index) in columns[1]" :key="index">
        <image :src="pics" class="column_pic" mode="aspectFill" />
        <div class="column-bottom">
          <view class="bottom-text">完美，手抖，下班時間忙，重要的不是禮物的貴重</view>
          <div class="bottom-price">
            <span class="price"><span class="symbol">￥</span>10</span>
            <div class="want">5人想要</div>
          </div>
          <div class="property-label">
            <div class="address">
              <image class="icon-address" src="../../../static/label/address.svg" mode="" />
              <span class="text-address">西8</span>
            </div>
            <div class="quality">
              <image class="icon-quality" src="../../../static/label/quality.svg" mode="" />
              <span class="text-quality">几乎全新</span>
            </div>
          </div>
        </div>
      </view>
    </div>
  </view>
</template>

<script>
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
        // columnsHeight = that.jsData.columnsHeight,
        index = 0;

      this.Mode == "Batch"
        ? this.loopPics(picList, columns, tempPics, length, columnsHeight, index)
        : this.batchPics(picList, columns);
    },
    //加载数据
    loadData: function () {
      var that = this;
      console.log(that.jsData.isLoading);
      if (!that.jsData.isLoading) {
        wx.showLoading();
        that.jsData.isLoading = true;

        that.renderPage(that.pics);
      }
    },
  },
  mounted() {
    this.loadData();
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
      width: 100%;
      height: 150rpx;
      margin-bottom: 10rpx;
      background-color: green;
      border-radius: 17.52rpx;
    }
    .item {
      margin-bottom: 15rpx;
      box-shadow: 5rpx 5rpx 10rpx 0 rgba(0, 0, 0, .3);
      .column_pic {
        display: block;
        width: 100%;
        // width: 280.37rpx;
        height: 336.45rpx;
        border-radius: 10rpx 10rpx 0 0;
      }
      .column-bottom {
        box-sizing: border-box;
        width: 100%;
        height: 160rpx;
        padding: 10.51rpx 15.77rpx;
        background: #fff;
        border-radius: 0 0 10rpx 10rpx;

        .bottom-text {
          display: -webkit-box;
          overflow: hidden;
          height: 70rpx;
          font-size: 22.78rpx;
          text-overflow: ellipsis;
          // background-color: red;

          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .bottom-price {
          // background-color: rgb(27, 37, 183);
          display: flex;
          align-items: center;
          height: 40rpx;
          .price {
            color: rgb(255, 89, 0);
            font-size: 35rpx;
            font-weight: bold;
            .symbol {
              font-size: 17.52rpx;
            }
          }
          .want {
            margin-left: 10rpx;
            color: #acacac;
            font-size: 17.52rpx;
            font-weight: 500;
          }
        }
        .property-label {
          position: relative;
          display: flex;
          align-items: center;
          height: 40rpx;
          // margin-top: 10rpx;
          font-size: 16.02rpx;
          font-weight: bolder;
          .address {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30rpx;
            margin-top: 4rpx;
            margin-right: 15rpx;
            background-color: #ffc300;
            border-radius: 10rpx;
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
            border-radius: 10rpx;
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
      }
    }
  }
  .column_item_1 {
    // width: 100%;
    width: 48%;
    margin: 0 0 15rpx 0;
    margin-bottom: 18rpx;
    border-radius: 8.76rpx;

    .item {
      margin-bottom: 15rpx;
      box-shadow: 5rpx 5rpx 10rpx 0 rgba(0, 0, 0, .3);
      .column_pic {
        display: block;
        width: 100%;
        // width: 280.37rpx;
        height: 336.45rpx;
        border-radius: 10rpx 10rpx 0 0;
      }
      .column-bottom {
        box-sizing: border-box;
        width: 100%;
        height: 160rpx;
        padding: 10.51rpx 15.77rpx;
        background: #fff;
        border-radius: 0 0 10rpx 10rpx;

        .bottom-text {
          display: -webkit-box;
          overflow: hidden;
          height: 70rpx;
          font-size: 22.78rpx;
          text-overflow: ellipsis;
          // background-color: red;

          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .bottom-price {
          // background-color: rgb(27, 37, 183);
          display: flex;
          align-items: center;
          height: 40rpx;
          .price {
            color: rgb(255, 89, 0);
            font-size: 35rpx;
            font-weight: bold;
            .symbol {
              font-size: 17.52rpx;
            }
          }
          .want {
            margin-left: 10rpx;
            color: #acacac;
            font-size: 17.52rpx;
            font-weight: 500;
          }
        }
        .property-label {
          position: relative;
          display: flex;
          align-items: center;
          height: 40rpx;
          // margin-top: 10rpx;
          font-size: 16.02rpx;
          font-weight: bolder;
          .address {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30rpx;
            margin-top: 4rpx;
            margin-right: 15rpx;
            background-color: #ffc300;
            border-radius: 10rpx;
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
            border-radius: 10rpx;
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
      }
    }
  }
}
</style>
