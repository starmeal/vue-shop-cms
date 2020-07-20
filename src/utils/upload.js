import { getOssToken } from '@/api/upload'
import Cookies from 'js-cookie'
import OSS from "ali-oss";
function ossClient(conf) {
  return new OSS(conf);
}
//  上传图片
export function ossUpload() {
  let obj = {
    roleSessionName: 'hs-star-test'
  }
  if (Cookies.get('imgdata')) {
    return new Promise((resolve) => {
      resolve(JSON.parse(Cookies.get('imgdata')))
    })
  } else {
    return getOssToken(obj).then(res => {
      let { code, body } = res
      const basestart = process.env.VUE_APP_ENV === 'production' ? 'hs-star-bucket-prod' : 'hs-star-bucket-test'
      return new Promise((resolve, reject) => {
        if (code === '000000') {
          let imgdata = {
            accessKeyId: body.AccessKeyId,
            accessKeySecret: body.AccessKeySecret,
            bucket: basestart,
            stsToken: body.SecurityToken,
            region: 'http://oss-cn-zhangjiakou.aliyuncs.com',
            endpoint: 'https://oss-cn-zhangjiakou.aliyuncs.com'
          }
          let seconds = 60 * 20;
          let expires = new Date(new Date() * 1 + seconds * 1000);
          Cookies.set('imgdata', imgdata, { expires: expires })
          resolve(imgdata);
        } else {
          reject("erro")
        }
      })
    })
  }
}
export function SSupload(consat,file) {
  return new Promise((resolve, reject) => {
    ossUpload().then(res => {
      resolve(ossClient(res).put(consat, file))
    }).catch(()=>{
      reject("erro")
    })
  })
}
