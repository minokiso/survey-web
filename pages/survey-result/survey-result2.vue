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
		<div style="display: flex; flex-direction: column; align-items: center; max-width: 500px; margin: auto;">
			<div v-for="product in productMap[tizhi]"
				style="background-color: #cc6e3f; color: white; margin: 1rem; border: 2px white solid; border-radius: 1rem; width:100%">
				<div style="text-align: center; margin: 0.5rem; border-bottom: white 1px solid;">{{product.name}}</div>
				<div style="display: flex; margin: 1rem; gap: 0.5rem">
					<image :src="product.image" mode="aspectFill" style="flex: 0.3; height: auto;"></image>
					<div style="flex: 0.7; display: flex; flex-direction: column; row-gap: 0.5rem;">
						<div>{{product.abbr}}</div>
						<div style="display: flex; gap: 1rem;">
							<uni-tag :circle="true" :text="product.tizhi" type="error" :inverted="true" />
							<uni-tag :circle="true" :text="product.env" type="error" :inverted="true" />
						</div>
						<div>{{product.efficacy}}</div>
					</div>
				</div>
			</div>
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
				productMap: {
					"气虚质": [{
						name: "纳米中药穴位敷贴（日常贴）",
						abbr: "日常性纳米敷贴（气虚质）",
						image: "/static/product2.png",
						tizhi: "气虚质",
						efficacy: "日常抗疲劳，提高记忆思考能力",
						env: "日常保健"
					}, {
						name: "纳米中药穴位敷贴（运动贴）",
						abbr: "运动性纳米敷贴（气虚质）",
						image: "/static/product2.png",
						tizhi: "气虚质",
						efficacy: "运动性疲劳，减少运动损伤",
						env: "运动前后保健"
					}, {
						name: "纳米多功能智能药枕",
						abbr: "纳米多功能智能药枕",
						image: "/static/product3.png",
						tizhi: "均可",
						efficacy: "益智安神，改善睡眠",
						env: "夜间睡眠"
					}],
					"气郁质": [{
						name: "纳米中药穴位敷贴（日常贴）",
						abbr: "日常性纳米敷贴（气郁质）",
						image: "/static/product2.png",
						tizhi: "气郁质",
						efficacy: "日常抗疲劳，提高记忆思考能力",
						env: "日常保健"
					}, {
						name: "纳米中药穴位敷贴（运动贴）",
						abbr: "运动性纳米敷贴（气郁质）",
						image: "/static/product2.png",
						tizhi: "气郁质",
						efficacy: "运动性疲劳，减少运动损伤",
						env: "运动前后保健"
					}, {
						name: "纳米多功能智能药枕",
						abbr: "纳米多功能智能药枕",
						image: "/static/product3.png",
						tizhi: "均可",
						efficacy: "益智安神，改善睡眠",
						env: "夜间睡眠"
					}],
					"痰湿质": [{
						name: "纳米中药穴位敷贴（日常贴）",
						abbr: "日常性纳米敷贴（痰湿质）",
						image: "/static/product2.png",
						tizhi: "痰湿质",
						efficacy: "日常抗疲劳，提高记忆思考能力",
						env: "日常保健"
					}, {
						name: "纳米中药穴位敷贴（运动贴）",
						abbr: "运动性纳米敷贴（痰湿质）",
						image: "/static/product2.png",
						tizhi: "痰湿质",
						efficacy: "运动性疲劳，减少运动损伤",
						env: "运动前后保健"
					}, {
						name: "纳米多功能智能药枕",
						abbr: "纳米多功能智能药枕",
						image: "/static/product3.png",
						tizhi: "均可",
						efficacy: "益智安神，改善睡眠",
						env: "夜间睡眠"
					}],
				},
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

<style scoped>
	.container {
		padding: 15px;
		background-color: #efe2cf;
		font-family: STKaiti;
		color: #a65037;
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