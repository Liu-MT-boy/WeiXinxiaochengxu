// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // address: wx.getStorageSync('address') || {}
    // 在 data 中写的获取也只会触发一次
    address: {},
    cartList: [],
    totalPrice: 0
  },
  // 页面开启时运行
  onShow(){
    // 每次显示后获取最新本地存储数据，并更新到 data 中
    this.setData({
      address : wx.getStorageSync('address') || {},
      cartList : wx.getStorageSync('cartList') || []
    })
    this.computedCartData()
  },
  // 封装一个计算总价格的函数
  computedCartData() {
    const { cartList } = this.data;
    // 总价格
    let totalPrice = 0;

    // 计算总价格
    cartList.forEach(v => {
      // 如果是选中的商品
      if (v.goods_selected){
        // 总金额
        totalPrice += v.goods_price * v.goods_count;
      }
    })

    // 更新数据 页面和本地存储
    this.setData({
      totalPrice,
    })
  }
})