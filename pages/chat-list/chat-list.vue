<template>
  <view>
    <uni-search-bar
      v-model="searchValue"
      placeholder="搜索好友"
      @input="searchFriend" />
    <uni-section
      v-if="isSearch"
      class="mb-10"
      title="搜索结果"
      titleFontSize="30rpx"
      type="line"></uni-section>

    <uni-list
      :border="true"
      v-for="(item, index) in getList"
      :key="index">
      <uni-swipe-action>
        <uni-swipe-action-item
          :right-options="options"
          @click="onClick">
          <uni-list-chat
            :title="item.userInfo.info.nickName"
            @click="peoplepage(item, 1)"
            :clickable="true"
            :avatar="item.userInfo.info.avatarUrl"
            :note="item.note"
            :time="item.time"
            :badge-text="item.badgeText"></uni-list-chat>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </uni-list>

    <view
      v-if="searchResults.length === 0 && isSearch"
      class="no-search-result"
      >查无此人...</view
    >
  </view>
</template>

<script>
const db = wx.cloud.database();
const _ = db.command;
const MessageSubscriber = require("../../js_sdk/utils/subscrib-news.js");

export default {
  data() {
    return {
      // 好友列表
      friendList: [],
      // 搜索值
      searchValue: "",
      // 搜索好友结果
      searchResults: [],
      // 开启搜索好友
      isSearch: false,
      options: [
        {
          text: "删除",
          style: {
            backgroundColor: "#dd524d",
          },
        },
      ],
    };
  },

  mounted() {},
  onShow() {
    this.getFriendList();
  },
  // TODO 修改
  onPullDownRefresh() {
    console.log("监测到下拉 :>> ");
    this.getFriendList();
  },
  methods: {
    // 预定订阅
    async subscribNews() {
      const subscriber = new MessageSubscriber();
      const id = "nYKQaIjCDZPc7MICBPsAU7SfsVhZZdRzJhGAn_x2234"; //未读消息通知
      const tmplIdsArray = [id];

      await subscriber.subscribeNews(tmplIdsArray);
    },
    async peoplepage(e, num) {
      console.log(e, num);
      // /* ---处理dataset begin--- */
      // this.setData(e)
      // /* ---处理dataset end--- */

      // e = JSON.stringify(e);
      // uni.navigateTo({
      // 	url: '/pages/chat-room/haoyoupage/haoyoupage?haoyouinfo=' + e,
      // 	fail: function (e) {
      // 		console.log("跳转失败", e);

      // 	}
      // });
      let that = this;
      // 8. 订阅消息
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

          success: ({ confirm }) => {},
        });
      }

      const buyerInfo = uni.getStorageSync("userInfo"); // 买家信息
      const sellerInfo = e.userInfo; // 卖家信息

      const buyerOpenid = buyerInfo._openid;
      const sellerOpenid = sellerInfo._openid;

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
              "chat-list",
          });
          return;
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
            "chat-list",
        });
      }
    },
    // 滑动操作
    onClick(e) {
      console.log("点击了" + (e.position === "left" ? "左侧" : "右侧") + e.content.text + "按钮");

      // 1. 删除聊天记录的逻辑
      // 1. 弹出窗口：是否删除该聊天记录
      // 2. 点击确认则删除
    },
    // 搜索好友事件
    searchFriend(e) {
      uni.showLoading({
        title: "加载中",
        mask: true,
      });

      if (e === "") {
        this.isSearch = false;
        uni.hideLoading();

        return;
      }

      this.debounce(() => {
        this.isSearch = true;

        console.log("触发 :>> ", e); // e.value
        const friendNameKey = e;
        // 筛选符合关键词的名字
        const searchResults = this.friendList.filter((item) => item.userInfo.info.nickName.includes(friendNameKey));

        console.log("searchResults :>> ", searchResults);
        this.searchResults = searchResults;
        uni.hideLoading();
      }, 1000)();
    },
    debounce(func, delay) {
      let timeoutId;

      return function (...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    // 获取好友列表
    getFriendList: async function (options) {
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      //重新更新好友列表
      await wx.cloud.callFunction({
        name: "yunrouter",

        data: {
          $url: "HuoquFriends",

          //云函数路由参数
          openid: uni.getStorageSync("openid"),
        },

        success: async (res2) => {
          let that = this;
          // 获取好友列表
          const friends = res2.result.data[0].friends;
          // 获取最新的好友信息
          /* for (const item of friends) {
            try {
              // 获取最新的好友信息
              const { data } = await db.collection("user").doc(item.userInfo._id).get();
              console.log("获取最新的好友信息data :>> ", data);

              const friendInfo = data;

              // 比对头像和昵称是否有变化
              if (friendInfo.info.avatarUrl !== item.userInfo.info.avatarUrl && friendInfo.info.nickName !== item.userInfo.info.nickName) {
                console.log("头像或昵称有变化");
              }
              // 更新好友信息
              item.userInfo = friendInfo;

              console.log(friendInfo, "frinedInfo");
              // 将头像云地址替换成本地临时地址，否则无法显示
              const res = await uni.getImageInfo({ src: item.userInfo.info.avatarUrl });
              item.userInfo.info.avatarUrl = res[1].path;
              // 处理未读消息相关信息
              const { note, time, badgeText } = await that.getUnreadedMsg(item.userInfo._openid);
              item.note = note;
              item.time = time;
              item.badgeText = badgeText;
            } catch (error) {
              console.error("For Friends Error occurred:", error);
            }
          } */
          // TODO 优化
          const promises = friends.map(async (item, index) => {
            try {
              // 获取最新的好友信息
              const { data } = await db.collection("user").doc(item.userInfo._id).get();
              const friendInfo = data;
              console.log("data,index :>> ", data, index);
              // 比对头像和昵称是否有变化
              if (friendInfo.info.avatarUrl !== item.userInfo.info.avatarUrl || friendInfo.info.nickName !== item.userInfo.info.nickName) {
                console.log("头像或昵称有变化");
              }
              // 更新好友信息
              item.userInfo = friendInfo;
              console.log("test1 :>> ");
              // 将头像云地址替换成本地临时地址，否则无法显示
              const res = await uni.getImageInfo({ src: item.userInfo.info.avatarUrl });
              console.log("res :>> ", res);
              item.userInfo.info.avatarUrl = res[1].path;
              console.log("test2 :>> ");
              // 处理未读消息相关信息
              const { note, time, badgeText } = await that.getUnreadedMsg(item.userInfo._openid);
              console.log("note :>> ", note);
              item.note = note;
              item.time = time;
              item.badgeText = badgeText;
            } catch (error) {
              console.error("For Friends Error occurred:", error);
            }
          });

          await Promise.all(promises);
          if (friends.length === 0) {
            uni.hideLoading();
            return;
          }
          // 将聊天列表按时间进行排序
          friends.sort((a, b) => b.time - a.time);
          this.friendList = friends;
          uni.setStorageSync("friend", this.friendList);
          uni.hideLoading();
        },

        fail(err) {
          console.warn("获取好友列表失败 :>> ", err);
          uni.hideLoading();
        },
      });
    },
    // 获取未读信息
    async getUnreadedMsg(openid) {
      // 获取未读消息
      let unreadres = await db
        .collection("chatroom_example")
        .where(
          this.mergeCommonCriteria({
            readed: 0,
            _openid: openid,
          })
        )
        .get();

      let mysendmsg = await db
        .collection("chatroom_example")
        .where(
          this.mergeCommonCriteria({
            // _openid: uni.getStorageSync("openid"),
            groupId: this.chatRoomGroupId,
          })
        )
        .orderBy("sendTimeTS", "desc") // 按时间戳字段降序排序
        .limit(1) // 限制返回一条记录
        .get();

      let unreadedList = unreadres.data;
      let readedList = mysendmsg.data;

      console.log("未读消息列表 :>> ", unreadedList);
      console.log("我的消息列表 :>> ", readedList);
      // 1. 如果有未读消息
      if (unreadedList.length > 0) {
        uni.stopPullDownRefresh();

        return {
          note: unreadedList[unreadedList.length - 1].textContent === "发送了商品卡片" ? "商品卡片" : unreadedList[unreadedList.length - 1].textContent,
          time: unreadedList[unreadedList.length - 1].sendTime,
          badgeText: unreadedList.length,
        };
      } else {
        uni.stopPullDownRefresh();

        // 2. 没有未读消息，显示我发送的最后一条消息并且不显示badgeText
        return {
          note: readedList[readedList.length - 1].textContent === "发送了商品卡片" ? "商品卡片" : readedList[readedList.length - 1].textContent,
          time: readedList[readedList.length - 1].sendTime,
          badgeText: 0,
        };
      }
    },
    // 整合共同查询条件
    mergeCommonCriteria(criteria) {
      console.log("mergeCommonCriteria查询条件 :>> ", criteria, this.groupId);
      return {
        //groupId是聊天室的名字，
        //自己可以利用Id给每个卖家创建一下之类的，用id当名字
        //同一个卖家的大家都进到这个聊天室中

        //或者商品一开始上传的时候给他带一个属性就是聊太的属性就行，正好也可以当作评论的属性
        groupId: this.groupId,
        ...criteria,
      };
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
    // 获取openid
    async initOpenID() {
      return this.tryFun(async () => {
        const openId = await this.getOpenIDFun();
        this.setData({
          openId,
        });
      }, "初始化 openId 失败");
    },
  },
  computed: {
    getList() {
      return this.isSearch ? this.searchResults : this.friendList;
    },
  },
};
</script>

<style lang="scss" scoped>
.no-search-result {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 28rpx;
  transform: translate(-50%, -50%);
}
</style>
