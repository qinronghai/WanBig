<template>
  <div id="page">
    <!-- fake page -->

    <!-- 切换导航 -->
    <VanTabs
      :activePage="activePage"
      animated
      class="van-tabs"
      color="#ffc300"
      swipeable
      background="#e9e9e9">
      <!-- 商品发布 -->
      <VanTab
        title="商品发布"
        class="good-container"
        color="#ffc300">
        <!-- 商品描述文本组件 -->
        <uni-goods-desc
          ref="descRef"
          v-on:getGoodTitle="getGoodTitle"
          class="uni-goods-desc"></uni-goods-desc>
        <!-- 照片部分 -->
        <div class="center-wrap">
          <div class="goods-pictures shadow">
            <van-uploader
              class="uploader"
              max-count="3"
              multiple="true"
              :file-list="fileList"
              @delete="deleteImg"
              @after-read="afterRead" />
          </div>
        </div>
        <!-- 商品信息相关 -->
        <div class="goods-wrap">
          <div class="top shadow">
            <div class="top__item price">
              <div class="left">
                <image
                  src="../../static/release/price.svg"
                  class="icon"></image>
                <div class="txt">价格</div>
              </div>
              <div class="input">
                <uni-number-box
                  :value="price"
                  integer
                  @change="priceChange"
                  :min="1"
                  :max="1000">
                </uni-number-box>
              </div>
            </div>
          </div>
          <!-- 底部区域-商品分类 -->
          <div class="bottom shadow">
            <!-- 商品分类 -->
            <div
              class="bottom__item category"
              @click="showCategoryPopup">
              <div class="left">
                <image
                  src="../../static/release/category.svg"
                  class="icon"></image>
                <div class="txt">商品分类 (必选)</div>
              </div>
              <div class="option">
                <van-icon
                  v-show="showCategoryArrow"
                  name="arrow"
                  size="18px" />
                <div v-show="!showCategoryArrow">{{ category }}</div>
              </div>
            </div>
            <!-- 商品分类-弹出框 -->
            <van-popup
              duration="900"
              :show="showGoodsCategory"
              round
              position="bottom"
              custom-style="height: 40%"
              @close="onCloseGoodsCategory"
              closeable>
              <div class="goods-category">
                <div
                  class="goods-category__item"
                  v-for="item in navList"
                  :key="item.id">
                  <div
                    class="goods-category__item--block"
                    @click="handleCategoryPopup(item.id)">
                    <image
                      class="icon"
                      :src="item.img" />
                    <div
                      class="txt"
                      :class="{ active: item.id === clickCateIndex }">
                      {{ item.txt }}
                    </div>
                  </div>
                </div>
              </div>
            </van-popup>
            <!-- 商品成色 -->
            <div
              @click="showConditionPopup"
              class="bottom__item">
              <div class="left">
                <image
                  src="../../static/release/goods-condition.svg"
                  class="icon"></image>
                <div class="txt">商品成色</div>
              </div>
              <div class="option">
                <van-icon
                  v-show="showQualityArrow"
                  name="arrow"
                  size="18px" />
                <div v-show="!showQualityArrow">{{ condition }}</div>
              </div>
            </div>
            <!-- 商品成色-弹出框 -->
            <van-popup
              duration="900"
              :show="showGoodQuality"
              round
              position="bottom"
              custom-style="height: 40%"
              @close="onCloseGoodQuality"
              closeable>
              <div class="goods-condition">
                <div
                  class="goods-condition__item"
                  v-for="(item, index) in conditionList"
                  :key="index"
                  @click="handleConditionPopup(index)">
                  <div class="goods-condition__item--block">
                    <div
                      class="txt"
                      :class="{ active: index === rightIndex }">
                      {{ item.title }}
                    </div>
                  </div>
                </div>
              </div>
            </van-popup>
          </div>
        </div>
        <!-- 配送相关 -->
        <div class="send-wrap shadow">
          <!-- 取货方式 -->
          <div class="delivery">
            <div class="left">
              <image
                src="../../static/release/transport.svg"
                class="icon"></image>
              <div class="txt">取货方式</div>
            </div>
            <div class="options">
              <radio-group @change="deliveryRadioChange">
                <label class="radio-sell">
                  <radio
                    color="#ffc300"
                    value="自提"
                    :checked="deliveryRadio"
                    style="transform: scale(0.7)" />自提
                </label>
                <label class="radio">
                  <radio
                    color="#ffc300"
                    value="配送"
                    :checked="!deliveryRadio"
                    style="transform: scale(0.7)" />配送
                </label>
              </radio-group>
            </div>
          </div>
          <!-- 详细地址 -->
          <div
            class="floor-num"
            v-if="delivery == '自提'">
            <view class="input-place">
              <input
                maxlength="20"
                placeholder="请输入您的详细地址"
                :value="place"
                @input="placeChange" />
            </view>
          </div>
        </div>
        <!-- 商品备注 和 提示 -->
        <view class="note-tips-wrap shadow">
          <view class="b_bar">
            <view class="name">备注信息</view>
            <view class="b_nobi">※ 非必填</view>
          </view>
          <view class="b_notes">
            <view class="b_text">
              <textarea
                :value="notes"
                @input="noteChange"
                maxlength="50"
                placeholder="请随便说点相关的"></textarea>
              <view class="b_less">{{ note_counts }}/50</view>
            </view>
          </view>
          <view class="b_bar">
            <view class="name">发布时长(天)</view>
            <uni-number-box
              :value="dura"
              integer
              @change="duraChange"
              :min="1"
              :max="50">
            </uni-number-box>
          </view>
          <view class="b_tips">
            <text>*</text>
            此时长内您的发布信息将会展示给所有同学，超时后您只需去个人中心处擦亮即可再次展示
          </view>
        </view>
        <!-- 提交按钮 -->
        <view class="submit_btn">
          <button
            class="btn"
            type="primary"
            @click="handleClickSubmit">
            提交审核
          </button>
        </view>
      </VanTab>
      <!-- 图书发布 -->
      <VanTab title="图书发布">
        <uni-book-release></uni-book-release>
      </VanTab>
    </VanTabs>
  </div>
