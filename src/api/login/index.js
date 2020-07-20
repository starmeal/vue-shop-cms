import request from '@/utils/request.js';
// 账户密码登录
export function login (data) {
  return request({
    url: '/cms/merchantsLoginByCodeAndPass',
    method: 'POST',
    data
  })
}
// 手机验证码登录
export function plogin (data) {
  return request({
    url: '/cms/merchantsLoginByMobileAndSms',
    method: 'POST',
    data
  })
}
export function getOrderMessage (data) {
  return request({
    url: '/order/getOrderMessage',
    method: 'POST',
    data
  })
}