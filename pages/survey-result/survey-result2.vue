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
			<span class="tizhi">{{tizhi}}</span>
		</p>
		<uni-title type="h2" title="为您推荐如下产品：" align=center></uni-title>

		<div style="display: flex; flex-direction: column; align-items: center;">
			<uni-card :cover="productUrl" style="width: fit-content; background-color: #cc6e3f;">
				<text style="color: white;">“茗九源”纳米穴位敷贴（平和质）</text>
			</uni-card>
		</div>
		<uni-popup ref="alertDialog" type="dialog" :mask-click="false" mask-background-color="#a65037">
			<div
				style="width: 400px; background-color: #a65037; display: flex; flex-direction: column; justify-content: center;">
				<div style="color: white; margin-bottom: 20px;">以下是您的潜在体质，请您进行选择：</div>
				<uni-grid :column="4" :highlight="true" @change="selectTizhi">
					<uni-grid-item v-for="(tizhi, index) in tizhis" :index="index" :key="index">
						<view class="grid-item-box" style="background-color: #a6745c;">
							<text class="text" style="color: white;">{{tizhi}}</text>
						</view>
					</uni-grid-item>
				</uni-grid>
			</div>
		</uni-popup>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				tizhis: [],
				productUrl: "/static/product.jpg",
				tizhi: null
			}
		},
		methods: {
			messageToggle(type, msg) {
				this.msgType = type
				this.messageText = msg
				this.$refs.message.open()
			},
			getTopTizhi(result) {
				const max = Math.max(...Object.values(result).map(r => r.conversion))
				for (let tizhi of Object.keys(result)) {
					if (result[tizhi].conversion === max) {
						this.tizhis.push(tizhi)
					}
				}
			},
			selectTizhi(e) {
				let {
					index
				} = e.detail
				this.tizhi = this.tizhis[index]
				console.log(this.tizhi);
				this.$refs.alertDialog.close()
			}
		},
		onLoad: function(option) {
			this.result = JSON.parse(option.result)
		},
		onReady: function() {
			this.getTopTizhi(this.result)
			console.log(this.tizhis);
			if (this.tizhis.length === 1) {
				this.tizhi = this.tizhis[0]
			} else {
				this.$refs.alertDialog.open()
			}
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

	.grid-item-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>