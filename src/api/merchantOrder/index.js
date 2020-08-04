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
