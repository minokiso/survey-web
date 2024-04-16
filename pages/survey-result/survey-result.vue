<template>
	<view class="container">
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-title type="h1" title="中医体质问卷表（中医学会标准）" align=center></uni-title>
		<uni-title type="h2" title="谢谢您在百忙之中完成这份问卷！" align=center></uni-title>
		<uni-title type="h2" title="您的体质分析如下:" align=center></uni-title>
		<p class="result">
			您的体质为：
			<span class="tizhi">{{pinghezhi}}</span>
		</p>
		<p class="result">
			偏颇体质为：
			<span class="tizhi">{{pianpotizhi}}</span>
		</p>
		<uni-title type="h2" title="为您推荐如下产品：" align=center></uni-title>
		
		<div style="display: flex; flex-direction: column; align-items: center;">
			<uni-card :cover="productUrl" @click="onClick" style="width: fit-content; background-color: #cc6e3f;">
				<text style="color: white;">“茗九源”纳米穴位敷贴（平和质）</text>
			</uni-card>
		</div>

	</view>
</template>


<script>
	export default {
		data() {
			return {
				pinghezhi: null,
				pianpotizhi: null,
				productUrl: "/static/product.jpg"
			}
		},
		methods: {
			messageToggle(type, msg) {
				this.msgType = type
				this.messageText = msg
				this.$refs.message.open()
			},
		},
		onLoad: function(option) {
			console.log(option);
			this.pinghezhi = option.pinghezhi
			this.pianpotizhi = option.pianpotizhi
		},
	}
</script>

<style>
	.container {
		padding: 15px;
		background-color: #efe2cf;
		font-family: STKaiti;
		color: #a65037;
		height: 92vh;
		/* 		display: flex;
		align-items: center;
		flex-direction: column; */
	}

	p {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.result {
		text-align: center;
		font-size: x-large;
	}

	.tizhi {
		color: #a60000;
		text-decoration: underline
	}

	.card-actions {
		display: flex;
		justify-content: space-between;
	}
</style>