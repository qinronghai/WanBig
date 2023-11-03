/**
 * 这个类提供方法处理关于数据加载时等待的显示操作
 */
class DataLoader {
  static async loadDataWithLoading(action) {
    console.log("object :>> ", action);
    uni.showLoading({
      title: "加载中",
      mask: true,
    });

    try {
      await action();
    } catch (error) {
      console.log("数据加载失败 :>> ", error);
    } finally {
      uni.hideLoading();
    }
  }
}
export default DataLoader;
