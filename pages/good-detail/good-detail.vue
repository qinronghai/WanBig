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
      <!-- <view @tap="changeTitle" :data-id="true" :class="'c_title ' + (first_title ? 'title_on' : '')">发布信息</view> -->
      <uni-section
        class="mb-10"
        title="发布信息"
        titleFontSize="32rpx"
        titleFontWeight="600"
        titleColor="#000"
        type="line"></uni-section>

      <!-- <view @tap="changeTitle" :data-id="false" :class="'c_title ' + (first_title ? '' : 'title_on')">图书详情</view> -->
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

      <view
        class="address_box"
        v-if="goodinfo.delivery === '自提'">
        <view class="deliver_title">取货地点：</view>
        <view class="deliver_place">{{ goodinfo.place }}</view>
      </view>
      <view class="deliver_box">
        <view class="deliver_first">
          <view class="deliver_title">取货方式：</view>
          <view class="deliver_kind">{{ goodinfo.delivery }}</view>
        </view>
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
          >{{ goodinfo.status == 0 ? "立即购买" : "刚刚被抢光了" }}</view
        >
      </view>
    </view>
    <!-- 悬浮客服功能 -->
    <!-- <view class="contact_box" @tap="go" data-go="/pages/kefu/kefu" :animation="animationKefuData">
			<image src="/static/images/ww.jpg"></image>
			<view>反馈</view>
		</view> -->
  </view>
</template>
<script module="morejs" lang="wxs" src="@/common.wxs"></script>
<script>
const app = getApp();
const db = wx.cloud.database();
const config = require("../../config.js");
const _ = db.command;
export default {
  data() {
    return {
      first_title: true,
      place: "",

      collegeName: {
        name: "",
      },

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
    // await this.getGood("aeff410b653c815300c20ae111879771");
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
    changeTitle(e) {
      let that = this;
      that.setData({
        first_title: e.currentTarget.dataset.id,
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
            // res.data 为商品信息
            // res.data
            that.setData({
              // TODO 留意
              /* collegeName: JSON.parse(config.data).college[parseInt(res.data.collegeid) +
									1], */
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

    //获取书本信息
    // getBook(e) {
    // 	let that = this;
    // 	db.collection('books')
    // 		.doc(e)
    // 		.get({
    // 			success: function(res) {
    // 				that.setData({
    // 					bookinfo: res.data
    // 				});
    // 			}
    // 		});
    // },

    //回到首页
    home() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },

    //购买检测
    buy() {
      let that = this;
      if (!app.globalData.openid) {
        uni.showModal({
          title: "温馨提示",
          content: "该功能需要注册方可使用，是否马上去注册",
          success(res) {
            if (res.confirm) {
              uni.navigateTo({
                url: "/pages/login/login",
              });
            }
          },
        });
        return false;
      }
      if (that.goodinfo.delivery == 1) {
        if (that.place == "") {
          uni.showToast({
            title: "请输入您的收货地址",
            icon: "none",
          });
          return false;
        }
        that.getStatus();
      }
      that.getStatus();
    },

    //获取订单状态
    getStatus() {
      let that = this;
      let _id = that.goodinfo._id;
      db.collection("publish")
        .doc(_id)
        .get({
          success(e) {
            if (e.data.status == 0) {
              that.paypost();
            } else {
              uni.showToast({
                title: "该书刚刚被抢光了~",
                icon: "none",
              });
            }
          },
        });
    },

    //支付提交
    paypost() {
      let that = this;
      uni.showLoading({
        title: "正在下单",
      });
      // 利用云开发接口，调用云函数发起订单
      uniCloud.callFunction({
        name: "pay",
        data: {
          $url: "pay",
          //云函数路由参数
          goodId: that.goodinfo._id,
        },
        success: (res) => {
          uni.hideLoading();
          that.pay(res.result);
        },
        fail(e) {
          console.log(e, "支付erro");
          uni.hideLoading();
          uni.showToast({
            title: "支付失败，请及时反馈或稍后再试",
            icon: "none",
          });
        },
      });
    },

    //实现小程序支付
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
    },

    //修改卖家在售状态
    setStatus() {
      let that = this;
      uni.showLoading({
        title: "正在处理",
      });
      // 利用云开发接口，调用云函数发起订单
      uniCloud.callFunction({
        name: "pay",
        data: {
          $url: "changeP",
          //云函数路由参数
          _id: that.goodinfo._id,
          status: 1,
        },
        success: (res) => {
          console.log("修改订单状态成功");
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
          //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
          price: that.goodinfo.price,
          //售价
          delivery: that.goodinfo.delivery,
          //0自1配
          ztplace: that.goodinfo.place,
          //自提时地址
          psplace: that.place,
          //配送时买家填的地址
          bookinfo: {
            _id: that.bookinfo._id,
            author: that.bookinfo.author,
            edition: that.bookinfo.edition,
            pic: that.bookinfo.pic,
            title: that.bookinfo.title,
          },
          seller: that.goodinfo._openid,
          sellid: that.goodinfo._id,
        },
        success(e) {
          that.history("购买书籍", that.goodinfo.price, 2, e._id);
        },
        fail() {
          uni.hideLoading();
          uni.showToast({
            title: "发生异常，请及时和管理人员联系处理",
            icon: "none",
          });
        },
      });
    },

    //路由
    go(e) {
      let that = this;

      const buyerInfo = uni.getStorageSync("userInfo"); // 买家信息
      const sellerInfo = this.userinfo; // 卖家信息

      const buyerOpenid = buyerInfo._openid;
      const sellerOpenid = sellerInfo._openid;
      // 6. 本人不能与本人聊天
      console.log("buyandseller :>> ", buyerOpenid, sellerOpenid);
      if (buyerOpenid === sellerOpenid) {
        uni.showModal({
          title: "温馨提示",
          content: "不能与自己聊天",
          showCancel: true,
          success: ({ confirm, cancel }) => {},
        });
        return;
      }

      // 检查买家的friends是否有卖家
      //先判断是否有该好友，本地判断
      // 1. 正反两个openid结合
      var chatid1 = sellerOpenid + buyerOpenid;
      var chatid2 = buyerOpenid + sellerOpenid;

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

      //  之前没沟通过
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

    //生成海报
    async creatPoster() {
      let that = this;
      try {
        const res = await wx.cloud.getTempFileURL({
          fileList: [that.goodinfo.pics[0].url],
        });

        if (res.fileList && res.fileList.length > 0) {
          const fileURL = res.fileList[0].tempFileURL;
          console.log("图片的下载地址：", fileURL);

          let pubInfo = {
            id: that.goodinfo._id,
            name: that.goodinfo.title,
            pic: fileURL,
            origin: that.goodinfo.condition,
            now: that.goodinfo.price,
          };

          uni.navigateTo({
            url: `/pages/poster/poster?info=${JSON.stringify(pubInfo)}&from=goodDetail`,
          });
        } else {
          console.error("获取文件下载地址失败");
        }
      } catch (error) {
        console.error("获取文件下载地址失败:", err);
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
