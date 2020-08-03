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
export function fakeDeleteGoods(data) {
  return request({
    url: `/cms/goods/fakeDeleteGoods`,
    method: "POST",
    data
  });
}
export function selectShopGoodsCategory(data) {
  return request({
    url: `/cms/goods/selectShopGoodsCategory`,
    method: "POST",
    data
  });
}
export function exportGoodsList(data) {
  return request({
    url: `/cms/goods/exportGoodsList`,
    method: "POST",
    responseType: 'blob',
    data
  });
}
export function detail(data) {
  return request({
    url: `/cms/goods/detail`,
    method: "POST",
    data
  });
}
export function dictoptions(data) {
  return request({
    url: `/dict/options`,
    method: "POST",
    data
  });
}
export function realDeleteGoods(data) {
  return request({
    url: `/cms/goods/realDeleteGoods`,
    method: "POST",
    data
  });
}
export function update(data) {
  return request({
    url: `/cms/goods/update`,
    method: "POST",
    data
  });
}
export function modifyRecommendationStatus(data) {
  return request({
    url: `/goods/modifyRecommendationStatus`,
    method: "POST",
    data
  });
}

