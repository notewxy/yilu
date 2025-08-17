// pages/guardian/map/map.js
// pages/guardian/map/map.js
Page({

  data: {
    // 地图中心点的经纬度，可以默认为一个城市中心
    centerLongitude: 116.39742,
    centerLatitude: 39.90934,
    scale: 12, // 地图缩放级别
    markers: [], // 地图标记点数组
    // ---- 模拟的后端数据 ----
    // 实际开发中，这个数组应该通过API从后端获取
    patientRealtimeData: [
      { id: 1, name: '爸爸', avatar: '/images/avatar1.png', longitude: 116.40342, latitude: 39.92934 },
      { id: 2, name: '妈妈', avatar: '/images/avatar2.png', longitude: 116.38742, latitude: 39.90934 },
      { id: 3, name: '爷爷', avatar: '/images/avatar3.png', longitude: 116.41342, latitude: 39.90334 },
    ],
    // 定时器ID，方便在页面销毁时清除
    timer: null
  },

  onReady() {
    // 获取 map 上下文，用于后续操作地图
    this.mapCtx = wx.createMapContext('patientMap');
  },

  onShow() {
    // 每次页面显示时，都去更新 tabBar 的选中状态
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 // 0 代表第一个 tab
      })
    }
    // 页面显示时，开始获取数据并设置定时刷新
    this.updateMarkers();
    // 设置一个定时器，每10秒刷新一次患者位置
    const interval = 10000; // 10秒
    const timer = setInterval(() => {
      console.log('正在刷新患者位置...');
      this.updateMarkers();
    }, interval);
    this.setData({ timer });
  },

  onHide() {
    // 页面隐藏时，清除定时器，节省资源
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.setData({ timer: null });
      console.log('已停止实时定位刷新。');
    }
  },

  // 核心函数：更新地图上的标记点
  updateMarkers() {
    // 在这里模拟从后端获取最新数据
    const patientData = this.data.patientRealtimeData; 

    const newMarkers = patientData.map(patient => {
      return {
        id: patient.id,
        longitude: patient.longitude,
        latitude: patient.latitude,
        width: 40,
        height: 40,
        iconPath: '/images/location-pin.png', // 准备一个通用的定位图标
        // ---- 自定义气泡 (Custom Callout) ----
        // 这是实现“头像+姓名”标记的关键
        customCallout: {
          display: 'ALWAYS', // 总是显示
          anchorY: -5, // Y轴偏移，让气泡在图标上方
          // ---- 气泡的样式，使用 WXML 字符串 ----
          content: `
            <view class="callout-container">
              <image class="avatar" src="${patient.avatar}"></image>
              <text class="name">${patient.name}</text>
            </view>
          `
        }
      };
    });

    this.setData({
      markers: newMarkers
    }, () => {
      // 数据更新后，调用 includePoints 让地图自动缩放到能显示所有标记的视野
      this.includeAllMarkers();
    });
  },

  // 让地图视野包含所有标记点
  includeAllMarkers() {
    if (this.data.markers.length === 0) return;
    
    const points = this.data.markers.map(marker => {
      return {
        longitude: marker.longitude,
        latitude: marker.latitude
      };
    });
    
    this.mapCtx.includePoints({
      points: points,
      padding: [80, 80, 80, 80] // 给视野边缘留出一些内边距
    });
  }
})