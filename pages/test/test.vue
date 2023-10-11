<template>
	<view>
		<button type="primary" @click="deleteUserData">
			删除用户数据
		</button>
	</view>
</template>

<script>
	const db = wx.cloud.database();
	const _ = db.command;
	export default {
		data() {
			return {

			}
		},
		methods: {
			async deleteUserData() {
				db.collection("user-info").get().then(res => {
					console.log("最新用户数据", res);
				})
			}
		}
	}
</script>

<style>

</style>
