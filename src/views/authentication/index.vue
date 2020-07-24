<template>
  <div class="authentication">
    <div class="form-content">
      <el-form ref="form" :model="form" label-width="150px" :rules="rules">
        <div class="title">
          <Icon icon="jibenxinxi" class="authentication-title" />营业执照信息
        </div>
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
          <el-checkbox-group v-model="form.operatingPeriodType">
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
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业执照照片：" prop="licenseImgUrl">
          <div class="picture-bg">
            <img v-if="form.licenseImgUrl" :src="form.licenseImgUrl" class="pic-company" />
          </div>
        </el-form-item>
        <div style="border-top: solid 13px #fff;"></div>
        <div class="title">
          <Icon icon="jibenxinxi" class="authentication-title" />法人信息
        </div>
        <div class="faren">法定代表人信息</div>
        <el-form-item label="身份证正面：" prop="legalIdCardUp">
          <div class="idcard-bg">
            <img v-if="form.legalIdCardUp" :src="form.legalIdCardUp" />
          </div>
        </el-form-item>
        <el-form-item label="身份证反面：" prop="legalIdCardDown">
          <div class="idcard-bg">
            <img v-if="form.legalIdCardUp" :src="form.legalIdCardDown" class="avatar" />
          </div>
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
        <!-- <el-form-item label="法人手机：" prop="legalPersonMobile">
          <el-input
            v-model="form.legalPersonMobile"
            placeholder="请输入内容"
            style="width:90%"
            size="small"
          ></el-input>
        </el-form-item>-->
        <el-form-item label="证件有效期：" prop="idCardValidityType">
          <el-checkbox-group v-model="form.idCardValidityType">
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
            </div>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="submit-btn">
          <el-button type="primary" size="small" @click="submit" style="margin-bottom:0px">提交审核</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="查询到的信息" :visible.sync="showmessage" width="60%">
      <section class="bjj">
        <div>
          <span>公司名称：</span>
          <span>{{keyWordContent.Name}}</span>
        </div>
        <div>
          <span>公司地址：</span>
          <span>{{keyWordContent.Address}}</span>
        </div>
        <div>
          <span>注册号：</span>
          <span>{{keyWordContent.No}}</span>
        </div>
        <div>
          <span>法人名：</span>
          <span>{{keyWordContent.OperName}}</span>
        </div>
        <div>
          <span>成立日期：</span>
          <span>{{keyWordContent.StartDate}}</span>
        </div>
        <div>
          <span>企业状态：</span>
          <span>{{keyWordContent.Status}}</span>
        </div>
        <div>
          <span>社会统一信用代码：</span>
          <span>{{keyWordContent.CreditCode}}</span>
        </div>
        <div>
          <span>登记机关：</span>
          <span>{{keyWordContent.BelongOrg}}</span>
        </div>
        <div>
          <span>经营范围：</span>
          <span>{{keyWordContent.Scope}}</span>
        </div>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="fuzhi">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" src="../../../static/img/demID.jpg" />
    </el-dialog>
  </div>
</template>

