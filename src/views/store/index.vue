<template>
  <div class="shopSettings">
    <div class="containers">
      <el-form :model="form" :rules="rules" ref="form" :size="size" label-width="200px" class="demo-form">
        <el-form-item label="经营类目" prop="categoryName">
          <p style="font-size: 12px;color:#333;">{{categoryName}}</p>
        </el-form-item>
        <el-form-item label="店铺名称" prop="shopMerchantsName">
          <el-input v-model="form.shopMerchantsName"
                    show-word-limit
                    maxlength="30"
                    @keyup.native="btKeyUp"></el-input>
          <div style="font-size: 12px;color:#999;">详细阅读 <a style="color:#3976e6" href="https://hs.star.cms.xingfaner.cn/xieyi/mingmingguizhe.html">《店铺名称命名规范》</a>，如需申请“旗舰店”、“专营店”、“专卖店”，请进入<span style="color:#3976e6">《店铺名称认证》</span></div>
        </el-form-item>
        <el-form-item label="店铺标志" prop="thumbImg">
          <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :http-request="uploadHttp"
                  accept=".jpg, .png, .gif,.jpeg"
                  :data="{
                    data:'thumbImg'
                   }">
            <img v-if="form.thumbImg" :src="form.thumbImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div style="font-size:12px;color: #999;">文件格式GIF、JPEG、PNG文件大小100k以内，建议尺寸80PX*80PX</div>
        </el-form-item>
        <el-form-item label="店铺介绍" prop="shopMerchantsIntroduction">
          <el-input v-model="form.shopMerchantsIntroduction"
                    placeholder="请输入店铺的经营范围、经营品牌、售后承诺等相关的文字(入驻申请时的简介)"
                    type="textarea"
                    show-word-limit
                    maxlength="200"
                    rows="6"
                    onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
        </el-form-item>
        <div style="margin-bottom: 10px;">
          <span class="customerPhone">客服电话</span>
          <el-input class="inputStyle1" :size="size" :class="{stylePhone:isShowPhone}" v-model="areaCode" placeholder="区号"></el-input>
          <el-input class="inputStyle2" :size="size" :class="{stylePhone:isShowPhone}" v-model="phone" placeholder="如果输入手机号不填区号"></el-input>
          <p v-show="isShowPhone" style="font-size:12px;color: #F56C6C;">请填写手机号</p>
        </div>
        <div style="margin-bottom: 10px;">
          <span class="customerPhone">经营地址</span>
          <cascader :size="size" :class="{styleAddress:isShowAddress}" v-model="cityvalue"/>
          <p v-show="isShowAddress" style="font-size:12px;color: #F56C6C;">请选择地址</p>
        </div>
        <el-form-item label="" prop="addressDetail">
        <el-input v-model="form.addressDetail"
                  placeholder="填写详细地址"
                  type="textarea"
                  show-word-limit
                  maxlength="100"
                  rows="4"></el-input>
        </el-form-item>
        <el-form-item label="店招图片" prop="shopPicturesImg">
          <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  accept=".jpg, .png, .gif,.jpeg"
                  :http-request="uploadHttp"
                  :data="{
                    data:'shopPicturesImg'
                   }">
            <img v-if="form.shopPicturesImg" :src="form.shopPicturesImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div style="font-size:12px;color: #999;">文件格式GIF、JPEG、PNG文件大小500k以内，建议尺寸750*280</div>
        </el-form-item>
        <p class="articleBox">
          <el-checkbox v-model="checked"></el-checkbox><span class="article">我声明，此页面所填内容均真实有效，特别是经营地址为店铺最新可联系到的地址。
        同时可以作为行政机关和司法机关送达法律文件的地址。如果上述地址有误，愿意承担由此带来的平台处罚（和商有品处罚细则）行政监管和司法诉讼风险。</span>
        </p>
        <el-form-item>
          <el-button type="danger" :disabled="!checked" @click="submitForm('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import cascader from '@/components/city/cascader'
  import { SSupload } from "@/utils/upload";
  import { shopSettings,editShopSettings } from "@/api/store/index";

