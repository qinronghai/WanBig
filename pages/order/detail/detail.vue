<template>
    <view class="contain">
        <view class="card">
            <image class="top_over" src="/static/images/over.png"></image>
            <image class="bot_over" src="/static/images/over.png"></image>
            <view class="goods_box">
                <image class="goods_img" :src="detail.bookinfo.pic"></image>
                <view class="goods_content">
                    <view class="goods_title text-cut">{{ detail.bookinfo.title }}(第{{ detail.bookinfo.edition }})</view>
                    <view class="goods_author text-cut">{{ detail.bookinfo.author }}</view>
                </view>
                <view class="goods_price">￥{{ detail.price }}元</view>
            </view>
            <view class="border"></view>
            <view class="list">
                <view class="list_1">{{ detail.deliveryid == 0 ? '自提' : '帮送' }}</view>
                <view class="list_2">{{ detail.deliveryid == 0 ? detail.ztplace : detail.psplace }}</view>
            </view>
            <view class="border"></view>
            <view class="list">
                <view class="list_1">{{ detail.status == 1 ? '等待收货中' : detail.status == 2 ? '交易完成' : '订单已取消' }}</view>
                <view class="list_2">{{ detail.status == 1 ? '系统已电话邮件通知卖家准备' : detail.status == 2 ? '要不再来一单' : '祝您生活愉快' }}</view>
            </view>
            <view class="border"></view>
            <view class="orderfare">ORDER FARE</view>
            <view class="fare_box">
                <view class="fare_title">下单时间</view>
                <view class="fare_des">{{ creatTime }}</view>
            </view>
            <view class="fare_box">
                <view class="fare_title">支付金额</view>
                <view class="fare_des">￥{{ detail.price }}.'00'元</view>
            </view>
            <view class="border"></view>
            <view class="orderfare">CONTACT SELLER</view>
            <view class="fare_box" @tap="phone" :data-phone="userinfo.phone">
                <view class="fare_title">电话</view>
                <view class="fare_des">{{ userinfo.phone }}</view>
            </view>
            <view class="fare_box" @tap="copy" :data-copy="userinfo.email" data-name="邮箱">
                <view class="fare_title">邮箱</view>
                <view class="fare_des">{{ userinfo.email }}</view>
            </view>
            <view class="fare_box" v-if="userinfo.wxnum !== ''" @tap="copy" :data-copy="userinfo.wxnum" data-name="微信">
                <view class="fare_title">微信</view>
                <view class="fare_des">{{ userinfo.wxnum }}</view>
            </view>
            <view class="fare_box" v-if="userinfo.qqnum !== ''" @tap="copy" :data-copy="userinfo.qqnum" data-name="QQ">
                <view class="fare_title">QQ</view>
                <view class="fare_des">{{ userinfo.qqnum }}</view>
            </view>
            <view class="border"></view>
            <view class="bot_box" v-if="detail.status == 1">
                <view class="cancel" @tap="cancel">取消订单</view>
                <view class="contact" @tap="confirm">确认收货</view>
            </view>
            <view class="bot_box">
                <view v-if="detail.status == 2 || detail.status == 3" class="delete" @tap="deleteFun">删除订单</view>
            </view>
        </view>
    </view>
</template>

