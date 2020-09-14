<template>
  <div class="login-container">
    <div class="hs-login">
      <img src="../../../static/img/login-i.png" class="bg-image" />
      <div v-if="isShow" class="hs-login-container">
        <div class="action-container">
          <div
            v-bind:class="[{'is-active': isActive == 1} ,'action-item']"
            @click="typeSelect(1)"
          >账号密码登录</div>
          <div :class="[{'is-active': isActive == 2} ,'action-item']" @click="typeSelect(2)">短信登录</div>
        </div>
        <!-- 账户密码登录 -->
        <el-form
          @submit.native.prevent
          key="pass"
          class="login-con"
          :model="userPass"
          :rules="userRules"
          ref="adminLogin"
          v-if="isActive === 1"
        >
          <el-form-item class="login-user-con" prop="username">
            <el-input v-model="userPass.username" placeholder="请输入用户名/手机号"></el-input>
          </el-form-item>
          <el-form-item class="login-user-con" prop="password">
            <el-input
              v-model="userPass.password"
              placeholder="请输入密码"
              show-password
              @keyup.enter.native="adminLogin(1)"
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="submit" @click="adminLogin(1)" :loading="loading">登录</el-button>
        </el-form>
        <!-- 手机登录 -->
        <el-form
          @submit.native.prevent
          class="login-con"
          :model="mobelForm"
          :rules="mobelFormRules"
          ref="mobelForm"
          v-if="isActive === 2"
        >
          <el-form-item class="login-user-con" prop="mobile">
            <el-input v-model="mobelForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item class="login-user-con" prop="smCode">
            <el-input
              v-model="mobelForm.smCode"
              placeholder="请输入短信验证码"
              class="phone-input"
              @keyup.enter.native="adminLogin(2)"
            ></el-input>
            <el-button
              class="ms-btn"
              :disabled="count !== 60"
              @click="sendOutMessage"
            >{{count === 60 ? btnMessage : count}}</el-button>
          </el-form-item>
          <el-button type="primary" class="submit" @click="adminLogin(2)" :loading="loading">登录</el-button>
        </el-form>
        <section
          v-if="isActive === 1"
          @click="forgetPassword"
          class="forget-password"
        >忘记密码&nbsp;&nbsp;&nbsp;&nbsp;？</section>
      </div>
      <div v-else class="resetPassword">
        <p class="z_title">密码重置</p>
        <el-form key="pass-reset" :model="zform" :rules="zrules" ref="zform" class="demo-form">
          <el-form-item class="zphone" prop="mobile">
            <el-input v-model="zform.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item class="login-user-con login-user-con-code" prop="tupianmCode">
            <el-input v-model="zform.tupianmCode" placeholder="请输入图片右侧的验证码" class="phone-input"></el-input>
            <SIdentify
              class="yanzhengma"
              :identifyCode="identifyCode"
              @click="handleRefreshCode"
              :content-height="32"
              :contentWidth="110"
            ></SIdentify>
          </el-form-item>
          <el-form-item class="login-user-con" prop="smCode">
            <el-input v-model="zform.smCode" placeholder="请输入短信验证码" class="phone-input"></el-input>
            <el-button :disabled="disabled" class="ms-btn" @click="sendOutMessage1">{{text}}</el-button>
          </el-form-item>
          <el-form-item class="zpassword" prop="resetPassword">
            <el-input
              v-model="zform.resetPassword"
              placeholder="请输入密码"
              show-password
              autocomplete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item class="zagainPassword" prop="password">
            <el-input
              v-model="zform.password"
              placeholder="重复密码"
              show-password
              autocomplete="new-password"
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="submit" @click="zlogin" :loading="loading">登录</el-button>
        </el-form>
        <section @click="toLogin" class="forget-password">已有账号登录</section>
      </div>
    </div>
  </div>
</template>

