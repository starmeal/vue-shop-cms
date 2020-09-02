import request from "@/utils/request";

export function saveBankCard(data) {
  return request({
    url: "/sendWithdrawal/saveBankCard",
    method: "post",
    data: data
  });
}
export function allBalances(data) {
  return request({
    url: "/sendWithdrawal/allBalances",
    method: "post",
    data: data
  });
}
export function bankCardList(data) {
  return request({
    url: "/sendWithdrawal/bankCardList",
    method: "post",
    data: data
  });
}
export function bankCardInformation(data) {
  return request({
    url: "/sendWithdrawal/bankCardInformation",
    method: "post",
    data: data
  });
}
export function mybankCardList(data) {
  return request({
    url: "/sendWithdrawal/bankCardList",
    method: "post",
    data: data
  });
}
export function submitWithdrawal(data) {
  return request({
    url: "/sendWithdrawal/submitWithdrawal",
    method: "post",
    data: data
  });
}
export function deleteBankCard(data) {
  return request({
    url: "/sendWithdrawal/deleteBankCard",
    method: "post",
    data: data
  });
}
export function updateBankCard(data) {
  return request({
    url: "/sendWithdrawal/updateBankCard",
    method: "post",
    data: data
  });
}
