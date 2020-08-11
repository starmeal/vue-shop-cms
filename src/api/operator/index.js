import request from "@/utils/request";

export function permissionuser(data) {
  return request({
    url: "/cms/permission/user/list",
    method: "post",
    data: data
  });
}