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
    totalPrice: 0,
    totalCount:0,
    checkAll: false
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
  // 加减号
  changeCount (event) {
    // 解构事件的参数
    console.log(event);
    const { index,number } = event.currentTarget.dataset;
    // 解构购物车数组
    const { cartList } = this.data;
    // 如果点击的是减号，并且当前数量为 1 
    if (number === -1 && cartList[index].goods_count === 1){
      // 模态提示框，有两个按钮
      wx.showModal({
        title: '是否删除商品',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        // PS: 模态提示框，不管点击确定还是取消都触发 success
        success: (result) => {
          console.log(result);
          if(result.confirm){
            cartList.splice(index,1);
            // 重新计算总价格，全选状态，并更新 cartList 页面数据 和 cartList 本地存储数据
            this.computedCartData();
          } else if (result.cancel) {
            console.log('点了取消');
          }
        },
      });
    } else {
      cartList[index].goods_count += number
      this.computedCartData();
    }
  },

  // 列表项的选择按钮点击
  changeCheck(event){
    const { index } = event.currentTarget.dataset;
    const { cartList } = this.data;
    cartList[index].goods_selected = !cartList[index].goods_selected;
    this.computedCartData();
  },

  // 全选按钮点击事件
  changeCheckAll () {
    let { checkAll,cartList } = this.data

    checkAll = !checkAll;
    // 购物车列表的选中状态和全选保持一致
    cartList.forEach(v => {
      v.goods_selected = checkAll
    });

    this.setData({
      checkAll,
      cartList
    })
    // 重新计算总价格
    this.computedCartData()
  },

  // 封装一个计算总价格的函数
  computedCartData() {
    const { cartList } = this.data;
    let totalPrice = 0;
    let totalCount = 0;

    // 计算总价格
    cartList.forEach(v => {
      // 如果是选中的商品
      if (v.goods_selected){
        // 总金额
        totalPrice += v.goods_price * v.goods_count;
        // 选中件数
        totalCount++
      }
    })

    // 更新数据 页面和本地存储
    this.setData({
      totalCount,
      totalPrice,
      cartList,
      // 全选状态，购物条数 和 选中的数量比较，相对返回 true 全选，不相等反之
      checkAll: cartList.length === totalCount
    })
    wx.setStorageSync('cartList', cartList);
  },

  // 获取用户信息
  getAddressHandle() {
    // 1 获取授权信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.address"] === false) {
          // 2.0 打开设置界面
          wx.openSetting({
            success: (res) => {
              // 3.0 调用收货地址接口
              this.getAddress()
            }
          })
        } else {
          // 3.0 调用收货地址接口
          this.getAddress()
        }
      }
    })
  },
  // 获取用户地址信息
  getAddress() {
    wx.chooseAddress({
      success :(result) =>{
        console.log(result);
        // 从成功的回调函数中提取关键信息
        const { cityName,countyName,detailInfo,nationalCode,postalCode,provinceName,telNumber,userName } = result
        // 构建一个新的对象
        const address = {
          cityName,
          countyName,
          detailInfo,
          nationalCode,
          postalCode,
          provinceName,
          telNumber,
          userName,
          // 额外拼接了一个新的字符串
          addressDetail:`${provinceName}${cityName}${countyName}${detailInfo}`
        }
        // 把地址信息保存到本地存储
        wx.setStorageSync('address',address)
        // 更新数据
        this.setData({
          address
        })
      },
      fail : (err)=>{
        wx.wx.showToast({
          title: '你取消了地址选择',
          icon: 'none'
        });
      }
    })
  }
})