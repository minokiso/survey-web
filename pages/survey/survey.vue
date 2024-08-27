<template>
	<view class="container">
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-title type="h1" title="中医体质问卷表（中医学会标准）" align=center></uni-title>
		<p>欢迎广大朋友参加本次答题，谢谢您在百忙之中完成这份问卷。</p>
		<p>本问卷收集您的健康信息是医生为您分析评估体质和健康状况的重要参考依据，请您务必逐项认真填写，否则会直接影响您的体质评估结果和调养指导方案。 </p>
		<p>我们会珍视您的个人资料并妥善保管，请您放心！</p>
		<uni-title type="h1" title="开始答题，辛苦您了" align=center></uni-title>
		<template v-for="(questions, tizhi, index) in surveyForm">
			<uni-forms :modelValue="questions" label-position='top' ref="surveyForm" :name="tizhi">
				<uni-title type="h2" :title="index+1+'、'+tizhi"></uni-title>
				<uni-forms-item v-for="(questionValue, question) in questions" :name="question" :label="question"
					label-width="100" :rules="requireRule">
					<uni-data-checkbox mode="button" v-model="questions[question]"
						:localdata="question.slice(-1) !== '*' ? options : reversedOptions"
						selectedColor="#a65037"></uni-data-checkbox>
				</uni-forms-item>
			</uni-forms>
		</template>
		<button @click="submitForm" style="background-color: #ad8f5b;">提交</button>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				surveyForm: {
					"气虚质": {
						"（1）您面色偏黄或㿠白吗？": "",
						"（2）您目光少神吗？": "",
						"（3）您气短懒言吗？": "",
						"（4）您容易眩晕吗？": "",
						"（5）您经常自汗出吗？": "",
						"（6）您的肢体容易疲乏吗？": "",
						"（7）您有内脏下垂的情况吗？": "",
						"（8）您的寒热耐受力差，尤不耐寒吗？": "",
						"（9）您经常心悸或有失眠的情况吗？": ""
					},
					"气郁质": {
						"（1）您有走窜疼痛的情况吗？": "",
						"（2）您经常呃逆吗？": ""
					},
					"痰湿质": {
						"（1）您的体型偏向肥胖吗？": "",
						"（2）您的肢体感觉不爽快吗？": "",
						"（3）您感觉身体沉重吗？": "",
						"（4）您感觉脘腹胀满吗？": "",
						"（5）您感觉胸闷或胸脘痞闷吗？": "",
						"（6）您痰多吗？": "",
						"（7）您有带多，带下淋沥而难愈的情况吗？": "",
						"（8）您口感黏腻或甜吗？": "",
						"（9）您经常口干但不渴求饮水吗？": "",
						"（10）您喜欢食用肥甘厚味的食物吗？": "",
						"（11）您的食欲不振或食量减少吗？": "",
						"（12）您的大便正常或偏软吗？": "",
						"（13）您的小便微浑吗？": ""
					}
				},
				options: [{
						text: "没有（1分）",
						value: 1
					},
					{
						text: "很少（2分）",
						value: 2
					},
					{
						text: "有时（3分）",
						value: 3
					},
					{
						text: "经常（4分）",
						value: 4
					},
					{
						text: "总是（5分）",
						value: 5
					},
				],
				reversedOptions: [{
						text: "没有（5分）",
						value: 5
					},
					{
						text: "很少（4分）",
						value: 4
					},
					{
						text: "有时（3分）",
						value: 3
					},
					{
						text: "经常（2分）",
						value: 2
					},
					{
						text: "总是（1分）",
						value: 1
					},
				],
				requireRule: [{
					required: true,
					errorMessage: '请填写',
				}]
			}
		},
		methods: {
			submitForm() {
				Promise.all(this.$refs.surveyForm.map(form => form.validate())).then(res => {
					const result = this.analyze(res)
					uni.navigateTo({
						url: `/pages/survey-result/survey-result2?result=${JSON.stringify(result)}`,
					})
				})
				.catch(error => {
					console.log("error", error);
					this.messageToggle("error", "请完整填写问卷")
				})
			},
			analyze(surveyResult) {
				console.log("res", surveyResult);
				let result = {}
				Object.keys(this.surveyForm).forEach((tizhi, index) => {
					let tizhiResult = surveyResult[index]
					let questions = Object.keys(tizhiResult)
					let origin = questions.reduce((prev, question) => prev + tizhiResult[question], 0)
					let conversion = this.convert(origin, questions.length)
					result[tizhi] = {
						origin,
						conversion
					}
				})
				console.log(result);
				return result
			},
			convert(origin, questionCount) {
				return (origin - questionCount) / (questionCount * 4) * 100
			},
			messageToggle(type, msg) {
				this.msgType = type
				this.messageText = msg
				this.$refs.message.open()
			},
		}
	}
</script>

<style>
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
</style>