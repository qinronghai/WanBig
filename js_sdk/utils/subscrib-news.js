/**
 * 这个类提供方法处理关于消息的订阅
 */
class MessageSubscriber {
  constructor() {}

  /**
   * 根据提供的模板ID请求用户订阅通知的权限
   * @param {string[]} tmplIds - 用户订阅的模板id数组。
   * @returns {Promise}
   */
  async subscribeNews(tmplIds) {
    return new Promise((resolve, reject) => {
      wx.requestSubscribeMessage({
        tmplIds: tmplIds,
        success: (res) => {
          if (res[tmplIds[0]] === "accept") {
            this._showToast("订阅成功！", resolve);
          } else {
            this._showAuthorizationModal(tmplIds);
          }
        },
        fail: (err) => {
          console.error("订阅消息失败", err);
          reject(err);
        },
      });
    });
  }

  _showToast(message, callback) {
    wx.showToast({
      title: message,
      duration: 1000,
      success() {
        console.log("订阅消息成功");
        callback();
      },
    });
  }

  _showAuthorizationModal(tmplIds) {
    wx.showModal({
      content: "未授权发送通知，您将收不到通知！",
      confirmText: "重新授权",
      cancelText: "取消授权",
      success: (result) => {
        if (result.confirm) {
          this.subscribeNews(tmplIds);
        } else {
          console.log("用户取消授权");
        }
      },
    });
  }
}

module.exports = MessageSubscriber;
