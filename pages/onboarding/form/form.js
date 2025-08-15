// pages/onboarding/form.js
Page({
  data: {
    role: 'guardian', // 默认角色: 'guardian' (监护人), 'patient' (患者)
    genders: ['男', '女', '未知'],
    genderIndex: 0,
    formData: {
      // 监护人信息
      guardianName: '',
      guardianPhone: '',
      relationship: '',
      // 患者信息
      patientName: '',
      patientPhoto: '', // 存储图片临时路径
      gender: '男',
      age: '',
      emergencyContact: '',
      address: '',
      medicalCondition: ''
    }
  },

  // 切换角色
  onRoleChange(e) {
    this.setData({
      role: e.currentTarget.dataset.role
    });
  },

  // 处理所有 input 输入
  handleInputChange(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    // 使用计算属性名来动态更新 formData 中的字段
    this.setData({
      [`formData.${field}`]: value
    });
  },
  
  // 处理性别选择
  bindGenderChange(e) {
    const index = e.detail.value;
    this.setData({
        genderIndex: index,
        'formData.gender': this.data.genders[index]
    })
  },

  // 选择图片
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'formData.patientPhoto': res.tempFiles[0].tempFilePath
        })
      }
    })
  },

  // 提交表单
  handleSubmit() {
    // 1. 在这里可以做表单校验
    if (this.data.role === 'guardian') {
      if (!this.data.formData.guardianName || !this.data.formData.guardianPhone) {
        wx.showToast({ title: '请填写称呼和手机号', icon: 'none' });
        return;
      }
    } else if (this.data.role === 'patient') {
      if (!this.data.formData.patientName || !this.data.formData.patientPhoto || !this.data.formData.emergencyContact) {
        wx.showToast({ title: '请填写姓名、照片和紧急联系电话', icon: 'none' });
        return;
      }
    }

    // 2. 准备要提交给后端的数据
    const finalData = {
        role: this.data.role, // 告诉后端用户选择的角色
        ...this.data.formData // 展开所有表单数据
    };
    
    console.log('准备提交的数据:', finalData);

    // 3. 在这里调用 wx.request 将 finalData 发送给你的后端 API
    wx.showLoading({ title: '正在提交...' });

    // 模拟网络请求
    setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
            title: '注册成功',
            icon: 'success'
        });
        // 成功后可以跳转到主页
        // wx.switchTab({ url: '/pages/index/index' });
    }, 1500);

    /*
    wx.request({
      url: 'https://your-backend.com/api/register',
      method: 'POST',
      data: finalData,
      success: (res) => {
        if (res.data.code === 200) {
           wx.showToast({ title: '注册成功' });
           // ... 跳转等操作
        }
      },
      fail: (err) => {
        wx.showToast({ title: '提交失败，请重试', icon: 'error' });
      },
      complete: () => {
        wx.hideLoading();
      }
    })
    */
  }
})