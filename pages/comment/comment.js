// pages/comment/comment.js
var ga = require('../../utils/ga.js');
var HitBuilders = ga.HitBuilders;
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  prof:function(){
    app.globalData.course_info={},
    app.globalData.prof_list=[],
    app.globalData.new_code="",
    app.globalData.prof_num=0,
    app.globalData.comments=[],
    app.globalData.prof_info={},
    app.globalData. course_list=[],
    wx.request({
      url: app.globalData.url+"/prof_info?name="+this.data.prof["name"],
      success(res){
        app.globalData.prof_info=res.data["prof_info"];
        app.globalData.course_list=res.data["course"];
        wx.navigateTo({
          url: '../../pages/prof_info/prof_info',
        })
      },
      fail (res){
        wx.request({
          url: app.globalData.url+"/prof_info?name="+this.data.prof["name"],
          success(res){
            app.globalData.prof_info=res.data["prof_info"];
            app.globalData.course_list=res.data["course"];
            wx.navigateTo({
              url: '../../pages/prof_info/prof_info',
            })
          },
          fail (res){
            this.setData({
              st:"發生錯誤",
            })
          }
        })
        
      },
      })
  },

  submit_comment:function() {
    wx.navigateTo({
      url: '../../pages/submit/submit',
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
      prof:app.globalData.prof_info,
      // num:app.globalData.prof_num,
      prof:app.globalData.prof_info[app.globalData.prof_num],
      comments:app.globalData.comments,
    })  
    if (this.data.comments.length==0){
      this.setData({
        no_comment:true
      })
    }
    wx.setNavigationBarTitle({
      title: this.data.course_info["New_code"]+" | "+this.data.prof["name"]
    });
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var t = getApp().getTracker();
    t.setScreenName('comment - '+app.globalData.course_info["New_code"]);
    t.send(new HitBuilders.ScreenViewBuilder().build());
    this.setData({
      course_info:app.globalData.course_info,
      prof:app.globalData.prof_info,
      // num:app.globalData.prof_num,
      prof:app.globalData.prof_info[app.globalData.prof_num],
      comments:app.globalData.comments,
    })  
    console.log("hello")
    wx.setNavigationBarTitle({
      title: this.data.course_info["New_code"]+" | "+this.data.prof["name"]
    });
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