<template>
  <div class="big-container">
    <section class="form-container">
      <div style="height:20px"></div>
      <el-form ref="form" :rules="rules" :size="size" :model="form" label-width="150px">
        <el-form-item label="企业名称" prop="companyName">
          <el-input
            v-model.trim="form.companyName"
            style="width:350px;margin-right:20px"
            placeholder="企业名称"
            maxlength="30"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="账户" prop="account">
          <el-input
            placeholder="账户"
            v-model.trim="form.account"
            style="width:350px;margin-right:20px"
            @input="(val)=>{
                nospace1('account',val)
              } "
          ></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="opening">
          <el-input
            placeholder="开户行"
            style="width:350px;margin-right:20px"
            v-model.trim="form.opening"
          ></el-input>
        </el-form-item>
        <el-form-item label="分行" prop="branch">
          <el-input
            placeholder="分行"
            style="width:350px;margin-right:20px"
            v-model.trim="form.branch"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :size="size" type="primary" @click="submitgoods()">保存</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { saveBankCard } from "@/api/bank";
export default {
  data() {
    return {
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
        account: [
          { required: true, message: "请填写银行账户", trigger: "blur" },
          { min: 16, max: 30, message: "账户位数不正确", trigger: "blur" },
        ],
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        opening: [{ required: true, message: "请输入开户行", trigger: "blur" }],
        branch: [{ required: true, message: "请输入分行", trigger: "blur" }],
      },
      form: {
        account: "",
        companyName: "",
        branch: "",
        opening: "",
        bankType: "1",
      },
    };
  },
  created() {
    if (this.$route.query.id) {
      let obj = {
        id: this.$route.query.id,
      };
      selectShopMerchantsNoticeById(obj).then((res) => {
        this.form = res.body;
      });
    }
  },
  methods: {
    nospace1(type, val) {
      this.form[type] = val.replace(/[^\d.]/g, "");
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
