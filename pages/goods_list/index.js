// pages/goods_list/index.js
// 引入封装myAxios
import { myAxios } from '../../utils/myAxios.js'
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    productlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (oprions) {
    console.log(oprions);
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/goods/search',
      success:res=> {
        console.log(res);
        this.setData({
          productlist : res.data.message.goods
        })
        
      }
    })
  }
})