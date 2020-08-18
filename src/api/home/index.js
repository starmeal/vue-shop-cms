import request from '@/utils/request.js';
export function homeGoodsSalesToTal (data) {
  return request({
    url: '/homeGoodsSalesToTal',
    method: 'POST',
    data
  })
}
export function homeCollectionToTal (data) {
    return request({
      url: '/homeCollectionToTal',
      method: 'POST',
      data
    })
}
export function homeMerInfoData (data) {
    return request({
      url: '/homeMerInfoData',
      method: 'POST',
      data
    })
}
export function homeOrderToTal (data) {
    return request({
      url: '/homeOrderToTal',
      method: 'POST',
      data
    })
}
