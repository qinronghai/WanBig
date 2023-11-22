<template>
  <view style="height: 100%">
    <view class="top_contain">
      <!-- <view class="top_img"> -->
      <!-- <image lazy-load :src="goodinfo.pics[0].url"></image> -->
      <swiper
        indicator-color="#e9e9e9"
        indicator-active-color="#ffc300"
        circular
        indicator-dots
        autoplay
        interval="3000"
        :duration="800">
        <swiper-item
          v-for="(pic, index) in goodinfo.pics"
          :key="index"
          @tap="previewImage(goodinfo.pics, index)">
          <view class="top_img">
            <image
              lazy-load
              :src="pic.url" />
          </view>
        </swiper-item>
      </swiper>
      <!-- </view> -->
      <view class="title text-cut">{{ goodinfo.title }}</view>
      <!-- <view class="author text-cut">{{ goodinfo.author }}</view> -->
      <view class="price_tags_box">
        <view class="now_price">￥{{ goodinfo.price }}.00</view>
        <!-- 成色和品质标签 -->
        <view class="tags">
          <uni-tag
            :text="goodinfo.condition"
            type="success"></uni-tag>
          <uni-tag
            :text="goodinfo.category"
            type="warning"></uni-tag>
        </view>
        <!-- <view class="pre_price">定价：￥{{ goodinfo.price }}元</view> -->
      </view>
      <view class="time_box">
        <!-- TODO 学院 -->

        <view class="time">发布于{{ morejs.timelog(goodinfo.creat) }}</view>
      </view>
    </view>
    <view class="blank"></view>
    <view class="center_contain">
      <uni-section
        class="mb-10"
        title="发布信息"
        titleFontSize="32rpx"
        titleFontWeight="600"
        titleColor="#000"
        type="line" />
    </view>
    <!-- 发布信息 -->
    <view v-if="first_title">
      <view class="user_box">
        <image
          lazy-load
          :src="userinfo.info.avatarUrl"></image>
        <view class="des_box">
          <view class="user_name">{{ userinfo.info.nickName }}</view>
          <view class="local_box">
            <image src="/static/images/local.png"></image>
            <view class="local_box-in">
              <view>{{ userinfo.college.name }}--</view>
              <view>{{ userinfo.profession.name }}</view>
            </view>
          </view>
        </view>
        <view class="chat">
          <!-- TODO 聊天 -->
          <!-- <image lazy-load src="{{userinfo.info.gender==0?'/images/none.png':(userinfo.info.gender==1?'/images/boy.png':'/images/girl.png')}}"></image> -->
        </view>
      </view>

      <view class="deliver_box">
        <view class="deliver_first">
          <view class="deliver_title">取货方式：</view>
          <view class="deliver_kind">{{ goodinfo.delivery }}</view>
        </view>
      </view>
      <view
        class="address_box"
        v-if="goodinfo.delivery === '自提'">
        <view class="deliver_title">取货地点：</view>
        <view class="deliver_place">{{ goodinfo.place }}</view>
      </view>
      <view
        class="palceInput_box"
        v-if="goodinfo.delivery == '配送'">
        <input
          @input="placeInput"
          placeholder="卖家可以帮送，请填写您的收货地址" />
      </view>
      <view
        class="notes_box"
        v-if="goodinfo.notes !== ''">
        <view class="notes">
          <view class="notes_text">备注信息:</view>
          <view class="notes_text">{{ goodinfo.notes }}</view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="tabbar">
      <view class="t_card">
        <image src="/static/images/share.png"></image>
        <text>分享</text>
        <button
          class="t_button"
          open-type="share"></button>
      </view>
      <view
        class="t_card"
        @tap="creatPoster">
        <image src="/static/images/pyq.png"></image>
        <text>海报</text>
      </view>
      <view class="t_card">
        <image src="/static/images/contact.png"></image>
        <text>聊天</text>
        <button
          class="t_button"
          @click="go"
          data-go="/pages/kefu/kefu"></button>
      </view>
      <view class="buy_box">
        <view
          class="buy shadow"
          @tap="buy"
          >{{ goodinfo.status == 0 ? "立即预定" : "刚刚被抢光了" }}</view
        >
      </view>
    </view>
  </view>
