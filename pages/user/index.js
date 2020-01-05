const app = getApp();
import regeneratorRuntime from "../../lib/runtime/runtime";
// pages/user/index.js
Page({
	data: {
		userInfo: {},
		token: ""
	},
	onShow() {
		this.setData({
			userInfo: wx.getStorageSync('userInfo') || {},
			token: wx.getStorageSync('token') || ''
		})
	},

	getCode() {
		return new Promise((resolve, reject) => {
			// 调用 wx.login() 获取 code, code 发给后端，后端再发给微信服务器。
			// 小程序登录_前后端完整流程_请看文档：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
			wx.login({
				success: result => {
					resolve(result.code)
				}
			})
		})
	},
	// API 调用
	sendUserData(obj) {
		return app.myAxios({
			url: "users/wxlogin",
			method: "post",
			data: obj
		})
	},
	async getToken(event) {
		// console.log(event);
		const {
			encryptedData,
			iv,
			rawData,
			signature,
			userInfo
		} = event.detail

		const code = await this.getCode()
		const res = await this.sendUserData({
			encryptedData,
			iv,
			rawData,
			signature,
			code
		})
		
		if (res) {
			const {token} = res
			wx.setStorageSync('token', token);
			wx.setStorageSync('userInfo', userInfo);
			this.setData({
				token,
				userInfo
			})
			wx.showToast({
				title: '登录成功',
				icon: 'none'
			});
		} else {
			wx.showToast({
				title: '登录失败，请重试',
				icon: 'none'
			});
		}
	}
})