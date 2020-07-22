import request from "@/utils/request";

//店铺设置
export function shopSettings(data) {
  return request({
    url: "/merchants/info/selectDetailInfo",
    method: "post",
    data: data
  });
}
//编辑店铺设置
export function editShopSettings(data) {
  return request({
    url: "/merchants/info/editInfo",
    method: "post",
    data: data
  });
}