<template>
	<view class="container">
		<div style="display: flex; flex-direction: column; align-items: center; max-width: 500px; margin: auto;">
			<div v-for="product in products"
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				products: [{
						name: "纳米中药穴位敷贴（日常贴）",
						abbr: "日常性纳米敷贴（气虚质）",
						image: "/static/product2.png",
						tizhi: "气虚质",
						efficacy: "日常抗疲劳，提高记忆思考能力",
						env: "日常保健"
					},
					{
						name: "纳米中药穴位敷贴（日常贴）",
						abbr: "日常性纳米敷贴（气郁质）",
						image: "/static/product2.png",
						tizhi: "气郁质",
						efficacy: "日常抗疲劳，提高记忆思考能力",
						env: "日常保健"
					},
					{
						name: "纳米中药穴位敷贴（日常贴）",
						abbr: "日常性纳米敷贴（痰湿质）",
						image: "/static/product2.png",
						tizhi: "痰湿质",
						efficacy: "日常抗疲劳，提高记忆思考能力",
						env: "日常保健"
					},
					{
						name: "纳米中药穴位敷贴（运动贴）",
						abbr: "运动性纳米敷贴（气郁质）",
						image: "/static/product2.png",
						tizhi: "气郁质",
						efficacy: "运动性疲劳，减少运动损伤",
						env: "运动前后保健"
					},
					{
						name: "纳米中药穴位敷贴（运动贴）",
						abbr: "运动性纳米敷贴（气虚质）",
						image: "/static/product2.png",
						tizhi: "气虚质",
						efficacy: "运动性疲劳，减少运动损伤",
						env: "运动前后保健"
					},
					{
						name: "纳米中药穴位敷贴（运动贴）",
						abbr: "运动性纳米敷贴（痰湿质）",
						image: "/static/product2.png",
						tizhi: "痰湿质",
						efficacy: "运动性疲劳，减少运动损伤",
						env: "运动前后保健"
					},
					{
						name: "纳米多功能智能药枕",
						abbr: "纳米多功能智能药枕",
						image: "/static/product3.png",
						tizhi: "均可",
						efficacy: "益智安神，改善睡眠",
						env: "夜间睡眠"
					},
				]
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 15px;
		background-color: #efe2cf;
		font-family: STKaiti;
		color: #a65037;
	}
</style>