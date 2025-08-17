// pages/patient/profile/profile.js
Page({

  onShow: function () {
    // 每次页面显示时，都去更新 tabBar 的选中状态
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0 // 0 代表第一个 tab
      })
    }
  },

  
})