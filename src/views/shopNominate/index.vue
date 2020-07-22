<template>
  <div class="shopSettings">
    <div class="containers">
      <el-form :model="form" :rules="rules" ref="form" :size="size" label-width="200px" class="demo-form">
        <el-form-item label="店铺类型" prop="categoryName">
          <el-radio-group v-model="radio">
            <el-radio :label="1">旗舰店</el-radio>
            <el-radio :label="2">专卖店</el-radio>
            <el-radio :label="3">专营店</el-radio>
            <el-radio :label="4">卖场</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="店铺名称" prop="shopMerchantsName">
          <el-input v-model="form.shopMerchantsName"
                    show-word-limit
                    maxlength="30"
                    @keyup.native="btKeyUp"></el-input>
          <div style="font-size: 12px;color:#999;">请详细阅读 <a style="color:#3976e6" href="https://hs.star.cms.xingfaner.cn/xieyi/mingmingguizhe.html">《店铺名称命名规范》</a></div>
        </el-form-item>
        <el-form-item label="商标证书" prop="thumbImg">
          <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :http-request="uploadHttp"
                  :data="{
              data:'handheldIdCardImg'
            }"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div style="font-size:12px;color: #999;">文件格式GIF、JPEG、PNG文件大小100k以内，建议尺寸80PX*80PX</div>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        size: 'mini',
        radio: 3,
        imageUrl: '',
        form: {
          shopMerchantsName: ''
        },
        rules: {
          shopMerchantsName: [
            {required: true, message: '请输入店铺名称', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      btKeyUp(e) {
        e.target.value = e.target.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,"");
      },
      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {

          }else {
            console.log('错误提交');
            return false;
          }
        })
      },
      uploadHttp({ file, data }) {
        if (file.type.split("/")[0] !== "image") {
          this.$message({
            message: "请上传图片",
            type: "warning"
          });
          return false;
        }
        let consat = `hs_star/app_shop/goods/${this.randomNum(1,100)}`;
        let that = this;
        SSupload(consat, file)
          .then(({ res, url, name }) => {
            if (res && res.status == 200) {
              if (url) {
                // 替换文件
                // https://hs-star-bucket-prod.oss-cn-zhangjiakou.aliyuncs.com
                url = url.replace(
                  "https://hs-star-bucket-prod.oss-cn-zhangjiakou.aliyuncs.com",
                  "https://hs.star.oss.xingfaner.cn"
                );
                if(data.data == ''){

                }
                if(data.data == ''){

                }
              }
            }
          })
          .catch(err => {
            // loading.close();
            this.$message("图片上传失败");
            console.log(`阿里云OSS上传图片失败回调`, err);
          });
      },
    }
  }
</script>

<style scoped>
  a {
    text-decoration:none;
  }
.containers {
    width: 98%;
    margin: 0 auto;
    padding: 20px 0px;
    background: #fff;
    border-radius: 4px;
}
.demo-form {
  width: 85%;
}
/*上传图片*/

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 10px;
  }
  /*上传图片*/
</style>