<template>
  <div class="login-container">
    <div class="hs-login">
      <img src="../../../static/img/login-i.png" class="bg-image" />
      <div class="hs-login-container">
        <div class="action-container">
          <div
            v-bind:class="[{'is-active': isActive == 1} ,'action-item']"
            @click="typeSelect(1)"
          >账号密码登录</div>
          <div :class="[{'is-active': isActive == 2} ,'action-item']" @click="typeSelect(2)">短信登录</div>
        </div>
        <!-- 账户密码登录 -->
        <el-form
          class="login-con"
          :model="userPass"
          :rules="userRules"
          ref="adminLogin"
          v-if="isActive === 1"
        >
          <el-form-item class="login-user-con" prop="username">
            <el-input v-model="userPass.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item class="login-user-con" prop="password">
            <el-input v-model="userPass.password" placeholder="请输入验证码" show-password></el-input>
          </el-form-item>
          <el-button type="primary" class="submit" @click="adminLogin(1)" :loading="loading">登录</el-button>
        </el-form>
        <!-- 手机登录 -->
        <el-form
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
            <el-input v-model="mobelForm.smCode" placeholder="请输入短信验证码" class="phone-input"></el-input>
            <el-button
              class="ms-btn"
              :disabled="count !== 60"
              @click="sendOutMessage"
            >{{count === 60 ? btnMessage : count}}</el-button>
          </el-form-item>
          <el-button type="primary" class="submit" @click="adminLogin(2)" :loading="loading">登录</el-button>
        </el-form>
        <section class="forget-password">忘记密码&nbsp;&nbsp;&nbsp;&nbsp;？</section>
      </div>
    </div>
  </div>
</template>

<script>
import { adminLogin } from "@/api/login";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("user");
import md5 from "blueimp-md5";
var myreg = /^[1][3,4,5,6,7,8,9,][0-9]{9}$/;
export default {
  data() {
    var EmptyValidator = (rule, value, callback) => {
      console.log(value)
      if (!myreg.test(value)) {
        callback(new Error("手机号格式有误请重新输入"));
      } else {
        callback();
      }
    };
    return {
      sendout: false,
      loading: false,
      btnMessage: "发送验证码",
      isActive: 2,
      count: 60,
      mobelForm: {
        mobile: "",
        smCode: ""
      },
      userPass: {
        username: "",
        password: ""
      },
      userRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            min: 6,
            message: "密码长度不能小于6位",
            trigger: "blur"
          }
        ]
      },
      mobelFormRules: {
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            validator: EmptyValidator,
            trigger: "blur"
          }
        ],
        smCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 6, max: 6, message: '验证码应为6位', trigger: 'blur' }
         ]
      }
    };
  },
  created() {},
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(["login"]),
    // 倒计时
    sendOutMessage() {
      if (this.mobelForm.mobile == "") {
        this.$message({
          message: "请输入手机号",
          type: "warning"
        });
        return false;
      }
      if (!myreg.test(this.mobelForm.mobile)) {
        this.$message({
          message: "手机号格式有误请重新输入",
          type: "warning"
        });
        return false;
      }
      this.count--;
      if (this.count == 0) {
        this.count = 60;
        this.btnMessage = "重新发送";
      } else {
        setTimeout(() => {
          this.sendOutMessage();
        }, 1000);
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
        this.$refs.adminLogin.validate(async valid => {
          if (valid) {
            this.loading = true;
            this.login({
              ...this.userPass,
              password: md5(this.userPass.password)
            })
              .then(({ code }) => {
                this.loading = false;
                if (code === "000000") {
                  this.$router.push({ path: this.redirect || "/" });
                }
              })
              .catch(err => {
                this.loading = false;
              });
          }
        });
      } else {
        this.$refs.mobelForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("user/phonelogin", this.mobelForm)
              .then(res => {
                this.$router.push({ path: this.redirect || "/" });
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
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
  }
}
</style>