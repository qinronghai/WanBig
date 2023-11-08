<template>
  <view>
    <button
      type="primary"
      @click="deleteUserData">
      删除用户数据
    </button>

    <button
      type="default"
      @click="addBooks('9787121181184')">
      根据isbn获取图书数据
    </button>

    <van-stepper
      :value="price"
      integer
      @change="priceChange"
      min="1"
      max="100" />

    <button @click="test">测试uni异步化</button>
    <button @click="check">测试检测登录</button>
    <input
      v-model="text"
      placeholder="请输入文本"
      placeholder-class="input-placeholder"
      @blur="onChangeInput" />

    <!-- 轮播图+点击预览图片 -->
    <swiper
      class="swiper"
      circular
      indicator-dots
      autoplay
      interval="3000"
      :duration="800">
      <swiper-item
        v-for="(pic, index) in goodpics"
        :key="index"
        @tap="previewImage(goodpics)">
        <view class="swiper-item uni-bg-red">
          <image
            :src="pic.url"
            mode="widthFix" />
        </view>
      </swiper-item>
    </swiper>

    <!-- 成色和品质标签 -->
    <view class="tags">
      <uni-tag
        text="全新"
        type="success"></uni-tag>
      <uni-tag
        text="健身器材"
        type="warning"></uni-tag>
    </view>

    <button @click="goToChatRoom">去聊天室</button>
    <view
      style="width: 100vw"
      class="kind-list">
      <view class="kind-list">
        <view class="kind-list_item">
          <view class="tui-flex kind-list_item-hd }}">
            <view class="tui-flex_item">好友列表</view>

            <view
              v-for="(item, index) in peoplelist"
              :key="index">
              <uni-list
                :data-info="item"
                @click="peoplepage(item)">
                <view class="tui-msg-box">
                  <uni-image
                    :src="item.userInfo.avatarUrl"
                    class="tui-msg-pic"
                    mode="widthFix"></uni-image>
                  <view class="tui-msg-item">
                    <view class="tui-msg-name">昵称：{{ item.userInfo.nickName }}</view>
                    <view class="tui-msg-content">country:：{{ item.userInfo.country }}</view>
                  </view>
                </view>
                <view :class="'tui-msg-right ' + (item.level === 3 ? 'tui-right-dot' : '')">
                  <view class="tui-msg-time">性别：{{ item.userInfo.gender === 1 ? "男" : "女" }}</view>
                </view>
              </uni-list>
            </view>

            <view class="tui-safearea-bottom"></view>
          </view>
        </view>
      </view>

      <uni-list>
        <uni-list
          v-for="(item, index) in peoplelist"
          :key="index"
          :border="true">
          <!-- 右侧带角标 -->
          <uni-list-chat
            :title="item.userInfo.info.nickName"
            @click="peoplepage(item)"
            :clickable="true"
            :avatar="item.userInfo.info.avatarUrl"
            :note="item.note"
            :time="item.time"
            :badge-text="item.badgeText"></uni-list-chat>
        </uni-list>
      </uni-list>
    </view>

    <button @click="handleStartChat">消息</button>

    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg" />

    <view class="good-card">
      <div class="left">
        <image
          src="http://doc.bufanui.com/static/images/logo.jpg"
          mode="scaleToFill" />
      </div>
      <div class="right">
        <div class="right-top">
          <div class="title">测试组件</div>
          <uni-icons
            type="closeempty"
            size="24"
            color="#f6f8fa"></uni-icons>
        </div>
        <div class="right-bottom">
          <div class="price">138.00</div>
          <button
            open-type=""
            hover-class="button-hover"
            @click="">
            发送商品
          </button>
        </div>
      </div>
    </view>
  </view>
</template>

<script>
const db = wx.cloud.database();
const _ = db.command;
import VanStepper from "../../wxcomponents/vant/stepper/index";
import VanCard from "../../wxcomponents/vant/card";

