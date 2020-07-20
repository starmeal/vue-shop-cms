import request from "@/utils/request";

export function addShopMerchantsNotice(data) {
  return request({
    url: "/merchants/addShopMerchantsNotice",
    method: "post",
    data: data
  });
}

export function selectShopMerchantsNotice(data) {
  return request({
    url: "/merchants/selectShopMerchantsNotice",
    method: "post",
    data
  });
}

export function deleteShopMerchantsNoticeById(data) {
  return request({
    url: "/merchants/deleteShopMerchantsNoticeById",
    method: "post",
    data
  });
}

export function selectShopMerchantsNoticeById(data) {
  return request({
    url: "/merchants/selectShopMerchantsNoticeById",
    method: "post",
    data
  });
}
export function updateShopMerchantsNoticeById(data) {
  return request({
    url: "/merchants/updateShopMerchantsNoticeById",
    method: "post",
    data
  });
}
export function announcement(data) {
  return request({
    url: "/merchants/announcement",
    method: "post",
    data
  });
}
// 批量删除公告接口
export function batchDeleteShopMerchantsNoticeByIds(data) {
  return request({
    url: "/merchants/batchDeleteShopMerchantsNoticeByIds",
    method: "post",
    data
  });
}
// 批量停止
export function batchStopShopMerchantsNoticeByIds(data) {
  return request({
    url: "/merchants/batchStopShopMerchantsNoticeByIds",
    method: "post",
    data
  });
}