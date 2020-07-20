import request from "@/utils/request";

//店铺设置
export function shopSettings(data) {
  return request({
    url: "/shop/merchants/info/selectDetailInfo",
    method: "post",
    data: data
  });
}