<template>
  <div>

    <w-swiper-out height="100" v-for="(item, index) in goodsInfo" :key="index" :swiperOutBtns="btns1" @delete="delete2"
      @added="added" buttonWidth="50">
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
                  <image class="icon-transport" src="../../../static/label/transport.svg" mode="" />
                  <span class="text-transport">{{ item.transport }}</span>
                </div>
                <div class="address">
                  <image class="icon-address" src="../../../static/label/address.svg" mode="" />
                  <span class="text-address">{{ item.address }}</span>
                </div>
                <div class="quality">
                  <image class="icon-quality" src="../../../static/label/quality.svg" mode="" />
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
</template>

<script>
const db = wx.cloud.database();
import VanIcon from "../../../wxcomponents/vant/icon";
import { WSwiperOut } from "../../../wxcomponents/wuss-weapp/w-swiper-out/index";
export default {
  components: {
    VanIcon, WSwiperOut
  },
  data() {
    return {
      openid: '',
      goodsInfo: [],
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
    }
  },
  async mounted() {
    let openid = uni.getStorageSync('userInfo')._openid
    this.openid = openid;
    console.log('用户的openid为' + openid);
    await this.getMyGoods(openid);
  },
  methods: {
    async getMyGoods(openid) {
      let _this = this;
      wx.showLoading({
        title: '数据加载中',
        mark: true
      })
      await db.collection('goods').where({
        openid: openid,
      }).get().then((res) => {
        console.log(res);
        this.goodsInfo = res.data;
      }).catch((err) => {

      });
      wx.hideLoading();
    },
    deleteThisGood() {
      let _this = this;
      // 弹窗提示是否删除该商品
      wx.showModal({
        title: '提示',
        content: '是否删除该商品？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // 删除数据库对应的记录
            db.collection('goods').doc
            // 删除该用户上传的图片
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    delete2(e) {
      wx.showModal({
        title: '提示',
        content: 'delete',
        showCancel: false,
      });
    },
    added() {
      wx.showModal({
        title: '提示',
        content: 'added',
        showCancel: false,
      });
    },
    handleBtnClick(e) {
      const { onPress } = e.detail;
      onPress.call(this);
    },
  },
};
</script>

<style lang="scss" scoped>
.example-content {
  background-color: #e9e9e9;
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
    justify-content: center;
    align-items: center;
    width: 25px;
    background-color: #eee;
    border-radius: 0 10px 10px 0;
  }
}
</style>