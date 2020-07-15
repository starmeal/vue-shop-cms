<template>
  <div class='hs-login'>
    <div class="hs-login-container">
      <div class='action-container'>
        <div :class='["action-item", {"is-active": isActive == 1}]' @click='() => isActive = 1'>账号密码登录</div>
        <div :class='["action-item", {"is-active": isActive == 2}]' @click='() => isActive = 2'>短信登录</div>
      </div>
      <el-form class='login-con' :model='userPass' :rules='userRules' ref='adminLogin'>
        <el-form-item class='login-user-con' prop='username'>
          <el-input v-model="userPass.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item class='login-user-con' prop='password'>
          <el-input v-model="userPass.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-button type="primary" class='submit' @click='adminLogin' :loading='loading'>登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { adminLogin } from '@/api/login';
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState } = createNamespacedHelpers('user');
import md5 from 'blueimp-md5';
export default {
  data() {
    return {
      loading: false,
      isActive: 1,
      userPass: {
        username: '',
        password: ''
      },
      userRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            min: 6,
            message: '密码长度不能小于6位',
            trigger: 'blur'
          }
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
    ...mapActions(['login']),
    adminLogin() {
      this.$refs.adminLogin.validate(async valid => {
        this.loading = true;
        if (valid) {
          this.login({
            ...this.userPass,
            password: md5(this.userPass.password)
          }).then(({ code }) => {
            this.loading = false;
            if (code === '000000') {
              this.$router.push({ path: this.redirect || '/' });
            }
          }).catch(err => {
            this.loading = false;
          })
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.hs-login {
  width: 100%;
  height: 100%;
  background: #0b8aff;
  .hs-login-container {
    box-sizing: border-box;
    padding: 26px 42px;
    width: 443px;
    height: 420px;
    background: rgba(255, 255, 255, 1);
    border-radius: 11px;
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    .action-container {
      width: 100%;
      height: 70px;
      display: flex;
      margin-bottom: 42px;
      .action-item {
        position: relative;
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25px;
        font-family: Microsoft YaHei;
        color: rgba(26, 26, 26, 1);
        &::after {
          content: ' ';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          background: #e7e7e7;
          width: 100%;
        }
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
}
</style>