import request from "@/utils/request";

export function inquireAddressList(data) {
  return request({
    url: "/address/inquireAddressList",
    method: "post",
    data: data
  });
}
export function addOrModifyMerchantAddress(data) {
  return request({
    url: "/address/addOrModifyMerchantAddress",
    method: "post",
    data: data
  });
}
export function deleteShopMerchantsAddress(data) {
  return request({
    url: "/address/deleteShopMerchantsAddress",
    method: "post",
    data: data
  });
}
export function shopMerchantsAddressDetail(data) {
  return request({
    url: "/address/shopMerchantsAddressDetail",
    method: "post",
    data: data
  });
}
