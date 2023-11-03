<template>
    <view style="height: 100%">
        <button
            :class="
                'tui-button-class tui-btn ' +
                ('tui-btn-' + size) +
                ' ' +
                (plain ? 'tui-' + type + '-outline' : 'tui-' + (type || 'gradual')) +
                ' ' +
                parse.getDisabledClass(disabled, type) +
                ' ' +
                parse.getShapeClass(shape, plain)
            "
            :hover-class="parse.getHoverClass(disabled, type, plain)"
            :loading="loading"
            :disabled="disabled"
            :open-type="openType"
            :app-parameter="appParameter"
            :hover-stop-propagation="hoverStopPropagation"
            @tap="handleClick"
            :session-from="sessionFrom"
            :send-message-title="sendMessageTitle"
            :send-message-path="sendMessagePath"
            :send-message-img="sendMessageImg"
            :show-message-card="showMessageCard"
            @contact="bindcontact"
            @getuserinfo="bindgetuserinfo"
            @getphonenumber="bindgetphonenumber"
            @error="binderror"
            :form-type="formType"
            v-if="!hidden"
        >
            <slot></slot>
        </button>
    </view>
</template>
<script module="parse" lang="wxs">
module.exports = {
  getDisabledClass: function(disabled, type) {
    var className = '';
    if (disabled && type != 'white' && type != 'gray') {
      className = type == 'gradual' ? 'btn-gradual-disabled' : 'tui-dark-disabled';
    }
    return className;
  },
  getShapeClass: function(shape, plain) {
    var className = '';
    if (shape == 'circle') {
      className = plain ? 'tui-outline-fillet' : 'tui-fillet';
    }
    return className;
  },
  getHoverClass: function(disabled, type, plain) {
    var className = '';
    if (!disabled) {
      className = plain ? 'tui-outline-hover' : ('tui-' + (type || 'gradual') + '-hover');
    }
    return className;
  }
}
</script>
<script>
//注意：自定义组件无法触发form的bindsubmit,bindreset事件
//可以在组件外层嵌套个button按钮，背景设为none，form-type写在外层按钮上(参考登录页面)
export default {
    data() {
        return {};
    },
    externalClasses: ['tui-button-class'],
    //自定义样式
    props: {
        // primary, white, danger, warning, green, gray,gradual
        type: {
            type: String,
            default: 'gradual'
        },
        // block, mini, small
        size: {
            type: String,
            default: 'block'
        },
        // circle, square
        shape: {
            type: String,
            default: 'square'
        },
        plain: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        openType: {
            type: String,
            default: ''
        },
        formType: {
            type: String,
            default: ''
        },
        hoverStopPropagation: {
            type: Boolean,
            default: false
        },
        lang: {
            type: String,
            default: 'en'
        },
        appParameter: {
            type: String,
            default: ''
        },
        sessionFrom: {
            type: String,
            default: ''
        },
        showMessageCard: {
            type: Boolean,
            default: false
        },
        sendMessageImg: {
            type: String,
            default: ''
        },
        sendMessagePath: {
            type: String,
            default: ''
        },
        sendMessageTitle: {
            type: String,
            default: ''
        },
        hidden: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            if (this.disabled) {
                return false;
            }
            this.$emit('click', {
                detail: {}
            });
        },
        bindgetuserinfo({ detail = {} } = {}) {
            this.$emit('getuserinfo', {
                detail: detail
            });
        },
        bindcontact({ detail = {} } = {}) {
            this.$emit('contact', {
                detail: detail
            });
        },
        bindgetphonenumber({ detail = {} } = {}) {
            this.$emit('getphonenumber', {
                detail: detail
            });
        },
        binderror({ detail = {} } = {}) {
            this.$emit('error', {
                detail: detail
            });
        }
    },
    created: function () {}
};
</script>
<style>
/* color start*/

.tui-primary {
    background: #5677fc !important;
    color: #fff;
}

