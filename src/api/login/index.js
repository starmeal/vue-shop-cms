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
//忘记密码
export function resetPassword (data) {
  return request({
    url: '/cms/modifyPassword',
    method: 'POST',
    data
  })
}
//重置密码收取短信验证码
export function getphoneMessage (data) {
  return request({
    url: '/cms/sendSMCodeForPassWord/v1',
    method: 'POST',
    data
  })
}
//重置密码
export function resetingPassword(data) {
  return request({
    url: '/cms/modifyPassword',
    method: 'POST',
    data
  })
}
// 短信登录发送验证啊
export function cmssendSMCode(data) {
  return request({
    url: '/cms/sendSMCode/v1',
    method: 'POST',
    data
  })
}
