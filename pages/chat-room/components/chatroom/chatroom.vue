<template>
  <view style="height: 100%">
    <image
      v-if="!backgroundimage"
      class="bg"
      src="/static/images/startBg.jpg"></image>
    <image
      v-if="backgroundimage"
      class="bg"
      :src="backgroundimage"></image>

    <view class="chatroom">
      <view
        class="good-card-wrap"
        v-if="isShowThisGood">
        <view class="good-card">
          <div class="left">
            <image
              :src="goodInfo.show.pic"
              mode="scaleToFill"
              @click="toDetail" />
          </div>
          <div class="right">
            <div class="right-top">
              <div class="title">{{ goodInfo.show.title }}</div>
              <uni-icons
                type="closeempty"
                size="20"
                color="#666666"
                @click.stop="closeThisGood"></uni-icons>
            </div>
            <div class="right-bottom">
              <div class="price">￥{{ goodInfo.show.price }}.00</div>
              <button
                open-type=""
                hover-class="button-hover"
                @click="sendThisGood">
                发送商品
              </button>
            </div>
          </div>
        </view>
      </view>

      <!-- chats -->
      <scroll-view
        class="body"
        scroll-y
        :scroll-with-animation="scrollWithAnimation"
        :scroll-top="scrollTop"
        :scroll-into-view="scrollToMessage"
        @scrolltoupper="onScrollToUpper">
        <view
          :id="'item-' + index"
          :class="'message ' + (openId == item._openid ? 'message__self' : '')"
          v-for="(item, index) in chats"
          :key="index">
          <image
            class="avatar"
            :src="item.avatar"
            mode="scaleToFill"></image>

          <view class="main">
            <!-- <view class="nickname">{{item.sendTime}}</view> -->
            <view class="nickname">{{ item.nickName }}</view>
            <block v-if="item.msgType === 'image'">
              <view class="image-wrapper">
                <view
                  class="loading"
                  v-if="item.writeStatus > -1 && item.writeStatus != null"
                  >{{ item.writeStatus }}%
                </view>
                <image
                  :src="item.tempFilePath || item.imgFileID"
                  :data-fileid="item.tempFilePath || item.imgFileID"
                  class="image-content"
                  :style="item.imgStyle"
                  mode="scallToFill"
                  @tap="onMessageImageTap">
                </image>
              </view>
            </block>
            <block v-if="item.msgType === 'text'">
              <view class="text-wrapper">
                <view
                  class="loading"
                  v-if="item.writeStatus === 'pending'"
                  >···</view
                >
                <view class="text-content">{{ item.textContent }}</view>
              </view>
            </block>
            <!-- <block v-if="item.msgType === 'record'">
              <view
                class="text-wrapper"
                :data-file="item.recordID"
                @tap="play">
                <view
                  class="loading"
                  v-if="item.writeStatus === 'pending'"
                  >···</view
                >
                <image
                  src="/static/image/listen.png"
                  class="image-content2"
                  mode="scallToFill"></image>
              </view>
            </block> -->
            <!-- <block v-if="item.msgType === 'file'">
              <view
                class="text-wrapper"
                :data-file="item.FileID"
                @tap="downloadfile">
                <view
                  class="loading"
                  v-if="item.writeStatus === 'pending'"
                  >···</view
                >
                <view
                  style="
                    background-image: url(https://636f-code-test-1301231348.tcb.qcloud.la/file.png?sign=b3d457b31c08be2b72243eaa24704271&t=1586012519);
                    width: 14vh;
                    height: 14vh;
                    background-size: 100% 100%;
                    text-align: center;
                  "
                  class="image-content1">
                  {{ item.filename }}
                </view>
              </view>
            </block> -->
            <block v-if="item.msgType === 'card'">
              <van-card
                :thumb-link="thumblink + item.goodInfo._id"
                :price="item.goodInfo.show.price"
                :desc="item.goodInfo.show.author || ''"
                :title="item.goodInfo.show.title"
                :thumb="item.goodInfo.show.pic" />
            </block>
          </view>
        </view>
      </scroll-view>

      <!-- message sender -->
      <view class="footer">
        <view
          class="message-sender"
          v-if="userInfo">
          <image
            src="/static/images/chat/photo.png"
            class="btn-send-image"
            mode="scaleToFill"
            @tap="onChooseImage">
          </image>

          <input
            class="text-input"
            type="text"
            confirm-type="send"
            @input="textInputOnChange"
            @confirm="onConfirmSendText"
            cursor-spacing="20"
            :value="textInputValue" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
var util = require("../../../../util.js");
const FATAL_REBUILD_TOLERANCE = 10;
const SETDATA_SCROLL_TO_BOTTOM = {
  scrollTop: 100000,
  scrollWithAnimation: true,
};
const db = wx.cloud.database();
import VanCard from "../../../../wxcomponents/vant/card";
import VanTag from "../../../../wxcomponents/vant/tag";
import VanButton from "../../../../wxcomponents/vant/button";

export default {
  components: {
    VanCard,
    VanTag,
    VanButton,
  },
  data() {
    return {
      thumblink: `/pages/good-detail/good-detail?goodId=`,
      isShowThisGood: false,
      listening: false,
      chats: [],
      textInputValue: "",
      openId: "",
      scrollTop: 0,
      scrollToMessage: "",
      hasKeyboard: false,
      tempFilePathrecord: "",
      flag: 0,
      scrollWithAnimation: false,
      goodInfo: {
        title: "",
        price: 0,
        pic: "",
      },
      recordMsgCount: 0,
    };
  },
  props: {
    envId: String,
    collection: String,
    groupId: String, // 上个页面传过来的
    groupName: String,
    userInfo: Object, // 买家，当前登录用户
    sellerInfo: Object, // 卖家
    backgroundimage: String,
    haoyou_openid: String,
    from: String,
    goodId: String,
  },
  methods: {
    async ready() {
      global.chatroom = this;
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      await this.getGoodInfo(this.from, this.goodId);
      await this.initRoom(this.from);
      console.log("goodid :>> ", this.goodId);
      this.fatalRebuildCount = 0;
    },
    // 监听文本输入框改变
    textInputOnChange(e) {
      // 增加textInputValue的响应式
      this.textInputValue = e.target.value;
    },
    // 跳转详情页面
    toDetail() {
      uni.navigateBack({ delta: 1 });
    },
    // 关闭商品卡片
    closeThisGood() {
      this.isShowThisGood = false;
    },
    // 发送商品卡片
    sendThisGood() {
      // 点击发送该商品
      // 从商品详情页面来的
      console.log("from :>> ", this.from);
      // 有可能是good或者book
      if (this.from !== "chat-list") {
        this.$nextTick(async () => {
          // if(this.from === 'good-detail')
          let { title, author, price, pic } = this.from === "good-detail" ? this.goodInfo.show : this.goodInfo;
          const showCard = {
            title,
            author,
            price,
            pic,
          };
          const doc = {
            _id: `${Math.random()}_${Date.now()}`,
            groupId: this.groupId,
            avatar: this.userInfo.info.avatarUrl,
            nickName: this.userInfo.info.nickName,
            msgType: "card",
            textContent: "发送了商品卡片",
            sendTime: util.formatTime(new Date()),
            sendTimeTS: Date.now(),
            readed: 0,
            goodInfo: this.goodInfo,
            showCard,
          };
          this.setData({
            chats: [
              ...this.chats,
              {
                ...doc,
                _openid: this.openId,
                writeStatus: "pending",
              },
            ],
          });
          this.scrollTop = 10000;
          await db.collection("chatroom_example").add({
            data: doc,
          });
          this.setData({
            chats: this.chats.map((chat) => {
              if (chat._id === doc._id) {
                return {
                  ...chat,
                  writeStatus: "written",
                };
              } else {
                return chat;
              }
            }),
            isShowThisGood: false,
          });
        });
      }
    },
    // 获取商品信息
    async getGoodInfo(from, goodId) {
      const collectionName = from === "good-detail" ? "goods" : from === "book-detail" ? "books" : null;

      if (!collectionName) {
        return;
      }

      await db
        .collection(collectionName)
        .doc(goodId)
        .get()
        .then((result) => {
          console.log("获取商品数据成功 :>> ", result);
          this.goodInfo = result.data;
          let { title, price, author, pic } = result.data;
          if (collectionName === "goods") pic = result.data.pics[0].url;
          this.goodInfo.show = {
            title,
            author,
            price,
            pic,
          };
          this.isShowThisGood = true;
        });
    },
    // 获取用户openid
    getOpenID: async function () {
      if (this.openid) {
        return this.openid;
      }
      const { result } = await wx.cloud.callFunction({
        name: "yunrouter",
        data: {
          $url: "openid",
        },
      });
      return result;
    },
    // 初始化用户openid
    async initOpenID() {
      return this.tryFun(async () => {
        const openId = await this.getOpenID();
        this.setData({
          openId,
        });
        console.log("初始化openId :>> ", this.openId);
      }, "初始化 openId 失败");
    },
    // 整合查询条件
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
    // 初始化聊天室
    async initRoom(from) {
      this.tryFun(async () => {
        await this.initOpenID();
        console.log("this", this);
        // 获取配置中的配置信息
        const { envId, collection } = this;
        // 设置db
        const db = (this.db = wx.cloud.database({
          env: envId,
        }));
        const _ = db.command;
        // 获取对应聊天室id的聊天记录，并将查询结果按照 'sendTimeTS' 字段进行降序排列。
        const { data: initList } = await db.collection(collection).where(this.mergeCommonCriteria()).orderBy("sendTimeTS", "desc").get();
        console.log("初始化查询聊天记录", initList, this.userInfo);

        this.setData({
          chats: initList.reverse(), // 反转数组
          scrollTop: 10000, // 将聊天界面滚动到底部，以便能够看到最新的消息
        });
        this.initWatch(
          initList.length
            ? {
                //条件对象，用于筛选需要监听的消息
                sendTimeTS: _.gt(initList[initList.length - 1].sendTimeTS), // 比当前聊天记录中最后一条消息的时间还要大的值
              }
            : {}
        );
      }, "初始化失败");
    },

    // 初始化监听
    async initWatch(criteria) {
      this.tryFun(() => {
        const { envId, collection } = this;
        const db = (this.db = wx.cloud.database({
          env: envId,
        }));
        const _ = db.command;
        console.warn(`开始监听`, criteria);
        /* ---------------开始监听--------------- */
        this.messageListener = db
          .collection(collection)
          //对当前聊天id相关的，且sendTimeTS大于最后一条记录的更新开启监听
          // watch可以监听集合中符合查询条件的数据的更新事件
          .where(this.mergeCommonCriteria(criteria))
          .watch({
            onChange: this.onRealtimeMessageSnapshot.bind(this),
            onError: (e) => {
              if (!this.inited || this.fatalRebuildCount >= FATAL_REBUILD_TOLERANCE) {
                this.showError(this.inited ? "监听错误，已断开" : "初始化监听失败", e, "重连", () => {
                  this.initWatch(
                    this.chats.length
                      ? {
                          sendTimeTS: _.gt(this.chats[this.chats.length - 1].sendTimeTS),
                        }
                      : {}
                  );
                });
              } else {
                this.initWatch(
                  this.chats.length
                    ? {
                        sendTimeTS: _.gt(this.chats[this.chats.length - 1].sendTimeTS),
                      }
                    : {}
                );
              }
            },
          });
      }, "初始化监听失败");
      uni.hideLoading();
    },
    // 处理实时消息快照
    async onRealtimeMessageSnapshot(snapshot) {
      console.warn(`收到消息`, snapshot);
      if (snapshot.type === "init") {
        this.setData({
          chats: [...this.chats, ...[...snapshot.docs].sort((x, y) => x.sendTimeTS - y.sendTimeTS)], //将新消息追加到聊天记录中，确保按照时间顺序
        });

        await db
          .collection("chatroom_example")
          .where(
            this.mergeCommonCriteria({
              readed: 0,
              _openid: this.haoyou_openid,
            })
          )
          .update({
            data: {
              readed: 1,
            },
            success: function (res) {
              console.log("已读该消息", res);
            },
          });
        /* .doc(docChange.doc._id).update({
									data: {
										readed: 1
									},
									success: function (res) {
										console.log('已读该消息', res);
									}
								}) */
        this.scrollToBottom(); //完成初始化
        this.inited = true;
      } else {
        //不是首次加载聊天记录
        let hasNewMessage = false;
        let hasOthersMessage = false;
        const chats = [...this.chats];
        console.log("old", chats);
        for (const docChange of snapshot.docChanges) {
          switch (docChange.queueType) {
            case "enqueue": {
              // 消息不是自己发的
              hasOthersMessage = docChange.doc._openid !== this.openId;
              const ind = chats.findIndex((chat) => chat._id === docChange.doc._id);
              console.log("找到拉", ind);
              if (ind > -1) {
                // 消息是我自己发的
                if (chats[ind].msgType === "image" && chats[ind].tempFilePath) {
                  chats.splice(ind, 1, {
                    ...docChange.doc,
                    tempFilePath: chats[ind].tempFilePath,
                  });
                } else {
                  chats.splice(ind, 1, docChange.doc);
                  console.log("new", chats);
                }
              } else {
                // 消息是对方发的，并且此时在聊天室中，说明已读
                hasNewMessage = true;
                console.log("有新消息拉", docChange, new Date());
                chats.push(docChange.doc);
                await db
                  .collection("chatroom_example")
                  .doc(docChange.doc._id)
                  .update({
                    data: {
                      readed: 1,
                    },
                    success: function (res) {
                      console.log("已读该消息", res);
                    },
                  });
              }
              break;
            }
          }
        }
        this.setData({
          chats: chats.sort((x, y) => x.sendTimeTS - y.sendTimeTS),
        });
        if (hasOthersMessage || hasNewMessage) {
          this.scrollToBottom();
        }
      }
    },

    //发送订阅消息的提醒
    send_tixing() {
      console.log(this.haoyou_openid);
      if (this.haoyou_openid == "none") {
        console.log("group_chat");
      } else {
        console.log("personal_chat");
        // 这是私人聊天的话，就可以发送订阅消息的提醒了
        const item = {
          thing1: {
            value: this.groupName,
          },
          time2: {
            value: util.formatTime(new Date()),
          },
          thing3: {
            value: "您有新的消息提醒，请尽快查看",
          },
        };
        wx.cloud.callFunction({
          name: "yunrouter",
          data: {
            $url: "tixing",
            haoyou_openid: this.haoyou_openid,
            data: item, //和订阅消息保持一致的推送的消息
          },

          success: (res) => {
            console.log(res, "订阅消息发送成功");
          },
          fail: (error) => {
            console.log(error);
          },
        });
      }
    },

    // 发送文字
    async onConfirmSendText(e) {
      this.tryFun(async () => {
        if (!e.detail.value) {
          return;
        }
        const { collection } = this;
        const db = this.db;
        const _ = db.command;

        if (this.groupId === "firstChat") {
          this.groupId = this.haoyou_openid + this.userInfo._openid;
          console.log("请注意第一次建立chatroom");
          // 请求添加卖家为好友
          await wx.cloud.callFunction({
            name: "yunrouter",
            data: {
              $url: "addpeople", //云函数路由参数

              addpeopleid: this.haoyou_openid, //应该应答请求的那个人
              askpeopleid: this.userInfo._openid, //我自己，发出请求的人
              peopleask: this.userInfo,
              peopleadd: this.sellerInfo,
              chatid: this.haoyou_openid + this.userInfo._openid,
            },
            success: async (res) => {
              // 卖家获取买家的请求添加信息
              const result = await db
                .collection("addpeople")
                .where({
                  addpeopleid: this.haoyou_openid, //应该接受好友请求的那个人的openid
                  askpeopleid: this.userInfo._openid,
                  status: 0,
                })
                .get();
              console.log("卖家获取买家的请求添加信息", result);
              // 为双方添加friend标致
              wx.cloud.callFunction({
                name: "yunrouter",
                data: {
                  $url: "confirmpeopleadd",
                  //云函数路由参数
                  peopleconfim: result.data[0],
                },
                success: (res) => {
                  console.log("为双方添加friend标致", res);
                },
                fail() {},
              });
              console.log("请求成功");
            },
            fail() {},
          });
        }
        const doc = {
          _id: `${Math.random()}_${Date.now()}`,
          groupId: this.groupId,
          avatar: this.userInfo.info.avatarUrl,
          nickName: this.userInfo.info.nickName,
          msgType: "text",
          textContent: e.detail.value,
          sendTime: util.formatTime(new Date()),
          sendTimeTS: Date.now(),
          readed: 0, // fallback
        };

        this.setData({
          textInputValue: "",
          chats: [
            ...this.chats,
            {
              ...doc,
              _openid: this.openId,
              writeStatus: "pending",
            },
          ],
        });
        this.$nextTick(() => {
          this.scrollTop = this.scrollTop + 1;
          this.textInputValue = "";
        });

        await db.collection(collection).add({
          data: doc,
        });
        this.setData({
          chats: this.chats.map((chat) => {
            if (chat._id === doc._id) {
              return {
                ...chat,
                writeStatus: "written",
              };
            } else {
              return chat;
            }
          }),
        });
        // 记录发送消息的数量
        this.recordMsgCount++;
        // this.send_tixing();
      }, "发送文字失败");
    },

    // 发送图片
    async onChooseImage(e) {
      uni.chooseImage({
        count: 1,
        sourceType: ["album", "camera"],
        success: async (res) => {
          const { envId, collection } = this;
          const doc = {
            _id: `${Math.random()}_${Date.now()}`,
            groupId: this.groupId,
            avatar: this.userInfo.info.avatarUrl,
            nickName: this.userInfo.info.nickName,
            msgType: "image",
            textContent: "[图片]",
            sendTime: util.formatTime(new Date()),
            sendTimeTS: Date.now(), // fallback
          };

          this.setData({
            chats: [
              ...this.chats,
              {
                ...doc,
                _openid: this.openId,
                tempFilePath: res.tempFilePaths[0],
                writeStatus: 0,
              },
            ],
          });
          this.$nextTick(() => {
            this.scrollTop = this.scrollTop + 1;
          });
          const uploadTask = wx.cloud.uploadFile({
            cloudPath: `办公交流/${this.groupId}/${this.userInfo.info.nickName}/${Math.random()}_${Date.now()}.${res.tempFilePaths[0].match(/\.(\w+)$/)[1]}`,
            filePath: res.tempFilePaths[0],
            config: {
              env: envId,
            },
            success: (res) => {
              this.tryFun(async () => {
                await this.db.collection(collection).add({
                  data: {
                    ...doc,
                    imgFileID: res.fileID,
                  },
                });
              }, "发送图片失败");
            },
            fail: (e) => {
              this.showError("发送图片失败", e, "", "");
            },
          });
          uploadTask.onProgressUpdate(({ progress }) => {
            this.setData({
              chats: this.chats.map((chat) => {
                if (chat._id === doc._id) {
                  return {
                    ...chat,
                    writeStatus: progress,
                  };
                } else {
                  return chat;
                }
              }),
            });
            // 记录发送消息的数量
            this.recordMsgCount++;
          });
        },
      });
    },

    // 图片预览
    onMessageImageTap(e) {
      uni.previewImage({
        urls: [e.target.dataset.fileid],
      });
    },
    // 滚到底部
    scrollToBottom(force) {
      if (force) {
        console.log("force scroll to bottom");
        this.setData(SETDATA_SCROLL_TO_BOTTOM);
        return;
      }
      uni
        .createSelectorQuery()
        .in(this)
        .select(".body")
        .boundingClientRect((bodyRect) => {
          uni
            .createSelectorQuery()
            .in(this)
            .select(`.body`)
            .scrollOffset((scroll) => {
              if (scroll.scrollTop + bodyRect.height * 3 > scroll.scrollHeight) {
                console.log("should scroll to bottom");
                this.setData(SETDATA_SCROLL_TO_BOTTOM);
              }
            })
            .exec();
        })
        .exec();
    },
    // 滚到顶部触发的事件
    async onScrollToUpper() {
      // 检查数据库是否初始化并且聊天记录数组不为空
      if (this.db && this.chats.length) {
        // 配置信息
        const { collection } = this;
        const _ = this.db.command;
        const { data } = await this.db
          .collection(collection)
          .where(
            this.mergeCommonCriteria({
              sendTimeTS: _.lt(this.chats[0].sendTimeTS),
            })
          )
          .orderBy("sendTimeTS", "desc")
          .get();
        this.chats.unshift(...data.reverse());
        /* this.setData({
					// chats: this.chats,
					scrollToMessage: `item-${data.length}`,
					scrollWithAnimation: false
				}); */
        // this.scrollToMessage = `item-${data.length}`;
        // this.scrollWithAnimation = false;
        // 先设置为一个临时值
        this.scrollToMessage = "temp";
        // 使用$nextTick来确保在DOM更新后再设置scrollToMessage
        this.$nextTick(() => {
          this.scrollToMessage = `item-${data.length}`;
        });
        this.scrollWithAnimation = false;
      }
    },
    // 异步操作函数
    async tryFun(fn, title) {
      try {
        await fn();
      } catch (e) {
        console.log("CatchClause", e);
        console.log("CatchClause", e);
        this.showError(title, e, "", "");
      }
    },
    // 显示错误
    showError(title, content, confirmText, confirmCallback) {
      console.error(title, content);
      uni.showModal({
        title,
        content: content.toString(),
        showCancel: confirmText ? true : false,
        confirmText,
        success: (res) => {
          if (res.confirm) {
            confirmCallback();
          }
        },
      });
    },
  },
  mounted() {
    // 处理小程序 ready 生命周期
    this.$nextTick(() => this.ready());
  },
  created: function () {},
  destroyed: function () {
    if (this.recordMsgCount > 0) {
      // 发送订阅消息的提醒
      this.send_tixing();
    }
    console.warn("关闭监听", this.messageListener);
    this.messageListener.close();
  },
};
</script>
<style lang="scss" scoped>
.good-card-wrap {
  border-bottom: 1rpx solid #e9e9e9;
  background-color: #f7f8fa;

  view.good-card {
    display: flex;
    padding: 20rpx 30rpx;

    div.left {
      margin-right: 30rpx;

      image {
        width: 110rpx;
        height: 110rpx;
        border-radius: 15rpx;
      }
    }

    div.right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      div.right-top {
        display: flex;
        justify-content: space-between;

        div.title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 28rpx;
        }
      }

      div.right-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;

        div.price {
          color: #f30;
          font-size: 30rpx;
        }

        button {
          margin: 0;
          width: auto;
          height: 52rpx;
          border-radius: 50rpx;
          background-color: orange;
          color: #fff;
          font-size: 28rpx;
          line-height: 52rpx;
        }
      }
    }
  }
}

