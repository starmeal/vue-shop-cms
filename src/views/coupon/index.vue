<template>
  <div>
    <div class="operator">
      <div>
        <div class="btn-box">
          <el-button type="primary" @click="addcoupon">创建优惠券</el-button>
          <el-input
            style="width: 200px; margin-left: 20px"
            class="input-update"
            :size="size"
            maxlength="30"
            show-word-limit
            v-model="listpage.couponName"
            placeholder="请输入优惠券名称"
            clearable
          ></el-input>
          <el-select
            @change="getlist"
            v-model="listpage.status"
            placeholder="优惠券状态"
            :size="size"
            clearable
            style="width: 150px; margin-left: 20px"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in optionsone"
              :key="index"
            ></el-option>
          </el-select>
          <el-date-picker
            style="margin-left: 20px"
            :size="size"
            v-model="createTime"
            class="timeInput"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="timeChange"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
          <el-button
            type="primary"
            @click="getlist"
            style="margin-left: 10px"
            size="mini"
            >搜索</el-button
          >
          <el-button type="primary" @click="toExper" size="mini"
            >导出</el-button
          >
        </div>
        <div class="table-container">
          <el-table
            :data="list"
            v-loading="loading"
            style="width: 100%; height: 100%"
            height="69.4vh"
          >
            <el-table-column
              prop="validStartTime"
              label="开始时间"
              width="150px"
            ></el-table-column>
            <el-table-column
              prop="validEndTime"
              label="结束时间"
              width="150px"
            ></el-table-column>
            <el-table-column
              prop="couponName"
              label="优惠券名称"
            ></el-table-column>
            <el-table-column prop="userCount" label="类型">
              <template slot-scope="props">{{
                props.row.used == 1 ? "普通券" : "新人券"
              }}</template>
            </el-table-column>
            <el-table-column
              prop="couponForm"
              label="优惠形式"
            ></el-table-column>
            <el-table-column prop="quota" label="总发行量"></el-table-column>
            <el-table-column
              prop="notTakeCount"
              label="待领取量"
            ></el-table-column>
            <el-table-column
              prop="limitedCollar"
              label="限领"
            ></el-table-column>
            <el-table-column prop="couponRange" label="商品范围">
              <template slot-scope="props">
                <span v-if="props.row.couponRange == 1">全场通用</span>
                <span v-if="props.row.couponRange == 2">指定商品</span>
                <span v-if="props.row.couponRange == 3">指定分类</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="props">
                <span v-if="props.row.status == 1">生效</span>
                <span v-if="props.row.status == 2">失效</span>
                <span v-if="props.row.status == 3">已结束</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注">
              <template slot-scope="props">
                <span class="hide-text">{{ props.row.remark }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150px">
              <template slot-scope="props">
                <el-tooltip
                  class="item light-item"
                  effect="light"
                  placement="top"
                  v-if="props.row.status == 2"
                >
                  <span slot="content" style="font-size: 12px; color: #9d9d9d"
                    >编辑</span
                  >
                  <i
                    class="el-icon-edit icon-content"
                    @click="addcoupon(props.row)"
                  ></i>
                </el-tooltip>
                <el-tooltip
                  class="item light-item"
                  effect="light"
                  placement="top"
                  v-if="props.row.status != 1"
                >
                  <span slot="content" style="font-size: 12px; color: #9d9d9d"
                    >删除</span
                  >
                  <i
                    class="el-icon-delete icon-content"
                    @click="delcop(props.row)"
                  ></i>
                </el-tooltip>
                <el-tooltip
                  class="item light-item"
                  effect="light"
                  placement="top"
                  v-if="props.row.status != 3"
                >
                  <span
                    slot="content"
                    style="font-size: 12px; color: #9d9d9d"
                    v-if="props.row.status != 3"
                    >{{ props.row.status == 1 ? "失效" : "生效" }}</span
                  >
                  <i
                    class="el-icon-refresh icon-content"
                    @click="getupdateCouponsStatus(props)"
                  ></i>
                </el-tooltip>
                <el-tooltip
                  class="item light-item"
                  effect="light"
                  placement="top"
                >
                  <span slot="content" style="font-size: 12px; color: #9d9d9d"
                    >查看</span
                  >
                  <i
                    class="el-icon-picture-outline icon-content"
                    @click="golook(props.row)"
                  ></i>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
  queryCouponList,
  fakeDeleteCupons,
  updateCouponsStatus,
  exportCouponsList,
} from "@/api/coupon";
export default {
  data() {
    return {
      createTime: [],
      optionsone: [
        {
          value: "1",
          label: "生效",
        },
        {
          value: "2",
          label: "失效",
        },
        {
          value: "3",
          label: "已结束",
        },
      ],
      size: "mini",
      listpage: {
        curPage: 1,
        pageSize: 10,
        couponName: "",
        status: "",
        validStartTime: "",
        validEndTime: "",
      },
      totalCount: 0,
      loading: true,
      list: [],
      options: [],
    };
  },
  created() {
    this.getlist();
  },
  watch: {
    "listpage.curPage": function (newVal, oldVal) {
      console.log(newVal, oldVal, "oldValoldValoldVal");
    },
  },
  methods: {
    golook(row) {
      this.$router.push({
        path: "/couponLook",
        query: {
          couponCode: row.couponCode ? row.couponCode : "",
        },
      });
    },
    toExper() {
      exportCouponsList(this.listpage).then((res) => {});
    },
    getupdateCouponsStatus(props) {
      this.$confirm("是否确定当前操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = {
            couponCode: props.row.couponCode,
            status: props.row.status == 1 ? 2 : 1,
          };
          updateCouponsStatus(obj).then((res) => {
            this.list[props.$index].status = obj.status;
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          });
        })
        .catch(() => {});
    },
    delcop(row) {
      let obj = {
        couponCode: row.couponCode,
      };
      this.$confirm("是否删除此优惠券?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          fakeDeleteCupons(obj).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.totalCount--;
            this.$nextTick(() => {
              this.getlist();
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addcoupon(row) {
      this.$router.push({
        path: "/couponForm",
        query: {
          couponCode: row.couponCode ? row.couponCode : "",
        },
      });
    },
    //时间选择器
    timeChange(val) {
      if (!val) {
        this.listpage.validStartTime = "";
        this.listpage.validEndTime = "";
      } else {
        this.listpage.validStartTime = val[0];
        this.listpage.validEndTime = val[1];
      }
      this.getlist();
    },
    // 翻页
    changepage(page) {
      this.listpage.curPage = page;
      this.getlist();
    },
    // 修改页总数
    handleSizeChange(val) {
      this.listpage.pageSize = val;
      this.getlist();
    },
    getlist() {
      queryCouponList(this.listpage).then((res) => {
        this.loading = false;
        this.list = res.body.records;
        this.totalCount = res.body.total;
      });
    },
  },
};
</script>

<style>
.btn-box {
  padding: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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
  cursor: pointer;
}
.page-box {
  background-color: #fff;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hide-text {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>