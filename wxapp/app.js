App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  onChangeTap:function(id){
    switch (id) {
      case '0':
        wx.redirectTo({
          url: '../post/post',
        })
        break;
      case '1':
        wx.redirectTo({
          url: '../sale-post/sale-post',
        })
        break;
      case '2':
        wx.redirectTo({
          url: '../shop-post/shop-post',
        })
        break;
      case '3':
        wx.redirectTo({
          url: '../running-post/running-post',
        })
        break;
      case '4':
        wx.redirectTo({
          url: '../wanted-post/wanted-post',
        })
        break;
      case '5':
        wx.redirectTo({
          url: '../used-post/used-post',
        })
        break;
    }
  },

  onTabbarTap:function(tid,key){
    switch (tid) {
      case 0:
        if(key == 0){
          return;
        }else{
          wx.redirectTo({
            url: '../index/index',
          });
        }
        break;
      case 1:
        if(key == 1){
          return;
        }else{
          wx.redirectTo({
            url: '../post/post',
          });
        }
        break;
      case 2:
        if(key == 2){
          return;
        }else{
          wx.redirectTo({
            url: '../me/me',
          });
        }
        break;
    }
  },

  onFunctionTap:function(fid){
    switch (fid) {
      case '0':
        wx.redirectTo({
          url: '../zufang/zufang?id=1',
        });
        break;
      case '1':
        wx.redirectTo({
          url: '../maifang/maifang'
        });
        break;
      case '2':
        wx.redirectTo({
          url: '../dianpu/dianpu',
        });
      case '3':
        wx.redirectTo({
          url: '../zhaogong/zhaogong',
        });
        break;
      case '4':
        wx.redirectTo({
          url: '../paotui/paotui',
        });
        break;
      case '5':
        wx.redirectTo({
          url: '../ershou/ershou',
        });
        break;
    }
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
