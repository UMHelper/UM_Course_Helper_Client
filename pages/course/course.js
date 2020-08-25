// pages/course/course.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  comments:function(e){
      var num=e.currentTarget.dataset['index'];
      app.globalData.prof_num=num;
      wx.navigateTo({
        url: '../../pages/comment/comment?num='+JSON.stringify(that.data.queryList[index]),
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.setData({
        course_info:app.globalData.course_info,
        prof_info:app.globalData.prof_info,
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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