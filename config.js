var data = {
    //云开发环境id
    env: 'bbgu-cloud1-4g5b9j0m40b72a3d',
    //分享配置
    share_title: 'BBGU二手书',
    share_img: '/static/images/poster.jpg',
    //可以是网络地址，本地文件路径要填绝对位置
    share_poster: 'https://mmbiz.qpic.cn/mmbiz_jpg/nJPznPUZbhpA064Cl78xxvzBYTDa6O1Kl7RY1K6TerBaXcUf5AoN6x7s8q7xHgeu0Cl5qarPzE6ibbQZasWRErg/640',
    //必须为网络地址
    //客服联系方式
    kefu: {
        weixin: 'AHAI_1010',
        qq: '185043843',
        gzh: 'https://mmbiz.qpic.cn/mmbiz_png/nJPznPUZbhpKCwnibUUqnt7BQXr3MbNsasCfsBd0ATY8udkWPUtWjBTtiaaib6rTREWHnPYNVRZYgAesG9yjYOG7Q/640',
        //公众号二维码必须为网络地址
        phone: '' //如果你不设置电话客服，就留空
    },

    //默认启动页背景图，防止请求失败完全空白
    //可以是网络地址，本地文件路径要填绝对位置
    bgurl: '/static/images/startBg.jpg',
    //BBGU学院与专业
    campus: [
        {
            id: 1,
            label: '电信',
            children: [
                {
                    id: 2,
                    label: '计算机科学与技术'
                },
                {
                    id: 3,
                    label: '人工智能'
                },
                {
                    id: 4,
                    label: '物联网工程'
                },
                {
                    id: 5,
                    label: '电子信息工程（中波）'
                },
                {
                    id: 6,
                    label: '电子信息工程（普本）'
                }
            ]
        },
        {
            id: 7,
            label: '东密',
            children: [
                {
                    id: 8,
                    label: '机械工程'
                },
                {
                    id: 9,
                    label: '车辆工程'
                },
                {
                    id: 10,
                    label: '机械设计制造及其自化'
                },
                {
                    id: 11,
                    label: '物联网工程'
                },
                {
                    id: 12,
                    label: '工程造价'
                }
            ]
        },
        {
            id: 13,
            label: '海洋',
            children: [
                {
                    id: 14,
                    label: '海洋科学'
                },
                {
                    id: 15,
                    label: '水产养殖学'
                },
                {
                    id: 16,
                    label: '生物制药'
                }
            ]
        },
        {
            id: 17,
            label: '海运',
            children: [
                {
                    id: 18,
                    label: '航海技术'
                },
                {
                    id: 19,
                    label: '轮机工程'
                },
                {
                    id: 20,
                    label: '船舶电子电气工程'
                }
            ]
        },
        {
            id: 21,
            label: '机船',
            children: [
                {
                    id: 22,
                    label: '自动化'
                },
                {
                    id: 23,
                    label: '车辆工程'
                },
                {
                    id: 24,
                    label: '船舶与海洋工程'
                },
                {
                    id: 25,
                    label: '机械工程 '
                }
            ]
        },
        {
            id: 26,
            label: '石化',
            children: [
                {
                    id: 27,
                    label: '油气储运工程'
                },
                {
                    id: 28,
                    label: '化学工程与工艺'
                },
                {
                    id: 29,
                    label: '能源化学工程'
                },
                {
                    id: 30,
                    label: '高分子材料与工程 '
                }
            ]
        },
        {
            id: 31,
            label: '食品',
            children: [
                {
                    id: 32,
                    label: '食品质量与安全'
                },
                {
                    id: 33,
                    label: '食品科学与工程'
                }
            ]
        },
        {
            id: 34,
            label: '建筑',
            children: [
                {
                    id: 35,
                    label: '港口航道与海岸工程'
                },
                {
                    id: 36,
                    label: '土木工程'
                }
            ]
        },
        {
            id: 37,
            label: '资环',
            children: [
                {
                    id: 38,
                    label: '测绘工程'
                },
                {
                    id: 39,
                    label: '地理信息科学'
                },
                {
                    id: 40,
                    label: '地理科学'
                }
            ]
        },
        {
            id: 41,
            label: '理学',
            children: [
                {
                    id: 42,
                    label: '物理学'
                },
                {
                    id: 43,
                    label: '数学与应用数学'
                }
            ]
        },
        {
            id: 44,
            label: '经管',
            children: [
                {
                    id: 45,
                    label: '旅游管理'
                },
                {
                    id: 46,
                    label: '物流管理'
                },
                {
                    id: 47,
                    label: '市场营销'
                },
                {
                    id: 48,
                    label: '国际经济与贸易'
                },
                {
                    id: 49,
                    label: '金融工程'
                },
                {
                    id: 50,
                    label: '财务管理'
                },
                {
                    id: 51,
                    label: '城市管理'
                }
            ]
        },
        {
            id: 52,
            label: '陶设',
            children: [
                {
                    id: 53,
                    label: '美术学'
                },
                {
                    id: 54,
                    label: '视觉传达设计'
                },
                {
                    id: 55,
                    label: '环境设计'
                },
                {
                    id: 56,
                    label: '产品设计'
                }
            ]
        },
        {
            id: 57,
            label: '人文',
            children: [
                {
                    id: 58,
                    label: '舞蹈表演'
                },
                {
                    id: 59,
                    label: '音乐表演'
                },
                {
                    id: 60,
                    label: '音乐学'
                },
                {
                    id: 61,
                    label: '新闻学'
                },
                {
                    id: 62,
                    label: '汉语国际教育'
                },
                {
                    id: 63,
                    label: '汉语言文学'
                }
            ]
        },
        {
            id: 64,
            label: '外语',
            children: [
                {
                    id: 65,
                    label: '英语'
                },
                {
                    id: 66,
                    label: '泰语'
                },
                {
                    id: 67,
                    label: '越南语'
                }
            ]
        },
        {
            id: 68,
            label: '教育',
            children: [
                {
                    id: 69,
                    label: '学前教育'
                },
                {
                    id: 70,
                    label: '小学教育'
                }
            ]
        },
        {
            id: 71,
            label: '体育',
            children: [
                {
                    id: 72,
                    label: '体育教育'
                }
            ]
        }
    ],
    //配置学院，建议不要添加太多，不然前端不好看
    college: [
        {
            name: '通用',
            id: -1
        },
        {
            name: '电信',
            id: 0
        },
        {
            name: '经管',
            id: 1
        },
        {
            name: '海运',
            id: 2
        },
        {
            name: '海洋 ',
            id: 3
        },
        {
            name: '机船',
            id: 4
        },
        {
            name: '石化',
            id: 5
        },
        {
            name: '人文',
            id: 6
        },
        {
            name: '食品',
            id: 7
        },
        {
            name: '建筑',
            id: 8
        },
        {
            name: '资环',
            id: 9
        },
        {
            name: '理学',
            id: 10
        },
        {
            name: '陶设',
            id: 11
        },
        {
            name: '外语',
            id: 12
        },
        {
            name: '教育',
            id: 13
        },
        {
            name: '东密',
            id: 14
        },
        {
            name: '体育',
            id: 15
        },
        {
            name: '其他',
            id: 16
        }
    ],
    //成色
    condition: [
        {
            id: 0,
            name: '全新'
        },
        {
            id: 1,
            name: '优良'
        },
        {
            id: 0,
            name: '轻微磨损'
        },
        {
            id: 0,
            name: '中等磨损'
        },
        {
            id: 0,
            name: '严重磨损'
        }
    ]
};
//下面的就别动了
function formTime(creatTime) {
    let date = new Date(creatTime);
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();
    let H = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    if (M < 10) {
        M = '0' + M;
    }
    if (D < 10) {
        D = '0' + D;
    }
    if (H < 10) {
        H = '0' + H;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }
    return Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':' + s;
}
function days() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    let date = year + '' + month + day;
    return date;
}
module.exports = {
    data: JSON.stringify(data),
    formTime: formTime,
    days: days
};
