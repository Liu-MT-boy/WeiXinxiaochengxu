// 引入全局实例
const app = getApp();
// 在需要使用到  async await 的 js 中，手动引入 runtime.js， regeneratorRuntime 名字不能改
import regeneratorRuntime, { async } from '../../lib/runtime/runtime'

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
	
	createOrder(){
		const { address,cartList,totalPrice } = this.data
		const goods = cartList.filter(v=>v.goods_selected).map(v=>{
			return {
				goods_id : v.goods_id,
				goods_number : v.goods_count,
				goods_price : v.goods_price
			}
		})
		// 发送请求
		return app.myAxios({
      url:'my/orders/create',
      method:'post',
      data:{ 
        order_price: totalPrice,
        consignee_addr: address.addressDetail,
        goods
     }
    });
	},

	unifiedorder(order_number){
		return app.myAxios({
      url:'my/orders/req_unifiedorder',
      method:'post',
      data:{ 
        order_number
     }
    });
	},
	async pay(){
		// 创建订单，接收返回的订单编号
		const { order_number } = await this.createOrder()
		// 准备预支付，获取支付参数
		const { pay } = await this.unifiedorder(order_number)
		console.log(pay);
	},
	// 页面开启时运行
	onShow() {
		// 每次显示后获取最新本地存储数据，并更新到 data 中
		this.setData({
			address: wx.getStorageSync('address') || {},
			cartList: wx.getStorageSync('cartList') || []
		})
		this.computedCartData()
	},
	// 封装一个计算总价格的函数
	computedCartData() {
		const {
			cartList
		} = this.data;
		// 总价格
		let totalPrice = 0;

		// 计算总价格
		cartList.forEach(v => {
			// 如果是选中的商品
			if (v.goods_selected) {
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