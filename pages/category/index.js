// pages/category/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classify:wx.getStorageSync('classify') || [],
    classifyRight: wx.getStorageSync('classifyRight') || [],
    activeIndex : 0,
    scrollTop:""
  },
  // 点击切换索引的事件处理函数
  changeIndex (event) {
    console.log(event);
    const { index } = event.currentTarget.dataset

    // 小程序更新数据
    this.setData({
      activeIndex : index,
      // 右边数据根据左边点击传递索引 重新渲染
      classifyRight : this.data.classify[index].children
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    if (this.data.classify.length === 0) {
      wx.request({
        url: 'https://api.zbztb.cn/api/public/v1/categories',
        success :res=> {
          const classify = res.data.message
          const classifyRight = res.data.message[0].children
          wx.setStorageSync('classify', classify)
          wx.setStorageSync('classifyRight', classifyRight)
          this.setData ({
            classify,
            classifyRight
          })
        }
      })
    }
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