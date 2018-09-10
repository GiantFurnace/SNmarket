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
    duration:1000,
    current:0,
    city:""
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

    this.loadInfo();

  },

  loadInfo:function(e){
    wx.getLocation({
      type:'wgs84',
      success:res=>{
        var longitude = res.longitude;
        var latitude = res.latitude;
        this.loadCity(longitude,latitude);
      }
    })
  },

  loadCity(longitude,latitude){
    wx.request({
      url: "https://http://api.map.baidu.com/place/v2/search?ak=sHK3TLUjRfyxE5lq2Ka9wBNHhE32V7SV",
      data:{},
      header:{
        'Content-Type':'application/json'
      },
      success:res=>{
        console.log(res);
      }
    })
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

  onChangeTap:function(e){
    this.setData({
      current:e.currentTarget.dataset.current
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