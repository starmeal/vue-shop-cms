<template>
  <div class="authentication">
    <div class="form-content">
      <el-form ref="form" :model="form" label-width="150px" :rules="rules">
        <div class="title">选择类目</div>
        <div style="width:100%;height:10px"></div>
        <el-form-item label="经验类目：" prop="categoryName" style="margin-bottom:10px">
          <div class="woqu">
            <span
              v-for="(item,index) in form.categoryName"
              :key="index"
              style="margin-right:4px"
              @click="delcategory(item)"
            >
              <i class="el-icon-close"></i>
              {{item}}
            </span>
          </div>
          <div class="tips">企业经营类目最多可多选五个类目</div>
        </el-form-item>
        <el-form-item label="增加类目：">
          <el-select
            style="width:90%"
            v-model="form.category"
            multiple
            placeholder="请选择经营类目最多五个"
            size="small"
            @change="categoryChange"
          >
            <el-option
              v-for="item in selectArr"
              :key="item.value"
              :label="item.categoryName"
              :value="item.id"
            ></el-option>
          </el-select>
          <!-- <el-cascader v-model="value" :options="options" size="small"></el-cascader> -->
        </el-form-item>
        <el-form-item label="需要材料：">
          <section class="nimem">
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
          </section>
        </el-form-item>
        <div class="title" style="border-top: solid 13px #fff;">营业执照信息</div>
        <el-form-item>
          <div style="width:100%;height:10px"></div>
          <section class="input-con">
            <input placeholder="输入你的企业名称或统一社会信用代码" v-model="keyWord" size="small" class="input-cla" />
            <div class="btnsss" @click="serachcomp">搜索</div>
          </section>
        </el-form-item>
        <el-form-item label="企业名称：" prop="companyName">
          <el-input
            :disabled="true"
            placeholder="请输入企业名称"
            clearable
            style="width:90%"
            size="small"
            v-model="form.companyName"
          ></el-input>
          <div class="tips">该名称需要与提现银行卡所对应的对公账户名称一致</div>
        </el-form-item>
        <el-form-item label="注册地址：" prop="cityCode" style="margin-bottom:10px">
          <cascader v-model="cityvalue" @change="handleChange" size="small" width="90%"></cascader>
        </el-form-item>
        <el-form-item prop="addressDetail">
          <el-input
            v-model="form.addressDetail"
            type="textarea"
            style="width:90%"
            placeholder="请输入内容"
            rows="4"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="经营范围：" prop="businessScope">
          <el-input
            type="textarea"
            style="width:90%"
            placeholder="请输入内容"
            v-model="form.businessScope"
            rows="4"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码：" prop="socialCreditCode">
          <el-input
            size="small"
            style="width:90%"
            v-model="form.socialCreditCode"
            placeholder="请输入内容"
          ></el-input>
          <div class="tips">请输入营业执照18位统一社会信用代码</div>
        </el-form-item>
        <el-form-item label="营业期限：" prop="operatingPeriodType">
          <div>
            <el-radio v-model="form.operatingPeriodType" label="0">区间有效</el-radio>
            <el-date-picker
              :disabled="form.operatingPeriodType != 0"
              v-model="timevalue"
              value-format="yyyy-MM-dd"
              size="small"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div>
            <el-radio v-model="form.operatingPeriodType" label="1">长期有效</el-radio>
            <el-date-picker
              value-format="yyyy-MM-dd"
              :disabled="form.operatingPeriodType != 1"
              v-model="timevalueOne"
              type="date"
              placeholder="选择日期"
              size="small"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="营业执照照片：" prop="licenseImgUrl">
          <img v-if="form.licenseImgUrl" :src="form.licenseImgUrl" class="avatar" />
        </el-form-item>
        <div class="title" style="border-top: solid 13px #fff;">法人信息</div>
        <div class="faren">法定代表人信息</div>
        <el-form-item label="手持身份证：" prop="handheldIdCardImg">
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
            <div class="hidden-box">
              <el-input v-model="form.handheldIdCardImg" class="hidden-input"></el-input>
            </div>
          </el-upload>
          <div>
            必须为彩色图片且小于4M，文件格式为bmp，png，jpeg，或gif。
            <span
              style="color:#3976e6"
              class="poiner"
              @click="showdemoIDcard"
            >查看示例</span>
          </div>
        </el-form-item>
        <el-form-item label="身份证正面：" prop="legalIdCardUp">
          <img v-if="form.legalIdCardUp" :src="form.legalIdCardUp" class="avatar" />
        </el-form-item>
        <el-form-item label="身份证反面：" prop="legalIdCardDown">
          <img v-if="form.legalIdCardUp" :src="form.legalIdCardDown" class="avatar" />
        </el-form-item>
        <div style="margin-left: 52px; padding: 20px 0px; font-size:12px">法人代表信息</div>
        <el-form-item label="法人代表姓名：" prop="legalPersonName">
          <el-input
            v-model="form.legalPersonName"
            placeholder="请输入内容"
            style="width:90%"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件号码：" prop="legalPersonIdCard">
          <el-input
            v-model="form.legalPersonIdCard"
            placeholder="请输入内容"
            style="width:90%"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="法人手机：" prop="legalPersonMobile">
          <el-input
            v-model="form.legalPersonMobile"
            placeholder="请输入内容"
            style="width:90%"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件有效期：" prop="idCardValidityType">
          <div>
            <el-radio v-model="form.idCardValidityType" label="0">区间有效</el-radio>
            <el-date-picker
              v-model="idCardvalue"
              size="small"
              type="daterange"
              :disabled="form.idCardValidityType != 0"
              range-separator="至"
              start-placeholder="开始日期"
              value-format="yyyy-MM-dd"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div>
            <el-radio v-model="form.idCardValidityType" label="1">长期有效</el-radio>
            <el-date-picker
              v-model="idCardvalueOne"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              size="small"
              :disabled="form.idCardValidityType != 1"
            ></el-date-picker>
            <span style="margin-left:10px">身份证开始日期</span>
          </div>
        </el-form-item>
        <div class="title" style="margin-bottom:20px">其他资质</div>
        <el-form-item v-for="(item,index) in form.qualificationList" :key="index">
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
          <div
            v-if="textArr[index]"
            class="text-text"
          >{{textArr[index].qualificationDescription ? textArr[index].qualificationDescription : ''}}；必须为彩色图片且小于6M，文件格式为bmp、png、jpeg、或gif</div>
        </el-form-item>
        <el-form-item class="submit-btn">
          <el-button type="primary" size="small" @click="submit" style="margin-bottom:0px">提交审核</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" src="../../../static/img/demID.jpg" />
    </el-dialog>
  </div>
