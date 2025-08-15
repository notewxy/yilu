// pages/guardian/dashboard/dashboard.js
// pages/guardian/dashboard/dashboard.js
Page({
  data: {
    // 患者列表
    patients: [
      { id: 1, name: '爸爸', avatar: '/images/avatar1.png' },
      { id: 2, name: '妈妈', avatar: '/images/avatar2.png' },
      { id: 3, name: '爷爷', avatar: '/images/avatar3.png' },
      { id: 4, name: '外婆', avatar: '/images/avatar4.png' },
      { id: 5, name: '患者', avatar: '/images/avatar5.png' },
      { id: 6, name: '患者', avatar: '/images/avatar6.png' },
      { id: 7, name: '患者', avatar: '/images/avatar7.png' },
    ],
    selectedPatientId: 1, // 默认选中第一个患者
    selectedPatientName: '爸爸',
    // 所有患者的安全数据
    safetyData: {
      // key 是患者ID
      1: [
        { type: 'zone', name: '幸福小区', description: '主要活动范围，覆盖小区花园和南门' },
        { type: 'route', name: '去菜市场的路', description: '从家到小区东门外的阳光菜市场' }
      ],
      2: [
        { type: 'zone', name: '滨江公园', description: '每天下午散步的地方' }
      ],
      3: [], // 爷爷的数据是空的
      4: [
        { type: 'zone', name: '老年活动中心', description: '每周二、周五上午去的地方' }
      ]
    }
  },

  onLoad(options) {
    // 页面加载时，可以在这里从后端API获取真实数据
    // wx.request({ ... })
  },

  // 切换选中的患者
  selectPatient(e) {
    const selectedId = e.currentTarget.dataset.id;
    const selectedName = this.data.patients.find(p => p.id === selectedId).name;
    this.setData({
      selectedPatientId: selectedId,
      selectedPatientName: selectedName
    });
  },

  // 点击添加按钮
  addSetting() {
    wx.showToast({
      title: `为 ${this.data.selectedPatientName} 添加新设置`,
      icon: 'none'
    })
    // 在这里可以跳转到新的页面，用于添加区域或路线
    // wx.navigateTo({ url: '/pages/guardian/add-setting/add-setting?patientId=' + this.data.selectedPatientId })
  }
})