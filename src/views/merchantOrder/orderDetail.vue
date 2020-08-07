<template>
  <div>
    <div class="order-Detail">
      <div class="flex-top">
        <div>订单编号：{{orderInfo.orderCode}}</div>
        <div>下单时间：{{orderInfo.createTime}}</div>
      </div>
      <div class="order-statusBox">
        <div>
          <div class="status-title">{{orderInfo.orderStatusText}}</div>
          <div v-for="(item,index) in needMerHandleAftersaleInfo" :key="index">
          <div style="padding:10px 0px">[{{item.productName}}]{{item.productName}}</div>
             <el-button>{{item.buttonText}}</el-button>
          </div>
        </div>
        <div class="flex-container">
          <el-steps :active="orderInfo.orderStatus" align-center style="width:90%">
            <el-step title="买家下单"></el-step>
            <el-step title="买家付款"></el-step>
            <el-step title="确认库存"></el-step>
            <el-step title="商家发货"></el-step>
            <el-step title="交易成功"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="tips-box">
        <div>和商有品提醒：</div>
        <div class="tips-text">
          <div>交易成功，和商有品将把贷款结算至你的店铺账户余额，你可以申请提现</div>
          <div>请及时关注你发出的包裹状态，确保能配送至卖家手中；</div>
          <div>如果卖家表示未收到货或者货物有问题，请及时联系买家积极处理，友好协商</div>
        </div>
      </div>
      <div class="tab-deep">
        <el-tabs type="card" v-model="activeName">
          <el-tab-pane
            :label="`包裹${index + 1}`"
            :name="`${index}`"
            v-for="(item,index) in parcelInfo"
            :key="index"
          >
            <div class="tips-boxs">
              <div>
                <div>发货方式：{{item.pickupType}}</div>
                <div>发货人：1233123123</div>
                <div>发货时间：1233123123</div>
                <div>运单号：{{item.logisticsCode}}</div>
              </div>
              <div>
                <div style="margin-bottom:20px">物流状态：</div>
                <el-timeline>
                  <el-timeline-item
                    placement="top"
                    v-for="(el,idx) in item.traces"
                    :timestamp="el.AcceptTime"
                    :key="idx"
                  >
                    <p style="font-size:12px;color:#f0ba08">{{el.AcceptStation}}</p>
                    <p style="font-size:12px;color:#f0ba08">{{el.Remark}}</p>
                  </el-timeline-item>
                </el-timeline>
                <span></span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="buy-info">
        <div>
          <section class="poiner">
            收货人信息
            <span
              v-if="orderInfo.orderStatus == 2"
              style="color:#44abf7;margin-right:11px;margin-left:20px"
              @click="updateAddress"
            >修改</span>
            <span
              style="color:#44abf7"
              v-clipboard:copy="copy"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >复制</span>
          </section>
          <section>
            <span class="yincang">我跟</span>
            收货人：{{orderInfo.custName}}
          </section>
          <section>
            <span class="yincang">我</span>
            联系电话：{{orderInfo.custMobile}}
          </section>
          <section class="item-address">
            <span style="flex: 0 0 27%;text-align: right;">收货地址：</span>
            <span>{{orderInfo.custAddress}}</span>
          </section>
        </div>
        <div>
          <section>配送信息</section>
          <section>配送方式：{{orderInfo.pickupType}}</section>
          <section>发货时间：{{orderInfo.deliveryTime}}</section>
        </div>
        <div>
          <section>付款信息：</section>
          <section>实付金额：{{orderInfo.payAmount}}</section>
          <section>付款时间：{{orderInfo.payTime}}</section>
        </div>
        <div>
          <section>买家信息：</section>
          <section>买家：{{orderInfo.nickName}}</section>
          <section>买家留言：{{orderInfo.remarks ? orderInfo.remarks : '--'}}</section>
        </div>
      </div>
      <div class="table-box">
        <el-table :data="detail" style="width: 100%">
          <el-table-column prop="date" label="商品" width="400px">
            <template slot-scope="props">
              <div class="list-item-t">
                <div>
                  <img :src="props.row.thumbImg" style="width:80px;height:80px" />
                </div>
                <div>
                  <div style="color:rgb(68, 171, 247)" class="hiden-text">{{props.row.productName}}</div>
                  <div class="hiden-text">{{props.row.goodsSku}}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="payPrice" label="单价（元）"></el-table-column>
          <el-table-column prop="number" label="数量"></el-table-column>
          <el-table-column prop="address" label="小计（元）">
            <template slot-scope="props">{{props.row.number * props.row.number}}</template>
          </el-table-column>
          <el-table-column prop="aftersaleStatusText" label="售后状态">
            <template
              slot-scope="props"
            >{{props.row.aftersaleStatusText ? props.row.aftersaleStatusText : ''}}</template>
          </el-table-column>
          <el-table-column prop="address" label="发货状态">
            <template
              slot-scope="props"
            >{{props.row.isShipmentsText ? props.row.isShipmentsText : '未发货'}}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 修改地址弹窗 -->
    <el-dialog title="修改收货地址" :visible.sync="dialogFormVisible">
      <el-alert title="仅支持修改一次,请务必在买家知情且同意下修改收货信息" type="warning" :closable="false"></el-alert>
      <el-form
        :model="addressform"
        :rules="addressformrules"
        label-width="90px"
        style="margin-top:20px"
      >
        <el-form-item label="收货人" prop="custName">
          <el-input v-model="addressform.custName" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="custMobile">
          <el-input v-model="addressform.custMobile" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <cascader v-model="cityvalue" @change="citychange" size="small" width="300px"></cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="custAddress">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入详细地址"
            v-model="addressform.custAddress"
            style="width:300px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateAddress">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getShopOrderDetailNew,
  updateCustAddressInfo,
} from "@/api/merchantOrder";
import cascader from "@/components/city/cascader.vue";
export default {
  data() {
    var EmptyValidator = (rule, value, callback) => {
      console.log(value);
      if (!myreg.test(value)) {
        callback(new Error("输入有误请重新输入"));
      } else {
        callback();
      }
    };
    return {
      copy: "",
      cityvalue: "",
      dialogFormVisible: false,
      addressform: {
        orderCode: "",
        custName: "",
        custMobile: "",
        custAddress: "",
      },
      addressformrules: {
        custName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        custMobile: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          {
            validator: EmptyValidator,
            trigger: "blur",
          },
        ],
        custAddress: [
          { required: true, message: "请选择联系地址", trigger: "change" },
        ],
      },
      activeName: 0,
      tableData: [],
      orderInfo: "",
      needMerHandleAftersaleInfo: "",
      detail: [],
      parcelInfo: "",
    };
  },
  components: {
    cascader,
  },
  created() {
    let orderCode = this.$route.query.orderId
      ? this.$route.query.orderId
      : "X159659474146614775";
    this.getDetail(orderCode);
  },
  methods: {
    onCopy(e) {
      this.$message({
        message: "复制成功",
        type: "success",
        center: true,
      });
    },
    onError(e) {},
    copyTest() {
      document.execCommand("Copy");
      this.copy;
    },
    getDetail(orderCode) {
      let objData = {
        orderCode: orderCode,
      };
      getShopOrderDetailNew(objData).then((res) => {
        this.orderInfo = res.body.orderInfo;
        this.needMerHandleAftersaleInfo = res.body.needMerHandleAftersaleInfo;
        this.detail = res.body.detail;
        this.parcelInfo = res.body.parcelInfo;
        this.copy = `${this.orderInfo.custAddress},${this.orderInfo.custName},${this.orderInfo.custMobile}`;
        if (this.orderInfo.orderStatus == 4) {
          this.orderInfo.orderStatus = 5;
        } else {
          this.orderInfo.orderStatus = parseInt(this.orderInfo.orderStatus);
        }
      });
    },
    tabClick(val) {
      console.log(val);
    },
    // 城市change
    citychange(value) {
      if (value.length > 0) {
        this.form.provinceCode = value[0];
        this.form.cityCode = value[1];
        this.HandleCityName(districts);
      }
    },
    // 得到省市区中文
    HandleCityName(districts) {
      for (let j = 0; j < this.cityvalue.length; j++) {
        for (let i = 0; i < districts.length; i++) {
          if (districts[i].adcode == this.cityvalue[j]) {
            this.cityArrName.push(districts[i].name);
            if (districts[i].districts && districts[i].districts.length) {
              this.HandleCityName(districts[i].districts);
            }
            break;
          }
        }
      }
      this.addressform.custAddress = `${this.cityArrName[0]}${this.cityArrName[1]}${this.cityArrName[2]}`;
    },
    // 修改地址
    updateAddress(item) {
      if (!this.dialogFormVisible) {
        let { orderCode, custMobile, custName, custAddress } = this.orderInfo;
        this.addressform.orderCode = orderCode;
        this.addressform.custMobile = custMobile;
        this.addressform.custName = custName;
        this.addressform.custAddress = custAddress;
        this.dialogFormVisible = true;
        console.log(this.addressform);
      } else {
        updateCustAddressInfo(this.addressform).then((res) => {
          this.$message({
            message: "修改地址成功啦",
            type: "success",
            center: true,
          });
          this.getDetail(this.orderInfo.orderCode);
          this.dialogFormVisible = false;
          this.addressform = {
            orderCode: "",
            custName: "",
            custMobile: "",
            custAddress: "",
          };
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.order-Detail {
  min-height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  font-size: 12px;
}
.flex-top {
  display: flex;
  width: 100%;
}
.flex-top > div {
  margin-right: 20px;
}
.order-statusBox {
  display: flex;
  box-sizing: border-box;
  background: #fdfdfd;
  width: 100%;
  border: solid 1px #e4e7ed;
  margin-top: 10px;
}
.order-statusBox > div:first-of-type {
  flex: 0 0 40%;
  border-right: 1px #e4e7ed solid;
  padding: 20px;
}
.order-statusBox > div:last-of-type {
  flex: 0 0 60%;
}
.status-title {
  padding: 10px 0px;
  color: #2b2b2b;
}
.status-title:first-of-type {
  font-weight: bold;
  font-size: 16px;
  color: #000;
}
.flex-container {
  display: flex;
  align-items: center;
}
.tips-box {
  display: flex;
  width: 100%;
  padding: 20px 0px;
  border-bottom: solid 1px #e4e7ed;
  box-sizing: border-box;
  border-right: solid 1px #e4e7ed;
  border-left: solid 1px #e4e7ed;
  margin-bottom: 20px;
}
.tips-box > div:first-of-type {
  padding-left: 20px;
  color: rgb(240, 186, 8);
  line-height: 30px;
}
.tips-text > div {
  line-height: 30px;
}
.tips-boxs {
  display: flex;
  width: 100%;
  padding: 20px 20px;
  border-bottom: solid 1px #e4e7ed;
  box-sizing: border-box;
  border-right: solid 1px #e4e7ed;
  border-left: solid 1px #e4e7ed;
  margin-bottom: 20px;
  line-height: 20px;
}
.tips-boxs > div:last-of-type {
  margin-left: 100px;
}
.tips-boxs > div:last-of-type > span {
  color: rgb(240, 186, 8);
}
.buy-info {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  background: #fdfdfd;
  width: 100%;
  border: solid 1px #e4e7ed;
  margin-top: 10px;
  padding: 20px;
}
.table-box {
  width: 100%;
  box-sizing: border-box;
  background: #fdfdfd;
  width: 100%;
  border: solid 1px #e4e7ed;
  margin-top: 10px;
  padding: 20px;
}
.buy-info > div:first-of-type {
  flex: 0 0 27%;
  margin-right: 20px;
}
.buy-info > div {
  flex: 1;
  line-height: 20px;
}
.buy-info > div > section:first-of-type {
  flex: 1;
  line-height: 20px;
  font-size: 12px;
  font-family: Microsoft YaHei, MicrosoftYaHei-Bold;
  font-weight: bold;
}
.item-address {
  display: flex;
}
.yincang {
  opacity: 0;
}
.list-item-t {
  display: flex;
  // align-items: center;
}
.hiden-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;
}
.poiner {
  cursor: pointer;
}
</style>
<style>
.flex-container /deep/ .is-finish {
  font-size: 12px;
}
.flex-container /deep/ .el-step__title {
  font-size: 12px;
}
.tab-deep /deep/ .el-tabs__item {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
}
.tab-deep /deep/ .el-tabs__header {
  margin-bottom: 0px;
}
</style>