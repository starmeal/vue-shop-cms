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
