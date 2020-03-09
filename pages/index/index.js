// index.js
// 引入 高德地图-微信小程序 SDK核心类
var amapFile = require('../../libs/amap-wx.js');
// 高德密钥 key 	c4449d754c67aa70188902765a6c319e
// 微信小程序密钥 AppID wxbd6d3405912a7eb8
// 河北师范大学 经纬度 lon "114.52073415344236"   lat "37.997681057600766"

// 获取应用实例
const app = getApp();
var markersData = [];

let hospitalData = require('../../utils/markersDate.js')
Page({
  data: {
    longitude: '',
    latitude: '',
    scale: 15,
    markers: [],
    // 定位当前位置控件
    controls: [{
      id: 1,
      iconPath: '../../static/image/locationNow.png',
      position: {
        top: 40,
        left: 2,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },
  // 资源初始化加载时
  onLoad: function() {
    console.log('地图定位！')
    let that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        let marker = this.createMarker(res);
        this.setData({
          centerX: res.longitude,
          centerY: res.latitude,
          markers: this.getHospitalMarkers()
        })
      }
    })
    // 使用 wx.createMapContext 获取 map 上下文 并定位到当前位置
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();
  },
  onReady: function(e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    // this.mapCtx = wx.createMapContext('myMap')
  },
  // 点击 poi 触发
  poitap: function(e) {
    console.log(e.detail.name)
    wx.navigateTo({
      url: '../clockIn/clockIn?locationName=' + e.detail.name + '&locationLon=' + e.detail.longitude + '&locationLat=' + e.detail.latitude
    })
  },
  // 点击 marker 点触发
  markertap(e) {
    console.log(e)
  },
  // control 控件点击时间
  controltap(e) {
    console.log(e.controlId)
    this.moveToLocation()
  },
  // 移动到自己的位置
  moveToLocation: function() {
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();
    // wx.navigateTo({
    //   url: '../clockIn/clockIn'
    // })
  },
  // 获取标识
  getHospitalMarkers() {
    let markers = [];
    for (let item of hospitalData) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  // 还有地图标识，可以在name上面动手
  createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "../../static/image/ding-red.png",
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: 25,
      height: 48
    };
    return marker;
  }
})