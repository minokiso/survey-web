<template>
	<view class="container">
		<image src="../../static/logo.png" mode="aspectFit" style="width: 20%; max-width: 160px; ">
		</image>
		<h1>更好地对标您的健康</h1>
		<h4>基于靶向化药食保健的益智安神创新含片</h4>
		<navigator class="menu" url="/pages/survey/survey"><button
				style="background-color: transparent; color: #a65037; border-radius: 0px; border: #a65037 2px solid">体质测试</button>
		</navigator>
		<navigator class="menu" url="/pages/product-list/product-list"><button
				style="background-color: transparent; color: #a65037; border-radius: 0px; border: #a65037 2px solid">产品展示</button>
		</navigator>
		<navigator class="menu" url="/pages/about/about"><button
				style="background-color: transparent; color: #a65037; border-radius: 0px; border: #a65037 2px solid">联系我们</button>
		</navigator>
	</view>
</template>


<script>
	export default {
		data() {
			return {

			}
		},
		methods: {}
	}
</script>

<style scoped>
	.container {
		font-family: STKaiti;
		background-color: #efe2cf;
		color: #a65037;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 1rem;
		height: 100vh;
	}

	.menu {
		width: 50%;
		max-width: 200px;
	}
</style>