<script>


export default {
  onLaunch: async function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'qrh-database01-5gz9zkuedd28e7fc',
        traceUser: true,
      })
    }

    const db = wx.cloud.database();
    const openid = await this.getOpenId();
    console.log("App Launch", openid);

    // 根据openid获取用户信息
    await db.collection("user").where({
      _openid: openid
    }).get().then((res) => {
      if (res.data.length > 0) {
        console.log("App Launch--数据库中有该用户的信息", res.data[0]);
        uni.setStorageSync('userInfo', res.data[0]);
        uni.setStorageSync('isRegister', true);
      } else {
        console.log("没有该用户信息")
        uni.setStorageSync('isRegister', false);
      }
    })


    /* let getOpenId = new Promise(function (resolve, reject) {
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
      console.log("App启动--获取用户的opeid fail", fail);
    })
	
    // 获取用户信息
    await db.collection('user').where({
      _openid: openid
    }).get().then((res) => {
      if (res.data.length) {

        console.log("App启动--获取数据库中的用户信息成功", res);
        uni.setStorageSync('userInfo', res.data[0]);
      }
    }) */

  },

  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },

  methods: {
    // 获取云函数openid
    getCloudOpenid: async function () {
      return this.openid = this.openid ||
        (await wx.cloud.callFunction({
          name: "getOpenID"
        })).result.OPENID
    },

    // 获取openid
    getOpenId: async function () {
      (this.openid = this.openid || uni.getStorageSync('openid')) || uni.setStorageSync('openid', await this.getCloudOpenid())
      return this.openid;
    },
  }
};
</script>

<style>
/*每个页面公共css */
@import "/wxcomponents/vant/common/index.wxss";
</style>
