<template>
	<view>
		<button type="primary" @click="deleteUserData">
			删除用户数据
		</button>

		<button type="default" @click="getBookData">根据isbn获取图书数据</button>
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
			},

			async getBookData(isbn) {
				console.log("get book data");
				uni.request({
					url: 'http://www.bookschina.com/ashx/AdvancedSearch.ashx',
					method: 'GET',
					data: {
						isSpecial: false,
						isbn: '9787563553075',
						pageIndex: 1,
						reverse: true,
						sort: 0
					},
					header: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
						'Accept': '*/*',
						'Host': 'www.bookschina.com',
						'Connection': 'keep-alive',
						'content-type': 'application/x-www-form-urlencoded'

					},

					success: function(res) {
						console.log(res.data.BookInfoEntityList);
					},
					fail: function(error) {
						console.log(error);
					}
				});



			}
		}
	}
</script>

<style>

</style>
