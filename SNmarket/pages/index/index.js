var tabBar = require('../../templates/tabBar-template/tabBar.js');
var renting_data = require('../../data/app_data.js');
var util = require('../../data/copyright-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "/images/swipers/swiper.png",
      "/images/swipers/swiper2.png",
      "/images/swipers/swiper3.png"
    ],
    current: 0,
    index:0,
    location:['长铺','武阳','海口']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var time = util.formatTime(new Date());
    this.setData({
      renting_data: renting_data.rentingData,
      time: time
    });
    tabBar.tabbar("tabBar", 0, this);
  },

  onRentingDetail: function(e) {
    var rid = e.currentTarget.dataset.rid;

    wx.navigateTo({
      url: '../renting-detail/renting-detail?id=' + rid
    })
  },

  onPhoneCall: function(e) {
    var telephone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: telephone
    })
  },

  onChangeTap: function(e) {
    this.setData({
      current: e.currentTarget.dataset.current
    })
  },

  onFunctionTap: function(e) {
    var fid = e.currentTarget.dataset.fid;
    //console.log(fid);
    switch(fid)
    {
      case '0':
        wx.navigateTo({
          url: '../zufang/zufang?id=1',
        });
        break;
      case '1':
        wx.navigateTo({
          url: '../maifang/maifang'
        });
        break;
      case '2':
        wx.navigateTo({
          url: '../dianpu/dianpu',
        });
      case '3':
        wx.navigateTo({
          url: '../zhaogong/zhaogong',
        });
        break;
      case '4':
        wx.navigateTo({
          url: '../paotui/paotui',
        });
        break;
      case '5':
        wx.navigateTo({
          url: '../ershou/ershou',
        });
        break;
    }

  },

  onTabbarTap:function(e){
    var tid = e.currentTarget.dataset.tid;
    //console.log(tid);
    if(tid==0){
      return;
    }else if(tid==1){
      wx.redirectTo({
        url: '../post/post',
      })
    }
  },

  bindPickerChange:function(e){
    this.setData({ index:e.detail.value })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})