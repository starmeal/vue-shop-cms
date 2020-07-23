<template>
  <div class="merchants-container" ref="merchantsContainer">
    <section ref="merchantslabel">
      <div class="operation-container">
        <section class="flex-top">
          <div>
            <el-button
              :round="false"
              type="primary"
              @click="gomodify('')"
              icon="el-icon-plus"
              :size="size"
            >添加公告</el-button>
            <el-button :round="false" type="primary" :size="size" @click="stopall">停止</el-button>
            <el-button :round="false" type="primary" :size="size" @click="delall">删除</el-button>
          </div>
          <div class="mini-flex">
            <el-input
              clearable
              @change="searchlist"
              v-model="listpage.noticeName"
              placeholder="请输入公告标题"
              :size="size"
              class="el-input-s"
            ></el-input>
            <el-date-picker
              :size="size"
              value-format="yyyy-MM-dd"
              v-model="value1"
              @change="changepicker"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-button
              :loading="searchLoading"
              :size="size"
              type="primary"
              class="btn-search"
              @click="searchlist"
            >搜索</el-button>
          </div>
        </section>
      </div>
    </section>
    <section class="table-container">
      <el-table
        ref="multipleTable"
        :size="size"
        :data="list"
        @select="tableSelect"
        @select-all="tableSelect"
        v-loading="tableloading"
        style="width:100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="notice_name" label="公告标题">
          <template slot-scope="props">
            <el-popover
              placement="top-start"
              width="200"
              trigger="hover"
              :content="props.row.notice_name"
            >
              <div class="yichu" slot="reference">{{ props.row.notice_name }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="公告创建时间" prop="create_time"></el-table-column>
        <el-table-column label="公告开始时间">
          <template slot-scope="props">
            <span>{{ props.row.display_begin_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="display_end_time" label="公告结束时间"></el-table-column>
        <el-table-column prop="display_end_time" label="发布状态" width="100px">
          <template slot-scope="props">
            <span v-if="props.row.publish_status == 1" class="zhuangtai">未发布</span>
            <span v-if="props.row.publish_status == 2" class="zhuangtai">已发布</span>
            <span v-if="props.row.publish_status == 3" class="zhuangtai">已停止</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="props">
            <div class="flex-btn">
              <el-tooltip class="item light-item" effect="light" placement="top">
                <span slot="content" style="font-size:12px;color:#9d9d9d">编辑</span>
                <i class="el-icon-edit icon-content" @click="gomodify(props.row)"></i>
              </el-tooltip>
              <el-tooltip
                class="item light-item"
                effect="light"
                placement="top"
                v-if="props.row.publish_status == 3 || props.row.publish_status == 1"
              >
                <span slot="content" style="font-size:12px;color:#9d9d9d">发布</span>
                <i class="el-icon-circle-check icon-content" @click="operation(props.row,2)"></i>
              </el-tooltip>
              <el-tooltip
                class="item light-item"
                effect="light"
                placement="top"
                v-if="props.row.publish_status == 2"
              >
                <span slot="content" style="font-size:12px;color:#9d9d9d">停止</span>
                <i class="el-icon-circle-close icon-content" @click="operation(props.row,2)"></i>
              </el-tooltip>
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
      <span>您确定要删除此公告吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibledel = false">取 消</el-button>
        <el-button type="primary" @click="delgoods">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改名称" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input :size="size" v-model="goodsName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifygoodsname">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectShopMerchantsNotice,
  deleteShopMerchantsNoticeById,
  announcement,
  batchDeleteShopMerchantsNoticeByIds,
  batchStopShopMerchantsNoticeByIds
} from "@/api/Notice";
export default {
  data() {
    return {
      value1: "",
      dialogVisibledel: false,
      goodsName: "",
      formLabelWidth: "100",
      dialogVisible: false,
      dialogFormVisible: false,
      tableloading: true,
      tableHeight: "",
      list: [],
      searchLoading: false,
      size: "mini",
      totalCount: "",
      listpage: {
        curPage: 1,
        pageSize: 10,
        noticeName: "",
        startTime: "",
        endTime: ""
      },
      row: "",
      rowname: "",
      delrow: "",
      selectarr: [],
      selectarr1: [],
      selectarr2: [],
      arrlist: []
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    // 批量停止
    stopall() {
      let obj = {
        ids: this.arrlist.join(",")
      };
      batchStopShopMerchantsNoticeByIds(obj).then(res => {
        this.$message({
          showClose: true,
          message: "操作成功",
          type: "success"
        });
        this.arrlist = [];
        this.getList();
      });
    },
    // 批量删除
    delall() {
      let obj = {
        ids: this.arrlist.join(",")
      };
      batchDeleteShopMerchantsNoticeByIds(obj).then(res => {
        this.$message({
          showClose: true,
          message: "操作成功",
          type: "success"
        });
        this.arrlist = [];
        this.getList();
      });
    },
    // 用户勾选
    del() {
      this.listpage = {
        curPage: 1,
        pageSize: 10,
        noticeName: "",
        startTime: "",
        endTime: ""
      };
      this.value1 = "";
      this.getList();
    },
    // 发布或者停止
    operation(row, idx) {
      let obj = {
        id: row.id,
        publishStatus: idx
      };
      announcement(obj).then(res => {
        if (res.code === "000000") {
          this.$message({
            showClose: true,
            message: "操作成功",
            type: "success"
          });
          this.getList();
        }
      });
    },
    tableSelect(selection, row) {
      selection.forEach(element => {
        this.arrlist.push(element.id);
      });
      console.log(selection, row);
    },
    changepicker(e) {
      if (e) {
        this.listpage.startTime = e[0];
        this.listpage.endTime = e[1];
      } else {
        this.listpage.startTime = "";
        this.listpage.endTime = "";
      }
      this.getList();
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
          id: this.delrow.id
        };
        deleteShopMerchantsNoticeById(obj).then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
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
    modifygoodsname(row) {
      if (this.dialogFormVisible) {
        let obj = {
          goodsCode: this.rowname.goods_code,
          goodsName: this.goodsName
        };
        updateGoodsName(obj).then(res => {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialogFormVisible = false;
          this.rowname = "";
          this.getList();
        });
      } else {
        this.rowname = row;
        this.goodsName = this.rowname.goods_name;
        this.dialogFormVisible = true;
      }
    },
    gomodify(row) {
      let obj = {
        path: "/notice"
      };
      if (row != "") {
        obj.query = {
          id: row.id
        };
      }
      this.$router.push(obj);
    },
    // 修改
    goupdate(row) {
      this.$router.push({
        path: "/coupon/ccform",
        query: {
          id: row.id
        }
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
    // 条件筛选
    searchlist() {
      this.listpage.curPage = 1;
      this.searchLoading = true;
      this.getList();
    },
    // 请求列表
    async getList() {
      this.tableloading = true;
      let listpage = Object.assign({}, this.listpage, {
        noticeName: this.listpage.noticeName.trim()
      });
      let res = await selectShopMerchantsNotice(listpage);
      this.searchLoading = false;
      this.tableloading = false;
      this.list = res.body;
    }
  }
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
.sa {
  width: 100%;
  height: 480px;
  left: 0;
  bottom: 0;
  position: fixed;
  background-color: #fcc;
  z-index: 1000;
}
.merchants-container {
  background-color: #fff;
  padding: 20px 30px;
  box-sizing: border-box;
  min-height: 100%;
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
.zhuangtai{
  color: $primary;
}
</style>