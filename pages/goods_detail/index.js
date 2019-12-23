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
  previewBigImage(event) {
    // console.log(event);
    const { src } = event.currentTarget.dataset;
     // !!! 通过数组的 map 方法，把每一个对象处理成字符串
     const newUrls = this.data.goods_detail.pics.map(v=>v.pics_big)
    //  console.log(newUrls);
    wx.previewImage ({
      current: src, // 当前显示图片的http链接
      urls: newUrls // 需要预览的图片http链接列表
     })
  },
   // 生命周期函数--监听页面加载
  async onLoad (options) {
    const res = await app.myAxios({
      url:'goods/detail',
       // options 为页面参数，options 内部保存了 goods_id 参数
      data : options
    })
    // console.log(res);
    // 通过 this.setData() 把请求的数据绑定起来，用于页面渲染
    this.setData({
      goods_detail : res
    })
  }
})