<script>
import { adminLogin, getphoneMessage, cmssendSMCode } from "@/api/login";
import SIdentify from "@/components/identify";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("user");
import md5 from "blueimp-md5";
var myreg = /^[1][3,4,5,6,7,8,9,][0-9]{9}$/;
export default {
  data() {
    var passWorldRules = (rule, value, callback) => {
      console.log(value);
      if (value == "") {
        callback(new Error("密码不能为空"));
      }
      if (value != "" && value.length < 6) {
        callback(new Error("密码小于六位数"));
      } else {
        callback();
      }
    };
    var EmptyValidator = (rule, value, callback) => {
      console.log(value);
      if (!myreg.test(value)) {
        callback(new Error("手机号格式有误请重新输入"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value !== this.zform.resetPassword) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      identifyCodes: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "n",
        "m",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        6,
        7,
        8,
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        4,
        5,

        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        2,
        3,

        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        1,
        9,
      ],
      identifyCode: "",
      isShow: true,
      sendout: false,
      loading: false,
      btnMessage: "发送验证码",
      disabled: false,
      time: 5,
      text: "发送验证码",
      isActive: 2,
      count: 60,
      resetPassword: "",
      mobelForm: {
        mobile: "",
        smCode: "",
      },
      zform: {
        tupianmCode: "",
        mobile: "",
        smCode: "",
        password: "",
      },
      userPass: {
        username: "",
        password: "",
      },
      userRules: {
        username: [
          { required: true, message: "用户名/手机号不能为空", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            validator: passWorldRules,
            trigger: "blur",
          },
        ],
      },
      mobelFormRules: {
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            validator: EmptyValidator,
            trigger: "blur",
          },
        ],
        smCode: [
          { required: true, message: "短信验证码不能为空", trigger: "blur" },
          { min: 6, max: 6, message: "短信验证码应为6位", trigger: "blur" },
        ],
      },
      zrules: {
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            validator: EmptyValidator,
            trigger: "blur",
          },
        ],
        smCode: [
          { required: true, message: "短信验证码不能为空", trigger: "blur" },
          { min: 6, max: 6, message: "短信验证码应为6位", trigger: "blur" },
        ],
        tupianmCode: [
          { required: true, message: "图形验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "图形验证码应为4位", trigger: "blur" },
        ],
        resetPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    localStorage.clear();
    if (this.$route.query.type == 1) {
      this.isShow = false;
      this.handleRefreshCode();
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  components: {
    SIdentify,
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    handleRefreshCode() {
      let identifyCode = "";
      for (let i = 0; i < 4; i++) {
        identifyCode += this.identifyCodes[this.randomNum(i, 51)];
      }
      this.identifyCode = identifyCode;
    },
    ...mapActions(["login"]),
    // 倒计时
    sendOutMessage() {
      if (this.mobelForm.mobile == "") {
        this.$message({
          message: "请输入手机号",
          type: "error",
          center: true,
        });
        return false;
      }
      if (!myreg.test(this.mobelForm.mobile)) {
        this.$message({
          message: "手机号格式有误请重新输入",
          type: "error",
          center: true,
        });
        return false;
      }
      cmssendSMCode({
        mobile: this.mobelForm.mobile,
        type: 81,
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
    // 重置密码倒计时
    sendOutMessage1() {
      if (this.zform.mobile == "") {
        this.$message({
          message: "请输入手机号",
          type: "error",
          center: true,
        });
        return false;
      }
      if (!myreg.test(this.zform.mobile)) {
        this.$message({
          message: "手机号格式有误请重新输入",
          type: "error",
          center: true,
        });
        return false;
      }
      getphoneMessage({ mobile: this.zform.mobile, type: 85 }).then((res) => {
        this.time = 60;
        this.timer();
      });
    },
    //发送验证码倒计时
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.text = this.time;
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.text = "发送验证码";
        this.disabled = false;
      }
    },
    // 切换登录方式
    typeSelect(index) {
      this.isActive = index;
      this.$nextTick(() => {
        if (this.isActive == 1) {
          this.$refs.adminLogin.resetFields();
        } else {
          this.$refs.mobelForm.resetFields();
        }
      });
    },
    // 账户密码登录
    adminLogin(type) {
      //  1账户密码2手机
      if (type === 1) {
        this.$refs.adminLogin.validate(async (valid) => {
          if (valid) {
            this.loading = true;
            this.login({
              ...this.userPass,
              password: md5(this.userPass.password),
            })
              .then(({ code }) => {
                this.loading = false;
                if (code === "000000") {
                  // window.location.reload();
                  this.$router.push({ path: this.redirect || "/" });
                }
              })
              .catch((err) => {
                this.loading = false;
              });
          }
        });
      } else {
        this.$refs.mobelForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("user/phonelogin", this.mobelForm)
              .then((res) => {
                // window.location.reload();
                this.$router.push({ path: this.redirect || "/" });

                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            return false;
          }
        });
      }
    },
    forgetPassword() {
      this.isShow = false;
      this.handleRefreshCode();
    },
    toLogin() {
      this.isShow = true;
    },
    zlogin() {
      this.$refs.zform.validate(async (valid) => {
        if (valid) {
          if (this.identifyCode === this.zform.tupianmCode) {
            this.loading = true;
            //delete this.zform.resetPassword;
            this.$store
              .dispatch("user/resetPasswordLogin", {
                ...this.zform,
                password: md5(this.zform.password),
              })
              .then((res) => {
                this.$router.push({ path: this.redirect || "/" });
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            this.$message({
              message: "图形验证码输入不正确",
              type: "error",
              center: true,
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.mini-flexs ::v-deep .el-cascader .el-input__inner {
  border-radius: 0px;
}
.login-container {
  width: 100%;
  height: 100%;
  background: url("../../../static/img/loin-bg.jpg");
  background-size: cover;
  background-position: 0 0;
  font-family: Microsoft YaHei;
}
.hs-login {
  width: 1224px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  /*重置密码start*/
  .resetPassword {
    box-sizing: border-box;
    padding: 25px 40px;
    width: 420px;
    height: 510px;
    background: rgba(255, 255, 255, 1);
    border-radius: 11px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    .z_title {
      margin-top: 25px;
      margin-bottom: 30px;
      font-size: 24px;
    }
    .zimgCode {
      width: 220px;
    }
  }
  /*重置密码end*/
  .hs-login-container {
    box-sizing: border-box;
    padding: 25px 40px;
    width: 420px;
    height: 398px;
    background: rgba(255, 255, 255, 1);
    border-radius: 11px;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    .action-container {
      width: 100%;
      height: 70px;
      display: flex;
      margin-bottom: 42px;
      .action-item {
        transition: all 0.5s;
        position: relative;
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-family: Microsoft YaHei;
        color: rgba(26, 26, 26, 1);
        background-position: 0 100%;
        background-position-x: -300px;
        &::after {
          content: " ";
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          background: #e7e7e7;
          width: 100%;
        }
      }
      .is-active {
        transition: all 0.5s;
        background: url("../../../static/img/active-l.png");
        background-repeat: no-repeat;
        background-size: 100% 10px;
        background-position: 0 100%;
        background-position-x: 0px;
      }
    }
    .login-user-con {
      margin-bottom: 25px;
    }
  }
  .resetPassword {
    .login-user-con-code ::v-deep .el-form-item__content {
      display: flex;
      align-items: center;
      .yanzhengma {
        margin-left: 10px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .submit {
    width: 100%;
    height: 49px;
    background: #4378e0;
    font-size: 17px;
    font-family: Microsoft YaHei;
    color: rgba(255, 255, 255, 1);
  }
  .phone-input {
    width: 220px;
  }
  .ms-btn {
    float: right;
    width: 110px;
    text-align: center;
    color: #1a1a1a;
    font-size: 13px;
    font-family: Microsoft YaHei;
  }
  .bg-image {
    top: 50%;
    left: 3%;
    transform: translate(0%, -50%);
    position: absolute;
  }
  .forget-password {
    margin-top: 20px;
    text-align: right;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 300;
    color: rgba(153, 153, 153, 1);
    cursor: pointer;
  }
}
</style>