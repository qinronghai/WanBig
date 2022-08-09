<template>
  <div class="wrap" v-for="(item, index) in goodsInfo" :key="index">
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
    <div class="right">
      <radio-group class="radio" @change="areaRadioChange">
        <label class="radio-pass">
          <radio value="通过" :checked="areaRadio" />yes
        </label>
        <label class="radio-no-pass">
          <radio value="不通过" />no
        </label>
      </radio-group>
    </div>
  </div>
</template>

<script>
const db = wx.cloud.database()
export default {
  data() {
    return {
      goodsInfo: [],
      isAuditorRadio: false
    }
  },
  async onLoad(options) {
    await this.getNoAudited();
  },
  methods: {
    async getNoAudited() {
      let _this = this;
      wx.showLoading({
        title: '数据加载中',
        mark: true
      })
      await db.collection('goods').where({
        audited: false,
      }).get().then((res) => {
        console.log(res);
        this.goodsInfo = res.data;
      }).catch((err) => {

      });
      wx.hideLoading();
    }
  }
}
</script>

<style lang="scss" scoped>
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
    background-color: #e1e2dc;
    border-radius: 0 10px 10px 0;

    .radio {
    }
  }
}
</style>
