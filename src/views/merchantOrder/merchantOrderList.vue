<template>
  <div>
    <div class="containers">
      <div class="innerContainer">
        <div ref="forms" class="forms">
          <el-form ref="form" :model="form" :size="size" label-width="70px">
            <el-form-item label="订单搜索">
              <el-select v-model="form.orderId" clearable>
                <el-option
                  v-for="(item, index) in orderArr"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
              <el-input
                style="margin-left: 20px;"
                clearable
                class="inputStyle"
                v-model="form.order"
              ></el-input>
            </el-form-item>
            <el-form-item label="下单时间">
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
                <el-button type="primary" plain @click="today">今天</el-button>
                <el-button type="primary" plain @click="yesterday">昨天</el-button>
                <el-button type="primary" plain @click="lastSeven">最近7天</el-button>
                <el-button type="primary" plain @click="lastThirty">最近30天</el-button>
              </p>
            </el-form-item>
            <p class="orderTime">
              <el-form-item label="商品名称">
                <el-input
                  clearable
                  class="inputStyle"
                  placeholder="请输入商品名称"
                  v-model="form.goodsName"
                ></el-input>
              </el-form-item>
              <el-form-item label="订单状态">
                <el-select v-model="form.orderStatus" clearable placeholder="全部">
                  <el-option
                    v-for="(item, index) in orderStatusArr"
                    :label="item.label"
                    :value="item.value"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="售后状态">
                <el-select v-model="form.serviceStatus" clearable placeholder="全部">
                  <el-option
                    v-for="(item, index) in serviceStatusArr"
                    :label="item.label"
                    :value="item.value"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </p>
            <p>
              <el-button
                style="margin-left:10px;"
                icon="el-icon-search"
                :loading="searchLoading"
                :size="size"
                type="primary"
              >筛选</el-button>
              <el-button style="margin-left:20px;" :size="size" @click="exportList">导出</el-button>
            </p>
          </el-form>
        </div>
        <p class="retrievalList">
          <span
            :class="{active: index===isTrue}"
            @click="tabRetrieval(index)"
            v-for="(item,index) in retrievalList"
            :key="index"
          >{{item}}</span>
        </p>
        <section class="table-container" ref="table">
          <table style="width:100%; border-collapse: collapse; border: none;table-layout:fixed">
            <tr style="width:100%" class="header-tr">
              <td style="width:50%">
                <div class="header-flex">
                  <section>商品</section>
                  <section>单价（元）/数量</section>
                </div>
              </td>
              <td style="width:10%">售后</td>
              <td style="width:10%">买家/收货人</td>
              <td style="width:10%">配送方式</td>
              <td style="width:10%">订单状态</td>
              <td style="width:10%">操作</td>
            </tr>
          </table>
          <div class="mock-table" v-for="(its, index) in list" :key="index">
            <div style="width:100%;position: relative;">
              <span
                style="margin-right:30px;margin-left:18px;font-size:12px;"
              >订单号：{{ its.orderCode }}</span>
              <span
                style="margin-right:30px;margin-left:18px;font-size:12px;"
              >订单时间：{{ its.createTime }}</span>
              <span
                style="margin-right:30px;margin-left:18px;font-size:12px;"
              >订单时间：微信/微信支付</span>
              <p class="detail" @click="goOrderdetail(its)">查看详情</p>
            </div>
            <table
              border="1"
              cellspacing="0"
              cellpadding="0"
              style="width:100%; border-collapse: collapse; border: none;table-layout:fixed"
            >
              <tr class="tspi" style="width:100%">
                <td style="width:50%">
                  <section class="flex-box" v-for="(item, idx) in its.detail" :key="idx">
                    <img class="thumbImg" :src="item.thumbImg.split(',')[0]" />
                    <div class="product-name">
                      <p class="thumbImg-right">{{ item.productName }}</p>
                      <div
                        style="margin-left:10px;margin-top:10px"
                        v-show="item.goodsSku"
                      >{{item.goodsSku}}</div>
                    </div>
                    <div style="padding:0 20px;text-align: center;">
                      <div>{{ item.payPrice / 100 }}</div>
                      <div>{{ item.number }}件</div>
                    </div>
                  </section>
                </td>
                <td style="width:10%"></td>
                <td style="width:10%">
                  <p class="qusibaps">{{ its.nickName }}</p>
                  <p class="qusibap">{{ its.mobile }}</p>
                </td>
                <td style="width:10%">
                  <p class="qusibap" @click="goOrderdetail(its)">详情</p>
                </td>
                <td style="width:10%">
                  <p class="qusibap">{{ its.orderStatusText }}</p>
                </td>
                <td style="width:10%">
                  <p
                    class="qusibap"
                    @click="goOrderdetail(its, 'address')"
                    style="color:#44abf7;SC;cursor: pointer;font-size:12px"
                    v-if="its.orderStatus == 2"
                  >修改地址</p>
                  <!-- <p
                    class="qusibap poiner"
                    @click="goOrderdetail(its, 'goods')"
                    style="font-weight:600;color:green"
                    v-if="its.orderStatus == 2"
                  >
                    <el-button size="mini" type="primary" round style="color:#fff">发货</el-button>
                  </p>
                  <p
                    class="poiner"
                    @click="goOrderdetail(its, 'price')"
                    style="font-weight:600;color:#ff0000"
                    v-if="its.orderStatus == 1"
                  >修改价格</p>-->
                </td>
              </tr>
            </table>
          </div>
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
      <el-dialog title="发货" :visible.sync="examine" width="600px">
        <el-form :model="dialogForm" ref="dialogForm">
          <el-form-item label="联系人 :" label-width="80px" prop="contact">
            <el-input
              class="inputStyle1"
              :size="size"
              v-model="dialogForm.contact"
              placeholder="请填写联系人姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系方式 :" label-width="80px" prop="contact">
            <el-input
              class="inputStyle1"
              :size="size"
              v-model="dialogForm.phone"
              placeholder="请填写手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="座机 :" label-width="80px" prop="contact">
            <el-input
              class="inputStyle2"
              :size="size"
              v-model="dialogForm.phone"
              placeholder="请填写区号"
            ></el-input>
            <el-input
              class="inputStyle2"
              :size="size"
              v-model="dialogForm.phone"
              placeholder="请填写座机号"
            ></el-input>
            <el-input
              class="inputStyle2"
              :size="size"
              v-model="dialogForm.phone"
              placeholder="分机号(选填)"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系地址 :" label-width="80px" prop="contact"></el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getMerShopOrderList } from "@/api/merchantOrder";
