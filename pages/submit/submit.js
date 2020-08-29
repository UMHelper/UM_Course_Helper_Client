// pages/submit/submit.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      grade:1.0,
      assignment:1.0,
      attendance:1.0,
      pre:1.0,
      hard:1.0,
      reward:1.0,
      recommend:1.0,
      content:""
  },

  gradeChange:function(e) {
    this.setData({
      grade: e.detail.value
    })
  },
  assignmentChange:function(e) {
    this.setData({
      assignment: e.detail.value
    })
  },
  attendanceChange:function(e) {
    this.setData({
      attendance: e.detail.value
    })
  },
  preChange:function(e) {
    this.setData({
      pre: e.detail.value
    })
  },
  hardChange:function(e) {
    this.setData({
      hard: e.detail.value
    })
  },
  rewardChange:function(e) {
    this.setData({
      reward: e.detail.value
    })
  },
  recommendChange:function(e) {
    this.setData({
      recommend: e.detail.value
    })
  },

  comment_input:function(e){
    this.setData({
      content: e.detail.value
    })
  },

  submit_comment:function(){
    wx.request({
      url: app.globalData.url+"/submit_comment/",
      data:{
        "New_code":app.globalData.new_code,
        "prof_name":app.globalData.prof_info[app.globalData.prof_num]["name"],
        "content":this.data.content,
        "grade":this.data.grade,
        "attendance":this.data.attendance,
        "hard":this.data.hard,
        "reward":this.data.reward,
        "pre":this.data.pre,
        "recommend":this.data.recommend,
        "assignment":this.data.assignment
      },
      method:"POST",
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(res) {
        wx.navigateTo({
          url: '../../pages/search/search',
        })
      }
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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      New_code:app.globalData.new_code,
      prof_name:app.globalData.prof_info[app.globalData.prof_num]["name"]
    }
    ),

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