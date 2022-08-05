<template>
  <view class="container">
    <div class="search">
      <van-search placeholder="请输入搜索关键词" :value="searchKey" show-action @search="onSearch" bind:cancel="onCancel" />
    </div>
    <block v-if="resArrTemp.length > 0">
      <div class="dropdown-menu">
        <van-dropdown-menu :overlay="false" active-color="#ffc300">
          <van-dropdown-item @change="changeCategory" :value="categoryDefault" :options="categoryOption" />
          <van-dropdown-item @change="changeSort" :value="sortDefault" :options="sortOption" />
        </van-dropdown-menu>
      </div>

      <div v-for="(item, index) in resArr" :key="index" class="exhibit-goods" @click="toGoodDetailPage(item._id)">
        <div class="wrap">
          <div class="left">
            <image class="img-good" :src="item.pics[0].url" mode="aspectFill" />
          </div>
          <div class="center">
            <div class="top">
              <div class="desc">
                {{ item.title }}
              </div>
              <div class="price">{{ item.price }}</div>
            </div>
            <div class="bottom">
              <div class="label">
                <div class="transport">
                  <image class="icon-transport" src="../../static/label/transport.svg" mode="" />
                  <span class="text-transport">{{ item.transport }}</span>
                </div>
                <div class="address">
                  <image class="icon-address" src="../../static/label/address.svg" mode="" />
                  <span class="text-address">{{ item.address }}</span>
                </div>
                <div class="quality">
                  <image class="icon-quality" src="../../static/label/quality.svg" mode="" />
                  <span class="text-quality">{{ item.quality }}</span>
                </div>
              </div>
              <div class="browse">
                <div class="icon-eye">
                  <van-icon name="eye-o" />
                </div>
                <span class="num">{{ item.views }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </block>
    <block v-else>
      <div class="no-find">
        <image src="../../static/illustration/暂无搜索结果.svg" mode="scaleToFill" />
        <div class="no-find-text">
          暂无搜索结果~
        </div>
      </div>
    </block>

  </view>
</template>

<script>
import VanIcon from "../../wxcomponents/vant/icon/index";
export default {
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
          text: "书籍资料",
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
        { text: "默认排序", value: 0 },
        { text: "价格由高到低", value: 1 },
        { text: "价格由低到高", value: 2 },
      ],
      categoryDefault: 0,
      sortDefault: 0,
      searchKey: '',
      goodsInfo: [],
      resArr: [],
      resArrTemp: []
    };
  },
  onLoad: function (option) {
    // console.log('搜索关键字' + option); //打印出上个页面传递的搜索关键字参数。
    // this.searchKey = option.searchKey;
    this.searchKey = '发';

    let goodsInfo = uni.getStorageSync('goodsInfo');
    console.log('goodsInfo->', goodsInfo);
    this.goodsInfo = goodsInfo;

    this.search(goodsInfo, this.searchKey);

  },
  methods: {
    onSearch(e) {
      this.searchKey = e.detail;
      this.search(this.goodsInfo, this.searchKey);
    },
    search(lists, key) {
      let reg = new RegExp(key);
      console.log(reg);
      let resArr = [];
      lists.filter(item => {
        if (reg.test(item.title)) {
          resArr.push(item);
        }
      })
      this.resArr = resArr;
      // 备用数组
      this.resArrTemp = resArr;
    },
    toGoodDetailPage(goodId) {
      uni.navigateTo({
        url: '/pages/goods-detail/goods-detail?goodId=' + goodId,
      });
    },
    changeCategory(e) {
      let index = e.detail;
      let category = this.categoryOption[index].text;

      // 每次切换分类都重置渲染数组为搜索后的数组
      this.resArr = this.resArrTemp;

      if (category == "全部商品") {
        this.resArr = this.resArrTemp;
      } else {
        let temp = [];
        this.resArr.forEach(item => {
          if (item.category == category) {
            temp.push(item);
          }
        });
        // 渲染数组
        this.resArr = temp;
      }
    },
    changeSort(e) {
      console.log(e);
      let index = e.detail;
      console.log(this.sortOption[index].value); // 0-默认、1-价格高到低、2-价格低到高
      let sortValue = this.sortOption[index].text;
      console.log(sortValue);

      if (sortValue === "价格由低到高") {
        this.resArr.sort(this.compareDesc("price"));
      } else if (sortValue === "价格由高到低") {
        this.resArr.sort(this.compareAsce("price"));
      } else {
        this.resArr = this.resArrTemp;
      }
      console.log(this.resArrTemp);
    },
    // 升序比较函数（由小到大）
    compareDesc(p) {
      return function (m, n) {
        var a = m[p];
        var b = n[p];
        return a - b;
      }
    },
    // 降序比较函数
    compareAsce(p) {
      return function (m, n) {
        var a = m[p];
        var b = n[p];
        return b - a;
      }
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
        width: 100%;
        padding-right: 10px;

        .top {
          margin-top: 10px;

          .desc {
            min-height: 33px;
            font-size: 13px;
            font-weight: 500;
            text-overflow: ellipsis;

            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            mdisplay: -webkit-box;
            noverflow: hidden;
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

  .no-find {
    display: flex;
    flex-direction: column;
    align-items: center;


    .no-find-text {
      font-style: italic;
    }
  }
}
</style>
