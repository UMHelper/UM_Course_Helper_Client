// pages/course/course.js
// let interstitialAd = null
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  comments:function (e) {
    let course_num = e.currentTarget.dataset['index'];
    console.log(course_num)
    wx.request({
      url: app.globalData.url+"/course_info?New_code="+this.data.course_list[course_num]["course_info"]["New_code"],
      success(res){
        app.globalData.course_info=res.data["course_info"];
        app.globalData.prof_info=res.data["prof_info"];
      },
      fail (res){
        wx.request({
          url: app.globalData.url+"/course_info?New_code="+this.data.course_list[course_num]["course_info"]["New_code"],
          success(res){
            app.globalData.course_info=res.data["course_info"];
            app.globalData.prof_info=res.data["prof_info"];
          },
        })
      },
      })
    wx.request({
      url: app.globalData.url+"/comment_info/?New_code="+this.data.course_list[course_num]["course_info"]["New_code"]+"&prof_name="+this.data.prof_info["name"],
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
    // if (wx.createInterstitialAd) {
    //   interstitialAd = wx.createInterstitialAd({
    //     adUnitId: 'adunit-65602409d1a615ab'
    //   })
    //   interstitialAd.onLoad(() => {})
    //   interstitialAd.onError((err) => {})
    //   interstitialAd.onClose(() => {})
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.setData({
        prof_info:app.globalData.prof_info,
        course_list:app.globalData.course_list,
      })
      wx.setNavigationBarTitle({
        title: "教師詳情 | "+ this.data.prof_info["name"]
      });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (interstitialAd) {
    //   interstitialAd.show().catch((err) => {
    //     console.error(err)
    //   })
    // }
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