<script>
const app = getApp();
const db = wx.cloud.database();
const config = require('../../../config.js');
const _ = db.command;
export default {
    data() {
        return {
            creatTime: '',

            detail: {
                bookinfo: {
                    pic: '',
                    title: '',
                    edition: '',
                    author: ''
                },

                price: '',
                deliveryid: 0,
                ztplace: '',
                psplace: '',
                status: 0
            },

            userinfo: {
                phone: '',
                email: '',
                wxnum: '',
                qqnum: ''
            }
        };
    },
    onLoad: function (e) {
        this.getdetail(e.id);
    },
    methods: {
        //回到首页
        home() {
            uni.switchTab({
                url: '/pages/index/index'
            });
        },

        //获取订单详情
        getdetail(_id) {
            let that = this;
            db.collection('order')
                .doc(_id)
                .get({
                    success(e) {
                        that.setData({
                            creatTime: config.formTime(e.data.creat),
                            detail: e.data
                        });
                        that.getSeller(e.data.seller);
                    },
                    fail() {
                        uni.showToast({
                            title: '获取失败，请稍后到订单中心内查看',
                            icon: 'none'
                        });
                    }
                });
        },

        //获取卖家信息
        getSeller(m) {
            let that = this;
            db.collection('user')
                .where({
                    _openid: m
                })
                .get({
                    success: function (res) {
                        uni.hideLoading();
                        that.setData({
                            userinfo: res.data[0]
                        });
                    }
                });
        },

        //取消订单
        cancel() {
            let that = this;
            uni.showModal({
                title: '温馨提示',
                content: '您确认要取消该订单吗',
                success(res) {
                    if (res.confirm) {
                        uni.showLoading({
                            title: '正在处理'
                        });
                        uniCloud.callFunction({
                            name: 'pay',
                            data: {
                                $url: 'changeP',
                                //云函数路由参数
                                _id: that.detail.sellid,
                                status: 0 //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
                            },

                            success: (res) => {
                                console.log('修改订单状态成功');
                                uniCloud.callFunction({
                                    name: 'pay',
                                    data: {
                                        $url: 'changeO',
                                        //云函数路由参数
                                        _id: that.detail._id,
                                        status: 3 //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
                                    },

                                    success: (res) => {
                                        console.log('修改订单状态成功');
                                        that.up(that.detail.price); //返回钱到余额
                                        that.canceltip();
                                        that.getdetail(that.detail._id);
                                    },
                                    fail(e) {
                                        uni.hideLoading();
                                        uni.showToast({
                                            title: '发生异常，请及时和管理人员联系处理',
                                            icon: 'none'
                                        });
                                    }
                                });
                            },
                            fail(e) {
                                uni.hideLoading();
                                uni.showToast({
                                    title: '发生异常，请及时和管理人员联系处理',
                                    icon: 'none'
                                });
                            }
                        });
                    }
                }
            });
        },

        //确认收货
        confirm() {
            let that = this;
            uni.showModal({
                title: '温馨提示',
                content: '您确认已收货吗',
                success(res) {
                    if (res.confirm) {
                        uni.showLoading({
                            title: '正在处理'
                        });
                        uniCloud.callFunction({
                            name: 'pay',
                            data: {
                                $url: 'changeP',
                                //云函数路由参数
                                _id: that.detail.sellid,
                                status: 2 //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
                            },

                            success: (res) => {
                                console.log('修改订单状态成功');
                                uniCloud.callFunction({
                                    name: 'pay',
                                    data: {
                                        $url: 'changeO',
                                        //云函数路由参数
                                        _id: that.detail._id,
                                        status: 2 //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
                                    },

                                    success: (res) => {
                                        console.log('修改订单状态成功');
                                        uniCloud.callFunction({
                                            name: 'his',
                                            data: {
                                                $url: 'toseller',
                                                //云函数路由参数
                                                seller: that.detail.seller,
                                                num: that.detail.price
                                            },
                                            success() {
                                                uni.hideLoading();
                                                that.confirmtip();
                                                that.getdetail(that.detail._id);
                                            }
                                        });
                                    },
                                    fail(e) {
                                        uni.hideLoading();
                                        uni.showToast({
                                            title: '发生异常，请及时和管理人员联系处理',
                                            icon: 'none'
                                        });
                                    }
                                });
                            },
                            fail(e) {
                                uni.hideLoading();
                                uni.showToast({
                                    title: '发生异常，请及时和管理人员联系处理',
                                    icon: 'none'
                                });
                            }
                        });
                    }
                }
            });
        },

        //删除订单
        deleteFun() {
            let that = this;
            uni.showModal({
                title: '温馨提示',
                content: '您确认要删除此订单吗',
                success(res) {
                    if (res.confirm) {
                        uni.showLoading({
                            title: '正在处理'
                        });
                        db.collection('order')
                            .doc(that.detail._id)
                            .remove({
                                success() {
                                    //页面栈返回
                                    let i = getCurrentPages();
                                    uni.navigateBack({
                                        success: function () {
                                            i[i.length - 2].getlist();
                                        }
                                    });
                                },
                                fail: console.error
                            });
                    }
                }
            });
        },

        //复制
        copy(e) {
            uni.setClipboardData({
                data: e.currentTarget.dataset.copy,
                success: (res) => {
                    uni.showToast({
                        title: '复制' + e.currentTarget.dataset.name + '成功',
                        icon: 'success',
                        duration: 1000
                    });
                }
            });
        },

        //电话拨打
        phone(e) {
            uni.makePhoneCall({
                phoneNumber: e.currentTarget.dataset.phone
            });
        },

        //余额计算
        up(num) {
            let that = this;
            uniCloud.callFunction({
                name: 'his',
                data: {
                    $url: 'recharge',
                    //云函数路由参数
                    num: num
                },
                success(e) {
                    uni.showToast({
                        title: '取消成功',
                        icon: 'success'
                    });
                    that.history('取消订单退款', num, 1);
                },
                fail(e) {
                    uni.showToast({
                        title: '发送错误，请联系管理员',
                        icon: 'none'
                    });
                }
            });
        },

        //历史记录
        history(name, num, type) {
            let that = this;
            db.collection('history').add({
                data: {
                    stamp: new Date().getTime(),
                    type: type,
                    //1充值2支付
                    name: name,
                    num: num,
                    oid: app.globalData.openid
                },
                success: function (res) {
                    console.log(res);
                },
                fail: console.error
            });
        },

        //邮件提醒交易取消
        canceltip() {
            let that = this;
            uniCloud.callFunction({
                name: 'email',
                data: {
                    type: 4,
                    //1下单提醒2提醒收货3取消交易4取消订单5交易完成
                    email: that.userinfo.email,
                    title: that.detail.bookinfo.title
                },
                success: (res) => {
                    console.log(res);
                }
            });
        },

        //邮件提醒订单完成
        confirmtip() {
            let that = this;
            uniCloud.callFunction({
                name: 'email',
                data: {
                    type: 5,
                    //1下单提醒2提醒收货3取消交易4取消订单5交易完成
                    email: that.userinfo.email,
                    title: that.detail.bookinfo.title
                },
                success: (res) => {
                    console.log(res);
                }
            });
        }
    }
};
</script>
<style>
page {
    background: #fbbd08;
}

