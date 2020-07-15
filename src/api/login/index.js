import request from '@/utils/request.js';
export function login (data) {
  return request({
    url: '/cms/merchantsLoginByCodeAndPass',
    method: 'POST',
    data
  })
}