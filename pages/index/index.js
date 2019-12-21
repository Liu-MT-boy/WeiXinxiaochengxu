// 引入全局实例
const app = getApp();
// 在需要使用到  async await 的 js 中，手动引入 runtime.js， regeneratorRuntime 名字不能改
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImages:[],
    "indicatordots":true,
    "indicatoractivecolor": "#666",
    "autoplay":true,
    "interval":5000,
    "duration":500,
    categorical:[],
    womenswear:[]
  },
  // 返回顶部
  toTap () {
    // 调用页面滚动，API
    wx.pageScrollTo({
      scrollTop:0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad () {
    const swiperImages = await app.myAxios({url:'home/swiperdata'});
    const womenswear = await app.myAxios({url:'home/floordata'});
    const categorical = await app.myAxios({url:'home/catitems'});

    this.setData({swiperImages,womenswear,categorical})
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   success:res=>{
    //     // console.log(res)
    //     this.setData({
    //       swiperImages: res.data.message
    //     })
    //   }
    // }),
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
    //   success:res=>{
    //     console.log(res)
    //     this.setData({
    //       // 数据统一都是在 res.data.message，后续可以统一封装起来
    //       womenswear:res.data.message
    //     })
    //   }
    // }),
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
    //   success:res=>{
    //     // console.log(res)
    //     this.setData({
    //       categorical:res.data.message
    //     })
    //   }
    // })
  }
})