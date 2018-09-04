function tabbarinit(){
  return[
    {
      "current":0,
      "pagePath":"/pages/index/index",
      "iconPath":"/images/icon/home.png",
      "selectedIconPath":"/images/icon/home-active.png",
      "text":"首页"
    },
    {
      "current": 0,
      "pagePath": "/pages/post/post",
      "iconPath": "/images/icon/send.png",
      "selectedIconPath": "/images/icon/send-active.png",
      "text": "发布"
    },
    {
      "current": "0",
      "pagePath": "/pages/latest/latest",
      "iconPath": "/images/icon/latest.png",
      "selectedIconPath": "/images/icon/latest-active.png",
      "text": "最新"
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