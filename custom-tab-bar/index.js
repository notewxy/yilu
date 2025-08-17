// custom-tab-bar/index.js
// custom-tab-bar/index.js
const app = getApp();

Component({
  data: {
    selected: 0,
    color: "#8a8a8a",
    selectedColor: "#07c160",
    // 监护人的 tabBar
    guardianList: [
      {
        "pagePath": "/pages/guardian/dashboard/dashboard",
        "text": "安全区域",
        "iconPath": "images/tabbar/guardian_dashboard.png",
        "selectedIconPath": "images/tabbar/guardian_dashboard.png"
      },
      {
        "pagePath": "pages/guardian/map/map",
        "text": "实时地图",
        "iconPath": "images/tabbar/map.png",
        "selectedIconPath": "images/tabbar/map.png"
      },
      {
        "pagePath": "pages/guardian/profile/profile",
        "text": "我的",
        "iconPath": "images/tabbar/my.png",
        "selectedIconPath": "images/tabbar/my.png"
      }
      // ... 其他监护人 tab
    ],
    // 患者的 tabBar
    patientList: [
      {
        "pagePath": "/pages/patient/travel/travel",
        "text": "出行",
        "iconPath": "/images/tabbar/travel_inactive.png",
        "selectedIconPath": "/images/tabbar/travel_active.png"
      },
      {
        "pagePath": "pages/patient/profile/profile",
        "text": "我的",
        "iconPath": "images/tabbar/my.png",
        "selectedIconPath": "images/tabbar/my.png"
      }
      // ... 其他患者 tab
    ],
    // 当前应该显示的 tabBar 列表
    list: [] 
  },
  attached() {
    // 组件加载时，根据全局角色信息决定显示哪个列表
    this.updateTabBar();
  },
  methods: {
    updateTabBar() {
      // 从全局数据中获取用户角色
      const role = app.globalData.userRole || 'guardian'; // 默认为监护人

      if (role === 'patient') {
        this.setData({
          list: this.data.patientList
        })
      } else {
        this.setData({
          list: this.data.guardianList
        })
      }
    },
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
    }
  }
})