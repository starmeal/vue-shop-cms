<template>
  <div>
    <div class="containers">
      <div class="innerContainer">
        <el-form>
          <el-form-item label="商品名称">
            <div>
              <el-input
                clearable
                v-model="listpage.productName"
                placeholder="商品名称"
                style="width:200px"
              ></el-input>
              <span class="mock-label">订单编号</span>
              <el-input
                clearable
                v-model="listpage.orderCode"
                placeholder="订单编号"
                style="width:200px;margin-left:20px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="申请时间">
            <p class="orderTime">
              <el-date-picker
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
          <el-form-item label="售后编号">
            <div>
              <el-input
                clearable
                v-model="listpage.asaleCode"
                placeholder="售后编号"
                style="width:200px"
              ></el-input>
              <span class="mock-label">退款类型</span>
              <el-select
                clearable
                v-model="listpage.refundType"
                placeholder="请选择"
                style="margin-left:20px"
              >
                <el-option :key="1" label="售中退款" value="1"></el-option>
                <el-option :key="2" label="售后退款" value="2"></el-option>
              </el-select>
              <span class="mock-label">售后方式</span>
              <el-select
                clearable
                v-model="listpage.aftersaleType"
                placeholder="请选择售后方式"
                style="margin-left:20px"
              >
                <el-option :key="1" label="仅退款" value="1"></el-option>
                <el-option :key="3" label="退货退款" value="3"></el-option>
                <el-option :key="4" label="换货" value="4"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="发货状态">
            <div>
              <el-select clearable v-model="listpage.deliveryStatus" placeholder="请选择">
                <el-option :key="0" label="售中退款" value="0"></el-option>
                <el-option :key="1" label="售后退款" value="1"></el-option>
              </el-select>
              <span class="mock-label">售后状态</span>
              <el-select
                clearable
                v-model="listpage.aftersaleStatus"
                placeholder="请选择"
                style="margin-left:20px"
              >
                <el-option :key="1" label="售后处理中" value="1"></el-option>
                <el-option :key="2" label="售后申请待商家处理" value="2"></el-option>
                <el-option :key="3" label="商家不同意售后申请,待买家处理" value="3"></el-option>
                <el-option :key="4" label="商家已同意售后申请" value="4"></el-option>
                <el-option :key="5" label="买家已退货,待商家确认收货" value="5"></el-option>
                <el-option :key="6" label="售后关闭" value="6"></el-option>
                <el-option :key="7" label="商家拒绝收货，待买家处理" value="7"></el-option>
                <el-option :key="8" label="商家已发货，待买家确认收货" value="8"></el-option>
                <el-option :key="9" label="售后成功" value="9"></el-option>
              </el-select>
              <span class="mock-label">退货物流</span>
              <el-select
                clearable
                v-model="listpage.aftersaleType"
                placeholder="请选择"
                style="margin-left:20px"
              >
                <el-option :key="1" label="商家未签收" value="0"></el-option>
                <el-option :key="3" label="商家已签收" value="1"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item>
            <div style="margin-left:60px">
              <el-button @click="search" type="primary">筛选</el-button>
              <el-button @click="toExper">导出</el-button>
            </div>
          </el-form-item>
        </el-form>
        <p class="retrievalList">
          <span
            :class="{active: index===isTrue}"
            @click="tabRetrieval(index,item)"
            v-for="(item,index) in orderStatusArr"
            :key="index"
          >{{item.label}}</span>
        </p>
        <div class="button-group">
          <el-button-group>
            <el-button :type="listpage.sortType == 1  ? 'primary' : ''" @click="search(1)">按最近申请排序</el-button>
            <el-button :type="listpage.sortType == 2  ? 'primary' : ''" @click="search(2)">按临近超时排序</el-button>
          </el-button-group>
        </div>
        <div class="page-content">
          <section class="table-container" ref="table" v-loading="loading">
            <div
              class="top-fixed"
              :style="{zIndex:fiexTop ? 1000 : -1000,width:domWidth+'px',top:domTop+'px'}"
            >
              <table style="width:100%; border-collapse: collapse; border: none;table-layout:fixed">
                <tr style="width:100%" class="header-tr">
                  <td style="width:40%">
                    <div class="header-flex">
                      <section>商品</section>
                    </div>
                  </td>
                  <td style="width:10%">订单金额</td>
                  <td style="width:10%">退款金额</td>
                  <td style="width:10%">申请时间</td>
                  <td style="width:10%">超时时间</td>
                  <td style="width:10%">售后状态</td>
                  <td style="width:10%">操作</td>
                </tr>
              </table>
            </div>
            <table style="width:100%; border-collapse: collapse; border: none;table-layout:fixed">
              <tr style="width:100%" class="header-tr">
                <td style="width:30%">
                  <div class="header-flex">
                    <section>商品</section>
                  </div>
                </td>
                <td style="width:10%">发货状态</td>
                <td style="width:10%">订单金额</td>
                <td style="width:10%">退款金额</td>
                <td style="width:10%">申请时间</td>
                <td style="width:10%">超时时间</td>
                <td style="width:10%">售后状态</td>
                <td style="width:10%">操作</td>
              </tr>
            </table>
            <div class="mock-table" v-for="(its, index) in list" :key="index">
              <div style="width:100%;position: relative;">
                <span
                  style="margin-right:30px;margin-left:18px;font-size:12px;"
                >售后编号：{{ its.asaleCode }}</span>
                <span
                  style="margin-right:30px;margin-left:18px;font-size:12px;"
                >订单编号：{{ its.orderCode }}</span>
                <span
                  style="margin-right:30px;margin-left:18px;font-size:12px;"
                  v-if="its.aftersaleType == 1"
                >退款</span>
                <span
                  style="margin-right:30px;margin-left:18px;font-size:12px;"
                  v-if="its.aftersaleType == 3"
                >退货退款</span>
                <span
                  style="margin-right:30px;margin-left:18px;font-size:12px;"
                  v-if="its.aftersaleType == 4"
                >换货</span>
                <!-- <p class="detail" @click="goOrderdetail(its)">查看详情</p> -->
              </div>
              <table
                border="1"
                cellspacing="0"
                cellpadding="0"
                style="width:100%; border-collapse: collapse; border: none;table-layout:fixed"
              >
                <tr class="tspi" style="width:100%">
                  <td style="width:30%">
                    <section class="flex-box">
                      <div>
                        <div class="product-name">
                          <p class="thumbImg-right">{{ its.productNames }}</p>
                        </div>
                      </div>
                      <div>
                        <div v-show="its.goodsSkus">{{its.goodsSkus}}</div>
                      </div>
                    </section>
                  </td>
                  <td style="width:10%">
                    <p class="qusibap">{{ its.deliveryStatus == 1 ? '已发货' : '未发货' }}</p>
                  </td>
                  <td style="width:10%">
                    <p class="qusibap">{{ its.payAmount }}</p>
                  </td>
                  <td style="width:10%">
                    <p class="qusibap">{{ its.refundAmounts }}</p>
                  </td>
                  <td style="width:10%">
                    <p class="qusibap">{{ its.applyTime }}</p>
                  </td>
                  <td style="width:10%">
                    <div class="qusibap">{{its.merOverTime}}</div>
                  </td>
                  <td style="width:10%">
                    <p class="qusibap">{{ its.aftersaleStatusText }}</p>
                  </td>
                  <td style="width:10%">
                    <p class="detail-btn" @click="goOrderdetail(its)">{{its.operationText}}</p>
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
      </div>
    </div>
  </div>
