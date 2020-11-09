import request from "@/utils/request";

export function couponadd(data) {
    return request({
        url: "/cms/coupon/add",
        method: "post",
        data: data
    });
}
export function selectShopGoodsCategory(data) {
    return request({
        url: "/cms/goods/selectShopGoodsCategory",
        method: "post",
        data: data
    });
}
export function getAllValidGoods(data) {
    return request({
        url: "/cms/goods/getAllValidGoods",
        method: "post",
        data: data
    });
}
export function queryCouponList(data) {
    return request({
        url: "/cms/coupon/queryCouponList",
        method: "post",
        data: data
    });
}
export function fakeDeleteCupons(data) {
    return request({
        url: "/cms/coupon/fakeDeleteCupons",
        method: "post",
        data: data
    });
}

export function coupondetail(data) {
    return request({
        url: "/cms/coupon/detail",
        method: "post",
        data: data
    });
}
export function couponupdate(data) {
    return request({
        url: "/cms/coupon/update",
        method: "post",
        data: data
    });
}
export function couponsGoodsList(data) {
    return request({
        url: "/cms/coupon/couponsGoodsList",
        method: "post",
        data: data
    });
}
export function updateCouponsStatus(data) {
    return request({
        url: "/cms/coupon/updateCouponsStatus",
        method: "post",
        data: data
    });
}
export function exportCouponsList(data) {
    return request({
        url: "/cms/coupon/exportCouponsList",
        method: "post",
        responseType: 'blob',
        data: data
    });
}

export function getcouponsUserList(data) {
    return request({
        url: "/cms/coupon/couponsUserList",
        method: "post",
        data: data
    });
}