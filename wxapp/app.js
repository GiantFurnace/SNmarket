App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // wx.login({
    //   success:res=>{
    //     var code = res.code;
    //     wx.request({
    //       url: '',
    //     })
    //   }
    // })
  },

  globalData: {
    
  },

  onChangeTap:function(id,key){
    switch (id) {
      case '0':
        if(key == 0)
        return;
        else
        wx.redirectTo({
          url: '../post/post',
        })
        break;
      case '1':
        if (key == 1)
          return;
        else
        wx.redirectTo({
          url: '../sale-post/sale-post',
        })
        break;
      case '2':
        if (key == 2)
          return;
        else
        wx.redirectTo({
          url: '../shop-post/shop-post',
        })
        break;
      case '3':
        if (key == 3)
          return;
        else
        wx.redirectTo({
          url: '../running-post/running-post',
        })
        break;
      case '4':
        if (key == 4)
          return;
        else
        wx.redirectTo({
          url: '../wanted-post/wanted-post',
        })
        break;
      case '5':
        if (key == 5)
          return;
        else
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
          url: '../zufang/zufang',
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

  onSubmitTap:function(val,time){
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1 ;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let currentTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second; 

    if(val.thumb == ''){
      this.showToast('请先上传图片');
      return;
    }else if(val.title == ''){
      this.showToast('请先输入标题');
      return;
    } else if (val.detail == '') {
      this.showToast('请输入详细描述');
      return;
    } else if (val.address == '') {
      this.showToast('请输入地址信息');
      return;
    } else if (val.property == '') {
      this.showToast('请先输入产权');
      return;
    } else if (val.bedroom == '') {
      this.showToast('请先输入卧室');
      return;
    } else if (val.drawing_room == '') {
      this.showToast('请输入总厅');
      return;
    } else if (val.area == '') {
      this.showToast('请先输入平米');
      return;
    } else if (val.price == '') {
      this.showToast('输入元/月(平米)');
      return;
    } else if (val.totalprice == '') {
      this.showToast('请先输入总价');
      return;
    } else if (val.deposit == '') {
      this.showToast('请先输入押金');
      return;
    } else if (val.pay == '') {
      this.showToast('请先输入付金');
      return;
    } else if (val.position == '') {
      this.showToast('请先输入朝向');
      return;
    } else if (val.floor == '') {
      this.showToast('请先输入楼层');
      return;
    }else if (val.publisher == '') {
      this.showToast('请先输入称呼');
      return;
    } else if (val.telephone == '') {
      this.showToast('请先输入号码');
      return;
    }else{
      if(val !== ''){
        wx.showModal({
          title: '发布',
          content: '确认发布吗？',
          success:res=>{
            if(res.confirm){
              time(currentTime);
              console.log(val);
            }
          }
        })
      }
    }
  },

  showToast:function(tips){
    wx.showToast({
      title: tips,
      image:'/images/icon/tips.png'
    })
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
