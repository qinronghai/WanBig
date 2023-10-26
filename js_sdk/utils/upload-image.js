import { request } from "../../async/index";

/**
 * 这个类提供图片上传的方法
 */
class ImageUploader {
  /**
   * 初始化一个实例对象
   * @param {Array} fileList - 图片url列表
   */
  constructor(fileList) {
    this.fileList = fileList || [];
  }

  /**
   * 上传图像的方法
   * @returns {Promise<boolean>}
   */
  async upLoadImage() {
    try {
      const results = await Promise.all(this.fileList.map((file) => request(file.url)));

      results.forEach((res, index) => {
        this.fileList[index].url = res.fileID;
      });

      console.log("图片全部上传成功", results);
      return this.fileList;
    } catch (error) {
      console.error("图片上传失败", error);
      return [];
    }
  }
}

module.exports = ImageUploader;
