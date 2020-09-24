<template>
  <div class="shopSettings">
    <div class="containers">
      <el-form :model="form" :rules="rules" ref="form" :size="size" label-width="200px" class="demo-form">
        <div class="innerContainer">
          <div style="width: 85%;">
            <div class="examine" v-if="status == 1">店铺名称正在审核中...</div>
            <div class="failed" v-if="status == 2">
              <p>店铺名称审核未通过</p>
              <p style="font-size: 14px;margin-top: 20px;">原因：{{this.opinion}}</p>
            </div>
            <div class="success" v-if="status == 3">
              <p>店铺名称审核通过！</p>
            </div>
            <el-form-item v-if="status==null || status == 2" label="店铺类型" prop="storeTypeId">
              
              <el-radio-group v-model="form.storeTypeId">
                <el-radio :label="item.id" :key="item.id" :value="item.value" @change="radioChange" v-for="item in radioArr">{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="status==1 || status == 3" label="店铺类型" >
              {{form.storeTypeName}}
            </el-form-item>
            <el-form-item v-if="status==null || status == 2" label="店铺名称" prop="shopMerchantsName">
              <el-input v-model="form.shopMerchantsName" show-word-limit maxlength="30" @change="shopNameChange" :class="{styleShop: isShowShop}"></el-input>
              <div style="font-size: 12px;color:#999;">请详细阅读 <a style="color:#3976e6"  href="https://hs.star.cms.xingfaner.cn/xieyi/mingmingguizhe.html" target="_blank">《店铺名称命名规范》</a></div>
              <div v-show="isShowShop" style="font-size:12px;color: #F56C6C;">店铺名称中含有违禁词：{{hotCard}}</div>
            </el-form-item>
            <el-form-item v-if="status == 1 || status == 3" label="店铺名称" prop="shopMerchantsName">
              <el-input v-model="form.shopMerchantsName" show-word-limit maxlength="30" @change="shopNameChange" readonly="readonly" :class="{styleShop: isShowShop}"></el-input>
              <div style="font-size: 12px;color:#999;">请详细阅读 <a style="color:#3976e6" href="https://hs.star.cms.xingfaner.cn/xieyi/mingmingguizhe.html" target="_blank">《店铺名称命名规范》</a></div>
            </el-form-item>
            <el-form-item v-if="status==null || status == 2" label="商标证书" prop="trademarkCertificateImg">
              <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" accept=".jpg, .png, .jpeg, .gif" :show-file-list="false" :http-request="uploadHttp" :data="{
                data:'trademarkCertificateImg'
              }">
                <img v-if="form.trademarkCertificateImg" :src="form.trademarkCertificateImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div style="font-size:12px;color: #999;">文件格式GIF、JPEG、PNG文件大小2M以内</div>
            </el-form-item>
            <el-form-item v-if="status==1 || status == 3" label="商标证书" prop="trademarkCertificateImg">
              <img v-if="form.trademarkCertificateImg" :src="form.trademarkCertificateImg" class="avatar" />
              <div style="font-size:12px;color: #999;">文件格式GIF、JPEG、PNG文件大小2M以内</div>
            </el-form-item>
            <el-form-item v-if="status==null || status == 2" label="品牌logo" prop="brandLogoImg">
              <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" accept=".jpg, .png, .jpeg, .gif" :show-file-list="false" :http-request="uploadHttp" :data="{
                data:'brandLogoImg'
              }">
                <img v-if="form.brandLogoImg" :src="form.brandLogoImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div style="font-size:12px;color: #999;">文件格式GIF、JPEG、PNG文件大小2M以内</div>
            </el-form-item>
            <el-form-item v-if="status==1 || status == 3" label="品牌logo" prop="brandLogoImg">
              <img v-if="form.brandLogoImg" :src="form.brandLogoImg" class="avatar" />
              <div style="font-size:12px;color: #999;">文件格式GIF、JPEG、PNG文件大小2M以内</div>
            </el-form-item>
            <el-form-item v-if="status == null || status == 2" label="授权书等其他材料" prop="powerOfAttorneyImg">
              <div class="flex">
                <div class="kuake">
                  <div class="div-img" v-for="(item,index) in form.powerOfAttorneyImg" :key="index">
                    <div class="bg-marsk">
                      <i class="el-icon-delete el-icon-de" @click.stop="delimg(index)"></i>
                    </div>
                    <img :src="item" class="img-licenseImgUrl" />
                  </div>
                  <el-upload v-if="form.powerOfAttorneyImg.length<5" style="margin-right:10px" class="shousb" accept=".jpg, .png, .gif" action :data="{
                        data:'powerOfAttorneyImg',
                        idx:'other'
                      }" :http-request="uploadHttp" list-type="picture-card" :show-file-list="false" :multiple="true">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </div>
              <div style="font-size:12px;color: #999;">文件格式GIF、JPEG、PNG文件大小2M以内</div>
            </el-form-item>
            <el-form-item v-if="status == 1 || status == 3" label="授权书等其他材料" prop="powerOfAttorneyImg">
              <div class="flex">
                <div class="kuake">
                  <div class="div-img" v-for="(item,index) in form.powerOfAttorneyImg" :key="index">
                    <img :src="item" class="img-licenseImgUrl" />
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>
        </div>
        <el-form-item>
          <el-button class="submitStyle" v-if="status == null" type="primary" @click="submitForm('form')">提交审核</el-button>
          <el-button class="submitStyle" v-if="status == 2" type="primary" @click="submitForm('form')">提交审核</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
