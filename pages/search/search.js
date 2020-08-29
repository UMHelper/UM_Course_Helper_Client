// pages/search/search.js
var app=getApp()
// let interstitialAd = null
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
    // if (wx.createInterstitialAd) {
    //   interstitialAd = wx.createInterstitialAd({
    //     adUnitId: 'adunit-65602409d1a615ab'
    //   })
    //   interstitialAd.onLoad(() => {})
    //   interstitialAd.onError((err) => {})
    //   interstitialAd.onClose(() => {})
    // }
    
  },

  onShow:function(){
    // if (interstitialAd) {
    //   interstitialAd.show().catch((err) => {
    //     console.error(err)
    //   })
    // }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
    course_info={};
    prof_list=[];
    new_code="";
  },

})