</template>

<script>
import {
  merAfterSaleListNew,
  merAfterSaleListExportExcel,
} from "@/api/aftersale";
import { formatDate } from "@/utils/util";
export default {
  data() {
    return {
      isTrue: 0, //检索按钮样式
      loading: true,
      fiexTop: false,
      domTop: 0,
      domWidth: 0,
      orderStatusArr: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "待商家处理",
          value: 1,
        },
        {
          label: "待买家处理",
          value: 2,
        },
      ],
      createTime: "",
      list: [],
      totalCount: 0,
      listpage: {
        curPage: 1,
        pageSize: 10,
        shopMerchantsCode: "",
        orderCode: "",
        asaleCode: "",
        productName: "",
        applyTimeBegin: "",
        applyTimeEnd: "",
        refundType: "",
        aftersaleType: "",
        deliveryStatus: "",
        aftersaleStatus: "",
        refundSigning: "",
        sortType: "1",
        waitProcessor: "",
      },
    };
  },
  created() {
    this.getList();
  },
  mounted(){
    this.initscroll()
  },
  methods: {
    initscroll() {
      this.$nextTick(() => {
        function getElementTop(elem) {
          var elemTop = elem.offsetTop; //获得elem元素距相对定位的父元素的top
          elem = elem.offsetParent; //将elem换成起相对定位的父元素
          while (elem != null) {
            //只要还有相对定位的父元素
            //获得父元素 距他父元素的top值,累加到结果中
            elemTop += elem.offsetTop; //再次将elem换成他相对定位的父元素上;
            elem = elem.offsetParent;
          }
          return elemTop;
        }
        let dom = document.querySelector("#router-view");
        this.dom = dom;
        this.domWidth = document.querySelector("#router-view").offsetWidth;
        const myObserver = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            this.domWidth = document.querySelector("#router-view").offsetWidth - 19;
            // console.log("大小位置", entry.contentRect);
            // console.log("监听的DOM", entry.target);
          });
        });
        myObserver.observe(dom);
        this.domTop = document.querySelector("#router-view").offsetTop;
        this.tabledomPos = document
          .querySelector(".table-container")
          .getBoundingClientRect().top;
        dom.addEventListener("scroll", () => {
          if (dom.scrollTop >= this.tabledomPos) {
            this.fiexTop = true;
          } else {
            this.fiexTop = false;
          }
        });
      });
    },
    toExper() {
      merAfterSaleListExportExcel(this.listpage).then((res) => {});
    },
    goOrderdetail(item) {
      this.$router.push({
        path: "/aftersaleDetail",
        query: {
          asaleCode: item.asaleCode,
        },
      });
    },
    search(index) {
      if (index && index == 1) {
        this.listpage.sortType = 1;
      }
      if (index && index == 2) {
        this.listpage.sortType = 2;
      }
      this.listpage.curPage = 1;
      this.loading = true;
      this.getList();
    },
    tabRetrieval(index, item) {
      this.isTrue = index;
      this.listpage.waitProcessor = item.value;
      this.search();
    },
    // 翻页
    changepage(page) {
      var oOverScroll = this.$refs.table;
      oOverScroll.scrollTop = 0;
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
      if (!val) {
        this.listpage.applyTimeBegin = "";
        this.listpage.applyTimeEnd = "";
      } else {
        this.listpage.applyTimeBegin = val[0];
        this.listpage.applyTimeEnd = val[1];
      }
      this.getList();
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
      this.listpage.applyTimeBegin = formatDate(start);
      this.listpage.applyTimeEnd = formatDate(end);
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
      this.listpage.applyTimeBegin = formatDate(start);
      this.listpage.applyTimeEnd = formatDate(end);
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
      this.listpage.applyTimeBegin = formatDate(start);
      this.listpage.applyTimeEnd = formatDate(end);
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
      this.listpage.applyTimeBegin = formatDate(start);
      this.listpage.applyTimeEnd = formatDate(end);
    },
    getList() {
      merAfterSaleListNew(this.listpage).then((res) => {
        let dom = document.querySelector("#router-view");
        dom.scrollTop = 0;
        this.loading = false;
        let { records, total } = res.body;
        this.list = records;
        this.totalCount = total;
        console.log(res.body);
      });
    },
  },
};
</script>

