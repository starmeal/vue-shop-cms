import request from "@/utils/request";

export function getMerShopOrderList(data) {
    return request({
        url: `/order/getMerShopOrderList`,
        method: "POST",
        data
    });
}
export function merShopOrderListExportExcel(data) {
    return request({
        url: `/order/merShopOrderListExportExcel`,
        method: "POST",
        data
    });
}

export function getDeliveryDetails(data) {
    return request({
        url: `/order/getDeliveryDetails`,
        method: "POST",
        data
    });
}
export function setLogisticsInfoNew(data) {
    return request({
        url: `/order/setLogisticsInfoNew`,
        method: "POST",
        data
    });
}
export function distinguishHandle(data) {
    return request({
      url: "/order/logistics/distinguishHandle",
      method: "POST",
      data
    });
}
export function updateShopOrderParcelInfo(data) {
    return request({
      url: "/order/updateShopOrderParcelInfo",
      method: "POST",
      data
    });
}
export function getShopOrderDetailNew(data) {
    return request({
      url: "/order/getShopOrderDetailNew",
      method: "POST",
      data
    });
}
export function updateCustAddressInfo(data) {
    return request({
      url: "/order/updateCustAddressInfo",
      method: "POST",
      data
    });
}
