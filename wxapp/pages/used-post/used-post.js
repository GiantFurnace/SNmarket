var tabBar = require('../../templates/tabBar-template/tabBar.js');
var util = require('../../data/copyright-data.js');
var utils = require('../../utils/utils.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:5,
    objArray: [
      {
        index: 0,
        option: ['长铺', '武阳', '海口'],
      },
      {
        index: 0,
        option: ['全新', '九成新', '八成新', '七成新', '六成新', '五成新'],
      },
      {
        index: 0,
        option: ['汽车', '电子产品']
      }
    ],
    isChoose:false
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

    var def = this.data.objArray[0].option[0];
    var def2 = this.data.objArray[1].option[0];
    var def3 = this.data.objArray[2].option[0];
    var arr = [def,def2,def3];
    var newArr = arr.join();
    this.setData({selections:newArr});
  },

  onUploadTap: function (e) {
    utils.chooseImg(this);
  },

  onChangeTap: function (e) {
    let id = e.currentTarget.dataset.current;
    let key = 5;
    app.onChangeTap(id,key);

  },

  onTabbarTap: function (e) {
    var tid = e.currentTarget.dataset.tid;
    var key = 1;
    app.onTabbarTap(tid, key);
  },

  formSubmit: function (e) {
    var val = e.detail.value;
    app.onSubmitTap(val);
  },
  
  bindPickerChange: function (e) {
    const curindex = e.currentTarget.dataset.current;
    this.data.objArray[curindex].index = e.detail.value;
    this.setData({
      objArray: this.data.objArray
    });

    var area = this.data.objArray[0].option[this.data.objArray[0].index];
    var degree = this.data.objArray[1].option[this.data.objArray[1].index];
    var product = this.data.objArray[2].option[this.data.objArray[2].index];
    var arr = [area,degree,product];
    var newArr = arr.join();
    this.setData({selections:newArr});
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