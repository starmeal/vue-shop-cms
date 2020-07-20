import request from '@/utils/request'
export function getOssToken(data) {
  return request({
    url: '/oss/policy/getOssToken',
    method: "POST",
    data
  })
}
