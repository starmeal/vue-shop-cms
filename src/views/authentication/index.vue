<template>
  <div>
    <div class="form-content">
      <el-form ref="form" :model="form" label-width="150px">
        <div class="title">选择类目</div>
        <el-form-item label="经验类目：">
          <span
            v-for="(item,index) in form.categoryName"
            :key="index"
            style="margin-right:20px"
          >{{item}}</span>
        </el-form-item>
        <el-form-item label="增加类目：">
          <el-select
            v-model="form.category"
            multiple
            placeholder="请选择"
            size="mini"
            @change="categoryChange"
          >
            <el-option
              v-for="item in selectArr"
              :key="item.value"
              :label="item.categoryName"
              :value="item.id"
            ></el-option>
          </el-select>
          <!-- <el-cascader v-model="value" :options="options" size="mini"></el-cascader> -->
        </el-form-item>
        <el-form-item label="需要材料：">
          <div>1:证明合法经营的材料：三证/五证合一营业执照；</div>
          <div style="color:#3976e6" v-if="textArr.length">
            请提供
            <span v-for="(item,index) in textArr" :key="index">
              {{item.qualificationDescription}}
              <span v-if="index !== textArr.length - 1">或</span>
            </span>
          </div>
          <div>2:证明真实经营的材料：店铺门头、店铺内景、收银台照片，无实体门店的线上商家可提供线上店铺首页、管理后台、商品照片；</div>
          <div>3:证明实际经营人材料：法人手持证件照，法人身份证正反面照片；</div>
          <div>4:照片规则：照片需要四角完整，清晰可辨，若加水印需保证照片重要信息清晰可辨；可提交复印件，每张复印件均需加盖完整红色公章；</div>
          <div>5:提现、发票的主体需要与认证主题一致，请如实填写主题认证信息；</div>
          <div>6:详细资质要求可参考《认证资质要求》。</div>
        </el-form-item>
        <div class="title">营业执照信息</div>
        <el-form-item>
          <div>输入你的企业名称或统一社会信用代码:</div>
          <el-input v-model="keyWord" placeholder="请输入内容" style="width:400px" size="mini"></el-input>
          <el-button type="primary" size="mini" style="margin-left:20px" @click="serachcomp">搜索</el-button>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input
            placeholder="请输入企业名称"
            clearable
            style="width:400px"
            size="mini"
            v-model="form.companyName"
          ></el-input>
          <div>该名称需要与提现银行卡所对应的对公账户名称一致</div>
        </el-form-item>
        <el-form-item label="注册地址：">
          <el-cascader :options="districts" size="mini" :props="cityProps"></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.addressDetail"
            type="textarea"
            style="width:450px:"
            placeholder="请输入内容"
            rows="5"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="经营范围：">
          <el-input
            type="textarea"
            style="width:450px"
            placeholder="请输入内容"
            v-model="form.businessScope"
            rows="3"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码：">
          <el-input
            size="mini"
            style="width:400px"
            v-model="form.socialCreditCode"
            placeholder="请输入内容"
          ></el-input>
          <div>请输入营业执照18位统一社会信用代码</div>
        </el-form-item>
        <el-form-item label="营业期限：">
          <div>
            <el-radio v-model="form.operatingPeriodType" label="0">区间有效</el-radio>
            <el-date-picker
              :disabled="form.operatingPeriodType != 0"
              v-model="timevalue"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="mini"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div>
            <el-radio v-model="form.operatingPeriodType" label="1">长期有效</el-radio>
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              :disabled="form.operatingPeriodType != 1"
              v-model="timevalueOne"
              type="date"
              placeholder="选择日期"
              size="mini"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="营业执照照片：">
          <img v-if="form.licenseImgUrl" :src="form.licenseImgUrl" class="avatar" />
        </el-form-item>
        <div class="title">法人信息</div>
        <div style="margin-left: 52px; padding: 20px 0px;font-size:12px">法人代表人证件照（身份证）</div>
        <el-form-item label="手持身份证：">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            accept=".bmp, .png, .jpeg, .gif"
            :show-file-list="false"
            :http-request="uploadHttp"
            :data="{
              data:'handheldIdCardImg'
            }"
          >
            <img v-if="form.handheldIdCardImg" :src="form.handheldIdCardImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div>
            必须为彩色图片且小于4M，文件格式为bmp，png，jpeg，或gif。
            <span style="color:#3976e6">查看示例</span>
          </div>
        </el-form-item>
        <el-form-item label="身份证正面：">
          <img v-if="form.legalIdCardUp" :src="form.legalIdCardUp" class="avatar" />
        </el-form-item>
        <el-form-item label="身份证反面：">
          <img v-if="form.legalIdCardUp" :src="form.legalIdCardDown" class="avatar" />
        </el-form-item>
        <div style="margin-left: 52px; padding: 20px 0px; font-size:12px">法人代表信息</div>
        <el-form-item label="法人代表姓名：">
          <el-input
            v-model="form.legalPersonName"
            placeholder="请输入内容"
            style="width:400px"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件号码：">
          <el-input
            v-model="form.legalPersonIdCard"
            placeholder="请输入内容"
            style="width:400px"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="法人手机：">
          <el-input
            v-model="form.legalPersonMobile"
            placeholder="请输入内容"
            style="width:400px"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件有效期：">
          <div>
            <el-radio v-model="form.idCardValidityType" label="0">区间有效</el-radio>
            <el-date-picker
              v-model="idCardvalue"
              size="mini"
              type="daterange"
              :disabled="form.idCardValidityType != 0"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div>
            <el-radio v-model="form.idCardValidityType" label="1">长期有效</el-radio>
            <el-date-picker
              v-model="idCardvalueOne"
              type="date"
              placeholder="选择日期"
              size="mini"
              :disabled="form.idCardValidityType != 1"
            ></el-date-picker>
            <span style="margin-left:10px">身份证开始日期</span>
          </div>
        </el-form-item>
        <div class="title" style="margin-bottom:20px">其他资质</div>
        <el-form-item v-for="(item,index) in form.qualificationList" :key="index">
          <!-- <img src=""> -->
          <div class="flex-box">
            <div class="png-s" v-for="(item,idx) in item.qualificationImg" :key="idx">
              <img :src="item" style="width:100%;height:100%" />
              <div class="caozuo-box">
                <i
                  class="el-icon-delete icon-d"
                  style="color:#fff;font-size:30px"
                  @click="delImg(index,idx)"
                ></i>
              </div>
            </div>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :show-file-list="false"
              :http-request="uploadHttp"
              accept=".bmp, .png, .jpeg, .gif"
              :data="{
               data:index
            }"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
          <div
            v-if="textArr[index]"
            style="width:80%"
          >{{textArr[index].qualificationDescription ? textArr[index].qualificationDescription : ''}}；必须为彩色图片且小于6M，文件格式为bmp、png、jpeg、或gif</div>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="mini" @click="submit">提交审核</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { asyncUpload, SSupload } from "@/utils/upload";
