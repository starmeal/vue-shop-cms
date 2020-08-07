import request from "@/utils/request";

export function merAfterSaleListNew(data) {
  return request({
    url: "/aftersale/merAfterSaleListNew",
    method: "post",
    data: data
  });
}