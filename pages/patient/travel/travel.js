// pages/patient/travel/travel.js
Page({

  data: {
    // 删除了 icon 属性
    routes: [
      { id: 1, name: '回家', destination: { latitude: 23.099994, longitude: 113.324520, name: '幸福小区' } },
      { id: 2, name: '去菜市场', destination: { latitude: 23.10229, longitude: 113.334521, name: '阳光菜市场' } },
      { id: 3, name: '去公园', destination: { latitude: 23.09529, longitude: 113.320522, name: '滨江公园' } }
    ],
    emergencyContact: '13800138000'
  },

  onShow: function () {
    // 每次页面显示时，都去更新 tabBar 的选中状态
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0 // 0 代表第一个 tab
      })
    }
  },

  // 开始导航
  startNavigation(e) {
    const route = e.currentTarget.dataset.route;
    wx.showLoading({ title: '正在开启导航...' });
    
    // 使用微信内置的地图导航能力
    wx.openLocation({
      latitude: route.destination.latitude,
      longitude: route.destination.longitude,
      name: route.destination.name,
      success() {
        wx.hideLoading();
      },
      fail(err) {
        wx.hideLoading();
        wx.showToast({ title: '无法开启导航', icon: 'error' });
        console.error(err);
      }
    });
  },

  // 拨打紧急联系电话
  makeEmergencyCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.emergencyContact
    });
  }

  


})