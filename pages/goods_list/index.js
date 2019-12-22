// pages/goods_list/index.js
// 引入全局实例
const app = getApp();
// 在需要使用到  async await 的 js 中，手动引入 runtime.js， regeneratorRuntime 名字不能改
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    productlist:[],
    // tabs 数据
    activeIndex:0,
    // tabs栏
    tabs : [
      {
        id:1,
        name:'综合'
      },
      {
        id:2,
        name:'销量'
      },
      {
        id:3,
        name:'价格'
      }
    ]
  },
  // 点击切换 tabs 的索引
  changeIndex (event) {
    // console.log(event);
    const { index } = event.currentTarget.dataset
    this.setData({
      activeIndex : index
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (oprions) {
    console.log(oprions);
    const productlist = await app.myAxios({url:'goods/search'})

    this.setData({productlist})
  }
})