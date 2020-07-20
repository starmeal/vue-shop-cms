import { getOssToken } from '@/api/upload'
import Cookies from 'js-cookie'
import OSS from "ali-oss";
//  上传图片token
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
async function multipartUpload(ossConfig, consat, file) {
  try {
    let client = new OSS(ossConfig)
    let result = await client.multipartUpload(consat, file, {
      progress: function (p, checkpoint) {
        console.log(p, checkpoint)
      },
    })
    return Promise.resolve(result)
  } catch (e) {
    console.log(e);
    return Promise.reject(e)
  }
}
export function asyncUpload(consat, file) {
  return ossUpload().then(res => {
    return multipartUpload(res, consat, file)
  })
}
// 普通上传方法
export function SSupload(consat, file) {
  return new Promise((resolve, reject) => {
    ossUpload().then(conf => {
      resolve(new OSS(conf).put(consat, file))
    }).catch(() => {
      console.log(reject)
    })
  })
}
