var ga = require('./utils/ga.js');
var GoogleAnalytics = ga.GoogleAnalytics;

App({
  tracker: null,
  getTracker: function () {
    var app_info = wx.getAccountInfoSync().accountInfo;
    if (!this.tracker) {
      // 初始化GoogleAnalytics Tracker
      this.tracker = GoogleAnalytics.getInstance(this)
        .setAppName('UMEH_Wechat')
        .setAppVersion(app_info.version + app_info.envVersion)
        .newTracker('UA-176924130-1'); //用你的 Tracking ID 代替

      //使用自己的合法域名做跟踪数据转发
      this.tracker.setTrackerServer("https://ga.umeh.top");
    }
    return this.tracker;
  },
  globalData: {
    // url:"http://60.205.223.2:888",
    // url:"http://127.0.0.1:8000",
    url: "https://mpserver.umeh.top",
    course_info: {},
    prof_list: [],
    new_code: "",
    prof_num: 0,
    comments: [],
    prof_info: {},
    course_list: [],
  },
  data: {

  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
