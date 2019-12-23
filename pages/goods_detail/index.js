// 引入全局实例
const app = getApp();
// 在需要使用到  async await 的 js 中，手动引入 runtime.js， regeneratorRuntime 名字不能改
import regeneratorRuntime, { async } from '../../lib/runtime/runtime'
// pages/goods_detail/index.js
Page({
  // 页面的初始数据
  data: {
    // 商品详情
    goods_detail:{}
  },
  // 预览大图的事件
  
   // 生命周期函数--监听页面加载
  async onLoad (options) {
    const res = await app.myAxios({
      url:'goods/detail',
      data : options
    })
    console.log(res);
    this.setData({
      goods_detail : res
    })
  }
})