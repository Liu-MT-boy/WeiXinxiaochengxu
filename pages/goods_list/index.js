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
     // 商品分页
     pagenum:1,
     // 请求一次的数量
     pagesize:10,
     // 总条数
     total:0,
     // 商品列表
     goods:[],
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

  // 页面加载生命函数
  async onLoad (options) {

    // 根据参数发送请求
    let {pagenum,pagesize} = this.data
    const res = await app.myAxios({
      url:'goods/search',
      data : {
        ...options,
        pagenum,
        pagesize
      }
    })
    console.log(res);
    // 更新页面的列表，并把总数保存起来用于做分页
    this.setData({
      goods:res.goods,
      total:res.total
    })
  },

  // 下拉事件
  onPullDownRefresh () {
    // 把商品数组清空，把页码重新变成1
    this.setData({
      goods:[],
      pagenum:1
    })
    // 重新调用一下onLoad,重新加载
    this.onLoad(this.options)

  }
})