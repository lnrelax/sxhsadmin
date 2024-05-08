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
//用户统计
export function getUserNum(data) {
  return request({
    url: '/user/userAnalysis',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//用户列表
export function getUserList(data) {
  return request({
    url: '/user/userList',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//理疗师列表
export function getPhysiotherapList(data) {
  return request({
    url: '/admin/massageList',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//理疗师审核
export function examinePhysiotherap(data) {
  return request({
    url: '/massage/approve?artificerId='+data.artificerId,
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//商家列表
export function shopList(data) {
  return request({
    url: '/admin/agentList',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//商家审核
export function examineShop(data) {
  return request({
    url: '/agent/approve?agentId='+data.agentId,
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//商家修改分成比例
export function shopSet(data) {
  return request({
    url: '/agent/divideSet',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//推广列表
export function extendList(data) {
  return request({
    url: '/extend/backExtendList',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//推广审核
export function examineExtend(data) {
  return request({
    url: '/extend/approve?extendId='+data.extendId,
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//推广分成比例
export function extendSet(data) {
  return request({
    url: '/extend/divideSetPlat',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//服务项目列表
export function itemList() {
  return request({
    url: '/admin/serviceList',
    headers: {
      DtdToken: getToken(),
    },
    method: 'get',
  })
}

//服务项目（新增/编辑/删除）

export function itemServiceEdit(data) {
  return request({
    url: '/admin/serviceEdit',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//优惠券列表
export function favorableList() {
  return request({
    url: '/admin/couponList',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
  })
}

//优惠券（新增/编辑）
export function favorableServiceEdit(data) {
  return request({
    url: '/admin/couponEdit',
    ContentType:"form-data",
    headers: {
      DtdToken: getToken(),
      ContentType:"form-data"
    },
    method: 'post',
    data: data
  })
}

//打车费列表
export function carList() {
  return request({
    url: '/admin/taxiFeesInfo',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
  })
}

//打车费添加
export function carAdd(data) {
  return request({
    url: '/admin/taxiFees',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//轮播图列表
export function imageList() {
  return request({
    url: '/admin/bannerList',
    headers: {
      DtdToken: getToken(),
    },
    method: 'get',
  })
}

//轮播图新增
export function bannerAdd(data) {
  return request({
    url: '/admin/bannerAdd',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//轮播图删除
export function imageDel(data) {
  return request({
    url: '/admin/bannerDelete',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}



//理疗师提现记录 
export function artificerCasheRecord(data) {
  return request({
    url: '/admin/artificerCasheRecord',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//理疗师打款
export function examine(data) {
  return request({
    url: '/admin/examine',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//店铺提现列表
export function agentCasheRecord(data) {
  return request({
    url: '/admin/agentCasheRecord',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}
//店铺提现打款
export function examineAgent(data) {
  return request({
    url: '/admin/examineAgent',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//推广提现列表
export function extendCasheRecord(data) {
  return request({
    url: '/admin/extendCasheRecord',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}
//推广提现打款
export function examineExtendS(data) {
  return request({
    url: '/admin/examineExtend',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//反馈意见列表
export function artFeedBackList(data) {
  return request({
    url: '/admin/artFeedBackList',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//反馈意见处理
export function artFeedBackApprove(data) {
  return request({
    url: '/admin/artFeedBackApprove',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//系统设置查询
export function textInfo(data) {
  return request({
    url: '/admin/textInfo',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}
//系统设置修改
export function textEdit(data) {
  return request({
    url: '/admin/textEdit',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//推广后台统计分析
export function profitInfo(data) {
  return request({
    url: '/extend/analysis',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//推广后台订单记录 
export function profitList(data) {
  return request({
    url: '/extend/analysisOrderList',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//推广团队发起提现
export function profitTx(data) {
  return request({
    url: '/extend/withdraw',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//推广后台推广管理
export function extendExtendList(data) {
  return request({
    url: '/extend/extendExtendList',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//推广后台获取上限
export function divideSetConfig() {
  return request({
    url: '/extend/divideSetConfig',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
  })
}

//推广设置分成比例
export function divideSet(data) {
  return request({
    url: '/extend/divideSet',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//推广设置审核
export function approve(id) {
  return request({
    url: '/extend/approve?extendId='+id,
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
  })
}

//推广后台提现列表
export function extendCasheRecordPersonal(data) {
  return request({
    url: '/admin/extendCasheRecordPersonal',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//个人中心
export function extendInfo() {
  return request({
    url: '/extend/extendInfo',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
  })
}

//个人中心修改密码
export function pwdUpdate(data) {
  return request({
    url: '/extend/pwdUpdate',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//个人中心修改银行卡
export function bankCardEdit(data) {
  return request({
    url: '/extend/bankCardEdit',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//后台订单管理订单号查询
export function queryOrderByOrderId(data) {
  return request({
    url: '/order/queryOrderByOrderId',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data: data
  })
}

//理疗师删除
export function massageDelete(id) {
  return request({
    url: '/massage/massageDelete?artificerId='+id,
    headers: {
      DtdToken: getToken(),
    },
    method: 'post'
  })
}

//商铺删除
export function agentDeleted(id) {
  return request({
    url: '/agent/agentDeleted?agentId='+id,
    headers: {
      DtdToken: getToken(),
    },
    method: 'post'
  })
}

//车费删除
export function taxiDelete(data) {
  return request({
    url: '/admin/taxiDelete',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post',
    data:data
  })
}

//平台总分析
export function paltAnalyze() {
  return request({
    url: '/admin/paltAnalyze',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post'
  })
}

//平台当日分析
export function paltTodayAnalyze() {
  return request({
    url: '/admin/paltTodayAnalyze',
    headers: {
      DtdToken: getToken(),
    },
    method: 'post'
  })
}

