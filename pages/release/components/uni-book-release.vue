<template>
  <view style="height: 100%">
    <view class="top_steps">
      <van-steps
        :steps="steps"
        :active="active"
        active-color="#000000" />
    </view>
    <!-- 步骤一 -->
    <van-transition
      :show="show_a"
      name="fade-right"
      custom-class="block"
      :duration="entime">
      <view class="a_contain">
        <view class="a_inp shadow">
          <image
            class="a_scan"
            src="/static/images/scan.png"></image>
          <input
            @confirm="confirm"
            @input="isbnInput"
            :value="isbn"
            type="number"
            maxlength="13"
            placeholder-class="a_pla"
            placeholder="请输入书本的ISBN号码" />
          <view
            class="a_confirm"
            @tap="confirm"
            >确认</view
          >
        </view>
        <image
          class="a_indication"
          src="/static/images/up.svg" />
        <view class="a_des">1.您可以直接在上面输入框输入ISBN码</view>
        <image
          class="a_isbn"
          src="/static/images/isbn.jpg" />
        <view class="a_des">2.您还可以直接通过摄像头扫描出ISBN码</view>
        <image
          class="a_indication"
          src="/static/images/down.svg" />
      </view>
      <view class="a_sao">
        <button
          class="shadow"
          @tap="scan">
          点击扫码
        </button>
      </view>
    </van-transition>
    <!-- 步骤二 -->
    <van-transition
      :show="show_b"
      name="fade-right"
      custom-class="block"
      :duration="entime">
      <view class="b_contain">
        <view class="b_top">
          <view class="b_poster">
            <image :src="bookinfo.pic" />
          </view>
          <view class="b_content">
            <view class="b_title text-cut">{{ bookinfo.title }}</view>
            <view class="b_dcontain">
              <view class="b_author text-cut">{{ bookinfo.author }}</view>
              <view class="b_price">￥{{ bookinfo.price }}元</view>
            </view>
            <view class="b_des">{{ bookinfo.summary }}</view>
          </view>
        </view>
      </view>
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
      <view class="b_ccontain">
        <view class="b_card">
          <view class="b_bar">
            <view class="b_left">
              <image
                src="../../../static/release/price.svg"
                class="icon"></image>
              <view class="b_name price">价格</view>
            </view>
            <view class="b_input">
              <uni-number-box
                :value="price"
                @change="priceChange"
                :min="1"
                :step="0.5"
                :max="100">
              </uni-number-box>
            </view>
          </view>
          <view class="b_border"></view>
          <view class="b_bar">
            <view class="b_left">
              <image
                src="../../../static/release/category.svg"
                class="icon"></image>
              <view class="b_name">类别</view>
            </view>
            <radio-group
              class="kind-group"
              @change="kindChange">
              <label
                class="b_radio"
                v-for="(item, index) in kind"
                :key="index">
                <radio
                  color="#ffc300"
                  :value="item.id"
                  :checked="item.check" />

                {{ item.name }}
              </label>
            </radio-group>
          </view>
          <!-- 选择专业书时候 -->
          <block v-if="chooseCollege">
            <view class="b_border"></view>
            <view class="b_bar">
              <view class="b_left">
                <image
                  src="../../../static/release/floor-num.svg"
                  class="icon"></image>
                <view class="b_name">选择学院</view>
              </view>
              <picker
                mode="multiSelector"
                @change="bindMultiPickerChange"
                @columnchange="bindMultiPickerColumnChange"
                :value="multiIndex"
                :range="newArr">
                <view class="b_picker">
                  <block v-if="multiIndex[0] !== -1"> {{ newArr[0][multiIndex[0]] }}--{{ newArr[1][multiIndex[1]] }} </block>
                  <block v-if="multiIndex[0] == -1">请选择专业</block>
                  <image
                    v-if="multiIndex[0] == -1"
                    class="right"
                    src="/static/images/right.png" />
                </view>
              </picker>
            </view>
          </block>
          <!-- 选择成色 -->
          <block>
            <view class="b_border"></view>
            <view class="b_bar">
              <view class="b_left">
                <image
                  src="../../../static/release/goods-condition.svg"
                  class="icon"></image>
                <view class="b_name">选择成色</view>
              </view>
              <picker
                :range="condition"
                range-key="name"
                :value="c_id"
                @change="choCondition">
                <view class="b_picker">
                  <block v-if="c_id != -1">当前选择：{{ condition[c_id].name }}</block>
                  <block v-if="c_id == -1">请选择成色</block>
                  <image
                    class="right"
                    src="/static/images/right.png" />
                </view>
              </picker>
            </view>
          </block>
          <view class="b_border"></view>
          <!-- 取货方式 -->
          <view class="b_bar">
            <view class="b_left">
              <image
                src="../../../static/release/transport.svg"
                class="icon"></image>
              <view class="b_name">取货方式</view>
            </view>
            <radio-group
              class="kind-group"
              @change="delChange">
              <label
                class="b_radio"
                v-for="(item, index) in delivery"
                :key="index">
                <radio
                  color="#ffc300"
                  :value="item.id"
                  :checked="item.check" />

                {{ item.name }}
              </label>
            </radio-group>
          </view>
          <block v-if="chooseDelivery == 0">
            <view class="b_place">
              <view class="b_plecebox">
                <input
                  maxlength="20"
                  placeholder="请输入您的详细地址"
                  :value="place"
                  @input="placeInput" />
              </view>
            </view>
          </block>
          <!-- 备注信息 -->
          <view class="b_bar">
            <view class="name">备注信息</view>
            <view class="b_nobi">※ 非必填</view>
          </view>
          <view class="b_notes">
            <view class="b_text">
              <textarea
                :value="notes"
                @input="noteInput"
                maxlength="50"
                placeholder="请随便说点相关的"></textarea>
              <view class="b_less">{{ note_counts }}/50</view>
            </view>
          </view>
          <!-- 发布时长 -->
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
        <view
          class="b_publish"
          @tap="check_pub"
          >马上发布</view
        >
      </view>
    </van-transition>
    <!-- 步骤三 -->
    <van-transition
      :show="show_c"
      name="fade-right"
      custom-class="block"
      :duration="entime">
      <view
        class="c_contain"
        :style="'height:' + (systeminfo.windowHeight - 66.8) + 'px'">
        <image
          class="c_success"
          src="/static/images/success.png"></image>
        <view class="c_title">恭喜您 发布成功</view>
        <view class="c_des">订单的实时状态将通过微信的服务通知告知您</view>
        <view
          class="c_see"
          @tap="detail"
          >查看详情</view
        >
        <view
          class="c_again shadow"
          @tap="initial"
          >再来一本</view
        >
      </view>
    </van-transition>
  </view>
