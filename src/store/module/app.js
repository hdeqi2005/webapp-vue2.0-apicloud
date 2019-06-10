import { getChargeList,orderSubmit,orderPayment,orderPayStatus} from '@/api/app'
import { setCookie,getCookie,setLocalStorage,getLocalStorage} from '@/libs/util'
const serverBusyTips="服务繁忙，请稍后再试！";
export default {
    state:{
        orderInfo:getLocalStorage('orderInfo'),
    },
    getters:{
      
      orderInfo_state:state=>state.orderInfo
       // doneTodos: state => {//通过方法访问
      //   return state.todos.filter(todo => todo.done)
      // },
      // doneTodosCount: (state, getters) => {//通过属性访问
      //     return getters.doneTodos.length
      //   }
    },
    mutations:{
        setOrderInfo(state,data){
          state.orderInfo =data
          setLocalStorage('orderInfo',JSON.stringify(data))
        }
    },
    actions:{
        /**
        * @description 获取收费信息
        * @params { null }
        */
        getChargeList_actions({commit},params){
            return new Promise((resolve,reject)=>{
                try {
                    getChargeList(params).then(res=>{
                        const data = process.env.NODE_ENV === 'production' ? res : res.data //因为web 浏览器 多封装了一层 data 包裹
                        //debugger
                        if(data.success)
                        {
                          resolve(data)
                        }
                        else
                        {
                          reject(data)
                        }
                    }).catch(err=>{
                        console.error(JSON.stringify(err))
                        reject(serverBusyTips)
                    })
                } catch (error) {
                    console.error(JSON.stringify(error))
                    reject(serverBusyTips)
                }
               
            })
        },
        /**
        * @description 提交订单
        * @params { systemId,serverId }
        */
        orderSubmit_action({commit},params){
          //debugger
            return new Promise((resolve,reject)=>{
              try {

                orderSubmit(params).then(res=>{
                 // console.log("提交订单 :"+JSON.stringify(params))
                    const data = process.env.NODE_ENV === 'production' ? res : res.data //因为web 浏览器 多封装了一层 data 包裹
                    if(data.success)
                    {
                     // debugger
                      commit('setOrderInfo',data.data)
                      resolve(data)
                        //   {
                        //     "data": {
                        //         "orderNo": "20190606104844846164",  订单号
                        //         "payPrice": 557.07,  支付金额
                        //         "discount": 9.3,   折扣0.1-10
                        //         "orderPrice": 599,  原价
                        //         "usetime": 360,   使用时长
                        //         "orderName": "年度会员"   订单名称
                        //     },
                        //     "msg": "执行成功",
                        //     "status": 0,
                        //     "success": true
                        // }
                    }
                    else
                    {
                      debugger
                      reject(data)
                    }
                }).catch(err=>{
                    console.error(JSON.stringify(err))
                    reject(serverBusyTips)
                })
                  
              } catch (error) {
                console.error(JSON.stringify(error))
                reject(serverBusyTips)
              }
            })
        },
        /**
        * @description 支付订单
        * @params { orderNo,payType }
        */
        orderPayment_action({commit},params){
          debugger
          return new Promise((resolve,reject)=>{
                try {
                  orderPayment(params).then(res=>{
                    debugger
                    const data = process.env.NODE_ENV === 'production' ? res : res.data //因为web 浏览器 多封装了一层 data 包裹
                    if(data.success || data.status.toString() == '10011')
                    {
                      resolve(data)
                    }
                    else
                    {
                      debugger
                      reject(data)
                    }
                  }).catch(err=>{
                    debugger
                    console.error(JSON.stringify(err))
                    reject(serverBusyTips)
                  })
                } catch (error) {
                  debugger
                  console.error(JSON.stringify(error))
                  reject(serverBusyTips)
                }
          })
        },
         /**
        * @description 订单状态查询
        * @params { orderNo }
        */
        orderPayStatus_action({commit},params){
            return new Promise((resolve,reject)=>{
              try {
                orderPayStatus(params).then(res=>{
                  const data = process.env.NODE_ENV === 'production' ? res : res.data //因为web 浏览器 多封装了一层 data 包裹
                  if(data.success)
                  {
                    resolve(data)
                  }
                  else
                  {
                    reject(data)
                  }
                }).catch(err=>{
                  console.error(JSON.stringify(err))
                  reject(serverBusyTips)
                })
              } catch (error) {
                console.error(JSON.stringify(error))
                reject(serverBusyTips)
              }
            })
        },
    }
}

