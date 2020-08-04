import request from "@/utils/request";

export function getMerShopOrderList(data) {
    return request({
        url: `/order/getMerShopOrderList`,
        method: "POST",
        data
    });
}