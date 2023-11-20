<template>
  <view id="page">
    <VanTabs
      :activePage="activePage"
      animated
      @click="onClickVanTabs"
      class="van-tabs"
      color="#ffc300"
      background="#e9e9e9">
      <VanTab
        title="商品管理"
        class="good-container"
        color="#ffc300">
        <!-- 导航栏菜单 -->
        <view class="navbar">
          <view
            v-for="(item, index) in goodMenuItems"
            :key="index"
            class="navbar-item"
            :class="{ active: activeIndex === index }"
            @click="changeActive(index)">
            {{ item.name }}

            <view
              class="item-line"
              :class="{ active: activeIndex === index }"></view>
          </view>
        </view>

        <!-- 提示文本 -->
        <div class="tip">对着商品卡片 <span class="tip-key">左划</span> 可进行成交、下架和重新编辑操作哦~</div>

        <!-- 内容区域 :  根据当前选中的菜单项显示不同的内容-->
        <view class="content">
          <uni-swipe-action>
            <view
              class="swipe-aciton-wrap"
              style=""
              v-for="(item, index) in list"
              :key="index">
              <uni-swipe-action-item
                :right-options="rightOptions"
                data-item="item"
                @click="onClickSwipeItem($event, item)">
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
                            src="../../static/label/transport.svg"
                            mode="" />
                          <span class="text-transport">{{ item.delivery }}</span>
                        </div>
                        <div
                          class="address"
                          v-if="item.delivery === '自提'">
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
                          <span class="text-quality">{{ item.condition }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="right">
                    <van-icon name="arrow-left" />
                  </div>
                </div>
              </uni-swipe-action-item>
              <view class="border"></view>
            </view>
          </uni-swipe-action>
          <!-- <uniSwiperOut
            :goodsInfo="list"
            :btnIndex="activeIndex"></uniSwiperOut> -->
        </view>
      </VanTab>
      <VanTab
        title="书籍管理"
        class="good-container"
        color="#ffc300">
        <!-- 导航栏菜单 -->
        <view class="navbar">
          <view
            v-for="(item, index) in bookMenuItems"
            :key="index"
            class="navbar-item"
            :class="{ active: activeIndex2 === index }"
            @click="changeActive2(index)">
            {{ item.name }}

            <view
              class="item-line"
              :class="{ active: activeIndex2 === index }"></view>
          </view>
        </view>
        <!-- 提示文本 -->
        <div class="tip">对着商品卡片 <span class="tip-key">左划</span> 可进行成交、下架和重新编辑操作哦~</div>

        <!-- 内容区域 :  根据当前选中的菜单项显示不同的内容-->
        <view class="content">
          <uni-swipe-action>
            <view
              class="swipe-aciton-wrap"
              style=""
              v-for="(item, index) in list"
              :key="index">
              <uni-swipe-action-item
                :right-options="rightOptions"
                data-item="item"
                @click="onClickSwipeItem($event, item)">
                <div class="wrap">
                  <div class="left">
                    <image
                      class="img-good"
                      :src="item.bookinfo.pic"
                      mode="aspectFill" />
                  </div>
                  <div class="center">
                    <div class="top">
                      <div class="desc">
                        {{ item.bookinfo.title }}
                      </div>
                      <div class="price">{{ item.bookinfo.price }}</div>
                    </div>
                    <div class="bottom">
                      <div class="label">
                        <div class="transport">
                          <image
                            class="icon-transport"
                            src="../../static/label/transport.svg"
                            mode="" />
                          <span class="text-transport">{{ item.deliveryid == 0 ? "自提" : "帮送" }}</span>
                        </div>
                        <div
                          class="address"
                          v-if="item.deliveryid === 0">
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
                            item.conditionid == 0 ? "全新" : item.conditionid == 1 ? "几乎全新" : item.conditionid == 2 ? "轻微痕迹" : "明显痕迹"
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="right">
                    <van-icon name="arrow-left" />
                  </div>
                </div>
              </uni-swipe-action-item>
              <view class="border"></view>
            </view>
          </uni-swipe-action>
          <!-- <uniSwiperOut
            :goodsInfo="list"
            :btnIndex="activeIndex"></uniSwiperOut> -->
        </view>
        <button
          hover-class="button-hover"
          @click="more">
          加载更多
        </button>
      </VanTab>
    </VanTabs>
  </view>
</template>

<script>
import VanIcon from "../../wxcomponents/vant/icon";
import uniSwiperOut from "./components/uni-swiper-out.vue";
import VanTab from "../../wxcomponents/vant/tab/index.js";
import VanTabs from "../../wxcomponents/vant/tabs/index.js";

const db = wx.cloud.database();
const _ = db.command;
export default {
  components: {
    VanIcon,
    uniSwiperOut,
    VanTab,
    VanTabs,
  },
  data() {
    return {
      activePage: 0, // 切换发布
      rightOptions: [
        {
          text: "删除",
          style: {
            backgroundColor: "#dd524d",
          },
        },
      ],
      // 操作选项
      options: [
        {
          id: 0,
          names: ["已成交", "已取消"],
          obj: [
            {
              text: "删除",
              style: {
                backgroundColor: "#dd524d",
              },
            },
          ],
        },
        {
          id: 1,
          names: ["审核中", "不通过"],
          obj: [
            {
              text: "重新编辑",
              style: {
                backgroundColor: "#ffc23f",
              },
            },
            {
              text: "删除",
              style: {
                backgroundColor: "#dd524d",
              },
            },
          ],
        },
        {
          id: 2,
          names: ["在售"],
          obj: [
            {
              text: "下架",
              style: {
                backgroundColor: "#dd524d",
              },
            },
          ],
        },
        {
          id: 3,
          names: ["交易中"],
          obj: [
            {
              text: "更多操作",
              style: {
                backgroundColor: "#ffc23f",
              },
            },
          ],
        },
        {
          id: 4,
          names: ["已下架"],
          obj: [
            {
              text: "擦亮",
              style: {
                backgroundColor: "#ffc23f",
              },
            },
          ],
        },
      ],

      // 导航栏菜单项
      goodMenuItems: [
        {
          id: 0,
          name: "审核中",
          whereObj: {
            audited: false,
          },
        },
        {
          id: 1,
          name: "不通过",
          whereObj: {
            audited: true,
            pass: false,
          },
        },
        {
          id: 2,
          name: "在售",
          whereObj: {
            audited: true,
            pass: true,
            status: 0,
          },
        },
        {
          id: 3,
          name: "交易中",
          whereObj: {
            audited: true,
            pass: true,
            status: 2,
          },
        },
        {
          id: 4,
          name: "已成交",
          whereObj: {
            status: 3,
          },
        },
        {
          id: 5,
          name: "已取消",
          whereObj: {
            status: 4,
          },
        },
        {
          id: 6,
          name: "已下架",
          whereObj: {
            status: _.eq(42).or(_.eq(43)).or(_.eq(5)), // - 42：卖家取消的交易 - 43：卖家拒绝预定 - 5：超时下架
          },
        },
      ],
      bookMenuItems: [
        {
          id: 0,
          name: "在售",
          whereObj: {
            status: 0,
          },
        },
        {
          id: 1,
          name: "交易中",
          whereObj: {
            status: 2,
          },
        },
        {
          id: 2,
          name: "已成交",
          whereObj: {
            status: 3,
          },
        },
        {
          id: 3,
          name: "已取消",
          whereObj: {
            status: 4,
          },
        },
        {
          id: 4,
          name: "已下架",
          whereObj: {
            status: _.eq(42).or(_.eq(43)).or(_.eq(5)),
          },
        },
      ],

      activeIndex: 1, // 当前选中的菜单项索引
      activeIndex2: 1, // 当前选中的菜单项索引

      openid: "",
      page: 0,
      nomore: false,
      list: [],
      scrollTop: 0,

      // 全部的商品信息
      goodsInfo: [],

      // 审核中的商品信息
      noAudit: [],
      // 未成交的商品信息
      noDeal: [],
      // 已成交的商品信息
      dealed: [],
      // 不通过
      noPass: [],
    };
  },

  onLoad: async function (option) {
    // 处理登录请求
    console.log("打印出上个页面传递的参数。", option.showLogin); //打印出上个页面传递的参数。
    // 从缓存中获取openid
    this.openid = await uni.getStorageSync("openid");
    console.log("我的--获取openid--成功", this.openid);

    // 请求用户信息
    this.userInfo = uni.getStorageSync("userInfo");
    /*  // 获取我的商品信息
    await this.getMyGoods(this.openid);

    uni.$on("getMyGoods", async () => {
      await this.getMyGoods(this.openid);
      console.log("触发了父组件的getMyGoods事件");
    }); */
  },
  //监测页面到底
  onReachBottom() {
    console.log("到底拉 :>> ");
    this.more();
  },

  onShareAppMessage() {},

  methods: {
    setOption(newVal) {
      console.log("newVal :>> ", newVal);
      let infos = this.activePage === 0 ? this.goodMenuItems : this.bookMenuItems;
      let name = infos[newVal].name;
      // 遍历options找到names中含有name的项
      this.options.forEach((item) => {
        if (item.names.includes(name)) {
          this.rightOptions = item.obj;
        }
      });
      console.log("name :>> ", name);
    },
    async getListByWhere() {
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      // 根据大类进行分类

      let infos = this.activePage === 0 ? this.goodMenuItems : this.bookMenuItems;
      let index = this.activePage === 0 ? this.activeIndex : this.activeIndex2;
      let collection = this.activePage === 0 ? "goods" : "publish";
      // 根据当前的选项条件请求数据
      let whereObj = infos[index].whereObj;
      // 添加openid
      whereObj._openid = uni.getStorageSync("openid");
      // 打印
      console.log("whereObj", whereObj);
      console.log("infos", infos);
      console.log("collection", collection);
      // 请求数据
      const res = await db.collection(collection).where(whereObj).orderBy("creat", "desc").limit(10).get();
      console.log("res :>> ", res);
      // 渲染列表
      this.list = res.data;
      this.nomore = false;
      this.page = 0;
      uni.hideLoading();
    },
    // 大类的点击切换的操作
    onClickVanTabs(e) {
      console.log("点击了tab", e);
      this.activePage = e.index;
      // 根据当前的选项条件请求数据
      this.getListByWhere();
      // 配置右侧操作按钮
      this.setOption(this.activeIndex2);
    },
    // 切换选中的菜单项（商品管理）
    changeActive(index) {
      this.activeIndex = index;
      // 根据当前的选项条件请求数据
      this.getListByWhere();
      // 配置右侧操作按钮
      this.setOption(index);
    },
    // 切换选中的菜单项（书籍管理）
    changeActive2(index) {
      this.activeIndex2 = index;
      // 根据当前的选项条件请求数据
      this.getListByWhere();
      // 配置右侧操作按钮
      this.setOption(index);
    },
    // 下拉刷新页面
    async onPullDownRefresh() {
      // 请求用户信息
      this.userInfo = uni.getStorageSync("userInfo");
      // 获取我的商品信息
      // await this.getMyGoods(this.openid);
      uni.stopPullDownRefresh();
    },
    // 加载更多
    more() {
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      let that = this;
      if (that.nomore || that.list.length < 10) {
        uni.hideLoading();
        return;
      }
      let page = that.page + 1;
      // 根据大类进行分类

      let infos = this.activePage === 0 ? this.goodMenuItems : this.bookMenuItems;
      let index = this.activePage === 0 ? this.activeIndex : this.activeIndex2;
      let collection = this.activePage === 0 ? "goods" : "publish";
      // 根据当前的选项条件请求数据
      let whereObj = infos[index].whereObj;
      // 添加openid
      whereObj._openid = uni.getStorageSync("openid");
      db.collection(collection)
        .where(whereObj)
        .orderBy("creat", "desc")
        .skip(page * 10)
        .limit(10)
        .get({
          success: function (res) {
            console.log("res3333333 :>> ", res);
            uni.hideLoading();

            if (res.data.length == 0) {
              that.nomore = true;
              return;
            }
            if (res.data.length < 10) {
              that.nomore = true;
            }
            that.list = that.list.concat(res.data);
            that.page = page;
          },
          fail() {
            uni.hideLoading();
            uni.showToast({
              title: "数据加载失败",
              icon: "none",
              mask: true,
            });
          },
        });
    },

    // 获取我的商品数据
    /* async getMyGoods(openid) {
      let _this = this;
      uni.showLoading({
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
              this.dealed = [];
              this.noDeal = [];
              this.noAudit = [];
              this.noPass = [];
            }
          } else {
            console.log("获取--我的商品信息--失败");
          }
        })
        .catch((err) => {
          console.log("获取-我的商品信息--出错", err);
        });
      uni.hideLoading();
    }, */
    // TODO: 未成交和不通过的逻辑
    // 根据deal属性进行分类商品数据
    /*  async sortDataForDeal(goodsInfo) {
      let dealed = []; // 已经成交的
      let noDeal = []; // 审核了的，但是未成交的
      let noAudit = []; // 提炼出所有未审核的
      let noPass = []; // 审核了的，但是不通过的

      goodsInfo.forEach((item) => {
        if (item.status !== -1) {
          dealed.push(item);
        } else if (item.audited === true && item.pass) {
          noDeal.push(item);
        } else if (item.audited === false) {
          noAudit.push(item);
        } else if (item.audited && !item.pass) {
          noPass.push(item);
        }
      });

      this.dealed = dealed;
      this.noDeal = noDeal;
      this.noAudit = noAudit;
      this.noPass = noPass;
    }, */
    // 重新渲染
    /* chenRender() {
      this.numberkey += 1;
    }, */

    // 去商品详情页
    toGoodDetailPage(goodId) {
      let goodsInfo = this.goodsInfo;
      uni.setStorageSync("goodsInfoFlag", goodsInfo);
      uni.navigateTo({
        url: "/pages/goods-detail/goods-detail?goodId=" + goodId + "&flag=" + 1,
      });
    },
    // 点击滑动操作按钮
    onClickSwipeItem(e, item) {
      console.log("e :>> ", e);
      console.log("item :>> ", item);
      if (e.content.text === "下架") {
        this.delete2(item, "下架");
      } else if (e.content.text === "删除") {
        this.delete2(item, "删除");
      } else if (e.content.text === "擦亮") {
        this.renew(item);
      } else if (e.content.text === "更多操作") {
        this.moreOptions(item);
      } else if (e.content.text === "重新编辑") {
        this.reEdit(item);
      }
    },
    // 处理删除按钮事件
    delete2(item, title) {
      let _this = this;
      let collection = this.activePage === 0 ? "goods" : "publish";
      wx.showModal({
        title: "提示",
        content: `是否确定${title}该商品？`,
        async success(res) {
          if (res.confirm) {
            console.log(`用户点击确定--确定${title}该商品`);
            //判断item内有没有pics字段

            if (item.pics?.length > 0) {
              console.log("有图片 :>> ", item.pics);
              // 删除该用户上传的图片
              await _this.deleteGoodPicture(item);
            }
            // 删除数据库对应的记录
            await _this.deleteData(item, collection);
          } else if (res.cancel) {
            console.log(`用户点击取消--取消${title}该商品`);
          }
        },
      });
    },
    // 处理更多操作按钮事件
    moreOptions(item) {
      console.log("item :>> ", item);
      // 去到该商品item的订单详情页
      uni.navigateTo({
        url: "/pages/order/detail/detail?id=" + item._id + "&from=my-goods",
      });
    },
    // 处理擦亮按钮事件
    renew(item) {
      let _this = this;

      wx.showModal({
        title: "提示",
        content: "是否确定擦亮该商品？",
        async success(res) {
          if (res.confirm) {
            console.log("用户点击确定--确定擦亮该商品");
            uni.showLoading({
              title: "正在擦亮",
              mask: true,
            });

            // 更新数据库对应的记录
            db.collection("publish")
              .doc(item._id)
              .update({
                data: {
                  creat: new Date().getTime(),
                  dura: new Date().getTime() + 7 * (86400 * 1000), //每次擦亮管7天
                  status: 0,
                },
                success() {
                  uni.hideLoading();
                  uni.showToast({
                    title: "成功擦亮",
                  });
                  _this.getListByWhere();
                },
                fail() {
                  uni.hideLoading();
                  uni.showToast({
                    title: "操作失败",
                    icon: "none",
                  });
                },
              });
          } else if (res.cancel) {
            console.log("用户点击取消--取消擦亮该商品");
          }
        },
      });
    },

    /*  // 处理成交按钮事件
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
    }, */

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
    async deleteData(item, collection) {
      let _this = this;
      await db
        .collection(collection)
        .doc(item._id)
        .remove({
          success: function (res) {
            console.log("删除数据库中的对应商品记录成功", res);
            uni.showToast({
              title: "下架成功",
              icon: "success",
              mask: true,
            });
            // 重新获取数据
            _this.getListByWhere();
          },
        });
    },
    /*  // 增加‘成交’属性
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
    }, */

    // 更新商品成交数量
    /*  async updateGoodDealNum(noDeal) {
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
    }, */
  },
};
</script>

<style lang="scss" scoped>
#page {
  min-height: 100vh;
  background-color: $uni-bg-color-grey;
}

.navbar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
}

.navbar-item-icon {
  padding-left: 10px;
  color: #666;
  font-size: 28rpx;
  cursor: pointer;
}

.icon {
  position: relative;
  top: 5px;
  width: 25px;
  height: 25px;
}

.navbar-item {
  position: relative;
  padding: 20rpx 0;
  color: #333;
  font-size: 28rpx;
  cursor: pointer;
}

.navbar-item.active {
  color: #333;
  font-weight: bold;
}

.item-line.active {
  position: absolute;
  top: calc(50% + 16px);
  left: calc(50% - 10px);
  width: 20px;
  height: 2px;
  background-color: #ffc23f;
}

.tip {
  padding: 20rpx;
  color: #999;
  font-size: 14px;
}

.tip-key {
  font-weight: bold;
}

.content {
  // height: 100vh;
  margin: 0 10px;
  // background-color: #9c1414;
}

.example-content {
  display: flex;
  align-items: center;
  direction: column;
}

.wrap {
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #fff;
  border-radius: 10px;

  // box-shadow: 1px 1.5px 5px 1px rgb(201, 199, 199);

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

.border {
  display: block;
  width: 100%;
  height: 20rpx;
}
</style>
