<template>
  <div>
    <p class="retrievalList">
      <span
        :class="{active: index===isTrue}"
        @click="tabRetrieval(index)"
        v-for="(item,index) in retrievalList"
        :key="index"
      >{{item}}</span>
    </p>
    <div class="containers-w">
      <div class="innerContainer-w">
        <div ref="forms">
          <el-form ref="form" :model="form" :size="size" label-width="80px">
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
                style="margin-left:20px;"
                icon="el-icon-search"
                :loading="searchLoading"
                :size="size"
                type="primary"
              >筛选</el-button>
              <el-button style="margin-left:20px;" :size="size" @click="exportList">导出</el-button>
            </p>
          </el-form>
        </div>
自定义的table表格 elment-ui table 可切换选择
        <div class="header-contet">
          <ul class="header">
            <li class="li1 flexSb">
              <el-checkbox class="el-checkbox" v-model="checked"></el-checkbox>
              <span>商品信息</span>
              <span></span>
            </li>
            <li class="li2">商品清单</li>
            <li class="li3">订单金额</li>
            <li class="li4">收货信息</li>
            <li class="li5">交易状态</li>
            <li class="li6">配送方式</li>
            <li class="li7">售后</li>
            <li class="li8">操作</li>
          </ul>
        </div>
        <div class="table">
          <div class="orderinfo_list">
            <div class="orderinfo">
              <div>
                <span style="margin-right:30px">订单编号1231231241241251</span>
                <span>下单时间23489386986363464</span>
              </div>
              <div>备注</div>
            </div>
            <div class="row">
              <div class="row1">
                <el-checkbox class="el-checkbox" v-model="checked"></el-checkbox>
                <img
                  class="shopimg"
                  :src="require('../store/tongchengpeisong/icon/quanxuan.png')"
                  alt
                />
                <div class="hidden3">产品标题这是产品标题这是产品标题这是产品标题</div>
              </div>
              <div>
                <div>
                  <div>数量：1件</div>
                  <div>规格：500ml、白色</div>
                </div>
              </div>
              <div class="rowClild">
                <div>
                  <div>3690.00</div>
                  <div>(需支付:3699.00元)</div>
                  <div>(含配送费:0.00元)</div>
                  <div>微信支付</div>
                </div>
              </div>
              <div class="rowClild">
                <div>
                  <div>李强</div>
                  <div>13836008885</div>
                  <div>黑龙江省 哈尔滨市 香坊区 珠江路3号创客巢4楼</div>
                </div>
              </div>
              <div class="rowClild">
                <div>待发货</div>
              </div>
              <div class="rowClild">
                <div>物流配送</div>
              </div>
              <div class="rowClild">
                <div>商家拒绝维权</div>
              </div>

              <div class="rowClild">
                <div>
                  <el-button size="mini" type="success">发货</el-button>
                  <el-button size="mini" type="primary">订单详情</el-button>
                  <el-button size="mini" type="warning">修改地址</el-button>
                  <el-button size="mini" type="danger">交易关闭</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
     

        <div v-if="list.length==0" class="no-data">暂无数据</div>
      </div>
      <!-- <el-dialog title="发货" :visible.sync="examine" width="600px">
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
          <el-button @click type="primary">保存</el-button>
        </div>
      </el-dialog>-->
    </div>
    <section class="page-box">
      <el-pagination
        v-if="list.length > 0"
        @size-change="handleSizeChange"
        @current-change="changepage"
        layout="sizes,total, prev, pager, next, jumper"
        :page-size="form.pageSize"
        :current-page.sync="form.curPage"
        :total="totalCount"
        :page-sizes="[10, 20, 30, 50]"
      ></el-pagination>
    </section>
  </div>
</template>

<script>
export default {
  name: "merchantOrderList",
  data() {
    return {
      size: "mini",
      tableHeight: "",
      createTime: "",
      examine: false,
      searchLoading: false,
      checked: false,
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
      list: [
        {
          info: "我是测试数据",
        },
      ],
      totalCount: 0,
    };
  },
  mounted() {
    this.gettableHeight();
  },
  methods: {
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
    //时间选择器
    timeChange(val) {
      console.log(val);
    },
    tabRetrieval(index) {
      this.isTrue = index;
    },
    gettableHeight() {
      let winHeight = document.body.clientHeight - 265;
      let boxHeight = this.$refs.forms.offsetHeight;
      this.tableHeight = winHeight - boxHeight;
    },
    handleSizeChange() {},
    changepage() {},
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

<style lang='scss' scoped>
::v-deep .el-pagination {
  padding: 0;
}
::v-deep .el-checkbox {
  margin: 0 15px 0 10px;
  display: inline-block;
}
.rowClild ::v-deep .el-button {
  margin: 0 5px 5px 0px;
  padding: 7px 0;
  width: 80px;
  display: inline-block;
}
.containers-w {
  padding: 10px 0px;
  background: #fff;
  border-radius: 4px;
  height: calc(100% - 78px);

  box-sizing: border-box;
}
.innerContainer-w {
  position: relative;
  overflow-y: scroll;
  height: 100%;
  width: 98%;
  margin: 0 auto;
  padding: 0px;
  background: #f5f7f9;
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
  height: 38px;
}
.retrievalList span {
  display: inline-block;
  width: 70px;
  font-size: 12px;
  padding: 5px 0;
  color: #333;
  text-align: center;
  border: 1px solid rgb(213, 213, 213);
}
.retrievalList span:not(:last-child) {
  border-right: none;
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
.header-contet {
  box-sizing: border-box;
  padding-top: 20px;
  height: 62px;
  background: #f5f7f9;
}
.header,
.row {
  display: flex;
  background: #fff;
  width: 100%;
  font-size: 13px;
  font-family: Microsoft YaHei;
  color: #333;

  border-radius: 3px;
}

.orderinfo_list {
  border-radius: 3px;
  width: 100%;
  margin: 0 auto;
}
.orderinfo {
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  justify-content: space-between;

  font-size: 13px;
  margin: 0 auto;
  border-left: 1px solid #e0dddd;
  border-top: 1px solid #c2c2c2;
  background: white;
}
.header {
  width: calc(100% - 40px);
  margin: 0 auto;
  height: 32px;
  border-right: 1px solid #e0dddd;
  border-bottom: 1px solid #c2c2c2;
}
.table {
  width: calc(100% - 40px);
  margin: 0 auto;
  border-right: 1px solid #e0dddd;
  border-bottom: 1px solid #c2c2c2;
}
.header li {
  width: 11%;
  height: 100%;
  border-left: 1px solid #e0dddd;
  border-top: 1px solid #c2c2c2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.row > div {
  padding: 10px;
  box-sizing: border-box;
  flex: 0 0 11%;
  border-left: 1px solid #e0dddd;
  border-top: 1px solid #c2c2c2;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.rowClild > div {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}

.row1 {
  box-sizing: border-box;
  flex: 0 0 23% !important;
  padding-left: 0 !important;
}

.li1 {
  width: 23% !important;
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
  width: 100%;
  height: 38px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.inputStyle1 {
  width: 200px;
}
.inputStyle2 {
  width: 120px;
  margin-right: 5px;
}
.shopimg {
  width: 100px;
  height: 100px;
  flex: 0 0 100px;
  border-radius: 8px;
  margin-right: 10px;
}
.hidden3 {
  -webkit-line-clamp: 4;
  line-height: 1.5em;
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.flexSb {
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: space-between !important;
}
</style>