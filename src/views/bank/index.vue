<template>
  <div class="big-container">
    <section class="form-container">
      <div style="height:20px"></div>
      <div class="size-tw">可提现金额：￥{{allMoney.nowAmount}}</div>
      <el-form ref="form" :rules="rules" :size="size" :model="form" label-width="150px">
        <el-form-item label="填写提现金额" prop="nowMoney">
          <el-input-number
            :max="5000"
            :controls="false"
            style="width:200px;margin-right:20px"
            v-model="form.nowMoney"
          ></el-input-number>
          <el-button :size="size" type="primary" @click="allin">全部提现</el-button>
          <div class="tips">温馨提示：最多提现每次不超5000元，到帐金额小于提现金额，差额为扣除的技术服务费，详情仔细阅读《 XXXX合同》</div>
        </el-form-item>
        <el-form-item label="到账银行卡" prop="account">
          <el-select v-model="form.account" placeholder="请选择" style="width:200px;margin-right:20px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.account"
              :value="item.account"
            ></el-option>
          </el-select>
          <el-button :size="size" @click="goadd(1)">添加银行卡</el-button>
          <el-button :size="size" @click="goadd(2)">添加对公账户</el-button>
        </el-form-item>
        <el-form-item label="短信验证码" prop="verifiCode">
          <el-input
            style="width:200px;margin-right:20px"
            placeholder="请输入验证码"
            v-model="form.verifiCode"
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
          <div class="tips">验证短信将发送到您登录的手机：{{miniphone}}，请注意查收！</div>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="3"
            show-word-limit
            maxlength="50"
            placeholder="请输入备注内容"
            v-model="form.remark"
            style="width:400px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :size="size" type="danger" @click="submitgoods()">提交申请</el-button>
          <div class="bok">
            我已阅读并同意
            <span style="color:rgb(0, 155, 255)">《提现协议》</span>
          </div>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
var myreg = /^[1][3,4,5,6,7,8,9,][0-9]{9}$/;
import { allBalances, mybankCardList,submitWithdrawal  } from "@/api/bank";
import { cmssendSMCode } from "@/api/login";

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
      miniphone: "",
      allMoney: "",
      count: 60,
      btnMessage: "获取验证码",
      size: "mini",
      value: "",
      //  <!-- 1待发布；2已发布；3-已撤销 -->
      options: [],
      rules: {
        nowMoney: [
          { required: true, message: "请填写提现金额", trigger: "blur" },
        ],
        account: [
          { required: true, message: "请选择提现银行卡", trigger: "change" },
          { min: 16, max: 19, message: "验证码长度6位", trigger: "blur" },
        ],
        verifiCode: [
          { required: true, message: "请填写验证码", trigger: "blur" },
          { min: 6, max: 6, message: "验证码长度6位", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请填写手机号码", trigger: "blur" },
          {
            validator: EmptyValidator,
            trigger: "blur",
          },
        ],
        remark: [{ required: true, message: "请填写备注", trigger: "blur" }],
      },
      form: {
        nowMoney: "",
        account: "",
        verifiCode: "",
        mobile: "",
        remark: "",
      },
    };
  },
  created() {
    this.getmybannk();
    this.getMOeny();
  },
  methods: {
    getmybannk() {
      mybankCardList().then((res) => {
        this.options = res.body;
      });
    },
    allin() {
      this.form.nowMoney =
        this.allMoney.nowAmount > 5000 ? 5000 : this.allMoney.nowAmount;
    },
    getMOeny() {
      allBalances().then((res) => {
        this.allMoney = res.body;
        this.form.mobile = res.body.applyMobile;
        this.miniphone =
          res.body.applyMobile.substring(0, 4) +
          "****" +
          res.body.applyMobile.substring(7, 13);
      });
    },
    goadd(index) {
      this.$router.push({
        path: index == 1 ? "/addbank" : "/addbas",
      });
    },
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
        type: 84,
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
    submitgoods() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.nowMoney = this.form.nowMoney.toString()
          submitWithdrawal(this.form).then((res) => {
            this.$message({
              message: "申请成功",
              type: "success",
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
