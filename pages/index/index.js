// index.js
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

// Page({
//   data: {
//     motto: 'Hello World',
//     result:'',
//     lon:'',  //经度
//     lat:''   //纬度
//   },
//   onLoad: function () {
//     console.log('onLoad');
//     this.getLocation();
//   },
//   getLocation: function () {
//     var _this = this;
//     myAmapFun.getRegeo({
//       success: function (data) {
//         console.log('getLocation success');
//         _this.setData({
//           result: data[0].name + ' ' + data[0].desc
//         });
//       },
//       fail: function (info) {
//         console.log("getLocation fail");
//         wx.showModal({ title: info.errMsg });
//         _this.setData({
//           result: '获取位置失败！'
//         });
//       }
//     });
//   },
//   mapclick: function () {
//     var that = this;
//     console.log("地图点击");
//     wx.chooseLocation({
//       success: function (res) {
//         console.log("地图点击事件：" + JSON.stringify(res));
//         var user_longitude = res.longitude;
//         var user_lagitude = res.latitude;
//         var user_address = res.address;
//         var nowAddress = {};
//         nowAddress["name"] = res.name;
//         nowAddress["desc"] = res.address;
//         that.setData({
//           // lagitude: user_lagitude,
//           // longitude: user_longitude,
//           // addressName: user_address,
//           // textData: nowAddress,
//         });
//         //移动marker
//         that.mapCtx.moveToLocation();
//       },
//       fail: function (res) {
//         console.log("点击地图fail:" + JSON.stringify(res));
//       },
//       complete: function (res) {        // complete
//         console.log("点击地图complete:" + JSON.stringify(res));
//       }
//     })
//   },
//   chaKan: function (e) {
//     wx.openLocation({
//       latitude: 38.03529832892786,
//       longitude: 114.52189207077026,
//     })
//   },
//   huoQu: function (e) {
//     var that = this;
//     wx.request({
//       url: 'https://apis.map.qq.com',
//       success:function(res){
//         console.log(res)
//       }
//     })
//     //1、获取当前位置坐标
//     // wx.getLocation({
//     //   type: 'wgs84',
//     //   success: function (res) {
//     //     //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
//     //     // console.log(qqmapsdk.reverseGeocoder)
//     //     qqmapsdk.reverseGeocoder({
//     //       location: {
//     //         latitude: res.latitude,
//     //         longitude: res.longitude,
//     //       },
//     //       success: function (res) {
//     //         console.log('1111')
//     //         var address = addressRes.result.formatted_addresses.recommend;
//     //         console.log(address);
//     //         that.setData({
//     //           // console.log(address)
//     //         })
//     //       }
//     //     })
//     //   }
//     // })
//     // 动态获取手机定位
//     // var that = this;
//     // wx.getLocation(
//     //   {
//     //     success:function(res){
//     //       wx.openLocation({
//     //         latitude: res.latitude,
//     //         longitude: res.longitude,
//     //       })
//     //       that.setData({
//     //         hasLocation:true,
//     //         lon:res.longitude,
//     //         lat:res.latitude
//     //       })
//     //     }
//     //   }
//     // )
    
//   },
//   xuanZe: function (e) {
//     let that=this;
//     wx.chooseLocation({
//       success: function (res) {
//         console.log(res);
//         that.setData({
//           roomname:res.name
//         })
//         console.log(that.data.roomname);
//       }
//     })
//   }
// })
