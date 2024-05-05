import request from '@/utils/request'
import { getToken } from '@/utils/auth'

// 订单列表
export function getOrderList(data) {
    return request({
      url: '/order/orderList',
      headers: {
        DtdToken: getToken(),
      },
      method: 'post',
      data: data
    })
  }