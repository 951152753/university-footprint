// pages/addFriend/addFriend.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputPhoneNumber: '',
    nickName: '',
    avatar: '',
    toOpenId: ''
  },
  inputPhoneNum: function(e) {
    this.setData({
      inputPhoneNumber: e.detail.value
    })
  },
  // 搜索
  searchFriend: function() {
    var that = this
    // 向接口传参，并刷新 ”关注“ 数据
    wx.request({
      url: app.globalData.host + 'userCon/getUserByPhone',
      data: {
        phoneNum: this.data.inputPhoneNumber
      },
      header: app.globalData.header,
      method: 'GET',
      success: function(res) {
        console.log(res)
        that.setData({
          avatar: res.data.headUrl,
          nickName: res.data.nikeName,
          toOpenId: res.data.openId
        })
      }
    })
  },
  // 添加关注
  addFriend: function() {
    var that = this
    wx.request({
      url: app.globalData.host + 'userCon/insertUserFollow',
      data: {
        fromOpenId: app.globalData.openId,
        toOpenId: that.data.toOpenId
      },
      header: app.globalData.header,
      method: 'GET',
      success: function(res) {
        // code == '-1' 表示已经关注过了
        if (res.data.code == '-1') {
          wx.showToast({
            title: ''+res.data.message,
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: ''+res.data.message,
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  }
})