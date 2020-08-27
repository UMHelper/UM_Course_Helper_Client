// pages/search/search.js
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  input: function(e){
    var key=e.detail.value.toUpperCase();
    this.setData({
      new_code:key,
    })
  },

  search:function(){
    // app.globalData.course_info={},
    app.globalData.prof_list=[],
    app.globalData.new_code="",
    app.globalData.prof_num=0,
    app.globalData.comments=[]
    app.globalData.new_code=this.data.new_code;
    wx.request({
      url: app.globalData.url+"/course_info?New_code="+this.data.new_code,
      success(res){
        app.globalData.course_info=res.data["course_info"];
        app.globalData.prof_info=res.data["prof_info"];
        console.log(app.globalData.prof_info)
        console.log(app.globalData.prof_info)
      }
      
    })
    wx.request({
      url: app.globalData.url+"/course_info?New_code="+this.data.new_code,
      success(res){
        app.globalData.course_info=res.data["course_info"];
        app.globalData.prof_info=res.data["prof_info"];
        console.log(app.globalData.prof_info)
        wx.navigateTo({
          url: '../../pages/course/course',
        })
        console.log(app.globalData.prof_info)
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
    course_info={};
      prof_list=[];
      new_code="";

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