<template>
	<div class="goods-desc">
		<div class="top-tip">
			<image src="../../../static/release/goods-desc.svg" class="icon-tip"></image>
			<div class="txt-tip">优质的商品介绍会有更好的展示效果哦~</div>
		</div>
		<div class="bottom-desc__input">
			<textarea :value="title" v-on:confirm="confirmDesc" v-on:blur="confirmDesc" auto-height maxlength="140"
				class="textarea" placeholder="在这里输入商品描述哦~" confirm-type="done" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: ''
			}
		},
		methods: {
			confirmDesc(e) {
				this.title = e.detail.value;
				console.log('确认文本--', this.title);
				this.$emit('getGoodTitle', this.title)
			}

		},
		watch: {

		},
	};
</script>

<style lang="scss" scoped>
	.goods-desc {
		height: 408rpx;

		// border-radius: 30rpx;
		padding: 0;
		background-color: #fff;

		.top-tip {
			display: flex;
			align-items: center;
			padding: 14rpx 0 0 24rpx;

			.icon-tip {
				width: 48rpx;
				height: 48rpx;
				padding-right: 10rpx;
			}

			.txt-tip {
				font-size: 24rpx;
			}
		}

		.bottom-desc__input {
			padding: 26rpx;

			.textarea {

				width: 100%;
				min-height: 240rpx;
				font-size: 30rpx;
				// height: 100%;
			}
		}
	}
</style>