<template>
  <div>
    <div class="select-all">
      <div class="left">快速审核</div>
      <div class="right">
        <div class="text">全选并通过</div>
        <div class="radio" @click="AuditedAllPass">
          <van-radio name="1" icon-size="20px" shape="square"></van-radio>
        </div>
      </div>
    </div>
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
        </div>
      </div>
      <div class="right">
        <van-icon name="delete-o" @click="AuditedNoPass(item)" size="20px" color="red" />
      </div>
    </div>
  </div>
</template>

<script>
const db = wx.cloud.database();
var util = require("../utils/formatTimeToChinese.js");
const _ = db.command;

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
    },
    async AuditedNoPass(item) {
      await this.updateAudite(item, false);
      // 发送通知用户该审核不通过
      let pass = "不通过";
      let note = "内容违规，请联系开发者申诉";
      this.sendAuditResultNotice(item, pass, note);
      // 在当前数组中删除该项
      this.goodsInfo.forEach((element, index, arr) => {
        if (element._id === item._id) {
          console.log('删除当前项', element._id);
          arr.splice(index, 1);
        }
      });
      console.log(this.goodsInfo);

    },
    /* async AuditedAllPass() {
      let pass = "通过";
      let note = "快叫上小伙伴来一起发布闲置品吧";

      // 数组中所有项全部审核且通过
      await this.goodsInfo.forEach(item => {
        this.updateAudite(item, true);
        // 发送通知用户该审核通过
        this.sendAuditResultNotice(item, pass, note);
      });

      // 删除当前数组
      this.goodsInfo = [];
      console.log(this.goodsInfo, '快速审核完毕！');
    } */

    async AuditedAllPass() {
      let pass = "通过";
      let note = "快叫上小伙伴来一起发布闲置品吧";
      let recodeFailAudite = [];

      for (let i = 0; i < this.goodsInfo.length; i++) {
        let item = this.goodsInfo[i];

        // 更新每一项的审核值
        let itemRes = await this.updateAudite(item, true);
        // 更新成功
        if (itemRes) {
          // 发送审核结果通知
          await this.sendAuditResultNotice(item, pass, note);
          // if (noticeRes) {
          //   console.log("发送审核通过通知失败");
          // } else {
          //   console.log(`已发送审核通过通知给用户 ${item.userInfo._openid}`);
          // }
        } else {
          // 记录更新失败的商品
          recodeFailAudite.push[item];
          continue;
        }
      }

      /*  for (const item of this.goodsInfo) {
         try {
           // 更新审核状态
           await this.updateAudite(item, true);
           console.log(`商品 ${item._id} 审核通过`);
 
           // 发送审核结果通知
           await this.sendAuditResultNotice(item, pass, note);
           console.log(`已发送审核通过通知给用户 ${item.userInfo._openid}`);
         } catch (error) {
           console.error(`处理商品 ${item._id} 审核时出错: ${error}`);
           // 处理错误情况，例如数据库更新失败或通知发送失败
         }
       } */

      // 清空商品数组
      this.goodsInfo = recodeFailAudite;
      // console.log('快速审核完毕！');
    }
    ,


    async updateAudite(item, pass) {
      let res = null;
      try {
        // 更新audited属性为true，pass属性为false：表示已经审核，但是审核不通过
        res = await db.collection('goods').doc(item._id).update({
          data: {
            audited: true, // 已经审核
            pass: pass, // 审核状态
          }
        });

        if (res.stats.updated > 0) {
          console.log('更新审核状态成功', res);
          return true;
        } else {
          console.log('更新审核状态失败', res);
          return false;
        }
      } catch (error) {
        // 处理错误情况，例如数据库更新失败
        throw (error); // 抛出错误以供调用者处理
      }


    }
    ,
    async sendAuditResultNotice(item, pass, note) {
      // 处理时间格式
      let riseTime = util.formatTimeToChinese(item.releaseTime);
      let auditTime = util.formatTimeToChinese(new Date());
      console.log(riseTime);
      console.log(auditTime);
      await wx.cloud
        .callFunction({
          name: "sendAuditedRes",
          data: {
            openid: item.userInfo._openid, // 字符串
            goodId: item._id, // 字符串
            goodName: item.title, // 字符串
            riseTime: riseTime, // 发起时间    // TODO
            auditTime: auditTime, // 审核时间
            auditResults: pass, // 字符串
            note: note // 字符串
          },
        })
        .then((res) => {
          console.log("first response: ", res);
          if (res.result.errCode === 43101) {
            console.log("用户拒绝接收，允许接收次数已使用完", res);
          }
        })
        .catch((err) => {
          console.log("错误！！！", err);
          // throw (err);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.select-all {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin: 0 5px 10px;
  font-size: 13px;
  background-color: #ffc300;
  border-radius: 5px;

  .left {
    padding-left: 5px;
    font-weight: bold;
  }

  .right {
    display: flex;

    .text {
      padding-right: 5px;
      font-weight: bold;
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
    width: 40px;
    background-color: #eee;
    border-radius: 0 10px 10px 0;
  }
}
</style>