<script>
let districts;
import Icon from "@/components/base/icon.vue";
import { asyncUpload, SSupload } from "@/utils/upload";
import cascader from "@/components/city/cascader.vue";
import axios from "axios";
import {
  qualification,
  categoryInformationList,
  GetBasicDetailsByName,
  certification,
  queryQualificationDetail,
  qualificationDetailEdit,
} from "@/api/authentication";
export default {
  components: {
    cascader,
    Icon,
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
      keyWordContent: "",
      showmessage: false,
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
            trigger: "change",
          },
        ],
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "change" },
        ],
        cityCode: [
          { required: true, message: "请选择省市区", trigger: "change" },
        ],
        addressDetail: [
          { required: true, message: "请输入详细地址", trigger: "change" },
        ],
        businessScope: [
          { required: true, message: "请填写经营范围", trigger: "change" },
        ],
        socialCreditCode: [
          {
            required: true,
            message: "请填写统一社会信用代码",
            trigger: "change",
          },

          { min: 18, max: 18, message: "长度在 18个字符", trigger: "blur" },
        ],
        legalPersonName: [
          { required: true, message: "法人姓名", trigger: "blur" },
        ],
        legalPersonIdCard: [
          { required: true, message: "法人身份证", trigger: "blur" },
          { min: 18, max: 18, message: "长度在 18个字符", trigger: "blur" },
        ],
        legalPersonMobile: [{ validator: checkPhone, trigger: "blur" }],
        idCardValidityType: [
          { required: true, message: "请选择有效期", trigger: "change" },
        ],
        operatingPeriodType: [
          { required: true, message: "请选择有效期", trigger: "change" },
        ],
      },
      form: {
        category: "",
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
        legalPersonName: "",
        legalPersonIdCard: "",
        legalPersonMobile: "",
        idCardValidityType: "0",
        validityStartDate: "",
        validityEndDate: "",
        qualificationList: "",
      },
      textArr: [],
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
      immediate: true,
    },
    "form.idCardValidityType": {
      handler(newval) {
        if (newval == 1) {
          this.idCardvalue = [];
        } else {
          this.timevalueOne = "";
        }
      },
      immediate: true,
    },
  },
  created() {
    axios
      .get(
        "https://restapi.amap.com/v3/config/district?keywords=中国&subdistrict=3&key=53db67bb6768fb1da369ea6603e05e1b"
      )
      .then((res) => {
        if (res.statusText == "OK") {
          districts = res.data.districts[0].districts;
        }
      });
    this.getDetail();
  },
  methods: {
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
      this.form.provinceName = this.cityArrName[0];
      this.form.cityName = this.cityArrName[1];
      this.form.countyName = this.cityArrName[2];
    },
    // 详情
    getDetail() {
      queryQualificationDetail().then((res) => {
        this.cityvalue = [
          res.body.provinceCode,
          res.body.cityCode,
          res.body.countyCode,
        ];
        if (res.body.operatingPeriodType == 0) {
          this.timevalue = [res.body.periodStartDate, res.body.periodEndDate];
        } else {
          this.timevalueOne = res.body.periodStartDate;
        }
        if (res.body.idCardValidityType == 0) {
          this.idCardvalue = [
            res.body.validityStartDate,
            res.body.validityEndDate,
          ];
        } else {
          this.idCardvalueOne = res.body.validityStartDate;
        }
        this.form = Object.assign({}, res.body, {});
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      });
    },
    submit() {
      let form = this.form;
      this.$refs.form.validate((valid, form) => {
        if (valid) {
          if (this.timevalue.includes("") && !this.timevalueOne) {
            this.$message({
              message: "请选择营业期限",
              type: "error",
              center: true,
            });
            return false;
          }
          if (this.idCardvalue.includes("") && !this.idCardvalueOne) {
            this.$message({
              message: "请选择证件有效期",
              type: "error",
              center: true,
            });
            return false;
          }
          let form = Object.assign({}, this.form, {});
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
          qualificationDetailEdit(form).then((res) => {
            this.$alert(
              "您的资料已经提交审核，平台审核将在1-3个工作日内完成，请您耐心等待~",
              "提示",
              {
                confirmButtonText: "确定",
              }
            );
          });
        } else {
          this.$nextTick(() => {
            let obj = {
              alignToTop: false,
              block: "center",
              behavior: "smooth",
            };
            document
              .querySelectorAll(".el-form-item__error")[0]
              .scrollIntoView(obj);
          });
        }
      });
    },
    fuzhi() {
      this.form.addressDetail = this.keyWordContent.Address;
      this.form.companyName = this.keyWordContent.Name;
      this.form.businessScope = this.keyWordContent.Scope;
      this.form.socialCreditCode = this.keyWordContent.CreditCode;
      this.form.periodStartDate = this.keyWordContent.TermStart;
      this.form.period_end_date = this.keyWordContent.TeamEnd;
      this.timevalue = [this.form.periodStartDate, this.form.period_end_date];
      this.form.operatingPeriodType = 0;
      this.showmessage = false;
    },
    serachcomp() {
      if (!this.keyWord) {
        this.$message({
          message: "请输入后进行查询",
          type: "error",
          center: true,
        });
        return false;
      }
      const loading = this.$loading({
        lock: true,
        text: "查询中请稍后",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let obj = {
        keyWord: this.keyWord,
      };
      GetBasicDetailsByName(obj).then((res) => {
        loading.close();
        this.keyWordContent = res.body.Result;
        this.showmessage = true;
      });
    },
    datechangeOne(val) {
      this.form.validityStartDate = val[0];
      this.form.validityEndDate = val[1];
    },
  },
};
</script>
<style>
.el-message--error {
  background-color: #e9615f;
}
</style>
<style lang="scss">
.bjj {
  line-height: 30px;
}
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
  padding-left: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  font-family: Microsoft YaHei, MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  border-bottom: solid 2px #fff;
  box-sizing: border-box;
}
.authentication-title {
  width: 14px;
  height: 16px;
  margin-right: 6px;
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
  font-family: MicrosoftYaHeiLight;
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
  top: 0;
  z-index: 100;
}
.input-con {
  position: relative;
  width: 90%;
}
.input-cla {
  width: 100%;
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
  padding: 20px 0px;
  background: #fff;
  margin-bottom: 0px;
}
.pic-company {
  width: 160px;
  height: 215px;
}
.picture-bg {
  background-image: url("../../../static/img/2a.png");
  width: 190px;
  height: 240px;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.idcard-bg {
  background-image: url("../../../static/img/1a.png");
  width: 170px;
  height: 110px;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.idcard-bg img {
  width: 150px;
  height: 90px;
}
</style>