export default {
  data(){
    return {
      size: 'mini',
      checked: false,
      cityvalue: [],
      isShowAddress: false,
      isShowPhone: false,
      categoryName: '',
      areaCode: '',
      phone: '',
      random: '',
      form: {
        shopMerchantsName: '',
        addressDetail: '',
        provinceCode: '',
        cityCode: '',
        countyCode: '',
        shopMerchantsIntroduction: '',
        customerMobile: '',
        thumbImg: [],
        shopPicturesImg: []
      },
      rules: {
        shopMerchantsName: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' }
        ],
        thumbImg: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        shopMerchantsIntroduction: [
          { required: true, message: '请输入店铺介绍', trigger: 'blur' }
        ],
        customerMobile1: [
          { required: true, message: '请输入客服电话', trigger: 'blur' }
        ],
        addressDetail: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    cascader,
  },
  watch: {
    cityvalue (newvalue) {
      console.log(newvalue, 'cityvalue')
      this.form.provinceCode = newvalue[0];
      this.form.cityCode = newvalue[1];
      this.form.countyCode = newvalue[2];
    }
  },
  created(){
    this.getInfo();
  },
  methods: {
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,"");
    },
    randomNum(min, max){
      return Math.floor(Math.random() * (max - min) + min)
    },
    async getInfo(){
      let { code,body:{
        provinceCode,
        cityCode,
        countyCode,
        categoryName,
        shopMerchantsName,
        thumbImg,
        shopMerchantsIntroduction,
        customerMobile,
        shopPicturesImg,
        addressDetail
      } } = await shopSettings();
      if(code=="000000"){
        let cityvalue = [];
        cityvalue[0] = provinceCode;
        cityvalue[1] = cityCode;
        cityvalue[2] = countyCode;
        this.cityvalue = cityvalue;
        this.categoryName = categoryName.split(",").join("/");//经营类目
        this.form.shopMerchantsName = shopMerchantsName;
        this.form.thumbImg = thumbImg;
        this.form.shopPicturesImg = shopPicturesImg;
        this.form.addressDetail = addressDetail;
        this.form.shopMerchantsIntroduction = shopMerchantsIntroduction;
        var phone = /\d{11}/;
        if(phone.test(customerMobile)){
          this.phone = customerMobile;
        }else{
          var arr = customerMobile.split("-")
          this.areaCode = arr[0];
          this.phone = arr[1]
        }
      }
    },
    //城市选择
    changecity(data) {
      console.log(data);
      this.form.provinceCode = data[0];
      this.form.cityCode = data[1];
      this.form.countyCode = data[2];
    },
    //保存
     submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if(this.areaCode == ''){
            this.form.customerMobile = this.phone;
          }else {
            this.form.customerMobile = this.areaCode + '-' + this.phone
          }
          if(this.cityvalue == ""){
            this.isShowAddress = true;
            return
          }else{
            this.isShowAddress = false;
          }
          if(this.phone == ""){
            this.isShowPhone = true;
            return
          }else{
            this.isShowPhone = false;
          }
          let {code} = await editShopSettings(this.form);
          if(code == '000000'){
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.getInfo();
          }
          if(code=="300010"){
            alert(111)
          }

        } else {
          console.log('错误提交');
          return false;
        }
      });
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
              if(data.data == 'thumbImg'){
                if(file.size > 1024 * 100){
                  this.$message({
                    message: "上传图片过大",
                    type: "warning"
                  });
                  return false;
                }
                that.form.thumbImg = url;
              }
              if(data.data == 'shopPicturesImg'){
                if(file.size > 1024 * 500){
                  this.$message({
                    message: "上传图片过大",
                    type: "warning"
                  });
                  return false;
                }
                this.form.shopPicturesImg = url
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

<style lang="scss">
  a {
    text-decoration:none;
  }
  .customerPhone {
    margin-left: 120px;
    margin-right: 15px;
    font-size: 14px;
    color: #606266;
  }
  .customerPhone:before {
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
  }
  .el-textarea .el-textarea__inner {
    resize: none;
  }
  .articleBox {
    display: flex;
    flex-direction: row;
    margin: 0 0 30px 175px;
  }
  .article {
    font-size: 12px;
    color:#333;
    margin-left: 10px;
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
  .inputStyle1 {
    width: 200px;
    margin-right: 15px;
  }
  .inputStyle2 {
    width: 52%;
  }
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

  .div-img {
    border: 1px solid red;
    position: relative;
    width: 150px;
    height: 150px;
    margin-right: 10px;
    border: solid 1px #f0f0f0;
    margin-bottom: 10px;
  }
  .div-img:hover {
    cursor: pointer;
    .bg-marsk {
      display: block;
    }
    .el-icon-de {
      display: block;
      color: #f9f9f9;
      z-index: 10;
    }
    .el-icon-de1 {
      display: block;
      color: #f9f9f9;
      z-index: 10;
    }
    .el-icon-de2 {
      display: block;
      color: #f9f9f9;
      z-index: 10;
    }
    .el-icon-de3 {
      display: block;
      color: #f9f9f9;
      z-index: 10;
    }
  }

  .styleAddress .el-input__inner {
   border: 1px solid red;
  }
  .stylePhone .el-input__inner {
    border: 1px solid red;
  }
</style>