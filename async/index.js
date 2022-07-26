export const request = (filePath) => {
  wx.showLoading({
    title: "加载中",
  });
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath: "good-pictures/" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000),
      filePath: filePath,
      name: "file",
      formData: { user: "test" },
      success: (res) => {
        resolve(res);
        console.log("调用异步请求成功");
      },
      fail: (err) => {
        reject(err);
        console.log("调用异步请求失败");
      },
      complete: () => {
        wx.hideLoading();
      },
    });
  });
};
