// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // tabs 数据
    activeIndex:0,
    // tabs栏
    tabs : [
      {
        id:1,
        name:'全部'
      },
      {
        id:2,
        name:'待付款'
      },
      {
        id:3,
        name:'代发货'
      },
      {
        id:4,
        name:'退款/退货'
      }
    ]
  },
  changeIndex (event) {
    console.log(event);
    const { index } = event.target.dataset
    this.setData({
      activeIndex:index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})