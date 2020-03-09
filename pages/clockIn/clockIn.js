// pages/feedback/feedback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: null,
    locationName: '', // 打卡地
    locationLon: '', // 打卡地经度
    locationLat: '', // 打卡地纬度
    recordContent: '', // 文字记录
    imgId: '' // 图片上传后，服务端返回的ID
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('options', options)
    this.setData({
      locationName: options.locationName,
      locationLon: options.locationLon,
      locationLat: options.locationLat
    })
    wx.showToast({
      title: '' + this.data.locationName,
      icon: 'none',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  // 获取文本框输入的内容
  recordInput: function(e) {
    this.setData({
      recordContent: e.detail.value
    })
  },
  // 打卡：点击我来过后，生成一条记录并返回到地图页面
  backToHome: function() {
    // 生成记录

    // 返回
    wx.navigateBack({
      success: function() {
        // beforePage.onLoad(); // 执行前一个页面的onLoad方法
      }
    });
  },
  // 上传图片
  uploadImg: function() {
    var that = this
    // 从本地相册选择图片
    wx.chooseImage({
      count: 1, // 只能选择一张图片
      sizeType: ['original', 'compressed'], // 原图或压缩图
      sourceType: ['album', 'camera'], // 来源是相册还是相机
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log('imgSrc', res, tempFilePaths[0])
        that.setData({
          imageSrc: tempFilePaths[0]
        })
        wx.uploadFile({
          url: app.globalData.host + 'moodCon/uploadFile',
          filePath: tempFilePaths[0],
          name: 'fileName',
          header: app.globalData.header,
          success: function(res) {
            var imgData = JSON.parse(res.data)
            that.setData({
              imgId: imgData.data
            })
            console.log('图片上传', imgData)
          },
          fail: function(res) {
            console.log('图片上传失败', res.data)
          }
        });
      }
    })
  },
  // 提交
  saveMessage: function() {
    wx.request({
      url: app.globalData.host + 'moodCon/updateRecord',
      data: {
        openId: app.globalData.openId,
        locationName: this.data.locationName,
        locationLongitude: this.data.locationLon,
        locationLatitude: this.data.locationLat,
        recordContent: this.data.recordContent,
        id: this.data.imgId
      },
      header: app.globalData.header,
      method: 'POST',
      success: function(res) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        // 返回
        wx.navigateBack({
          success: function () {
            // beforePage.onLoad(); // 执行前一个页面的onLoad方法
          }
        })
      }
    })
  },
  // 删除图片功能
  deleteImg: function(e) {
    var source = this.data.source;
    var index = e.currentTarget.dataset.index;
    source.splice(index, 1);
    var imgurllist = this.data.imgurllist;
    imgurllist.splice(index, 1);
    this.setData({
      source: source,
      imgurllist: imgurllist
    });
  },
  // 获取图片索引
  previewImg: function(e) {
    // 获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    // 所有图片
    var source = this.data.source;
    wx.previewImage({
      // 当前显示图片
      current: source[index],
      // 所有图片
      urls: source
    })
  }
})