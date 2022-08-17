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

    const db = wx.cloud.database()



    console.log("App Launch");

    let getOpenId = new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "getOpenID"
      }).then((res) => {
        if (res.result.openId !== "") {

          let { userInfo } = res.result.event;
          uni.setStorageSync('openid', userInfo.openId)
          // uni.setStorageSync('userInfo', userInfo);
          resolve(userInfo.openId);
        }
      }).catch(console.error)
    })
    // 获取openid
    let openid = await getOpenId.then((res) => {
      console.log("App启动--获取用户的opeid成功，为：" + res);
      return res;
    }, (fail) => {
      console.log("App启动--获取用户的opeid成功，fail", fail);
    })
    // 获取用户信息
    await db.collection('user-info').where({
      _openid: openid
    }).get().then((res) => {
      if (res.data.length) {

        console.log("App启动--获取数据库中的用户信息成功", res);
        uni.setStorageSync('userInfo', res.data[0]);
      }
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