</template>
<script module="morejs" lang="wxs" src="@/common.wxs"></script>
<script>
const app = getApp();
const db = wx.cloud.database();
const config = require("../../config.js");
const MessageSubscriber = require("../../js_sdk/utils/subscrib-news.js");
const _ = db.command;
var util = require("../../util.js");
import truncatedString from "../utils/truncatedString";
export default {
  data() {
    return {
      first_title: true,
      place: "",

      goodinfo: {
        /* bookinfo: {
						pic: '',
						title: '',
						edition: '',
						author: '',
						price: ''
					}, */
        // pics:[],
        // title:'',
        // price: '',
        // delivery: 0,
        // place: '',
        // notes: '',
        // status: 0
      },

      userinfo: {
        info: {
          avatarUrl: "",
          nickName: "",
        },

        college: {
          name: "",
        },

        profession: {
          name: "",
        },
      },

      bookinfo: {
        isbn: "",
        publisher: "",
        pubplace: "",
        pubdate: "",
        binding: "",
        format: "",
        class: "",
        summary: "",
      },

      animationKefuData: "",

      chachong: 0, // 是否和卖家聊过天
    };
  },
  async onLoad(e) {
    console.log("//打印出上个页面传递的参数。", e.goodId); //打印出上个页面传递的参数。
    console.log("//打印出上个页面传递的参数。", e.from); //打印出上个页面传递的参数。
    await this.getuserdetail();
    this.id = e.goodId;
    this.getGood(e.goodId);
    // await this.getGood("fd1ab1d565488ebe01dd73b23952845b");
  },
  onShareAppMessage() {
    return {
      title: "这个" + this.goodinfo.title + "只要￥" + this.goodinfo.price + "元，快来看看吧",
      path: "/pages/good-detail/good-detail?scene=" + this.goodinfo._id,
    };
  },
  onReady() {
    // this.kefuani(); //客服图表跳动
  },
  methods: {
    // 预览图片
    previewImage(goodpics, i) {
      const urls = goodpics.map((pic) => pic.url);
      uni.previewImage({
        urls: urls,
        current: urls[i],
      });
    },

    //获取商品信息
    async getGood(goodId) {
      let that = this;
      await db
        .collection("goods")
        .doc(goodId)
        .get({
          success: function (res) {
            console.log("获取商品信息", res);
            that.setData({
              goodinfo: res.data,
            });
            that.getSeller(res.data._openid);
          },
        });
    },

    //获取卖家信息
    getSeller(m) {
      let that = this;
      db.collection("user")
        .where({
          _openid: m,
        })
        .get({
          success: function (res) {
            console.log("获取卖家信息", res);
            that.setData({
              userinfo: res.data[0],
            });

            // that.getBook(n);
          },
        });
    },
    // 自我检测
    checkMySelf(title) {
      const buyerOpenid = uni.getStorageSync("userInfo")._openid;
      const sellerOpenid = this.userinfo._openid;

      console.log("双方的openid :>> ", buyerOpenid, sellerOpenid);

      return buyerOpenid !== sellerOpenid
        ? true
        : (uni.showModal({
            title: "温馨提示",
            content: title,
            showCancel: true,
          }),
          false);
    },
    // 预定订阅
    async subscribNews() {
      const subscriber = new MessageSubscriber();
      // 1. 订单确认通知

      const id1 = "IdkZQ2uAdedZT-JpXURiGScv8hmBtKlH92eaCLz6zHs"; //订单确认通知-1.卖家确认预定订单，2.卖家拒绝预定订单
      const id2 = "nYKQaIjCDZPc7MICBPsAU7SfsVhZZdRzJhGAn_x2234"; //未读消息通知
      const id3 = "V76QqsleOiTKnU4pMfEtSWMC5c58WvQ2yANcEJJNe5c"; //订单状态变更通知 买家接受确认发货和取消交易的通知
      const tmplIdsArray = [id1, id2, id3];
      await subscriber.subscribeNews(tmplIdsArray);
      console.log("object :>> ");
    },

    //购买检测
    async buy() {
      // 1. 注册检测
      const isRegister = await this.$checkRegisterStatus();
      if (!isRegister) {
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

      // 2. 自我检测
      if (!this.checkMySelf("不能预定自己的商品")) {
        console.log("不能预定自己的商品");
        return;
      }
      // 3. 弹窗确认并订阅确认订单通知
      const dy = await this.$uniAsync.showModal({
        title: "温馨提示",
        content: "是否确认预定该商品",
        showCancel: true,
        confirmText: "确认",
        cancelText: "取消",
      });
      if (dy.confirm) {
        // 3.1 调用订阅消息
        await this.subscribNews();
      } else {
        console.log("用户点击取消 :>> ");
        return;
      }
      console.log("test :>> ");
      if (this.goodinfo.delivery == "配送") {
        if (this.place == "") {
          uni.showToast({
            title: "请输入您的收货地址",
            icon: "none",
          });
          return false;
        }
        this.getStatus();
      }
      this.getStatus();
    },

    //获取订单状态
    getStatus() {
      console.log("getStatus :>> ");
      let that = this;
      let _id = that.goodinfo._id;
      db.collection("goods")
        .doc(_id)
        .get({
          success(e) {
            console.log("获取订单状态 :>> ", e);
            if (e.data.status == 0) {
              that.paypost();
            } else {
              uni.showToast({
                title: "该商品刚刚被抢光了~",
                icon: "none",
              });
            }
          },
          fail(error) {
            console.log("error :>> ", error);
            uni.showToast({
              title: "发生异常，请及时和管理人员联系处理",
              icon: "none",
            });
          },
        });
    },

    //支付提交
    paypost() {
      let that = this;
      uni.showLoading({
        title: "正在下单",
      });
      // 修改卖家在售状态
      that.setStatus();
    },

    /* //实现小程序支付
    pay(payData) {
      let that = this;
      //官方标准的支付方法
      uni.requestPayment({
        timeStamp: payData.timeStamp,
        nonceStr: payData.nonceStr,
        package: payData.package,
        //统一下单接口返回的 prepay_id 格式如：prepay_id=***
        signType: "MD5",
        paySign: payData.paySign,
        //签名
        success(res) {
          that.setStatus();
        },
      });
    }, */

    //修改卖家在售状态
    async setStatus() {
      let that = this;
      uni.showLoading({
        title: "正在处理",
        mask: true,
      });
      await db
        .collection("goods")
        .doc(that.goodinfo._id)
        .update({
          data: {
            status: 1,
          },
          success: function (res) {
            console.log("修改卖家在售状态成功", res);
            that.creatOrder();
          },
          fail(e) {
            uni.hideLoading();
            uni.showToast({
              title: "发生异常，请及时和管理人员联系处理",
              icon: "none",
            });
          },
        });
    },

    //创建订单
    creatOrder() {
      let that = this;
      db.collection("order").add({
        data: {
          creat: new Date().getTime(),
          status: 1,
          /*  - 0：在售
              - 1：买家已预定，并生成待确认订单，卖家未确认订单
              - 2：卖家确认订单，交易进行中
              - 3：交易已成交
              - 4：交易取消（4：买家取消的预定）
                  - 42：卖家取消的交易
                  - 43：卖家拒绝预定
              - 5：超时下架 */
          price: that.goodinfo.price,
          //售价
          deliveryid: that.goodinfo.delivery === "自提" ? 0 : 1,
          //0自1配
          ztplace: that.goodinfo.place,
          //自提时地址
          psplace: that.place,
          //配送时买家填的地址
          goodinfo: {
            _id: that.goodinfo._id,
            category: that.goodinfo.category,
            condition: that.goodinfo.condition,
            pic: that.goodinfo.pics[0].url,
            title: that.goodinfo.title,
          },
          seller: that.goodinfo._openid,
          sellid: that.goodinfo._id,
        },
        async success(e) {
          console.log("订单创建成功 :>> ", e);
          const orderId = e._id;
          const buyerInfo = uni.getStorageSync("userInfo"); // 买家信息
          // 给卖家发送商品被预定的通知
          await wx.cloud
            .callFunction({
              name: "sendNewOrder",
              data: {
                openid: that.userinfo._openid, // 卖家openid
                orderId: orderId, // 订单号
                goodInfo: truncatedString(that.goodinfo.title, 19), // 商品信息（标题）
                place: that.place || "自提商品", // 取货地址
                buyerInfo: buyerInfo.info.nickName, // 买家信息
                time: util.formatTime(new Date()), // 下单时间
              },
            })
            .then((res) => {
              console.log("发送模板消息成功", res);
              uni.hideLoading();
              uni.showModal({
                title: "成功提示",
                content: "订单创建成功，等待卖家确认",

                success: ({ confirm }) => {
                  if (confirm) {
                    uni.redirectTo({ url: "/pages/order/detail/detail?id=" + orderId + "&from=good-detail" });
                    console.log("跳转去订单详情页 :>> ");
                  }
                },
              });
            })
            .catch((err) => {
              console.log("发送模板消息失败", err);
              console.log("errCode :>> ", err.errCode);
              if (err.errCode === -1) {
                uni.hideLoading();
                uni.showModal({
                  title: "成功提示",
                  content: "订单创建成功，等待卖家确认",
                  showCancel: true,
                  success: ({ confirm, cancel }) => {
                    if (confirm) {
                      uni.redirectTo({ url: "/pages/order/detail/detail?id=" + orderId + "&from=good-detail" });
                      console.log("跳转去订单详情页 :>> ");
                    }
                  },
                });
              }
              uni.hideLoading();
            });
        },
        fail(error) {
          uni.hideLoading();

          console.log("订单创建失败 :>> ", error);
          uni.showToast({
            title: "发生异常，请及时和管理人员联系处理",
            icon: "none",
          });
        },
      });
    },

    //路由
    async go(e) {
      let that = this;
      // 1. 注册检测
      const isRegister = this.$checkRegisterStatus();
      if (!isRegister) {
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
      // 2. 自我检测
      if (!this.checkMySelf("不能和自己聊天")) {
        console.log("object :>> ");
        return;
      }
      // 3. 订阅未读消息通知
      const dy = await this.$uniAsync.showModal({
        title: "温馨提示",
        content: "是否订阅未读消息提醒",
        showCancel: true,
        confirmText: "同意",
        cancelText: "拒绝",
      });
      if (dy.confirm) {
        // 调用订阅消息
        await this.subscribNews();
      } else {
        await this.$uniAsync.showModal({
          title: "提示",
          content: "您已拒绝订阅消息，将无法收到未读消息提醒",
        });
        return;
      }
      // 4. 获取买卖双方的信息
      const buyerInfo = uni.getStorageSync("userInfo"); // 买家信息
      const sellerInfo = this.userinfo; // 卖家信息

      const buyerOpenid = buyerInfo?._openid;
      const sellerOpenid = sellerInfo?._openid;

      // 5. 检查买家的friends是否有卖家
      //先判断是否有该好友，本地判断
      //1.正反两个openid结合
      var chatid1 = sellerOpenid + buyerOpenid;
      var chatid2 = buyerOpenid + sellerOpenid;

      // 好友列表大于0，才遍历
      if (buyerInfo.friends.length > 0) {
        // 2. 遍历当前登录用户的好友列表
        for (let i = 0; i < buyerInfo.friends.length; i++) {
          // 3. 获取好友列表中每一项的id房间号
          let fid = buyerInfo.friends[i].id;
          // 4. 判断如果与其中之一相等
          if (fid === chatid1 || fid === chatid2) {
            // 5. 代表着已经添加此好友
            console.log("已经和该卖家聊过天");
            that.setData({
              chachong: 1,
            });

            uni.navigateTo({
              url:
                "/pages/chat-room/chat-room?id=" +
                fid +
                "&name=" +
                buyerInfo.friends[i].userInfo.info.nickName +
                "&backgroundimage=" +
                that.backgroundimage +
                "&haoyou_openid=" +
                buyerInfo.friends[i]._openid +
                "&sellerInfo=" +
                JSON.stringify(sellerInfo) +
                "&from=" +
                "good-detail" +
                "&goodId=" +
                this.goodinfo._id,
            });
          }
        }
      }
      //  之前没有聊天过
      if (that.chachong === 0) {
        uni.navigateTo({
          url:
            "/pages/chat-room/chat-room?id=" +
            "firstChat" +
            "&name=" +
            sellerInfo.info.nickName +
            "&backgroundimage=" +
            that.backgroundimage +
            "&haoyou_openid=" +
            sellerInfo._openid +
            "&sellerInfo=" +
            JSON.stringify(sellerInfo) +
            "&from=" +
            "good-detail" +
            "good-detail" +
            "&goodId=" +
            this.goodinfo._id,
        });
      }
    },

    //地址输入
    placeInput(e) {
      this.place = e.detail.value;
    },

    //历史记录
    //记录两次，一次相当于使用微信支付充值，一次是用于购买书籍付款
    history(name, num, type, id) {
      let that = this;
      db.collection("history").add({
        data: {
          stamp: new Date().getTime(),
          type: 1,
          //1充值2支付
          name: "微信支付",
          num: num,
          oid: app.globalData.openid,
        },
        success: function (res) {
          db.collection("history").add({
            data: {
              stamp: new Date().getTime(),
              type: type,
              //1充值2支付
              name: name,
              num: num,
              oid: app.globalData.openid,
            },
            success: function (res) {
              uni.hideLoading();
              that.sms();
              that.tip();
              uni.redirectTo({
                url: "/pages/success/success?id=" + id,
              });
            },
          });
        },
      });
    },

    //短信提醒
    sms() {
      let that = this;
      uniCloud.callFunction({
        name: "sms",
        data: {
          mobile: that.userinfo.phone,
          title: that.bookinfo.title,
        },
        success: (res) => {
          console.log(res);
        },
      });
    },

    //邮件提醒收货
    tip() {
      let that = this;
      uniCloud.callFunction({
        name: "email",
        data: {
          type: 1,
          //1下单提醒2提醒收货
          email: that.userinfo.email,
          title: that.bookinfo.title,
        },
        success: (res) => {
          console.log(res);
        },
      });
    },

    //为了数据安全可靠，每次进入获取一次用户信息
    async getuserdetail() {
      console.log("first user detail");
      if (uni.getStorageSync("openid")) {
        console.log("first user detailgeneric---");
        await wx.cloud.callFunction({
          name: "getOpenID", // 对应云函数名
          success: async (re) => {
            await db
              .collection("user")
              .where({
                _openid: re.result.openid,
              })
              .get({
                success: function (res) {
                  if (res.data.length !== 0) {
                    console.log("openid", re.result.openid);
                    console.log("userInfo", res.data[0]);
                    uni.setStorageSync("openid", re.result.openid);
                    uni.setStorageSync("userInfo", res.data[0]);
                  }
                  console.log(res);
                },
              });
          },
        });
      }
    },

    // 异步函数 creatPoster，用于创建海报
    async creatPoster() {
      // 缓存 this 对象
      let that = this;

      try {
        // 使用云函数获取临时文件下载地址
        const res = await wx.cloud.getTempFileURL({
          fileList: [that.goodinfo.pics[0].url],
        });

        // 判断获取地址是否成功
        if (res.fileList && res.fileList.length > 0) {
          // 获取临时文件下载地址
          const fileURL = res.fileList[0].tempFileURL;
          console.log("图片的下载地址：", fileURL);

          // 构建发布信息对象
          let pubInfo = {
            id: that.goodinfo._id, // 商品ID
            name: that.goodinfo.title, // 商品标题
            pic: fileURL, // 商品图片下载地址
            origin: that.goodinfo.condition, // 商品原始状态
            now: that.goodinfo.price, // 商品当前价格
          };

          // 跳转到生成海报的页面，并携带发布信息和来源信息
          uni.navigateTo({
            url: `/pages/poster/poster?info=${JSON.stringify(pubInfo)}&from=goodDetail`,
          });
        } else {
          // 获取文件下载地址失败
          console.error("获取文件下载地址失败");
        }
      } catch (error) {
        // 异常处理，输出错误信息
        console.error("获取文件下载地址失败:", error);
      }
    },
  },
};
</script>
<style>
.top_contain {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 24rpx;
}

swiper {
  display: block;
  height: 440rpx;
}

.top_img {
  display: flex;
  justify-content: center;
  width: 100%;
}

.top_img image {
  width: 440rpx;
  height: 440rpx;
}

.title {
  padding-top: 30rpx;
  padding-left: 8rpx;
  font-size: 32rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
}

.author {
  padding-top: 30rpx;
  color: rgb(224, 138, 8);
  font-size: 25rpx;
  letter-spacing: 2rpx;
}

.price_tags_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30rpx;
}

.now_price {
  color: #f30;
  font-size: 38rpx;
  font-weight: 600;
}

.pre_price {
  padding-left: 30rpx;
  color: rgb(172, 171, 171);
  font-size: 25rpx;
  text-decoration: line-through;
}

.blank {
  width: 100%;
  height: 10rpx;
  background: #f8f8f8;
}

.center_contain {
  display: flex;

  /* justify-content: space-around; */
  box-sizing: border-box;
  width: 100%;
  height: 80rpx;

  /* padding: 0 100rpx; */
}

.c_title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140rpx;
  height: 100%;
  font-size: 28rpx;
  letter-spacing: 2rpx;
}

