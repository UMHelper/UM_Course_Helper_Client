// pages/course/course.js
let interstitialAd = null
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  comments:function (e) {
    let prof_num = e.currentTarget.dataset['index'];
    app.globalData.prof_num=prof_num;

    wx.request({
      url: app.globalData.url+"/comment_info/?New_code="+app.globalData.course_info["New_code"]+"&prof_name="+app.globalData.prof_info[app.globalData.prof_num]["name"],
      success:function(res) {
          var comment=res.data['comments'];
          app.globalData.comments=comment;
          wx.navigateTo({
            url: '../../pages/comment/comment',
          })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-65602409d1a615ab'
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.setData({
        course_info:app.globalData.course_info,
        prof_info:app.globalData.prof_info,
      })
      wx.setNavigationBarTitle({
        title: "課程詳情 | "+ this.data.course_info["New_code"]
      });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})