.bg {
  position: absolute;
  top: 0rpx;
  left: 0rpx;
  z-index: -1;
  width: 100%;
  height: 100%;
}

.chatroom {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.chatroom .header {
  display: flex;
  flex-basis: fit-content;
  flex-direction: row;
  padding: 20rpx 0 30rpx;
  border-bottom: 1px solid #ddd;
  font-size: 30rpx;
}

.chatroom .header .left {
  flex: 1;
}

.chatroom .header .middle {
  flex: 8;
  text-align: center;
}

.chatroom .header .right {
  flex: 1;
}

.chatroom .body {
  display: flex;
  flex: 2;
  height: 78vh;
  background: #f7f8fa;
}

.body .message {
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 12rpx 0;
}

.body .message.message__self {
  flex-direction: row-reverse;
}

.body .message .avatar {
  position: relative;
  top: 5rpx;
  margin: 15rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 5rpx;
}

.body .message .main {
  display: flex;
  align-items: flex-start;
  flex: 1;
  flex-direction: column;
}

.body .message.message__self .main {
  align-items: flex-end;
}

.body .message .nickname {
  color: #444;
  font-size: 24rpx;
}

.body .message .text-content {
  display: inline-block;
  margin: 2px 0 0 0;
  padding: 4px 10px;
  border: 1px solid transparent;
  border-radius: 3px;
  background-color: #fff;
  font-size: 30rpx;
}

.body .message.message__self .text-content {
  background-color: rgb(158, 234, 106);
}

.body .message .text-wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
  max-width: 80%;
}

