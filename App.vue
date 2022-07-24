<script>
export default {
  onLaunch: async function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'wb-dev-test-5g8b8c8u14429de5', // 专属测试环境
        traceUser: true,
      })
    }


    console.log("App Launch");
    var i = 100;
    function promise() {
      return new Promise(function (resolve, reject) {
        wx.cloud.callFunction({
          name: "getOpenID"
        }).then((res) => {
          if (res.result.event.openId != '') {
            let { userInfo } = res.result.event;
            // 取得用户openId
            console.log("用户的opeid为", userInfo.openId);
            // 存储到本地缓存
            uni.setStorageSync('userInfo', userInfo);
            console.log('App启动，执行云函数获取openId成功');
            console.log('1');
            resolve(userInfo);
          }
        }).catch(console.error)
      });
    }

    await promise().then((success) => {
      console.log(success);
      console.log('2');
    }, (fail) => {
      console.log(fail);
    })


    console.log('3');

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
