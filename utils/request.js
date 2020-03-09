/**
 * description: 封装request
 * author: 杨可心
 * date: 2020-03-02
 * 暂未使用
 */

// 获取应用实例
var app = getApp();
//项目URL相同部分，减轻代码量，同时方便项目迁移
var host = 'http://322a5178.ngrok.io/';

// GET类型的网络请求
function getRequest(url, data) {
  return requestAll(url, data, 'GET')
}
// POST类型的网络请求
function postRequest(url, data) {
  return requestAll(url, data, 'POST')
}
// PUT类型的网络请求
function putRequest(url, data) {
  return requestAll(url, data, 'PUT')
}
// DELETE类型的网络请求
function deleteRequest(url, data) {
  return requestAll(url, data, 'DELETE')
}
// 网络请求本体
function requestAll(url, data, method) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      data: data,
      header: {
        'content-type': 'application/json'
      },
      method: method,
      success: (res => {
        if (res.statusCode === 200) {
          //200: 服务端业务处理正常结束
          resolve(res)
        } else {
          console.error(res)
          reject(res)
        }
      }),
      fail: (res => {
        console.error(res)
        reject(res)
      })
    })
  })
}

/**
 * module.exports 用来导出代码
 * js文件中通过 var call = require("../util/request.js") 加载
 * 注意引入文件的路径
 */
module.exports.getRequest = getRequest
module.exports.postRequest = postRequest
module.exports.putRequest = putRequest
module.exports.deleteRequest = deleteRequest
module.exports.requestAll = requestAll