export default {
  name: "merchantOrderList",
  data() {
    return {
      size: "mini",
      tableHeight: "",
      createTime: "",
      examine: false,
      searchLoading: false,
      isTrue: 0, //检索按钮样式
      retrievalList: [
        "全部",
        "待付款",
        "代发货",
        "已发货",
        "已完成",
        "已关闭",
        "售后中",
      ],
      listType: [
        "商品",
        "单价(元)/数量",
        "售后",
        "买家/收货人",
        "配送方式",
        "实收金额(元)",
        "订单状态",
        "操作",
      ],
      orderArr: [
        {
          value: 0,
          label: "订单编号",
        },
        {
          value: 1,
          label: "收货人姓名",
        },
        {
          value: 2,
          label: "买家手机号",
        },
      ],
      orderStatusArr: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "待付款",
        },
        {
          value: 2,
          label: "代发货",
        },
        {
          value: 3,
          label: "已发货",
        },
        {
          value: 4,
          label: "已完成",
        },
        {
          value: 5,
          label: "已关闭",
        },
        {
          value: 6,
          label: "售后中",
        },
      ],
      serviceStatusArr: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "售后中",
        },
        {
          value: 2,
          label: "售后结束",
        },
      ],
      form: {
        orderId: "",
        order: "",
        startTime: "",
        endTime: "",
        goodsName: "",
        orderStatus: 0,
        serviceStatus: 0,
        pageSize: 10,
        curPage: 1,
      },
      dialogForm: {
        contact: "",
        phone: "",
      },
      list: [],
      listpage: {
        curPage: 1,
        pageSize: 10,
        shopMerchantsCode: "",
        orderStatus: "",
        afterSaleStatus: "",
        orderCode: "",
        custName: "",
        userTel: "",
        productName: "",
        createTimeBegin: "",
        createTimeEnd: "",
      },
      totalCount: 0,
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      getMerShopOrderList(this.listpage).then((res) => {
        this.searchLoading = false;
        this.tableloading = false;
        let { records, total } = res.body;
        this.list = records;
        this.totalCount = total;
      });
    },
    //今天按钮
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
    },
    // 翻页
    changepage(page) {
      var oOverScroll = this.$refs.table;
      oOverScroll.scrollTop = 0;
      console.log();
      this.listpage.curPage = page;
      this.getList();
    },
    // 修改页总数
    handleSizeChange(val) {
      this.listpage.pageSize = val;
      this.getList();
    },
    //时间选择器
    timeChange(val) {
      console.log(val);
    },
    tabRetrieval(index) {
      this.isTrue = index;
    },
    exportList() {
      if (this.createTime == "" || this.createTime == null) {
        this.$message({
          message: "请选择下单起止时间",
          type: "success",
        });
        return false;
      }
    },
    sendGoods() {
      if (this.examine == false) {
        this.examine = true;
      }
    },
  },
};
</script>
<style scoped>
.header-flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 10px;
  box-sizing: border-box;
}
.forms {
  margin-bottom: 20px;
}
table {
  font-size: 12px;
}
.product-name {
  flex: 1;
}
.poiner {
  cursor: pointer;
  text-align: center;
}
.select-section {
  display: flex;
}
.select-section div {
  font-size: 12px;
  font-weight: 500;
  padding-right: 5px;
  cursor: pointer;
}
.select-section span {
  font-size: 12px;
  font-weight: 500;
  margin-right: 15px;
  padding-right: 15px;
  border-right: solid 1px #bfbfbf;
  cursor: pointer;
}
.select-section span:last-of-type {
  border: none;
}
.select-section .class-a {
  color: #ff0000;
}
.mock-table > div {
  padding: 10px 0px;
  background: #ebebeb;
  font-size: 12px;
}
ul,
p {
  margin: 0;
  padding: 0;
}

