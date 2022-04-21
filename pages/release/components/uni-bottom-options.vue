<template>
  <div class="bottom-options">
    <van-popup
      :show="showGoodsCategory"
      round
      position="bottom"
      custom-style="height: 35%"
      @close="onCloseGoodsCategory"
      closeable
    >
      <div class="goods-category">
        <div
          class="goods-category__item"
          v-for="item in navList"
          :key="item.id"
        >
          <div class="goods-category__item--block">
            <image class="icon" :src="item.img" mode="" />
            <div class="txt">{{ item.txt }}</div>
          </div>
        </div>
      </div>
    </van-popup>
    <div class="bottom-options__item" @click="showPopup">
      <div class="left">
        <image src="../../../static/release/category.svg" class="icon"></image>
        <div class="txt">商品分类</div>
      </div>
      <div class="option">
        <van-icon name="arrow" size="18px" />
      </div>
    </div>
    <van-popup
      :show="showGoodQuality"
      round
      position="bottom"
      custom-style="height: 35%"
      @close="onCloseGoodQuality"
      closeable
    >
      <div class="goods-quality">
        <div
          class="goods-quality__item"
          v-for="(item, index) in columns"
          :key="index"
          @click="rightTap(index)"
        >
          <div class="goods-quality__item--block">
            <div class="txt" :class="{ active: index === rightIndex }">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <div @click="showGoodQualityPopup" class="bottom-options__item">
      <div class="left">
        <image
          src="../../../static/release/goods-quality.svg"
          class="icon"
        ></image>
        <div class="txt">商品成色</div>
      </div>
      <div class="option">
        <van-icon name="arrow" size="18px" />
      </div>
    </div>
    <!-- 出/蹲 -->
    <div class="bottom-options__item need">
      <div class="left">
        <image
          src="../../../static/release/goods-need.svg"
          class="icon"
        ></image>
        <div class="txt">出/蹲</div>
      </div>
      <div class="options">
        <radio-group @change="radioChange">
          <label class="radio-sell"
            ><radio
              value="sell"
              :checked="need"
              style="transform: scale(0.7)"
            />出</label
          >
          <label class="radio"
            ><radio value="beg" style="transform: scale(0.7)" />蹲</label
          >
        </radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import VanIcon from "../../../wxcomponents/vant/icon";
import Toast from "../../../wxcomponents/vant/toast";
import VanPopup from "../../../wxcomponents/vant/popup/index";
import VanPicker from "../../../wxcomponents/vant/picker";

export default {
  data() {
    return {
      showGoodsCategory: false,
      showGoodQuality: false,
      rightIndex: 0,
      navList: [
        {
          id: 1,
          img: "../../../static/category-nav/books.svg",
          txt: "书籍资料",
        },
        {
          id: 2,
          img: "../../../static/category-nav/iphone.svg ",
          txt: "电子设备",
        },
        {
          id: 3,
          img: "../../../static/category-nav/fitness.svg",
          txt: "健身器材",
        },
        {
          id: 4,
          img: "../../../static/category-nav/brush.svg",
          txt: "美妆日化",
        },
        {
          id: 5,
          img: "../../../static/category-nav/clothes.svg",
          txt: "服装服饰",
        },
        {
          id: 6,
          img: "../../../static/category-nav/other.svg",
          txt: "其他宝贝",
        },
      ],
      columns: [
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
      // radio
      need: true,
    };
  },
  methods: {
    showPopup() {
      this.showGoodsCategory = true;
    },
    showGoodQualityPopup() {
      this.showGoodQuality = true;
    },

    onCloseGoodsCategory() {
      this.showGoodsCategory = false;
    },
    onCloseGoodQuality() {
      this.showGoodQuality = false;
    },
    rightTap(index) {
      this.rightIndex = index;
    },
    radioChange(e) {
      console.log(e);
    },
  },
  components: {
    VanPopup,
    VanIcon,
    VanPicker,
    Toast,
  },
};
</script>

<style lang="scss" scoped>
.bottom-options {
  margin-top: 15px;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  .popup {
    width: 50px;
    height: 50px;
  }
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
        .icon {
          width: 30px;
          height: 30px;
        }
        .txt {
          margin-top: 10px;
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
  }
  .goods-quality {
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
          color: #2a7ffa;
          background-color: pink;
        }
      }
    }
  }
  &__item {
    display: flex;
    justify-content: space-between;
    padding: 20px 15px 0;
    font-size: 12px;
    font-weight: bold;
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
      }
    }

    .input {
    }
  }
  &__item.need {
    padding-bottom: 15px;
    .options {
      padding-right: 10px;

      .radio-sell {
        padding-right: 5px;
      }
    }
  }
}
</style>