</template>

<script>
import UniGoodsDesc from "./components/uni-goods-desc.vue";
import UniBookRelease from "./components/uni-book-release.vue";
import VanIcon from "../../wxcomponents/vant/icon";
import VanPopup from "../../wxcomponents/vant/popup/index";
import VanPicker from "../../wxcomponents/vant/picker";
import VanTab from "../../wxcomponents/vant/tab/index.js";
import VanTabs from "../../wxcomponents/vant/tabs/index.js";
import Toast from "../../wxcomponents/vant/toast";

const db = wx.cloud.database();
const _ = db.command;
const MessageSubscriber = require("../../js_sdk/utils/subscrib-news.js");
const ImageUploader = require("../../js_sdk/utils/upload-image.js");

export default {
  components: {
    UniGoodsDesc,
    UniBookRelease,
    VanPopup,
    VanIcon,
    VanPicker,
    VanTab,
    VanTabs,
    Toast,
  },
  data() {
    return {
      activePage: 1, // 切换发布
      navList: [
        {
          id: 1,
          img: "../../static/category-nav/books.svg",
          txt: "书籍资料",
        },
        {
          id: 2,
          img: "../../static/category-nav/iphone.svg ",
          txt: "电子设备",
        },
        {
          id: 3,
          img: "../../static/category-nav/fitness.svg",
          txt: "健身器材",
        },
        {
          id: 4,
          img: "../../static/category-nav/brush.svg",
          txt: "美妆日化",
        },
        {
          id: 5,
          img: "../../static/category-nav/clothes.svg",
          txt: "服装服饰",
        },
        {
          id: 6,
          img: "../../static/category-nav/other.svg",
          txt: "其他宝贝",
        },
      ],
      conditionList: [
        {
          id: 1,
          title: "全新",
        },
        {
          id: 2,
          title: "几乎全新",
        },
        {
          id: 3,
          title: "轻微痕迹",
        },
        {
          id: 4,
          title: "明显痕迹",
        },
      ],

      /* 显示控制-show */
      showPage: 2, // 控制真页面切换 0：fack页面， 1：商品发布页面，2：图书发布页面
      showGoodsCategory: false,
      showGoodQuality: false,
      showCategoryArrow: true,
      showQualityArrow: true,

      /* 索引判断-index */
      rightIndex: 0,
      clickCateIndex: 0,

      /* 复选框控制-radio */
      areaRadio: true,
      deliveryRadio: true,

      /* 商品信息相关 */
      fileList: [], // 图片
      category: "", // 分类
      condition: "全新", // 成色
      title: "", // 商品描述
      price: 15, // 加噶
      place: "", // 自提地址
      creat: "", // 发布时间
      delivery: "自提", // 取货方式
      audited: false, // 是否审核
      notes: "", // 备注
      note_counts: 0, // 备注字数
      dura: 14, // 发布时长(天)

      // 用户信息
      userInfo: {},
      // 重新编辑项
      reEditItem: null,
    };
  },
  async onLoad(options) {
    // 控制页面切换
    let curTime = new Date();
    // db.collection('swiper').doc('8de6ebcc65002a6f017fcdd65698e102').get().then((res) => {
    // 	let allowTime = res.data.time;
    // 	console.log("服务器时间", allowTime);
    // 	if (curTime < allowTime) {
    // 		this.showPage = 0;
    // 	} else {
    // 		this.showPage = 1;
    // 	}
    // })

    // // 获取openid
    // let openid = uni.getStorageSync('openid');
    // // 获取最新的用户数据
    // await db.collection('user').where({
    // 	_openid: openid
    // }).get().then((res) => {
    // 	console.log('获取最新的用户数据', res);
    // 	this.userInfo = res.data[0];
    // 	uni.setStorageSync('userInfo', this.userInfo)
    // })

    console.log("发布页面显示");
    // 重新编辑需求
    this.loadReEditItem();
  },
  onShow() {
    // 载入
    // this.userInfo = uni.getStorageSync('userInfo');
  },
  onShareAppMessage() {},

  /* 方法 */
  methods: {
    //加载重新编辑需求
    loadReEditItem() {
      const reEditItem = uni.getStorageSync("reEditItem");
      if (!reEditItem) {
        console.log("没有reEditItem");
        return;
      }
      console.log("reEditItem :>> ", reEditItem);
      // 获取后直接清除storage
      uni.removeStorageSync("reEditItem");
      console.log("清除reEditItem成功 :>> ");
      this.reEditItem = reEditItem;
      const { title, pics, price, place, category, condition, delivery, notes, dura } = reEditItem;
      this.$refs.descRef.title = title;
      this.title = title;
      this.fileList = pics;
      this.price = price;
      this.place = place;
      this.navList.map((item, index) => {
        if (item.txt === category) {
          this.handleCategoryPopup(index + 1);
        }
      });
      this.conditionList.map((item, index) => {
        if (item.title === condition) {
          this.handleConditionPopup(index);
        }
      });
      this.delivery = delivery;
      if (delivery === "自提") {
        this.deliveryRadio = true;
      } else {
        this.deliveryRadio = false;
      }
      this.notes = notes;
      // dura 是有多少天的时间戳，需要转换成天数
      this.dura = Math.ceil((dura - new Date().getTime()) / (86400 * 1000));
    },
    // 获取子组件的商品描述
    getGoodTitle: function (title) {
      // 子组件传过来的title
      this.title = title;
    },
    //地址输入
    placeChange(e) {
      console.log(e);
      this.place = e.detail.value;
    },
    //价格输入改变
    priceChange(e) {
      this.price = e;
    },
    //时长输入改变
    duraChange(e) {
      this.dura = e;
    },
    //输入备注
    noteChange(e) {
      let that = this;
      that.setData({
        note_counts: e.detail.cursor,
        notes: e.detail.value,
      });
    },
    // 监听-取货方式单选框-改变
    deliveryRadioChange(e) {
      this.delivery = e.detail.value;
      this.deliveryRadio = !this.deliveryRadio;
      console.log("改变--运送方式：", e.detail.value);
    },

    /* 图片处理相关 */
    // 删除图片
    deleteImg(event) {
      // 获取点击图片的下标：
      const index = event.detail.index;
      // 获取fileList数据
      let fileList = this.fileList;
      // 删除对应index的元素
      fileList.splice(index, 1);
      // 重新放回fileList中
      this.fileList = fileList;
      console.log("删除--图片--成功", this.fileList);
    },
    // 获取图片
    afterRead({ detail: { file } }) {
      const pics = Array.isArray(file) ? file.map((item) => ({ url: item.thumb })) : [{ url: file.thumb }];

      this.fileList.push(...pics);
      console.log("获取图片成功", this.fileList);
    },

    /* popup相关 */
    showCategoryPopup() {
      this.showGoodsCategory = true;
    },
    showConditionPopup() {
      this.showGoodQuality = true;
    },
    handleCategoryPopup(id) {
      let category = this.navList[id - 1].txt;
      console.log("点击了商品分类--", this.navList[id - 1].txt);
      this.category = category;
      this.clickCateIndex = id;

      this.showGoodsCategory = false;
      this.showCategoryArrow = false;
    },
    handleConditionPopup(index) {
      this.rightIndex = index;
      let condition = this.conditionList[index].title;
      console.log("商品成色：" + condition);
      this.condition = condition;
      this.showGoodQuality = false;
      this.showQualityArrow = false;
    },
    onCloseGoodsCategory() {
      this.showGoodsCategory = false;
    },
    onCloseGoodQuality() {
      this.showGoodQuality = false;
    },
    // 删除改商品在存储中的照片
    async deleteGoodPicture(item) {
      // 获取商品图片的FileID列表
      let fileList = [];
      item.pics.forEach((item) => {
        fileList.push(item.url);
      });
      // 删除云端图片
      await wx.cloud
        .deleteFile({
          fileList: fileList,
        })
        .then((res) => {
          console.log("删除该商品在存储中的照片成功", res.fileList);
        })
        .catch((error) => {
          console.log("删除该商品在存储中的照片失败", error);
        });
    },
    async deleteData(item) {
      try {
        // 删除数据库中的对应商品记录
        await db.collection("goods").doc(item._id).remove();
        uni.hideLoading();

        console.log("删除数据库中的对应商品记录成功");
      } catch (error) {
        console.error("删除数据库中的对应商品记录失败", error);
      }
    },
    /* 发布处理相关 */
    // 处理点击提交审核按钮事件
    async handleClickSubmit() {
      let that = this;

      // 1. 验证用户是否注册
      const isRegister = await this.$checkRegisterStatus();
      if (!isRegister) {
        // 用户未注册，提醒去注册
        const modalRes = await this.$uniAsync.showModal({
          title: "提示",
          content: "您还未注册，请注册之后，再提交审核",
        });
        // 点击确定-去注册
        if (modalRes.confirm) {
          uni.switchTab({
            url: "/pages/my-copy/my",
          });
        }
        return;
      }

      this.openid = uni.getStorageSync("openid"); // 注册完成后设置openid

      // 2. 检查信息是否填写完整
      const errors = await this.checkData();
      if (!errors) {
        // 信息不完整，提示用户修改
        console.log("信息填写不完整");
        return;
      }
      // 3. 确认是否提交
      const isSubmit = await this.$uniAsync.showModal({
        title: "提示",
        content: "确定要提交审核吗？",
      });

      if (!isSubmit.confirm) {
        console.log("用户取消提交审核");
        // 用户取消提交，直接返回
        return;
      }

      // 验证是否是重新编辑的商品
      if (this.reEditItem !== null) {
        uni.showLoading({
          title: "加载中",
          mask: true,
        });
        console.log("啊啊啊啊啊啊啊啊啊啊啊啊这是重新编辑的商品 :>> ");
        // 拷贝一份fileList
        let cv = JSON.parse(JSON.stringify(this.fileList));

        // 新上传的本地图片
        const httpsImages = cv.filter((file) => {
          if (file.url.indexOf("cloud://") === -1) {
            return file;
          }
        });

        // 处理云端图片
        const Promises = cv.map(
          (file) =>
            new Promise((resolve, reject) => {
              if (file.url.indexOf("cloud://") !== -1) {
                uni.getImageInfo({
                  src: file.url,
                  success: ({ path }) => {
                    console.log(path, "转换成功");
                    file.url = path;
                    resolve(file);
                  },
                  fail: (error) => {
                    console.log("转换本地路径失败：error :>> ", error);
                    uni.showModal({
                      title: "提示",
                      content: "图片转换本地路径失败，请重新上传",
                      showCancel: false,
                    });
                    reject(error);
                  },
                });
              } else {
                resolve(null);
              }
            })
        );
        try {
          const cloudImagesToHttp = (await Promise.all(Promises)).filter((file) => file !== null);

          // 合并新上传的本地图片和云端图片
          this.fileList = [...cloudImagesToHttp, ...httpsImages];
        } catch (error) {
          console.error("转换本地路径失败：", error);
          // 停止程序的执行
          return;
        }

        // 是重新编辑的商品，先删除云端存储的图片
        await this.deleteGoodPicture(this.reEditItem);
        // 删除数据库中的对应商品记录
        await this.deleteData(this.reEditItem);
        // 清除storage
        uni.removeStorageSync("reEditItem");
        console.log("移除StorageSync的reEditItem :>> ");
        uni.hideLoading();
      }
      // 4. 提交前准备操作
      // 4.1 调用订阅消息
      const yd = await this.$uniAsync.showModal({
        title: "授权提示",
        content: "是否允许给您发送审核通知和预定通知",
        confirmText: "同意",
        cancelText: "拒绝",
      });
      if (yd.confirm) {
        //调用订阅消息
        console.log("用户点击确定");
        //调用订阅
        await that.subscribNews();
      } else {
        console.log("用户点击取消");
        ///显示第二个弹说明一下
        wx.showModal({
          title: "温馨提示",
          content: "拒绝后您将无法获取实时的与卖家（买家）的交易消息",
          confirmText: "知道了",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log("用户点击确定");
              return;
            }
          },
        });
      }

      // 4.3 上传图片
      const uploader = new ImageUploader(this.fileList);
      const imageUploadResult = await uploader.upLoadImage();
      if (!imageUploadResult) {
        // false
        // 图片上传失败，直接返回
        console.log("图片上传失败", imageUploadResult);
        return;
      }

      // 5. 上传商品信息
      await this.upLoadGoodInfo();
      uni.hideLoading();
    },
    // 上传商品信息
    async upLoadGoodInfo() {
      let that = this;
      await db
        .collection("goods")
        .add({
          data: {
            title: this.title, // 商品描述
            pics: this.fileList, // 商品图片
            price: this.price, // 价格
            place: this.place, // 地址
            category: this.category, // 商品分类
            condition: this.condition, // 品质
            delivery: this.delivery, // 配送
            notes: this.notes, // 备注
            creat: new Date().getTime(), // 发布时间
            audited: this.audited, // 是否审核
            pass: false, // 是否通过审核
            status: -1, // 交易状态，-1：不可售
            dura: new Date().getTime() + that.dura * (86400 * 1000), // 保留时间
          },
        })
        .then(async (res) => {
          const mRes = await that.$uniAsync.showModal({
            title: "提交成功",
            content: "审核中，请关注我们给您发送的审核通知结果",
            confirmText: "返回首页",
            cancelText: "再来一个",
          });
          // 跳转到首页
          if (mRes.confirm) {
            uni.reLaunch({
              url: "/pages/index-store/index-store",
            });
          }
          // 清空表单
          if (mRes.cancel) {
            // 清空表单
            Object.assign(this.$data, this.$options.data());
            // 清空子组件描述文本
            this.$refs.descRef.title = "";
          }
        });
    },
    // 订阅审核通知的消息
    async subscribNews() {
      const subscriber = new MessageSubscriber();
      const tmplIdsArray = [
        "Ilo99ZTw6DoohkCTaLRMhTegzom5-Wf3tLDdgxAHLv4", // 预定成功通知
        "9Fs4ueUrKEpp1brJDggbOcQ-m3TAOLVEc6SwBxGY3l4", // 审核结果通知
        "nYKQaIjCDZPc7MICBPsAU7SfsVhZZdRzJhGAn_x2234", // 未读消息通知
      ];
      await subscriber.subscribeNews(tmplIdsArray);
    },
    // 检查商品字段的合法性
    async checkData() {
      // 定义一个错误信息对象
      const errors = {};

      // 检查标题
      if (!this.title) {
        errors.title = "标题不能为空";
      } else if (this.title.length > 140) {
        errors.title = "标题长度不能超过 140 个字符";
      }

      // 检查图片
      if (!this.fileList || this.fileList.length === 0) {
        errors.pics = "至少需要上传一张图片";
      }

      // 检查价格
      if (!this.price) {
        errors.price = "价格不能为空";
      } else if (isNaN(this.price)) {
        errors.price = "价格必须是数字";
      }

      // 检查地址
      if (this.delivery === "自提" && !this.place) {
        errors.place = "地址不能为空";
      }

      // 检查商品分类
      if (!this.category) {
        errors.category = "商品分类不能为空";
      }

      // 检查商品成色
      if (!this.condition) {
        errors.condition = "商品成色不能为空";
      }

      // 检查取货方式
      if (!this.delivery) {
        errors.delivery = "取货方式不能为空";
      }

      // 检查备注
      if (this.note && this.note.length > 50) {
        errors.note = "备注长度不能超过 50 个字符";
      }

      for (let prop in errors) {
        uni.showToast({
          title: errors[prop],
          icon: "error",
          duration: 2500,
        });
      }
      // 如果存在错误信息，则返回 false
      return !Object.keys(errors).length;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
$primary-radius: 20rpx;

// 导航tabs
 /deep/ .van-ellipsis {
  font-size: 30rpx;
  font-weight: 700;
}

#page {
  min-height: 100vh;
  background-color: $global-bg-color;

  // 商品描述组件
  .uni-goods-desc {
    width: 100vw;
    padding: 0;
  }

  // 商品发布容器
  .good-container {
    font-size: 28rpx;

    // 照片部分
    .center-wrap {
      padding: $fb-box-padding;

      .goods-pictures {
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
        padding: 8px 13px 0;
        margin: 8px 0 5px 0;
        background-color: #fff;
        border-radius: $primary-radius;
      }
    }

    // 商品信息部分
    .goods-wrap {
      padding: $fb-box-padding;

      // 顶部-价格
      .top {
        background-color: #fff;
        border-radius: $primary-radius;

        .top__item {
          display: flex;
          justify-content: space-between;
          padding: 25px 15px;
          font-weight: bold;

          // font-size: 12px;

          .left {
            display: flex;
            align-items: center;

            .icon {
              width: 24px;
              height: 24px;
              margin-right: 15px;
            }

            .txt {
              text-align: center;
              // font-size: 12px;
            }
          }

          .input {
            // width: 80px;
            // text-align: right;
            // font-weight: 500;
          }
        }

        .top__item.price {
          padding: 15px 15px;
          margin-top: 10px;
        }
      }

      // 底部-分类和成色
      .bottom {
        margin-top: 10px;
        font-size: 28rpx;
        background-color: rgb(255, 255, 255);
        border-radius: $primary-radius;

        .goods-category {
          display: flex;
          flex-wrap: wrap;
          margin: 30px 20px 0;

          &__item {
            flex-grow: 1;

            &--block {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 30px 25px 20px;

              .active {
                padding: 5px 5px;
                color: #000;
                font-size: 16px;
                font-weight: bold;
                background-color: #ffc300;
                border-radius: $primary-radius;
              }

              .icon {
                width: 30px;
                height: 30px;
              }

              .txt {
                margin-top: 10px;
                font-size: 14px;
                font-weight: bold;
              }
            }
          }
        }

        .goods-condition {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          margin-top: 40px;

          &__item {
            flex-grow: 1;

            &--block {
              .active {
                padding: 5px 10px;
                color: #000;
                font-size: 16px;
                font-weight: bold;
                background-color: #ffc300;
                border-radius: $primary-radius;
              }
            }
          }
        }

        &__item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 15px;
          font-weight: bold;

          // font-size: 12px;

          .left {
            display: flex;
            align-items: center;

            .icon {
              width: 23px;
              height: 23px;
              margin-right: 15px;
            }

            .txt {
              text-align: center;
            }
          }
        }

        &__item.category {
          .icon {
            width: 24px;
            height: 24px;
            margin-right: 15px;
          }

          .option {
            text-align: center;
          }
        }
      }
    }

    // 配送相关
    .send-wrap {
      padding: 15px 15px;
      margin: 0 30rpx;
      margin-top: 10px;
      font-size: 28rpx;
      font-weight: bold;
      background-color: #fff;
      border-radius: $primary-radius;

      // 送货
      .delivery {
        display: flex;
        justify-content: space-between;
        align-items: center;

        // padding-bottom: 10px;

        .left {
          display: flex;
          align-items: center;

          .icon {
            width: 23px;
            height: 23px;
            margin-right: 15px;
          }

          .txt {
            text-align: center;
          }
        }

        .options {
          font-weight: normal;
        }
      }

      // 楼号
      .floor-num {
        // display: flex;
        // align-items: center;
        // justify-content: space-between;
        padding-top: 40rpx;

        .input-place {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: 100%;
          height: 80rpx;
          padding: 0 20rpx;
          font-weight: normal;
          background: rgb(238, 238, 238);
          border-radius: 10rpx;
        }

        .input-place input {
          width: 100%;
        }

        // .left {
        // 	display: flex;
        // 	align-items: center;

        // 	.icon {
        // 		margin-right: 15px;
        // 		width: 23px;
        // 		height: 23px;
        // 	}

        // 	.txt {
        // 		text-align: center;
        // 	}
        // }

        // .input {
        // 	display: flex;
        // 	align-items: center;
        // 	width: auto;

        // 	.radio {
        // 		display: flex;
        // 		align-items: center;
        // 		font-weight: normal;
        // 	}

        // 	.input__number {
        // 		margin-left: 40rpx;
        // 		font-weight: normal;
        // 		background-color: #eeeeee;

        // 		.place-input {
        // 			width: 80px;
        // 		}
        // 	}
        // }
      }
    }

    // 备注和提示
    .note-tips-wrap {
      padding: 15px 15px;
      margin: 0 30rpx;
      margin-top: 10px;
      background-color: #fff;
      border-radius: $primary-radius;

      // font-weight: bold;
      // font-size: 12px;

      .b_bar {
        display: flex;

// padding: 40rpx 30rpx;
        justify-content: space-between;

// flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        border-radius: 18rpx;

        // box-shadow: 0 0 20rpx #ebebeb;

        .name {
          font-size: 30rpx;
          letter-spacing: 2rpx;
        }

        .b_nobi {
          color: #8c9aa8;
          font-size: 28rpx;
        }
      }

      .b_notes {
        display: flex;
        box-sizing: border-box;
        width: 100%;

// padding: 10rpx;
        padding: 20rpx 0;

        .b_text {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          width: 100%;
          height: 200rpx;
          padding: 20rpx;
          background: rgb(238, 238, 238);
          border-radius: 10rpx;

          textarea {
            width: 100%;
            height: 130rpx;
            color: #8c9aa8;
            font-size: 28rpx;
            border-spacing: 2rpx;
          }

          .b_less {
            display: flex;
            justify-content: flex-end;
            color: #8c9aa8;
            font-size: 28rpx;
            letter-spacing: 2rpx;
          }
        }
      }

      .b_tips {
        color: #8c9aa8;
        font-size: 26rpx;
        line-height: 45rpx;

        text {
          color: rgb(255, 0, 0);
          font-size: 30rpx;
        }
      }
    }

    // 提交按钮
    .submit_btn {
      padding: 20px 0;

      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100vw - 60rpx);
        height: 80rpx;
        color: #fff;
        font-size: 32rpx;
        font-weight: 500;
        letter-spacing: 4rpx;
        background: #fbbd08;
        border: none;
        border-radius: 40rpx;
      }
    }
  }
}

// 阴影效果
.shadow {
  box-shadow: $fb-box-shadow;
}
</style>
