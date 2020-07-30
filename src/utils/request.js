import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
let url = "";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 8000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["shop-cms-token"] = store.getters.token;
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    if (!res.code) {
      let fileName = decodeURI(
        response.headers["content-disposition"].split("=")[1],
        "UTF-8"
      );
      // console.log(fileName, "fileNamefileNamefileNamefileName");
      let blob = new Blob([response.data], { type: "application/x-xls" });
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName);
      } else {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(link.href);
      }
    } else {
      if (res.code !== "000000") {
        if(res.code == '300010'){
          return Promise.reject(res)
        }
        Message({
          message: res.msg || "Error",
          type: "error",
          center:true,
          duration: 2 * 1000
        });
        if (res.code == "400000") {
          store.dispatch("user/resetToken").then(() => {
            window.location.hash = "/login";
          });
        }
        if (res.code == "-999999") {
          store.dispatch("user/resetToken").then(() => {
            window.location.hash = "/login";
          });
        }
        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
          // to re-login
          MessageBox.confirm(
            "You have been logged out, you can cancel to stay on this page, or log in again",
            "Confirm logout",
            {
              confirmButtonText: "Re-Login",
              cancelButtonText: "Cancel",
              type: "warning"
            }
          ).then(() => {
            store.dispatch("user/resetToken").then(() => {
              location.reload();
            });
          });
        }
        return Promise.reject(new Error(res.message || "Error"));
      } else {
        return res;
      }
    }
    // console.log(resres, 'resresres')
    // if the custom code is not 20000, it is judged as an error.
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      center:true,
      message: error.msg,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
