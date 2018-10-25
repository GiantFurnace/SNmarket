var tabBar = require('../../templates/tabBar-template/tabBar.js');
var app = getApp();
var util = require('../../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTips:false,
    operationItem:[
      {
        icon:'/images/icon/posted.png',
        text:'我的发布',
        id:0
      },
      {
        icon: '/images/icon/feedback.png',
        text: '意见反馈',
        id:1
      }
    ],
    userInfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tabBar.tabbar("tabBar", 2, this);

    wx.getSetting({
      success:(res) => {
        if(!res.authSetting['scope.userInfo']){
          this.setData({ showTips: true });
          return;
        }
      }
    });

    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        var temp = {
          nickName:res.data.nickName,
          gender:res.data.gender,
          avatarUrl:res.data.avatarUrl
        }
        this.setData({ userInfo:temp });
      }
    })
  },

  onGotUserInfo:function(e){
    
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
      success:(res) => {
        console.log('写入缓存成功');
      }
    })

    this.setData({ showTips: false,userInfo:e.detail.userInfo });
  },

  onTabbarTap: function (e) {
    var tid = e.currentTarget.dataset.tid;
    var key = 2;
    app.onTabbarTap(tid,key);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.userInfo != '') {
      wx.stopPullDownRefresh();
    }
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