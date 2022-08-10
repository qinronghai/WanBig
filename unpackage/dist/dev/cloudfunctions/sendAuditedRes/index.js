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
                    value: event.goodName
                },
                time11: {
                    value: event.riseTime
                },
                time4: {
                    value: event.auditTime 
                },
                phrase2: {
                    value: event.auditResults 
                },
                thing3: {
                    value: event.note 
                }
            },
            templateId: '9Fs4ueUrKEpp1brJDggbOcQ-m3TAOLVEc6SwBxGY3l4',
            // miniprogramState: 'formal'
        })
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
        return err
    }
}