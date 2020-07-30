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
//快递模板列表
export function getMerTemplateList(data) {
  return request({
    url: "/template/getMerTemplateList",
    method: "post",
    data: data
  });
}

//添加/编辑商家运费模板
export function editMerTemplate(data) {
  return request({
    url: "/template/editMerTemplate",
    method: "post",
    data: data
  });
}
//删除商家运费模板
export function delMerTemplate(data) {
  return request({
    url: "/template/delMerTemplate",
    method: "post",
    data: data
  });
}

//启用商家运费模板
export function setTemplateIsEnabled(data) {
  return request({
    url: "/template/setTemplateIsEnabled",
    method: "post",
    data: data
  });
}
//设置模板是否默认选中
export function setTemplateIsChecked(data) {
  return request({
    url: "/template/setTemplateIsChecked",
    method: "post",
    data: data
  });
}
//设置模板排序字段接口
export function setTemplateSort(data) {
  return request({
    url: "/template/setTemplateSort",
    method: "post",
    data: data
  });
}