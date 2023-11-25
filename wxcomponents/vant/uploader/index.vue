<template>
	<uni-shadow-root class="vant-uploader-index">
		<view class="van-uploader">
			<view class="van-uploader__wrapper">

				<view v-for="(item,index) in (lists)" :key="item.index" v-if="previewImage" class="van-uploader__preview"
					:data-index="index" @click="onClickPreview">
					<image v-if="item.isImage" :mode="imageFit" :src="item.thumb || item.url" :alt="item.name || ('图片' + index)"
						class="van-uploader__preview-image" :style="computed.sizeStyle({ previewSize })" :data-index="index"
						@click="onPreviewImage"></image>
					<video v-else-if="item.isVideo" :src="item.url" :title="item.name || ('视频' + index)" :poster="item.thumb"
						:autoplay="item.autoplay" class="van-uploader__preview-image" :style="computed.sizeStyle({ previewSize })"
						:data-index="index" @click="onPreviewVideo">
					</video>
					<view v-else class="van-uploader__file" :style="computed.sizeStyle({ previewSize })" :data-index="index"
						@click="onPreviewFile">
						<van-icon name="description" class="van-uploader__file-icon"></van-icon>
						<view class="van-uploader__file-name van-ellipsis">{{ item.name || item.url }}</view>
					</view>
					<view v-if="item.status === 'uploading' || item.status === 'failed'" class="van-uploader__mask">
						<van-icon v-if="item.status === 'failed'" name="close" class="van-uploader__mask-icon"></van-icon>
						<van-loading v-else custom-class="van-uploader__loading"></van-loading>
						<text v-if="item.message" class="van-uploader__mask-message">{{ item.message }}</text>
					</view>
					<view v-if="deletable && item.deletable" :data-index="index" class="van-uploader__preview-delete"
						@click.stop.prevent="deleteItem">
						<van-icon name="cross" class="van-uploader__preview-delete-icon"></van-icon>
					</view>
				</view>

				<block v-if="isInCount">
					<view class="van-uploader__slot" @click="startUpload">
						<slot></slot>
					</view>


					<view v-if="showUpload" :class="'van-uploader__upload '+(disabled ? 'van-uploader__upload--disabled': '')"
						:style="computed.sizeStyle({ previewSize })" @click="startUpload">
						<van-icon :name="uploadIcon" class="van-uploader__upload-icon"></van-icon>
						<text v-if="uploadText" class="van-uploader__upload-text">{{ uploadText }}</text>
					</view>
				</block>
			</view>
		</view>
	</uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<wxs src="./index.wxs" module="computed"></wxs>
