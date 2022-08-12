<template>
  <div class="wrap">
    <div class="nav-items">
      <div class="nav-item" v-for="(item, index) in navIconList" :key="index" @click="toggleNav(index)">
        <image :src="item.url" class="icon"></image>
        <div class="title">{{ item.title }}</div>
        <div :class="{ active: item.active === true }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navIconList: [
        {
          url: "../../../static/my/my-goods.svg",
          title: "我的商品",
          active: true,
        },
        {
          url: "../../../static/my/tip.svg",
          title: "使用提示",
          active: false
        },
        {
          url: "../../../static/my/contact-author.svg",
          title: "联系作者",
          active: false
        },
        {
          url: "../../../static/my/share.svg",
          title: "分享软件",
          active: false
        },
      ],
    };
  },
  methods: {
    toggleNav(index) {
      console.log("点击了--" + this.navIconList[index].title);
      // 点击切换
      // 切换之前 激活状态全部为false
      this.navIconList.forEach(item => {
        item.active = false;
      });
      // 被点击的选项设为true
      this.navIconList[index].active = true;
      console.log(this.navIconList);
      uni.$emit("update", { index: index, navIconList: this.navIconList });

    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 70px;
  padding: 0 25px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 10px;

  .nav-items {
    display: flex;
    // 是flex-direction 和 flex-wrap的简写形式
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .nav-item {
      position: relative;
      display: flex;
      flex-flow: 1;
      flex-direction: column;
      align-items: center;

      .icon {
        width: 30px;
        height: 30px;
      }

      .title {
        margin-top: 5px;
        font-size: 12px;
        font-weight: bold;
      }

      .active {
        position: absolute;
        bottom: -8px;
        width: 30px;
        height: 4px;
        background-color: #ffc300;
        border-radius: 10px;
      }
    }
  }
}
</style>