.tui-danger {
    background: #eb0909 !important;
    color: #fff;
}

.tui-red {
    background: #e41f19 !important;
    color: #fff;
}

.tui-warning {
    background: #ff7900 !important;
    color: #fff;
}

.tui-green {
    background: #19be6b !important;
    color: #fff;
}

.tui-white {
    background: #fff !important;
    color: #333 !important;
}

.tui-gray {
    background: #ededed !important;
    color: #999 !important;
}

.tui-hover-gray {
    background: #f7f7f9 !important;
}

/* color end*/

.tui-btn {
    width: 100%;
    position: relative;
    border: 0 !important;
    border-radius: 10rpx;
}

.tui-btn::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(0.5, 0.5);
    transform: scale(0.5, 0.5);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    left: 0;
    top: 0;
    border-radius: 20rpx;
}

.tui-btn-block {
    font-size: 36rpx;
    height: 90rpx;
    line-height: 90rpx;
}

.tui-white::after {
    border: 1px solid #eaeef1;
}

.tui-white-hover {
    background: #e5e5e5 !important;
    color: #2e2e2e !important;
}

.tui-dark-disabled {
    opacity: 0.6;
    color: #fafbfc !important;
}

.tui-outline-hover {
    opacity: 0.5;
}

.tui-primary-hover {
    background: #4a67d6 !important;
    color: #e5e5e5 !important;
}

.tui-primary-outline::after {
    border: 1px solid #5677fc !important;
}

.tui-primary-outline {
    color: #5677fc !important;
    background: none;
}

.tui-danger-hover {
    background: #c80808 !important;
    color: #e5e5e5 !important;
}

.tui-danger-outline {
    color: #eb0909 !important;
    background: none;
}

.tui-danger-outline::after {
    border: 1px solid #eb0909 !important;
}

.tui-red-hover {
    background: #c51a15 !important;
    color: #e5e5e5 !important;
}

.tui-red-outline {
    color: #e41f19 !important;
    background: none;
}

.tui-red-outline::after {
    border: 1px solid #e41f19 !important;
}

.tui-warning-hover {
    background: #e56d00 !important;
    color: #e5e5e5 !important;
}

.tui-warning-outline {
    color: #ff7900 !important;
    background: none;
}

.tui-warning-outline::after {
    border: 1px solid #ff7900 !important;
}

.tui-green-hover {
    background: #16ab60 !important;
    color: #e5e5e5 !important;
}

.tui-green-outline {
    color: #44cf85 !important;
    background: none;
}

.tui-green-outline::after {
    border: 1px solid #44cf85 !important;
}

.tui-gray-hover {
    background: #d5d5d5 !important;
    color: #898989;
}

.tui-gray-outline,
.tui-white-outline {
    color: #999 !important;
    background: none !important;
}

.tui-gray-outline::after,
.tui-white-outline::after {
    border: 1px solid #ccc !important;
}

/*圆角 */

.tui-fillet {
    border-radius: 45rpx;
}

.tui-white.tui-fillet::after {
    border-radius: 90rpx;
}

.tui-outline-fillet::after {
    border-radius: 90rpx;
}

/*渐变 */

.tui-gradual {
    background: linear-gradient(-90deg, #5677fc, #5c8dff);
    border-radius: 45rpx;
    color: #fff;
}

.tui-gradual-hover {
    color: #d5d4d9 !important;
    background: linear-gradient(-90deg, #4a67d6, #4e77d9);
}

.btn-gradual-disabled {
    color: #fafbfc !important;
    border-radius: 45rpx;
    background: linear-gradient(-90deg, #cad8fb, #c9d3fb);
}

/*不同尺寸 */

.tui-btn-mini {
    width: auto;
    font-size: 30rpx;
    height: 70rpx;
    line-height: 70rpx;
}

.tui-btn-small {
    width: auto;
    font-size: 30rpx;
    height: 60rpx;
    line-height: 60rpx;
}

/* button end*/
</style>
