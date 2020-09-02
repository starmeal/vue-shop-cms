<template>
  <div class="big-container">
    <section class="form-container">
      <div style="height:20px"></div>
      <el-form ref="form" :rules="rules" :size="size" :model="form" label-width="150px">
        <el-form-item label="持卡人姓名" prop="actualName">
          <el-input
            style="width:200px;margin-right:20px"
            v-model.trim="form.actualName"
            placeholder="持卡人姓名"
            @input="(val)=>{
                nospace3('actualName',val)
              } "
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input
            v-model.trim="form.idCard"
            placeholder="身份证号"
            style="width:200px;margin-right:20px"
            @input="(val)=>{
                nospace2('idCard',val)
              } "
          ></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="account">
          <el-input
            v-model="form.account"
            @input="(val)=>{
                nospace1('account',val)
              } "
            placeholder="请输入银行卡卡号"
            style="width:200px;margin-right:20px"
          ></el-input>
          <span style="color:rgba(0, 155, 255, 1);font-size:12px;" @click="zhichi" class="curpin">可支持银行卡</span>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model.trim="form.mobile" placeholder="手机号" style="width:200px;margin-right:20px">></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="verifiCode">
          <el-input
            style="width:200px;margin-right:20px"
            placeholder="请输入验证码"
            v-model.trim="form.verifiCode"
            maxlength="6"
            size="mini"
            resize="none"
            show-word-limit
            clearable
          ></el-input>
          <el-button
            class="ms-btn"
            :disabled="count !== 60"
            :size="size"
            type="primary"
            @click="sendOutMessage"
          >{{count === 60 ? btnMessage : count}}</el-button>
        </el-form-item>
        <el-form-item label="设置默认银行卡">
          <el-switch
            v-model="form.isDefault"
            active-color="#44abf7"
            inactive-color="#a7a5a6"
            active-value="1"
            inactive-value="0"
          ></el-switch>
          <div style="color:rgba(255, 0, 0, 1);font-size:12px;">温馨提示：只支持储蓄卡提现申请</div>
        </el-form-item>
        <el-form-item>
          <el-button :size="size" type="primary" @click="submitgoods()">保存</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <div class="bank-flex">
          <div v-for="(item,index) in bankList" :key="index" class="bank-b">
            <img :src="item.bankLogoUrl" />
            <div>{{item.bankName}}</div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
var myreg = /^[1][3,4,5,6,7,8,9,][0-9]{9}$/;
var han = /^[\u4e00-\u9fa5]+$/;
import { cmssendSMCode } from "@/api/login";
import { saveBankCard, bankCardInformation } from "@/api/bank";
export default {
  data() {
    var EmptyValidator = (rule, value, callback) => {
      console.log(value);
      if (!myreg.test(value)) {
        callback(new Error("手机号格式有误请重新输入"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      count: 60,
      btnMessage: "发送验证码",
      radio: "1",
      size: "mini",
      value: "",
      //  <!-- 1待发布；2已发布；3-已撤销 -->
      options: [
        {
          value: 1,
          label: "待发布",
        },
        {
          value: 2,
          label: "已发布",
        },
      ],
      rules: {
        actualName: [
          { required: true, message: "请输入持卡人姓名", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: EmptyValidator,
            trigger: "blur",
          },
        ],
        verifiCode: [
          { required: true, message: "请填写验证码", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请填写身份证号码", trigger: "blur" },
          { min: 18, max: 18, message: "身份证长度是18位", trigger: "blur" },
        ],
        account: [
          { required: true, message: "请填写银行卡卡号", trigger: "blur" },
          { min: 16, max: 30, message: "银行卡位数输入不正确", trigger: "blur" },
        ],
      },
      form: {
        account: "",
        bankType: "2",
        isDefault: "0",
        actualName: "",
        verifiCode: "",
        mobile: "",
        idCard: "",
      },
      bankList: [],
    };
  },
  created() {
    bankCardInformation().then((res) => {
      this.bankList = res.body;
    });
  },
  methods: {
    sendOutMessage() {
      if (this.form.mobile == "") {
        this.$message({
          message: "请输入手机号",
          type: "error",
          center: true,
        });
        return false;
      }
      if (!myreg.test(this.form.mobile)) {
        this.$message({
          message: "手机号格式有误请重新输入",
          type: "error",
          center: true,
        });
        return false;
      }
      cmssendSMCode({
        mobile: this.form.mobile,
        type: 3,
      }).then((res) => {
        this.getphoneCode();
        this.$message({
          message: "发送成功",
          type: "success",
          center: true,
        });
      });
    },
    getphoneCode() {
      this.count--;
      if (this.count == 0) {
        this.count = 60;
        this.btnMessage = "重新发送";
      } else {
        setTimeout(() => {
          this.getphoneCode();
        }, 1000);
      }
    },
    zhichi() {
      this.dialogVisible = true;
    },
    nospace1(type, val) {
      this.form[type] = val.replace(/[^\d.]/g, "");
    },
    nospace2(type, val) {
      this.form[type] = val.replace(/[^\d.]/g, "");
    },
    nospace3(type, val) {
      if (!han.test(val)) {
        this.form[type] = val.replace(/^[A-Za-z0-9]+$/, "");
        return false;
      }
    },
    submitgoods() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          saveBankCard(this.form).then((res) => {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.$router.push({
              path: "/banklist",
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.curpin{
  cursor: pointer;
}
.bank-flex{
  display: flex;
  flex-wrap: wrap;
}
.bank-b{
  flex: 0 0 20%;
  text-align: center;
}
.bank-b img{
  width: 50px;
  height: 50px;
}
.bank-b div{
  font-size: 14px;
  color: #000;
  font-weight: bold;
}
.font-f {
  font-size: 12px;
  color: #606266;
  margin-right: 20px;
  flex: 1;
  text-align: right;
}
.flex-box {
  width: 90%;
  display: flex;
  justify-content: space-between;
}
.hidden-box {
  width: 0px;
  height: 0px;
}
.img-licenseImgUrl {
  width: 100%;
  height: 100%;
}
.size-tw {
  padding-left: 80px;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.tips {
  font-weight: 400;
  font-size: 12px;
  color: rgb(16, 16, 16);
}
.bok {
  color: #606266;
  font-size: 12px;
}
</style>
