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
// 提现申请记录列表
export function withdrawalList(data) {
  return request({
    url: "/withdrawal/withdrawalList",
    method: "post",
    data
  });
}
// 提现申请
export function withdrawalApplication(data) {
  return request({
    url: "/withdrawal/withdrawalApplication",
    method: "post",
    data
  });
}
// 提现申请
export function sendSMCode(data) {
  return request({
    url: "/withdrawal/sendSMCode/v1",
    method: "post",
    data
  });
}
// 提现申请基本信息获取
export function withdrawInformation(data) {
  return request({
    url: "/withdrawal/withdrawInformation",
    method: "post",
    data
  });
}
export function withdrawalListExportExcel(data) {
  return request({
    url: "/withdrawal/withdrawalListExportExcel",
    method: "post",
    responseType: 'blob',
    data
  });
}