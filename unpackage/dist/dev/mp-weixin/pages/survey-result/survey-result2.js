"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tizhis: [],
      productUrl: "/static/product.jpg",
      tizhi: null
    };
  },
  methods: {
    messageToggle(type, msg) {
      this.msgType = type;
      this.messageText = msg;
      this.$refs.message.open();
    },
    getTopTizhi(result) {
      const max = Math.max(...Object.values(result).map((r) => r.conversion));
      for (let tizhi of Object.keys(result)) {
        if (result[tizhi].conversion === max) {
          this.tizhis.push(tizhi);
        }
      }
    },
    selectTizhi(e) {
      let {
        index
      } = e.detail;
      this.tizhi = this.tizhis[index];
      console.log(this.tizhi);
      this.$refs.alertDialog.close();
    }
  },
  onLoad: function(option) {
    this.result = JSON.parse(option.result);
  },
  onReady: function() {
    this.getTopTizhi(this.result);
    console.log(this.tizhis);
    if (this.tizhis.length === 1) {
      this.tizhi = this.tizhis[0];
    } else {
      this.$refs.alertDialog.open();
    }
  }
};
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_title2 + _easycom_uni_card2 + _easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_title = () => "../../uni_modules/uni-title/components/uni-title/uni-title.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_title + _easycom_uni_card + _easycom_uni_grid_item + _easycom_uni_grid)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: _ctx.msgType,
      message: _ctx.messageText,
      duration: 2e3
    }),
    b: common_vendor.sr("message", "e8291abe-0"),
    c: common_vendor.p({
      type: "message"
    }),
    d: common_vendor.p({
      type: "h1",
      title: "中医体质问卷表（中医学会标准）",
      align: "center"
    }),
    e: common_vendor.p({
      type: "h2",
      title: "谢谢您在百忙之中完成这份问卷！",
      align: "center"
    }),
    f: common_vendor.p({
      type: "h2",
      title: "您的体质分析如下:",
      align: "center"
    }),
    g: common_vendor.t($data.tizhi),
    h: common_vendor.p({
      type: "h2",
      title: "为您推荐如下产品：",
      align: "center"
    }),
    i: common_vendor.p({
      cover: $data.productUrl
    }),
    j: common_vendor.f($data.tizhis, (tizhi, index, i0) => {
      return {
        a: common_vendor.t(tizhi),
        b: index,
        c: "e8291abe-9-" + i0 + ",e8291abe-8",
        d: common_vendor.p({
          index
        })
      };
    }),
    k: common_vendor.o($options.selectTizhi),
    l: common_vendor.p({
      column: 4,
      highlight: true
    }),
    m: common_vendor.sr("alertDialog", "e8291abe-7"),
    n: common_vendor.p({
      type: "dialog",
      ["mask-click"]: false,
      ["mask-background-color"]: "#a65037"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/self/survey-web/pages/survey-result/survey-result2.vue"]]);
wx.createPage(MiniProgramPage);
