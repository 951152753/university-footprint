// pages/friends/friends.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendsList: [
      { "code": "1", "avatar": "../../static/image/me1.jpeg", "nikeName": "小美女1号" },
      { "code": "2", "avatar": "../../static/image/me2.jpeg", "nikeName": "小美女2号" },
      { "code": "3", "avatar": "../../static/image/me3.jpeg", "nikeName": "小美女3号" },
      { "code": "4", "avatar": "../../static/image/me4.jpeg", "nikeName": "小美女4号" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('friends onLoad')
  },
  addFriend: function () {
    wx.navigateTo({
      url: '../addFriend/addFriend',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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