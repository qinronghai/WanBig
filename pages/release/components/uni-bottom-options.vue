<template>
  <div class="bottom-options">
    <van-popup
      :show="show"
      round
      position="bottom"
      custom-style="height: 35%"
      @close="onClose"
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
    <div class="bottom-options__item">
      <div class="left">
        <image
          src="../../../static/release/goods-quality.svg"
          class="icon"
        ></image>
        <div class="txt">商品成色</div>
      </div>
      <div class="option"></div>
    </div>
    <div class="bottom-options__item need">
      <div class="left">
        <image
          src="../../../static/release/goods-need.svg"
          class="icon"
        ></image>
        <div class="txt">出/蹲</div>
      </div>
      <div class="option"></div>
    </div>
  </div>
</template>

<script>
import VanPopup from "../../../wxcomponents/vant/popup/index";
import VanIcon from "../../../wxcomponents/vant/icon";
export default {
  data() {
    return {
      show: false,
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
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },

    onClose() {
      this.show = false;
    },
  },
  components: {
    VanPopup,
    VanIcon,
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
  }
}
</style>
