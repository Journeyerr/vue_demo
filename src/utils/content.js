
export const userInfoKey = 'userInfo'

export const pageSizeConfig = 10

export const statusNames = [
  {
    code: 'WAIT_BUYER_PAY',
    name: '用户未付款'
  },
  {
    code: 'BUYER_PAY',
    name: '用户已付款'
  },
  {
    code: 'WAIT_SELLER_SEND_GOODS',
    name: '正在备货中'
  },
  {
    code: 'WAIT_BUYER_CONFIRM_GOODS',
    name: '等待收货'
  },
  {
    code: 'DISPATCHING_GOODS',
    name: '正在配送中'
  },
  {
    code: 'TRADE_CLOSED',
    name: '交易已完成'
  },
  {
    code: 'CANCELED',
    name: '交易已取消'
  }
]