</template>

<script>
const db = wx.cloud.database();
const app = getApp();
const config = require("../../../config.js");
const ImageUploader = require("../../../js_sdk/utils/upload-image.js");
const MessageSubscriber = require("../../../js_sdk/utils/subscrib-news.js");
import VanTransition from "../../../wxcomponents/vant/transition/index";
import VanSteps from "../../../wxcomponents/vant/steps/index";
import VanUploader from "../../../wxcomponents/vant/uploader/index";

export default {
  components: {
    VanTransition,
    VanSteps,
    VanUploader,
  },
  data() {
    return {
      systeminfo: app.globalData.systeminfo,

      entime: {
        enter: 600,
        leave: 300,
      },

      //进入褪出动画时长
      college: JSON.parse(config.data).college.splice(1),

      campus: JSON.parse(config.data).campus,
      condition: JSON.parse(config.data).condition,

      steps: [
        {
          text: "步骤一",
          desc: "扫描isbn码",
        },
        {
          text: "步骤二",
          desc: "补充图书信息",
        },
        {
          text: "步骤三",
          desc: "发布成功",
        },
      ],

      multiIndex: [-1, -1],
      multiIds: [],

      // 最终选择
      newArr: [],

      fileList: [], // 实拍图
      dura: 0,
      price: 0,
      place: "",
      profession: 0,
      chooseDelivery: 0,
      cids: "",
      c_id: "",
      isbn: "9787313231468",
      show_a: false,
      show_b: false,
      show_c: false,
      active: 0,
      chooseCollege: false,
      note_counts: 0,
      notes: "",
      kindid: 0,
      kind: [],
      delivery: [],

      bookinfo: {
        pic: "",
        title: "",
        author: "",
        price: "",
        summary: "",
      },

      detail_id: "",
      name: "",
    };
  },
  mounted() {
    this.initial();
    this.setData({
      test: "test",
    });
    console.log("testatg", this.test);
  },
  methods: {
    //恢复初始态
    initial() {
      let that = this;
      that.setData({
        dura: 30,
        price: 15,
        place: "",
        profession: 0,
        chooseDelivery: 0,
        cids: "-1",
        //学院选择的默认值
        c_id: "-1",
        //成色选择默认值
        isbn: "",
        // TODO 记得改回来
        show_a: true,
        show_b: false,
        show_c: false,
        /* show_a: false,
				show_b: true,
				show_c: false, */
        active: 0,
        chooseCollege: false,
        note_counts: 0,
        notes: "",
        kindid: 0,
        kind: [
          {
            name: "通用",
            id: 0,
            check: true,
          },
          {
            name: "专业",
            id: 1,
            check: false,
          },
          {
            name: "课外书",
            id: 2,
            check: false,
          },
        ],
        delivery: [
          {
            name: "自提",
            id: 0,
            check: true,
          },
          {
            name: "帮送",
            id: 1,
            check: false,
          },
        ],
        multiIndex: [-1, -1],
      });
      that.initPicker();
    },

    initPicker() {
      let state = {
        arr: [],
        arr1: [],
        arr2: [],
        multiIds: [],
      };
      this.campus.map((v, vk) => {
        state.arr1.push(v.label);
        if (this.multiIndex[0] === vk) {
          state.multiIds[0] = v;
        }
        if (state.arr2.length <= 0) {
          v.children.map((c, ck) => {
            state.arr2.push(c.label);
            if (this.multiIndex[1] === ck) {
              state.multiIds[1] = c;
            }
          });
        }
      });
      state.arr[0] = state.arr1;
      state.arr[1] = state.arr2;
      this.setData({
        newArr: state.arr,
        multiIds: state.multiIds,
        profession: 0,
      });
    },

    bindMultiPickerChange(e) {
      console.log(this.multiIds);
    },

    choCondition: function (e) {
      console.log("picker发送选择改变，携带值为", e.detail.value);
      this.setData({
        c_id: e.detail.value,
      });
    },

    bindMultiPickerColumnChange(e) {
      console.log(e.detail);
      let data = {
        newArr: this.newArr,
        multiIndex: this.multiIndex,
        multiIds: this.multiIds,
      };
      data.multiIndex[e.detail.column] = e.detail.value;
      let searchColumn = () => {
        let arr1 = [];
        this.campus.map((item, index) => {
          if (data.multiIndex[0] === index) {
            data.multiIds[0] = {
              ...item,
            };
            item.children.map((c, ck) => {
              arr1.push(c.label);
              if (data.multiIndex[1] === ck) {
                data.multiIds[1] = {
                  ...c,
                };
              }
            });
          }
        });
        console.log(data.multiIds, "data.multiIds");
        data.newArr[1] = arr1;
      };
      switch (e.detail.column) {
        case 0:
          // 每次切换还原初始值
          data.multiIndex[1] = 0;
          // 执行函数处理
          searchColumn();
          break;
        case 1:
          searchColumn();
          break;
      }
      this.setData(data);
      // 在这里补充学院的逻辑
      this.college.forEach((item) => {
        console.log(item, "item");
        if (item.name === this.multiIds[0].label) {
          this.setData({
            cids: item.id + "",
          });
        }
      });
      this.setData({
        profession: this.multiIds[1].label,
      });
    },

    //手动输入isbn
    isbnInput(e) {
      this.isbn = e.detail.value;
    },

    //打开摄像头扫码isbn
    scan() {
      let that = this;
      uni.scanCode({
        onlyFromCamera: false,
        scanType: ["barCode"],
        success: (res) => {
          uni.showToast({
            title: "扫码成功",
            icon: "success",
          });
          that.setData({
            isbn: res.result,
          });
        },
        fail() {
          uni.showToast({
            title: "扫码失败，请重新扫码或者手动输入",
            icon: "none",
          });
        },
      });
    },

    /* 图片处理相关 */
    // 删除图片
    deleteImg(event) {
      console.log(event, "删除图片");
      // 获取点击图片的下标：
      const index = event.index;
      // 获取fileList数据
      let fileList = this.fileList;
      // 删除对应index的元素
      fileList.splice(index, 1);
      // 重新放回fileList中
      this.fileList = fileList;
      console.log("删除--图片--成功", this.fileList);
    },
    // 获取图片
    afterRead(e) {
      let file = e.file;
      console.log(e, "实拍图");
      // { detail: { file } }
      const pics = Array.isArray(file)
        ? file.map((item) => ({
            url: item.thumb,
          }))
        : [
            {
              url: file.thumb,
            },
          ];

      this.fileList.push(...pics);
      console.log("获取图片成功", this.fileList);
    },

    async confirm() {
      let that = this;
      let isbn = that.isbn;
      if (!/978[0-9]{10}/.test(isbn)) {
        uni.showToast({
          title: "请检查您的isbn号",
          icon: "none",
        });
        return false;
      }
      // 1. 验证用户是否注册
      const isRegister = await this.$checkRegisterStatus();
      if (!isRegister) {
        uni.showModal({
          title: "温馨提示",
          content: "该功能需要注册方可使用，是否马上去注册",
          success(res) {
            if (res.confirm) {
              console.log("点击确定");
              uni.navigateTo({
                url: "/pages/register/register",
              });
            }
          },
        });
        return false;
      }
      that.get_book(isbn);
    },
    // 价格小数化
    formatPrice(input) {
      // 将输入的数字转换为浮点数
      const floatPrice = parseFloat(input);

      // 如果转换失败，返回原始输入
      if (isNaN(floatPrice)) {
        return input;
      }

      // 格式化为两位小数
      const formattedPrice = floatPrice.toFixed(2);

      return formattedPrice;
    },
    //查询书籍数据库详情
    get_book(bn) {
      let that = this;
      uni.showLoading({
        title: "正在获取",
      });
      //先检查是否存在该书记录，没有再进行云函数调用
      db.collection("books")
        .where({
          isbn: bn,
        })
        .get({
          async success(res) {
            console.log(res, "test");
            //books集合中没有该书数据，添加到数据库
            if (res.data == "") {
              await that.addBooks(bn);
            } else {
              uni.hideLoading();
              that.setData({
                bookinfo: res.data[0],
                show_a: false,
                show_b: true,
                show_c: false,
                active: 1,
              });
            }
          },
        });
    },

    //添加书籍信息到数据库
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

        console.log("bookInfo :>> ", bookInfo);

        if (bookInfo && bookInfo.length !== 0) {
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
            isbn,
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
          // 添加之后，重新获取数据库的树，因为要获取_id
          const res2 = await db
            .collection("books")
            .where({
              isbn: isbn,
              author,
              price,
            })
            .get();
          console.log("res2 :>> ", res2);
          this.setData({
            bookinfo: res2.data[0],
            show_a: false,
            show_b: true,
            show_c: false,
            active: 1,
          });

          uni.hideLoading();
        } else {
          throw new Error("请求图书信息失败！");
        }
      } catch (err) {
        console.log(err);
        uni.hideLoading();
        uni.showToast({
          title: "请求图书信息失败, 请重新输入isbn号重试",
          icon: "none",
          duration: 2000,
        });
      }
    },

    //价格输入改变
    priceChange(e) {
      this.price = e;
    },

    //时才输入改变
    duraChange(e) {
      this.dura = e.detail;
    },

    //地址输入
    placeInput(e) {
      console.log(e);
      this.place = e.detail.value;
    },

    //书籍类别选择
    kindChange(e) {
      let that = this;
      let kind = that.kind;
      let id = e.detail.value;
      for (let i = 0; i < kind.length; i++) {
        kind[i].check = false;
      }
      kind[id].check = true;
      if (id == 1) {
        that.setData({
          kind: kind,
          chooseCollege: true,
          kindid: id,
        });
      } else {
        that.setData({
          kind: kind,
          cids: "-1",
          chooseCollege: false,
          kindid: id,
          multiIndex: [-1, -1],
        });
        that.initPicker();
      }
    },

    //选择专业
    choCollege(e) {
      let that = this;
      that.setData({
        cids: e.detail.value,
      });
    },

    //取货方式改变
    delChange(e) {
      let that = this;
      let delivery = that.delivery;
      let id = e.detail.value;
      for (let i = 0; i < delivery.length; i++) {
        delivery[i].check = false;
      }
      delivery[id].check = true;
      if (id == 1) {
        that.setData({
          delivery: delivery,
          chooseDelivery: 1,
        });
      } else {
        that.setData({
          delivery: delivery,
          chooseDelivery: 0,
        });
      }
    },

    //输入备注
    noteInput(e) {
      let that = this;
      that.setData({
        note_counts: e.detail.cursor,
        notes: e.detail.value,
      });
    },

    //发布校检
    check_pub() {
      let that = this;
      //如果用户选择了专业类书籍，需要选择学院
      if (that.kind[1].check) {
        if (that.cids == -1) {
          uni.showToast({
            title: "请选择学院",
            icon: "none",
          });
          return false;
        }
      }
      //如果用户选择了自提，需要填入详细地址
      if (that.delivery[0].check) {
        if (that.place == "") {
          uni.showToast({
            title: "请输入地址",
            icon: "none",
          });
          return false;
        }
      }
      //必须选择成色
      if (that.c_id == "-1") {
        uni.showToast({
          title: "请选择成色",
          icon: "none",
        });
        return false;
      }
      //如果用户选择了课外书
      if (that.kindid == 2) {
        that.setData({
          profession: "课外书",
          cids: "16", //分到 其他 类
        });
      }

      that.prePublish();
    },
    // 发布订阅
    async subscribNews() {
      // 订阅预定通知
      const subscriber = new MessageSubscriber();
      const id1 = "QZT9orwXEHRlC1xAYJHH1aLFeKCPpgBWtMRFW1lxLVc"; //预定通知-买家预定后通知卖家该商品被预定
      const id2 = "Gw3xpqAYCqZMZeEVV67jq1hCgFxZ0ISkKAVsK5qPPWg"; //订单状态通知-1.买家取消预定 2.买家取消交易 3.买家确认收货
      const id3 = "jTUi4Ny7eknULMMEKvEPOY_As3_NWBtjYp6_Dsxvx-A"; //未读消息通知-聊天新消息
      const tmplIdsArray = [id1, id2, id3];
      await subscriber.subscribeNews(tmplIdsArray);
    },
    // 发布前准备
    async prePublish() {
      // 调用订阅消息
      const yd = await this.$uniAsync.showModal({
        title: "授权提示",
        content: "是否允许给您发送预定通知",
        confirmText: "同意",
        cancelText: "拒绝",
      });
      if (yd.confirm) {
        //调用订阅消息
        console.log("用户点击确定");
        //调用订阅
        await this.subscribNews();
      } else {
        console.log("用户点击取消");
        ///显示第二个弹说明一下
        wx.showModal({
          title: "温馨提示",
          content: "拒绝后您将无法获取实时的与卖家（买家）的交易消息",
          confirmText: "知道了",
          showCancel: false,
        });
      }

      // 上传图片
      const uploader = new ImageUploader(this.fileList);
      const imageUploadResult = await uploader.upLoadImage();
      if (!imageUploadResult) {
        // 图片上传失败，直接返回
        console.log("图片上传失败", imageUploadResult);
        return;
      }

      await this.publish();
    },
    //正式发布
    async publish() {
      let that = this;

      db.collection("publish").add({
        data: {
          creat: new Date().getTime(),
          dura: new Date().getTime() + that.dura * (86400 * 1000),
          status: 0, //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
          price: this.formatPrice(that.price), //售价
          //分类
          kindid: that.kindid, //区别通用还是专业
          collegeid: that.cids, //学院id，-1表示通用类
          profession: that.profession, //专业，0表示通用类
          conditionid: that.c_id, //成色
          deliveryid: that.chooseDelivery,
          //配送方式：0自1配
          place: that.place, //自提地址
          notes: that.notes, //备注
          bookinfo: {
            _id: that.bookinfo._id,
            author: that.bookinfo.author,
            edition: that.bookinfo.edition,
            pic: that.bookinfo.pic,
            price: that.bookinfo.price,
            title: that.bookinfo.title,
          },
          key: that.bookinfo.title + that.bookinfo.keyword,
          pics: that.fileList,
        },
        success(e) {
          console.log(e);
          that.setData({
            show_a: false,
            show_b: false,
            show_c: true,
            active: 2,
            detail_id: e._id,
          });
          //滚动到顶部
          uni.pageScrollTo({
            scrollTop: 0,
          });

          // 清空表单
          Object.assign(this.$data, this.$options.data());
        },
      });
    },
    detail() {
      let that = this;
      uni.navigateTo({
        url: "/pages/book-detail/book-detail?scene=" + that.detail_id,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
page {
  height: 100vh;
  background: #f6f7fa;
}

.top_steps {
  position: relative;
  top: 0rpx;
  left: 0rpx;

  /* z-index: 9; */
  width: 100%;
}

.a_contain {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx 32rpx;
  background: #fff;
  box-shadow: 0 30rpx 20rpx rgb(240, 240, 240);
}

.a_inp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 76rpx;
  background: #f8fafd;
  border-radius: 38rpx;
}

.a_scan {
  width: 40rpx;
  height: 38rpx;
  padding-left: 30rpx;
}

.a_inp input {
  width: 420rpx;
  height: 100%;
  color: #aaaaab;
  font-size: 28rpx;
  letter-spacing: 2rpx;
}

.a_pla {
  color: #aaaaab;
  font-size: 27rpx;
}

.a_confirm {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170rpx;
  height: 100%;
  color: #fff;
  font-size: 28rpx;
  letter-spacing: 4rpx;
  background: #000;
  border-radius: 36rpx;
}

.a_isbn {
  width: 350rpx;
  height: 350rpx;
  margin-top: 40rpx;
}

.a_des {
  width: 450rpx;
  margin-top: 30rpx;
  color: #aaaaab;
  font-size: 30rpx;
  line-height: 50rpx;
  letter-spacing: 3rpx;
  text-align: center;
}

.a_indication {
  width: 80rpx;
  height: 60rpx;
  padding-top: 20rpx;
}

.a_sao {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f6f7fa;
  /* padding-top: 30rpx; */
}

.a_sao button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500rpx;
  height: 80rpx;
  color: #fff;
  font-size: 32rpx;
  font-weight: 500;
  letter-spacing: 4rpx;
  background: #ffc300;
  border: none;
  border-radius: 40rpx;
}

.a_sao button::after {
  border: none;
}

/*步骤二*/

.b_contain {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 32rpx;
  background: #fff;
  box-shadow: 0 30rpx 20rpx rgb(240, 240, 240);
}

.b_left {
  display: flex;
}

.b_top {
  display: flex;
}

.b_poster {
  display: flex;
  justify-content: center;
  width: 270rpx;
}

.b_poster image {
  width: 250rpx;
  height: 250rpx;
}

.b_title {
  width: 100%;
  font-size: 32rpx;
  font-weight: 600;
  line-height: 50rpx;
  letter-spacing: 2rpx;
}

.b_content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 410rpx;
  height: 250rpx;
}