import {
  qualification,
  categoryInformationList,
  GetBasicDetailsByName
} from "@/api/authentication";
export default {
  data() {
    return {
      cityProps:{
        value:'adcode',
        label:'name',
        children:'districts',
      },
      districts:[],
      keyWord: "",
      imageUrl: "",
      textarea: "",
      radio: 1,
      selectArr: [],
      value: "",
      timevalue: [],
      timevalueOne: "",
      idCardvalue: [],
      idCardvalueOne: "",
      form: {
        category: "",
        categoryName: "",
        companyName: "",
        addressDetail: "",
        provinceCode: "",
        provinceName: "",
        cityCode: "",
        cityName: "",
        countyCode: "",
        countyName: "",
        businessScope: "",
        socialCreditCode: "",
        operatingPeriodType: "0",
        periodStartDate: "",
        period_end_date: "",
        handheldIdCardImg: "",
        legalPersonName: "",
        legalPersonIdCard: "",
        legalPersonMobile: "",
        idCardValidityType: "0",
        validityStartDate: "",
        validityEndDate: "",
        qualificationList: ""
      },
      textArr: [],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  watch: {
    // "form.qualificationList": {
    //   handler(newval) {
    //     console.log(newval);
    //     this.cloneArr = JSON.parse(JSON.stringify(newval));
    //   },
    //   deep: true,
    //   immediate: true
    // },
    "form.operatingPeriodType": {
      handler(newval) {
        if (newval == 1) {
          this.timevalue = [];
        } else {
          this.idCardvalueOne = "";
        }
      },
      immediate: true
    },
    "form.idCardValidityType": {
      handler(newval) {
        if (newval == 1) {
          this.idCardvalue = [];
        } else {
          this.timevalueOne = "";
        }
      },
      immediate: true
    }
  },
  created() {
    axios
      .get(
        "https://restapi.amap.com/v3/config/district?keywords=中国&subdistrict=3&key=53db67bb6768fb1da369ea6603e05e1b"
      )
      .then(res => {
        if (res.statusText == "OK") {
          this.districts = res.data.districts[0].districts;
          console.log(this.districts);
        }
      });
    this.getSelect().then(() => {
      this.getDetail();
    });
  },
  methods: {
    delImg(index, idx) {
      this.form.qualificationList[index].qualificationImg.splice(idx, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submit() {
      console.log(this.form);
    },
    serachcomp() {
      let obj = {
        keyWord: this.keyWord
      };
      GetBasicDetailsByName(obj).then(res => {
        console.log(res);
      });
    },
    datechangeOne(val) {
      this.form.validityStartDate = val[0];
      this.form.validityEndDate = val[1];
      console.log(val);
    },
    // 分类变化
    categoryChange(val) {
      let arr = [];
      let textarr = [];
      let ret = this.form.qualificationList.filter((item, index) => {
        if (val.includes(Number(item.categoryId))) {
          return item;
        }
      });
      this.$set(this.form, "qualificationList", ret);
      val.forEach(element => {
        this.selectArr.forEach((el, idx) => {
          console.log(element == el.id);
          if (element == el.id) {
            arr.push(el.categoryName);
            let obj = {
              id: el.id,
              qualificationDescription: el.qualificationDescription
                ? el.qualificationDescription
                : ""
            };
            let item = {
              categoryId: el.id,
              qualificationImg: []
            };
            textarr.push(obj);
          }
        });
      });
      this.textArr = textarr;
      this.form.categoryName = arr;
    },
    // 获取分类
    getSelect() {
      return new Promise((resolve, reject) => {
        categoryInformationList()
          .then(res => {
            if (res.code == "000000") {
              this.selectArr = res.body;
              resolve();
            }
          })
          .catch(() => {
            reject();
          });
      });
    },
    // 详情
    getDetail() {
      qualification().then(res => {
        this.textArr = [];
        let category = res.body.category.split(",").map(el => {
          return parseInt(el);
        });
        category.forEach(element => {
          this.selectArr.forEach(el => {
            if (element == el.id) {
              let obj = {
                id: el.id,
                qualificationDescription: el.qualificationDescription
              };
              this.textArr.push(obj);
            }
          });
        });
        if (res.body.operatingPeriodType == 0) {
          this.timevalue = [res.body.periodStartDate, res.body.periodEndDate];
        } else {
          this.timevalueOne = res.body.periodStartDate;
        }
        if (res.body.idCardValidityType == 0) {
          this.idCardvalue = [
            res.body.validityStartDate,
            res.body.validityEndDate
          ];
        } else {
          this.idCardvalueOne = res.body.validityStartDate;
        }

        this.form = Object.assign({}, res.body, {
          categoryName: res.body.categoryName.split(","),
          category: category
        });
      });
    },
    // 图片上传
    uploadHttp({ file, data }) {
      if (file.type.split("/")[0] !== "image") {
        this.$message({
          message: "请上传图片",
          type: "warning"
        });
        return false;
      }
      if (file.size > 1024 * 1024 * 4) {
        this.$message({
          message: "上传图片过大",
          type: "warning"
        });
        return false;
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let consat = `hs_star/app_shop/goods/`;
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
              if (data.data == "handheldIdCardImg") {
                that.form[data.data] = url;
              } else {
                that.form.qualificationList[data.data].qualificationImg.push(
                  url
                );
              }
              console.log(that.form);
              loading.close();
            }
          }
        })
        .catch(err => {
          loading.close();
          this.$message("图片上传失败");
          console.log(`阿里云OSS上传图片失败回调`, err);
        });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss">
.icon-d {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.flex-box {
  display: flex;
}
.flex-box .png-s {
  width: 146px;
  height: 146px;
  background: #fcc;
  margin-right: 10px;
  position: relative;
}
.png-s:hover {
  cursor: pointer;
  .caozuo-box {
    display: block;
  }
}
.caozuo-box {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.flex-container {
  display: flex;
}
.flex-container div {
  flex: 1;
  width: 100px;
}
.el-textarea .el-textarea__inner {
  resize: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
</style>

<style lang="scss" scpoed>
.title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #f0f0f0;
  text-indent: 40px;
}
.form-content {
  background: #fff;
}
</style>