<template>
  <div class="merchants-container" ref="merchantsContainer">
    <section ref="merchantslabel">
      <div class="operation-container">
        <section class="flex-top">
          <div class="felx-top-btn">
            <el-button :round="false" type="primary" :size="size" @click="goadd(1)">添加银行卡</el-button>
            <el-button :round="false" type="primary" :size="size" @click="goadd(2)">添加对公账户</el-button>
          </div>
        </section>
      </div>
    </section>
    <section class="table-container">
      <!-- v-loading="tableloading" -->
      <!-- height="100px"
      v-adaptive-->
      <el-table ref="noticeTable" :size="size" :data="list" style="width:100%">
        <el-table-column label="序号" prop="create_time">
          <template slot-scope="props">{{props.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="类别">
          <template slot-scope="props">{{props.row.bankName || '对公'}}</template>
        </el-table-column>
        <el-table-column label="卡号" width="170px">
          <template slot-scope="props">{{props.row.account}}</template>
        </el-table-column>
        <el-table-column prop="actualName" label="持卡人"></el-table-column>
        <el-table-column prop="mobile" label="预留手机号"></el-table-column>
        <el-table-column prop="display_end_time" label="默认">
          <template slot-scope="props">
            <el-switch
              v-model="props.row.isDefault"
              active-color="#44abf7"
              inactive-color="#a7a5a6"
              active-value="1"
              inactive-value="0"
              size="mini"
              @change="(val)=>{
                defaultChange(val,props.row)
              }"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="props">
            <div class="flex-btn">
              <el-tooltip class="item light-item" effect="light" placement="top">
                <span slot="content" style="font-size:12px;color:#9d9d9d">删除</span>
                <i class="el-icon-delete icon-content" @click="delgoods(props.row)"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <el-dialog title="提示" :visible.sync="dialogVisibledel" width="30%" :before-close="handleClose">
      <span>您确定要删除此银行卡么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibledel = false">取 消</el-button>
        <el-button type="primary" @click="delgoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { bankCardList, deleteBankCard, updateBankCard } from "@/api/bank";
export default {
  data() {
    return {
      dialogVisibledel: false,
      goodsName: "",
      dialogVisible: false,
      dialogFormVisible: false,
      tableloading: true,
      list: [],
      searchLoading: false,
      size: "mini",
      totalCount: "",
      row: "",
      rowname: "",
      delrow: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    defaultChange(val, row) {
      row.account;
      let obj = {
        account: row.account,
        isDefault:val
      };
      updateBankCard(obj).then((res) => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.getList();
      });
    },
    goadd(index) {
      this.$router.push({
        path: index == 1 ? "/addbank" : "/addbas",
      });
    },
    handleClose() {
      this.row = "";
      this.rowname = "";
      this.delrow = "";
      this.dialogVisibledel = false;
      this.dialogVisible = false;
      this.dialogFormVisible = false;
    },
    delgoods(row) {
      if (this.dialogVisibledel) {
        let obj = {
          id: this.delrow.id,
        };
        deleteBankCard(obj).then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.dialogVisibledel = false;
          this.delrow = "";
          this.getList();
        });
      } else {
        this.delrow = row;
        this.dialogVisibledel = true;
      }
    },
    // 请求列表
    async getList() {
      this.tableloading = true;
      let res = await bankCardList();
      this.searchLoading = false;
      this.tableloading = false;
      this.list = res.body;
    },
  },
};
</script>
<style scoped lang="scss">
.flex-top {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mini-flex {
  display: flex;
  align-items: center;
}
.btn-box {
  background: #fff;
  padding-top: 20px;
  padding-bottom: 5px;
}
.text-ee {
  color: #666666;
  font-size: 12px;
  display: inline-block;
  margin-right: 10px;
  margin-left: 10px;
}
.yichu {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.page-box {
  background-color: #fff;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.merchants-container {
  background-color: #fff;
  padding: 20px 30px;
  box-sizing: border-box;
  min-height: 100%;
  position: relative;
}
.num-container {
  padding: 10px;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
}
.el-input-s {
  width: 200px;
}
.operation-container {
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.table-container {
  border-top: 10px solid #ffffff;
  width: 100%;
}
.count-num {
  display: inline-block;
  padding: 10px;
  border: solid 1px #f0f0f0;
  font-size: 15px;
  color: #333;
  margin-right: 10px;
  display: flex;
  min-width: 20%;
}
.count-num i {
  font-size: 30px;
  margin-right: 10px;
}
.icon-1 {
  color: #409eff;
}
.icon-2 {
  color: #409eff;
}
.icon-3 {
  color: #409eff;
}
.ovhdien {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn-search {
  border-radius: 0px;
  margin-left: 20px;
}
.icon-content {
  border: solid 1px #efefef;
  border-radius: 2px;
  padding: 4px;
  display: inline-block;
  box-sizing: border-box;
  font-size: 12px;
}
.flex-btn {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.zhuangtai {
  // color: $primary;
}
.ossd {
  position: absolute;
  top: 129px;
  width: 100%;
  height: 10px;
  background: #fcc;
  z-index: 1000;
}
.top-fixed {
  width: 69%;
  height: 35px;
  left: 18%;
  z-index: -100;
  background: #fcc;
  position: fixed;
  top: 129px;
}
.felx-top-btn {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.felx-top-btn .el-button {
  flex: 1;
}
</style>