</template>

<script>
let districts;
import { asyncUpload, SSupload } from "@/utils/upload";
import cascader from "@/components/city/cascader.vue";
import axios from "axios";
import {
  qualification,
  categoryInformationList,
  GetBasicDetailsByName,
  certification
} from "@/api/authentication";
export default {
  components: {
    cascader
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^[1][3,4,5,6,7,8,9,][0-9]{9}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      showTips: false,
      dialogVisible: false,
      cityvalue: [],
      cityArrName: [],
      category: [],
      districts: [],
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
      rules: {
        categoryName: [
          {
            required: true,
            message: "请至少选择一个经营类目",
            trigger: "change"
          }
        ],
        companyName: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        cityCode: [
          { required: true, message: "请选择省市区", trigger: "change" }
        ],
        businessScope: [
          { required: true, message: "请填写经营范围", trigger: "blur" }
        ],
        socialCreditCode: [
          { required: true, message: "请填写统一社会信用代码", trigger: "blur" }
          //  { min: 18, max: 18, message: '长度在 18个字符', trigger: 'blur' }
        ],
        handheldIdCardImg: [
          { required: true, message: "手持身份证", trigger: "change" }
        ],
        legalPersonName: [
          { required: true, message: "法人姓名", trigger: "blur" }
        ],
        legalPersonIdCard: [
          { required: true, message: "法人身份证", trigger: "blur" },
          { min: 18, max: 18, message: "长度在 18个字符", trigger: "blur" }
        ],
        legalPersonMobile: [{ validator: checkPhone, trigger: "blur" }],
        idCardValidityType: [
          { required: true, message: "请选择有效期", trigger: "change" }
        ],
        operatingPeriodType: [
          { required: true, message: "请选择有效期", trigger: "change" }
        ]
      },
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
      textArr: []
    };
  },
  watch: {
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
          districts = res.data.districts[0].districts;
        }
      });
    this.getSelect().then(() => {
      this.getDetail();
    });
  },
  methods: {
    // 删除
    delcategory(name) {
      let id;
      this.selectArr.forEach((item, idx) => {
        if (item.categoryName == name) {
          id = item.id;
        }
      });
      let index = this.form.category.findIndex(el => {
        return el == id;
      });
      this.form.category.splice(index, 1);
      this.categoryChange(this.form.category);
    },
    showdemoIDcard() {
      this.dialogVisible = true;
    },
    handleChange(val) {
      if (val.length == 0) {
        this.form.provinceCode = "";
        this.form.cityCode = "";
        this.form.countyCode = "";
      } else {
        this.form.provinceCode = val[0];
        this.form.cityCode = val[1];
        this.form.countyCode = val[2];
        this.HandleCityName(districts);
      }
    },
    // 得到省市区中文
    HandleCityName(districts) {
      for (let j = 0; j < this.cityvalue.length; j++) {
        for (let i = 0; i < districts.length; i++) {
          if (districts[i].adcode == this.cityvalue[j]) {
            this.cityArrName.push(districts[i].name);
            if (districts[i].districts && districts[i].districts.length) {
              this.HandleCityName(districts[i].districts);
            }
            break;
          }
        }
      }
      (this.form.provinceName = this.cityArrName[0]),
        (this.form.cityName = this.cityArrName[1]);
      this.form.countyName = this.cityArrName[2];
    },
    // 详情
    getDetail() {
      qualification().then(res => {
        this.textArr = [];
        let qualificationList = [];
        let category = res.body.category.split(",").map(el => {
          let obj = {
            categoryId: el,
            qualificationImg: []
          };
          qualificationList.push(obj);
          return parseInt(el);
        });
        this.category = category;
        this.cityvalue = [
          res.body.provinceCode,
          res.body.cityCode,
          res.body.countyCode
        ];
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
          categoryName: res.body.categoryName
            ? res.body.categoryName.split(",")
            : 0,
          qualificationList:
            res.body.qualificationList.length > 0
              ? res.body.qualificationList
              : qualificationList,
          category: category
        });
        this.$refs.form.clearValidate();
      });
    },
    submit() {
      let form = this.form;
      this.$refs.form.validate((valid, form) => {
        if (valid) {
          if (
            this.category.sort().toString() == this.form.category.toString()
          ) {
            this.$message({
              message: "类目没有更改不允许提交",
              type: "warning"
            });
            return false;
          }
          var r = this.form.qualificationList.filter(function(s) {
            return s.qualificationImg.length == 0;
          });
          if (r.length > 0) {
            this.$message({
              message: `您有${r.length}项资质图未为上传`,
              type: "warning"
            });
            return false;
          }
          let form = Object.assign({}, this.form, {
            category: this.form.category.join(","),
            categoryName: this.form.categoryName.join(",")
          });
          if (form.idCardValidityType == 0) {
            form.validityStartDate = this.idCardvalue[0];
            form.validityEndDate = this.idCardvalue[1];
          } else {
            form.validityStartDate = this.idCardvalueOne;
            form.validityEndDate = "";
          }
          if (form.operatingPeriodType == 0) {
            form.periodStartDate = this.timevalue[0];
            form.period_end_date = this.timevalue[1];
          } else {
            form.periodStartDate = this.timevalueOne;
            form.period_end_date = "";
          }
          certification(form).then(res => {
            this.$alert(
              "您的资料已经提交审核，平台审核将在1-3个工作日内完成，请您耐心等待~",
              "提示",
              {
                confirmButtonText: "确定"
              }
            );
          });
        } else {
          this.$nextTick(() => {
            let obj = {
              alignToTop: false,
              block: "center",
              behavior: "smooth"
            };
            document
              .querySelectorAll(".el-form-item__error")[0]
              .scrollIntoView(obj);
          });
        }
      });
    },
    delImg(index, idx) {
      this.form.qualificationList[index].qualificationImg.splice(idx, 1);
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
    },
    // 分类变化
    categoryChange(val) {
      if (val.length > 5) {
        val.splice(val.length - 1, 1);
      }
      let arr = [];
      let textarr = [];
      let ret = [];
      let categoryIds = this.form.qualificationList.map((item, index) => {
        return item.categoryId;
      });
      let qualificationImgs = this.form.qualificationList.map((item, index) => {
        return item.qualificationImg;
      });
      val.forEach((valItem, valIndex) => {
        if (categoryIds.includes(valItem)) {
          ret.push({
            categoryId: valItem,
            qualificationImg:
              qualificationImgs[categoryIds.findIndex(item => item == valItem)]
          });
        } else {
          ret.push({
            categoryId: valItem,
            qualificationImg: []
          });
        }
      });
      this.$set(this.form, "qualificationList", ret);
      val.forEach(element => {
        this.selectArr.forEach((el, idx) => {
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
      let houzhui = "";
      let fileName = "";
      var timestamp = Date.parse(new Date());
      houzhui = file.name.split(".");
      fileName = `${parseInt(
        (Math.random() + 1) * Math.pow(10, 18 - 1)
      )}${timestamp}.${houzhui[houzhui.length - 1]}`;
      let consat = `hs_star/authentication/${fileName}`;
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
    }
  }
};
</script>
<style lang="scss">
.poiner {
  cursor: pointer;
}
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
.el-form-item__label {
  font-size: 12px;
  font-family: Microsoft YaHei, MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(102, 102, 102, 1);
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
<style scoped>
.faren {
  font-size: 18px;
  font-family: Microsoft YaHei, MicrosoftYaHeiLight;
  font-weight: 300;
  color: rgba(51, 51, 51, 1);
  margin-left: 52px;
  padding: 20px 0px;
}
.authentication {
  background: #fff;
  box-sizing: border-box;
  padding: 20px;
  font-family: MicrosoftYaHei-Bold;
}
.woqu {
  width: 89.5%;
  background: #fff;
  height: 32px;
  line-height: 32px;
  padding-left: 3px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(239, 239, 239, 1);
}
.woqu span {
  height: 24px;
  line-height: 24px;
  padding: 0 10px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: rgba(51, 51, 51, 1);
  background: rgba(240, 240, 240, 1);
  border: 1px solid rgba(225, 225, 225, 1);
  cursor: pointer;
}
.form-content {
  background: #f7f6f9;
}
.hidden-box {
  width: 0px;
  height: 0px;
}
.hidden-box /deep/ .el-input > .el-input__inner {
  position: absolute !important;
  width: 0 !important;
  height: 0 !important;
  z-index: -1 !important;
  padding: 0 !important;
  margin: 0 !important;
  top: 0;
  left: 0;
}
.title {
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-indent: 40px;
  font-family: Microsoft YaHei, MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  border-bottom: solid 2px #fff;
}
.tips {
  font-size: 12px;
  line-height: 30px;
  font-family: Microsoft YaHei, MicrosoftYaHeiLight;
  font-weight: 300;
  color: rgba(153, 153, 153, 1);
}
.nimem {
  background: #fff;
  box-sizing: border-box;
  padding: 10px;
  width: 90%;
}
.nimem > div {
  line-height: 25px;
  font-size: 12px;
  font-family: Microsoft YaHei, MicrosoftYaHeiLight;
  font-weight: 300;
  color: rgba(153, 153, 153, 1);
}
.btnsss {
  background: rgba(68, 171, 247, 1);
  border: 1px solid rgba(68, 171, 247, 1);
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  width: 82px;
  text-align: center;
  line-height: 40px;
  height: 40px;
  display: inline-block;
  position: absolute;
  right: 0;
}
.input-con {
  position: relative;
  width: 90%;
}
.input-cla {
  width: calc(90%);
  background: #efefef;
  height: 40px;
  display: inline-block;
  background: #eaeaea;
  border: 1px solid rgba(234, 234, 234, 1);
  outline-color: rgba(68, 171, 247, 1);
  text-indent: 10px;
}
.input-cla:focus {
  background: rgba(239, 239, 239, 1);
}
.text-text {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  margin-top: 10px;
  line-height: 20px;
  color: rgba(153, 153, 153, 1);
}
.submit-btn {
  background: #fff;
}
</style>