export default {
  components: {
    VanStepper,
    VanCard,
  },
  data() {
    return {
      price: 15,
      text: "",
      background: ["color1", "color2", "color3"],

      goodpics: [
        {
          url: "cloud://qrh-database01-5gz9zkuedd28e7fc.7172-qrh-database01-5gz9zkuedd28e7fc-1313188449/good-pictures/1698301471557-764",
        },
        {
          url: "cloud://qrh-database01-5gz9zkuedd28e7fc.7172-qrh-database01-5gz9zkuedd28e7fc-1313188449/good-pictures/1698301471560-97",
        },
      ],
      peoplelist: [
        {
          userInfo: {
            avatarUrl: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
            nickName: "John",
            country: "USA",
            gender: 1,
          },
          level: 2,
        },
        {
          userInfo: {
            avatarUrl: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
            nickName: "Emily",
            country: "Canada",
            gender: 2,
          },
          level: 3,
        },
        // 添加更多的模拟数据...
      ],
    };
  },
  onLoad(options) {},
  onShow: function (options) {
    this.onShowClone3389(options);
  },
  methods: {
    mergeCommonCriteria(criteria) {
      console.log("mergeCommonCriteria", criteria, this.groupId);
      return {
        //groupId是你这个聊天室的名字，
        //自己可以利用Id给每个卖家创建一下之类的，用id当名字
        //同一个卖家的大家都进到这个聊天室中

        //或者商品一开始上传的时候给他带一个属性就是聊太的属性就行，正好也可以当作评论的属性
        groupId: this.groupId,
        ...criteria,
      };
    },
    async getUnreadedMsg(openid) {
      // 获取未读消息
      let res = await db
        .collection("chatroom_example")
        .where(
          this.mergeCommonCriteria({
            readed: 0,
            _openid: openid,
          })
        )
        .get();

      let unreadedList = res.data;

      console.log("未读消息列表 :>> ", unreadedList);
      return {
        note: unreadedList[unreadedList.length - 1].textContent,
        time: unreadedList[unreadedList.length - 1].sendTime,
        badgeText: unreadedList.length,
      };
    },
    async tryFun(fn, title) {
      try {
        await fn();
      } catch (e) {
        console.log("CatchClause", e);
        console.log("CatchClause", e);
        this.showError(title, e, "", "");
      }
    },
    async initOpenID() {
      return this.tryFun(async () => {
        const openId = await this.getOpenIDFun();
        this.setData({
          openId,
        });
      }, "初始化 openId 失败");
    },
    handleStartChat() {
      const buyerUserInfo = uni.getStorageSync("userInfo"); // 买家信息
      const buyerOpenid = buyerUserInfo._openid; // 买家
      const sellerOpenid = that.addpeopledetail._openid; // 卖家信息
      // 检查买家的friends是否有卖家
      let that = this;
      //先判断是否有该好友，本地判断也好，数据库判断都行
      // 1. 正反两个openid结合
      var chatid1 = sellerOpenid + buyerOpenid;
      var chatid2 = buyerOpenid + sellerOpenid;
      // 2. 遍历当前登录用户的好友列表
      for (let i = 0; i < buyerUserInfo.friends.length; i++) {
        // 3. 获取好友列表中每一项的id房间号
        let fid = buyerUserInfo.friends[i].id;
        // 4. 判断如果与其中之一相等
        if (fid === chatid1 || fid === chatid2) {
          // 5. 代表着已经添加此好友
          that.setData({
            chachong: 1,
          });
        }
      }
    },
    onShowClone3389: async function (options) {
      //重新更新好友列表
      wx.cloud.callFunction({
        name: "yunrouter",

        data: {
          $url: "HuoquFriends",

          //云函数路由参数
          openid: uni.getStorageSync("openid"),
        },

        success: async (res2) => {
          let that = this;
          const friends = res2.result.data[0].friends;
          // friends.forEach(item => {
          // 	// 将头像替换成本地地址
          // 	uni.getImageInfo({
          // 		src: item.userInfo.info.avatarUrl,
          // 		async success(res) {
          // 			item.userInfo.info.avatarUrl = res.path;
          // 			const { note, time, badgeText } = await that.getUnreadedMsg(uni.getStorageSync('openid'));
          // 			console.log('note :>> ', note);
          // 			console.log('time :>> ', time);
          // 			console.log('badgeText :>> ', badgeText);
          // 			item.note = note;
          // 			item.time = time;
          // 			item.badgeText = badgeText;
          // 		}
          // 	})
          // 	// 获取未读的消息数量

          // })
          for (const item of friends) {
            try {
              const res = await uni.getImageInfo({ src: item.userInfo.info.avatarUrl });
              item.userInfo.info.avatarUrl = res.path;
              const { note, time, badgeText } = await that.getUnreadedMsg(uni.getStorageSync("openid"));
              item.note = note;
              item.time = time;
              item.badgeText = badgeText;
            } catch (error) {
              console.error("Error occurred:", error);
            }
          }
          // console.log(res2);
          // this.setData({
          // 	peoplelist: friends
          // });
          this.peoplelist = friends;

          uni.setStorageSync("friend", this.peoplelists);
        },

        fail() {},
      });
      // if (app.globalData.openid) {
      // 	this.setData({
      // 		openid: app.globalData.openid,
      // 		peoplelist: app.globalData.friends
      // 	});
      // }
      // this.checkpeopleadd();
    },
    peoplepage(e) {
      console.log(e);
      /* ---处理dataset begin--- */
      this.setData(e);
      /* ---处理dataset end--- */

      e = JSON.stringify(e);
      uni.navigateTo({
        url: "/pages/chat-room/haoyoupage/haoyoupage?haoyouinfo=" + e,
        fail: function (e) {
          console.log("跳转失败", e);
        },
      });
    },
    // 去聊天室
    goToChatRoom() {
      uni.navigateTo({
        url: "/pages/chat-room/chat-room",
      });
    },
    // 预览图片
    previewImage(goodpics) {
      const urls = goodpics.map((pic) => pic.url);
      uni.previewImage({
        urls: urls,
      });
    },
    // 文本测试检测
    async onChangeInput(e) {
      console.log(e);
      const text = e.detail.value.toString();
      uni.showLoading({
        title: "文本合法性检测中",

        mask: true,
      });

      await wx.cloud
        .callFunction({
          name: "msgcheck",
          data: {
            content: text,
            openid: uni.getStorageSync("openid"),
          },
        })
        .then((ckres) => {
          console.log("文本检测--返回的结果--", ckres);
          if (ckres.result.errCode == 0 && ckres.result.result.label == 100) {
            wx.hideLoading();
            wx.showToast({
              title: "文本检测通过",
              icon: "success",
              duration: 1500,
            });
            console.log("文本检测--通过");
            this.ischeckText = true;
          } else if (ckres.result.errCode === 44004) {
            wx.hideLoading();
            wx.showToast({
              title: "文本为空",
              icon: "error",
              duration: 2000,
            });
            this.ischeckText = false;
            console.log("文本检测--不通过--文本为空");
          } else {
            wx.hideLoading();
            wx.showModal({
              title: "提示",
              content: "文本检测不通过，可能含敏感信息",
              showCancel: false,
            });
            console.log("文本检测--不通过--含敏感信息");
          }
        });
    },

    // check
    check() {
      this.$checkRegisterStatus();
    },
    //价格输入改变
    priceChange(e) {
      console.log(e);
      console.log(this.price);
    },
    async deleteUserData() {
      db.collection("user-info")
        .get()
        .then((res) => {
          console.log("最新用户数据", res);
        });
    },

    async test() {
      // 1. 获取用户信息
      let userInfo = uni.getStorageSync("userInfo");
      let _this = this;
      // 2. 判断用户是否存在
      try {
        if (!userInfo.info) {
          const showModalRes = await this.$uniAsync.showModal({
            title: "提示",
            content: "您还未登录，请登录之后，再提交审核",
          });

          if (showModalRes.confirm) {
            console.log("用户点击确定");
            uni.switchTab({
              url: "/pages/my-copy/my",
            });
          } else if (showModalRes.cancel) {
            console.log("用户点击取消");
          }
        } else {
          console.log("用户已注册");
          // this.openid = uni.getStorageSync('openid');
          // await this.$uniAsync.showModal({
          // 	title: '提示',
          // 	content: '确定要提交审核吗？',
          // 	async success(res) {
          // 		if (res.confirm) {
          // 			console.log('用户点击确定')
          // 			// 让卖家订阅消息
          // 			await _this.subscribNews();

          // 		} else if (res.cancel) {
          // 			console.log('用户点击取消')
          // 		}
          // 	}
          // })
        }
      } catch (e) {
        //TODO handle the exception
        console.log(e, "错误！！！");
      }
    },

    async getBookData(isbn) {
      let _this = this;
      console.log("get book data");
      // uni.request({
      // 	url: 'http://www.bookschina.com/ashx/AdvancedSearch.ashx',
      // 	method: 'GET',
      // 	data: {
      // 		isSpecial: false,
      // 		isbn: '9787563553075',
      // 		pageIndex: 1,
      // 		reverse: true,
      // 		sort: 0
      // 	},
      // 	header: {
      // 		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
      // 		'Accept': '*/*',
      // 		'Host': 'www.bookschina.com',
      // 		'Connection': 'keep-alive',
      // 		'content-type': 'application/x-www-form-urlencoded'

      // 	},

      // 	success: function(res) {
      // 		console.log(res.data.BookInfoEntityList);
      // 	},
      // 	fail: function(error) {
      // 		console.log(error);
      // 	}
      // });
      wx.cloud.callFunction({
        name: "books2",
        data: {
          $url: "bookinfo",
          //云函数路由参数
          isbn: 9787121181184,
        },
        success: (res1) => {
          // 无法请求该图书信息
          if (res1.result.body.BookInfoEntityList.length === 0) {
            console.log("无法请求该图书信息");
          }
          console.log("books2云函数测试打印", res1);
          let bookInfo = res1.result.body && res1.result.body.BookInfoEntityList[0];
          if (bookInfo) {
            console.log(bookInfo.AUTHOR_NAME);
            // 解构映射字段
            const {
              AUTHOR_NAME: author,
              BOOK_COVER: pic,
              BOOK_PRICE: price,
              PUBLISH_DATE: pubdate,
              PUBLISH_NAME: publisher,
              BOOK_NAME: title,
              BookIntro: summary,
              Categoryname: keyword,
            } = bookInfo;

            bookInfo = {
              author,
              pic: "http:" + pic,
              price,
              pubdate: pubdate.slice(0, 7),
              publisher,
              title,
              summary,
              keyword,
            };
            console.log("整理后的值", bookInfo);
            db.collection("books").add({
              data: bookInfo,
              success: function (res) {
                _this.setData({
                  bookInfo,
                });
                console.log("上传数据库", res);
              },
              fail: (err) => {
                console.error(err);
              },
            });
          } else {
            console.log(bookInfo, "bookInfo 无值");
          }

          // 添加到数据库
        },
        fail: (err) => {
          console.error(err);
        },
      });
      console.log("----------");
    },

    /* async addbooks(isbn) {
			let _this = this;
			wx.cloud.callFunction({
				name: 'books2',
				data: {
					$url: 'bookinfo',
					//云函数路由参数
					isbn: isbn
				},
				success: (res1) => {
					let bookInfo = res1.result.body && res1.result.body.BookInfoEntityList[0];
					// 无法请求该图书信息
					if (bookInfo && !bookInfo.length === 0) {
						// 解构赋值映射字段
						const {
							AUTHOR_NAME: author,
							BOOK_COVER: pic,
							BOOK_PRICE: price,
							PUBLISH_DATE: pubdate,
							PUBLISH_NAME: publisher,
							BOOK_NAME: title,
							BookIntro: summary,
							Categoryname: keyword
						} = bookInfo;
						
						bookInfo = {
							author,
							pic: "http:" + pic,
							price,
							pubdate: pubdate.slice(0, 7),
							publisher,
							title,
							summary,
							keyword
						}
						console.log('整理后的值', bookInfo);
						// 添加到数据库books集合
						db.collection("books").add({
							data: bookInfo,
							success: function(res) {
								_this.setData({
									bookInfo,
									show_a: false,
									show_b: true,
									show_c: false,
									active: 1
								});
								uni.hideLoading();
							},
							fail: (err) => {
								console.error(err);
							}
						})
					}
				},
				fail: (err) => {
					console.error(err);
				}
			});
		} */

    async addBooks(isbn) {
      try {
        const res1 = await wx.cloud.callFunction({
          name: "books2",
          data: {
            $url: "bookinfo",
            isbn: isbn,
          },
        });
        console.log(res1, "yun res1");

        const bookInfo = res1.result.body && res1.result.body.BookInfoEntityList[0];

        if (bookInfo && Object.keys(bookInfo).length !== 0) {
          const {
            AUTHOR_NAME: author,
            BOOK_COVER: pic,
            BOOK_PRICE: price,
            PUBLISH_DATE: pubdate,
            PUBLISH_NAME: publisher,
            BOOK_NAME: title,
            BookIntro: summary,
            Categoryname: keyword,
          } = bookInfo;

          const formattedBookInfo = {
            author,
            pic: "http:" + pic,
            price,
            pubdate: pubdate.slice(0, 7),
            publisher,
            title,
            summary,
            keyword,
          };

          console.log("整理后的值", formattedBookInfo);

          const res = await db.collection("books").add({
            data: formattedBookInfo,
          });

          this.setData({
            bookInfo: formattedBookInfo,
            show_a: false,
            show_b: true,
            show_c: false,
            active: 1,
          });

          uni.hideLoading();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
view.good-card {
  display: flex;
  padding: 20rpx;
  margin: 0 20rpx;
  background-color: #999;
  border-radius: 25rpx;

  div.left {
    margin-right: 30rpx;

    image {
      width: 125rpx;
      height: 125rpx;
    }
  }

  div.right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    div.right-top {
      display: flex;
      justify-content: space-between;

      div.title {
        font-size: 28rpx;
      }

      icon {
        width: 50rpx;
        height: 50rpx;
      }
    }

    div.right-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;

      div.price {
        color: orange;
        font-size: 30rpx;
      }

      button {
        width: auto;
        height: 55rpx;
        margin: 0;
        color: #fff;
        font-size: 28rpx;
        line-height: 55rpx;
        background-color: #ffc300;
        border-radius: 50rpx;
      }
    }
  }
}

.kind-list {
  padding: 20rpx;
}

.kind-list_item {
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  border-radius: 10rpx;
}

.kind-list_item-hd {
  padding: 20rpx;
  color: #333;
  font-size: 32rpx;
  font-weight: bold;
}

.tui-msg-box {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.tui-msg-pic {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}

.tui-msg-item {
  flex-grow: 1;
  margin-left: 20rpx;
}

.tui-msg-name {
  color: #333;
  font-size: 28rpx;
}

.tui-msg-content {
  color: #999;
  font-size: 26rpx;
}

.tui-msg-right {
  display: flex;
  align-items: center;
  padding-right: 20rpx;
}

.tui-msg-time {
  color: #999;
  font-size: 26rpx;
}

.tui-right-dot::after {
  content: "";
  display: block;
  width: 8rpx;
  height: 8rpx;
  margin-left: 10rpx;
  background-color: #f00;
  border-radius: 50%;
}

.tui-safearea-bottom {
  height: 20rpx;
  background-color: #f8f8f8;
}
</style>
