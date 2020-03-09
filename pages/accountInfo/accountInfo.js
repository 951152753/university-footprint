// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    sexArray: ['请选择', '男', '女'],
    gradeArray: ['请选择','大一', '大二', '大三', '大四'],
    sex: 0,
    grade: 0,
    date: '', //生日 birthday
    university: '',
    phoneNum: '',
    email: ''
  },
  // 昵称
  bindNameChange: function (e) {
    console.log('nickName改变，携带值为', e.detail.value)
    this.setData({
      nickName: e.detail.value
    })
  },
  // 生日，日历
  bindDateChange: function (e) {
    console.log('birthday改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 学校
  bindUniversityChange: function (e) {
    console.log('university改变，携带值为', e.detail.value)
    this.setData({
      university: e.detail.value
    })
  },
  // 年级
  bindGradeChange: function (e) {
    console.log('grade改变，携带值为', e.detail.value)
    this.setData({
      grade: e.detail.value
    })
  },
  // 手机号
  bindPhoneNumChange: function (e) {
    console.log('phoneNum改变，携带值为', e.detail.value)
    this.setData({
      phoneNum: e.detail.value
    })
  },
  // 邮箱
  bindEmailChange: function (e) {
    console.log('email改变，携带值为', e.detail.value)
    this.setData({
      email: e.detail.value
    })
  },
  saveBtn: function (e) {
    wx.request({
      url: app.globalData.host + 'userCon/updateUser',
      data:{
        nikeName: this.data.nickName,
        openId: app.globalData.openId,
        grade: this.data.grade,
        birthday: this.data.date,
        university: this.data.university,
        phoneNumber: this.data.phoneNum,
        email: this.data.email
      },
      header: app.globalData.header,
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   * 一个页面只会调用一次。
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: app.globalData.host + 'userCon/getUserByOpenId',
      data: {
        openId: app.globalData.openId
      },
      header: app.globalData.header,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        console.log('res', res)
        that.setData({
          nickName: res.data.nikeName,
          sex: res.data.sex,
          grade: res.data.grade,
          date: res.data.birthday,
          university: res.data.university,
          phoneNum: res.data.phoneNumber,
          email: res.data.email
        })
      }
    })
    wx.showToast({
      title: '此昵称作为其他人查看您发表内容的昵称，请及时修改!',
      icon: 'none',
      duration: 5000
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})