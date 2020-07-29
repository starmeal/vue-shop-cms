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
    url: `/cms/goods/add`,
    method: "POST",
    data
  });
}
export function queryDraftBoxList(data) {
  return request({
    url: `/cms/goods/queryDraftBoxList`,
    method: "POST",
    data
  });
}
export function queryGoodsList(data) {
  return request({
    url: `/cms/goods/queryGoodsList`,
    method: "POST",
    data
  });
}