<style scoped>
.mock-label {
  font-size: 12px;
  font-family: Microsoft YaHei, MicrosoftYaHei-Bold;
  font-weight: bold;
  color: #666666;
  display: inline-block;
  margin-left: 20px;
}
/* 测试提交 */
* {
  font-family: Microsoft YaHei;
}
.disp {
  float: right;
}
.ems {
  font-size: 12px;
  color: #666666;
}
.dilogTitle {
  color: rgb(31, 31, 31);
}
.dilogTitle span:first-of-type {
  font-weight: 500;
  margin-right: 20px;
  display: inline-block;
  font-size: 16px;
}

.dilogTitle span:not(:first-of-type) {
  font-weight: 500;
  display: inline-block;
  font-size: 14px;
}
.header-flex {
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 10px;
  box-sizing: border-box;
}
.header-flex > section:nth-of-type(1) {
  text-align: left;
  flex: 1;
  margin-right: 10px;
}
.header-flex > section:nth-of-type(2) {
  flex: 0 0 20%;
}
.header-flex > section:nth-of-type(3) {
  flex: 0 0 20%;
  text-align: center;
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
.flex-box > div:first-of-type {
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
  margin-right: 10px;
}
.flex-box > div:nth-of-type(2) {
  flex: 0 0 20%;
}
.flex-box > div:nth-of-type(3) {
  flex: 0 0 20%;
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
  min-height: 300px;
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
  margin-left: 0px;
  flex: 1;
  font-size: 12px;
  font-weight: 400;
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
  background: #edf6ff;
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
  cursor: pointer;
}
.detail-btn {
  color: #44abf7;
  cursor: pointer;
  text-align: center;
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
.retrievalList {
  width: 100%;
  border-bottom: solid 1px #d5d5d5;
  font-size: 0px;
}
.retrievalList span {
  display: inline-block;
  width: 70px;
  font-size: 12px;
  padding: 5px 0;
  color: #333;
  text-align: center;
  border: 1px solid #d5d5d5;
  border-bottom: 0px;
  cursor: pointer;
  box-sizing: border-box;
}
.retrievalList span:not(:last-child) {
  border-right: none;
}
.retrievalList {
  width: 100%;
  overflow: hidden;
}
.retrievalList .active {
  background: #44abf7;
  color: #fff;
  border: 1px solid #44abf7;
  border-bottom: 0px;
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
.form-flex {
  display: flex;
}
.top-fixed {
  width: 69%;
  height: 30px;
  left: 18.8%;
  z-index: -100;
  position: fixed;
  top: 129px;
}
.page-content {
  padding-bottom: 20px;
  position: relative;
}
.button-group {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: row-reverse;
}
</style>
<style>
.button-group /deep/ .el-button {
  border-radius: 0px;
  line-height: 15px;
  padding: 5px;
  display: inline-block;
}
</style>