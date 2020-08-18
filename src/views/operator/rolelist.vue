<template>
  <div>
    <!-- v-adaptive  -->
    <div class="operator">
      <div>
        <div class="btn-box">
          <el-button type="primary" @click="addrole">增加</el-button>
        </div>
        <el-table :data="list" v-loading="loading" style="width: 100%;height:100%">
          <el-table-column prop="name" label="角色名称"></el-table-column>
          <el-table-column prop="userCount" label="操作员数量"></el-table-column>
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
        <!-- :default-expanded-keys="assignedPermissions"
        :default-checked-keys="assignedPermissions"-->
        <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
          <el-form :model="form" label-width="120px">
            <el-form-item label="角色名称">
              <el-input v-model="form.name" style="width:200px" maxlength="3" show-word-limit></el-input>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item label="配置权限">
              <el-tree
                v-if="dialogFormVisible"
                @check-change="CheckedNodes"
                :default-expanded-keys="assignedPermissions"
                :default-checked-keys="assignedPermissions"
                :data="options"
                show-checkbox
                node-key="id"
                ref="tree"
                highlight-current
                :props="props"
              ></el-tree>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addrole">确 定</el-button>
          </div>
        </el-dialog>
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
  </div>
</template>

<script>
var myreg = /^[1][3,4,5,6,7,8,9,][0-9]{9}$/;
import {
  rolelist,
  deleteRole,
  getRoleAndPermissions,
  saveOrUpdateRole,
} from "@/api/operator";
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
      props: {
        multiple: true,
        label: "name",
        children: "children",
        value: "id",
      },
      listpage: {
        curPage: 1,
        pageSize: 10,
      },
      assignedPermissions: [],
      select: [],
      totalCount: 0,
      loading: true,
      list: [],
      options: [],
      dialogFormVisible: false,
      dTitle: false,
      form: {
        name: "",
        permissions: [],
      },
    };
  },
  created() {
    this.getpermissionuser();
    this.getRoleAndPermissions();
  },
  methods: {
    // 权限
    CheckedNodes(data, checked, indeterminate) {
      this.form.permissions = [];
      this.getPermissions(this.$refs.tree.getCheckedNodes());
    },
    // 处理权限递归
    getPermissions(list) {
      list.forEach((item) => {
        if (item.type != 1) {
          this.form.permissions.push(item.id);
          console.log(this.form.permissions);
        }
      });
    },
    updateuser(row) {
      this.form.name = row.name;
      this.form.id = JSON.stringify(row.id);
      let obj = {
        id: JSON.stringify(row.id),
      };
      getRoleAndPermissions(obj).then((res) => {
        this.assignedPermissions = [];
        this.deplist(res.body.permissions);
        this.form.permissions = this.assignedPermissions;
        this.dialogFormVisible = true;
      });
    },
    deplist(list) {
      list.forEach((item, index) => {
        if (item.isCheck == 1 && item.type != 1) {
          this.assignedPermissions.push(item.id);
        }
        if (item.children.length) {
          this.deplist(item.children);
        }
      });
    },
    permissionsChange(val) {
      this.form.permissions = [];
      val.forEach((el, idx) => {
        el.forEach((item, index) => {
          this.form.permissions.push(item[item.length] - 1);
        });
      });
      console.log(val);
    },
    getRoleAndPermissions() {
      getRoleAndPermissions().then((res) => {
        this.options = res.body.permissions;
        this.makeData(this.options);
        console.log(this.options);
      });
    },
    makeData(options) {
      options.forEach((element, index) => {
        if (element.children.length == 0) {
          delete element.children;
        } else if (element.children.length > 0) {
          this.makeData(element.children);
        }
      });
    },
    addrole() {
      if (!this.dialogFormVisible) {
        this.form.name = "";
        this.dialogFormVisible = true;
        this.assignedPermissions = [];
      } else {
        if (!this.form.name) {
          this.$message({
            type: "error",
            center: true,
            message: "请输入名字",
          });
          return false;
        }
        if (this.form.permissions.length == 0) {
          this.$message({
            type: "error",
            center: true,
            message: "配权限",
          });
          return false;
        }
        saveOrUpdateRole(this.form).then((res) => {
          this.$message({
            type: "success",
            center: true,
            message: "操作成功!",
          });
          this.getpermissionuser();
          this.dialogFormVisible = false;
          console.log(res.body);
        });
      }
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
    getpermissionuser() {
      rolelist(this.listpage).then((res) => {
        this.loading = false;
        this.list = res.body.records;
        this.totalCount = res.body.total;
      });
    },
    deluser(row) {
      this.$confirm("您确定删除角色和角色下边操作员帐号吗", "提示", {
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
        id: row.id,
      };
      deleteRole(obj).then((res) => {
        this.$message({
          type: "success",
          center: true,
          message: "删除成功!",
        });
        this.getpermissionuser();
      });
    },
  },
};
</script>

<style>
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