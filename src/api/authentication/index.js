import request from "@/utils/request";

export function qualification(data) {
  return request({
    url: "/merchants/info/qualification",
    method: "post",
    data: data
  });
}
export function categoryInformationList(data) {
  return request({
    url: "/merchants/info/categoryInformationList",
    method: "post",
    data: data
  });
}
export function GetBasicDetailsByName(data) {
  return request({
    url: "/qcc/GetBasicDetailsByName",
    method: "post",
    data: data
  });
}
export function certification(data) {
  return request({
    url: "/merchants/info/certification",
    method: "post",
    data: data
  });
}
export function queryQualificationDetail(data) {
  return request({
    url: "/merchants/info/queryQualificationDetail",
    method: "post",
    data: data
  });
}

export function qualificationDetailEdit(data) {
  return request({
    url: "merchants/info/qualificationDetailEdit",
    method: "post",
    data: data
  });
}