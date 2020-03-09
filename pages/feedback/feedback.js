// pages/feedback/feedback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  }, 
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
  bindFormSubmit: function (e) {
    wx.request({
      url: app.globalData.host + '',
      data: {},
      header: app.globalData.header,
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
      }
      })
    console.log(e.detail.value.textarea)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})