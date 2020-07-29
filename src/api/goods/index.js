import request from "@/utils/request";

export function selectShopCategoryv2(data) {
  return request({
    url: `/goods/selectShopCategory/v2`,
    method: "POST",
    data
  });
}
export function getMerTemplateList(data) {
  return request({
    url: `/template/getMerTemplateList`,
    method: "POST",
    data
  });
}
export function goodsadd(data) {
  return request({
    url: `/goods/add`,
    method: "POST",
    data
  });
}
