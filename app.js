//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // appSecret c33e11d027d6c82e02a174dd266fd392
        that.globalData.code = res.code
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              wx.request({
                url: that.globalData.host + 'userCon/registerUser',
                data: {
                  code: that.globalData.code,
                  headUrl: that.globalData.userInfo.avatarUrl,
                  gender: that.globalData.userInfo.gender
                },
                header: {
                  'content-type': 'application/json'
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                success: function (res) {
                  var openId = res.data.data //返回openId
                  that.globalData.openId = openId;
                  console.log('opendId', that.globalData.openId);
                },
                fail: function (res) {
                  // wx.showToast({
                  //   title: 'res.errMsg',
                  //   icon: 'none',
                  //   duration: 2000
                  // })
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    code: null,
    userInfo: null,
    openId: null,
    host: 'http://121.42.15.17:8081/',
    header: {'content-type': 'application/json'}
  }
})