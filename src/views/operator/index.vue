<template>
  <div>
    <div class="operator">
      <div>
        <div class="btn-box">
          <el-button type="primary" @click="saveOrUpdateUser">增加</el-button>
        </div>
        <el-table :data="list" v-loading="loading" style="width: 100%;height:100%">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="nickName" label="用户名"></el-table-column>
          <el-table-column prop="actualName" label="姓名"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="lastLoginDate" label="最后一次登录"></el-table-column>
          <el-table-column prop="roleName" label="角色名称"></el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="props">
              <el-tooltip class="item light-item" effect="light" placement="top">
                <span slot="content" style="font-size:12px;color:#9d9d9d">编辑</span>
                <i class="el-icon-tickets icon-content" @click="updateuser(props.row)"></i>
              </el-tooltip>
              <el-tooltip class="item light-item" effect="light" placement="top">
                <span slot="content" style="font-size:12px;color:#9d9d9d">删除</span>
                <i class="el-icon-delete icon-content" @click="deluser(props.row)"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <section class="page-box">
          <el-pagination
            v-if="list.length > 0"
            @size-change="handleSizeChange"
            @current-change="changepage"
            layout="sizes,total, prev, pager, next, jumper"
            :page-size="listpage.pageSize"
            :current-page.sync="listpage.curPage"
            :total="totalCount"
            :page-sizes="[10, 20, 30, 50]"
          ></el-pagination>
        </section>
      </div>
    </div>
    <el-dialog :title="dTitle ? '编辑' :'添加角色'" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="100px" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="nickName">
          <el-input v-model.trim="form.nickName" size="mini" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="操作员姓名" prop="actualName">
          <el-input v-model.trim="form.actualName" size="mini" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="操作员密码" prop="password" class="passs">
          <el-input
            v-model.trim="form.password"
            size="mini"
            style="width:300px"
            show-password
            :disabled="disabled && hidenbtn"
          ></el-input>
          <el-button
            type="primary"
            style="margin-left:10px"
            @click="updatePassword"
            v-if="hidenbtn"
            show-word-limit
          >修改密码</el-button>
        </el-form-item>
        <el-form-item label="操作员手机号" prop="phone">
          <el-input v-model.trim="form.phone" size="mini" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="分配角色" prop="roleId">
          <el-select v-model="form.roleId"  placeholder="请选择">
            <el-option v-for="item in select" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
var myreg = /^[1][3,4,5,6,7,8,9,][0-9]{9}$/;
import {
  permissionuser,
  deleteUser,
  saveOrUpdateUser,
  getRoleAndPermissions,
  getRoleListCommon,
  getUserInfo,
} from "@/api/operator";
import md5 from "blueimp-md5";
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
      hidenbtn: false,
      disabled: true,
      rules: {
        nickName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        actualName: [
          { required: true, message: "请输入操作员姓名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, message: "密码最小长度需要大于8位", trigger: "blur" },
          { max: 16, message: "密码最大长度需要小于16位", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请填写手机号", trigger: "blur" },
          {
            validator: EmptyValidator,
            trigger: "blur",
          },
        ],
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
      listpage: {
        curPage: 1,
        pageSize: 10,
      },
      select: [],
      totalCount: 0,
      loading: true,
      list: [],
      dialogFormVisible: false,
      dTitle: false,
      form: {
        nickName: "",
        actualName: "",
        password: "",
        phone: "",
        roleId: "",
      },
    };
  },
  created() {
    this.getpermissionuser();
    this.getgetRoleListCommon();
  },
  methods: {
    updatePassword() {
      this.disabled = false;
      this.form.password = "";
      console.log(document.querySelector(".el-input__suffix"));
    },
    updateuser(row) {
      this.dTitle = true;
      this.disabled = true;
      // this.form.id = row.id;
      let obj = {
        id: row.id,
      };
      getUserInfo(obj).then((res) => {
        res.body.roleId = parseInt(res.body.roleId);
        this.form = res.body;
        this.password = res.body.password;
        this.saveOrUpdateUser(1);
      });
    },
    saveOrUpdateUser(i) {
      if (i == 1) {
        this.hidenbtn = true;
      } else {
        this.hidenbtn = false;
      }
      if (!this.dialogFormVisible) {
        this.$nextTick(() => {
          this.dialogFormVisible = true;
        });
      } else {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let obj = Object.assign({}, this.form, {
              password:
                this.form.password === this.password
                  ? this.password
                  : md5(this.form.password),
            });
            saveOrUpdateUser(obj).then((res) => {
              this.$message({
                type: "success",
                center: true,
                message: "操作成功!",
              });
            });
            this.getpermissionuser();
            this.dialogFormVisible = false;
            this.form = {
              nickName: "",
              actualName: "",
              password: "",
              phone: "",
              roleId: "",
            };
            setTimeout(() => {
              this.$refs.ruleForm.clearValidate();
            }, 0);
            this.dTitle = false;
            this.getList()
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    getgetRoleListCommon() {
      getRoleListCommon().then((res) => {
        this.select = res.body;
      });
    },

    // 翻页
    changepage(page) {
      this.listpage.curPage = page;
      this.getList();
    },
    // 修改页总数
    handleSizeChange(val) {
      this.listpage.pageSize = val;
      this.getList();
    },
    deluser(row) {
      this.$confirm("是否确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deldee(row);
        })
        .catch(() => {});
    },
    deldee(row) {
      let obj = {
        userId: row.id,
      };
      deleteUser(obj).then((res) => {
        this.$message({
          type: "success",
          center: true,
          message: "删除成功!",
        });
        this.getpermissionuser();
      });
    },
    getpermissionuser() {
      permissionuser(this.listpage).then((res) => {
        this.loading = false;
        this.list = res.body.records;
        this.totalCount = res.body.total;
        console.log(res);
      });
    },
  },
};
</script>

<style>
/* .passs .el-input__suffix {
  z-index: -100;
  opacity: 0;
} */
.btn-box {
  padding: 10px;
}
.operator {
  min-height: 100%;
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.operator > div {
  flex: 1;
}
.operator > div:last-of-type {
  flex: 0 0 40px;
}
.icon-content {
  border: solid 1px #efefef;
  border-radius: 2px;
  padding: 4px;
  display: inline-block;
  box-sizing: border-box;
  font-size: 15px;
}
.page-box {
  background-color: #fff;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>