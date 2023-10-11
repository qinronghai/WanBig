<template>
  <view class="container">
    <!-- 背景图 -->
    <image class="img-bg" src="../../static/my/bg-img.jpg" mode="widthFix" />
    <!-- 资料卡片 -->
    <uni-top-card></uni-top-card>
    <!-- 菜单导航栏 -->
    <div class="wrap-nav">
      <div class="nav-items">
        <div class="nav-item" v-for="(item, index) in navIconList" :key="index" @click="toggleNav(index)">
          <image :src="item.url" class="icon"></image>
          <div class="title">{{ item.title }}</div>
          <div :class="{ active: item.active === true }"></div>
        </div>
      </div>
      <button class="share-btn" open-type="share"></button>
    </div>
    <!-- 我的商品 不采用组件的方式的原因是有bug无法避免 -->
    <div class="wrap-out-side">
      <div class="my-goods" :key="numberkey" v-if="index === 0">
        <!-- 我的商品--未审核 -->
        <div class="bar">
          <div class="bar-text">
            未审核
          </div>
        </div>
        <w-swiper-out height="100" v-for="(item, index) in noAudit" :key="index" :swiperOutBtns="btns2" @delete="delete2(item)" buttonWidth="50">
          <view class="example-content" style="">
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
                </div>
              </div>
              <div class="right">
                <van-icon name="arrow-left" />
              </div>
            </div>
          </view>
        </w-swiper-out>
        <!-- 我的商品--未成交 -->
        <div class="bar">
          <div class="bar-text">
            未成交
          </div>
        </div>
        <!-- 商品列表 -->
        <w-swiper-out height="100" v-for="(item, index) in noDealGoodsInfo" :key="index" :swiperOutBtns="btns1" @delete="delete2(item, true)" @added="deal(item, true)"
                                                                                                                                                                                            buttonWidth="50">
          <view class="example-content" style="">
            <div class="wrap" @click="toGoodDetailPage(item._id)">
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
                </div>
              </div>
              <div class="right">
                <van-icon name="arrow-left" />
              </div>
            </div>
          </view>
        </w-swiper-out>
        <!-- 我的商品--已成交 -->
        <div class="bar">
          <div class="bar-text">
            已成交
          </div>
        </div>
        <!-- 商品列表 -->
        <w-swiper-out height="100" v-for="(item, index) in dealedGoodsInfo" :key="index" :swiperOutBtns="btns2" @delete="delete2(item)" @added="deal(item)" buttonWidth="50">
          <view class="example-content" style="">
            <div class="wrap" @click="toGoodDetailPage(item._id)">
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
                </div>
              </div>
              <div class="right">
                <van-icon name="arrow-left" />
              </div>
            </div>
          </view>
        </w-swiper-out>
      </div>
      <div class="tip" v-if="index === 1">
        <uni-exhibit-tip></uni-exhibit-tip>
      </div>
      <div class="contact-author" v-if="index === 2">
        <uni-exhibit-contact-author></uni-exhibit-contact-author>
      </div>
    </div>
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
  components: { VanIcon, uniTopCard, UniExhibitContactAuthor, UniExhibitTip },
  data() {
    return {
      openid: '',
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
          url: "../../static/my/my-goods.svg",
          title: "我的商品",
          active: false,
        },
        {
          url: "../../static/my/tip.svg",
          title: "使用提示",
          active: true
        },
        {
          url: "../../static/my/contact-author.svg",
          title: "联系作者",
          active: false
        },
        {
          url: "../../static/my/share.svg",
          title: "分享软件",
          active: false
        },
      ],
      // 处理侧滑菜单按钮事件
      btns1: [
        {
          text: '成交',
          color: '#ffffff',
          background: '#28a745',
          disabled: false,
          size: '14px',
          type: 'added',
        },
        {
          text: '删除',
          color: '#ffffff',
          background: '#e42112',
          disabled: false,
          size: '14px',
          type: 'delete',
        },
      ],
      // 只显示删除按钮
      btns2: [
        {
          text: '删除',
          color: '#ffffff',
          background: '#e42112',
          disabled: false,
          size: '14px',
          type: 'delete',
        },
      ],
    };
  },
  onLoad: async function (option) {
    // 处理登录请求
    console.log('打印出上个页面传递的参数。', option.showLogin); //打印出上个页面传递的参数。
    // 从缓存中获取openid
    this.openid = await uni.getStorageSync('openid');
    console.log("我的--获取openid--成功", this.openid);

    // 请求用户信息
    this.userInfo = uni.getStorageSync('userInfo');
    // 获取我的商品信息
    await this.getMyGoods(this.openid);
  },
  onShareAppMessage() { },
  methods: {
    // 下拉刷新页面
    async onPullDownRefresh() {
      // 请求用户信息
      this.userInfo = uni.getStorageSync('userInfo');
      // 获取我的商品信息
      await this.getMyGoods(this.openid);
      uni.stopPullDownRefresh();
    },
    // 删除改商品在存储中的照片
    async deleteGoodPicture(item) {
      let _this = this;
      // 获取商品图片的FileID列表
      let fileList = [];
      item.pics.forEach(item => {
        fileList.push(item.url);
      });
      // 删除云端图片
      await wx.cloud.deleteFile({
        fileList: fileList
      }).then(res => {
        console.log('删除该商品在存储中的照片成功', res.fileList);
      }).catch(error => {
        console.log('删除该商品在存储中的照片失败', error);
      })

    },
    // 删除数据库中的对应的商品记录
    async deleteData(item) {
      let _this = this;
      await db.collection('goods').doc(item._id).remove({
        success: function (res) {
          console.log('删除数据库中的对应商品记录成功', res)
          // 重新请求我的商品数据
          _this.getMyGoods(_this.openid);
        }
      })
    },
    // 增加‘成交’属性
    async addPropertyDeal(item) {
      let _this = this;
      await db.collection('goods').doc(item._id).update({
        data: {
          deal: true
        }
      }).then(res => {
        console.log('增加--deal--属性', res);
      })
    },
    // 获取我的商品数据
    async getMyGoods(openid) {
      let _this = this;

      wx.showLoading({
        title: '数据加载中',
        mark: true
      })
      await db.collection('goods').where({
        _openid: openid,
      }).get().then((res) => {
        if (res.data.length >= 0) {
          console.log('获取--我的商品信息--成功', res);

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
          console.log('获取--我的商品信息--失败');
        }
      }).catch((err) => {
        console.log('获取-我的商品信息--出错', err);
      });
      wx.hideLoading();
    },
    // 根据deal属性进行分类商品数据
    async sortDataForDeal(goodsInfo) {

      let dealedGoodsInfo = [];
      let noDealGoodsInfo = [];
      // 提炼出所有未审核的
      let noAudit = [];

      goodsInfo.forEach(item => {
        if (item.deal === true) {
          dealedGoodsInfo.push(item);
        } else if (item.audited === true) {
          noDealGoodsInfo.push(item);
        } else if (item.audited === false) {
          noAudit.push(item);
        }
      })

      this.dealedGoodsInfo = dealedGoodsInfo;
      this.noDealGoodsInfo = noDealGoodsInfo;
      this.noAudit = noAudit;

    },
    // 更新商品成交数量
    async updateGoodDealNum(noDeal) {
      if (noDeal === true) {
        await db.collection("user").doc(this.userInfo._id).update({
          data: {
            dealNum: _.inc(1),
            goodsNum: _.inc(-1)
          },
          success: function (res) {
            console.log('更新--成交数--成功', res)
          }
        })
      }
    },
    // 重新渲染
    chenRender() {
      this.numberkey += 1;
    },
    // 处理切换导航
    toggleNav(index) {
      console.log("点击了--" + this.navIconList[index].title);
      // 点击切换
      // 切换之前 激活状态全部为false
      this.navIconList.forEach(item => {
        item.active = false;
      });
      // 被点击的选项设为true
      this.navIconList[index].active = true;

      this.index = index;

    },
    // 去商品详情页
    toGoodDetailPage(goodId) {
      let goodsInfo = this.goodsInfo
      uni.setStorageSync('goodsInfoFlag', goodsInfo);
      uni.navigateTo({
        url: '/pages/goods-detail/goods-detail?goodId=' + goodId + '&flag=' + 1
      });
    },
    // 处理删除按钮事件
    delete2(item, noDeal) {
      let _this = this;
      wx.showModal({
        title: '提示',
        content: '是否确定下架该商品？',
        async success(res) {
          if (res.confirm) {
            console.log('用户点击确定--确定下架该商品');
            // 删除该用户上传的图片
            await _this.deleteGoodPicture(item);
            // 删除数据库对应的记录
            await _this.deleteData(item);
            // 更新用户的在售商品数量
            if (noDeal === true) {
              await db.collection('user').doc(_this.userInfo._id).update({
                data: {
                  goodsNum: _.inc(-1)
                },
                success: function (res) {
                  console.log('更新--商品数量--成功', res);
                  setTimeout(() => {
                    wx.showToast({
                      title: '成功下架该商品',
                      icon: "success",
                      duration: 2000,
                      mask: true
                    })
                  }, 1500);

                }
              })
            }
          } else if (res.cancel) {
            console.log('用户点击取消--取消下架该商品');
          }
        }
      })
    },
    // 处理成交按钮事件
    deal(item, noDeal) {
      let _this = this;
      wx.showModal({
        title: '提示',
        content: '该商品是否已成交？',
        async success(res) {
          if (res.confirm) {
            console.log('用户确定该商品已成交');
            // 更新已成交商品数量记录
            await _this.updateGoodDealNum(noDeal);
            // 增加deal属性
            await _this.addPropertyDeal(item);
            // 重新获取我的数据
            await _this.getMyGoods(_this.openid);

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

  },
};
</script>

<style lang="scss" scoped>
.example-content {
  background-color: #e9e9e9;
}

.container {
  min-height: 100vh;
  padding: 0 29.79rpx 20px;
  background-color: $uni-bg-color-grey;

  .img-bg {
    width: 100%;
    border-radius: 10px;
  }

  .wrap-nav {
    position: relative;
    height: 70px;
    padding: 0 25px;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 10px;

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

  .wrap-out-side {
    margin-top: 10px;
    background-color: #e9e9e9;

    .my-goods {
      background-color: #e9e9e9;

      .bar {
        display: flex;
        align-items: center;
        width: 100%;
        height: 20px;
        margin-bottom: 5px;
        background-color: #ffc300;
        box-shadow: 1px 1.5px 5px 1px rgb(180, 179, 179);
        border-radius: 3px;


        .bar-text {
          padding-left: 10px;
          font-size: 10px;
          font-weight: bold;
        }
      }

      .wrap {
        display: flex;
        width: 92.5%;
        height: 100px;
        background-color: #fff;
        box-shadow: 1px 1.5px 5px 1px rgb(180, 179, 179);
        border-radius: 10px;

        .left {
          padding: 10px;

          .img-good {
            width: 80px;
            height: 80px;
            border-radius: 5px;
          }
        }

        ;

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
    }

    .contact-author {}
  }
}
</style>