.title_on {
  color: #000;
  font-size: 32rpx;
  font-weight: 600;
  border-bottom: 8rpx solid #fbbd08;
}

.user_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 148rpx;
  padding: 24rpx 24rpx;
  /* margin-top: 20rpx; */
  /* background-color: #666; */
}

.user_box image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}

.des_box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  /* width: 450rpx;
   */
  flex: 1;
  height: 100%;
  margin-left: 40rpx;

  /* padding: 10rpx 0; */
}

.user_name {
  margin-bottom: 15rpx;
  font-size: 32rpx;
  letter-spacing: 2rpx;
}

.local_box {
  display: flex;

  /* flex-direction: column; */
  align-items: center;
}

.local_box-in {
  display: flex;
}

.local_box image {
  width: 30rpx;
  height: 30rpx;
}

.local_box view {
  padding-left: 5rpx;
  color: rgb(150, 150, 150);
  font-size: 28rpx;
  letter-spacing: 2rpx;
}

.sex {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100rpx;
  height: 100%;
}

.sex image {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
}

.notes_box {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 24rpx 24rpx 0 24rpx;
}

.notes {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx 20rpx 10rpx 20rpx;
  color: #aaa;
  background: rgb(238, 238, 238);
  border-radius: 10rpx;
}

.notes_text {
  padding-bottom: 10rpx;
  font-size: 28rpx;
  line-height: 45rpx;
  letter-spacing: 2rpx;
}

