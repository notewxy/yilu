// pages/guardian/profile/profile.js
// pages/guardian/profile/profile.js
Page({
  data: {
    // 监护人信息 (应从全局或缓存中获取)
    guardianInfo: {
      nickname: '守护者-张三',
      avatar: '/images/avatar-guardian.png' // 监护人自己的头像
    },
    // 管理的患者列表 (应从API获取)
    managedPatients: [
      { id: 1, name: '爸爸', relation: '父子', avatar: '/images/avatar1.png' },
      { id: 2, name: '妈妈', relation: '母子', avatar: '/images/avatar2.png' }
    ]
  },

  onShow() {
    // 每次进入页面时，都应该重新获取最新的数据
    // this.getProfileData();
  },

  getProfileData() {
    // 在这里调用 wx.request 从后端获取监护人和患者列表数据
  },

  // 编辑监护人资料
  editGuardianProfile() {
    wx.showToast({ title: '跳转到编辑资料页', icon: 'none' });
  },

  // 查看患者详情
  viewPatientDetail(e) {
    const patientId = e.currentTarget.dataset.id;
    wx.showToast({ title: `查看ID为 ${patientId} 的家人详情`, icon: 'none' });
    // wx.navigateTo({ url: `/pages/guardian/patient-detail/patient-detail?id=${patientId}` });
  },
  
  // 添加新的家人
  addPatient() {
    wx.showToast({ title: '跳转到添加家人页面', icon: 'none' });
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          // 在这里执行清除本地缓存（如token）、跳转到登录页等操作
          // wx.clearStorageSync();
          // wx.reLaunch({ url: '/pages/login/login' });
        }
      }
    })
  }
})