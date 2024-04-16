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
					"阳虚质": {
						"（1）您手脚发凉吗？": "",
						"（2）您胃脘部、背部或者腰膝部怕冷吗？": "",
						"（3）您感到怕冷、衣服比别人穿得多吗？": "",
						"（4）您比别人耐受不了寒冷（冬天的寒冷、夏天的空调、电扇等）吗？": "",
						"（5）您比别人容易感冒吗？": "",
						"（6）您吃（喝）凉的东西会感到不舒服或者怕吃（喝）凉东西吗？": "",
						"（7）您受凉或吃（喝）凉的东西后，容易腹泻（拉肚子）吗？": "",
					},
					"阴虚质": {
						"（1） 您感到手脚心发热吗？": "",
						"（2） 您感觉身体、 脸上发热吗？": "",
						"（3） 您皮肤或者口唇干吗？": "",
						"（4） 您口唇的颜色比一般人红吗？": "",
						"（5） 您容易便秘或大便干燥吗？": "",
						"（6） 您面颧两潮红或偏红吗？": "",
						"（7） 您感到眼睛干涩吗？": "",
						"（8） 您感到口干咽燥、 总想喝水吗？": "",
					},
					"气虚质": {
						"（1）您容易疲乏吗？": "",
						"（2）您容易气短（呼吸短促、接不上气）吗？": "",
						"（3）您容易心慌吗？": "",
						"（4）您容易头晕或站起来时晕眩吗？": "",
						"（5）您比别人容易感冒吗？": "",
						"（6）您喜欢安静、懒得说话吗？": "",
						"（7）您说话的声音低弱无力吗？": "",
						"（8）您活动量稍在太容易出虚汗吗？": "",
					},
					"痰湿质": {
						"（1）您感到胸闷或腹部胀满吗？": "",
						"（2）您感到身体沉重不轻松或不爽快吗？": "",
						"（3）您腹部肥满松软吗？": "",
						"（4）您有额部油脂分泌多的现象吗？": "",
						"（5）您上眼睑比别人肿（上眼睑有轻微隆起的现象）吗？": "",
						"（6）您嘴里有黏黏的感觉吗？": "",
						"（7）您平时痰多，特别咽喉部总感到有痰堵着吗？": "",
						"（8）您活动量稍在太容易出虚汗吗？": "",
					},
					"湿热质": {
						"（1）您面部或鼻部有油腻感或者油量发光吗？": "",
						"（2）您容易生痤疮或疮疖吗？": "",
						"（3）您感到口苦或嘴里有异味吗？": "",
						"（4）您大便黏滞不爽、有解不尽的感觉吗？": "",
						"（5）您小便明尿道有发热感、尿色浓（深）吗？": "",
						"（6）您带下色黄（白带颜色发黄）（女性回答）或阴囊部位潮湿吗（男生回答）？": "",
					},
					"血瘀质": {
						"（1）您的皮肤在不知不觉中出现青紫瘀斑（皮下出血）吗？": "",
						"（2）您两颧部有细微红丝吗？": "",
						"（3）您身体上哪里疼痛吗？": "",
						"（4）您面色晦暗或容易出现褐斑吗？": "",
						"（5）您容易有黑眼圈吗？": "",
						"（6）您容易忘事（健忘）吗？": "",
						"（7）您口唇颜色偏暗吗？": "",
					},
					"特禀质": {
						"（1）您没有感冒时也会打喷嚏吗？": "",
						"（2）您没有感冒时也会鼻塞、流鼻涕吗？": "",
						"（3）您有因季节变化、温度变化或异味等原因而咳喘的现象吗？": "",
						"（4）您容易过敏（对药物、食物、气味、花粉或在季节交替、气候变化时）吗？": "",
						"（5）您的皮肤容易起荨麻疹（风团、风疹块、风疙瘩）吗？": "",
						"（6）您的皮肤因过敏出现过紫癜（紫红色瘀点、瘀斑）吗？": "",
						"（7）您的皮肤一抓就红，并出现抓痕吗？": "",
					},
					"气郁质": {
						"（1）您感到闷闷不乐、情结低沉吗？": "",
						"（2）您容易精神紧张、焦虑不安吗？": "",
						"（3）您多愁善感、感情脆弱吗？": "",
						"（4）您容易感到害怕或受到惊吓吗？": "",
						"（5）您胁肋部或乳房胀痛吗？": "",
						"（6）您无缘无故叹气吗？": "",
						"（7）您咽喉部有异物感，且吐之不出、咽之不下吗？": "",
					},
					"平和质": {
						"（1）您精力充沛吗？": "",
						"（2）您容易疲乏吗？*": "",
						"（3）您说话声音低弱无力吗？*": "",
						"（4）您感到闷闷不乐、情绪低沉吗？*": "",
						"（5）您比一般人耐不了寒冷（冬天的寒冷、夏天的冷空调、电扇等）吗？*": "",
						"（6）您能适应外界自然和社会环境的变化吗？": "",
						"（7）您容易失眠吗？": "",
						"（8）您容易忘事（健忘）吗？": "",
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
					const tizhi = this.analyze(res)
					uni.navigateTo({
						url: `/pages/survey-result/survey-result?pinghezhi=${tizhi.pinghezhi}&pianpotizhi=${tizhi.pianpotizhi.join('，')}`,
					})
				}).catch(error => {
					console.log("error", error);
					this.messageToggle("error", "请完整填写问卷")
				})
			},
			analyze(surveyResult) {
				// console.log("res", surveyResult);
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
				// console.log(result);
				let tizhi = this.decideTizhi(result)
				return tizhi
			},
			convert(origin, questionCount) {
				return (origin - questionCount) / (questionCount * 4) * 100
			},
			decideTizhi(result) {
				const phz = result["平和质"].conversion
				const tizhis = Object.keys(result)
				let pinghezhi = '非平和质'
				if (phz >= 60 && tizhis.every(tizhi => tizhi === '平和质' ? true : result[tizhi].conversion < 30)) {
					pinghezhi = '平和质'
				} else if (phz >= 60 && tizhis.every(tizhi => tizhi === '平和质' ? true : result[tizhi].conversion < 40)) {
					pinghezhi = '基本是平和质'
				}
				let pianpotizhi = []
				tizhis.forEach(tizhi => {
					if (tizhi !== "平和质" && result[tizhi].conversion >= 40) {
						pianpotizhi.push(tizhi)
					}
					if (tizhi !== "平和质" && result[tizhi].conversion >= 30 && result[tizhi].conversion < 40) {
						pianpotizhi.push(`倾向于${tizhi}`)
					}
				})
				if (pianpotizhi.length === 0) {
					pianpotizhi = ['无偏颇体质']
				}
				// console.log(pinghezhi, pianpotizhi)
				return {pinghezhi, pianpotizhi}
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