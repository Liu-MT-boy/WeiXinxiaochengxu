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
  onLoad () {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success:res=>{
        // console.log(res)
        this.setData({
          swiperImages: res.data.message
        })
      }
    }),
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success:res=>{
        // console.log(res)
        this.setData({
          categorical:res.data.message
        })
      }
    }),
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success:res=>{
        console.log(res)
        this.setData({
          womenswear:res.data.message
        })
      }
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