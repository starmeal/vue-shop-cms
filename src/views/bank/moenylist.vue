<template>
  <div class="merchants-container" ref="merchantsContainer">
    <section ref="merchantslabel">
      <div class="operation-container">
        <el-form ref="form" :size="size" label-width="70px">
          <el-form-item label="申请时间">
            <p class="orderTime">
              <el-date-picker
                :size="size"
                v-model="createTime"
                class="timeInput"
                type="datetimerange"
                range-separator="至"
                start-placeholder="起始时间"
                end-placeholder="结束时间"
                @change="timeChange"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
              <el-button type="primary" plain @click="today" style="margin-left:20px">今天</el-button>
              <el-button type="primary" plain @click="yesterday">昨天</el-button>
              <el-button type="primary" plain @click="lastSeven">最近7天</el-button>
              <el-button type="primary" plain @click="lastThirty">最近30天</el-button>
            </p>
          </el-form-item>
          <el-form-item label="提现状态">
            <p class="orderTime">
              <el-select v-model="listpage.auditResult" clearable @change="searchChange">
                <el-option
                  v-for="(item, index) in orderArr"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </p>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="primary" @click="getList" style="margin-left:10px">筛选</el-button>
      </div>
    </section>
    <div class="felx-dd">
      <section class="table-container">
        <el-table
          v-loading="tableloading"
          ref="noticeTable"
          :size="size"
          :data="list"
          height="100%"
          style="width:100%;"
        >
          <el-table-column label="申请时间" prop="create_time" width="150px">
            <template slot-scope="props">{{props.row.createTime}}</template>
          </el-table-column>
          <el-table-column label="提现金额">
            <template slot-scope="props">{{props.row.balancesCash}}（元）</template>
          </el-table-column>
          <el-table-column label="实收金额">
            <template slot-scope="props">{{props.row.toCost}}（元）</template>
          </el-table-column>
          <el-table-column prop="wechatDeduction" label="微信扣点0.6%" width="100px"></el-table-column>
          <el-table-column prop="bankCardHandlingFee" label="提现到银行卡手续费1%" width="150px"></el-table-column>
          <el-table-column prop="withdrawInformation" label="提现至" width="190px">
            <template slot-scope="props">{{props.row.withdrawInformation || '--'}}</template>
          </el-table-column>
          <el-table-column prop="auditTime" label="审核时间">
            <template slot-scope="props">{{props.row.auditTime || '--'}}</template>
          </el-table-column>
          <el-table-column prop="auditResult" label="提现状态"></el-table-column>
        </el-table>
      </section>
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
</template>

<script>
import { withdrawalList } from "@/api/bank";
import { formatDate, multiply } from "@/utils/util";
export default {
  data() {
    return {
      createTime: "",
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
      listpage: {
        curPage: 1,
        pageSize: 10,
        auditResult: "",
        beginTimeStr: "",
        endTimeStr: "",
      },
      orderArr: [
        {
          value: "1",
          label: "审核中",
        },
        {
          value: "2",
          label: "通过",
        },
        {
          value: "3",
          label: "拒绝",
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    searchChange() {
      this.getList();
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
    today() {
      const start = new Date(
        new Date(new Date().toLocaleDateString()).getTime()
      );
      const end = new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1
      );
      this.createTime = [start, end];
      this.listpage.beginTimeStr = formatDate(start);
      this.listpage.endTimeStr = formatDate(end);
    },
    //时间选择器
    timeChange(val) {
      if (!val) {
        this.listpage.beginTimeStr = "";
        this.listpage.endTimeStr = "";
      } else {
        this.listpage.beginTimeStr = val[0];
        this.listpage.endTimeStr = val[1];
      }
      this.getList();
    },
    //昨天按钮
    yesterday() {
      const start = new Date(
        new Date(new Date().toLocaleDateString()).getTime() - 3600 * 1000 * 24
      );
      const end = new Date(
        new Date(new Date().toLocaleDateString()).getTime() -
          3600 * 1000 * 24 +
          24 * 60 * 60 * 1000 -
          1
      );
      this.createTime = [start, end];
      this.listpage.beginTimeStr = formatDate(start);
      this.listpage.endTimeStr = formatDate(end);
    },
    //最近7天按钮
    lastSeven() {
      const start = new Date(
        new Date(new Date().toLocaleDateString()).getTime() -
          3600 * 1000 * 24 * 7
      );
      const end = new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1
      );
      this.createTime = [start, end];
      this.listpage.beginTimeStr = formatDate(start);
      this.listpage.endTimeStr = formatDate(end);
    },
    //最近30天按钮
    lastThirty() {
      const start = new Date(
        new Date(new Date().toLocaleDateString()).getTime() -
          3600 * 1000 * 24 * 30
      );
      const end = new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1
      );
      this.createTime = [start, end];
      this.listpage.beginTimeStr = formatDate(start);
      this.listpage.endTimeStr = formatDate(end);
    },
    // 请求列表
    async getList() {
      this.tableloading = true;
      let res = await withdrawalList(this.listpage);
      this.tableloading = false;
      let { records, total } = res.body;
      this.list = records;
      this.totalCount = total;
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
  flex: 0 0 40px;
}
.felx-dd {
  display: flex;
  height: 79%;
  flex-direction: column;
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
  flex: 1;
  height: 100%;
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