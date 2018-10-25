var tabBar = require('../../templates/tabBar-template/tabBar.js');
var util = require('../../data/copyright-data.js');
var utils = require('../../utils/utils.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    selectData:['长铺','武阳','海口'],
    index:0,
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
    current:0,
    isChoose:false,
    showTips:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取版权时间和当前时间
    var time = util.formatTime(new Date());

    //数据绑定到页面
    this.setData({
      time:time,
    })

    //tabbar切换功能
    tabBar.tabbar("tabBar", 1, this);


  },

  selectTap(){
    this.setData({
      show:!this.data.show
    })
  },

  onGotUserInfo:function(e){
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    })
    this.setData({ showTips:false });
  },

  optionTap(e){
    let idx = e.currentTarget.dataset.index;
    this.setData({
      index:idx,
      show:!this.data.show
    })
  },

  onChangeTap:function(e){
    let id = e.currentTarget.dataset.current;
    let key = 0;
    app.onChangeTap(id,key);
  },

  onTabbarTap: function (e) {
    var tid = e.currentTarget.dataset.tid;
    var key = 1;
    app.onTabbarTap(tid,key);
  },

  onUploadTap:function(e){
    utils.chooseImg(this);
  },

  formSubmit:function(e){
    var val = e.detail.value;
    app.onSubmitTap(val,this);
  },

  getCurrentTime:function(time){
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let currentTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second; 

    this.setData({currentTime:time});
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