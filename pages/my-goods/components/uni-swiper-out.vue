<template>
  <div>
    <WSwiperOut
      height="100"
      v-for="(item, index) in goodsInfo"
      :key="index"
      :swiperOutBtns="getBtn"
      @delete="delete2"
      @deal="deal(item)"
      @reEdit="reEdit(item)"
      buttonWidth="60">
      <view
        class="example-content"
        style="">
        <div class="wrap">
          <div class="left">
            <image
              class="img-good"
              :src="item.pics[0].url"
              mode="aspectFill" />
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
                  <image
                    class="icon-transport"
                    src="../../../static/label/transport.svg"
                    mode="" />
                  <span class="text-transport">{{ item.delivery }}</span>
                </div>
                <div
                  class="address"
                  v-if="item.delivery === '自提'">
                  <image
                    class="icon-address"
                    src="../../../static/label/address.svg"
                    mode="" />
                  <span class="text-address">{{ item.place }}</span>
                </div>
                <div class="quality">
                  <image
                    class="icon-quality"
                    src="../../../static/label/quality.svg"
                    mode="" />
                  <span class="text-quality">{{ item.condition }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <van-icon name="arrow-left" />
          </div>
        </div>
      </view>
    </WSwiperOut>
  </div>
</template>

<script>
import VanIcon from "../../../wxcomponents/vant/icon";
import WSwiperOut from "../../../wxcomponents/wuss-weapp/w-swiper-out/index";
const db = wx.cloud.database();
const _ = db.command;
export default {
  components: {
    VanIcon,
    WSwiperOut,
  },
  props: ["goodsInfo", "btnIndex"],
  data() {
    return {
      // 侧滑菜单按钮
      btnList: {
        // 未审核-按钮
        btns1: [
          {
            text: "重新编辑", // TODO 重新编辑页面的逻辑
            color: "#ffffff",
            background: "#e6831b",
            disabled: false,
            size: "14px",
            type: "reEdit",
          },
          {
            text: "删除",
            color: "#ffffff",
            background: "#e42112",
            disabled: false,
            size: "14px",
            type: "delete",
          },
        ],
        // 未成交-按钮
        btns2: [
          {
            text: "成交",
            color: "#ffffff",
            background: "#28a745",
            disabled: false,
            size: "14px",
            type: "deal",
          },
          {
            text: "删除",
            color: "#ffffff",
            background: "#e42112",
            disabled: false,
            size: "14px",
            type: "delete",
          },
        ],
        // 已成交-按钮
        btns3: [
          {
            text: "删除",
            color: "#ffffff",
            background: "#e42112",
            disabled: false,
            size: "14px",
            type: "delete",
          },
        ],
        // 不通过-按钮
        btns4: [
          {
            text: "重新编辑",
            color: "#ffffff",
            background: "#e6831b",
            disabled: false,
            size: "14px",
            type: "reEdit",
          },
          {
            text: "删除",
            color: "#ffffff",
            background: "#e42112",
            disabled: false,
            size: "14px",
            type: "delete",
          },
        ],
      },
      // 登录用户信息
      userInfo: {},
    };
  },

  mounted() {
    console.log(this.btnIndex);
    this.userInfo = uni.getStorageSync("userInfo");
  },

  methods: {
    // 处理重新编辑按钮事件
    reEdit(item) {
      console.log("点击了重新编辑按钮111", item);
      uni.setStorageSync("reEditItem", item);
      uni.switchTab({ url: "/pages/release/release" });
    },
    // 处理成交按钮事件
    deal(item, noDeal) {
      let _this = this;
      wx.showModal({
        title: "提示",
        content: "确定成交该商品？",
        async success(res) {
          if (res.confirm) {
            console.log("用户确定该商品已成交");
            // 更新已成交商品数量记录
            // await _this.updateGoodDealNum(noDeal);
            // TODO 是否记录成交对象？
            // 增加deal属性
            await _this.addPropertyDeal(item);
            // 重新获取我的商品数据
            // 通过事件总线触发父组件的getMyGoods函数类重新获取商品数据
            await uni.$emit("getMyGoods");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    // 处理删除按钮事件
    async delete2(item) {
      uni.showModal({
        title: "提示",
        content: "是否确定下架该商品？",
        success: async (res) => {
          // 使用箭头函数
          if (res.confirm) {
            // 显示加载中
            uni.showLoading({
              title: "删除中...",
              mask: true,
            });

            try {
              // 删除该用户上传的图片
              await this.deleteGoodPicture(item);
              // 删除数据库对应的记录
              await this.deleteData(item);

              // 通过事件总线触发父组件的getMyGoods函数来重新获取商品数据
              await uni.$emit("getMyGoods");
              // 显示成功提示
              uni.showToast({
                title: "删除成功",
                icon: "success",
                duration: 1500,
                mask: true,
              });
            } catch (error) {
              uni.showToast({
                title: "删除失败，请重试",
                icon: "error",
                mask: true,
              });
            }
          } else if (res.cancel) {
            console.log("用户点击取消--取消下架该商品");
          }
        },
      });
    },
    // 去商品详情页
    toGoodDetailPage(goodId) {
      let goodsInfo = this.goodsInfo;
      uni.setStorageSync("goodsInfoFlag", goodsInfo);
      uni.navigateTo({
        url: "/pages/goods-detail/goods-detail?goodId=" + goodId + "&flag=" + 1,
      });
    },

    // 删除改商品在存储中的照片
    async deleteGoodPicture(item) {
      // 获取商品图片的FileID列表
      let fileList = [];
      item.pics.forEach((item) => {
        fileList.push(item.url);
      });
      // 删除云端图片
      await wx.cloud
        .deleteFile({
          fileList: fileList,
        })
        .then((res) => {
          console.log("删除该商品在存储中的照片成功", res.fileList);
        })
        .catch((error) => {
          console.log("删除该商品在存储中的照片失败", error);
        });
    },
    async deleteData(item) {
      try {
        // 删除数据库中的对应商品记录
        await db.collection("goods").doc(item._id).remove();
        uni.hideLoading();

        console.log("删除数据库中的对应商品记录成功");
      } catch (error) {
        console.error("删除数据库中的对应商品记录失败", error);
      }
    },
    // 增加‘成交’属性
    async addPropertyDeal(item) {
      let _this = this;
      await db
        .collection("goods")
        .doc(item._id)
        .update({
          data: {
            deal: true,
          },
        })
        .then((res) => {
          console.log("增加--deal--属性", res);
        });
    },

    // 更新商品成交数量
    async updateGoodDealNum(noDeal) {
      if (noDeal === true) {
        await db
          .collection("user")
          .doc(this.userInfo._id)
          .update({
            data: {
              dealNum: _.inc(1),
              goodsNum: _.inc(-1),
            },
            success: function (res) {
              console.log("更新--成交数--成功", res);
            },
          });
      }
    },
  },
  computed: {
    // 根据传过来的按钮类型获取相应的按钮配置
    getBtn() {
      return Object.values(this.btnList)[this.btnIndex];
    },
  },
};
</script>

<style lang="scss" scoped>
.example-content {
  display: flex;
  align-items: center;
}

.wrap {
  display: flex;
  width: 94.5%;
  height: 100px;
  background-color: #fff;
  box-shadow: 1px 1.5px 5px 1px rgb(201, 199, 199);
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
    flex: 1;

    .top {
      margin-top: 10px;

      .desc {
        display: -webkit-box;
        overflow: hidden;
        min-height: 33px;
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
    justify-content: center;
    align-items: center;
    width: 25px;
    background-color: #eee;
    border-radius: 0 10px 10px 0;
  }
}
</style>
