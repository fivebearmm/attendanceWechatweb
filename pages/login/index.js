/**
  1. 收集表单项数据
  2. 前端验证
    1) 验证用户信息(账号，密码)是否合法
    2) 前端验证不通过就提示用户，不需要发请求给后端
    3) 前端验证通过了，发请求(携带账号, 密码)给服务器端
  3. 后端验证
    1) 验证用户是否存在
    2) 用户不存在直接返回，告诉前端用户不存在
    3) 用户存在需要验证密码是否正确
    4) 密码不正确返回给前端提示密码不正确
    5) 密码正确返回给前端数据，提示用户登录成功(会携带用户的相关信息)
*/
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '', // 手机号
    password: '' // 用户密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 表单项内容发生改变的回调
  handleInput(event){
    let type = event.currentTarget.id;// id传值 取值： userName || password
    //console.log(type,event.detail.value);
    this.setData({
      [type]: event.detail.value
    })
  },
  
  
  // 登录的回调
async login(){
    // 1. 收集表单项数据
    let {userName, password} = this.data;
    // 2. 前端验证
    /*
    * 手机号验证：
    *   1. 内容为空
    *   2. 手机号格式不正确
    *   3. 手机号格式正确，验证通过
    * */
    
    if(!userName){
      // 提示用户
      wx.showToast({
        title: '账号不能为空',
        icon: 'none'
      })
      return;
    }
    
    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return;
    }

    // 后端验证
    let result = await request('/login', {userName, password},'POST')
    if(result.code === 200){ // 登录成功
      wx.showToast({
        title: '登录成功'
      })
       // 将用户的信息存储至本地
       wx.setStorageSync('userInfo', JSON.stringify(result.data.staff))
       // 跳转至个人中心personal页面
       wx.reLaunch({
         url: '/pages/user/index'
       })
    }else if(result.code === 406){
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    }else if(result.code === 502){
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })
    }else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
    }
  },

})