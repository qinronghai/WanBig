// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const result = await cloud.openapi.subscribeMessage.send({
            touser: event.openid,
            page: 'pages/goods-detail/goods-detail?goodId=' + event.goodId,
            lang: 'zh_CN',
            data: {
                thing1: {
                    value: event.orderInfo
                },
                time2: {
                    value: event.startingTime
                },
                thing5: {
                    value: event.contact 
                },
                thing4: {
                    value: event.address 
                },
                time3: {
                    value: event.endTime 
                }
            },
            templateId: 'W6CsnO_5tp5kxNFMjFsh9z7PwuXWe_OUyXHxsNQeTag',
            // miniprogramState: 'formal'
        })
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
        return err
    }
}