<template>
  <view class="container">
    <!-- 背景图 -->
    <image
      class="img-bg"
      src="../../static/my/bg-img.jpg"
      mode="widthFix" />
    <view class="top-card">
      <!-- 资料卡片 -->
      <uni-top-card ref="topCardRef"></uni-top-card>
      <!-- 菜单导航栏 -->
      <div class="wrap-nav">
        <div class="nav-items">
          <div
            class="nav-item"
            v-for="(item, index) in navIconList"
            :key="index"
            @click="toggleNav(index)">
            <image
              :src="item.url"
              class="icon"></image>
            <div class="title">{{ item.title }}</div>
            <div :class="{ active: item.active === true }"></div>
          </div>
        </div>
        <button
          class="share-btn"
          open-type="share"></button>
      </div>
    </view>

    <view class="bottom_box">
      <view
        class="bottom_card"
        @tap="go"
        data-go="/pages/auditor/auditor"
        data-status="1">
        <view class="bottom_1">
          <image src="../../static/my/tabs/audit.svg"></image>
          <view>审核管理</view>
        </view>
        <image src="/static/images/go.png"></image>
      </view>
      <view
        class="bottom_card"
        @tap="go"
        data-go="/pages/kefu/kefu"
        data-status="2">
        <view class="bottom_1">
          <image src="../../static/my/tabs/kefu.svg"></image>
          <view>联系客服</view>
        </view>
        <image src="/static/images/go.png"></image>
      </view>
      <view class="bottom_card">
        <view class="bottom_1">
          <image src="../../static/my/tabs/edit.svg"></image>
          <view>问题反馈</view>
        </view>
        <image src="/static/images/go.png"></image>
        <button open-type="feedback"></button>
      </view>

      <view
        class="bottom_card"
        @tap="go"
        data-go="/pages/about/about">
        <view class="bottom_1">
          <image src="../../static/my/tabs/about.svg"></image>
          <view>关于程序</view>
        </view>
        <image src="/static/images/go.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
import uniTopCard from "./components/uni-top-card.vue";
// 我的商品的子组件
import UniExhibitContactAuthor from "./components/uni-exhibit-contact-author.vue";
import UniExhibitTip from "./components/uni-exhibit-tip.vue";

import VanIcon from "../../wxcomponents/vant/icon";

const db = wx.cloud.database();
const _ = db.command;

