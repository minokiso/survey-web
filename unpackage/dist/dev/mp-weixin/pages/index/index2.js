"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      surveyForm: {
        "气虚质": {
          "（1）您面色偏黄或㿠白吗？": "",
          "（2）您目光少神吗？": ""
          // "（3）您气短懒言吗？": "",
          // "（4）您容易眩晕吗？": "",
          // "（5）您经常自汗出吗？": "",
          // "（6）您的肢体容易疲乏吗？": "",
          // "（7）您有内脏下垂的情况吗？": "",
          // "（8）您的寒热耐受力差，尤不耐寒吗？": "",
          // "（9）您经常心悸或有失眠的情况吗？": ""
        },
        "气郁质": {
          "（1）您有走窜疼痛的情况吗？": "",
          "（2）您经常呃逆吗？": ""
        },
        "痰湿质": {
          "（1）您的体型偏向肥胖吗？": "",
          "（2）您的肢体感觉不爽快吗？": ""
          // "（3）您感觉身体沉重吗？": "",
          // "（4）您感觉脘腹胀满吗？": "",
          // "（5）您感觉胸闷或胸脘痞闷吗？": "",
          // "（6）您痰多吗？": "",
          // "（7）您有带多，带下淋沥而难愈的情况吗？": "",
          // "（8）您口感黏腻或甜吗？": "",
          // "（9）您经常口干但不渴求饮水吗？": "",
          // "（10）您喜欢食用肥甘厚味的食物吗？": "",
          // "（11）您的食欲不振或食量减少吗？": "",
          // "（12）您的大便正常或偏软吗？": "",
          // "（13）您的小便微浑吗？": ""
        }
      },
      options: [
        {
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
        }
      ],
      reversedOptions: [
        {
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
        }
      ],
      requireRule: [{
        required: true,
        errorMessage: "请填写"
      }]
    };
  },
  methods: {
    submitForm() {
      Promise.all(this.$refs.surveyForm.map((form) => form.validate())).then((res) => {
        const result = this.analyze(res);
        common_vendor.index.navigateTo({
          url: `/pages/survey-result/survey-result2?result=${JSON.stringify(result)}`
        });
      });
    },
    analyze(surveyResult) {
      console.log("res", surveyResult);
      let result = {};
      Object.keys(this.surveyForm).forEach((tizhi, index) => {
        let tizhiResult = surveyResult[index];
        let questions = Object.keys(tizhiResult);
        let origin = questions.reduce((prev, question) => prev + tizhiResult[question], 0);
        let conversion = this.convert(origin, questions.length);
        result[tizhi] = {
          origin,
          conversion
        };
      });
      console.log(result);
      return result;
    },
    convert(origin, questionCount) {
      return (origin - questionCount) / (questionCount * 4) * 100;
    },
    messageToggle(type, msg) {
      this.msgType = type;
      this.messageText = msg;
      this.$refs.message.open();
    }
  }
};
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_title2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_title = () => "../../uni_modules/uni-title/components/uni-title/uni-title.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_title + _easycom_uni_data_checkbox + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: _ctx.msgType,
      message: _ctx.messageText,
      duration: 2e3
    }),
    b: common_vendor.sr("message", "d1068046-0"),
    c: common_vendor.p({
      type: "message"
    }),
    d: common_vendor.p({
      type: "h1",
      title: "中医体质问卷表（中医学会标准）",
      align: "center"
    }),
    e: common_vendor.p({
      type: "h1",
      title: "开始答题，辛苦您了",
      align: "center"
    }),
    f: common_vendor.f($data.surveyForm, (questions, tizhi, index) => {
      return {
        a: "d1068046-5-" + index + "," + ("d1068046-4-" + index),
        b: common_vendor.p({
          type: "h2",
          title: index + 1 + "、" + tizhi
        }),
        c: common_vendor.f(questions, (questionValue, question, i1) => {
          return {
            a: "d1068046-7-" + index + "-" + i1 + "," + ("d1068046-6-" + index + "-" + i1),
            b: common_vendor.o(($event) => questions[question] = $event),
            c: common_vendor.p({
              mode: "button",
              localdata: question.slice(-1) !== "*" ? $data.options : $data.reversedOptions,
              selectedColor: "#a65037",
              modelValue: questions[question]
            }),
            d: "d1068046-6-" + index + "-" + i1 + "," + ("d1068046-4-" + index),
            e: common_vendor.p({
              name: question,
              label: question,
              ["label-width"]: "100",
              rules: $data.requireRule
            })
          };
        }),
        d: common_vendor.sr("surveyForm", "d1068046-4-" + index, {
          "f": 1
        }),
        e: "d1068046-4-" + index,
        f: common_vendor.p({
          modelValue: questions,
          ["label-position"]: "top",
          name: tizhi
        })
      };
    }),
    g: common_vendor.o((...args) => $options.submitForm && $options.submitForm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/self/survey-web/pages/index/index2.vue"]]);
wx.createPage(MiniProgramPage);
