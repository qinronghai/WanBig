<script>
export default {
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud1-0gb7xwq6a6005629',
        traceUser: true,
      })
    }


    console.log("App Launch");
    wx.cloud.callFunction({
      name: "getOpenID"
    }).then((res) => {
      let { userInfo } = res.result.event;
      // 取得用户openId
      console.log(userInfo);
      // 存储到本地缓存
      uni.setStorage({
        key: 'userInfo',
        data: userInfo,
        success: (result) => {
          console.log("app启动，openId存储到本地成功");
        },
        fail: (error) => {
          console.log("app启动，openId存储到本地失败！");

        }
      })
    }).catch(console.error)
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
@import "/wxcomponents/vant/common/index.wxss";
</style>
