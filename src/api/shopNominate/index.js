import request from "@/utils/request";

//店铺命名获取店铺类型
export function getRodio(data) {
  return request({
    url: "/dict/options",
    method: "post",
    data: data
  });
}
//店铺名称认证回显
export function shopNominateInfo(data) {
  return request({
    url: "/merchants/info/queryShopNamingCertification",
    method: "post",
    data: data
  });
}
//店铺名称认证
export function shopNominateSubmit(data) {
  return request({
    url: "/merchants/info/storeNamingCertification",
    method: "post",
    data: data
  });
}
