// pages/category/index.js
// !!!!! 注意引入 JS 只能写相对路径。
// 引入全局实例
const app = getApp();
// 在需要使用到  async await 的 js 中，手动引入 runtime.js， regeneratorRuntime 名字不能改
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classify: wx.getStorageSync('classify') || [],
    classifyRight: wx.getStorageSync('classifyRight') || [],
    activeIndex: 0,
    scrollTop: 0
  },
  // 点击切换索引的事件处理函数
  changeIndex(event) {
    console.log(event);
    const {
      index
    } = event.currentTarget.dataset

    // 小程序更新数据
    this.setData({
      activeIndex: index,
      // 右边数据根据左边点击传递索引 重新渲染
      classifyRight: this.data.classify[index].children
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (this.data.classify.length === 0) {
      //  这是原来的方法
      //   wx.request({
      //     url: 'https://api.zbztb.cn/api/public/v1/categories',
      //     success :res=> {
      //       const classify = res.data.message
      //       const classifyRight = res.data.message[0].children
      //       wx.setStorageSync('classify', classify)
      //       wx.setStorageSync('classifyRight', classifyRight)
      //       this.setData ({
      //         classify,
      //         classifyRight
      //       })
      //     }
      //   })
      // }
      //  这是引入myAxios
      myAxios({
        url: 'categories',
      }).then(res => {
        console.log(res);
        // 现在的 res 就是 之前的 res.data.message 
        const classify =  res;
        const classifyRight = classify[0].children;
        // ✅ 小程序的本地存储写法
        wx.setStorageSync('classify', classify);
        wx.setStorageSync('classifyRight', classifyRight);
        // 异步版本 - 了解
        this.setData({
          classify,
          classifyRight
        });
      })
    }
  }
})