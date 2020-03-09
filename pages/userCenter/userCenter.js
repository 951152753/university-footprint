// 获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 点击头像 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../friends/friends'
    })
  },
  // 展进入 周边兴趣点
  showPOI: function () {
    wx.navigateTo({
      url: '../showPOI/showPOI'
    })
  },
  // 进入 我的记录
  showRecord: function (){
    wx.navigateTo({
      url: '../record/record'
    })
  },
  // 进入 编辑资料
  editAccountInfo: function () {
    wx.navigateTo({
      url: '../accountInfo/accountInfo'
    })
  },
  // 进入 权限设置
  changeSetting: function () {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  // 进入 使用帮助
  getHelp: function () {
    wx.navigateTo({
      url: '../help/help'
    })
  },
  // 进入 给个鼓励
  giveEncouragement: function () {
    wx.navigateTo({
      url: '../encourage/encourage'
    })
  },
  // 进入 意见反馈
  giveFeedback: function () {
    wx.navigateTo({
      url: '../feedback/feedback'
    })
  }
})
