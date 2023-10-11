<template>
	<view>
		<button type="primary" @click="deleteUserData">
			删除用户数据
		</button>


	</view>
</template>

<script>
var util = require("../utils/formatTimeToChinese.js");

const db = wx.cloud.database();
const _ = db.command;
export default {
	data() {
		return {

		}
	},
	methods: {
		async deleteUserData() {
			db.collection("user").get().then(res => {
				console.log(res, "最新用户数据");
			})
		}
	},
	onLoad() {
		// 处理时间格式
		let riseTime = util.formatTimeToChinese(new Date());
		let auditTime = util.formatTimeToChinese(new Date());
		console.log(typeof riseTime);
		console.log(typeof auditTime);
	}


}
</script>

<style></style>
