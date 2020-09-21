<template>
  <div class="min-s">
    <div style="background:#fff">
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <div>名称</div>
            <div>{{form.couponName}}</div>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content">
            <div>优惠券类型</div>
            <div>{{form.used == 1 ? '普通券': '新人券'}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <div>可使用商品</div>
            <div>
              <span v-if="form.couponRange == 1">全场通用</span>
              <span v-if="form.couponRange == 2">指定商品</span>
              <span v-if="form.couponRange == 3">指定分类</span>
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content">
            <div>限领</div>
            <div>{{form.limitedCollar}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <div>优惠形式</div>
            <div>满{{form.withAmount}}减{{form.usedAmount}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <div style="border-right:none;">状态</div>
            <div style="border-right:none;">
              <span v-if="form.status == 1">生效</span>
              <span v-if="form.status == 2">失效</span>
              <span v-if="form.status == 3">已结束</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <div>有效期(开始至结束时间)</div>
            <div>{{form.validStartTime}}至{{form.validEndTime}}</div>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content">
            <div>总发行量</div>
            <div>{{form.quota}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <div>已领取</div>
            <div>{{form.takeCount}}</div>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content">
            <div>待领取</div>
            <div>{{form.notTakeCount}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <div>已使用</div>
            <div>{{form.usedCount}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <div style="border-right:none;">未使用</div>
            <div style="border-right:none;">{{form.noUsedCount}}</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <div>备注</div>
            <div>{{form.remark}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="operator">
      <div>
        <div class="btn-box">
          <el-input
            style="width:200px;"
            class="input-update"
            :size="size"
            maxlength="30"
            show-word-limit
            v-model="listpage.orderCode"
            placeholder="请输入订单编号"
            clearable
          ></el-input>
          <el-select
            @change="getlist"
            v-model="listpage.status"
            placeholder="优惠券状态"
            :size="size"
            clearable
            style="width:150px;margin-left:20px"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in optionsone"
              :key="index"
            ></el-option>
          </el-select>
          <el-button type="primary" @click="getlist" style="margin-left:10px" size="mini">搜索</el-button>
        </div>
        <div class="table-container">
          <el-table :data="list" v-loading="loading">
            <el-table-column prop="nickName" label="领取会员"></el-table-column>
            <el-table-column prop="createTime" label="领取时间"></el-table-column>
            <el-table-column prop="isUsed" label="当前状态">
              <template slot-scope="props">
                <span v-if="props.row.isUsed == 1">未使用</span>
                <span v-if="props.row.isUsed == 2">已使用</span>
                <span v-if="props.row.isUsed == 3">已过期</span>
              </template>
            </el-table-column>
            <el-table-column prop="usedTime" label="使用时间"></el-table-column>
            <el-table-column prop="orderCode" label="订单编码"></el-table-column>
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
import { getcouponsUserList, coupondetail } from "@/api/coupon";
export default {
  data() {
    return {
      form: "",
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
        couponCode: "",
        orderCode: "",
        status: "",
      },
      totalCount: 0,
      loading: true,
      list: [],
    };
  },
  created() {
    // 详情
    if (this.$route.query.couponCode) {
      this.listpage.couponCode = this.$route.query.couponCode;
      this.getDetail();
    }
    this.getlist();
  },
  methods: {
    // 详情
    getDetail() {
      let obj = {
        couponCode: this.$route.query.couponCode,
      };
      coupondetail(obj).then((res) => {
        this.form = res.body;
      });
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
      getcouponsUserList(this.listpage).then((res) => {
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
  min-height: 63vh;
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
.grid-content > div {
  font-size: 12px;
  text-align: center;
  border-right: solid 1px rgb(223, 223, 223);
  border-bottom: solid 1px rgb(223, 223, 223);
}
.grid-content > div:last-of-type {
  height: auto;
  width: auto;
  min-height: 30px;
  line-height: 30px;
}
.grid-content > div:first-of-type {
  width: auto;
  font-weight: bold;
  line-height: 30px;
  min-height: 30px;
  background: #f9f9f9;
}
</style>