.fkex-ul {
  width: 100%;
  align-items: center;
  font-size: 14px;
  height: auto;
}
.fkex-ul li {
  height: 100%;
  border-right: 1px solid #eee;
  padding: 0 10px;
  display: inline-block;
  box-sizing: border-box;
}
.flex-header {
  height: 50px;
  line-height: 50px;
}
.flex-header li {
  line-height: 50px;
  text-align: center;
}
ul li {
  list-style: none;
}
.flex-box {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 10px 0px 10px 20px;
  border-bottom: solid 1px #d5d5d5;
}
.flex-box:last-of-type {
  border-bottom: none;
}
.qusibap {
  padding: 5px;
  text-align: center;
  font-size: 13px;
  font-family: PingFang SC;
  color: rgba(51, 51, 51, 1);
}
.qusibaps {
  padding: 5px;
  text-align: center;
  font-size: 13px;
  font-family: PingFang SC;
  color: rgba(51, 51, 51, 1);
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mock-table {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
}
.page-box {
  background-color: #fff;
  width: 100%;
  height: 60px;
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
  background-color: #f0f0f0;
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
  padding: 10px 8px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
}
.table-container {
  /* padding: 10px; */
  position: relative;
  border-top: solid 1px #d5d5d5;
  /* overflow-y: scroll; */
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
  display: flex;
  align-items: center;
}
.thumbImg {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  flex: 0 0 60px;
}
.thumbImg-right {
  width: 95%;
  margin-left: 10px;
  flex: 1;
  font-size: 12px;
  font-weight: 400;
  color: #44abf7;
  line-height: 1.2;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.flex-button {
  display: flex;
  justify-content: flex-end;
}
.header-tr {
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  font-weight: 400;
  background: #d5d5d5;
  color: rgba(51, 51, 51, 1);
}
.header-tr > td {
  border-color: #d5d5d5;
}
.none {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}
.detail {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
  color: #44abf7;
}
</style>
<style scoped>
.containers {
  padding: 10px 10px;
  background: #fff;
  border-radius: 4px;
  box-sizing: border-box;
}
.inputStyle {
  width: 200px;
}
.timeInput {
  margin-right: 20px;
}
.orderTime {
  display: flex;
  flex-direction: row;
}
.retrievalList span {
  display: inline-block;
  width: 70px;
  font-size: 12px;
  padding: 5px 0;
  color: #333;
  text-align: center;
  border: 1px solid #d5d5d5;
  border-bottom: none;
}
.retrievalList span:not(:last-child) {
  border-right: none;
}
.retrievalList {
  width: 100%;
  overflow: hidden;
}
.active {
  background: #fff;
}
/*表格样式*/
ul,
li {
  list-style: none;
}
.similarTable {
  margin-top: 20px;
  border: 1px solid #ebeef5;
  font-size: 12px;
  overflow-y: scroll;
}
.list .header {
  display: flex;
  background: #fff;
  width: 100%;
  height: 32px;
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333;
  align-items: center;
  margin-bottom: 0;
  padding: 0;
}
.list .header .oneHeader {
  width: 40%;
  text-align: center;
}
.list .header .otherheader {
  width: 10.2%;
  text-align: center;
}
.listParent {
  border: 1px solid #e5e5e5;
  margin: 5px;
}
.zTitle {
  padding: 5px 10px;
  background: #fff;
  color: #666;
}
.lookDetail {
  float: right;
  color: #3976e6;
}
.containerFlex {
  display: flex;
}
.containerFlex > div:not(:last-child) {
  border-right: 1px #e5e5e5 solid;
}
.containerGoods {
  display: flex;
  flex-direction: column;
  width: 48%;
  padding: 5px;
}
.containerGoods section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.containerGoods section:not(:last-child) {
  border-bottom: 1px solid #e5e5e5;
}
.containerGoods section div {
  margin-top: 30px;
}
.containerGoods dl {
  display: flex;
}
.containerGoods dd {
  margin-left: 5px;
}
.containerGoods dd div:first-child {
  margin-top: 15px;
}
.containerGoods dd div:last-child {
  margin-top: 30px;
}
.containerOther {
  display: flex;
  width: 9.6%;
  align-items: center;
  text-align: center;
}
.containerOther section {
  width: 100%;
  text-align: center;
}
.containerOther section p {
  text-align: center;
}
.no-data {
  width: calc(100% - 12px);
  height: 55px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 55px;
  text-align: center;
  border-bottom: 1px solid #f4f4f4;
  color: #999;
}
.page-box {
  background-color: #fff;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inputStyle1 {
  width: 200px;
}
.inputStyle2 {
  width: 120px;
  margin-right: 5px;
}
</style>