.b_dcontain {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 4rpx;
}

.b_author {
  color: #000;
  font-size: 28rpx;
  letter-spacing: 2rpx;
}

.b_price {
  color: rgb(255, 0, 0);
  font-size: 30rpx;
  letter-spacing: 2rpx;
  white-space: nowrap;
}

.b_des {
  display: -webkit-box;
  overflow: hidden;
  color: #aaaaab;
  font-size: 26rpx;
  text-overflow: ellipsis;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

/*步骤二输入内容*/

.b_ccontain {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 15rpx 30rpx 30rpx 30rpx;
}

.b_card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx 30rpx 40rpx 30rpx;
  background: #fff;
  box-shadow: 0 0 20rpx #ebebeb;
  border-radius: 18rpx;
}

.b_border {
  width: 100%;
  height: 2rpx;
  border-bottom: 1rpx solid #eee;
}

.b_ccontain .icon {
  width: 48rpx;
  height: 48rpx;
  margin-right: 30rpx;
}

.b_bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100rpx;
}

.b_bar.price {
}

.b_bar .name {
  font-size: 30rpx;
}

.b_input {
  font-weight: bold;
}

.kind-group {
  display: flex;
}

.b_radio {
  display: flex;
  align-items: center;
  padding-left: 20rpx;
  font-size: 28rpx;
}

