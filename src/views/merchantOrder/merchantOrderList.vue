<template>
  <div>
    <div class="containers">
      <div class="innerContainer">
        <div ref="forms" class="forms">
          <el-form ref="form" :model="form" :size="size" label-width="70px">
            <el-form-item label="订单搜索">
              <el-select v-model="form.search" clearable @change="searchChange">
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
                @change="kongkong"
                class="inputStyle"
                v-model="form.value"
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
                  v-model="listpage.productName"
                ></el-input>
              </el-form-item>
              <el-form-item label="订单状态">
                <el-select
                  v-model="listpage.orderStatus"
                  clearable
                  placeholder="全部"
                  @change="changeStatus"
                >
                  <el-option
                    v-for="(item, index) in orderStatusArr"
                    :label="item.label"
                    :value="item.value"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="售后状态">
                <el-select v-model="listpage.afterSaleStatus" clearable placeholder="全部">
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
                @click="serachList"
                type="primary"
              >筛选</el-button>
              <el-button style="margin-left:20px;" :size="size" @click="exportList">导出</el-button>
            </p>
          </el-form>
        </div>
        <p class="retrievalList">
          <span
            :class="{active: index===isTrue}"
            @click="tabRetrieval(index,item)"
            v-for="(item,index) in orderStatusArr"
            :key="index"
          >{{item.label}}</span>
          <span @click="shohouzhong" :class="{active: isTrue  == 99 }">售后中</span>
        </p>
        <div class="page-content">
          <section class="table-container" ref="table" v-loading="loading">
            <div
              class="top-fixed"
              :style="{zIndex:fiexTop ? 1000 : -1000,width:domWidth+'px',top:domTop+'px'}"
            >
              <table style="width:100%; border-collapse: collapse; border: none;table-layout:fixed">
                <tr style="width:100%" class="header-tr">
                  <td style="width:50%">
                    <div class="header-flex">
                      <section>商品</section>
                      <section>单价（元）/数量</section>
                      <section>售后</section>
                    </div>
                  </td>
                  <!-- <td style="width:10%">售后</td> -->
                  <td style="width:10%">买家/收货人</td>
                  <td style="width:10%">配送方式</td>
                  <td style="width:10%">实收金额（元）</td>
                  <td style="width:10%">订单状态</td>
                  <td style="width:10%">操作</td>
                </tr>
              </table>
            </div>
            <table style="width:100%; border-collapse: collapse; border: none;table-layout:fixed">
              <tr style="width:100%" class="header-tr">
                <td style="width:50%">
                  <div class="header-flex">
                    <section>商品</section>
                    <section>单价（元）/数量</section>
                    <section>售后</section>
                  </div>
                </td>
                <!-- <td style="width:10%">售后</td> -->
                <td style="width:10%">买家/收货人</td>
                <td style="width:10%">配送方式</td>
                <td style="width:10%">实收金额（元）</td>
                <td style="width:10%">订单状态</td>
                <td style="width:10%">操作</td>
              </tr>
            </table>
            <div class="mock-table" v-for="(its, index) in list" :key="index">
              <div style="width:100%;position: relative;">
                <span
                  style="margin-right:30px;margin-left:18px;font-size:10px;"
                >订单号：{{ its.orderCode }}</span>
                <span
                  style="margin-right:30px;margin-left:18px;font-size:10px;"
                >下单时间：{{ its.createTime }}</span>
                <span
                  style="margin-right:30px;margin-left:18px;font-size:10px;"
                >{{its.payType == 2 ? '余额' : '微信'}}</span>
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
                      <div>
                        <img class="thumbImg" :src="item.thumbImg.split(',')[0]" />
                        <div class="product-name">
                          <p class="thumbImg-right">{{ item.productName }}</p>
                          <div
                            style="margin-left:10px;margin-top:10px"
                            v-show="item.goodsSku"
                          >{{item.goodsSku}}</div>
                        </div>
                      </div>
                      <div>
                        <div>￥{{ item.payPrice}}</div>
                        <div>{{ item.number }}件</div>
                      </div>
                      <div>
                        <div>{{ item.aftersaleStatusText}}</div>
                      </div>
                    </section>
                  </td>
                  <!-- <td style="width:10%"></td> -->
                  <td style="width:10%">
                    <p class="qusibaps">{{ its.nickName }}</p>
                    <p class="qusibap">{{ its.mobile }}</p>
                  </td>
                  <td style="width:10%">
                    <p class="qusibap">{{ its.pickupType}}</p>
                  </td>
                  <td style="width:10%">
                    <div class="qusibap">{{its.payAmount}}</div>
                  </td>
                  <td style="width:10%">
                    <p class="qusibap">{{ its.orderStatusText }}</p>
                  </td>
                  <td style="width:10%">
                    <p
                      class="qusibap"
                      @click="updatewuliu(its)"
                      style="color:#44abf7;SC;cursor: pointer;"
                      v-if="its.orderStatus == 3 && its.updateLogisticsTime == ''"
                    >修改物流{{its.updateLogisticsTime}}</p>
                    <p
                      class="qusibap poiner"
                      @click="ggosd(its)"
                      style="font-weight:600;color:green"
                      v-else-if="its.orderStatus == 2"
                    >
                      <el-button size="mini">
                        <span style="font-size:10px">发货</span>
                      </el-button>
                    </p>
                    <p v-else class="qusibap poiner">--</p>
                  </td>
                </tr>
              </table>
            </div>
            <section v-if="list.length == 0  && !loading" class="qunima">暂无数据</section>
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
      <!-- 修改物流弹窗 -->
      <el-dialog title="修改物流" :visible.sync="dialogStatus">
        <el-alert title="物流信息仅支持1次更正，请仔细填写并核对" type="warning" :closable="false"></el-alert>
        <el-form label-width="80px" v-for="(item,index) in parcelInfo" :key="index + 's'">
          <el-form-item :label="`包裹${index+1}：`">
            <div class="ems">
              <div>共{{item.productNum}}件商品</div>
            </div>
          </el-form-item>
          <el-form-item label="发货方式：">
            <el-radio-group v-model="item.pickupType" disabled>
              <el-radio label="快递">需要物流</el-radio>
              <el-radio label>无需物流</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="运单编号：">
            <section class="form-flex">
              <div>
                <el-input
                  v-model="item.logisticsCode"
                  size="mini"
                  @blur="onlistBlur(item,index)"
                  style="width:200px;margin-right:20px"
                  onkeyup="value=value.replace(/[\W]/g,'')"
                ></el-input>
              </div>
              <div class="ems">
                <div style="font-weight: bold;">物流公司：</div>
              </div>
              <div>
                <el-select
                  v-model="item.shipperCode"
                  placeholder="请选择"
                  size="mini"
                  style="width:200px"
                >
                  <el-option
                    v-for="(its, idx) in item.kuaidiarr"
                    :key="idx"
                    :label="its.ShipperName"
                    :value="its.ShipperCode"
                  ></el-option>
                </el-select>
              </div>
            </section>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogStatus = false">取 消</el-button>
          <el-button type="primary" @click="xiugaiwuliu">保 存</el-button>
        </div>
      </el-dialog>
      <!-- 确认修改物流表格 -->
      <el-dialog title="确认修改信息" :visible.sync="tableDdialog">
        <el-table :data="queArr">
          <el-table-column label="包裹名">
            <template slot-scope="props">包裹{{props.row.idx + 1}}</template>
          </el-table-column>
          <el-table-column property="number" label="商品数量"></el-table-column>
          <el-table-column property="pickupType" label="发货方式"></el-table-column>
          <el-table-column property="shipperName" label="物流公司"></el-table-column>
          <el-table-column property="logisticsCode" label="快递单号"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="fanhui">返回修改</el-button>
          <el-button type="primary" @click="xiugaiwuliu">确认修改</el-button>
        </div>
      </el-dialog>
      <!-- 发货弹窗 -->
      <el-dialog title="订单发货" :visible.sync="dialogTableVisible">
        <div class="dilogTitle">
          <span>选择商品</span>
          <span>待发货{{fahuoinfo.unDeliveryNum}}</span>
          <span>已发货{{fahuoinfo.deliveryedNum}}</span>
        </div>
        <el-table
          :data="gridData"
          @selection-change="handleSelectionChange"
          @select-all="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" :selectable="selectable"></el-table-column>
          <el-table-column property="date" label="商品" width="300px">
            <template slot-scope="props">
              <section class="flex-box" style="width:100%;padding: 0;">
                <div>
                  <img class="thumbImg" :src="props.row.thumbImg.split(',')[0]" />
                  <div class="product-name">
                    <p class="thumbImg-right">{{ props.row.productName }}</p>
                    <div
                      style="margin-left:10px;margin-top:10px"
                      v-show="props.row.goodsSku"
                    >{{props.row.goodsSku}}</div>
                  </div>
                </div>
              </section>
            </template>
          </el-table-column>
          <el-table-column property="number" label="数量"></el-table-column>
          <el-table-column property="deliveryStatus" label="状态">
            <template slot-scope="props">
              <section class="flex-box" style="width:100%;padding: 0;">
                <span v-if="props.row.deliveryStatus == 1">处理退款</span>
                <span v-if="props.row.deliveryStatus == 2">处理换货</span>
                <span v-if="props.row.deliveryStatus == 3">已发货</span>
                <span v-if="props.row.deliveryStatus == 4">待发货</span>
              </section>
            </template>
          </el-table-column>
          <el-table-column property="address" label="运单号"></el-table-column>
        </el-table>
        <el-form label-width="70px">
          <el-form-item label="配送信息">
            <div class="ems">
              <div>配送方式：{{fahuoinfo.pickupType}}</div>
              <div>收货人：{{fahuoinfo.custName}}{{fahuoinfo.custMobile}}</div>
              <div>收获地址：{{fahuoinfo.custAddress}}</div>
            </div>
          </el-form-item>
          <el-form-item label="发货方式">
            <span class="ems">自己联系快递</span>
            <div>
              <el-input
                v-model="fahuoform.logisticsCode"
                size="mini"
                @blur="onSubmit"
                style="width:300px;margin-right:20px"
                onkeyup="value=value.replace(/[\W]/g,'')"
              ></el-input>
            </div>
            <div>
              <el-select
                v-model="fahuoform.shipperCode"
                placeholder="请选择"
                size="mini"
                style="width:300px"
              >
                <el-option
                  v-for="(item, index) in kuaidiarr"
                  :key="index"
                  :label="item.ShipperName"
                  :value="item.ShipperCode"
                ></el-option>
              </el-select>
            </div>
            <div style="font-size:12px;color:#999">*请仔细填写物流公司及物流单号，发货后72小时内仅支持做一次更正，逾期不可修改</div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="disp" @click="fahuola">发货</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getMerShopOrderList,
  merShopOrderListExportExcel,
  getDeliveryDetails,
  setLogisticsInfoNew,
  distinguishHandle,
  updateShopOrderParcelInfo,
  getShopOrderDetailNew,
} from "@/api/merchantOrder";
import { formatDate } from "@/utils/util";
export default {
  name: "merchantOrderList",
  data() {
    return {
      queArr: [],
      tableDdialog: false,
      parcelInfo: [],
      dialogStatus: false,
      kuaidiarr: [],
      gridData: [],
      dialogTableVisible: false,
      size: "mini",
      tableHeight: "",
      createTime: "",
      examine: false,
      loading: true,
      searchLoading: false,
      isTrue: 0, //检索按钮样式
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
          value: "orderCode",
          label: "订单编号",
        },
        {
          value: "custName",
          label: "收货人姓名",
        },
        {
          value: "userTel",
          label: "买家手机号",
        },
      ],
      orderStatusArr: [
        {
          value: "",
          label: "全部",
        },
        {
          value: 1,
          label: "待付款",
        },
        {
          value: 2,
          label: "待发货",
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
          value: 6,
          label: "已关闭",
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
        search: "",
        value: "",
      },
      dialogForm: {
        contact: "",
        phone: "",
      },
      fiexTop: false,
      domTop: 0,
      domWidth: 0,
      radio: 0,
      list: [],
      fahuoinfo: "",
      shipperName: [],
      listpage: {
        curPage: 1,
        pageSize: 10,
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
      fahuoform: {
        orderDetailIds: "",
        shipperCode: "",
        shipperName: "",
        logisticsCode: "",
        orderCode: "",
      },
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.initscroll();
  },
  methods: {
    searchChange(val) {
      this.listpage.orderCode = "";
      this.listpage.custName = "";
      this.listpage.userTel = "";
    },
    kongkong(val) {
      if (!val) {
        this.listpage[this.form.search] = "";
      }
    },
    shohouzhong() {
      this.isTrue = 99;
      this.listpage.afterSaleStatus = 1;
      this.getList();
    },
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
        this.domleft = document.querySelector(".header-tr").offsetLeft;
        console.log(this.domleft);
        const myObserver = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            this.domWidth =
              document.querySelector("#router-view").offsetWidth - 19;
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
    // 订单详情跳转
    goOrderdetail(its) {
      this.$router.push({
        path: "/orderDetail",
        query: {
          orderId: its.orderCode,
        },
      });
    },
    // 修改物流返回
    fanhui() {
      this.dialogStatus = true;
      this.tableDdialog = false;
    },
    // 修改物流
    xiugaiwuliu() {
      if (!this.tableDdialog) {
        let obj = {
          orderCode: this.xiugaiData.orderInfo.orderCode,
          parcelInfo: [],
        };
        obj.parcelInfo = this.parcelInfo.map((el) => {
          let object = {
            orderDetailIds: "",
            shipperCode: el.shipperCode,
            shipperName: "",
            logisticsCode: el.logisticsCode,
          };
          el.kuaidiarr.forEach((item) => {
            if (item.ShipperCode == el.shipperCode) {
              el.shipperName = item.ShipperName;
              object.shipperName = item.ShipperName;
            }
          });
          object.orderDetailIds = el.parcelProductVo.map((item) => {
            return item.orderDetailId;
          });
          object.orderDetailIds = object.orderDetailIds.join(",");
          return object;
        });
        this.queArr = [];
        this.parcelInfo.forEach((el, idx) => {
          el.parcelProductVo.forEach((item, index) => {
            item.idx = idx;
            item.pickupType = el.pickupType;
            item.logisticsCode = el.logisticsCode;
            item.shipperName = el.shipperName;
            item.orderCode = this.xiugaiData.orderInfo.orderCode;
            console.log(item);
            this.queArr.push(item);
          });
        });
        console.log(this.parcelInfo);
        console.log(this.queArr);
        this.tableDdialog = true;
        this.dialogStatus = false;
        this.logisticsData = obj;
      } else {
        updateShopOrderParcelInfo(this.logisticsData).then((res) => {
          this.$message({
            message: "修改成功",
            type: "success",
            center: true,
          });
          this.dialogStatus = false;
          this.tableDdialog = false;
          this.getList();
        });
      }
    },
    // 修改物流详情
    updatewuliu(item) {
      let obj = {
        orderCode: item.orderCode,
      };
      getShopOrderDetailNew(obj).then((ret) => {
        var addresolve = 0;
        this.xiugaiData = ret.body;
        ret.body.parcelInfo.forEach((item, index) => {
          new Promise((resolve, reject) => {
            let obj = {
              logisticCode: item.logisticsCode,
            };
            distinguishHandle(obj).then((res) => {
              item.kuaidiarr = res.body;
              resolve(addresolve++);
              if (addresolve == ret.body.parcelInfo.length) {
                this.parcelInfo = ret.body.parcelInfo;
                this.dialogStatus = true;
              }
            });
          });
        });
      });
    },
    // 发货过滤不能发的商品
    selectable(row, index) {
      console.log(row, index);
      if (row.isSelect == 1) {
        return true;
      } else {
        return false;
      }
    },
    // 确认发货
    fahuola() {
      if (!this.fahuoform.logisticsCode) {
        this.$message({
          message: "请输入快递单号",
          type: "error",
          center: true,
        });
        return false;
      }
      this.fahuoform.shipperName = this.kuaidiarr.find((el) => {
        return el.ShipperCode == this.fahuoform.shipperCode;
      }).ShipperName;
      if (!this.fahuoform.shipperName) {
        this.$message({
          message: "请选择物流公司",
          type: "error",
          center: true,
        });
        return false;
      }
      this.fahuoform.orderDetailIds =
        this.orderDetailIds && this.orderDetailIds.length > 0
          ? this.orderDetailIds.join(",")
          : "";
      if (!this.orderDetailIds || !this.orderDetailIds.length) {
        this.$message({
          message: "请选择发货商品",
          type: "error",
          center: true,
        });
        return false;
      }
      setLogisticsInfoNew(this.fahuoform).then((res) => {
        this.$message({
          message: "恭喜你，发货成功啦",
          type: "success",
          center: true,
        });
        this.dialogTableVisible = false;
        this.getList();
      });
    },
    // 修改物流查询物流公司
    onlistBlur(item, index) {
      console.log(item);
      if (item.logisticsCode.length <= 0) {
        this.$message({
          message: "请输入物流单号后查询",
          type: "error",
          center: true,
        });
        return false;
      }
      let obj = {
        logisticCode: item.logisticsCode,
      };
      distinguishHandle(obj).then((res) => {
        console.log(res);
        if (!res.body) {
          this.$message({
            message: "没查到",
            type: "error",
            center: true,
          });
          return false;
        }
        item.shipperCode = res.body[0].ShipperCode;
        item.kuaidiarr = res.body;
      });
    },
    // 发货查询物流公司
    onSubmit() {
      if (this.fahuoform.logisticsCode.length <= 0) {
        this.$message({
          message: "请输入物流单号后查询",
          type: "error",
          center: true,
        });
        return false;
      }
      let obj = {
        logisticCode: this.fahuoform.logisticsCode,
      };
      distinguishHandle(obj).then((res) => {
        console.log(res);
        if (!res.body) {
          this.$message({
            message: "没查到",
            type: "error",
            center: true,
          });
          return false;
        }
        this.fahuoform.shipperCode = res.body[0].ShipperCode;
        this.kuaidiarr = res.body;
      });
    },
    // 发货复选框选中
    handleSelectionChange(val) {
      if (val.length > 0) {
        this.orderDetailIds = val.map((element) => {
          return element.orderDetailId;
        });
      } else {
        this.orderDetailIds = [];
      }
    },
    changeStatus(val) {
      let Idx = this.orderStatusArr.findIndex((el) => {
        return val == el.value;
      });
      this.isTrue = Idx;
    },
    getList() {
      this.loading = true;
      getMerShopOrderList(this.listpage).then((res) => {
        let dom = document.querySelector("#router-view");
        dom.scrollTop = 0;
        this.searchLoading = false;
        this.loading = false;
        let { records, total } = res.body;
        this.list = records;
        this.totalCount = total;
      });
    },
    ggosd(item) {
      let obj = {
        orderCode: item.orderCode,
      };
      getDeliveryDetails(obj).then((res) => {
        this.gridData = res.body.productInfo;
        this.fahuoinfo = res.body;
        this.kuaidiarr = [];
        this.dialogTableVisible = true;
        this.fahuoform.orderCode = item.orderCode;
        console.log(res);
        // this.gridData = item.detail;
      });
    },
    // 搜索按钮
    serachList() {
      this.listpage.curPage = 1;
      this.listpage[this.form.search] = this.form.value;
      console.log(this.listpage);
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
      this.listpage.createTimeBegin = formatDate(start);
      this.listpage.createTimeEnd = formatDate(end);
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
      this.listpage.createTimeBegin = formatDate(start);
      this.listpage.createTimeEnd = formatDate(end);
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
      this.listpage.createTimeBegin = formatDate(start);
      this.listpage.createTimeEnd = formatDate(end);
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
      this.listpage.createTimeBegin = formatDate(start);
      this.listpage.createTimeEnd = formatDate(end);
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
      if (!val) {
        this.listpage.createTimeBegin = "";
        this.listpage.createTimeEnd = "";
      } else {
        this.listpage.createTimeBegin = val[0];
        this.listpage.createTimeEnd = val[1];
      }
      this.getList();
    },
    tabRetrieval(index, item) {
      this.listpage.afterSaleStatus = "";
      this.isTrue = index;
      this.listpage.orderStatus = item.value;

      this.serachList();
    },
    exportList() {
      if (this.createTime == "" || this.createTime == null) {
        this.$message({
          message: "请选择下单起止时间",
          type: "error",
          center: true,
        });
        return false;
      }
      merShopOrderListExportExcel(this.listpage).then((res) => {});
    },
  },
};
</script>
<style scoped>
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
  flex: 0 0 25%;
}
.header-flex > section:nth-of-type(3) {
  flex: 0 0 20%;
  text-align: center;
}
.forms {
  margin-bottom: 20px;
}
table {
  font-size: 10px;
}
.product-name {
  flex: 1;
  font-size: 10px;
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
  font-size: 10px;
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
  flex: 0 0 25%;
}
.flex-box > div:nth-of-type(3) {
  flex: 0 0 20%;
}
.flex-box:last-of-type {
  border-bottom: none;
}
.qusibap {
  text-align: center;
  font-size: 10px;
  font-family: PingFang SC;
  color: rgba(51, 51, 51, 1);
}
.qusibaps {
  text-align: center;
  font-size: 10px;
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
  font-size: 10px;
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
  font-size: 11px;
  padding: 5px 0;
  color: #333;
  text-align: center;
  border: 1px solid #d5d5d5;
  border-bottom: none;
  cursor: pointer;
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
  border-bottom: none;
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
  z-index: -100;
  position: fixed;
  top: 129px;
}
.page-content {
  padding-bottom: 20px;
  position: relative;
}
.qunima {
  display: flex;
  width: 100%;
  height: 30vh;
  align-items: center;
  justify-content: center;
  color: #999;
}
</style>