.time_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 10rpx 20rpx 0 8rpx;
}

.kind {
  font-size: 28rpx;
  letter-spacing: 2rpx;
}

.time {
  color: #8c9aa8;
  font-size: 24rpx;
  letter-spacing: 2rpx;
}

.address_box {
  display: flex;

  /* justify-content: space-between; */
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 24rpx 24rpx 0 24rpx;
}

.deliver_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 24rpx 24rpx 0 24rpx;
}

.deliver_first {
  display: flex;
  align-items: center;
}

.deliver_title {
  font-size: 28rpx;
  letter-spacing: 2rpx;
}

.deliver_kind {
  padding: 4rpx 12rpx;
  color: #fff;
  font-size: 26rpx;
  letter-spacing: 2rpx;
  background-color: #256ff7;
  border-radius: 8rpx;
}

.deliver_place {
  font-size: 28rpx;
  letter-spacing: 2rpx;
}

.palceInput_box {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  padding: 24rpx 24rpx 0 24rpx;
}

.palceInput_box input {
  width: 100%;
  height: 66rpx;
  padding: 0 20rpx;
  font-size: 26rpx;
  letter-spacing: 2rpx;
  border: 1rpx solid #eee;
  border-radius: 10rpx;
}

.detail_contain {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 24rpx;
}

