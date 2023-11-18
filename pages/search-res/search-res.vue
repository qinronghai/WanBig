<template>
  <view class="container">
    <div class="search">
      <van-search
        placeholder="请输入搜索关键词"
        :value="searchKey"
        show-action
        @search="onSearch"
        bind:cancel="onCancel" />
    </div>
    <block>
      <div class="dropdown-menu">
        <van-dropdown-menu
          :overlay="false"
          active-color="#ffc300">
          <van-dropdown-item
            @change="changeCategory"
            :value="categoryDefault"
            :options="categoryOption" />
          <van-dropdown-item
            @change="changeSort"
            :value="sortDefault"
            :options="sortOption" />
        </van-dropdown-menu>
      </div>
      <div
        v-for="(item, index) in resArr"
        :key="index"
        class="exhibit-goods"
        @click="toGoodDetailPage(item)">
        <div class="wrap">
          <div class="left">
            <image
              class="img-good"
              :src="item.key ? item.bookinfo.pic : item.pics[0].url"
              mode="aspectFill" />
          </div>
          <div class="center">
            <div class="top">
              <div class="desc">
                {{ item.key ? item.bookinfo.title : item.title }}
              </div>
              <div class="price">{{ item.price }}</div>
            </div>
            <div class="bottom">
              <div class="label">
                <div class="transport">
                  <image
                    class="icon-transport"
                    src="../../static/label/transport.svg"
                    mode="" />
                  <span class="text-transport">{{ item.key ? (item.deliveryid == 0 ? "自提" : "配送") : item.delivery }}</span>
                </div>
                <div
                  v-if="item.delivery == '自提'"
                  class="address">
                  <image
                    class="icon-address"
                    src="../../static/label/address.svg"
                    mode="" />
                  <span class="text-address">{{ item.place }}</span>
                </div>
                <div class="quality">
                  <image
                    class="icon-quality"
                    src="../../static/label/quality.svg"
                    mode="" />
                  <span class="text-quality">{{
                    item.key
                      ? item.conditionid == 0
                        ? "全新"
                        : item.conditionid == 1
                        ? "几乎全新"
                        : item.conditionid == 2
                        ? "轻微痕迹"
                        : "明显痕迹"
                      : item.condition
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <block v-if="resArr.length === 0">
        <div class="no-find">
          <image
            src="../../static/illustration/暂无搜索结果.svg"
            mode="scaleToFill" />
          <div class="no-find-text">暂无搜索结果~</div>
        </div>
      </block>
    </block>
  </view>
</template>

<script>
import VanIcon from "../../wxcomponents/vant/icon/index";
const db = wx.cloud.database();
const _ = db.command;

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
      searchKey: "",

      resArr: [],
      resArrTemp: [],

      page: 0,
      nomore: false,
    };
  },
  onLoad: function (option) {
    console.log("搜索关键字" + option); //打印出上个页面传递的搜索关键字参数。
    this.searchKey = option.searchKey;

    this.search(option.searchKey);
  },
  // 监测页面到底
  onReachBottom() {
    console.log("到底了 :>> ");
    this.more();
  },
  // 监听页面卸载
  onUnload() {
    this.resArr = [];
    this.resArrTemp = [];
    this.page = 0;
    this.nomore = false;
  },
  methods: {
    onSearch(e) {
      this.searchKey = e.detail;
      this.search(e.detail);
    },
    // 构造匹配规则的正则表达式
    createFuzzyRegex(query) {
      // 将输入的查询字符串进行转义，防止其中包含正则表达式元字符
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // 构建模糊查询的正则表达式
      const fuzzyRegex = new RegExp(escapedQuery.split("").join(".*"));

      return fuzzyRegex;
    },
    // 合并两个数组(交替进行)
    mergeAlternately(arr1, arr2) {
      let result = arr1.reduce((acc, val, i) => {
        acc.push(val);
        if (arr2[i] !== undefined) {
          acc.push(arr2[i]);
        }
        return acc;
      }, []);

      // 如果 arr2 的长度大于 arr1，将剩余的元素添加到结果中
      if (arr2.length > arr1.length) {
        result.push(...arr2.slice(arr1.length));
      }

      return result;
    },
    // 模糊查询获取商品列表
    async getlist(key) {
      uni.showLoading({
        title: "加载中",
        mask: true,
      });

      try {
        // 使用模糊查询获取商品列表
        const goodres = await db
          .collection("goods")
          .where({
            title: this.createFuzzyRegex(key),
          })
          .limit(10)
          .get();
        // 图书列表
        const bookres = await db
          .collection("publish")
          .where({
            key: this.createFuzzyRegex(key),
          })
          .limit(10)
          .get();
        console.log("tets :>> ", "tets");
        // 合并数组
        const list = this.mergeAlternately(goodres.data, bookres.data);
        console.log("list :>> ", list);

        console.log("模糊查询获取商品成功 :>> ", goodres.data);
        console.log("模糊查询获取书籍成功 :>> ", bookres.data);
        uni.hideLoading();
        return list;
      } catch (error) {
        console.log("模糊查询获取商品失败 :>> ", error);
      } finally {
        uni.hideLoading();
      }
    },
    // 执行搜索
    async search(key) {
      // 对key进行判空
      if (key == "") {
        this.resArr = [];
        this.resArrTemp = [];
        uni.showToast({
          title: "请输入搜索关键字",
          icon: "none",
          mask: true,
        });
        return;
      }
      // 搜索
      this.resArr = await this.getlist(key);
      // 重置页数和更多的状态
      this.nomore = false;
      this.page = 0;
      // 备份数组
      this.resArrTemp = this.resArr?.slice() || [];
    },
    // 加载更多
    async more() {
      uni.showLoading({
        title: "加载中",
        mask: true,
      });

      if (this.nomore || this.resArr.length < 10) {
        // 没有更多
        console.log("进来了 :>> ");
        uni.hideLoading();
        return;
      }

      const page = this.page + 1;
      console.log("test :>> ");
      try {
        // 使用 Promise.all 并行获取商品和书籍
        const [goodres, bookres] = await Promise.all([
          db
            .collection("goods")
            .where({
              title: this.createFuzzyRegex(this.searchKey),
            })
            .skip(page * 10)
            .limit(10)
            .get(),
          db
            .collection("publish")
            .where({
              key: this.createFuzzyRegex(this.searchKey),
            })
            .skip(page * 10)
            .limit(10)
            .get(),
        ]);
        console.log("goodres :>> ", goodres);
        console.log("bookres :>> ", bookres);

        if (goodres.data.length === 0 && bookres.data.length === 0) {
          this.nomore = true;
          uni.hideLoading();
          return;
        }
        if (goodres.data.length < 10 || bookres.data.length < 10) {
          this.nomore = true;
        }

        // 合并数组
        const list = this.mergeAlternately(goodres.data, bookres.data);

        // 拼接
        this.resArr = this.resArr.concat(list);
        // 备份数组
        this.resArrTemp = this.resArr?.slice() || [];

        uni.hideLoading();
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: "数据加载失败",
          icon: "none",
          mask: true,
        });
        console.error("加载更多失败", error);
      }
    },

    toGoodDetailPage(item) {
      // 判断是商品还是图书
      if (item.key == undefined) {
        // 商品
        let goodId = item._id;
        console.log("跳转 :>> ", item);
        uni.navigateTo({
          url: "/pages/good-detail/good-detail?goodId=" + goodId,
        });
      } else {
        // 图书
        let bookId = item._id;
        console.log("跳转 :>> ", item);
        uni.navigateTo({
          url: "/pages/book-detail/book-detail?scene=" + bookId,
        });
      }
    },
    changeCategory(e) {
      const index = e.detail;
      const category = this.categoryOption[index].text;

      // 每次切换分类都重置渲染数组为搜索后的数组
      this.resArr = this.resArrTemp;

      let temp = [];
      if (category !== "全部商品") {
        if (category === "书籍资料") {
          temp = this.resArr.filter((item) => !!item.key);
        } else {
          temp = this.resArr.filter((item) => item.category === category);
        }
        // 渲染数组
        this.resArr = temp;
      }
    },

    changeSort(e) {
      let index = e.detail;
      let sortValue = this.sortOption[index].text;

      if (sortValue === "价格由低到高") {
        this.resArr.sort(this.compareDesc("price"));
      } else if (sortValue === "价格由高到低") {
        this.resArr.sort(this.compareAsce("price"));
      } else {
        console.log("ret :>> ");
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
      };
    },
    // 降序比较函数
    compareAsce(p) {
      return function (m, n) {
        var a = m[p];
        var b = n[p];
        return b - a;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 15px;
  min-height: 100vh;
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
      border-radius: 10px;
      background-color: #fff;

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
        width: 100%;

        .top {
          margin-top: 10px;

          .desc {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            min-height: 33px;
            text-overflow: ellipsis;
            font-weight: 500;
            font-size: 13px;

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
            font-weight: bolder;
            font-size: 16.02rpx;

            .transport {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 4rpx;
              margin-right: 15rpx;
              height: 30rpx;
              border-radius: 5rpx;
              background-color: #4da4e2;

              .text-transport {
                margin: 10rpx;
              }

              .icon-transport {
                margin-left: 10rpx;
                width: 19.28rpx;
                height: 19.28rpx;
              }
            }

            .address {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 4rpx;
              margin-right: 15rpx;
              height: 30rpx;
              border-radius: 5rpx;
              background-color: #ffc300;

              .text-address {
                margin: 10rpx;
              }

              .icon-address {
                margin-left: 10rpx;
                width: 19.28rpx;
                height: 19.28rpx;
              }
            }

            .quality {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 4rpx;
              margin-right: 15rpx;
              height: 30rpx;
              border-radius: 5rpx;
              background-color: #ffc300;

              .text-quality {
                margin: 10rpx;
              }

              .icon-quality {
                margin-left: 10rpx;
                width: 17.52rpx;
                height: 17.52rpx;
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
              text-align: center;
              font-size: 10px;
            }
          }
        }
      }

      .right {
        display: flex;
        align-items: center;
        width: 25px;
        border-radius: 0 10px 10px 0;
        background-color: #292929;

        .arrow_left {
          width: 26px;
          height: 26px;
        }
      }
    }
  }

  .no-find {
    display: flex;
    align-items: center;
    flex-direction: column;

    .no-find-text {
      font-style: italic;
    }
  }
}
</style>
