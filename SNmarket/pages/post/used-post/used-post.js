// pages/post/used-post/used-post.js
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

  },

  onUploadTap: function (e) {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        const img = res.tempFilePaths;
        that.setData({
          isChoose: true,
          imgUrl: img
        })
      }
    })
  },

  onChangeTap: function (e) {
    let id = e.currentTarget.dataset.current;
    //console.log(id);
    switch (id) {
      case '0':
        return;
        break;
      case '1':
        wx.redirectTo({
          url: '/pages/post/sale-post/sale-post',
        })
        break;
      case '2':
        wx.redirectTo({
          url: '/pages/post/shop-post/shop-post',
        })
        break;
      case '3':
        wx.redirectTo({
          url: '/pages/post/running-post/running-post',
        })
        break;
      case '4':
        wx.redirectTo({
          url: '/pages/post/wanted-post/wanted-post',
        })
        break;
      case '5':
        return;
        break;
    }

  },

  formSubmit: function (e) {
    wx.showModal({
      title: '发布',
      content: '确认发布吗？',
      success: res => {
        if (res.confirm) {
          wx.showToast({
            title: '发布成功:)',
            success: res => {
              console.log(e.detail.value);
            }
          })
        }
      }
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

  bindPickerChange: function (e) {
    const curindex = e.currentTarget.dataset.current;
    this.data.objArray[curindex].index = e.detail.value;
    this.setData({
      objArray: this.data.objArray
    })
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