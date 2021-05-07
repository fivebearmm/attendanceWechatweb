// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {} // 用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 读取用户的基本信息
     let userInfo = wx.getStorageSync('userInfo');
     if(userInfo){ // 用户登录
       // 更新userInfo的状态
       this.setData({
         userInfo: JSON.parse(userInfo)
       })
      }
  },

  // 跳转至登录login页面的回调
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/index'
    })
  },

 // 跳转至考勤实时状态页面
   toRecord(){
     wx.reLaunch({
      url: '/pages/record/index?type=1'
    })
  },
   // 跳转至考勤实时状态页面
   toRecordMonth(){
    wx.reLaunch({
     url: '/pages/record/index?type=2'
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