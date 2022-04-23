<template>
  <div class="wrap">
    <div class="top-person-info">
      <div class="left">
        <image class="left-avatar"></image>
        <div class="left-name-id">
          <div class="name">AHAI</div>
          <div class="id">ID:001</div>
        </div>
      </div>
      <div class="right">
        <div class="label vip">
          <image
            class="label__icon vip"
            src="../../../static/goods-detail/vip.svg"
            mode=""
          />
          <span class="vip__txt">vip</span>
        </div>
        <div class="label auditor">
          <image
            class="label__icon"
            src="../../../static/goods-detail/auditor.svg"
            mode=""
          />
          <span class="auditor__txt">审核员</span>
        </div>
        <div class="label deal-num">
          <image
            class="label__icon"
            src="../../../static/goods-detail/deal.svg"
            mode=""
          />
          <span class="deal-num__txt">已成交 8</span>
        </div>
      </div>
    </div>
    <div class="bottom-project-info">
      <div class="item__to">
        <div class="txt">申请成为审核员</div>
        <div class="icon"><van-icon name="arrow" /></div>
      </div>
      <div class="item__to">
        <div class="txt">了解本项目</div>
        <div class="icon"><van-icon name="arrow" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import VanIcon from "../../../wxcomponents/vant/icon";

export default {
  data() {
    return {};
  },
  components: {
    VanIcon,
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 220px;
  padding: 0 25px;
  background-color: #fff;
  border-radius: 10px;
  .top-person-info {
    display: flex;
    .left {
      display: flex;
      .left-avatar {
        width: 60px;
        height: 60px;
        background-color: #2a82e4;
        border-radius: 50%;
        transform: translateY(-50%);
      }

      .left-name-id {
        margin-left: 30px;
        .name {
          font-size: 14px;
        }

        .id {
          font-size: 9px;
        }
      }
    }
    .right {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      height: 17px;
      margin-top: 12px;
      font-size: 17.52rpx;
      .label {
        display: flex;
        align-items: center;
        padding: 5rpx;
        padding-right: 10rpx;
        font-weight: bold;
        .label__icon {
          width: 24.53rpx;
          height: 24.53rpx;
          margin-right: 5rpx;
        }
      }
      .label.vip {
        background-color: #ffc402;

        .label__icon.vip {
          width: 21.03rpx;
          height: 21.03rpx;
        }
      }

      .label.auditor {
        background-color: #2a82e4;
      }

      .label.deal-num {
        background-color: #43cf7c;
      }
    }
  }
  .bottom-project-info {
    margin-top: 20px;
    .item__to {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 44px;
      margin-top: 15px;
      background-color: #c4c4c4;
      border-radius: 9px;
      .txt {
        margin-left: 15px;
        font-size: 10px;
      }

      .icon {
        margin-right: 15px;
      }
    }
  }
}
</style>