// pages/friends/friends.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    friendsList: '',
    toOpenId: ''
  },
  // 跳转到 添加关注
  goTOAddFriend: function() {
    wx.navigateTo({
      url: '../addFriend/addFriend',
    })
  },
  // 点击查看被关注人的记录
  lookRecords: function() {

  },
  check: function(e) {
    console.log(e)
  },
  // 取消关注
  cancelFriend: function(e) {
    var that = this
    var id = e.currentTarget.id
    this.setData({
      toOpenId: that.data.friendsList[id].openId
    })
    // var open = this.data.friendsList[id]
    // console.log('!!!!!!!!!', e.currentTarget.id, open)

    wx.request({
      url: app.globalData.host + 'userCon/deleteUserFollow',
      data: {
        fromOpenId: app.globalData.openId,
        toOpenId: that.data.toOpenId
      },
      header: app.globalData.header,
      method: 'GET',
      success: function(res) {
        wx.showToast({
          title: '' + res.data.message,
          icon: 'success'
        })
        that.selectMyFollow()
      }
    })
  },
  // 展示关注列表
  selectMyFollow: function() {
    var that = this
    wx.request({
      url: app.globalData.host + 'userCon/selectMyFollow',
      data: {
        fromOpenId: app.globalData.openId
      },
      header: app.globalData.header,
      method: 'GET',
      success: function(res) {
        that.setData({
          friendsList: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('friends onLoad')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.selectMyFollow()
  }
})