export default {
  components: {
    VanIcon,
    uniTopCard,
    UniExhibitContactAuthor,
    UniExhibitTip,
  },
  data() {
    return {
      openid: "",
      // 全部的商品信息
      goodsInfo: [],
      // 已成交的商品信息
      dealedGoodsInfo: [],
      // 未成交的商品信息
      noDealGoodsInfo: [],
      // 未审核的商品信息
      noAudit: [],
      // 刷新页面自带参数
      numberkey: 0,
      // 分类导航默认参数
      index: 1,
      // 导航图标
      navIconList: [
        {
          url: "../../static/my/my_commodity.svg",
          title: "我的商品",
          active: false,
        },
        {
          url: "../../static/my/order.svg",
          title: "我的订单",
          active: false,
        },
        {
          url: "../../static/my/my_edit.svg",
          title: "编辑资料",
          active: false,
        },
        {
          url: "../../static/my/share2.svg",
          title: "分享软件",
          active: false,
        },
      ],
      // 处理侧滑菜单按钮事件
      btns1: [
        {
          text: "成交",
          color: "#ffffff",
          background: "#28a745",
          disabled: false,
          size: "14px",
          type: "added",
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
      // 只显示删除按钮
      btns2: [
        {
          text: "删除",
          color: "#ffffff",
          background: "#e42112",
          disabled: false,
          size: "14px",
          type: "delete",
        },
      ],
    };
  },
  onLoad: async function (option) {
    // 处理登录请求
    console.log("打印出上个页面传递的参数。", option.showLogin); //打印出上个页面传递的参数。

    // 请求用户信息
    //this.userInfo = uni.getStorageSync('userInfo');
  },
  onShow: async function (options) {
    // 从缓存中获取openid
    this.openid = await uni.getStorageSync("openid");
    this.userInfo = uni.getStorageSync("userInfo");
    await this.$refs.topCardRef.renderPage(this.userInfo.info.nickName, this.userInfo.info.avatarUrl);
    // 获取我的商品信息
    // await this.getMyGoods(this.openid);
  },
  onShareAppMessage() {},
  methods: {
    // 下拉刷新页面
    async onPullDownRefresh() {
      // 请求用户信息
      this.userInfo = uni.getStorageSync("userInfo");
      // 获取我的商品信息
      await this.getMyGoods(this.openid);
      uni.stopPullDownRefresh();
    },
    // 删除改商品在存储中的照片
    async deleteGoodPicture(item) {
      let _this = this;
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
    // 删除数据库中的对应的商品记录
    async deleteData(item) {
      let _this = this;
      await db
        .collection("goods")
        .doc(item._id)
        .remove({
          success: function (res) {
            console.log("删除数据库中的对应商品记录成功", res);
            // 重新请求我的商品数据
            _this.getMyGoods(_this.openid);
          },
        });
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
    // 获取我的商品数据
    async getMyGoods(openid) {
      let _this = this;

      wx.showLoading({
        title: "数据加载中",
        mark: true,
      });
      await db
        .collection("goods")
        .where({
          _openid: openid,
        })
        .get()
        .then((res) => {
          if (res.data.length >= 0) {
            console.log("获取--我的商品信息--成功", res);

            _this.goodsInfo = res.data;
            if (res.data.length > 0) {
              // 根据 deal属性进行分类
              _this.sortDataForDeal(res.data);
            } else if (res.data.length === 0) {
              this.dealedGoodsInfo = [];
              this.noDealGoodsInfo = [];
              this.noAudit = [];
            }
          } else {
            console.log("获取--我的商品信息--失败");
          }
        })
        .catch((err) => {
          console.log("获取-我的商品信息--出错", err);
        });
      wx.hideLoading();
    },
    // 根据deal属性进行分类商品数据
    async sortDataForDeal(goodsInfo) {
      let dealedGoodsInfo = [];
      let noDealGoodsInfo = [];
      // 提炼出所有未审核的
      let noAudit = [];

      goodsInfo.forEach((item) => {
        if (item.deal === true) {
          dealedGoodsInfo.push(item);
        } else if (item.audited === true) {
          noDealGoodsInfo.push(item);
        } else if (item.audited === false) {
          noAudit.push(item);
        }
      });

      this.dealedGoodsInfo = dealedGoodsInfo;
      this.noDealGoodsInfo = noDealGoodsInfo;
      this.noAudit = noAudit;
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
    // 重新渲染
    chenRender() {
      this.numberkey += 1;
    },
    // 判断当前用户是否是审核员
    async isAuditor() {
      try {
        const userInfo = uni.getStorageSync("userInfo");
        if (userInfo.isAuditor) {
          uni.navigateTo({
            url: "/pages/auditor/auditor",
          });
        } else {
          wx.showModal({
            title: "提示",
            content: "您还不是审核员，请联系作者申请",
            success(res) {
              if (res.confirm) {
                console.log("用户点击确定");
                //  TODO跳转到联系作者页面
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            },
          });
        }
      } catch (error) {
        console.log("检查审核员状态失败", error);
      }
    },
    go(e) {
      const status = e.currentTarget.dataset.status;
      if (status == "1" || status == "2") {
        if (!uni.getStorageSync("isRegister") && !uni.getStorageSync("openid")) {
          uni.showModal({
            title: "温馨提示",
            content: "该功能需要注册方可使用，是否马上去注册",
            success(res) {
              if (res.confirm) {
                uni.navigateTo({
                  url: "/pages/register/register",
                });
              }
            },
          });
          return false;
        }
      }

      if (status == "1") {
        this.isAuditor();
      } else {
        uni.navigateTo({
          url: e.currentTarget.dataset.go,
        });
        console.log("点击了", e.currentTarget.dataset.go);
      }
    },
    // 处理切换导航
    toggleNav(index) {
      // 跳转至我的商品
      const { title } = this.navIconList[index];
      console.log("点击了--" + title, index);
      if (index === 0) {
        uni.navigateTo({
          url: "/pages/my-goods/my-goods",
        });
      }
      if (index === 1) {
        uni.navigateTo({
          url: "/pages/my-orders/my-orders",
        });
      }
      if (index === 2) {
        uni.navigateTo({
          url: "/pages/my-edit/my-edit",
        });
      }

      /* // 点击切换
			// 切换之前 激活状态全部为false
			this.navIconList.forEach(item => {
				item.active = false;
			});
			// 被点击的选项设为true
			this.navIconList[index].active = true;

			this.index = index; */
    },
    // 去商品详情页
    toGoodDetailPage(goodId) {
      let goodsInfo = this.goodsInfo;
      uni.setStorageSync("goodsInfoFlag", goodsInfo);
      uni.navigateTo({
        url: "/pages/goods-detail/goods-detail?goodId=" + goodId + "&flag=" + 1,
      });
    },
    // 处理删除按钮事件
    delete2(item, noDeal) {
      let _this = this;
      wx.showModal({
        title: "提示",
        content: "是否确定下架该商品？",
        async success(res) {
          if (res.confirm) {
            console.log("用户点击确定--确定下架该商品");
            // 删除该用户上传的图片
            await _this.deleteGoodPicture(item);
            // 删除数据库对应的记录
            await _this.deleteData(item);
            // 更新用户的在售商品数量
            if (noDeal === true) {
              await db
                .collection("user")
                .doc(_this.userInfo._id)
                .update({
                  data: {
                    goodsNum: _.inc(-1),
                  },
                  success: function (res) {
                    console.log("更新--商品数量--成功", res);
                    setTimeout(() => {
                      wx.showToast({
                        title: "成功下架该商品",
                        icon: "success",
                        duration: 2000,
                        mask: true,
                      });
                    }, 1500);
                  },
                });
            }
          } else if (res.cancel) {
            console.log("用户点击取消--取消下架该商品");
          }
        },
      });
    },
    // 处理成交按钮事件
    deal(item, noDeal) {
      let _this = this;
      wx.showModal({
        title: "提示",
        content: "该商品是否已成交？",
        async success(res) {
          if (res.confirm) {
            console.log("用户确定该商品已成交");
            // 更新已成交商品数量记录
            await _this.updateGoodDealNum(noDeal);
            // 增加deal属性
            await _this.addPropertyDeal(item);
            // 重新获取我的数据
            await _this.getMyGoods(_this.openid);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.example-content {
  background-color: #e9e9e9;
}

.container {
  position: relative;
  min-height: 100vh;

  // padding: 0 29.79rpx 20px;
  background-color: $uni-bg-color-grey;

  .img-bg {
    width: 100vw;
    // border-radius: 10px;
  }

  .top-card {
    position: absolute;
    top: 125px;
    left: 0;
    width: 100vw;
  }

  .wrap-nav {
    position: relative;

    // width: 100vw;
    height: 70px;
    padding: 5px 21px 10px 21px;
    background-color: #fff;
    border-bottom: 1px solid #e9e9e9;

    // border-radius: 10px;

    .nav-items {
      display: flex;

      // 是flex-direction 和 flex-wrap的简写形式
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      .nav-item {
        position: relative;
        display: flex;
        flex-flow: 1;
        flex-direction: column;
        align-items: center;

        .icon {
          width: 30px;
          height: 30px;
        }

        .title {
          margin-top: 5px;
          font-size: 12px;
          font-weight: bold;
        }

        .active {
          position: absolute;
          bottom: -8px;
          width: 30px;
          height: 4px;
          background-color: #ffc300;
          border-radius: 10px;
        }
      }
    }

    .share-btn {
      position: absolute;
      top: 5px;
      right: 20px;
      width: 60px;
      height: 60px;
      background-color: rgba(169, 102, 102, 0);
    }

    button::after {
      border: none;
    }
  }

  .bottom_box {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    padding: 0 40rpx;

    // position: relative;
    margin-top: 150px;
    background-color: #fff;
  }

  .bottom_card {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 124rpx;
    background: #fff;
    border-bottom: 1rpx solid #eee;
  }

  .bottom_card button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.01;
  }

  .bottom_card image {
    width: 14rpx;
    height: 25rpx;
  }

  .bottom_1 {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .bottom_1 image {
    width: 40rpx;
    height: 40rpx;
  }

  .bottom_1 view {
    padding-left: 30rpx;
    font-size: 30rpx;
    letter-spacing: 3rpx;
  }
}
</style>
