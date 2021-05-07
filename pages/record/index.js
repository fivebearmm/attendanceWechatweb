// pages/record/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffId:'',
    attendanceStart:'',
    attendanceEnd:'',
    leaveStart:'',
    leaeEnd:'',
    userInfo:{},
    status:{},
    monthStatus:{},
    showOneView: true,
    tabs: [
      {
        id: 0,
        value: "实时状态",
        isActive: true
      },
      {
        id: 2,
        value: "非正常出勤",
        isActive: false
      }
    ]
  },
  onLoad: function (options) {
    // 读取用户的基本信息
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo){ 
      // 更新userInfo的状态
      this.setData({
        userInfo: JSON.parse(userInfo)
      })

       // 1 获取当前的小程序的页面栈-数组 长度最大是10页面 
      let Pages =  getCurrentPages();
      // 2 数组中 索引最大的页面就是当前页面
      let currentPage = Pages[Pages.length - 1]
       // 3 获取url上的type参数
      const{type}  = currentPage.options
       // 4 激活选中页面标题 当 type=1 index=0 
       this.changeTitleByIndex(type-1)
       this.getRecord(this.data.userInfo.staffId)
      // 获取用户播放记录
    }
  },
 changeTitleByIndex(index){
  let {tabs}=this.data;
  tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
  // 3 赋值到data中
  this.setData({
      tabs
   })
   if(index != 0){
      this.setData({
        showOneView: false
      })
   }else{
    this.setData({
      showOneView: true
    })
   }
 },
 // 标题点击事件 从子组件传递过来
 handleTabsItemChange(e){
  // 1 获取被点击的标题索引
   const {index} = e.detail;
   this.changeTitleByIndex(index)
  },
  async getRecord(staffId){
    this.mounted();
    var attendanceStart = this.dateFormat(this.attendanceStart);
    var attendanceEnd = this.dateFormat(this.attendanceEnd);
    var leaveStart = this.dateFormat(this.leaveStart);
    var leaveEnd = this.dateFormat(this.leaveEnd);
    let result = await request('/commonStatus'+'/'+staffId+'/'+attendanceStart+'/'+attendanceEnd, {},'GET')
    let res = await request('/MyAttendanceMonth'+'/'+staffId+'/'+leaveStart+'/'+leaveEnd, {},'GET')
    console.log(result)
    console.log(res)
    let info = [];
    for(let i in res.data){
        info.push(res.data[i]);
    }
    this.setData({
      status:result.data,
      monthStatus:info
    })
  },
  dateFormat(dateData) {
    var d = new Date(dateData)
    var resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    var resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
    const time = resDate +" "+ resTime
    return time;
  },
  p(s) { return s < 10 ? '0' + s : s
  }, 
  mounted() {
   var vm = this;
   var date = new Date();
   vm.attendanceStart = new Date(date.getTime() - 24 * 60 * 60 * 1000 * 30);
   vm.attendanceEnd = new Date(date.getTime() + 24 * 60 * 60 * 1000);// 默认显示为当天时间
   vm.leaveStart = new Date(date.getTime() - 24 * 60 * 60 * 1000 * 30 * 12);
   vm.leaveEnd = new Date(date.getTime() + 24 * 60 * 60 * 1000);// 默认显示为当天时间
  }

})