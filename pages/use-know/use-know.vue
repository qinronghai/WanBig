<template>
	<div class="page">
		<h2 class="section-title">使用必知！！！</h2>

		<section class="section">
			<h3 class="subsection-title">一. 订阅消息</h3>
			<p>
				<view class="red-text">在遇到以下弹出的情况，务必全部允许，并勾选“总是保持以上选择”，然后点击允许。</view>
				<img
					src="cloud://qrh-database01-5gz9zkuedd28e7fc.7172-qrh-database01-5gz9zkuedd28e7fc-1313188449/nodeteleimg/photo_2023-11-25_04-28-04.jpg"
					alt="" />
				<view>这是确保您能够及时收到审核结果通知、买家预定您的商品的通知以及未读消息的关键步骤。拒绝订阅将导致您无法及时获取这些重要信息，可能会对您的交易和用户体验产生不良影响。</view>
			</p>
		</section>

		<section class="section">
			<h3 class="subsection-title">二. 交易规则</h3>
			<ol class="list">
				<li><strong>1. 卖方发布商品：</strong> 在平台上发布您的商品信息。</li>
				<li><strong>2. 买方预定等待确认：</strong> 买方看中您的商品并预定，等待卖方确认订单。</li>
				<li><strong>3. 卖方确认订单生成交易码：</strong> 卖方确认订单，并生成用于交易的交易码。</li>
				<li>
					<strong>4. 双方沟通交易细节：</strong><br />
					<text>- 在小程序内商品详情下点击聊天。</text><br />
					<text>- 推荐：在我的订单中进入订单详情页获取对方的联系方式进行联系。</text>
				</li>
				<li><strong>5. 线下面交：</strong> 双方在约定的地点线下完成面交，买方在我的订单中点击确认收货并输入卖方提供的交易码完成交易。</li>
			</ol>
		</section>

		<section class="section">
			<h3 class="subsection-title">三. 违规情况</h3>
			<ol class="list">
				<li><strong>1. 卖家拒绝预定：</strong> 严禁卖家无故拒绝买家已经预定的订单。</li>
				<li><strong>2. 卖家72小时内未确认订单：</strong> 卖家需在72小时内确认订单，以保障交易的及时进行。</li>
				<li><strong>3. 订单状态长时间未变更：</strong> 订单状态在交易中，但超过72小时未进入下一个状态。</li>
				<li><strong>4. 订单完成状态未确认：</strong> 订单完成状态下，卖家未确认发货，买家未确认收货。</li>
			</ol>
			<p class="paragraph red-text">以上违规情况将导致扣除信誉分10分/次。</p>
		</section>

		<section class="section">
			<h3 class="subsection-title">四. 信誉系统</h3>
			<p>
				为了保障本平台的良性发展，如您违反上述交易规则或涉及违规行为，平台将减少您的信誉分。<text class="red-text">
					当信誉分低于60时，将无法继续使用本平台。</text>我们鼓励用户共同遵守规则，以促进平等、安全和良好的交易环境。感谢您的合作。
			</p>
		</section>
	</div>
</template>

<style scoped>
	.page {
		padding: 0 30rpx 50rpx 30rpx;
	}

	strong {
		display: inline;
		font-weight: bold;
	}

	img {
		width: 100%;
		height: 600rpx;
	}

	.section-title {
		margin-top: 40rpx;
		font-size: 40rpx;


		font-weight: bold;
	}

	.red-text {
		color: red;
	}

	.subsection-title {
		margin-top: 20rpx;
		font-size: 36rpx;
		font-weight: bold;
	}

	.section,
	.list,
	.nested-list {
		margin-top: 20rpx;
	}

	.list li,
	.nested-list li {
		margin-left: 40rpx;
	}

	.paragraph {
		margin-top: 20rpx;
		line-height: 1.5;
	}
</style>