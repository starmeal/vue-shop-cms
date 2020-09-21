import request from "@/utils/request";

export function merAfterSaleListNew(data) {
  return request({
    url: "/aftersale/merAfterSaleListNew",
    method: "post",
    data: data
  });
}
export function getAfterSaleDetailInfoNew(data) {
  return request({
    url: "/aftersale/getAfterSaleDetailInfoNew",
    method: "post",
    data: data
  });
}
export function merAfterSaleListExportExcel(data) {
  return request({
    url: "/aftersale/merAfterSaleListExportExcel",
    method: "post",
    responseType: 'blob',
    data: data
  });
}
export function afterSaleAgreeApply(data) {
  return request({
    url: "/aftersale/afterSaleAgreeApply",
    method: "post",
    data: data
  });
}

export function afterSaleRefuseApply(data) {
  return request({
    url: "/aftersale/afterSaleRefuseApply",
    method: "post",
    data: data
  });
}
export function viewAftersaleMoneyWhere(data) {
  return request({
    url: "/aftersale/viewAftersaleMoneyWhere",
    method: "post",
    data: data
  });
}
export function inquireAddressList(data) {
  return request({
    url: "/address/inquireAddressList",
    method: "post",
    data: data
  });
}
export function merAfterSaleConfirmReceipt(data) {
  return request({
    url: "/aftersale/merAfterSaleConfirmReceipt",
    method: "post",
    data: data
  });
}
export function merAfterSaleRefuseReceipt(data) {
  return request({
    url: "/aftersale/merAfterSaleRefuseReceipt",
    method: "post",
    data: data
  });
}
export function merAfterSaleLogisticsInfo(data) {
  return request({
    url: "/aftersale/merAfterSaleLogisticsInfo",
    method: "post",
    data: data
  });
}