.detail_card {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 30rpx 0;
}

.detail_border {
  border-bottom: 1rpx solid #eee;
}

.detail_title {
  width: 20%;
  font-size: 28rpx;
  line-height: 45rpx;
  letter-spacing: 2rpx;
}

.detail_content {
  width: 78%;
  color: #616161;
  font-size: 27rpx;
  line-height: 44rpx;
  letter-spacing: 2rpx;
}

/*底部导航*/

.tabbar {
  position: fixed;
  bottom: 30rpx;
  left: 0rpx;
  z-index: 8;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 96rpx;
  padding: 10rpx;
  background: #fff;
  border-top: 1rpx solid #ddd;
  opacity: 1;
}

.t_card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 20%;
  height: 80rpx;
}

.t_card image {
  width: 40rpx;
  height: 40rpx;
}

.t_card text {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: calc(100% - 50rpx);
  padding-top: 4rpx;
  font-size: 24rpx;
  text-align: center;
  white-space: nowrap;
}

.t_button {
  position: absolute;
  top: 0rpx;
  left: 0rpx;
  z-index: 9;
  width: 100%;
  height: 100%;
  opacity: 0.01;
}

.buy_box {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 40%;
  height: 100%;
}

.buy {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 70rpx;
  color: #000;
  font-size: 28rpx;
  letter-spacing: 4rpx;
  background: #fbbd08;
  border-radius: 35rpx;
}

.contact_box {
  position: fixed;
  right: 40rpx;
  bottom: 200rpx;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100rpx;
  padding: 20rpx 0;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 20rpx #f0f0f0 !important;
  border-radius: 50rpx 50rpx 20rpx 20rpx;
}

.contact_box image {
  width: 75rpx;
  height: 75rpx;
}

.contact_box view {
  margin-top: 10rpx;
  font-size: 26rpx;
  letter-spacing: 2rpx;
}
</style>
