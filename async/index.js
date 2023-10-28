export const request = (filePath, directory = "good-pictures/") => {
  wx.showLoading({
    title: "加载中",
  });

  console.log("filePath :>> ", filePath);
  const fileExt = filePath.match(/\.\w+$/);
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath: directory + new Date().getTime() + "-" + Math.floor(Math.random() * 1000) + (fileExt ? fileExt[0] : ""),
      filePath: filePath,
      name: "file",
      formData: {
        user: "test",
      },
      success: (res) => {
        console.log("调用异步请求成功");
        resolve(res);
      },
      fail: (err) => {
        console.log("调用异步请求失败");
        reject(err);
      },
      complete: () => {
        wx.hideLoading();
      },
    });
  });
};
