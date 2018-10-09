var tabBar = require('../../templates/tabBar-template/tabBar.js');
var util = require('../../data/copyright-data.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:4,
    show: false,
    index: 0,
    selectData: ['长铺', '武阳', '海口']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    })
    tabBar.tabbar("tabBar", 1, this);
  },

  selectTap() {
    this.setData({
      show: !this.data.show
    })
  },

  optionTap(e) {
    let idx = e.currentTarget.dataset.index;
    this.setData({
      index: idx,
      show: !this.data.show
    })
  },

  onChangeTap: function (e) {
    let id = e.currentTarget.dataset.current;
    let key = 4;
    app.onChangeTap(id,key);

  },

  formSubmit: function (e) {
    var val = e.detail.value;
    app.onSubmitTap(val);
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