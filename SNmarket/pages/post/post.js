var tabBar = require('../../templates/tabBar-template/tabBar.js');
var util = require('../../data/copyright-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    objArray:[
      {
        index: 0,
        option: ['长铺', '武阳', '海口'],
      },
      {
        index:0,
        option: ['全新', '九成新', '八成新', '七成新', '六成新', '五程序'],
      },
      {
        index:0,
        option: ['汽车', '电子产品']
      }
    ],
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    this.setData({
      time:time
    })
    tabBar.tabbar("tabBar", 1, this);
  },

  bindPickerChange:function(e){
    const curindex = e.currentTarget.dataset.current;
    this.data.objArray[curindex].index = e.detail.value;
    this.setData({
      objArray:this.data.objArray
    })
  },

  onChangeTap:function(e){
    this.setData({
      current:e.currentTarget.dataset.current
    })
  },

  onTabbarTap: function (e) {
    var tid = e.currentTarget.dataset.tid;
    //console.log(tid);
    if (tid == 0) {
      wx.redirectTo({
        url: '../index/index',
      })
    } else if (tid == 1) {
      return;
    }
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