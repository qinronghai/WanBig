<script>
export default {
  onLaunch: async function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'wb-dev-test-8g4qxuuj00591c1e', // 专属测试环境
        traceUser: true,
      })
    }


    console.log("App Launch");

    let getOpenId = new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "getOpenID"
      }).then((res) => {
        if (res.result.openId !== "") {

          let { userInfo } = res.result.event;
          uni.setStorageSync('openid', userInfo.openId)
          uni.setStorageSync('userInfo', userInfo);
          resolve(userInfo.openId);
        }
      }).catch(console.error)
    })
    await getOpenId.then((res) => {
      console.log("获取用户的opeid成功，为：" + res);
    }, (fail) => {
      console.log(fail);
    })



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
