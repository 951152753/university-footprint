// 引入 高德地图-微信小程序 SDK核心类
var amapFile = require('../../libs/amap-wx.js');
// 高德密钥 key 	c4449d754c67aa70188902765a6c319e
// 微信小程序密钥 AppID wxbd6d3405912a7eb8
// 河北师范大学 经纬度 lon "114.52073415344236"   lat "37.997681057600766"

// 获取应用实例
const app = getApp();
var markersData = [];

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'c4449d754c67aa70188902765a6c319e' });
    myAmapFun.getPoiAround({
      iconPathSelected: '../../static/image/ding-red.png',
      iconPath: '../../static/image/ding-blue.png',
      success: function (data) {
        markersData = data.markers;
        that.setData({
          markers: markersData
        });
        that.setData({
          latitude: markersData[0].latitude   // 纬度
        });
        that.setData({
          longitude: markersData[0].longitude // 经度
        });
        that.showMarkerInfo(markersData, 0);
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../static/image/ding-red.png"; //如：..­/..­/img/marker_checked.png
      } else {
        data[j].iconPath = "../../static/image/ding-blue.png"; //如：..­/..­/img/marker.png
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }

})