.body .message.message__self .text-wrapper .loading {
  margin-right: 18rpx;
  font-size: 16rpx;
}

.body .message .image-wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.body .message .image-content {
  max-width: 240rpx;
  max-height: 240rpx;
}

.body .message .image-content1 {
  max-width: 240rpx;
  max-height: 240rpx;
}

.body .message .image-content2 {
  max-width: 10vw;
  max-height: 5vh;
}

.body .message.message__self .image-wrapper .loading {
  margin-right: 18rpx;
  font-size: 20rpx;
}

.chatroom .footer {
  display: flex;
  flex-basis: fit-content;
  flex-direction: row;
  padding: 20rpx 30rpx;
  border-top: 1px solid #ddd;
  background: #e9e9e9;
  font-size: 10rpx;
}

.chatroom .footer .message-sender {
  display: flex;
  flex: 1;
  flex-direction: row;
}

.message-sender .text-input {
  flex: 1;
  margin: 0 5px 0 10px;
  padding: 3px 6px;
  height: 60rpx;
  border: 1px solid transparent;
  border-radius: 10px;
  background: rgb(255, 255, 255);
  font-size: 16px;
}

.message-sender .btn-send-image {
  align-self: center;
  margin-left: 10px;
  width: 30px;
  height: 30px;
}

button {
  font-size: 30rpx;
}

button.userinfo {
  padding: 0 100rpx;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: darkturquoise;
  color: aliceblue;
}
</style>