<script>
	import VanIcon from '../icon/index.vue'
	import VanLoading from '../loading/index.vue'
	global['__wxVueOptions'] = {
		components: {
			'van-icon': VanIcon,
			'van-loading': VanLoading
		}
	}

	global['__wxRoute'] = 'vant/uploader/index'
	import {
		VantComponent
	} from '../common/component';
	import {
		isImageFile,
		chooseFile,
		isVideoFile
	} from './utils';
	import {
		chooseImageProps,
		chooseVideoProps
	} from './shared';
	import {
		isBoolean,
		isPromise
	} from '../common/validator';
	VantComponent({
		props: Object.assign(Object.assign({
			disabled: Boolean,
			multiple: Boolean,
			uploadText: String,
			useBeforeRead: Boolean,
			afterRead: null,
			beforeRead: null,
			previewSize: {
				type: null,
				value: 80,
			},
			name: {
				type: null,
				value: '',
			},
			accept: {
				type: String,
				value: 'image',
			},
			fileList: {
				type: Array,
				value: [],
				observer: 'formatFileList',
			},
			maxSize: {
				type: Number,
				value: Number.MAX_VALUE,
			},
			maxCount: {
				type: Number,
				value: 100,
			},
			deletable: {
				type: Boolean,
				value: true,
			},
			showUpload: {
				type: Boolean,
				value: true,
			},
			previewImage: {
				type: Boolean,
				value: true,
			},
			previewFullImage: {
				type: Boolean,
				value: true,
			},
			imageFit: {
				type: String,
				value: 'scaleToFill',
			},
			uploadIcon: {
				type: String,
				value: 'photograph',
			}
		}, chooseImageProps), chooseVideoProps),
		data: {
			lists: [],
			isInCount: true,
		},
		methods: {
			formatFileList() {
				const {
					fileList = [], maxCount
				} = this.data;
				const lists = fileList.map((item) => (Object.assign(Object.assign({}, item), {
					isImage: isImageFile(item),
					isVideo: isVideoFile(item),
					deletable: isBoolean(item.deletable) ? item.deletable : true
				})));
				this.setData({
					lists,
					isInCount: lists.length < maxCount
				});
			},
			getDetail(index) {
				return {
					name: this.data.name,
					index: index == null ? this.data.fileList.length : index,
				};
			},
			startUpload() {
				const {
					maxCount,
					multiple,
					lists,
					disabled
				} = this.data;
				if (disabled)
					return;
				chooseFile(Object.assign(Object.assign({}, this.data), {
						maxCount: maxCount - lists.length
					}))
					.then((res) => {
						this.onBeforeRead(multiple ? res : res[0]);
					})
					.catch((error) => {
						this.$emit('error', error);
					});
			},
			onBeforeRead(file) {
				const {
					beforeRead,
					useBeforeRead
				} = this.data;
				let res = true;
				if (typeof beforeRead === 'function') {
					res = beforeRead(file, this.getDetail());
				}
				if (useBeforeRead) {
					res = new Promise((resolve, reject) => {
						this.$emit('before-read', Object.assign(Object.assign({
							file
						}, this.getDetail()), {
							callback: (ok) => {
								ok ? resolve() : reject();
							}
						}));
					});
				}
				if (!res) {
					return;
				}
				if (isPromise(res)) {
					res.then((data) => this.onAfterRead(data || file));
				} else {
					this.onAfterRead(file);
				}
			},
			onAfterRead(file) {
				const {
					maxSize,
					afterRead
				} = this.data;
				const oversize = Array.isArray(file) ?
					file.some((item) => item.size > maxSize) :
					file.size > maxSize;
				if (oversize) {
					this.$emit('oversize', Object.assign({
						file
					}, this.getDetail()));
					return;
				}
				if (typeof afterRead === 'function') {
					afterRead(file, this.getDetail());
				}
				this.$emit('after-read', Object.assign({
					file
				}, this.getDetail()));
			},
			deleteItem(event) {
				const {
					index
				} = event.currentTarget.dataset;
				this.$emit('delete', Object.assign(Object.assign({}, this.getDetail(index)), {
					file: this.data.fileList[index]
				}));
			},
			onPreviewImage(event) {
				if (!this.data.previewFullImage)
					return;
				const {
					index
				} = event.currentTarget.dataset;
				const {
					lists
				} = this.data;
				const item = lists[index];
				wx.previewImage({
					urls: lists.filter((item) => isImageFile(item)).map((item) => item.url),
					current: item.url,
					fail() {
						wx.showToast({
							title: '预览图片失败',
							icon: 'none'
						});
					},
				});
			},
			onPreviewVideo(event) {
				if (!this.data.previewFullImage)
					return;
				const {
					index
				} = event.currentTarget.dataset;
				const {
					lists
				} = this.data;
				wx.previewMedia({
					sources: lists
						.filter((item) => isVideoFile(item))
						.map((item) => (Object.assign(Object.assign({}, item), {
							type: 'video'
						}))),
					current: index,
					fail() {
						wx.showToast({
							title: '预览视频失败',
							icon: 'none'
						});
					},
				});
			},
			onPreviewFile(event) {
				const {
					index
				} = event.currentTarget.dataset;
				wx.openDocument({
					filePath: this.data.lists[index].url,
					showMenu: true,
				});
			},
			onClickPreview(event) {
				const {
					index
				} = event.currentTarget.dataset;
				const item = this.data.lists[index];
				this.$emit('click-preview', Object.assign(Object.assign({}, item), this.getDetail(index)));
			},
		},
	});
	export default global['__wxComponents']['vant/uploader/index']
