var renting_data = require('../../data/app_data.js');
var tabBar = require('../../templates/tabBar-template/tabBar.js');
var util = require('../../data/copyright-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      "/images/swipers/swiper.png",
      "/images/swipers/swiper2.png",
      "/images/swipers/swiper3.png"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var time = util.formatTime(new Date());
    //console.log(renting_data.rentingData);
    this.setData({
      rentData:renting_data.rentingData,
      time:time
    })

    tabBar.tabbar("tabBar", 0, this);
  },

  onTabbarTap: function (e) {
    var tid = e.currentTarget.dataset.tid;
    //console.log(tid);
    switch (tid) {
      case 0:
        wx.redirectTo({
          url: '../index/index',
        });
        break;
      case 1:
        wx.redirectTo({
          url: '../post/post',
        });
        break;
      case 2:
        wx.redirectTo({
          url: '../me/me',
        });
        break;
    }
  },

  onRentingDetail: function (e) {
    var rid = e.currentTarget.dataset.rid;

    wx.navigateTo({
      url: '../renting-detail/renting-detail?id=' + rid
    })
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