var tabBar = require('../../templates/tabBar-template/tabBar.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ufinfo:true,
    operationItem:[
      {
        icon:'/images/icon/posted.png',
        text:'我的发布'
      },
      {
        icon: '/images/icon/logout.png',
        text: '退出登录'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.userInfo)
    if(app.globalData.userInfo){
      this.setData({ ufinfo: false})
    }
    tabBar.tabbar("tabBar", 2, this);


  },

  onGotUserInfo:function(e){
    this.setData({ ufinfo: false })
    app.globalData.userInfo = e.detail.userInfo
  },

  onTabbarTap: function (e) {
    var tid = e.currentTarget.dataset.tid;
    var key = 2;
    app.onTabbarTap(tid,key);
  },

  // getUserInfo:function(e){
    
  //   app.globalData.userInfo = e.detail.userInfo;
  // },

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