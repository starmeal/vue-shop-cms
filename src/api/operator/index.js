import request from "@/utils/request";

export function permissionuser(data) {
  return request({
    url: "/cms/permission/user/list",
    method: "post",
    data: data
  });
}
export function deleteUser(data) {
  return request({
    url: "/cms/permission/user/deleteUser",
    method: "post",
    data: data
  });
}
export function saveOrUpdateUser(data) {
  return request({
    url: "/cms/permission/user/saveOrUpdateUser",
    method: "post",
    data: data
  });
}
export function getRoleListCommon(data) {
  return request({
    url: "/cms/permission/role/getRoleListCommon",
    method: "post",
    data: data
  });
}
export function getUserInfo(data) {
  return request({
    url: "/cms/permission/user/getUserInfo",
    method: "post",
    data: data
  });
}
export function rolelist(data) {
  return request({
    url: "/cms/permission/role/list",
    method: "post",
    data: data
  });
}
export function deleteRole(data) {
  return request({
    url: "/cms/permission/role/deleteRole",
    method: "post",
    data: data
  });
}
export function getRoleAndPermissions(data) {
  return request({
    url: "/cms/permission/role/getRoleAndPermissions",
    method: "post",
    data: data
  });
}
export function saveOrUpdateRole(data) {
  return request({
    url: "/cms/permission/role/saveOrUpdateRole",
    method: "post",
    data: data
  });
}
