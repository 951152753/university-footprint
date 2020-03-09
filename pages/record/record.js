const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: ''
    // list: [
    //   {
    //     listName: '图书馆',
    //     item: [{
    //       itemName: '第一条，哪家口碑数据库是你付款蓝方块对方是在快乐才拿到不符合IE案件法律看上的那次发了吗法拉盛看你的出口阀IE合法',
    //       content: '1-1中的内容',
    //       time: '2015-05-06'
    //     }, {
    //       itemName: '第二条',
    //       content: '1-2中的内容',
    //       time: '2015-04-13'
    //     }, {
    //       itemName: '第三条',
    //       content: '1-3中的内容',
    //       time: '2015-12-06'
    //     }]
    //   },
    //   {
    //     listName: '公教楼A',
    //     item: [{
    //       itemName: '第一条',
    //       content: '2-1中的内容',
    //       time: '2017-05-06'
    //     }, {
    //       itemName: '第二条',
    //       content: '2-2中的内容',
    //       time: '2015-08-06'
    //     }, {
    //       itemName: '第三条',
    //       content: '2-3中的内容',
    //       time: '2015-11-06'
    //     }]
    //   }, 
    //   {
    //     listName: '风雨操场',
    //     item: [{
    //       itemName: '第一条',
    //       content: '3-1中的内容',
    //       time: '2015-05-15'
    //     }, {
    //       itemName: '第二条',
    //       content: '3-2中的内容',
    //       time: '2015-05-24'
    //     }, {
    //       itemName: '第三条',
    //       content: '3-3中的内容',
    //       time: '2015-05-30'
    //     }]
    //   }
    // ]
  },
  onLoad: function(options) {
    var that = this
    wx.request({
      url: app.globalData.host + 'moodCon/selectAllRecordByOpenId',
      data: {
        openId: app.globalData.openId
      },
      header: app.globalData.header,
      method: 'GET',
      success: function(res) {
        that.setData({
          list: res.data.data.list
        })
        console.log('record', res.data.data)
      }
    })
  },
  //点击最外层列表展开收起
  listTap(e) {
    console.log('触发了最外层');
    let Index = e.currentTarget.dataset.parentindex, //获取点击的下标值
      list = this.data.list;
    list[Index].show = !list[Index].show || false; //变换其打开、关闭的状态
    if (list[Index].show) { //如果点击后是展开状态，则让其他已经展开的列表变为收起状态
      this.packUp(list, Index);
    }
    this.setData({
      list
    });
  },
  //点击里面的子列表展开收起
  listItemTap(e) {
    let parentindex = e.currentTarget.dataset.parentindex, //点击的内层所在的最外层列表下标
      Index = e.currentTarget.dataset.index, //点击的内层下标
      list = this.data.list;
    console.log(list[parentindex].item, Index);
    list[parentindex].item[Index].show = !list[parentindex].item[Index].show || false; //变换其打开、关闭的状态
    if (list[parentindex].item[Index].show) { //如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开
      for (let i = 0, len = list[parentindex].item.length; i < len; i++) {
        if (i != Index) {
          list[parentindex].item[i].show = false;
        }

      }
    }
    this.setData({
      list
    });
  },
  //让所有的展开项，都变为收起
  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) { //其他最外层列表变为关闭状态
      if (index != i) {
        data[i].show = false;
        for (let j = 0; j < data[i].item.length; j++) { //其他所有内层也为关闭状态
          data[i].item[j].show = false;
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})