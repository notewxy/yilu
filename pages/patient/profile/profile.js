// pages/patient/profile/profile.js
Page({

  data: {
    // 模拟的患者个人信息 (应从后端API获取)
    userInfo: {
      name: '王大爷',
      avatar: '/images/avatar1.png',
      gender: '男',
      age: 78,
      address: '广东省广州市幸福小区1栋101',
      emergencyContact: {
        name: '张三',
        relation: '儿子',
        phone: '13800138000'
      },
      medicalCondition: '患有阿尔茨海默病，轻微高血压。'
    }
  },

  onShow: function () {
    // 每次页面显示时，都去更新 tabBar 的选中状态
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 // 0 代表第一个 tab
      })
    }
  },

  
})