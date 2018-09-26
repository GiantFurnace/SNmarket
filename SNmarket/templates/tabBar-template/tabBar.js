function tabbarinit(){
  return[
    {
      "tid":0,
      "current":0,
      "pagePath":"/pages/index/index",
      "iconPath":"/images/icon/home.png",
      "selectedIconPath":"/images/icon/home-active.png",
      "text":"首页"
    },
    {
      "tid":1,
      "current": 0,
      "pagePath": "/pages/post/post",
      "iconPath": "/images/icon/send.png",
      "selectedIconPath": "/images/icon/send-active.png",
      "text": "发布"
    },
    {
      "tid":2,
      "current": "0",
      "pagePath": "/pages/index/index",
      "iconPath": "/images/icon/me.png",
      "selectedIconPath": "/images/icon/me.png",
      "text": "我的"
    }
  ]
}

function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar;
  that.setData({ bindData });
}

module.exports = {
  tabbar:tabbarmain
}