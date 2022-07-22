// pages/search/search.js
var app = getApp()
var ga = require('../../utils/ga.js');
var HitBuilders = ga.HitBuilders;
// let interstitialAd = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    st: "搜索",
    new_code: "",
    prof_name: "",
    code: false,
    type: "course",
    height: "80rpx",
    // 450rpx max
    dispaly: "none"
  },
  onShareAppMessage: function () {
    return {
      title: '澳大選咩課',
      desc: '澳大選課好幫手',
      path: '/pages/search/search',
      imageUrl: '/img/title.png'
    }
  },
  tap_course: function (e) {
    let course_num = e.currentTarget.dataset['index'];
    console.log(this.data.course_list[course_num]["New_code"])
    wx.request({
      url: app.globalData.url + "/course_info/?New_code=" + this.data.course_list[course_num]["New_code"],
      success(res) {
        app.globalData.new_code = res.data["course_info"]["New_code"];
        app.globalData.course_info = res.data["course_info"];
        app.globalData.prof_info = res.data["prof_info"];
        wx.navigateTo({
          url: '../../pages/course/course',
        })
      },
      fail(res) {
        wx.request({
          url: app.globalData.url + "/course_info/?New_code=" + this.data.course_list[course_num]["New_code"],
          success(res) {
            app.globalData.new_code = res.data["course_info"]["New_code"];
            app.globalData.course_info = res.data["course_info"];
            app.globalData.prof_info = res.data["prof_info"];
            wx.navigateTo({
              url: '../../pages/course/course',
            })
          },
          fail(res) {
            this.setData({
              st: "發生錯誤",
            })
          }

        })

      },
    })
  },
  radioChange: function (e) {
    this.setData({
      type: e.detail.value,
      height: "80rpx"
    })
  },

  input_code: function (e) {
    var that = this
    var key = e.detail.value.toUpperCase();
    var result = []
    if (this.data.type == "course") {
      wx.request({
        url: app.globalData.url + "/fuzzy_search?text=" + key + "&type=course",
        success(res) {
          result = res.data["course_info"]
          that.setData({
            course_list: res.data["course_info"]
          })
          // console.log(result.length)
          if (that.data.course_list.length <= 6) {
            console.log((that.data.course_list.length * 60 + 80).toString())
            that.setData({
              height: (that.data.course_list.length * 60 + 80).toString() + "rpx"
            })
          }
          else {
            that.setData({
              height: "500rpx"
            })
          }
        },
      })

    }
    else if (type == "prof") {
      wx.request({
        url: app.globalData.url + "/fuzzy_search?text=" + key + "&type=prof",
        success(res) {
          result = res.data["prof_info"]
          that.setData({
            prof_list: res.data["prof_info"]
          })
          // console.log(result.length)
          if (that.data.prof_list.length <= 5) {
            that.setData({
              height: (that.data.prof_list.length * 60 + 90).toString() + "rpx"
            })
          }
          else {
            that.setData({
              height: "450rpx"
            })
          }
        },
      })

    }
    else {
      that.setData({
        height: "90rpx"
      })
    }
  },

  input_name: function (e) {
    var key = e.detail.value.toUpperCase();
    this.setData({
      prof_name: key,
    })
  },

  search: function () {
    // app.globalData.course_info={},
    app.globalData.prof_list = [],
      app.globalData.new_code = "",
      app.globalData.prof_num = 0,
      app.globalData.comments = []
    app.globalData.new_code = this.data.new_code;
    console.log(this.data.new_code)
    if (this.data.new_code != "") {
      this.setData({
        st: "搜索中",
        code: true,
      })
      wx.request({
        url: app.globalData.url + "/course_info?New_code=" + this.data.new_code,
        success(res) {
          app.globalData.course_info = res.data["course_info"];
          app.globalData.prof_info = res.data["prof_info"];
        },
        fail(res) {
          wx.request({
            url: app.globalData.url + "/course_info?New_code=" + this.data.new_code,
            success(res) {
              app.globalData.course_info = res.data["course_info"];
              app.globalData.prof_info = res.data["prof_info"];
              
            },
            fail(res) {
              this.setData({
                st: "發生錯誤",
              })
            }

          })

        },
      })
      wx.request({
        url: 'https://api.data.um.edu.mo/service/academic/course_catalog/v1.0.0/all',
        data: {
          course_code: this.data.new_code
        },
        header: {
          'Accept': 'application/json',
          'Authorization': 'Bearer bfa9b6c0-3f4f-3b1f-92c4-1bdd885a1ca2',
        },
        success (res) {
          // courseDescription=res.data["_embedded"][0]["courseDescription"]
          // Intended_Learning_Outcomes =res.data["_embedded"][0]["ilo"]
          app.globalData.courseDescription=res.data["_embedded"][0]["courseDescription"],
          app.globalData.Intended_Learning_Outcomes=res.data["_embedded"][0]["ilo"]
          // wx.navigateTo({
          //   url: '../../pages/course/course',
          // })
        }
      })
    }
    else if (this.data.prof_name != "") {
      this.setData({
        st: "搜索中",
        code: true,
      })
      wx.request({
        url: app.globalData.url + "/prof_info?name=" + this.data.prof_name,
        success(res) {
          app.globalData.prof_info = res.data["prof_info"];
          app.globalData.course_list = res.data["course"];
          wx.navigateTo({
            url: '../../pages/prof_info/prof_info',
          })
        },
        fail(res) {
          wx.request({
            url: app.globalData.url + "/prof_info?name=" + this.data.prof_name,
            success(res) {
              app.globalData.prof_info = res.data["prof_info"];
              app.globalData.course_list = res.data["course"];
              wx.navigateTo({
                url: '../../pages/prof_info/prof_info',
              })
            },
            fail(res) {
              this.setData({
                st: "發生錯誤",
              })
            }
          })

        },
      })
    }
    else {
      this.setData({
        st: "請先輸入"
      })
    }


    // wx.request({
    //   url: app.globalData.url+"/course_info?New_code="+this.data.new_code,
    //   success(res){
    //     app.globalData.course_info=res.data["course_info"];
    //     app.globalData.prof_info=res.data["prof_info"];
    //     console.log(app.globalData.prof_info)
    //     wx.navigateTo({
    //       url: '../../pages/course/course',
    //     })
    //     console.log(app.globalData.prof_info)
    //   }

    // })

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

  onShow: function () {
    var t = getApp().getTracker();
    t.setScreenName('Search');
    t.send(new HitBuilders.ScreenViewBuilder().build());
    this.setData({
      st: "搜索",
      code: false,
      inputValue: "",
      new_code: "",
      prof_name: "",
      height: "80rpx",
      version: wx.getAccountInfoSync().miniProgram.version,
    })
    // wx.showModal({
    //   title:'Whole @ UM 上綫了',
    //   content:' Whole @ UM 澳大討論區已經上綫， 訪問 https://umbbs.xyz 快來與同學一起交流討論吧！！！',
    //   cancelText:'No 🙈',
    //   confirmText: 'Go! 🐵',
    //   success(res){
    //     if(res.confirm){
    //       wx.navigateTo({
    //         url: '../ad/ad',
    //       })
    //     }
    //   }
    // })

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
   
    course_info = {};
    prof_list = [];
    new_code = "";
  },

})