.b_radio radio {
  transform: scale(0.8);
}

.b_name {
  font-size: 28rpx;
  font-weight: 700;
  letter-spacing: 2rpx;
}

/* 价格的粗体显示 */
/deep/ .uni-numbox__value {
  font-weight: bold;
}

.b_picker {
  display: flex;
  align-items: center;
  color: #8c9aa8;
  font-size: 28rpx;
  line-height: 30rpx;
}

.right {
  width: 26rpx;
  height: 26rpx;
  padding-left: 10rpx;
}

picker {
  display: flex;
  align-items: center;
}

.b_notes {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10rpx;
}

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
}

.b_text textarea {
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

.b_place {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10rpx;
}

.b_plecebox {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 80rpx;
  padding: 0 20rpx;
  background: rgb(238, 238, 238);
  border-radius: 10rpx;
}

.b_plecebox input {
  width: 100%;
  color: #8c9aa8;
  font-size: 28rpx;
  letter-spacing: 2rpx;
}

.b_tips {
  color: #8c9aa8;
  font-size: 26rpx;
  line-height: 45rpx;
}

.b_tips text {
  color: rgb(255, 0, 0);
  font-size: 30rpx;
}

.b_nobi {
  color: #8c9aa8;
  font-size: 28rpx;
}

.b_publish {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80rpx;
  margin-top: 30rpx;
  color: #fff;
  font-size: 32rpx;
  font-weight: 500;
  letter-spacing: 4rpx;
  background: #fbbd08;
  border: none;
  border-radius: 40rpx;
}

.c_contain {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  background: #fff;
}

.c_success {
  width: 145rpx;
  height: 184rpx;
  margin-top: 130rpx;
}

.c_title {
  margin-top: 30rpx;
  font-size: 40rpx;
  font-weight: 600;
}

.c_des {
  margin-top: 30rpx;
  color: #898989;
  font-size: 28rpx;
  line-height: 45rpx;
}

.c_see {
  margin-top: 40rpx;
  color: #4f93ea;
  font-size: 32rpx;
  letter-spacing: 3rpx;
}

.c_again {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500rpx;
  height: 80rpx;
  margin-top: 40rpx;
  color: #fff;
  font-size: 32rpx;
  letter-spacing: 4rpx;
  background: #fbbd08;
  border-radius: 40rpx;
}

.center-wrap {
  padding: $fb-box-padding;

  .goods-pictures {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    padding: 16rpx 26rpx 0;
    margin: 16rpx 0 10rpx 0;
    background-color: #fff;
    border-radius: $fb-box-radius;
  }
}
</style>