.contain {
    display: flex;
    padding: 20rpx 28rpx;
    width: 100%;
    box-sizing: border-box;
}

.card {
    width: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 40rpx 25rpx;
}

.top_over {
    width: 100%;
    height: 20rpx;
    position: absolute;
    left: 0rpx;
    top: -10rpx;
}

.bot_over {
    width: 100%;
    height: 20rpx;
    position: absolute;
    left: 0rpx;
    bottom: -10rpx;
}

.goods_box {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    height: 100rpx;
}

.goods_img {
    width: 90rpx;
    height: 90rpx;
}

.goods_content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 20rpx;
    width: calc(100% - 240rpx);
    height: 90%;
}

.goods_title {
    font-size: 29rpx;
    letter-spacing: 3rpx;
}

.goods_author {
    font-size: 26rpx;
    letter-spacing: 2rpx;
    color: rgb(150, 150, 150);
}

.goods_price {
    width: 150rpx;
    height: 100%;
    font-size: 32rpx;
    color: #f00;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
}

.border {
    width: 100%;
    height: 20rpx;
    border-bottom: 1rpx solid #eee;
}

.list {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 30rpx 0 10rpx 0;
}

.list_1 {
    font-size: 26rpx;
    color: rgb(167, 167, 167);
    letter-spacing: 2rpx;
}

.list_2 {
    padding-top: 10rpx;
    font-size: 32rpx;
    letter-spacing: 3rpx;
}

.orderfare {
    margin-top: 28rpx;
    font-size: 22rpx;
    font-weight: 600;
    letter-spacing: 2rpx;
    color: rgb(167, 167, 167);
    padding-bottom: 20rpx;
}

.fare_box {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx 0;
}

.fare_title {
    font-size: 28rpx;
    letter-spacing: 2rpx;
}

.fare_des {
    font-size: 27rpx;
    color: rgb(167, 167, 167);
}
.bot_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.cancel {
    font-size: 30rpx;
    width: 620rpx;
    height: 80rpx;
    background: #000;
    color: #fff;
    border-radius: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40rpx;
    letter-spacing: 4rpx;
}

.contact {
    font-size: 30rpx;
    width: 620rpx;
    height: 80rpx;
    background: #fbbd08;
    color: #000;
    border-radius: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20rpx;
    letter-spacing: 4rpx;
}
.delete {
    font-size: 30rpx;
    width: 620rpx;
    height: 80rpx;
    background: #adadad;
    color: #fff;
    border-radius: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20rpx;
    letter-spacing: 4rpx;
}
</style>
