var tabBar = require('../../templates/tabBar-template/tabBar.js');
var renting_data = require('../../data/renting-data.js');
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
    ],
    autoplay:true,
    interval:5000,
    duration:1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    this.setData({
      renting_data:renting_data.rentingData,
      time:time
    });
    tabBar.tabbar("tabBar",0,this);

  },

  onRentingDetail:function(e){
    var rid = e.currentTarget.dataset.rid;
    
    wx.navigateTo({
      url: '../renting-detail/renting-detail?id=' + rid
    })
  },

  onPhoneCall:function(e){
    var telephone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber:telephone
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