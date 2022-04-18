<template>
  <view class="footer">
    <view class="create-time"> WanBig 创立至今 {{ timed }} 天啦 </view>
    <view class="project-info" @click="showProjectInfo">
      了解此项目及使用须知
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      time: 200,
    };
  },
  computed: {
    timed() {
      // 引入dayjs
      let dayjs = require("dayjs");

      const now = dayjs(dayjs().format());
      const createTime = dayjs("2021-10-23");

      // 返回现在与创立的时间差
      return now.diff(createTime, "day");
    },
  },
  methods: {
    showProjectInfo() {
      console.log("被点击了");
      uni.navigateTo({
        url: "/pages/project-info/project-info",
        success(res) {
          console.log(res);
        },
        fail(err) {
          console.log(err);
        },
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 100rpx;
  transform: translateX(-50%);
  color: $uni-text-color-grey;
  .create-time {
    margin-bottom: 30rpx;
    font-size: 28rpx;
    color: #333;
  }
  .project-info {
    font-size: 24.53rpx;
    border-bottom: 1px solid $uni-text-color-grey;
  }
}
</style>