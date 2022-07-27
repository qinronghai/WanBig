// 云函数入口文件
const cloud = require('wx-server-sdk')
//可配置环境
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await cloud.openapi.security.msgSecCheck({
        "openid": event.openid,
        "scene": 1,
        "version": 2,
      "content":event.content
    })
    // return res;
  }catch(err){
    return err;
  }
}