function filterInput(val) {
  return val.replace(/[^\w\u4e00-\u9fa5]/, '');
}
import { SSupload } from '@/utils/upload';
import {
  getRodio,
  shopNominateInfo,
  shopNominateSubmit,
} from '@/api/shopNominate/index';
export default {
  name: 'index',
  data() {
    return {
      size: 'mini',
      radioArr: [],
      status: null,
      opinion: '',
      hotCard: '',
      storeTypeName: '',
      isShowShop: false,
      form: {
        id: '',
        storeTypeId: '',
        storeTypeName: '',
        shopMerchantsName: '',
        trademarkCertificateImg: '',
        brandLogoImg: '',
        powerOfAttorneyImg: [],
      },
      rules: {
        storeTypeId: [
          { required: true, message: '请选择店铺类型', trigger: 'blur' },
        ],
        shopMerchantsName: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' },
        ],
        trademarkCertificateImg: [
          { required: true, message: '请上传商标证书', trigger: 'change' },
        ],
        brandLogoImg: [
          { required: true, message: '请上传品牌logo', trigger: 'change' },
        ],
        powerOfAttorneyImg: [
          {
            required: true,
            message: '请上传授权书等其他材料',
            trigger: 'change',
          },
        ],
      },
    };
  },
  watch: {
    'form.shopMerchantsName': {
      handler: function (val) {
        this.$nextTick(() => {
          this.form.shopMerchantsName = filterInput(val);
        });
      },
    },
  },
  created() {
    this.getRadio();
    this.getInfo();
  },
  methods: {
    radioChange(val) {
      this.radioArr.forEach((item, index) => {
        if (val == item.id) {
          this.form.storeTypeName = item.value;
        }
      });
    },
    shopNameChange() {
      this.isShowShop = false;
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    async getRadio() {
      let {
        body: { list0 },
      } = await getRodio({ type: 'store_type' });
      this.radioArr = list0;
    },
    async getInfo() {
      let { code, body } = await shopNominateInfo();
      if (code == '000000') {
        this.form.storeTypeId = Number(body.storeTypeId) || '';
        this.form.storeTypeName = body.storeTypeName;
        this.form.shopMerchantsName = body.shopMerchantsName;
        this.form.trademarkCertificateImg = body.trademarkCertificateImg;
        this.form.brandLogoImg = body.brandLogoImg;
        this.form.id = body.id;
        this.opinion = body.opinion;
        this.status = body.checkStatus;
        //this.status = null;
        if (body.powerOfAttorneyImg == null) {
          this.form.powerOfAttorneyImg = [];
        } else {
          this.form.powerOfAttorneyImg = body.powerOfAttorneyImg;
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid, 'valid');
        if (valid) {
          this.$alert(
            '您的资料已经提交审核，平台审核将在1-3个工作日内完成，请您耐心等待',
            '提示',
            {
              confirmButtonText: '确定',
              callback: (action) => {
                shopNominateSubmit(this.form)
                  .then((res) => {
                    this.getInfo();
                  })
                  .catch(({ code, body }) => {
                    if (code == '300010') {
                      console.log(body);
                      this.isShowShop = true;
                      this.hotCard = body.join(',');
                      this.$nextTick(() => {
                        let obj = {
                          alignToTop: false,
                          block: 'center',
                          behavior: 'smooth',
                        };
                        document
                          .querySelectorAll('.styleShop')[0]
                          .scrollIntoView(obj);
                      });
                    }
                  });
              },
            }
          );
        } else {
          this.$nextTick(() => {
            let obj = {
              alignToTop: false,
              block: 'center',
              behavior: 'smooth',
            };
            document
              .querySelectorAll('.el-form-item__error')[0]
              .scrollIntoView(obj);
          });
          console.log('错误提交');
          return false;
        }
      });
    },
    uploadHttp({ file, data }) {
      if (file.type.split('/')[0] !== 'image') {
        this.$message({
          message: '请上传图片',
          type: 'warning',
        });
        return false;
      }
      if (file.size > 1024 * 1024 * 2) {
        this.$message({
          message: '上传图片过大',
          type: 'warning',
        });
        return false;
      }
      let houzhui = "";
      houzhui = file.name.split(".");
      let fileName = "";
      var timestamp = Date.parse(new Date());
      month = month + 1;
      fileName = `${parseInt(
        (Math.random() + 1) * Math.pow(10, 18 - 1)
      )}${timestamp}.${houzhui[houzhui.length - 1]}`;
      let now = new Date();
      let year = now.getFullYear(); // 得到年份
      let month = now.getMonth(); // 得到月份
      let date = now.getDate(); // 得到日期
      let consat = `hs_star/app_shop/authentication/${year}${month}${date}/${
        fileName || timestamp
      }`;
      let that = this;
      SSupload(consat, file)
        .then(({ res, url, name }) => {
          if (res && res.status == 200) {
            if (url) {
              // 替换文件
              // https://hs-star-bucket-prod.oss-cn-zhangjiakou.aliyuncs.com
              url = url.replace(
                'https://hs-star-bucket-prod.oss-cn-zhangjiakou.aliyuncs.com',
                'https://hs.star.oss.xingfaner.cn'
              );
              if (data.data == 'trademarkCertificateImg') {
                that.form.trademarkCertificateImg = url;
              }
              if (data.data == 'brandLogoImg') {
                that.form.brandLogoImg = url;
              }
              if (data.data == 'powerOfAttorneyImg') {
                that.form.powerOfAttorneyImg.push(url);
              }
            }
          }
        })
        .catch((err) => {
          // loading.close();
          this.$message('图片上传失败');
          console.log(`阿里云OSS上传图片失败回调`, err);
        });
    },
    delimg(index) {
      this.form.powerOfAttorneyImg.splice(index, 1);
      this.$message({
        message: '删除成功',
        type: 'success',
      });
    },
  },
};
</script>
<style>
.demo-form .el-form-item__label {
  font-size: 12px !important;
}
.el-radio__label {
  font-size: 12px !important;
}
</style>
<style scoped lang="scss">
.submitStyle {
  margin-top: 20px;
}
a {
  text-decoration: none;
}
.examine {
  margin-left: 130px;
  margin-bottom: 30px;
  color: #ff7e00;
  font-size: 18px;
}
.failed {
  margin-left: 130px;
  margin-bottom: 30px;
  color: #ff1800;
  font-size: 18px;
}
.success {
  margin-left: 130px;
  margin-bottom: 30px;
  color: #00aeff;
  font-size: 18px;
}
.containers {
  padding: 10px 0px;
  background: #fff;
  border-radius: 4px;
}
.innerContainer {
  width: 98%;
  margin: 0 auto;
  padding: 20px 0px;
  background: #f5f7f9;
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
.avatar-uploader .el-upload--text {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}
/*上传图片*/
/*多张图片上传*/
.flex {
  display: flex;
}
.kuake {
  display: flex;
  flex-wrap: wrap;
}
.shousb {
  position: relative;
}
.div-img {
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
}
.bg-marsk {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.3);
}
.img-licenseImgUrl {
  width: 100%;
  height: 100%;
}
.el-icon-de {
  z-index: 10;
  font-size: 30px;
  position: absolute;
  display: none;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #f9f9f9;
}
</style>