</script>
<style platform="mp-weixin">
	@import "../common/index.css";

	.van-uploader {
		position: relative;
		display: inline-block;
	}

	.van-uploader__wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	.van-uploader__slot:empty {
		display: none;
	}

	.van-uploader__slot:not(:empty)+.van-uploader__upload {
		display: none !important;
	}

	.van-uploader__upload {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: var(--uploader-size, 160rpx);
		height: var(--uploader-size, 160rpx);
		margin: 0 16rpx 16rpx 0;
		background-color: var(--uploader-upload-background-color, #f7f8fa);
	}

	.van-uploader__upload:active {
		background-color: var(--uploader-upload-active-color, #f2f3f5);
	}

	.van-uploader__upload-icon {
		color: var(--uploader-icon-color, #dcdee0);
		font-size: var(--uploader-icon-size, 48rpx);
	}

	.van-uploader__upload-text {
		margin-top: var(--padding-xs, 16rpx);
		color: var(--uploader-text-color, #969799);
		font-size: var(--uploader-text-font-size, 24rpx);
	}

	.van-uploader__upload--disabled {
		opacity: var(--uploader-disabled-opacity, .5);
	}

	.van-uploader__preview {
		position: relative;
		margin: 0 16rpx 16rpx 0;
		cursor: pointer;
	}

	.van-uploader__preview-image {
		display: block;
		overflow: hidden;
		width: 240rpx;
		height: 219.04rpx;
	}

	.van-uploader__preview-delete,
	.van-uploader__preview-delete:after {
		position: absolute;
		top: 0;
		right: 0;
		width: var(--uploader-delete-icon-size, 28rpx);
		height: var(--uploader-delete-icon-size, 28rpx);
	}

	.van-uploader__preview-delete:after {
		content: "";
		background-color: var(--uploader-delete-background-color, rgba(0, 0, 0, .7));
		border-radius: 0 0 0 24rpx;
	}

	.van-uploader__preview-delete-icon {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
		color: var(--uploader-delete-color, #fff);
		font-size: var(--uploader-delete-icon-size, 28rpx);
		transform: scale(.7) translate(10%, -10%);
	}

	.van-uploader__file {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: var(--uploader-size, 160rpx);
		height: var(--uploader-size, 160rpx);
		background-color: var(--uploader-file-background-color, #f7f8fa);
	}

	.van-uploader__file-icon {
		color: var(--uploader-file-icon-color, #646566);
		font-size: var(--uploader-file-icon-size, 40rpx);
	}

	.van-uploader__file-name {
		box-sizing: border-box;
		width: 100%;
		padding: var(--uploader-file-name-padding, 0 8rpx);
		margin-top: var(--uploader-file-name-margin-top, 16rpx);
		color: var(--uploader-file-name-text-color, #646566);
		font-size: var(--uploader-file-name-font-size, 24rpx);
		text-align: center;
	}

	.van-uploader__mask {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		background-color: var(--uploader-mask-background-color, rgba(50, 50, 51, .88));
	}

	.van-uploader__mask-icon {
		font-size: var(--uploader-mask-icon-size, 44rpx);
	}

	.van-uploader__mask-message {
		padding: 0 var(--padding-base, 8rpx);
		margin-top: 12rpx;
		font-size: var(--uploader-mask-message-font-size, 24rpx);
		line-height: var(--uploader-mask-message-line-height, 28rpx);
	}

	.van-uploader__loading {
		width: var(--uploader-loading-icon-size, 44rpx);
		height: var(--uploader-loading-icon-size, 44rpx);
		color: var(--uploader-loading-icon-color, #fff) !important;
	}
</style>