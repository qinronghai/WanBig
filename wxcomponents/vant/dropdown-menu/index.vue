<template>
  <uni-shadow-root class="vant-dropdown-menu-index"
    ><view class="van-dropdown-menu van-dropdown-menu--top-bottom custom-class">
      <view
        v-for="(item, index) in itemListData"
        :key="item.index"
        :data-index="index"
        :class="utils.bem('dropdown-menu__item', { disabled: item.disabled })"
        @click="onTitleTap">
        <view
          :class="item.titleClass + ' ' + utils.bem('dropdown-menu__title', { active: item.showPopup, down: item.showPopup === (direction === 'down') })"
          :style="item.showPopup ? 'color:' + activeColor : ''">
          <view class="van-ellipsis">
            {{ computed.displayTitle(item) }}
          </view>
        </view>
      </view>

      <slot></slot> </view
  ></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<wxs src="./index.wxs" module="computed"></wxs>
<script>
global["__wxRoute"] = "vant/dropdown-menu/index";
import { VantComponent } from "../common/component";
import { useChildren } from "../common/relation";
import { addUnit, getRect, getSystemInfoSync } from "../common/utils";
let ARRAY = [];
VantComponent({
  field: true,
  relation: useChildren("dropdown-item", function () {
    this.updateItemListData();
  }),
  props: {
    activeColor: {
      type: String,
      observer: "updateChildrenData",
    },
    overlay: {
      type: Boolean,
      value: true,
      observer: "updateChildrenData",
    },
    zIndex: {
      type: Number,
      value: 10,
    },
    duration: {
      type: Number,
      value: 200,
      observer: "updateChildrenData",
    },
    direction: {
      type: String,
      value: "down",
      observer: "updateChildrenData",
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true,
      observer: "updateChildrenData",
    },
    closeOnClickOutside: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    itemListData: [],
  },
  beforeCreate() {
    const { windowHeight } = getSystemInfoSync();
    this.windowHeight = windowHeight;
    ARRAY.push(this);
  },
  destroyed() {
    ARRAY = ARRAY.filter((item) => item !== this);
  },
  methods: {
    updateItemListData() {
      this.setData({
        itemListData: this.children.map((child) => child.data),
      });
    },
    updateChildrenData() {
      this.children.forEach((child) => {
        child.updateDataFromParent();
      });
    },
    toggleItem(active) {
      this.children.forEach((item, index) => {
        const { showPopup } = item.data;
        if (index === active) {
          item.toggle();
        } else if (showPopup) {
          item.toggle(false, { immediate: true });
        }
      });
    },
    close() {
      this.children.forEach((child) => {
        child.toggle(false, { immediate: true });
      });
    },
    getChildWrapperStyle() {
      const { zIndex, direction } = this.data;
      return getRect(this, ".van-dropdown-menu").then((rect) => {
        const { top = 0, bottom = 0 } = rect;
        const offset = direction === "down" ? bottom : this.windowHeight - top;
        let wrapperStyle = `z-index: ${zIndex};`;
        if (direction === "down") {
          wrapperStyle += `top: ${addUnit(offset)};`;
        } else {
          wrapperStyle += `bottom: ${addUnit(offset)};`;
        }
        return wrapperStyle;
      });
    },
    onTitleTap(event) {
      const { index } = event.currentTarget.dataset;
      const child = this.children[index];
      if (!child.data.disabled) {
        ARRAY.forEach((menuItem) => {
          if (menuItem && menuItem.data.closeOnClickOutside && menuItem !== this) {
            menuItem.close();
          }
        });
        this.toggleItem(index);
      }
    },
  },
});
export default global["__wxComponents"]["vant/dropdown-menu/index"];
</script>
<style platform="mp-weixin">
@import "../common/index.css";

.van-dropdown-menu {
  display: flex;
  height: var(--dropdown-menu-height, 50px);
  border-radius: 10px 10px 0 0;
  background-color: var(--dropdown-menu-background-color, #fff);
  box-shadow: var(--dropdown-menu-box-shadow, 0 2px 12px hsla(210, 1%, 40%, 0.12));

  user-select: none;
  -webkit-user-select: none;
}

.van-dropdown-menu__item {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  min-width: 0;
}

.van-dropdown-menu__item:active {
  opacity: 0.7;
}

.van-dropdown-menu__item--disabled:active {
  opacity: 1;
}

.van-dropdown-menu__item--disabled .van-dropdown-menu__title {
  color: var(--dropdown-menu-title-disabled-text-color, #969799);
}

.van-dropdown-menu__title {
  position: relative;
  box-sizing: border-box;
  padding: var(--dropdown-menu-title-padding, 0 8px);
  max-width: 100%;
  color: var(--dropdown-menu-title-text-color, #323233);
  font-size: var(--dropdown-menu-title-font-size, 15px);
  line-height: var(--dropdown-menu-title-line-height, 18px);
}

.van-dropdown-menu__title:after {
  position: absolute;
  top: 50%;
  right: -4px;
  margin-top: -5px;
  border-width: 3px;
  border-style: solid;
  border-color: transparent transparent currentcolor currentcolor;
  content: "";
  opacity: 0.8;
  transform: rotate(-45deg);
}

.van-dropdown-menu__title--active {
  color: var(--dropdown-menu-title-active-text-color, #ee0a24);
}

.van-dropdown-menu__title--down:after {
  margin-top: -1px;
  transform: rotate(135deg);
}
</style>
