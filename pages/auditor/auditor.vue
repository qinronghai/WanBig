<template>
  <div>
    <!-- 待审核section -->
    <view class="section">
      <uni-section
        class="mb-10"
        title="待审核列表"
        type="line" />
    </view>
    <view class="xxxbox"></view>

    <!-- 主体区域 -->
    <scroll-view scroll-y>
      <view>
        <checkbox-group
          class="block"
          @change="changeCheckbox">
          <view
            v-for="(item, index) in goodsInfo"
            :key="index"
            class="auditor-card">
            <div class="wrap">
              <div class="left">
                <checkbox
                  :value="String(index)"
                  :checked="checkedArr.includes(String(index))"
                  :class="{ checked: checkedArr.includes(String(index)) }"
                  style="transform: scale(0.7)"></checkbox>
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
                <van-icon
                  name="delete-o"
                  @click="inputDialogToggle(item)"
                  size="20px"
                  color="red" />
              </div>
            </div>
          </view>
        </checkbox-group>
      </view>
      <uni-load-more
        color="#007AFF"
        :status="status"
        @clickLoadMore="clickLoadMore"
        :contentText="contentText" />
    </scroll-view>

    <!-- 审核不通过原因-输入框 -->
    <uni-popup
      ref="inputDialog"
      type="dialog">
      <uni-popup-dialog
        ref="inputClose"
        mode="input"
        title="请输入不通过的原因"
        value=""
        placeholder="确认后将立即执行操作"
        @confirm="dialogInputConfirm"></uni-popup-dialog>
    </uni-popup>

    <!-- 全选+批量 操作栏 -->
    <div class="select-all">
      <div class="left">
        <checkbox-group @change="allChoose">
          <label>
            <checkbox
              value="all"
              :class="{ checked: allChecked }"
              :checked="allChecked ? true : false"
              style="transform: scale(0.7)"></checkbox>
            全选
          </label>
        </checkbox-group>
      </div>
      <div class="right">
        <button
          size="mini"
          type="primary"
          hover-class="button-hover"
          @click="batchOperation(true)">
          <uni-icons
            type="checkmarkempty"
            color="#fff"
            size="24" />通过
        </button>
        <button
          size="mini"
          type="warn"
          hover-class="button-hover"
          @click="batchOperation(false)">
          <uni-icons
            type="closeempty"
            color="#fff"
            size="24" />不通过
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const db = wx.cloud.database();
var util = require("../utils/formatTimeToChinese.js");
import truncatedString from "../utils/truncatedString.js";
const _ = db.command;
let isAll = false;
let currentItem = null;
export default {
  data() {
    return {
      goodsInfo: [],
      isAuditorRadio: false,
      isChecked: false,
      checkedArr: [], //复选框选中的值
      allChecked: false, //是否全选，
      status: "loading",
      isEnd: false,
      page: 0,
      reason: "",
      contentText: {
        contentdown: "点击获取更多",
        contentrefresh: "正在加载",
        contentnomore: "没有更多数据了",
      },
    };
  },
  async onLoad() {
    await this.initList();
  },
  methods: {
    // 打开输入对话框
    inputDialogToggle(item) {
      this.$refs.inputDialog.open();
      currentItem = item;
    },
    // 确然输入内容触发的函数
    dialogInputConfirm(val, item) {
      this.reason = val;
      this.$refs.inputDialog.close();
      this.AuditedNoPass(currentItem, val);
    },
    // 单个不过审操作
    async AuditedNoPass(item, reason = "") {
      console.log("item :>> ", item);
      console.log("reason :>> ", reason);
      await this.updateAudite(item, false, reason);

      // 发送通知用户该审核不通过
      let pass = "不通过";
      let note = `${reason}，请整改后重新发布`;
      await this.sendAuditResultNotice(item, pass, note, false); //单项操作，不是批量操作

      // 在当前数组中删除该项
      this.goodsInfo.forEach((element, index, arr) => {
        if (element._id === item._id) {
          console.log("删除当前项", element._id);
          arr.splice(index, 1);
        }
      });

      console.log(this.goodsInfo);
    },
    // 加载更多
    clickLoadMore(e) {
      console.log("加载更多 :>> ", e);
      if (isAll) {
        return;
      }
      this.getNoAudited();
    },
    // 多选复选框改变事件
    changeCheckbox(e) {
      console.log("change   :>> ", e);
      this.checkedArr = e.detail.value;
      // 如果选择的数组中有值，并且长度等于列表的长度，就是全选
      if (this.checkedArr.length > 0 && this.checkedArr.length == this.goodsInfo.length) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
    },
    // 全选事件
    allChoose(e) {
      console.log("全选 :>> ", e);
      let chooseItem = e.detail.value;
      // 全选
      if (chooseItem[0] == "all") {
        this.allChecked = true;

        for (let i = 0; i < this.goodsInfo.length; i++) {
          let itemVal = String(i);
          if (!this.checkedArr.includes(itemVal)) {
            this.checkedArr.push(itemVal);
          }
        }
      } else {
        // 取消全选
        this.allChecked = false;
        this.checkedArr = [];
      }
    },
    // 获取未审核商品数据
    async getNoAudited() {
      try {
        const { data } = await db.collection("goods").where({ audited: false }).skip(this.page).limit(2).get();
        let list = this.goodsInfo;
        list = list.concat(data);
        this.page += data.length;
        this.setData({
          goodsInfo: list,
          status: data.length < 2 ? "noMore" : "more",
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    },
    // 初始化获取未审核商品数据
    async initList() {
      try {
        const { data } = await db.collection("goods").where({ audited: false }).limit(2).get();
        console.log("data.length, :>> ", data.length);
        this.goodsInfo = data;
        this.status = data.length >= 2 ? "more" : "noMore";
        this.page += data.length;
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    },
    // 批量操作
    async batchOperation(type) {
      // 判空
      if (this.checkedArr.length === 0) {
        uni.showToast({
          title: "请勾选一项",
          icon: "error",
          mask: true,
        });
        return;
      }
      // 选择的索引
      const indexs = this.checkedArr.map((item) => parseInt(item, 10));
      // 选择的商品
      const selectedGoods = indexs.map((index) => this.goodsInfo[index]);
      // 未选择的商品
      const unselectedGoods = this.goodsInfo.filter((item, index) => {
        if (!indexs.includes(index)) {
          return item;
        }
      });

      console.log(indexs);
      console.log("选择的good", selectedGoods);
      console.log("未选择的good", unselectedGoods);

      // 批量审核
      let pass = type ? "通过" : "不通过";
      let note = type ? "快叫上小伙伴来一起发布闲置品吧" : "内容违规，请整改后重新发布";
      let recodeFails = [];

      for (let i = 0; i < selectedGoods.length; i++) {
        const item = selectedGoods[i];
        // 更新每一项的审核值
        let itemRes = this.updateAudite(item, type ? true : false);
        if (itemRes) {
          // 发送通知用户该审核通过
          await this.sendAuditResultNotice(item, pass, note, true); // 批量操作
        } else {
          recodeFails.push(item);
          continue;
        }
      }

      // 操作反馈
      uni.showToast({
        title: `成功${selectedGoods.length - recodeFails.length},失败${recodeFails.length}`,
        mask: true,
      });

      // 清空勾选的索引数组和取消全选
      this.checkedArr = [];
      this.allChecked = false;
      // 显示剩余的数据和失败的数据
      this.goodsInfo = [...unselectedGoods, ...recodeFails];
      this.page = this.goodsInfo.length;
    },
    // 更新审核状态
    async updateAudite(item, pass, reason = "") {
      let res = null;
      try {
        // 更新audited属性为true，pass属性为false：表示已经审核，但是审核不通过
        res = await db
          .collection("goods")
          .doc(item._id)
          .update({
            data: {
              audited: true, // 已经审核
              pass: pass, // 审核状态
              reason: reason, // 不通过原因
            },
          });

        if (res.stats.updated > 0) {
          console.log("更新审核状态成功", res);
          return true;
        } else {
          console.log("更新审核状态失败", res);
          return false;
        }
      } catch (error) {
        console.log("更新审核状态出错 :>> ", error);
        // 处理错误情况，例如数据库更新失败
        // throw error; // 抛出错误以供调用者处理
      }
    },
    // 发送审核通知
    async sendAuditResultNotice(item, pass, note, batch) {
      // 处理时间格式
      let riseTime = util.formatTimeToChinese(item.creat);
      let auditTime = util.formatTimeToChinese(new Date());
      console.log(riseTime);
      console.log(auditTime);

      await wx.cloud
        .callFunction({
          name: "sendAuditedRes",
          data: {
            openid: item._openid, // 字符串
            goodId: item._id, // 字符串
            goodName: truncatedString(item.title, 20), // 字符串 使用截断
            riseTime: riseTime, // 发起时间    // TODO
            auditTime: auditTime, // 审核时间
            auditResults: pass, // 字符串
            note: note, // 字符串
          },
        })
        .then((res) => {
          console.log("first response: ", res);
          if (res.result.errCode === 43101) {
            console.log("用户拒绝接收，允许接收次数已使用完", res);
            if (!batch) {
              // 单个操作显示，批量则不显示
              uni.showToast({
                title: "用户拒绝接收",
                icon: "error",
                mask: true,
              });
            }
          }
        })
        .catch((err) => {
          console.log("错误！！！", err);
          console.log("错误！！！", err.errCode);
          if (err.errCode === -1 && !batch) {
            uni.showToast({
              title: "发送通知成功",
              icon: "success",
              mask: true,
            });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
}
.xxxbox {
  width: 100%;
  height: 90rpx;
}
scroll-view {
  height: calc(100vh - 130rpx - 90rpx);
}
.select-all {
  position: fixed;
  bottom: 0rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 130rpx;
  font-size: 30rpx;
  background-color: #ffc300;
  border-radius: 20rpx;

  .left {
    padding-left: 5px;
    font-size: 30rpx;
    font-weight: bold;
  }

  .right {
    display: flex;

    button {
      width: auto;
      font-size: 30rpx;
      line-height: 70rpx;
      border-radius: 50rpx;
      uni-icons {
        position: relative;
        right: 5rpx;
        bottom: -5rpx;
      }
    }
  }
}

.wrap {
  display: flex;
  height: 100px;
  margin: 0 5px 10px;
  background-color: #fff;
  box-shadow: 1px 1.5px 5px 1px rgb(180, 179, 179);
  border-radius: 10px;

  .left {
    display: flex;
    align-items: center;
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
    width: 40px;
    background-color: #eee;
    border-radius: 0 10px 10px 0;
  }
}
</style>
